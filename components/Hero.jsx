import { ArrowRight, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function HeroSection() {
  return (
    <main className="h-full w-screen bg-gradient-hero relative overflow-hidden pb-32">
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="pt-20 pb-24 sm:pt-24 lg:pt-24">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center rounded-full bg-[#29688A]/10 px-4 py-2 text-sm font-medium text-[#29688A] ring-1 ring-[#29688A]/20 mb-8">
                <span>32 Years of Excellence</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">Empowering SMEs for</span>
                <span className="block text-[#29688A]">Global Success</span>
              </h1>

              {/* Description */}
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Leading organization empowering small and medium enterprises through business growth, export promotion,
                technology transfers, and global market opportunities.
              </p>

              {/* CTA Section */}
              <div className="mt-12 flex flex-col items-center gap-8 relative z-30">
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center items-center">
                  <Link href="/membership">
                    <Button  className="flex items-center justify-center gap-2 flex-1 bg-[#29688A]">
                      <Users className="h-5 w-5" />
                      Join Membership
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                   
                      className="flex items-center justify-center gap-2 flex-1 bg-[#29688A] "
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
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
        </div>

        {/* Bottom Image with Gradient Overlay */}
      </section>
        <div className="absolute bottom-0 left-0 right-0 h-96 overflow-hidden   ">
          <img 
            src="/Patriarch.png" 
            alt="Indian Parliament Building" 
            className="w-fit h-full object-cover object-center pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
        </div>
         <div className="absolute bottom-0  right-0 h-96 overflow-hidden   ">
          <img 
            src="/Patriarch.png" 
            alt="Indian Parliament Building" 
            className="w-fit h-full object-cover object-center  pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent "></div>
        </div>
    </main>
  )
}