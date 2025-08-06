import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "People", href: "/people" },
    { name: "Membership", href: "/membership" },
    { name: "Initiatives", href: "/initiatives" },
    { name: "Awards", href: "/awards" },
    { name: "Gallery", href: "/gallery" },
    { name: "News", href: "/news" },
    { name: "Vacancies", href: "/vacancies" },
    { name: "Contact Us", href: "/contact" }
  ]

  const chamberLinks = [
    { name: "Introduction", href: "/introduction" },
    { name: "Objective", href: "/objective" },
    { name: "Activities", href: "/activities" },
    { name: "Action Plan", href: "/action-plan" },
    { name: "About SMEs in India", href: "/about-smes" },
    { name: "Challenges to SME Sector", href: "/challenges" }
  ]

  const serviceLinks = [
    { name: "Indian SMEs", href: "/indian-smes" },
    { name: "Overseas SMEs", href: "/overseas-smes" }
  ]

  const partnerLinks = [
    { name: "Strategic Partners", href: "/strategic-partners" },
    { name: "Global Partners", href: "/global-partners" },
    { name: "SME Consultant", href: "/sme-consultant" }
  ]

  const eventLinks = [
    { name: "Forthcoming", href: "/forthcoming" },
    { name: "Past", href: "/past" }
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ]

  return (
    <footer className="bg-white border-t">
      <div className=" mx-auto px-4 ">
        <div className=" max-w-screen-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-12 lg:py-16 mx-auto">
          {/* Logo and Description */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <Image
                src="/sme-logo.svg"
                alt="SME Chamber of India"
                width={200}
                height={80}
                className="h-30 w-auto"
              />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              SME CHAMBER OF INDIA has been putting efforts for the growth of SMEs from the manufacturing, service sectors and allied industrial & business sectors
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-[#00006E] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#00006E] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chamber */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-[#00006E] mb-4">Chamber</h3>
            <ul className="space-y-2">
              {chamberLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#00006E] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Partners */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-[#00006E] mb-4">Services</h3>
              <ul className="space-y-2">
                {serviceLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-[#00006E] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-[#00006E] mb-4">Partners</h3>
              <ul className="space-y-2">
                {partnerLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-[#00006E] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#00006E] mb-4">Events</h3>
              <ul className="space-y-2">
                {eventLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-[#00006E] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info and Map */}
          <div className="lg:col-span-3">
            <Card className="border-gray-200">
              <CardContent className="p-4">
                {/* Map */}
                <div className="mb-4 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.1234567890123!2d-2.1234567890123456!3d52.58765432109876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDM1JzE1LjYiTiAywrAwNyc0OC40Ilc!5e0!3m2!1sen!2suk!4v1234567890123"
                    width="100%"
                    height="120"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-md"
                  />
                </div>

                {/* Contact Details */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-[#00006E] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Wulfrana Street</p>
                      <p className="text-sm text-gray-600">Wolverhampton WV1 1LY</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-[#00006E] flex-shrink-0" />
                    <Link 
                      href="tel:+911190232100"
                      className="text-sm text-gray-600 hover:text-[#00006E] transition-colors duration-200"
                    >
                      +91 11902 321000
                    </Link>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-[#00006E] flex-shrink-0" />
                    <Link 
                      href="mailto:info@sme.com"
                      className="text-sm text-gray-600 hover:text-[#00006E] transition-colors duration-200"
                    >
                      info@sme.com
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8" />

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((social) => {
            const IconComponent = social.icon
            return (
              <Link
                key={social.label}
                href={social.href}
                className="text-gray-600 hover:text-[#00006E] transition-colors duration-200"
                aria-label={social.label}
              >
                <IconComponent className="w-6 h-6" />
              </Link>
            )
          })}
        </div>

        {/* Disclaimer */}
        <div className="bg-[#2E3192] text-white p-6 py-12 rounded-t-lg ">
          <h4 className="text-lg font-semibold mb-3 text-center">Disclaimer</h4>
          <p className="text-sm leading-relaxed text-center max-w-screen-2xl mx-auto">
            Small and Medium Business Development Chamber of India has made every attempt to ensure the accuracy and reliability of the information provided in this document. 
            However, the information is provided "as is" without warranty of any kind. SME Chamber of India does not accept any responsibility or liability for the accuracy, content, 
            completeness, legality, or reliability of the information contained on this website. No warranties, promises and/or representations of any kind, expressed or implied, are given 
            as to the nature, standard, accuracy or otherwise of the information provided in this document nor to the suitability or otherwise of the information to your particular 
            circumstances. We shall not be liable for any loss or damage of whatever nature (direct, indirect, consequential, or other) whether arising in contract, tort or otherwise, which 
            may arise as a result of your use of (or inability to use) this content, or from your use of (or failure to use) the information in this content.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center py-6 bg-[#34BBED]">
          <p className="text-sm text-[[#2E3192]]">
            Copyright © Small and Medium Business Development Chamber of India. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
