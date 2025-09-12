import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Global storage for OTPs and rate limiting (in production, use Redis or database)
if (!global.otpStorage) global.otpStorage = new Map()
if (!global.rateLimitStorage) global.rateLimitStorage = new Map()
if (!global.ipRateLimitStorage) global.ipRateLimitStorage = new Map()

const otpStorage = global.otpStorage
const rateLimitStorage = global.rateLimitStorage
const ipRateLimitStorage = global.ipRateLimitStorage

const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 15
const IP_MAX_ATTEMPTS = 15

function normalizeEmail(email) {
  return String(email || "")
    .toLowerCase()
    .trim()
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function getClientIP(request) {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  const cfConnectingIP = request.headers.get("cf-connecting-ip")
  return cfConnectingIP || realIP || (forwarded && forwarded.split(",")[0]) || "unknown"
}

async function verifyRecaptcha(token) {
  if (!token) return false
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    })
    const data = await response.json()
    return !!data.success
  } catch (e) {
    console.error("reCAPTCHA verification error:", e)
    return false
  }
}

function isE164(phone) {
  return /^\+?[1-9]\d{7,14}$/.test(String(phone || ""))
}

export async function POST(request) {
  try {
    const { email, mobile, recaptchaToken, isResend } = await request.json()
    const normalizedEmail = normalizeEmail(email)

    if (!normalizedEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }
    if (!isE164(mobile)) {
      return NextResponse.json({ error: "Valid mobile number (E.164) is required" }, { status: 400 })
    }

    const clientIP = getClientIP(request)
    const now = Date.now()

    // IP-level rate limit
    const ipData = ipRateLimitStorage.get(clientIP)
    if (ipData) {
      const { attempts, firstAttempt, bannedUntil } = ipData
      if (bannedUntil && now < bannedUntil) {
        const remainingTime = Math.ceil((bannedUntil - now) / 60000)
        return NextResponse.json(
          { error: `IP temporarily banned. Try again in ${remainingTime} minutes.` },
          { status: 429 },
        )
      }
      if (now - firstAttempt > RATE_LIMIT_WINDOW) {
        ipRateLimitStorage.set(clientIP, { attempts: 1, firstAttempt: now, bannedUntil: null })
      } else {
        const newAttempts = attempts + 1
        if (newAttempts >= IP_MAX_ATTEMPTS) {
          ipRateLimitStorage.set(clientIP, {
            attempts: newAttempts,
            firstAttempt,
            bannedUntil: now + RATE_LIMIT_WINDOW,
          })
          return NextResponse.json({ error: "Too many requests from this IP. Banned for 15 minutes." }, { status: 429 })
        }
        ipRateLimitStorage.set(clientIP, { attempts: newAttempts, firstAttempt, bannedUntil: null })
      }
    } else {
      ipRateLimitStorage.set(clientIP, { attempts: 1, firstAttempt: now, bannedUntil: null })
    }

    // Email-level rate limit per IP
    const rateKey = `${clientIP}-${normalizedEmail}`
    const rl = rateLimitStorage.get(rateKey)
    if (rl) {
      const { attempts, firstAttempt } = rl
      if (now - firstAttempt < RATE_LIMIT_WINDOW) {
        if (attempts >= MAX_ATTEMPTS) {
          return NextResponse.json(
            { error: "Too many OTP requests for this email. Please try again after 15 minutes." },
            { status: 429 },
          )
        }
        rateLimitStorage.set(rateKey, { attempts: attempts + 1, firstAttempt })
      } else {
        rateLimitStorage.set(rateKey, { attempts: 1, firstAttempt: now })
      }
    } else {
      rateLimitStorage.set(rateKey, { attempts: 1, firstAttempt: now })
    }

    if (!isResend && recaptchaToken) {
      const ok = await verifyRecaptcha(recaptchaToken)
      if (!ok) return NextResponse.json({ error: "Invalid reCAPTCHA verification" }, { status: 400 })
    }

    // Generate both OTPs
    const emailOtp = generateOTP()
    const smsOtp = generateOTP()
    const expiresAt = now + 3 * 60 * 1000 // 3 minutes

    otpStorage.set(normalizedEmail, {
      email: normalizedEmail,
      mobile,
      clientIP,
      emailOtp,
      smsOtp,
      createdAt: now,
      expiresAt,
    })

    // Send email OTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    })

    const otpEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #29688A; color: white; padding: 20px; text-align: center;">
          <h1>Contact Form Verification</h1>
        </div>
        <div style="padding: 30px; text-align: center;">
          <h2 style="color: #29688A; margin-bottom: 20px;">Your Email Verification Code</h2>
          <div style="background-color: #f8f9fa; border: 2px dashed #29688A; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h1 style="color: #29688A; font-size: 36px; margin: 0; letter-spacing: 8px;">${emailOtp}</h1>
          </div>
          <p style="color: #666; margin: 20px 0;">This OTP is valid for <strong>3 minutes</strong>.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this OTP, please ignore this email.</p>
        </div>
      </div>
    `

    const emailPromise = transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: normalizedEmail,
      subject: "Contact Form - Email OTP Verification",
      html: otpEmailHtml,
    })

    const smsGatewayUrl = process.env.SMS_GATEWAY_URL // e.g., "http://xxx/sendsms/bulksms_v2.php"
    const apiKey = process.env.SMS_API_KEY
    const sender = process.env.SMS_SENDER // e.g., "SMECHM"
    const entityId = process.env.SMS_ENTITY_ID

    if (!smsGatewayUrl || !apiKey || !sender || !entityId) {
      console.error("SMS Gateway env vars missing. Please set SMS_GATEWAY_URL, SMS_API_KEY, SMS_SENDER, SMS_ENTITY_ID")
      return NextResponse.json({ error: "Server SMS configuration missing" }, { status: 500 })
    }

    // Format mobile number for the gateway (remove + if present)
    const formattedMobile = mobile.replace(/^\+/, "")

    // Construct the SMS message in the format your gateway expects
    const smsMessage = `${smsOtp} is the OTP for the registration process - ${sender}`

    // Build the SMS gateway URL exactly like your PHP format
    const smsUrl = `${smsGatewayUrl}?apikey=${encodeURIComponent(apiKey)}&type=TEXT&sender=${encodeURIComponent(sender)}&entityId=${encodeURIComponent(entityId)}&mobile=${encodeURIComponent(formattedMobile)}&message=${encodeURIComponent(smsMessage)}`

    console.log("[v0] SMS Gateway URL:", smsUrl.replace(apiKey, "***API_KEY***")) // Log without exposing API key

    const smsPromise = fetch(smsUrl, {
      method: "GET", // Changed to GET method as per your PHP gateway
      headers: {
        "User-Agent": "Contact-Form-API/1.0",
      },
    }).then(async (response) => {
      const responseText = await response.text()
      console.log("[v0] SMS Gateway Response:", { status: response.status, body: responseText })

      if (!response.ok) {
        throw new Error(`SMS Gateway error: ${response.status} - ${responseText}`)
      }
      return responseText
    })

    // Timeout guard for email send (60s)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email sending timeout")), 60000),
    )

    await Promise.all([Promise.race([emailPromise, timeoutPromise]), smsPromise])

    return NextResponse.json({ message: "OTPs sent successfully", expiresIn: 180 })
  } catch (error) {
    console.error("Error sending OTPs:", error)
    return NextResponse.json({ error: "Failed to send OTPs" }, { status: 500 })
  }
}
