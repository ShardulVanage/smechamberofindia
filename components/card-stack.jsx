"use client"

/**
 * @author: @dorian_baffier
 * @description: Card Stack - Always Expanded
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { motion } from "motion/react"
import { cn } from "@/lib/utils"

const products = [
  {
    id: "business-registration",
    title: "Business Registration",
    subtitle: "Company Setup",
    image:
      "https://plus.unsplash.com/premium_photo-1661497281000-b5ecb39a2114?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specs: [
      { label: "Process", value: "Simplified" },
      { label: "Time", value: "7-15 days" },
      { label: "Support", value: "Expert" },
      { label: "Cost", value: "Affordable" },
    ],
  },
  {
    id: "export-assistance",
    title: "Export Assistance",
    subtitle: "Global Markets",
    image:
      "https://images.unsplash.com/photo-1449586919022-f3dfddc48a71?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specs: [
      { label: "Markets", value: "180+" },
      { label: "Guidance", value: "Complete" },
      { label: "Documentation", value: "Full" },
      { label: "Success", value: "Proven" },
    ],
  },
  {
    id: "networking",
    title: "Networking",
    subtitle: "Business Connections",
    image:
      "https://plus.unsplash.com/premium_photo-1665203422028-68d636f2c944?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specs: [
      { label: "Members", value: "50,000+" },
      { label: "Events", value: "Monthly" },
      { label: "Sectors", value: "All" },
      { label: "Growth", value: "Assured" },
    ],
  },
  {
    id: "training",
    title: "Training & Development",
    subtitle: "Skill Enhancement",
    image:
      "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    specs: [
      { label: "Programs", value: "100+" },
      { label: "Experts", value: "Industry" },
      { label: "Format", value: "Online/Offline" },
      { label: "Certification", value: "Recognized" },
    ],
  },
]

const Card = ({ product, index, totalCards }) => {
  // Calculate the total width of expanded cards and center offset
  const cardWidth = 540 // Width of each card
  const cardOverlap = 240 // Amount of overlap between cards
  const totalExpandedWidth = cardWidth + (totalCards - 1) * (cardWidth - cardOverlap) // Total width including overlap
  const expandedCenterOffset = totalExpandedWidth / 2

  // Always use expanded position - centered spread with overlap
  const spreadX = index * (cardWidth - cardOverlap) - expandedCenterOffset + cardWidth / 2
  const spreadY = 0
  const spreadRotate = index * 5 - (totalCards - 1) * 2.5 // Rotation for visual effect
  const spreadScale = 1

  return (
    <motion.div
      initial={{
        x: spreadX,
        y: spreadY,
        rotate: spreadRotate,
        scale: spreadScale,
      }}
      animate={{
        x: spreadX,
        y: spreadY,
        rotate: spreadRotate,
        scale: spreadScale,
        zIndex: totalCards - index,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 30,
        mass: 0.8,
        restDelta: 0.001,
        restSpeed: 0.001,
      }}
      className={cn(
        "absolute inset-0 rounded-2xl p-6 w-full",
        "bg-gradient-to-br from-white/40 via-neutral-50/30 to-neutral-100/20",
        "dark:from-neutral-800/40 dark:via-neutral-900/30 dark:to-black/20",
        "border border-white/20 dark:border-neutral-800/20",
        "before:absolute before:inset-0 before:rounded-2xl",
        "before:bg-gradient-to-b before:from-white/20 before:via-neutral-100/10 before:to-transparent",
        "dark:before:from-white/5 dark:before:via-neutral-500/5 dark:before:to-transparent",
        "before:opacity-100 before:transition-opacity before:duration-500",
        "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-br",
        "after:from-white/80 after:to-neutral-100/70 dark:after:from-neutral-900/80 dark:after:to-black/70",
        "after:z-[-1] after:blur-xl",
        "backdrop-blur-xl backdrop-saturate-150",
        "shadow-[0_8px_20px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_20px_rgb(0,0,0,0.3)]",
        "hover:border-white/30 dark:hover:border-neutral-700/30",
        "hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_12px_40px_rgb(0,0,0,0.4)]",
        "hover:backdrop-blur-2xl",
        "hover:bg-gradient-to-br hover:from-white/50 hover:via-neutral-50/40 hover:to-neutral-100/30",
        "dark:hover:from-neutral-800/50 dark:hover:via-neutral-900/40 dark:hover:to-black/30",
        "transition-all duration-500 ease-out",
        "transform-gpu overflow-hidden",
      )}
      style={{
        maxWidth: "320px",
        transformStyle: "preserve-3d",
        perspective: "2000px",
        left: "50%",
        marginLeft: "-160px",
        zIndex: products.length - index,
      }}
    >
      {/* Inner Card */}
      <div className="absolute inset-1 rounded-xl bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50" />

      <div className="relative z-10">
        {/* Specs Grid */}
        <dl className="mb-4 grid grid-cols-4 gap-2 justify-center">
          {product.specs.map((spec) => (
            <div key={spec.label} className="text-[10px] backdrop-blur-sm flex flex-col items-start text-left">
              <dd className="font-medium text-gray-500 dark:text-gray-400 w-full text-left">{spec.value}</dd>
              <dt className="text-gray-900 dark:text-gray-100 mb-0.5 w-full text-left">{spec.label}</dt>
            </div>
          ))}
        </dl>

        <div
          className={cn(
            "aspect-[16/11] w-full overflow-hidden rounded-lg",
            "bg-neutral-100 dark:bg-neutral-900",
            "transition-transform duration-300 ease-out",
            "group-hover:scale-[1.02]",
            "border border-neutral-200/50 dark:border-neutral-700/50",
            "shadow-inner",
          )}
        >
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>

        <div className="mt-4">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white text-left">
              {product.title}
            </h2>
            <span className="block text-2xl font-semibold tracking-tight bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 dark:from-gray-200 dark:via-white dark:to-gray-300 bg-clip-text text-transparent text-left">
              {product.subtitle}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function CardStack({ className }) {
  return (
    <div
      className={cn(
        "relative mx-auto",
        "min-h-[440px] w-full max-w-[90vw]",
        "md:max-w-[1200px]",
        "flex items-center justify-center mb-8",
        className,
      )}
    >
      {products.map((product, index) => (
        <Card key={product.id} product={product} index={index} totalCards={products.length} />
      ))}
    </div>
  )
}

export default CardStack
