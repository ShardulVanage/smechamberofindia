"use client"

import { useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CouncilForm({ siteKey }) {
  const recaptchaRef = useRef(null)

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    company: "",
    businessActivity: "",
    businessSector: "",
    businessInterest: "",
    products: "",
    mobile: "",
    phone: "",
    email: "",
    address: "",
  })

  const [step, setStep] = useState("form") // "form", "otp", "success"
  const [sendingOtp, setSendingOtp] = useState(false)
  const [emailOtp, setEmailOtp] = useState("")
  const [phoneOtp, setPhoneOtp] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [notice, setNotice] = useState(null)

  const showError = (message) => setNotice({ type: "error", message })
  const showInfo = (message) => setNotice({ type: "info", message })
  const showSuccess = (message) => setNotice({ type: "success", message })

  const onInput = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSelect = (value) => setForm((f) => ({ ...f, businessSector: value }))

  const requiredKeys = [
    "firstName",
    "lastName",
    "designation",
    "company",
    "businessActivity",
    "businessSector",
    "businessInterest",
    "products",
    "mobile",
    "email",
    "address",
  ]

  function validateRequired() {
    for (const k of requiredKeys) {
      if (!String(form[k]).trim()) return k
    }
    return null
  }

  async function fetchJSON(url, options = {}, timeoutMs = 10000) {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeoutMs)
    try {
      const res = await fetch(url, { ...options, signal: controller.signal })
      const data = await res.json().catch(() => ({}))
      return { res, data }
    } finally {
      clearTimeout(id)
    }
  }

  async function handleSendOtp() {
    setNotice(null)

    // Validate all required fields first
    const missing = validateRequired()
    if (missing) {
      const label = missing.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())
      return showError(`Please fill the required field: ${label}.`)
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) return showError("Please enter a valid email address.")
    if (!siteKey) return showError("reCAPTCHA is not configured. Please set the site key.")

    try {
      setSendingOtp(true)
      const token = await recaptchaRef.current?.executeAsync()
      recaptchaRef.current?.reset()
      if (!token) return showError("reCAPTCHA could not be completed. Please try again.")

      const { res, data } = await fetchJSON("/api/council/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          phone: form.mobile,
          recaptchaToken: token,
        }),
      })
      if (!res.ok) throw new Error(data?.error || "Failed to send OTP")

      setStep("otp")
      showSuccess("Verification codes sent to your email and phone. Please enter both codes below.")
    } catch (e) {
      if (e?.name === "AbortError") showError("Request timed out while sending OTP. Please try again.")
      else showError(e?.message || "Failed to send OTP. Please try again.")
    } finally {
      setSendingOtp(false)
    }
  }

  async function handleVerifyBothOtps() {
    setNotice(null)
    if (!emailOtp.trim()) return showError("Please enter the 6-digit email OTP.")
    if (!phoneOtp.trim()) return showError("Please enter the 6-digit phone OTP.")

    try {
      setVerifying(true)
      const { res, data } = await fetchJSON("/api/council/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          phone: form.mobile,
          emailOtp,
          phoneOtp,
          formData: form,
        }),
      })
      if (!res.ok) throw new Error(data?.error || "OTP verification failed")

      if (data.success) {
        setStep("success")
        showSuccess("Application submitted successfully! We've emailed you a confirmation.")

        // Reset form
        setForm({
          firstName: "",
          lastName: "",
          designation: "",
          company: "",
          businessActivity: "",
          businessSector: "",
          businessInterest: "",
          products: "",
          mobile: "",
          phone: "",
          email: "",
          address: "",
        })
        setEmailOtp("")
        setPhoneOtp("")
      } else {
        showError("Verification failed. Please check your OTPs and try again.")
      }
    } catch (e) {
      if (e?.name === "AbortError") showError("OTP verification timed out. Please try again.")
      else showError(e?.message || "OTP verification failed. Please try again.")
    } finally {
      setVerifying(false)
    }
  }

  function handleStartOver() {
    setStep("form")
    setNotice(null)
    setEmailOtp("")
    setPhoneOtp("")
  }

  return (
    <div className="space-y-6">
      {notice ? (
        <div
          role="status"
          aria-live="polite"
          className={
            notice.type === "success"
              ? "rounded-md border border-green-400 bg-green-50 text-green-800 px-4 py-3"
              : notice.type === "info"
                ? "rounded-md border border-amber-400 bg-amber-50 text-amber-800 px-4 py-3"
                : "rounded-md border border-red-400 bg-red-50 text-red-800 px-4 py-3"
          }
        >
          {notice.message}
        </div>
      ) : null}

      {step === "form" && (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                value={form.firstName}
                onChange={onInput("firstName")}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                value={form.lastName}
                onChange={onInput("lastName")}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="designation">Designation *</Label>
              <Input
                id="designation"
                placeholder="Your designation"
                value={form.designation}
                onChange={onInput("designation")}
                required
              />
            </div>
            <div>
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                placeholder="Your company name"
                value={form.company}
                onChange={onInput("company")}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessActivity">Business Activity *</Label>
              <Input
                id="businessActivity"
                placeholder="Your business activity"
                value={form.businessActivity}
                onChange={onInput("businessActivity")}
                required
              />
            </div>
            <div>
              <Label htmlFor="businessSector">Business Sector *</Label>
              <Select value={form.businessSector} onValueChange={onSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="businessInterest">Business Interest *</Label>
            <Textarea
              id="businessInterest"
              placeholder="Describe your business interests"
              value={form.businessInterest}
              onChange={onInput("businessInterest")}
              required
            />
          </div>

          <div>
            <Label htmlFor="products">Details of Products & Services to promote amongst SMEs *</Label>
            <Textarea
              id="products"
              placeholder="Describe your products and services"
              value={form.products}
              onChange={onInput("products")}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="mobile">Mobile No. *</Label>
              <PhoneInput
                id="mobile"
                placeholder="Enter phone number"
                value={form.mobile}
                onChange={(value) => setForm((f) => ({ ...f, mobile: value || "" }))}
                defaultCountry="IN"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email address"
                value={form.email}
                onChange={onInput("email")}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              placeholder="Your complete address"
              value={form.address}
              onChange={onInput("address")}
              required
            />
          </div>

          {/* Invisible reCAPTCHA for OTP step */}
          <div className="sr-only">
            {siteKey ? <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} size="invisible" /> : null}
          </div>

          <Button
            onClick={handleSendOtp}
            disabled={sendingOtp}
            className="w-full bg-[#29688A] hover:bg-[#1e4d66] text-white py-3 text-lg"
          >
            {sendingOtp ? "Sending Verification Codes..." : "Send Verification Codes"}
          </Button>
        </>
      )}

      {step === "otp" && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">Verify Your Identity</h3>
            <p className="text-sm text-gray-600 mt-2">
              We've sent verification codes to your email ({form.email}) and phone ({form.mobile}). Please enter both
              codes below to continue.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emailOtp">Email Verification Code</Label>
              <Input
                id="emailOtp"
                placeholder="6-digit email code"
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                maxLength={6}
              />
            </div>
            <div>
              <Label htmlFor="phoneOtp">Phone Verification Code</Label>
              <Input
                id="phoneOtp"
                placeholder="6-digit phone code"
                value={phoneOtp}
                onChange={(e) => setPhoneOtp(e.target.value)}
                maxLength={6}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleVerifyBothOtps}
              disabled={verifying || !emailOtp || !phoneOtp}
              className="flex-1 bg-[#29688A] hover:bg-[#1e4d66] text-white py-3"
            >
              {verifying ? "Verifying & Submitting..." : "Verify & Submit Application"}
            </Button>
            <Button onClick={handleStartOver} variant="outline" disabled={verifying} className="px-6 bg-transparent">
              Back
            </Button>
          </div>
        </div>
      )}

      {step === "success" && (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Application Submitted Successfully!</h3>
          <p className="text-gray-600">
            Thank you for your application. We've sent a confirmation email to {form.email}. Our team will review your
            application and get back to you soon.
          </p>
          <Button onClick={handleStartOver} className="bg-[#29688A] hover:bg-[#1e4d66] text-white">
            Submit Another Application
          </Button>
        </div>
      )}
    </div>
  )
}
