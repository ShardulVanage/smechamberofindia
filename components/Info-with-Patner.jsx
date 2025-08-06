
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
 const upgradeCards = [
    {
      icon: "/assets/icons/icon1.png",
      title: "Upgrade Your League",
      description: "Listed Company Attract top Talent, Customers, Suppliers & Partners"
    },
    {
      icon: "/assets/icons/icon2.png",
      title: "Upgrade Your League", 
      description: "Listed Company Attract top Talent, Customers, Suppliers & Partners"
    },
    {
      icon: "/assets/icons/icon3.png",
      title: "Upgrade Your League",
      description: "Listed Company Attract top Talent, Customers, Suppliers & Partners"
    },
    {
      icon: "/assets/icons/icon1.png",
      title: "Upgrade Your League",
      description: "Listed Company Attract top Talent, Customers, Suppliers & Partners"
    },
    {
      icon: "/assets/icons/icon2.png",
      title: "Upgrade Your League",
      description: "Listed Company Attract top Talent, Customers, Suppliers & Partners"
    },
    {
      icon: "/assets/icons/icon3.png",
      title: "Upgrade Your League",
      description: "Listed Company Attract top Talent, Customers, Suppliers & Partners"
    }
  ]

  const partnercompany = [
    { src: "/assets/company-patner/c1.jpg", alt: "Comano" },
    { src: "/assets/company-patner/c1.jpg", alt: "Comano" },
    { src: "/assets/company-patner/c2.jpg", alt: "Partner Logo" },
    { src: "/assets/company-patner/c1.jpg", alt: "Comano" },
    { src: "/assets/company-patner/c1.jpg", alt: "Comano" }
  ]
export default function InfowithPatner() {

return (
    <div className="bg-white h-full">
      <div className="relative isolate px-6 pt-12 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-60"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#34BBED80] to-[#34BBED80] opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
         <div className="relative min-h-screen overflow-hidden">
      {/* Background blur spots */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-white/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl"></div>
      
      {/* Dotted vertical line */}
      
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Unlock 20x Value of Your Business<br />
            Plan for Your Business with SME!
          </h1>
          <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            MSMEx is a Leading Enabling Partner to Fuel Your Goal of Becoming Listed! Our SME IPO cohort 
            prepares you to launch your successful IPO in quickest time. We have a history of enabling 
            multiple blockbuster IPOs!
          </p>
        </div>

        {/* Upgrade Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-24">
          {upgradeCards.map((card, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 relative">
                      <Image
                        src={card.icon || "/placeholder.svg"}
                        alt="Service Icon"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 48px, (max-width: 1024px) 64px, 80px"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                      {card.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Strategic Partners Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 md:mb-12">
            Our Strategic Partners
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto mb-12 md:mb-16 leading-relaxed">
            MSMEx is a Leading Enabling Partner to Fuel Your Goal of Becoming Listed! Our SME IPO cohort 
            prepares you to launch your successful IPO in quickest time. We have a history of enabling 
            multiple blockbuster IPOs!
          </p>

          {/* Partner company-patner */}
          <div className="grid md:grid-cols-3 xl:grid-cols-5 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {partnercompany.map((logo, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm border-1 shadow-xl hover:shadow-lg transition-all duration-300 hover:scale-110 ">
                <CardContent className="p-4 md:p-6">
                  <div className="w-24 h-12 md:w-32 md:h-16 lg:w-40 lg:h-20 xl:w-52 xl:h-24 flex items-center justify-center relative">
                    <Image
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 208px"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>



        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#34BBED80] to-[#34BBED80] opacity-50 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  )
}
