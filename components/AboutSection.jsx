import { Users, TrendingUp, Globe, Handshake } from "lucide-react"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Empowering SMEs for
            <span className="block text-[#29688A]">Global Competitiveness</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            For over 32 years, we've been the leading organization dedicated to empowering the SME sector through
            strategic partnerships and innovative solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="text-gray-700 text-lg leading-relaxed">
                We integrate SMEs, manufacturers, exporters, service providers, corporates, and start-ups to explore
                emerging business opportunities in domestic and global markets.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mt-10">
                <div className="group p-6 rounded-xl bg-gray-50 hover:bg-[#29688A]/5 transition-all duration-300 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#29688A]/10 group-hover:bg-[#29688A]/20 transition-colors">
                      <TrendingUp className="w-5 h-5 text-[#29688A]" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Business Growth</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Export promotion, transformation and diversification for 10X growth.
                  </p>
                </div>

                <div className="group p-6 rounded-xl bg-gray-50 hover:bg-[#29688A]/5 transition-all duration-300 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#29688A]/10 group-hover:bg-[#29688A]/20 transition-colors">
                      <Globe className="w-5 h-5 text-[#29688A]" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Global Reach</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Connecting businesses to international markets and opportunities.
                  </p>
                </div>

                <div className="group p-6 rounded-xl bg-gray-50 hover:bg-[#29688A]/5 transition-all duration-300 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#29688A]/10 group-hover:bg-[#29688A]/20 transition-colors">
                      <Users className="w-5 h-5 text-[#29688A]" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Networking</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Unique platform connecting CEOs, officials, and industry leaders.
                  </p>
                </div>

                <div className="group p-6 rounded-xl bg-gray-50 hover:bg-[#29688A]/5 transition-all duration-300 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#29688A]/10 group-hover:bg-[#29688A]/20 transition-colors">
                      <Handshake className="w-5 h-5 text-[#29688A]" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Partnerships</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Facilitating joint ventures, collaborations, and strategic alliances.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#29688A]">32+</div>
                <div className="text-sm text-gray-600">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#29688A]">10,000+</div>
                <div className="text-sm text-gray-600">SMEs Empowered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#29688A]">50+</div>
                <div className="text-sm text-gray-600">Countries Reached</div>
              </div>
            </div>
          </div>

          <div className="relative order-first lg:order-last">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#29688A]/10 to-transparent"></div>

              <Image
                src="https://lh3.googleusercontent.com/p/AF1QipP-5OLMMOJ5hcLWVGF6cw13VdxfiGrqbW3ZkneD=s1360-w1360-h1020-rw"
                className="w-full h-auto rounded-2xl"
                alt="SME Chamber networking and business growth"
                width={600}
                height={400}
                priority
              />

              {/* Floating accent card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#29688A] rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Growing Together</div>
                    <div className="text-sm text-gray-600">Since 1992</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
