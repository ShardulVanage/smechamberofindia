const g = globalThis

if (!g.__strategicStores) {
  g.__strategicStores = {
    otpStorage: new Map(), // key: normalizedEmail -> { otp, email, mobile, clientIP, createdAt, expiresAt }
    ipRateLimitStorage: new Map(), // key: ip -> { attempts, firstAttempt, bannedUntil }
    rateLimitStorage: new Map(), // key: ip-email -> { attempts, firstAttempt }
    verificationTokens: new Map(), // key: token -> { email, createdAt, expiresAt, used }
    submitRateLimit: new Map(), // key: ip -> { attempts, firstAttempt }
  }
}

export const stores = g.__strategicStores
