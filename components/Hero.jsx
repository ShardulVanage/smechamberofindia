import { ArrowRight, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardStack } from "./card-stack"
import Link from "next/link"

export default function HeroSection() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <section className="relative isolate">
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
            <div className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-24 lg:pb-24">
              <div className="text-center">
                {/* Badge */}
                <div className="inline-flex items-center rounded-full bg-[#29688A]/10 px-4 py-2 text-sm font-medium text-[#29688A] ring-1 ring-[#29688A]/20 mb-8">
                  <span>32 Years of Excellence</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block">Empowering SMEs for</span>
                  <span className="block text-[#29688A]">Global Success</span>
                </h1>

                {/* Description */}
                <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl">
                  Leading organization empowering small and medium enterprises through business growth, export promotion,
                  technology transfers, and global market opportunities.
                </p>

                {/* CTA Section */}
                <div className="mt-12 flex flex-col items-center gap-8">
                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
                    <Link href={'/membership'}>
                    <Button className="bg-[#29688A] hover:bg-[#29688A]/90 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 flex-1">
                      <Users className="h-5 w-5" />
                      Join Membership
                    </Button>
                    </Link>
                    <Link href={'/about'}>
                    <Button
                      variant="outline"
                      className="border-[#29688A] text-[#29688A] hover:bg-[#29688A] hover:text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 flex-1 bg-transparent"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    </Link>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#29688A]"></div>
                      <span>50,000+ Members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#29688A]"></div>
                      <span>180+ Countries</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#29688A]"></div>
                      <span>Trusted Since 1991</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Services Cards */}
          <div className="pb-16 sm:pb-20 lg:pb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Services</h2>
              <p className="mt-4 text-lg text-gray-600">Comprehensive solutions for your business growth</p>
            </div>

            <div className="relative">
              <CardStack />
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-50rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#29688A] to-[#29688A] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </section>
    </main>
  )
}











  {/* Services Cards */}
          // <div className="pb-16 sm:pb-20 lg:pb-24">
          //   <div className="text-center mb-12">
          //     <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Services</h2>
          //     <p className="mt-4 text-lg text-gray-600">Comprehensive solutions for your business growth</p>
          //   </div>

          //   <div className="relative">
          //     <CardStack />
          //   </div>
          // </div>