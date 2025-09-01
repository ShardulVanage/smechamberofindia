import { NextResponse } from "next/server"
import { getClientIP, isBlocked, rateLimit, signVerifiedToken } from "../_lib/security"
import { getSession, verifyOtp  } from "../_lib/otp-store"

export async function POST(req) {
  try {
    const ip = getClientIP(req)
    if (isBlocked(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }
    if (!rateLimit(ip, "verify-otp")) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
    }

    const body = await req.json().catch(() => ({}))
    const { sessionId, email, otp } = body || {}
    if (!sessionId || !email || !otp) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
    }

    const s = getSession(sessionId)
    if (!s || s.email !== email) {
      return NextResponse.json({ error: "Invalid session" }, { status: 400 })
    }

    const result = verifyOtp(sessionId, otp)
    if (!result.ok) {
      const msg =
        result.reason === "max_attempts"
          ? "Too many attempts"
          : result.reason === "bad_otp"
            ? "Incorrect OTP"
            : "Invalid session"
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    const token = signVerifiedToken({ email, ip })
    return NextResponse.json({ verifiedToken: token })
  } catch (e) {
    console.error("[verify-otp] error", e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
