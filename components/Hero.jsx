import { Mail, SendHorizonal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedGroup } from "@/components/motion-primitives/animated-group"

import { CardStack } from "./card-stack"

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

export default function HeroSection() {
  return (
    <>

      <main className="overflow-hidden [--color-primary-foreground:var(--color-white)] [--color-primary:var(--color-green-600)]">
        <section>
          <div className="relative mx-auto max-w-6xl px-6 pb-2 pt-32 lg:pt-24">
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <h1
               
                className="text-balance text-5xl font-medium md:text-6xl"
              >
                Empowering SMEs for Global Success
              </h1>
              <p
                
                className="mx-auto mt-6 max-w-2xl text-pretty text-lg"
              >
                For 32 years, SME Chamber of India has been the leading organization empowering small and medium
                enterprises through business growth, export promotion, technology transfers, and global market
                opportunities.
              </p>

              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
                className="mt-12"
              >
                <form action="" className="mx-auto max-w-sm">
                  <div className="bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center rounded-[calc(var(--radius)+0.5rem)] border pr-2 shadow shadow-zinc-950/5 has-[input:focus]:ring-2">
                    <Mail className="pointer-events-none absolute inset-y-0 left-4 my-auto size-4" />

                    <input
                      placeholder="Your mail address"
                      className="h-12 w-full bg-transparent pl-12 focus:outline-none"
                      type="email"
                    />

                    <div className="md:pr-1.5 lg:pr-0">
                      <Button aria-label="submit" size="sm" className="rounded-(--radius)">
                        <span className="hidden md:block">Join Network</span>
                        <SendHorizonal className="relative mx-auto size-5 md:hidden" strokeWidth={2} />
                      </Button>
                    </div>
                  </div>
                </form>

                <div className="mt-12 space-y-8">
                    <div className="relative rounded-[1rem] bg-white/5 p-2">
                      <CardStack className="w-full" />
                    </div>
              

                
                </div>
              </AnimatedGroup>
            </div>
          </div>
        </section>
   
      </main>
    </>
  )
}
