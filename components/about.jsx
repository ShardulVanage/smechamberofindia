import { Users, TrendingUp, Globe, Handshake } from "lucide-react"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">
          Empowering SMEs for Global Competitiveness
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
          <div className="relative space-y-4">
            <p className="text-muted-foreground">
              For over 32 years, SME Chamber of India has been{" "}
              <span className="text-accent-foreground font-bold">the leading organization</span> dedicated to empowering
              the SME sector for global competitiveness and business growth.
            </p>
            <p className="text-muted-foreground">
              We integrate SMEs, manufacturers, exporters, service providers, corporates, and start-ups to explore
              emerging business opportunities in domestic and global markets through strategic partnerships and
              innovative solutions.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-6 sm:gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4" />
                  <h3 className="text-sm font-medium">Business Growth</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Export promotion, transformation and diversification for 10X growth.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="size-4" />
                  <h3 className="text-sm font-medium">Global Reach</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Connecting businesses to international markets and opportunities.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="size-4" />
                  <h3 className="text-sm font-medium">Networking</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Unique platform connecting CEOs, officials, and industry leaders.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Handshake className="size-4" />
                  <h3 className="text-sm font-medium">Partnerships</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Facilitating joint ventures, collaborations, and strategic alliances.
                </p>
              </div>
            </div>
          </div>
          <div className="relative mt-6 sm:mt-0">
            <div className="bg-linear-to-b aspect-67/34 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
              <Image
                src="https://lh3.googleusercontent.com/p/AF1QipP-5OLMMOJ5hcLWVGF6cw13VdxfiGrqbW3ZkneD=s1360-w1360-h1020-rw"
                className="hidden rounded-[15px] dark:block"
                alt="SME Chamber networking illustration dark"
                width={1206}
                height={612}
              />
              <Image
                src="https://lh3.googleusercontent.com/p/AF1QipP-5OLMMOJ5hcLWVGF6cw13VdxfiGrqbW3ZkneD=s1360-w1360-h1020-rw"
                className="rounded-[15px] shadow dark:hidden"
                alt="SME Chamber networking illustration light"
                width={1206}
                height={612}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
