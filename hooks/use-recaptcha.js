"use client"

import { useCallback, useEffect, useState } from "react"

export function useRecaptcha(siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
  const [loaded, setLoaded] = useState(false)
  const [widgetId, setWidgetId] = useState(null)

  useEffect(() => {
    if (!siteKey) return
    if (typeof window === "undefined") return

    const exists = document.querySelector('script[src^="https://www.google.com/recaptcha/api.js"]')
    if (exists) {
      setLoaded(true)
      return
    }

    // Load reCAPTCHA v2 script
    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js"
    script.async = true
    script.defer = true
    script.onload = () => setLoaded(true)
    document.head.appendChild(script)

    return () => {
      // do not remove script to allow reuse
    }
  }, [siteKey])

  const renderRecaptcha = useCallback(
    (elementId, callback) => {
      if (!loaded || !window.grecaptcha || !siteKey) return null
      
      try {
        const id = window.grecaptcha.render(elementId, {
          sitekey: siteKey,
          callback: callback,
          'expired-callback': () => {
            // Handle expiration
            if (callback) callback(null)
          }
        })
        setWidgetId(id)
        return id
      } catch (error) {
        console.error('Error rendering reCAPTCHA:', error)
        return null
      }
    },
    [loaded, siteKey]
  )

  const resetRecaptcha = useCallback(() => {
    if (widgetId !== null && window.grecaptcha) {
      try {
        window.grecaptcha.reset(widgetId)
      } catch (error) {
        console.error('Error resetting reCAPTCHA:', error)
      }
    }
  }, [widgetId])

  const getResponse = useCallback(() => {
    if (widgetId !== null && window.grecaptcha) {
      try {
        return window.grecaptcha.getResponse(widgetId)
      } catch (error) {
        console.error('Error getting reCAPTCHA response:', error)
        return null
      }
    }
    return null
  }, [widgetId])

  return { 
    loaded, 
    renderRecaptcha, 
    resetRecaptcha, 
    getResponse,
    widgetId 
  }
}