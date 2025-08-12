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
    }, 1500) // Start 1.5 seconds after premium images

    return () => clearTimeout(timeout)
  }, [annualImages.length])

  return (
    <section className="py-16 md:py-8">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <h2 className="relative z-10 max-w-7xl text-4xl font-medium lg:text-5xl text-center">Choose Your Membership Level</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
          {/* Premium Member Section */}
          <div className="relative mb-6 sm:mb-0">
            <div className="bg-gradient-to-b aspect-[7/3] relative  rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
              <div className="flex w-auto h-full rounded-[15px]   overflow-hidden">
                <Image
                  src={premiumImages[premiumImageIndex] || "/placeholder.svg"}
                  className="rounded-[15px]  transition-opacity duration-500 object-center"
                  alt="Premium member benefits"
                  width={500}
                    height={500}
                />
                {/* Image indicator dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {premiumImages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        index === premiumImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="relative space-y-4 mt-6">
              <h3 className="text-2xl font-semibold text-foreground">Premium Member</h3>
              <p className="text-muted-foreground">
                Unlock exclusive access to premium events, networking opportunities, and VIP experiences designed for
                our most valued members.
              </p>

              <div className="pt-6">
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Exclusive VIP event access
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Priority booking for all events
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Complimentary guest passes
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Premium networking lounge access
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Annual Member Section */}
          <div className="relative mb-6 sm:mb-0">
            <div className="bg-gradient-to-b aspect-[7/3] relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
              <div className="relative w-full h-full rounded-[15px] overflow-hidden">
                <Image
                  src={annualImages[annualImageIndex] || "/placeholder.svg"}
                  className="rounded-[15px] object-cover transition-opacity duration-500"
                  alt="Annual member benefits"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Image indicator dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {annualImages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        index === annualImageIndex ? "bg-white" : "bg-gray-100/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="relative space-y-4 mt-6">
              <h3 className="text-2xl font-semibold text-foreground">Annual Member</h3>
              <p className="text-muted-foreground">
                Join our community with year-round access to conferences, workshops, Event, and resources that help you grow
                professionally.
              </p>

              <div className="pt-6">
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Full conference access
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Monthly workshop sessions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Digital resource library
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    Community networking events
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
