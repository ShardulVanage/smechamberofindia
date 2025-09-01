import crypto from "crypto"

const BLOCK_WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const RATE_WINDOW_MS = 10 * 60 * 1000 // 10 minutes

// Different route keys can have different limits
const LIMITS = {
  "send-otp": { max: 5, windowMs: RATE_WINDOW_MS },
  "verify-otp": { max: 10, windowMs: RATE_WINDOW_MS },
  submit: { max: 10, windowMs: RATE_WINDOW_MS },
}

const rateMap = new Map() // key: ip:key => { count, resetAt }
const blockMap = new Map() // key: ip => blockUntil (ts)

export function getClientIP(req) {
  const xfwd = req.headers.get("x-forwarded-for")
  if (xfwd) return xfwd.split(",")[0].trim()
  const realIp = req.headers.get("x-real-ip")
  if (realIp) return realIp.trim()
  return "0.0.0.0"
}

export function isBlocked(ip) {
  const until = blockMap.get(ip)
  if (!until) return false
  if (Date.now() > until) {
    blockMap.delete(ip)
    return false
  }
  return true
}

export function rateLimit(ip, key) {
  const cfg = LIMITS[key] || { max: 10, windowMs: RATE_WINDOW_MS }
  const now = Date.now()
  const mapKey = `${ip}:${key}`
  const current = rateMap.get(mapKey) || { count: 0, resetAt: now + cfg.windowMs }

  if (now > current.resetAt) {
    current.count = 0
    current.resetAt = now + cfg.windowMs
  }

  current.count += 1
  rateMap.set(mapKey, current)

  if (current.count > cfg.max * 2) {
    // Aggressive abuse -> block IP temporarily
    blockMap.set(ip, now + BLOCK_WINDOW_MS)
  }

  return current.count <= cfg.max
}

export async function verifyRecaptcha(token, ip) {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    console.warn("[security] Missing RECAPTCHA_SECRET_KEY env var")
    // Fail-safe: do not allow if not configured
    return false
  }
  try {
    const params = new URLSearchParams()
    params.set("secret", secret)
    params.set("response", token)
    if (ip) params.set("remoteip", ip)

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      cache: "no-store",
    })
    const data = await res.json()
    return !!(data && data.success)
  } catch {
    return false
  }
}

// HMAC signed token utilities (for "verified" session passing)
const TOKEN_SECRET = process.env.OTP_TOKEN_SECRET || "change-me-dev-secret"

function base64url(buf) {
  return Buffer.from(buf).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
}

export function signVerifiedToken(payload, ttlMs = 10 * 60 * 1000) {
  const now = Math.floor(Date.now() / 1000)
  const exp = now + Math.floor(ttlMs / 1000)
  const full = { ...payload, iat: now, exp }
  const body = JSON.stringify(full)
  const sig = crypto.createHmac("sha256", TOKEN_SECRET).update(body).digest()
  const token = `${base64url(Buffer.from(body))}.${base64url(sig)}`
  return token
}

export function verifySignedToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return null
  const [b64Body, b64Sig] = token.split(".")
  try {
    const body = Buffer.from(b64Body.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString()
    const expectedSig = crypto.createHmac("sha256", TOKEN_SECRET).update(body).digest()
    const givenSig = Buffer.from(b64Sig.replace(/-/g, "+").replace(/_/g, "/"), "base64")
    if (expectedSig.length === givenSig.length && crypto.timingSafeEqual(expectedSig, givenSig)) {
      const obj = JSON.parse(body)
      const now = Math.floor(Date.now() / 1000)
      if (obj.exp && now <= obj.exp) return obj
    }
    return null
  } catch {
    return null
  }
}
