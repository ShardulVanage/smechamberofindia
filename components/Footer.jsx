"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin, ArrowUp, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function Footer({
  leftLogoSrc = "/sme-logo.svg",
  rightLogoSrc = "/akam.png",
  leftLogoText = "SME Chamber of India",
  rightLogoText = "Partner Org",
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    const footerElement = document.getElementById("footer")
    if (footerElement) {
      observer.observe(footerElement)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialLinks = [
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ]

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Membership", href: "/membership" },
    // { name: "Events", href: "/events" },
    { name: "News", href: "/news" },
  ]

  const services = [
    { name: "Indian SMEs", href: "/services/service-india" },
    { name: "Overseas SMEs", href: "/services/service-overseas" },
    { name: "Export Promotion", href: "/initiatives/export-promotion" },
    { name: "Leadership Council", href: "/initiatives/leadership-council" },
  ]

  const contactInfo = [
    { icon: Mail, text: "info@company.com", href: "mailto:info@company.com" },
    { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, text: "123 Business Street, City, State 12345", href: "#" },
  ]

  return (
    <>
      <footer id="footer" className="relative bg-[#29688A] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10" />
          <div
            className="absolute inset-0 bg-repeat opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='60' cy='0' r='2'/%3E%3Ccircle cx='0' cy='60' r='2'/%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Animated Wave */}
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              className="fill-white/10"
            >
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                values="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z;M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z;M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z;M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              />
            </path>
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div
              className={cn(
                "space-y-6 transition-all duration-700 delay-100",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
            >
              <div className="space-y-4">
                <Image
                  src={leftLogoSrc || "/placeholder.svg"}
                  alt={leftLogoText}
                  width={120}
                  height={60}
                  className="h-32 w-auto object-contain  bg-white rounded-2xl  "
                />
                <p className="text-white/80 text-sm leading-relaxed">
                  Empowering small and medium enterprises through innovative solutions, strategic partnerships, and
                  comprehensive support services.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="group p-3 bg-white/10 rounded-full border border-white/20 transition-all duration-300 hover:bg-white hover:scale-110 hover:shadow-lg"
                    >
                      <Icon className="w-4 h-4 text-white group-hover:text-[#29688A] transition-colors duration-300" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div
              className={cn(
                "space-y-6 transition-all duration-700 delay-200",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
            >
              <h3 className="text-xl font-semibold text-white">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-white/80 hover:text-white transition-all duration-300"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="group-hover:underline">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div
              className={cn(
                "space-y-6 transition-all duration-700 delay-300",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
            >
              <h3 className="text-xl font-semibold text-white">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="group flex items-center text-white/80 hover:text-white transition-all duration-300"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                      <span className="group-hover:underline">{service.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div
              className={cn(
                "space-y-6 transition-all duration-700 delay-400",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
            >
              <h3 className="text-xl font-semibold text-white">Contact Us</h3>
              <ul className="space-y-4">
                {contactInfo.map((contact, index) => {
                  const Icon = contact.icon
                  return (
                    <li key={index}>
                      <Link
                        href={contact.href}
                        className="group flex items-start gap-3 text-white/80 hover:text-white transition-all duration-300"
                      >
                        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        <span className="group-hover:underline">{contact.text}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Partner Logo */}
              {/* <div className="pt-4">
                <Image
                  src={rightLogoSrc || "/placeholder.svg"}
                  alt={rightLogoText}
                  width={100}
                  height={50}
                  className="h-12 w-auto object-contain filter brightness-0 invert opacity-80"
                />
              </div> */}
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className={cn(
              "border-t border-white/20 pt-8 transition-all duration-700 delay-500",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-white/60 text-sm text-center md:text-left">
                <p>&copy; 2024 {leftLogoText}. All rights reserved.</p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
                <Link href="/privacy" className="text-white/60 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white/60 hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-white/60 hover:text-white transition-colors duration-300">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-8 right-8 p-3 bg-white text-[#29688A] rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl z-50",
            showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
          )}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </footer>
    </>
  )
}
