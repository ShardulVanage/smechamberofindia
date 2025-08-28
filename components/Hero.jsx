import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { ArrowRight, Users, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-[#29688A] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(41,104,138,0.1)_0%,transparent_50%)]"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-6 py-2 text-sm font-medium text-amber-800">
              <span>36 Years of Excellence</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-slate-900">Empowering SMEs</span>
                <br />
                <span className="text-slate-900">for </span>
                <span className="text-[#29688A]">Global Success</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
              Leading organization empowering small and medium enterprises through business growth, export promotion, 
              technology transfers and global market opportunities.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/membership">
                <Button className="bg-[#29688A] hover:bg-[#29688A]/90 text-white px-8 py-6 rounded-full text-lg font-medium transition-all duration-300 flex items-center gap-3">
                  <Users className="h-5 w-5" />
                  Join Membership
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  variant="outline" 
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 rounded-full text-lg font-medium transition-all duration-300 flex items-center gap-3"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="w-10 h-10 rounded-full bg-[#29688A]/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-[#29688A]" />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">50,000+</div>
                  <div className="text-sm text-slate-600">Members</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900">180+</div>
                  <div className="text-sm text-slate-600">Countries</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Global Network Visualization with Image */}
          <div className="relative">
            {/* Main Globe Background */}
      

         <Image 
            src="/leftherobg.png"
            alt="Indian Parliament Building"
            className="w-full h-full object-cover object-start  pointer-events-none select-none "
            width={600}
            height={600}
          />
     
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tl from-[#29688A]/30 to-transparent rounded-full blur-lg"></div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
    </section>
  )
}

export default Hero
























// import { ArrowRight, Users } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"


// export default function HeroSection() {
//   return (
//     <main className="h-full w-screen bg-gradient-hero relative overflow-hidden pb-32 ">
//       <section className="relative">
        // <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      
        //   <div className="pt-20 pb-24 sm:pt-24 lg:pt-24">
        //     <div className="text-start">
       
        //       <div className="inline-flex items-start rounded-full bg-[#29688A]/10 px-4 py-2 text-sm font-medium text-[#29688A] ring-1 ring-[#29688A]/20 mb-8">
        //         <span>32 Years of Excellence</span>
        //       </div>

        //       <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
        //         <span className="block">Empowering SMEs for</span>
        //         <span className="block text-[#29688A]">Global Success</span>
        //       </h1>

        
        //       <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
        //         Leading organization empowering small and medium enterprises through business growth, export promotion,
        //         technology transfers, and global market opportunities.
        //       </p>

             
        //       <div className="mt-12 flex flex-col items-start gap-8 relative z-30">
        //         <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-start items-start">
        //           <Link href="/membership">
        //             <Button  className="flex items-start justify-start gap-2 flex-1 bg-[#29688A]">
        //               <Users className="h-5 w-5" />
        //               Join Membership
        //             </Button>
        //           </Link>
        //           <Link href="/about">
        //             <Button
                   
        //               className="flex items-start justify-start gap-2 flex-1 bg-[#29688A] "
        //             >
        //               Learn More
        //               <ArrowRight className="h-4 w-4" />
        //             </Button>
        //           </Link>
        //         </div>

         
        //         <div className="flex flex-wrap justify-start gap-8 text-sm text-muted-foreground">
        //           <div className="flex items-start gap-2">
        //             <div className="h-2 w-2 rounded-full bg-[#29688A]"></div>
        //             <span>50,000+ Members</span>
        //           </div>
        //           <div className="flex items-start gap-2">
        //             <div className="h-2 w-2 rounded-full bg-[#29688A]"></div>
        //             <span>180+ Countries</span>
        //           </div>
        //           <div className="flex items-start gap-2">
        //             <div className="h-2 w-2 rounded-full bg-[#29688A]"></div>
        //             <span>Trusted Since 1991</span>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>

//       </section>
//         <div className="absolute bottom-0 -left-40 h-[350px]   overflow-hidden   ">
//           <img 
//             src="/leftherobg2.png" 
//             alt="Indian Parliament Building" 
//             className="w-fit h-full object-cover object-start pointer-events-none select-none"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
//         </div>
//          <div className="absolute bottom-0  right-0 h-[600px] overflow-hidden transform  ">
//           <img 
//             src="/rightside2.png" 
//             alt="Indian Parliament Building" 
//             className="w-fit h-full object-cover object-start  pointer-events-none select-none "
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent  "></div>
//         </div> 
//     </main>
//   )
// }