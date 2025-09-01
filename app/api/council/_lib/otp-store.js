import crypto from "crypto"

const otpStore = new Map() // sessionId -> { email, otpHash, salt, expiresAt, attempts, ip }

export function createSession({ email, otp, ip, ttlMs = 10 * 60 * 1000 }) {
  const sessionId = crypto.randomUUID()
  const salt = crypto.randomBytes(16)
  const otpHash = crypto
    .createHash("sha256")
    .update(Buffer.concat([Buffer.from(String(otp)), salt]))
    .digest()
  const expiresAt = Date.now() + ttlMs
  otpStore.set(sessionId, { email, otpHash, salt, expiresAt, attempts: 0, ip })
  setTimeout(() => otpStore.delete(sessionId), ttlMs + 1000)
  return sessionId
}

export function getSession(sessionId) {
  const s = otpStore.get(sessionId)
  if (!s) return null
  if (Date.now() > s.expiresAt) {
    otpStore.delete(sessionId)
    return null
  }
  return s
}

export function verifyOtp(sessionId, otp) {
  const s = getSession(sessionId)
  if (!s) return { ok: false, reason: "invalid_session" }
  if (s.attempts >= 5) return { ok: false, reason: "max_attempts" }
  s.attempts += 1

  const computed = crypto
    .createHash("sha256")
    .update(Buffer.concat([Buffer.from(String(otp)), s.salt]))
    .digest()
  const ok = computed.length === s.otpHash.length && crypto.timingSafeEqual(computed, s.otpHash)
  if (!ok) return { ok: false, reason: "bad_otp" }

  // One-time use; remove after success
  otpStore.delete(sessionId)
  return { ok: true, email: s.email, ip: s.ip }
}
