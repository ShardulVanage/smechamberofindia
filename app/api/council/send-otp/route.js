import { NextResponse } from "next/server"
import { getClientIP, isBlocked, rateLimit, verifyRecaptcha } from "../_lib/security"
import { sendOtpEmail } from "../_lib/mailer"
import { createSession } from "../_lib/otp-store"

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000) // 6 digits
}

export async function POST(req) {
  try {
    const ip = getClientIP(req)
    if (isBlocked(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }
    if (!rateLimit(ip, "send-otp")) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
    }

    const body = await req.json().catch(() => ({}))
    const { email, recaptchaToken } = body || {}

    if (!email || !recaptchaToken) {
      return NextResponse.json({ error: "Missing email or recaptcha token" }, { status: 400 })
    }

    const captchaOk = await verifyRecaptcha(recaptchaToken, ip)
    if (!captchaOk) {
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 })
    }

    const otp = generateOtp()
    const sessionId = createSession({ email, otp, ip })

    await sendOtpEmail(email, otp)

    return NextResponse.json({ sessionId })
  } catch (e) {
    console.error("[send-otp] error", e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
