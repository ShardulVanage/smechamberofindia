"use client"

import { Button } from "@/components/ui/button"

export function HeroHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-800/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-bold text-xl">SME Chamber of India</div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm hover:text-primary transition-colors">
            Services
          </a>
          <a href="#" className="text-sm hover:text-primary transition-colors">
            Membership
          </a>
          <a href="#" className="text-sm hover:text-primary transition-colors">
            Events
          </a>
          <a href="#" className="text-sm hover:text-primary transition-colors">
            Resources
          </a>
        </nav>
        <Button size="sm">Join Chamber</Button>
      </div>
    </header>
  )
}
