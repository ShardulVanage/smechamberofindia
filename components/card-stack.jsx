"use client"

import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
  image,
  specs = [],
  href,
}) {
  const cardContent = (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-white/90 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-[#29688A]/30 hover:bg-white [&>*]:flex [&>*]:items-center [&>*]:gap-2 cursor-pointer",
        className,
      )}
      style={{
        backgroundImage: image
          ? `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${image})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>
        <span className="relative inline-block rounded-full p-1" style={{ backgroundColor: "#29688A" }}>
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)} style={{ color: "#29688A" }}>
          {title}
        </p>
      </div>
      <p className="whitespace-nowrap text-sm text-gray-700">{description}</p>
      {specs.length > 0 && (
        <div className="text-xs text-gray-600">
          {specs.slice(0, 2).map((spec, idx) => (
            <span key={idx}>
              {spec.label}: {spec.value} {idx < 1 && "•"}{" "}
            </span>
          ))}
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {cardContent}
      </a>
    )
  }

  return cardContent
}

export default function DisplayCards({ cards }) {
  const defaultCards = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ]

  const displayCards = cards || defaultCards

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  )
}
