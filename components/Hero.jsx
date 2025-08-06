'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Image from 'next/image'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
  { name: 'Log in', href: '#' },
]

const heroSections = [
  {
    id: 1,
    eyebrow: "Transform Your Business Today",
    title: "Data to enrich your online business",
    description: "Harness the power of advanced analytics and insights to drive your business forward. Our comprehensive platform provides everything you need to succeed in the digital landscape.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    primaryAction: "Get Started",
    secondaryAction: "Learn More"
  },
  {
    id: 2,
    eyebrow: "Innovation at Your Fingertips",
    title: "Revolutionary solutions  teams",
    description: "Empower your team with cutting-edge tools and technologies. Streamline workflows, boost productivity, and achieve unprecedented results with our innovative platform.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    primaryAction: "Start Free Trial",
    secondaryAction: "View Demo"
  },
  {
    id: 3,
    eyebrow: "Scale Without Limits",
    title: "Enterprise-grade platform for growth",
    description: "Built for scale, designed for performance. Our robust infrastructure supports businesses of all sizes, from startups to Fortune 500 companies, ensuring seamless growth.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    primaryAction: "Contact Sales",
    secondaryAction: "Explore Features"
  },
   {
    id: 4,
    eyebrow: "Without Scale  Limits",
    title: "Enterprise-grade platform for growth",
    description: "Built for scale, designed for performance. Our robust infrastructure supports businesses of all sizes, from startups to Fortune 500 companies, ensuring seamless growth.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    primaryAction: "Contact Sales",
    secondaryAction: "Explore Features"
  }
]

export default function Component() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Progress animation
  useEffect(() => {
    if (isPaused) return

    const startTime = Date.now()
    const duration = 3000 // 3 seconds

    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      
      setProgress(newProgress)
      
      if (newProgress < 100) {
        requestAnimationFrame(updateProgress)
      } else {
        // Auto advance to next section
        handleNext()
      }
    }

    const animationFrame = requestAnimationFrame(updateProgress)
    
    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [currentSection, isPaused])

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setProgress(0)
    setCurrentSection((prev) => (prev + 1) % heroSections.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setProgress(0)
    setCurrentSection((prev) => (prev - 1 + heroSections.length) % heroSections.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handleDotClick = (index) => {
    if (isAnimating || index === currentSection) return
    setIsAnimating(true)
    setProgress(0)
    setCurrentSection(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const currentHero = heroSections[currentSection]

  return (
    <div className="bg-[#2E3192] text-white relative">
     
      {/* Hero Section */}
      <div className="relative h-full  justify-between ">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-3xl">
            {/* Decorative SVG - hidden on mobile and tablet */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-y-0 right-12 hidden xl:block h-full w-80 translate-x-1/3 transform fill-background"
            >
              <polygon fill="#2E3192" points="0,0 90,0 50,100 0,100" />
            </svg>
            
            <div className="relative px-6 py-32 sm:py-40 lg:px-1 lg:py-32 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                {/* Content with smooth transitions */}
                <div className={`transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                  {/* Eyebrow */}
                  <div className="hidden sm:mb-10 sm:flex">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-border hover:ring-ring transition-colors">
                      {currentHero.eyebrow}
                      <a href="#" className="ml-2 whitespace-nowrap font-semibold text-white">
                        <span aria-hidden="true" className="absolute inset-0" />
                        Read more <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                    {currentHero.title}
                  </h1>
                  
                  {/* Description */}
                  <p className="mt-6 text-lg leading-8 text-white   ">
                    {currentHero.description}
                  </p>
                  
                  {/* Action buttons */}
                  <div className="mt-10 flex items-center gap-x-6">
                    <Button size="lg" className={'bg-[#00006E]'}>
                      {currentHero.primaryAction}
                    </Button>
                    <Button variant="ghost" size="lg">
                      {currentHero.secondaryAction} <span aria-hidden="true">→</span>
                    </Button>
                  </div>
                </div>

                {/* Navigation Controls with Progress Bar */}
                <div 
                  className="mt-16 flex items-center justify-start gap-4"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePrev}
                    disabled={isAnimating}
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4 text-black" />
                  </Button>
                  
                  {/* Progress Bar Container */}
               {/* Dot Indicators */}
                <div className=" flex items-center justify-start gap-3">
                  {heroSections.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`h-2 rounded-full transition-all duration-300 hover:bg-primary/70 ${
                        index === currentSection
                          ? 'w-8 bg-white'
                          : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                      aria-label={`Go to section ${index + 1}`}
                    />
                  ))}
                </div>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNext}
                    disabled={isAnimating}
                    className="rounded-full"
                  >
                    <ChevronRight className="h-4 w-4 text-black" />
                  </Button>
                </div>

                
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="bg-muted/30 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="relative h-64 sm:h-80 lg:h-full overflow-hidden">
            <Image
              alt={currentHero.title}
              src={currentHero.image || "/placeholder.svg"}
              fill
              className={`object-cover transition-all duration-500 ease-in-out ${
                isAnimating ? 'scale-105 opacity-80' : 'scale-100 opacity-100'
              }`}
              priority
            />
            {/* Overlay for better text readability on mobile */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent lg:hidden" />
          </div>
        </div>
      </div>
    </div>
  )
}
