"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Youtube, Twitter, Menu, X, ChevronDown } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export function Navbar({
  useImageLogos = false,
  leftLogoSrc = "/sme-logo.svg",
  rightLogoSrc = "/akam.png",
  leftLogoText = "Your Company",
  rightLogoText = "Partner Org",
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [screenWidth, setScreenWidth] = useState(1024) // Default to desktop width
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const servicesRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    // Set initial width
    setScreenWidth(window.innerWidth)

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          if (scrollTop > 100 && !isScrolled) {
            setIsScrolled(true)
          } else if (scrollTop <= 10 && isScrolled) {
            setIsScrolled(false)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isScrolled])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setIsServicesOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const socialLinks = [
    { icon: Youtube, href: "#", color: "hover:text-white hover:bg-[#29688A]" },
    { icon: Twitter, href: "#", color: "hover:text-white hover:bg-[#29688A]" },
    { icon: Facebook, href: "#", color: "hover:text-white hover:bg-[#29688A]" },
    { icon: Instagram, href: "#", color: "hover:text-white hover:bg-[#29688A]" },
  ]

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Membership", href: "/membership" },
    { name: "Events", href: "/events" },
    { name: "Webinar", href: "/webinar" },
    { name: "Initiatives", href: "/initiatives" },
    { name: "Partners", href: "/partners" },
    { name: "Awards", href: "/awards" },
    { name: "Gallery", href: "/gallery" },
    { name: "News", href: "/news" },
    { name: "Join Us", href: "/join-us" },
  ]

  const servicesOptions = [
    { name: "Indian SMEs", href: "/services/service-india" },
    { name: "Overseas SMEs", href: "/services/service-overseas" },
  ]

  return (
    <header className="w-full sticky top-0 z-50">
      <div
        className={cn(
          "bg-[#29688A]  backdrop-blur-md border-b border-gray-200 overflow-hidden transition-all duration-500 ease-in-out",
          "hidden md:block", // Hidden on mobile
          isScrolled ? "max-h-0 opacity-0 -translate-y-full" : "max-h-20 opacity-100 translate-y-0",
        )}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-end items-center gap-3">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <Link
                  key={index}
                  href={social.href}
                  className={cn(
                    "p-2 rounded-full bg-white border border-gray-200 transition-all duration-200 hover:scale-110 text-[#29688A] ",
                    social.color,
                  )}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div
            className={cn(
              "flex justify-between items-center mb-4 overflow-hidden transition-all duration-500 ease-in-out",
              isScrolled ? "max-h-0 opacity-0 -translate-y-8 mb-0" : "max-h-32 opacity-100 translate-y-0 mb-4",
            )}
          >
            {/* Left logo - always visible */}
            <div className="flex items-center">
              <Image
                src={leftLogoSrc || "/placeholder.svg"}
                alt="Left Logo"
                width={100}
                height={50}
                className="h-16 md:h-20 lg:h-24 w-auto object-contain transition-all duration-500"
              />
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6 text-[#29688A]" /> : <Menu className="w-6 h-6 text-[#29688A]" />}
            </button>

            <div className="hidden md:flex items-center">
              <Image
                src={rightLogoSrc || "/placeholder.svg"}
                alt="Right Logo"
                width={100}
                height={50}
                className="h-16 md:h-20 lg:h-24 w-auto object-contain transition-all duration-500"
              />
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="bg-white/90 backdrop-blur-md rounded-full px-6 py-3 border border-gray-200 shadow-lg transition-all duration-300">
              <NavigationMenu>
                <NavigationMenuList className="flex items-center gap-1">
                  {navItems.slice(0, 3).map((item) => (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuLink
                        href={item.href}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-full px-3 lg:px-6 py-2 text-xs lg:text-sm font-medium transition-all duration-200",
                          "text-[#29688A] hover:text-white hover:bg-[#29688A] hover:backdrop-blur-sm",
                          "focus:bg-[#29688A] focus:text-white focus:outline-none",
                          "data-[active]:bg-[#29688A] data-[active]:text-white",
                        )}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}

                  <NavigationMenuItem>
                    <div className="relative" ref={servicesRef}>
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-full px-3 lg:px-6 py-2 text-xs lg:text-sm font-medium transition-all duration-200",
                          "text-[#29688A] hover:text-white hover:bg-[#29688A] hover:backdrop-blur-sm",
                          "focus:bg-[#29688A] focus:text-white focus:outline-none",
                          isServicesOpen && "bg-[#29688A] text-white",
                        )}
                      >
                        Services
                        <ChevronDown
                          className={cn(
                            "ml-1 h-3 w-3 transition-transform duration-200",
                            isServicesOpen && "rotate-180",
                          )}
                        />
                      </button>

                      {isServicesOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                          {servicesOptions.map((option) => (
                            <Link
                              key={option.name}
                              href={option.href}
                              onClick={() => setIsServicesOpen(false)}
                              className="block px-4 py-2 text-sm text-[#29688A] hover:bg-[#29688A] hover:text-white transition-colors duration-200"
                            >
                              {option.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </NavigationMenuItem>

                  {navItems.slice(3, screenWidth >= 1024 ? navItems.length : 7).map((item) => (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuLink
                        href={item.href}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-full px-3 lg:px-6 py-2 text-xs lg:text-sm font-medium transition-all duration-200",
                          "text-[#29688A] hover:text-white hover:bg-[#29688A] hover:backdrop-blur-sm",
                          "focus:bg-[#29688A] focus:text-white focus:outline-none",
                          "data-[active]:bg-[#29688A] data-[active]:text-white",
                        )}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 overflow-y-auto transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-[#29688A] hover:bg-[#29688A] hover:text-white rounded-lg transition-all duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}

            <div>
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-[#29688A] hover:bg-[#29688A] hover:text-white rounded-lg transition-all duration-200 font-medium"
              >
                Services
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-200", isMobileServicesOpen && "rotate-180")}
                />
              </button>

              {isMobileServicesOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  {servicesOptions.map((option) => (
                    <Link
                      key={option.name}
                      href={option.href}
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsMobileServicesOpen(false)
                      }}
                      className="block px-4 py-2 text-sm text-[#29688A] hover:bg-[#29688A] hover:text-white rounded-lg transition-all duration-200"
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.slice(3).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-[#29688A] hover:bg-[#29688A] hover:text-white rounded-lg transition-all duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}

            <div className="flex justify-center gap-4 pt-4 border-t border-gray-200 mt-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <Link
                    key={index}
                    href={social.href}
                    className={cn(
                      "p-2 rounded-full bg-white border border-gray-200 transition-all duration-200 hover:scale-110 text-[#29688A]",
                      social.color,
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
