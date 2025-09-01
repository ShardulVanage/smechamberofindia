import { stores } from "./storage"

const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_OTP_ATTEMPTS_PER_EMAIL = 3
const MAX_OTP_ATTEMPTS_PER_IP = 5
const MAX_SUBMIT_PER_IP = 5

export function rateLimitOTP(ip, email) {
  const now = Date.now()

  // IP-level limit with temporary ban
  const ipData = stores.ipRateLimitStorage.get(ip)
  if (ipData) {
    const { attempts, firstAttempt, bannedUntil } = ipData
    if (bannedUntil && now < bannedUntil) {
      const remaining = Math.ceil((bannedUntil - now) / 60000)
      return { ok: false, status: 429, error: `IP temporarily banned. Try again in ${remaining} minutes.` }
    }
    if (now - firstAttempt > RATE_LIMIT_WINDOW) {
      stores.ipRateLimitStorage.set(ip, { attempts: 1, firstAttempt: now, bannedUntil: null })
    } else {
      const newAttempts = attempts + 1
      if (newAttempts >= MAX_OTP_ATTEMPTS_PER_IP) {
        const bannedUntil = now + RATE_LIMIT_WINDOW
        stores.ipRateLimitStorage.set(ip, { attempts: newAttempts, firstAttempt, bannedUntil })
        return { ok: false, status: 429, error: "Too many requests from this IP. Banned for 15 minutes." }
      }
      stores.ipRateLimitStorage.set(ip, { attempts: newAttempts, firstAttempt, bannedUntil: null })
    }
  } else {
    stores.ipRateLimitStorage.set(ip, { attempts: 1, firstAttempt: now, bannedUntil: null })
  }

  // Email+IP level limit
  const key = `${ip}-${email}`
  const data = stores.rateLimitStorage.get(key)
  if (data) {
    const { attempts, firstAttempt } = data
    if (now - firstAttempt < RATE_LIMIT_WINDOW) {
      if (attempts >= MAX_OTP_ATTEMPTS_PER_EMAIL) {
        return {
          ok: false,
          status: 429,
          error: "Too many OTP requests for this email. Please try again after 15 minutes.",
        }
      }
      stores.rateLimitStorage.set(key, { attempts: attempts + 1, firstAttempt })
    } else {
      stores.rateLimitStorage.set(key, { attempts: 1, firstAttempt: now })
    }
  } else {
    stores.rateLimitStorage.set(key, { attempts: 1, firstAttempt: now })
  }

  return { ok: true }
}

export function rateLimitSubmit(ip) {
  const now = Date.now()
  const data = stores.submitRateLimit.get(ip)
  if (!data) {
    stores.submitRateLimit.set(ip, { attempts: 1, firstAttempt: now })
    return { ok: true }
  }
  const { attempts, firstAttempt } = data
  if (now - firstAttempt > RATE_LIMIT_WINDOW) {
    stores.submitRateLimit.set(ip, { attempts: 1, firstAttempt: now })
    return { ok: true }
  }
  if (attempts >= MAX_SUBMIT_PER_IP) {
    return { ok: false, status: 429, error: "Too many submissions from this IP. Please wait and try again." }
  }
  stores.submitRateLimit.set(ip, { attempts: attempts + 1, firstAttempt })
  return { ok: true }
}
