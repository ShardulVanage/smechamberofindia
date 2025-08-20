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
  const [screenWidth, setScreenWidth] = useState(1024)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isEventsOpen, setIsEventsOpen] = useState(false)
  const [isMobileEventsOpen, setIsMobileEventsOpen] = useState(false)
  const [isWebinarOpen, setIsWebinarOpen] = useState(false)
  const [isMobileWebinarOpen, setIsMobileWebinarOpen] = useState(false)
  const [isInitiativesOpen, setIsInitiativesOpen] = useState(false)
  const [isMobileInitiativesOpen, setIsMobileInitiativesOpen] = useState(false)
  const [isPartnersOpen, setIsPartnersOpen] = useState(false)
  const [isMobilePartnersOpen, setIsMobilePartnersOpen] = useState(false)
  const [isAwardsOpen, setIsAwardsOpen] = useState(false)
  const [isMobileAwardsOpen, setIsMobileAwardsOpen] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isMobileGalleryOpen, setIsMobileGalleryOpen] = useState(false)

  const servicesRef = useRef(null)
  const eventsRef = useRef(null)
  const webinarRef = useRef(null)
  const initiativesRef = useRef(null)
  const partnersRef = useRef(null)
  const awardsRef = useRef(null)
  const galleryRef = useRef(null)

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
      if (eventsRef.current && !eventsRef.current.contains(event.target)) {
        setIsEventsOpen(false)
      }
      if (webinarRef.current && !webinarRef.current.contains(event.target)) {
        setIsWebinarOpen(false)
      }
      if (initiativesRef.current && !initiativesRef.current.contains(event.target)) {
        setIsInitiativesOpen(false)
      }
      if (partnersRef.current && !partnersRef.current.contains(event.target)) {
        setIsPartnersOpen(false)
      }
      if (awardsRef.current && !awardsRef.current.contains(event.target)) {
        setIsAwardsOpen(false)
      }
      if (galleryRef.current && !galleryRef.current.contains(event.target)) {
        setIsGalleryOpen(false)
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
    { name: "News", href: "/news" },
    { name: "Join Us", href: "/membership" },
  ]

  const servicesOptions = [
    { name: "Indian SMEs", href: "/services/service-india" },
    { name: "Overseas SMEs", href: "/services/service-overseas" },
  ]

  const eventsOptions = [
    { name: "Forthcoming Events", href: "/events/forthcoming-events" },
    { name: "Supported Exhibitions", href: "/events/supported-exhibitions" },
    { name: "Enquiry for Stall Booking", href: "/events/enquiry-for-stall-booking" },
    { name: "Past Events", href: "/events/past-events" },
  ]

  const webinarOptions = [
    { name: "Live", href: "/webinar/live" },
    { name: "Past", href: "/webinar/past" },
  ]

  const initiativesOptions = [
    {
      name: "International Divisions",
      href: "/initiatives/international-divisions",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "National SME Manufacturing Mission",
      href: "/initiatives/national-sme-manufacturing",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Invest in Indian SMEs",
      href: "/initiatives/invest-indian-smes",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "SME Export Promotion Facilitation Centre",
      href: "/initiatives/export-promotion",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "SME Electronic Products Export Promotion Council",
      href: "/initiatives/electronic-export",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "India SME Leadership Council",
      href: "/initiatives/leadership-council",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Entrepreneurship Development Council",
      href: "/initiatives/entrepreneurship-development",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Entrepreneurial Leadership Dialogue",
      href: "/initiatives/entrepreneurial-dialogue",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "SME Connect Magazine",
      href: "/initiatives/sme-connect-magazine",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const partnersOptions = [
    { name: "Strategic Partners", href: "/partners/strategic-partners" },
    { name: "Global Partners", href: "/partners/global-partners" },
    { name: "SME Consultants", href: "/partners/sme-consultants" },
  ]

  const awardsOptions = [
    { name: "About", href: "/awards/about" },
    { name: "Apply", href: "https://indiasmeawards.com/apply-award.php" },
  ]

  const galleryOptions = [
    { name: "Photo", href: "/gallery/photo" },
    { name: "Video", href: "/gallery/video" },
  ]

  return (
    <header className="w-full sticky top-0 z-50">
      <div
        className={cn(
          "bg-[#29688A]  backdrop-blur-md border-b border-gray-200 overflow-hidden transition-all duration-500 ease-in-out",
          "hidden md:block",
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
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-500 ">
      {/* <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/parliamentbg.jpg')"
    }}
  /> */}
  
  {/* Black Overlay */}
  <div className="absolute inset-0 bg-blue/50" />


  
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div
            className={cn(
              "flex justify-between items-center mb-4 overflow-hidden transition-all duration-500 ease-in-out",
              isScrolled ? "max-h-0 opacity-0 -translate-y-8 mb-0" : "max-h-32 opacity-100 translate-y-0 mb-4",
            )}
          >
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
                className="h-16 md:h-20 lg:h-24 w-auto object-contain transition-all duration-500 drop-shadow-2xl "
              />
            </div>
          </div>

        <div className="hidden md:flex justify-center">
            <div className="bg-[#29688A]/90 backdrop-blur-md rounded-full px-6 py-3 border border-[#29688A] shadow-lg transition-all duration-300">
              <NavigationMenu>
                <NavigationMenuList className="flex items-center gap-1">
                  {navItems.slice(0, 4).map((item) => (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuLink
                        href={item.href}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-full px-3 lg:px-6 py-2 text-xs lg:text-sm font-medium transition-all duration-200",
                          "text-white hover:text-[#29688A] hover:bg-white hover:backdrop-blur-sm",
                          "focus:bg-white focus:text-[#29688A] focus:outline-none",
                          "data-[active]:bg-white data-[active]:text-[#29688A]",
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
                          "text-white hover:text-[#29688A] hover:bg-white hover:backdrop-blur-sm",
                          "focus:bg-white focus:text-[#29688A] focus:outline-none",
                          isServicesOpen && "bg-white text-[#29688A]",
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

                  <NavigationMenuItem>
                    <div className="relative" ref={eventsRef}>
                      <button
                        onClick={() => setIsEventsOpen(!isEventsOpen)}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-full px-3 lg:px-6 py-2 text-xs lg:text-sm font-medium transition-all duration-200",
                          "text-white hover:text-[#29688A] hover:bg-white hover:backdrop-blur-sm",
                          "focus:bg-white focus:text-[#29688A] focus:outline-none",
                          isEventsOpen && "bg-white text-[#29688A]",
                        )}
                      >
                        Events
                        <ChevronDown
                          className={cn("ml-1 h-3 w-3 transition-transform duration-200", isEventsOpen && "rotate-180")}
                        />
                      </button>

                      {isEventsOpen && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                          {eventsOptions.map((option) => (
                            <Link
                              key={option.name}
                              href={option.href}
                              onClick={() => setIsEventsOpen(false)}
                              className="block px-4 py-2 text-sm text-[#29688A] hover:bg-[#29688A] hover:text-white transition-colors duration-200"
                            >
                              {option.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <div className="relative" ref={webinarRef}>
                      <button
                        onClick={() => setIsWebinarOpen(!isWebinarOpen)}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-full px-3 lg:px-6 py-2 text-xs lg:text-sm font-medium transition-all duration-200",
                          "text-white hover:text-[#29688A] hover:bg-white hover:backdrop-blur-sm",
                          "focus:bg-white focus:text-[#29688A] focus:outline-none",
                          isWebinarOpen && "bg-white text-[#29688A]",
                        )}
                      >
                        Webinar
                        <ChevronDown
                          className={cn(
                            "ml-1 h-3 w-3 transition-transform duration-200",
                            isWebinarOpen && "rotate-180",
                          )}
                        />
                      </button>

                      {isWebinarOpen && (
                        <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                          {webinarOptions.map((option) => (
                            <Link
                              key={option.name}
                              href={option.href}
                              onClick={() => setIsWebinarOpen(false)}
                              className="block px-4 py-2 text-sm text-[#29688A] hover:bg-[#29688A] hover:text-white transition-colors duration-200"
                            >
                              {option.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <div className="relative" ref={initiativesRef}>
                      <button
                        onClick={() => setIsInitiativesOpen(!isInitiativesOpen)}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-full px-3 lg:px-6 py-2 text-xs lg:text-sm font-medium transition-all duration-200",
                          "text-white hover:text-[#29688A] hover:bg-white hover:backdrop-blur-sm",
                          "focus:bg-white focus:text-[#29688A] focus:outline-none",
                          isInitiativesOpen && "bg-white text-[#29688A]",
                        )}
                      >
                        Initiatives
                        <ChevronDown
                          className={cn(
                            "ml-1 h-3 w-3 transition-transform duration-200",
                            isInitiativesOpen && "rotate-180",
                          )}
                        />
                      </button>

                      {isInitiativesOpen && (
                        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                          {initiativesOptions.map((option) => (
                            <Link
                              key={option.name}
                              href={option.href}
                              onClick={() => setIsInitiativesOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 text-sm text-[#29688A] hover:bg-[#29688A] hover:text-white transition-colors duration-200"
                            >
                              <Image
                                src={option.image || "/placeholder.svg"}
                                alt={option.name}
                                width={32}
                                height={32}
                                className="w-8 h-8 object-contain flex-shrink-0"
                              />
                              <span className="flex-1">{option.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <div className="relative" ref={partnersRef}>
                      <button
                        onClick={() => setIsPartnersOpen(!isPartnersOpen)}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-full px-3 lg:px-6 py-2 text-xs lg:text-sm font-medium transition-all duration-200",
                          "text-white hover:text-[#29688A] hover:bg-white hover:backdrop-blur-sm",
                          "focus:bg-white focus:text-[#29688A] focus:outline-none",
                          isPartnersOpen && "bg-white text-[#29688A]",
                        )}
                      >
                        Partners
                        <ChevronDown
                          className={cn(
                            "ml-1 h-3 w-3 transition-transform duration-200",
                            isPartnersOpen && "rotate-180",
                          )}
                        />
                      </button>

                      {isPartnersOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                          {partnersOptions.map((option) => (
                            <Link
                              key={option.name}
                              href={option.href}
                              onClick={() => setIsPartnersOpen(false)}
                              className="block px-4 py-2 text-sm text-[#29688A] hover:bg-[#29688A] hover:text-white transition-colors duration-200"
                            >
                              {option.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <div className="relative" ref={awardsRef}>
                      <button
                        onClick={() => setIsAwardsOpen(!isAwardsOpen)}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-full px-3 lg:px-6 py-2 text-xs lg:text-sm font-medium transition-all duration-200",
                          "text-white hover:text-[#29688A] hover:bg-white hover:backdrop-blur-sm",
                          "focus:bg-white focus:text-[#29688A] focus:outline-none",
                          isAwardsOpen && "bg-white text-[#29688A]",
                        )}
                      >
                        Awards
                        <ChevronDown
                          className={cn("ml-1 h-3 w-3 transition-transform duration-200", isAwardsOpen && "rotate-180")}
                        />
                      </button>

                      {isAwardsOpen && (
                        <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                          {awardsOptions.map((option) => (
                            <Link
                              key={option.name}
                              href={option.href}
                              onClick={() => setIsAwardsOpen(false)}
                              className="block px-4 py-2 text-sm text-[#29688A] hover:bg-[#29688A] hover:text-white transition-colors duration-200"
                            >
                              {option.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <div className="relative" ref={galleryRef}>
                      <button
                        onClick={() => setIsGalleryOpen(!isGalleryOpen)}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-full px-3 lg:px-6 py-2 text-xs lg:text-sm font-medium transition-all duration-200",
                          "text-white hover:text-[#29688A] hover:bg-white hover:backdrop-blur-sm",
                          "focus:bg-white focus:text-[#29688A] focus:outline-none",
                          isGalleryOpen && "bg-white text-[#29688A]",
                        )}
                      >
                        Gallery
                        <ChevronDown
                          className={cn(
                            "ml-1 h-3 w-3 transition-transform duration-200",
                            isGalleryOpen && "rotate-180",
                          )}
                        />
                      </button>

                      {isGalleryOpen && (
                        <div className="absolute top-full left-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                          {galleryOptions.map((option) => (
                            <Link
                              key={option.name}
                              href={option.href}
                              onClick={() => setIsGalleryOpen(false)}
                              className="block px-4 py-2 text-sm text-[#29688A] hover:bg-[#29688A] hover:text-white transition-colors duration-200"
                            >
                              {option.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </NavigationMenuItem>

                  {navItems.slice(5).map((item) => (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuLink
                        href={item.href}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-full px-3 lg:px-6 py-2 text-xs lg:text-sm font-medium transition-all duration-200",
                          "text-white hover:text-[#29688A] hover:bg-white hover:backdrop-blur-sm",
                          "focus:bg-white focus:text-[#29688A] focus:outline-none",
                          "data-[active]:bg-white data-[active]:text-[#29688A]",
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
            "md:hidden bg-[#29688A]/95 backdrop-blur-md border-t border-[#29688A] overflow-y-auto transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-white hover:bg-white hover:text-[#29688A] rounded-lg transition-all duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}

            <div>
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-white hover:text-[#29688A] rounded-lg transition-all duration-200 font-medium"
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
                      className="block px-4 py-2 text-sm text-white hover:bg-white hover:text-[#29688A] rounded-lg transition-all duration-200"
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setIsMobileEventsOpen(!isMobileEventsOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-white hover:text-[#29688A] rounded-lg transition-all duration-200 font-medium"
              >
                Events
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-200", isMobileEventsOpen && "rotate-180")}
                />
              </button>

              {isMobileEventsOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  {eventsOptions.map((option) => (
                    <Link
                      key={option.name}
                      href={option.href}
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsMobileEventsOpen(false)
                      }}
                      className="block px-4 py-2 text-sm text-white hover:bg-white hover:text-[#29688A] rounded-lg transition-all duration-200"
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setIsMobileWebinarOpen(!isMobileWebinarOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-white hover:text-[#29688A] rounded-lg transition-all duration-200 font-medium"
              >
                Webinar
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-200", isMobileWebinarOpen && "rotate-180")}
                />
              </button>

              {isMobileWebinarOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  {webinarOptions.map((option) => (
                    <Link
                      key={option.name}
                      href={option.href}
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsMobileWebinarOpen(false)
                      }}
                      className="block px-4 py-2 text-sm text-white hover:bg-white hover:text-[#29688A] rounded-lg transition-all duration-200"
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setIsMobileInitiativesOpen(!isMobileInitiativesOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-white hover:text-[#29688A] rounded-lg transition-all duration-200 font-medium"
              >
                Initiatives
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-200", isMobileInitiativesOpen && "rotate-180")}
                />
              </button>

              {isMobileInitiativesOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  {initiativesOptions.map((option) => (
                    <Link
                      key={option.name}
                      href={option.href}
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsMobileInitiativesOpen(false)
                      }}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-white hover:text-[#29688A] rounded-lg transition-all duration-200"
                    >
                      <Image
                        src={option.image || "/placeholder.svg"}
                        alt={option.name}
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain flex-shrink-0"
                      />
                      <span className="flex-1">{option.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setIsMobilePartnersOpen(!isMobilePartnersOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-white hover:text-[#29688A] rounded-lg transition-all duration-200 font-medium"
              >
                Partners
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-200", isMobilePartnersOpen && "rotate-180")}
                />
              </button>

              {isMobilePartnersOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  {partnersOptions.map((option) => (
                    <Link
                      key={option.name}
                      href={option.href}
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsMobilePartnersOpen(false)
                      }}
                      className="block px-4 py-2 text-sm text-white hover:bg-white hover:text-[#29688A] rounded-lg transition-all duration-200"
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setIsMobileAwardsOpen(!isMobileAwardsOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-white hover:text-[#29688A] rounded-lg transition-all duration-200 font-medium"
              >
                Awards
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-200", isMobileAwardsOpen && "rotate-180")}
                />
              </button>

              {isMobileAwardsOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  {awardsOptions.map((option) => (
                    <Link
                      key={option.name}
                      href={option.href}
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsMobileAwardsOpen(false)
                      }}
                      className="block px-4 py-2 text-sm text-white hover:bg-white hover:text-[#29688A] rounded-lg transition-all duration-200"
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setIsMobileGalleryOpen(!isMobileGalleryOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-white hover:bg-white hover:text-[#29688A] rounded-lg transition-all duration-200 font-medium"
              >
                Gallery
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-200", isMobileGalleryOpen && "rotate-180")}
                />
              </button>

              {isMobileGalleryOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  {galleryOptions.map((option) => (
                    <Link
                      key={option.name}
                      href={option.href}
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsMobileGalleryOpen(false)
                      }}
                      className="block px-4 py-2 text-sm text-white hover:bg-white hover:text-[#29688A] rounded-lg transition-all duration-200"
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.slice(5).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-white hover:bg-white hover:text-[#29688A] rounded-lg transition-all duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}

            <div className="flex justify-center gap-4 pt-4 border-t border-white/20 mt-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <Link
                    key={index}
                    href={social.href}
                    className={cn(
                      "p-2 rounded-full bg-white border border-white/20 transition-all duration-200 hover:scale-110 text-[#29688A] ",
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