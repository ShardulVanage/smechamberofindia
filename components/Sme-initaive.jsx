import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function SMEInitiativesSection() {
  const initiativeLogos = [
    {
      src: "/assets/sme-initiative/export.png",
      alt: "SME Coach",
      width: 200,
      height: 80
    },
    {
      src: "/assets/sme-initiative/smecoach.png",
      alt: "SME Talks", 
      width: 200,
      height: 80
    },
    {
      src: "/assets/sme-initiative/smetalk.jpg",
      alt: "SME Export Promotion Council",
      width: 200,
      height: 80
    },
    {
      src: "/assets/sme-initiative/export.png",
      alt: "SME Coach",
      width: 200,
      height: 80
    },
    {
      src: "/assets/sme-initiative/smecoach.png",
      alt: "SME Talks",
      width: 200,
      height: 80
    },
    {
      src: "/assets/sme-initiative/smetalk.jpg",
      alt: "SME Export Promotion Council",
      width: 200,
      height: 80
    }
  ]

  const sponsorLogos = [
    {
      src: "/assets/company-patner/c1.jpg",
      alt: "Comano",
      width: 120,
      height: 80
    },
    {
      src: "/assets/company-patner/c2.jpg",
      alt: "Comano",
      width: 120,
      height: 80
    },
    {
      src: "/assets/company-patner/c1.jpg",
      alt: "MK Partner",
      width: 120,
      height: 80
    },
    {
      src: "/assets/company-patner/c2.jpg",
      alt: "Comano",
      width: 120,
      height: 80
    },
    {
      src: "/assets/company-patner/c1.jpg",
      alt: "Comano",
      width: 120,
      height: 80
    }
  ]

  return (
    <div className="w-full">
      {/* SME Initiatives Section */}
      <div className="relative bg-[#00006E] overflow-hidden">
        {/* Dot Background Pattern */}
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#404080_1px,transparent_1px)]"
          )}
        />
        
        {/* Radial gradient overlay for faded effect */}
        <div className="pointer-events-none absolute inset-0 bg-[#00006E] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              SME Initiatives
            </h2>
            <p className="text-base md:text-lg text-gray-200 max-w-4xl leading-relaxed">
              MSMEx is a Leading Enabling Partner to Fuel Your Goal of Becoming Listed! Our SME IPO 
              cohort prepares you to launch your successful IPO in quickest time. We have a history of 
              enabling multiple blockbuster IPOs!
            </p>
          </div>

          {/* Initiative Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {initiativeLogos.map((logo, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 md:p-8 flex items-center justify-center min-h-[120px]">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="max-w-full h-auto object-contain"
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Learn More Button */}
          <div className="flex justify-start">
            <Button className="bg-sky-400 hover:bg-sky-500 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-200">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Event Sponsors Section */}
      <div className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Event Sponsors
            </h2>
            <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              MSMEx is a Leading Enabling Partner to Fuel Your Goal of Becoming Listed! Our SME IPO cohort 
              prepares you to launch your successful IPO in quickest time. We have a history of enabling 
              multiple blockbuster IPOs!
            </p>
          </div>

          {/* Sponsor Logos */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12">
            {sponsorLogos.map((logo, index) => (
              <Card key={index} className="bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110">
                <CardContent className="p-4 md:p-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-12 flex items-center justify-center">
                    <Image
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
