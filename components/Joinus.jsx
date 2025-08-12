"use client"

import { useState } from "react"
import { Users, Settings, FileText, Cog, Search, Database, Award } from "lucide-react"

const services = [
  {
    icon: Users,
    title: "Membership",
    description: "Join our community",
  },
  {
    icon: Settings,
    title: "Strategic Partnership",
    description: "Collaborate with us",
  },
  {
    icon: FileText,
    title: "Events Alert",
    description: "Stay updated",
  },
  {
    icon: Cog,
    title: "SME Consultants",
    description: "Expert guidance",
  },
  {
    icon: Search,
    title: "Enquiry",
    description: "Get information",
  },
  {
    icon: Database,
    title: "SME Directory",
    description: "Business listings",
  },
  {
    icon: Award,
    title: "Excellence Awards",
    description: "Recognition program",
  },
]

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section
      className="py-20 px-4 relative max-w-7xl mx-auto rounded-4xl"
      
    >
      <div className="absolute inset-0 bg-white backdrop-blur-sm"></div>

      <div className=" relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
                   <h2 className="relative z-10 max-w-7xl text-4xl font-medium lg:text-5xl text-center text-neutral-950">Join Us</h2>

          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 lg:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="group flex flex-col items-center text-center"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Icon Container */}
                <div className="relative mb-4">
                  <div
                    className={`
                      w-20 h-20 rounded-full bg-white/70 backdrop-blur-md border border-white/30
                      flex items-center justify-center shadow-lg
                      transform transition-all duration-500 ease-out
                      group-hover:scale-110 group-hover:shadow-2xl
                      animate-fade-in-up
                      ${hoveredIndex === index ? "rotate-12 bg-gray-900" : ""}
                    `}
                  >
                    <Icon
                      className={`
                        w-8 h-8 text-gray-700 transition-all duration-300
                        ${hoveredIndex === index ? "scale-110 text-gray-900" : ""}
                      `}
                    />
                  </div>

                  <div
                    className={`
                      absolute inset-0 rounded-full border-2 border-gray-400/60
                      transition-all duration-500 ease-out
                      ${hoveredIndex === index ? "scale-125 opacity-100" : "scale-100 opacity-0"}
                    `}
                  ></div>
                </div>

                {/* Text Content */}
                <div className="space-y-1">
                  <h3
                    className={`
                      font-semibold text-gray-800 transition-all duration-300
                      text-sm lg:text-base
                      ${hoveredIndex === index ? "transform -translate-y-1 text-gray-900 font-bold" : ""}
                    `}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`
                      text-xs text-gray-600 transition-all duration-300
                      ${hoveredIndex === index ? "text-gray-800 opacity-100 font-medium" : "opacity-70"}
                    `}
                  >
                    {service.description}
                  </p>
                </div>

                <div
                  className={`
                    mt-3 h-0.5 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full
                    transition-all duration-500 ease-out
                    ${hoveredIndex === index ? "w-12 opacity-100" : "w-0 opacity-0"}
                  `}
                ></div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
