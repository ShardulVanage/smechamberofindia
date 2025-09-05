import { NextResponse } from "next/server"
import crypto from "crypto"

if (!global.otpStorage) global.otpStorage = new Map()
if (!global.verificationTokens) global.verificationTokens = new Map()

const otpStorage = global.otpStorage
const verificationTokens = global.verificationTokens

function normalizeEmail(email) {
  return String(email || "")
    .toLowerCase()
    .trim()
}

function getClientIP(request) {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  const cfConnectingIP = request.headers.get("cf-connecting-ip")
  return cfConnectingIP || realIP || (forwarded && forwarded.split(",")[0]) || "unknown"
}

function generateVerificationToken() {
  return crypto.randomBytes(32).toString("hex")
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, emailOtp, smsOtp } = body || {}

    const normalizedEmail = normalizeEmail(email)
    if (!normalizedEmail || !emailOtp || !smsOtp) {
      return NextResponse.json({ error: "Email, Email OTP and SMS OTP are required" }, { status: 400 })
    }

    const record = otpStorage.get(normalizedEmail)
    if (!record) {
      return NextResponse.json({ error: "No OTP request found or it has expired" }, { status: 400 })
    }

    const now = Date.now()
    if (now > record.expiresAt) {
      otpStorage.delete(normalizedEmail)
      return NextResponse.json({ error: "OTP has expired. Please request a new one." }, { status: 400 })
    }

    // Optional: ensure same IP (soft check)
    const clientIP = getClientIP(request)
    if (record.clientIP && clientIP && record.clientIP !== clientIP) {
      console.log("Warning: OTP requested from IP", record.clientIP, "but verified from", clientIP)
    }

    if (String(emailOtp) !== String(record.emailOtp) || String(smsOtp) !== String(record.smsOtp)) {
      return NextResponse.json({ error: "Invalid OTP(s). Please check and try again." }, { status: 400 })
    }

    // Generate verification token for final submission
    const verificationToken = generateVerificationToken()
    const tokenExpiresAt = now + 10 * 60 * 1000 // 10 minutes to complete form submission

    verificationTokens.set(verificationToken, {
      email: normalizedEmail,
      mobile: record.mobile,
      createdAt: now,
      expiresAt: tokenExpiresAt,
      clientIP,
    })

    // Clear used OTPs
    otpStorage.delete(normalizedEmail)

    return NextResponse.json({
      message: "OTP verification successful",
      token: verificationToken,
    })
  } catch (error) {
    console.error("Error verifying OTPs:", error)
    return NextResponse.json({ error: "Failed to verify OTPs" }, { status: 500 })
  }
}
