import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function SMEChamberSection() {
  return (
    <div className="w-full bg-white py-8 md:py-12 lg:py-16">
      <div className="px-4 md:px-0  mx-12 relative">
        {/* Dark blue statistics cards positioned to overlap */}
        <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-24 max-w-7xl mx-auto  ">
          <Card className="bg-[#00006E] text-white border-0 rounded-xl md:rounded-2xl w-full">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold">500+</div>
              <div className="text-sm sm:text-base md:text-xl lg:text-2xl">businesses</div>
            </CardContent>
          </Card>
          <Card className="bg-[#00006E] text-white border-0 rounded-xl md:rounded-2xl w-full">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold">20+</div>
              <div className="text-sm sm:text-base md:text-xl lg:text-2xl">countries</div>
            </CardContent>
          </Card>
          <Card className="bg-[#00006E] text-white border-0 rounded-xl md:rounded-2xl w-full">
            <CardContent className="p-4 md:p-6 text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold">200+</div>
              <div className="text-sm sm:text-base md:text-xl lg:text-2xl">sectors</div>
            </CardContent>
          </Card>
        </div>

        {/* Sky blue main card */}
        <Card className="bg-[#B4E6FF] border-0 rounded-2xl md:rounded-3xl md:rounded-t-[150px] lg:rounded-t-[250px] relative -mt-6 md:-mt-24 pt-8 md:pt-12 lg:pt-24">
          <CardContent className="p-4 md:p-6 lg:p-8">
            {/* Main heading and description */}
            <div className="text-center mb-8 md:mb-10 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
                How SME Chamber of India<br />
                can transform your business
              </h2>
              <p className="text-gray-700 max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl mx-auto px-4">
                Join India's most dynamic SME network for business growth, global partnerships, and policy support.
              </p>
            </div>

            {/* Three feature sections with images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 mb-6 md:mb-8 px-0 md:px-4 lg:px-18">
              {/* Connect with businesses */}
              <div className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#00006E] font-semibold">
                <h3 className="font-semibold">Connect with</h3>
                <p className="mb-3 md:mb-4">
                  5000+ businesses<br />
                  across 20+ countries
                </p>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/assets/about-section/img1.jpg"
                    alt="Business professionals networking"
                    width={1000}
                    height={200}
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-[700px] object-cover"
                  />
                </div>
              </div>

              {/* Access opportunities */}
              <div className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#00006E] font-semibold md:mt-6 lg:mt-10">
                <h3 className="">Access exclusive trade &</h3>
                <p className="mb-3 md:mb-4">investment opportunities</p>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/assets/about-section/img2.jpg"
                    alt="Business handshake and collaboration"
                    width={1000}
                    height={200}
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-[700px] object-cover"
                  />
                </div>
              </div>

              {/* Get recognized */}
              <div className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#00006E] font-semibold">
                <h3 className="">Get recognized</h3>
                <p className="mb-3 md:mb-4">
                  through summits,<br />
                  awards & global events
                </p>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/assets/about-section/img3.jpg"
                    alt="Conference and business events"
                    width={1000}
                    height={200}
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-[700px] object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Become a Member button */}
            <div className="text-center">
              <Button className="bg-[#00006E] hover:bg-[#00006E]/90 text-white px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 lg:px-24 lg:py-8 rounded-full text-sm sm:text-base md:text-lg lg:text-2xl">
                Become a Member
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
