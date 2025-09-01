import { NextResponse } from "next/server"
import { stores } from "../_lib/storage"
import { assertEnv, getClientIP, normalizeEmail, verifyRecaptcha, mailTransporter } from "../_lib/utils"
import { rateLimitOTP } from "../_lib/rate-limit"

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request) {
  try {
    assertEnv()
    const { email, mobile, recaptchaToken, isResend } = await request.json()
    const normalizedEmail = normalizeEmail(email)
    const ip = getClientIP(request)

    const rl = rateLimitOTP(ip, normalizedEmail)
    if (!rl.ok) {
      return NextResponse.json({ error: rl.error }, { status: rl.status })
    }

    if (!isResend) {
      const ok = await verifyRecaptcha(recaptchaToken)
      if (!ok) {
        return NextResponse.json({ error: "Invalid reCAPTCHA verification" }, { status: 400 })
      }
    }

    const otp = generateOTP()
    const now = Date.now()
    stores.otpStorage.set(normalizedEmail, {
      otp,
      email: normalizedEmail,
      mobile: mobile || null,
      clientIP: ip,
      createdAt: now,
      expiresAt: now + 3 * 60 * 1000, // 3 minutes
    })

    const transporter = mailTransporter()
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #29688A; color: white; padding: 20px; text-align: center;">
          <h1>Strategic Partnership - OTP Verification</h1>
        </div>
        <div style="padding: 30px; text-align: center;">
          <h2 style="color: #29688A; margin-bottom: 20px;">Your Verification Code</h2>
          <div style="background-color: #f8f9fa; border: 2px dashed #29688A; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h1 style="color: #29688A; font-size: 36px; margin: 0; letter-spacing: 8px;">${otp}</h1>
          </div>
          <p style="color: #666; margin: 20px 0;">This OTP is valid for <strong>3 minutes</strong>.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this, you can ignore this email.</p>
        </div>
        <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    `

    const emailPromise = transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: normalizedEmail,
      subject: "Strategic Partnership - OTP Verification",
      html,
    })

    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Email timeout")), 60000))
    await Promise.race([emailPromise, timeoutPromise])

    return NextResponse.json({ message: "OTP sent successfully", expiresIn: 180 })
  } catch (e) {
    console.error("[v0] send-otp error:", e)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}
