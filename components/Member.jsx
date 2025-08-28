"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

export default function Members() {
  // Premium member images
  const premiumImages = [
    "/assets/member/premium/mah_international.jpg",
    "/assets/member/premium/MET_bhujbal.jpg",
    "/assets/member/premium/neha.jpg",
  ]

  // Annual member images
  const annualImages = [
    "/assets/member/annual/18North.jpg",
    "/assets/member/annual/absorbent.jpg",
    "/assets/member/annual/sparsha.jpg",
  ]

  const [premiumImageIndex, setPremiumImageIndex] = useState(0)
  const [annualImageIndex, setAnnualImageIndex] = useState(0)

  // Auto-rotate premium images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPremiumImageIndex((prevIndex) => (prevIndex + 1) % premiumImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [premiumImages.length])

  // Auto-rotate annual images every 3 seconds (offset by 1.5s)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setAnnualImageIndex((prevIndex) => (prevIndex + 1) % annualImages.length)
      }, 3000)

      return () => clearInterval(interval)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [annualImages.length])

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl space-y-12 px-6">
        <div className="text-center space-y-4">
       
           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight text-center">
           Choose Your
            <span className="block text-[#29688A]">  Membership   Level</span>

        
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join our community and unlock exclusive benefits tailored to your professional growth
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Premium Member Section */}
          <div className="group">
            <div className="relative mb-6">
              <div className="bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/20 dark:to-amber-800/10 aspect-[4/1]  relative rounded-2xl p-1 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-white dark:bg-gray-900">
                  <Image
                    src={premiumImages[premiumImageIndex] || "/placeholder.svg"}
                    className="object-contain transition-opacity duration-500 p-4"
                    alt="Premium member benefits"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Image indicator dots */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {premiumImages.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === premiumImageIndex ? "bg-amber-600 scale-110" : "bg-gray-400 hover:bg-gray-500"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <h3 className="text-2xl font-bold text-foreground">Premium Member</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Unlock exclusive access to premium events, networking opportunities, and VIP experiences designed for
                  our most valued members.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Premium Benefits:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                    <span>Exclusive VIP event access</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                    <span>Priority booking for all events</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                    <span>Complimentary guest passes</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                    <span>Premium networking lounge access</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Annual Member Section */}
          <div className="group">
            <div className="relative mb-6">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 aspect-[4/1] relative rounded-2xl p-1 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-white dark:bg-gray-900">
                  <Image
                    src={annualImages[annualImageIndex] || "/placeholder.svg"}
                    className="object-contain transition-opacity duration-500 p-4"
                    alt="Annual member benefits"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Image indicator dots */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {annualImages.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === annualImageIndex ? "bg-blue-600 scale-110" : "bg-gray-400 hover:bg-gray-500"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h3 className="text-2xl font-bold text-foreground">Annual Member</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Join our community with year-round access to conferences, workshops, events, and resources that help
                  you grow professionally.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Annual Benefits:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>Full conference access</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>Monthly workshop sessions</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>Digital resource library</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>Community networking events</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
