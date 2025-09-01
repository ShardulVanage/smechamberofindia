import { NextResponse } from "next/server"
import { stores } from "./_lib/storage"
import { assertEnv, mailTransporter, normalizeEmail, verifyRecaptcha, getClientIP } from "./_lib/utils"
import { rateLimitSubmit } from "./_lib/rate-limit"

function adminHtml(fd) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #29688A; color: white; padding: 20px; text-align: center;">
        <h1>New Strategic Partnership Application</h1>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #29688A;">Application Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${Object.entries(fd)
            .map(
              ([k, v]) => `
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold; text-transform: capitalize;">${k.replace(/([A-Z])/g, " $1")}</td>
            <td style="padding: 8px;">${String(v ?? "")
              .toString()
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")}</td>
          </tr>`,
            )
            .join("")}
        </table>
      </div>
      <div style="background-color: #29688A; color: white; padding: 10px; text-align: center;">
        <p>Please review and process this strategic partnership application.</p>
      </div>
    </div>
  `
}

function userHtml(fd) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #29688A; color: white; padding: 20px; text-align: center;">
        <h1>Strategic Partnership Application Received</h1>
      </div>
      <div style="padding: 20px;">
        <p>Dear ${fd.title ? fd.title + " " : ""}${fd.name || "Applicant"},</p>
        <p>Thank you for your interest in becoming a Strategic Partner. We have received your application with the following summary:</p>
        <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #29688A;">
          <p><strong>Company:</strong> ${fd.companyName}</p>
          <p><strong>Business Activity:</strong> ${fd.businessActivity}</p>
          <p><strong>Business Sector:</strong> ${fd.businessSector}</p>
        </div>
        <p>Our team will review your application and get back to you within 2-3 business days.</p>
        <p>Best regards,<br/>The Partnerships Team</p>
      </div>
      <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p>This is an automated email. Please do not reply to this message.</p>
      </div>
    </div>
  `
}

export async function POST(request) {
  try {
    assertEnv()
    const { verificationToken, recaptchaToken, formData } = await request.json()
    const ip = getClientIP(request)

    // Rate limit final submissions per IP
    const rl = rateLimitSubmit(ip)
    if (!rl.ok) {
      return NextResponse.json({ error: rl.error }, { status: rl.status })
    }

    // Verify reCAPTCHA
    const ok = await verifyRecaptcha(recaptchaToken)
    if (!ok) {
      return NextResponse.json({ error: "Invalid reCAPTCHA verification" }, { status: 400 })
    }

    // Validate token
    const tokenRecord = stores.verificationTokens.get(verificationToken)
    if (!tokenRecord) {
      return NextResponse.json({ error: "Invalid or expired verification token" }, { status: 400 })
    }
    const now = Date.now()
    if (tokenRecord.used || now > tokenRecord.expiresAt) {
      stores.verificationTokens.delete(verificationToken)
      return NextResponse.json({ error: "Verification token expired" }, { status: 400 })
    }

    // Ensure email consistency
    const normalizedEmail = normalizeEmail(formData?.email)
    if (!normalizedEmail || normalizedEmail !== tokenRecord.email) {
      return NextResponse.json({ error: "Email validation failed" }, { status: 400 })
    }

    // Mark token as used (one-time)
    tokenRecord.used = true
    stores.verificationTokens.set(verificationToken, tokenRecord)

    // Prepare and send emails
    const transporter = mailTransporter()
    const adminEmail = process.env.ADMIN_EMAIL

    const [adminRes, userRes] = await Promise.all([
      transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: adminEmail,
        subject: `New Strategic Partnership Application - ${formData.companyName || "Unknown Company"}`,
        html: adminHtml(formData),
      }),
      transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: normalizedEmail,
        subject: "Strategic Partnership Application Confirmation",
        html: userHtml(formData),
      }),
    ])

    return NextResponse.json({ message: "Application submitted successfully" })
  } catch (e) {
    console.error("[v0] submission error:", e)
    return NextResponse.json({ error: "Failed to process application" }, { status: 500 })
  }
}
