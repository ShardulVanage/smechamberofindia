import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import twilio from "twilio"

if (!global.otpStorage) global.otpStorage = new Map()
if (!global.rateLimitStorage) global.rateLimitStorage = new Map()
if (!global.ipRateLimitStorage) global.ipRateLimitStorage = new Map()

const otpStorage = global.otpStorage
const rateLimitStorage = global.rateLimitStorage
const ipRateLimitStorage = global.ipRateLimitStorage

const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 3
const IP_MAX_ATTEMPTS = 5

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

    // Check Twilio configuration
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const fromNumber = process.env.TWILIO_PHONE_NUMBER

    if (!accountSid || !authToken || !fromNumber) {
      console.error("Twilio env vars missing. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER")
      return NextResponse.json({ error: "Server SMS configuration missing" }, { status: 500 })
    }

    // Check Gmail configuration
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Gmail env vars missing. Please set GMAIL_USER, GMAIL_APP_PASSWORD")
      return NextResponse.json({ error: "Server email configuration missing" }, { status: 500 })
    }

    const client = twilio(accountSid, authToken)

    // STEP 1: Validate phone number first (before generating OTPs)
    try {
      await client.lookups.v1.phoneNumbers(mobile).fetch()
    } catch (lookupError) {
      console.error("Phone number lookup error:", lookupError)
      return NextResponse.json(
        {
          error: "Invalid phone number format or unsupported region",
        },
        { status: 400 },
      )
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
          <h1>SME Consultant Application OTP</h1>
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
        subject: "SME Consultant Application - Email OTP",
        html: otpEmailHtml,
      })

      const smsPromise = client.messages.create({
        body: `Your SME Consultant verification code is ${smsOtp}. It expires in 3 minutes.`,
        from: fromNumber,
        to: mobile,
      })

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

      // Provide specific error messages based on error type
      if (sendError.message && sendError.message.includes("unverified")) {
        return NextResponse.json(
          {
            error:
              "Phone number is unverified. For Twilio trial accounts, please verify your phone number at twilio.com/console/phone-numbers/verified or upgrade your account.",
          },
          { status: 400 },
        )
      } else if (sendError.message && sendError.message.includes("not a valid phone number")) {
        return NextResponse.json(
          {
            error: "Invalid phone number format",
          },
          { status: 400 },
        )
      } else if (sendError.message && sendError.message.includes("timeout")) {
        return NextResponse.json(
          {
            error: "Email sending timeout. Please try again.",
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
