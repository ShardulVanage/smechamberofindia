import nodemailer from "nodemailer"

export function normalizeEmail(email) {
  return (email || "").toLowerCase().trim()
}

export function getClientIP(request) {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  const cfConnectingIP = request.headers.get("cf-connecting-ip")
  return cfConnectingIP || realIP || (forwarded ? forwarded.split(",")[0] : null) || request.ip || "unknown"
}

export async function verifyRecaptcha(token) {
  if (!token) return false
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    })
    const data = await res.json()
    return !!data?.success
  } catch (e) {
    console.error("[v0] reCAPTCHA verify error:", e)
    return false
  }
}

export function mailTransporter() {
  // Ensure you use an App Password for Gmail accounts with 2FA
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

export function assertEnv() {
  const required = ["GMAIL_USER", "GMAIL_APP_PASSWORD", "ADMIN_EMAIL", "RECAPTCHA_SECRET_KEY"]
  const missing = required.filter((k) => !process.env[k])
  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(", ")}`)
  }
}
