import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const g = globalThis
if (!g.otpStorage) g.otpStorage = new Map()
if (!g.rateLimitStorage) g.rateLimitStorage = new Map()
if (!g.ipRateLimitStorage) g.ipRateLimitStorage = new Map()

const otpStorage = g.otpStorage
const rateLimitStorage = g.rateLimitStorage
const ipRateLimitStorage = g.ipRateLimitStorage

const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 15
const IP_MAX_ATTEMPTS = 15 // per-IP cap regardless of email

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
  return cfConnectingIP || realIP || (forwarded?.split(",")[0] || "").trim() || "unknown"
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
  } catch (err) {
    console.error("[council/send-otp] reCAPTCHA error:", err)
    return false
  }
}

async function sendSMSOTP(phoneNumber, otp) {
  try {
    const message = encodeURIComponent(`${otp} is the OTP for the registration process - SMECHM`)
    const url = `${process.env.SMS_GATEWAY_URL}?apikey=${process.env.SMS_API_KEY}&type=TEXT&sender=${process.env.SMS_SENDER}&entityId=${process.env.SMS_ENTITY_ID}&mobile=${phoneNumber}&message=${message}`

    const response = await fetch(url, {
      method: "GET",
      timeout: 30000,
    })

    if (!response.ok) {
      throw new Error(`SMS Gateway responded with status: ${response.status}`)
    }

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

    return { success: true }
  } catch (error) {
    console.error("[council/send-otp] SMS Gateway error:", error)
    
    // Re-throw our custom error messages
    if (error.message.includes("Invalid phone number format") || 
        error.message.includes("Failed to send SMS. Please check")) {
      throw error
    }
    
    // For network/timeout errors
    throw new Error("SMS service is currently unavailable. Please try again later.")
  }
}

// Email validation function
async function validateEmail(email) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    })
    
    // Verify SMTP connection
    await transporter.verify()
    return true
  } catch (error) {
    console.error("[council/send-otp] Email validation error:", error)
    throw new Error("Email service is currently unavailable. Please try again later.")
  }
}

export async function POST(request) {
  try {
    const { email, phone, mobile, recaptchaToken, isResend } = await request.json()

    const normalizedEmail = normalizeEmail(email)
    const clientIP = getClientIP(request)
    const now = Date.now()

    // Basic email format validation
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
    }

    // Basic phone number validation
    const phoneToUse = phone || mobile
    if (!phoneToUse || phoneToUse.length < 10) {
      return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 })
    }

    // Per-IP attempts + temporary ban
    const ipData = ipRateLimitStorage.get(clientIP)
    if (ipData) {
      const { attempts, firstAttempt, bannedUntil } = ipData
      if (bannedUntil && now < bannedUntil) {
        const mins = Math.ceil((bannedUntil - now) / 60000)
        return NextResponse.json({ error: `IP temporarily banned. Try again in ${mins} minutes.` }, { status: 429 })
      }
      if (now - firstAttempt > RATE_LIMIT_WINDOW) {
        ipRateLimitStorage.set(clientIP, { attempts: 1, firstAttempt: now, bannedUntil: null })
      } else {
        const nextAttempts = attempts + 1
        if (nextAttempts >= IP_MAX_ATTEMPTS) {
          const bannedUntilNext = now + RATE_LIMIT_WINDOW
          ipRateLimitStorage.set(clientIP, { attempts: nextAttempts, firstAttempt, bannedUntil: bannedUntilNext })
          return NextResponse.json({ error: "Too many requests from this IP. Banned for 15 minutes." }, { status: 429 })
        }
        ipRateLimitStorage.set(clientIP, { attempts: nextAttempts, firstAttempt, bannedUntil: null })
      }
    } else {
      ipRateLimitStorage.set(clientIP, { attempts: 1, firstAttempt: now, bannedUntil: null })
    }

    // Per-IP+email attempts
    const rlKey = `${clientIP}-${normalizedEmail}`
    const rlData = rateLimitStorage.get(rlKey)
    if (rlData) {
      const { attempts, firstAttempt } = rlData
      if (now - firstAttempt < RATE_LIMIT_WINDOW) {
        if (attempts >= MAX_ATTEMPTS) {
          return NextResponse.json(
            { error: "Too many OTP requests for this email. Please try again after 15 minutes." },
            { status: 429 },
          )
        }
        rateLimitStorage.set(rlKey, { attempts: attempts + 1, firstAttempt })
      } else {
        rateLimitStorage.set(rlKey, { attempts: 1, firstAttempt: now })
      }
    } else {
      rateLimitStorage.set(rlKey, { attempts: 1, firstAttempt: now })
    }

    // reCAPTCHA guard on first send
    if (!isResend && recaptchaToken) {
      const ok = await verifyRecaptcha(recaptchaToken)
      if (!ok) return NextResponse.json({ error: "Invalid reCAPTCHA verification" }, { status: 400 })
    }

    // Validate email service availability first
    await validateEmail(normalizedEmail)

    const emailOtp = generateOTP()
    const smsOtp = generateOTP()

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    })

    const otpEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #29688A; color: white; padding: 20px; text-align: center;">
          <h1>Council Application Verification - Email OTP</h1>
        </div>
        <div style="padding: 30px; text-align: center;">
          <h2 style="color: #29688A; margin-bottom: 20px;">Your Email Verification Code</h2>
          <div style="background-color: #f8f9fa; border: 2px dashed #29688A; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <h1 style="color: #29688A; font-size: 36px; margin: 0; letter-spacing: 8px;">${emailOtp}</h1>
          </div>
          <p style="color: #666; margin: 20px 0;">This email OTP is valid for <strong>3 minutes</strong>.</p>
          <p style="color: #666; font-size: 14px;">You will also receive an SMS OTP on your phone number.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this OTP, please ignore this email.</p>
        </div>
        <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;">
          <p>This is an automated email. Please do not reply to this message.</p>
        </div>
      </div>
    `

    // Send the actual OTPs
    const emailPromise = transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: normalizedEmail,
      subject: "Council Application - OTP Verification",
      html: otpEmailHtml,
    })

    const smsPromise = sendSMSOTP(phoneToUse, smsOtp)

    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("OTP sending timeout")), 60000))

    try {
      await Promise.race([Promise.all([emailPromise, smsPromise]), timeoutPromise])

      // Only store OTP data if both email and SMS were sent successfully
      otpStorage.set(normalizedEmail, {
        emailOtp,
        smsOtp,
        email: normalizedEmail,
        phone: phoneToUse,
        clientIP,
        createdAt: now,
        expiresAt: now + 3 * 60 * 1000, // 3 minutes
      })
    } catch (error) {
      console.error("[council/send-otp] Error sending OTPs:", error)
      
      // Handle specific error types
      if (error.message?.includes("Invalid phone number") || 
          error.message?.includes("Failed to send SMS")) {
        throw error
      }
      
      if (error.message?.includes("timeout")) {
        throw new Error("Request timed out. Please try again.")
      }

      // For other errors, throw a generic message
      throw new Error("Failed to send verification codes. Please check your email and phone number and try again.")
    }

    return NextResponse.json({
      message: "OTPs sent successfully to both email and phone",
      expiresIn: 180,
    })
  } catch (error) {
    console.error("[council/send-otp] Error:", error)
    return NextResponse.json({ error: error.message || "Failed to send OTP" }, { status: 500 })
  }
}