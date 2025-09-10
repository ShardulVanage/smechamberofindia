import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

if (!global.otpStorage) global.otpStorage = new Map()
if (!global.rateLimitStorage) global.rateLimitStorage = new Map()
if (!global.ipRateLimitStorage) global.ipRateLimitStorage = new Map()

const otpStorage = global.otpStorage
const rateLimitStorage = global.rateLimitStorage
const ipRateLimitStorage = global.ipRateLimitStorage

const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 15
const IP_MAX_ATTEMPTS = 15

async function sendSMSOTP(mobile, otp) {
  const gatewayUrl = process.env.SMS_GATEWAY_URL
  const apiKey = process.env.SMS_API_KEY
  const sender = process.env.SMS_SENDER
  const entityId = process.env.SMS_ENTITY_ID

  const message = encodeURIComponent(`${otp} is the OTP for the registration process - ${sender}`)
  const url = `${gatewayUrl}?apikey=${apiKey}&type=TEXT&sender=${sender}&entityId=${entityId}&mobile=${mobile}&message=${message}`

  const response = await fetch(url, { method: "GET" })
  if (!response.ok) {
    throw new Error(`SMS Gateway error: ${response.status}`)
  }

  // Get the response text to check for SMS gateway errors
  const result = await response.text()
  console.log("[council/send-otp] SMS Gateway response:", result)

  // Check for specific SMS gateway error responses
  if (result.includes('ERR_MOBILE') || result.includes('ERROR') || result.includes('FAILED')) {
    console.error("[council/send-otp] SMS Gateway error in response:", result)
    throw new Error("Invalid phone number format. Please check your phone number and try again.")
  }

  // Check for other common error patterns
  if (result.includes('ERR_') || result.toLowerCase().includes('error')) {
    console.error("[council/send-otp] SMS Gateway error in response:", result)
    throw new Error("Failed to send SMS. Please check your phone number and try again.")
  }

  return response
}

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

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request) {
  try {
    const { email, mobile, recaptchaToken, isResend } = await request.json()
    const normalizedEmail = normalizeEmail(email)

    // Validate inputs
    if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
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

    if (
      !process.env.SMS_GATEWAY_URL ||
      !process.env.SMS_API_KEY ||
      !process.env.SMS_SENDER ||
      !process.env.SMS_ENTITY_ID
    ) {
      console.error("SMS Gateway env vars missing. Please set SMS_GATEWAY_URL, SMS_API_KEY, SMS_SENDER, SMS_ENTITY_ID")
      return NextResponse.json({ error: "Server SMS configuration missing" }, { status: 500 })
    }

    // Check Gmail configuration
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Gmail env vars missing. Please set GMAIL_USER, GMAIL_APP_PASSWORD")
      return NextResponse.json({ error: "Server email configuration missing" }, { status: 500 })
    }

    // STEP 2: Test email configuration (create transporter and verify)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    })

    try {
      // Verify SMTP connection
      await transporter.verify()
    } catch (emailConfigError) {
      console.error("Email configuration error:", emailConfigError)
      return NextResponse.json(
        {
          error: "Email service configuration error",
        },
        { status: 500 },
      )
    }

    // STEP 3: Only generate OTPs after validation
    const emailOtp = generateOTP()
    const smsOtp = generateOTP()
    const expiresAt = now + 3 * 60 * 1000 // 3 minutes

    const otpEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #29688A; color: white; padding: 20px; text-align: center;">
          <h1>Strategic Partnership Application OTP</h1>
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

    // STEP 4: Send both OTPs with proper error handling
    try {
      // Create timeout promise for email
      const emailTimeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Email sending timeout")), 60000),
      )

      const emailPromise = transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: normalizedEmail,
        subject: "Strategic Partnership Application - Email OTP",
        html: otpEmailHtml,
      })

      const smsPromise = sendSMSOTP(mobile, smsOtp)

      // Wait for both to complete - if any fails, both fail
      await Promise.all([Promise.race([emailPromise, emailTimeoutPromise]), smsPromise])

      // STEP 5: Only store OTP data if both succeeded
      otpStorage.set(normalizedEmail, {
        email: normalizedEmail,
        mobile,
        clientIP,
        emailOtp,
        smsOtp,
        createdAt: now,
        expiresAt,
      })

      return NextResponse.json({ message: "OTPs sent successfully", expiresIn: 180 })
    } catch (sendError) {
      console.error("Error sending OTPs:", sendError)

      // Handle specific SMS gateway errors
      if (sendError.message && sendError.message.includes("Invalid phone number format")) {
        return NextResponse.json(
          {
            error: "Invalid phone number format. Please check your phone number and try again.",
          },
          { status: 400 },
        )
      } else if (sendError.message && sendError.message.includes("Failed to send SMS")) {
        return NextResponse.json(
          {
            error: "Failed to send SMS. Please check your phone number and try again.",
          },
          { status: 400 },
        )
      } else if (sendError.message && sendError.message.includes("SMS Gateway error")) {
        return NextResponse.json(
          {
            error: "SMS service temporarily unavailable. Please try again.",
          },
          { status: 500 },
        )
      } else if (sendError.message && sendError.message.includes("timeout")) {
        return NextResponse.json(
          {
            error: "Service timeout. Please try again.",
          },
          { status: 500 },
        )
      } else if (
        sendError.message &&
        (sendError.message.includes("Invalid login") ||
          sendError.message.includes("Username and Password not accepted"))
      ) {
        return NextResponse.json(
          {
            error: "Email service authentication failed. Please check server configuration.",
          },
          { status: 500 },
        )
      } else {
        return NextResponse.json(
          {
            error: "Failed to send OTPs. Please check your email and phone number and try again.",
          },
          { status: 500 },
        )
      }
    }
  } catch (error) {
    console.error("Error in OTP route:", error)
    return NextResponse.json({ error: "Failed to send OTPs" }, { status: 500 })
  }
}