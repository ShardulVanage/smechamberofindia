'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Youtube, Twitter, Facebook, Instagram, Mail, Phone, ArrowLeft, ArrowRight, Menu, X } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navigationLinks = [
    { href: "#", label: "Home" },
    { href: "#", label: "About Us" },
    { href: "#", label: "Services" },
    { href: "#", label: "Membership" },
    { href: "#", label: "Events" },
    { href: "#", label: "Webinar" },
    { href: "#", label: "Initiatives" },
    { href: "#", label: "Partners" },
    { href: "#", label: "Awards" },
    { href: "#", label: "Gallery" },
    { href: "#", label: "News" },
    { href: "#", label: "Join Us" },
  ]

  return (
    <div className="bg-white">
      {/* Top bar with social links and contact */}
      <div className="bg-gray-50/10 py-2 max-w-screen-2xl mx-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/sme-logo.svg"
              alt="SME Chamber of India"
              width={320}
              height={80}
              className="h-20 md:h-24 lg:h-32 w-auto"
            />
          </div>
          
          {/* Social links and contact - hidden on mobile */}
          <div className="hidden md:flex flex-col items-end space-x-6">
            <div className="text-sm text-gray-600 mb-2">Join Us</div>
            <div className="flex space-x-2 mb-2">
              <Link href="#" className="text-red-600 hover:text-red-700 transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-800 hover:text-gray-900 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-pink-600 hover:text-pink-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="text-sm text-gray-600 mb-2">Contact Us</div>
            <div className="flex space-x-2">
              <Mail className="w-6 h-5 text-blue-600" />
              <Phone className="w-6 h-5 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-[#00006E] shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
          <div className="flex justify-between items-center py-4">
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8 text-sm">
              {navigationLinks.map((link) => (
                <Link 
                  key={link.label}
                  href={link.href} 
                  className="text-gray-50 hover:text-blue-300 font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile/Tablet Menu Button */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-blue-800 transition-all duration-200"
                  >
                    <Menu className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-white">
                  <SheetHeader>
                    <SheetTitle className="text-[#00006E] text-left">Menu</SheetTitle>
                  </SheetHeader>
                  
                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-gray-800 hover:text-[#00006E] font-medium py-2 px-4 rounded-lg hover:bg-gray-100 transition-all duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Social Links */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-3">Follow Us</div>
                    <div className="flex space-x-4 mb-6">
                      <Link href="#" className="text-red-600 hover:text-red-700 transition-colors">
                        <Youtube className="w-6 h-6" />
                      </Link>
                      <Link href="#" className="text-gray-800 hover:text-gray-900 transition-colors">
                        <Twitter className="w-6 h-6" />
                      </Link>
                      <Link href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
                        <Facebook className="w-6 h-6" />
                      </Link>
                      <Link href="#" className="text-pink-600 hover:text-pink-700 transition-colors">
                        <Instagram className="w-6 h-6" />
                      </Link>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-3">Contact</div>
                    <div className="flex space-x-4">
                      <Mail className="w-6 h-6 text-blue-600" />
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>

                  {/* Mobile Auth Buttons */}
                  <div className="mt-8 space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full border-[#00006E] text-[#00006E] hover:bg-[#00006E] hover:text-white transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                    <Button 
                      className="w-full bg-[#B4E6FF] text-[#00006E] hover:bg-[#B4E6FF]/90 transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Register
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex space-x-4">
              <Button 
                variant="outline" 
                className="bg-transparent text-gray-50 border-gray-50 hover:bg-white hover:text-[#00006E] transition-all duration-200 hover:scale-105"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button 
                className="bg-[#B4E6FF] text-[#00006E] hover:bg-[#B4E6FF]/90 transition-all duration-200 hover:scale-105"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Register
              </Button>
            </div>

            {/* Mobile Auth Buttons (visible on small screens) */}
            <div className="flex lg:hidden space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-transparent text-gray-50 border-gray-50 hover:bg-white hover:text-[#00006E] transition-all duration-200"
              >
                Login
              </Button>
              <Button 
                size="sm"
                className="bg-[#B4E6FF] text-[#00006E] hover:bg-[#B4E6FF]/90 transition-all duration-200"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
