"use client"


import { useRef, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function MembershipForm({ siteKey }) {
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
  const [sendingOtp, setSendingOtp] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [otp, setOtp] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [verifiedToken, setVerifiedToken] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [notice, setNotice] = useState(null)

  const showError = (message) => setNotice({ type: "error", message })
  const showInfo = (message) => setNotice({ type: "info", message })
  const showSuccess = (message) => setNotice({ type: "success", message })

  const onInput = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

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

  async function fetchJSON(url, options = {}, timeoutMs = 15000) {
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
    if (!form.email) return showError("Email is required to receive an OTP.")
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
        body: JSON.stringify({ email: form.email, recaptchaToken: token }),
      })
      if (!res.ok) throw new Error(data?.error || "Failed to send OTP")
      setSessionId(data.sessionId)
      showSuccess("OTP sent to your email. Please check your inbox and enter the 6-digit code.")
    } catch (e) {
      if (e?.name === "AbortError") showError("Request timed out while sending OTP. Please try again.")
      else showError(e?.message || "Failed to send OTP. Please try again.")
    } finally {
      setSendingOtp(false)
    }
  }

  async function handleVerifyOtp() {
    setNotice(null)
    if (!sessionId) return showError("No OTP session found. Please send an OTP first.")
    if (!otp.trim()) return showError("Please enter the 6-digit OTP.")

    try {
      setVerifying(true)
      const { res, data } = await fetchJSON("/api/council/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, email: form.email, otp }),
      })
      if (!res.ok) throw new Error(data?.error || "OTP verification failed")
      setVerifiedToken(data.verifiedToken)
      showSuccess("OTP verified. You can now submit your application.")
    } catch (e) {
      if (e?.name === "AbortError") showError("OTP verification timed out. Please try again.")
      else showError(e?.message || "OTP verification failed. Please try again.")
    } finally {
      setVerifying(false)
    }
  }

  async function handleSubmit() {
    setNotice(null)
    if (!verifiedToken) return showError("Please verify your OTP before submitting the application.")
    const missing = validateRequired()
    if (missing) {
      const label = missing.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())
      return showError(`Please fill the required field: ${label}.`)
    }

    try {
      setSubmitting(true)
      const { res, data } = await fetchJSON("/api/council", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verifiedToken, form }),
      })
      if (!res.ok) throw new Error(data?.error || "Submission failed")
      showSuccess("Application submitted successfully. We’ve emailed you a confirmation.")
      // Reset
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
      setSessionId(null)
      setVerifiedToken(null)
      setOtp("")
    } catch (e) {
      if (e?.name === "AbortError") showError("Submission timed out. Please try again.")
      else showError(e?.message || "Failed to submit application. Please try again.")
    } finally {
      setSubmitting(false)
    }
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
          <Input
            id="mobile"
            placeholder="Your mobile number"
            value={form.mobile}
            onChange={onInput("mobile")}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone No.</Label>
          <Input id="phone" placeholder="Your phone number" value={form.phone} onChange={onInput("phone")} />
        </div>
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

      {/* Invisible reCAPTCHA (invisible) for OTP step */}
      <div className="sr-only">
        {siteKey ? <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} size="invisible" /> : null}
      </div>

      {!sessionId && (
        <Button
          onClick={handleSendOtp}
          disabled={sendingOtp || !form.email}
          className="w-full bg-[#29688A] hover:bg-[#1e4d66] text-white py-3 text-lg"
        >
          {sendingOtp ? "Sending OTP..." : "Send OTP"}
        </Button>
      )}

      {sessionId && !verifiedToken && (
        <div className="grid md:grid-cols-[1fr_auto] gap-4 items-end">
          <div>
            <Label htmlFor="otp">Enter OTP</Label>
            <Input id="otp" placeholder="6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          </div>
          <Button
            onClick={handleVerifyOtp}
            disabled={verifying || !otp}
            className="bg-[#29688A] hover:bg-[#1e4d66] text-white"
          >
            {verifying ? "Verifying..." : "Verify OTP"}
          </Button>
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={submitting || !verifiedToken}
        className="w-full bg-[#29688A] hover:bg-[#1e4d66] text-white py-3 text-lg"
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </Button>
    </div>
  )
}
