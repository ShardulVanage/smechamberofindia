import { NextResponse } from "next/server"
import crypto from "crypto"
import { stores } from "../_lib/storage"
import { getClientIP, normalizeEmail } from "../_lib/utils"

export async function POST(request) {
  try {
    const { email, otp } = await request.json()
    const normalizedEmail = normalizeEmail(email)
    const clientIP = getClientIP(request)

    const record = stores.otpStorage.get(normalizedEmail)
    if (!record) {
      return NextResponse.json({ error: "OTP not found or expired" }, { status: 400 })
    }

    const { otp: expected, expiresAt } = record
    const now = Date.now()

    if (now > expiresAt) {
      stores.otpStorage.delete(normalizedEmail)
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 })
    }

    if (otp !== expected) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
    }

    // OTP is valid - consume it and mint a one-time token
    stores.otpStorage.delete(normalizedEmail)
    const token = crypto.randomBytes(24).toString("hex")
    stores.verificationTokens.set(token, {
      email: normalizedEmail,
      createdAt: now,
      expiresAt: now + 10 * 60 * 1000, // 10 minutes
      used: false,
      clientIP,
    })

    return NextResponse.json({ verified: true, token, expiresIn: 600 })
  } catch (e) {
    console.error("[v0] verify error:", e)
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 })
  }
}
