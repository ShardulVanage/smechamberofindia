import { NextResponse } from "next/server"
import { getClientIP, isBlocked, rateLimit, verifySignedToken } from "./_lib/security"
import { sendFormEmails } from "./_lib/mailer"

export async function POST(req) {
  try {
    const ip = getClientIP(req)
    if (isBlocked(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }
    if (!rateLimit(ip, "submit")) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
    }

    const body = await req.json().catch(() => ({}))
    const { verifiedToken, form } = body || {}

    if (!verifiedToken || !form) {
      return NextResponse.json({ error: "Missing verified token or form" }, { status: 400 })
    }

    const claims = verifySignedToken(verifiedToken)
    if (!claims) {
      return NextResponse.json({ error: "Invalid or expired verification token" }, { status: 401 })
    }

    // Optional: pin to same IP that verified OTP
    if (claims.ip !== ip) {
      return NextResponse.json({ error: "IP mismatch" }, { status: 401 })
    }

    const userEmail = String(form.email || "").trim()
    if (!userEmail) {
      return NextResponse.json({ error: "Form missing email" }, { status: 400 })
    }

    await sendFormEmails({ form, userEmail })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("[council submit] error", e)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
