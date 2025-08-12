import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider"
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur"

export const Initiatives = () => {
  return (
    <section className="bg-background py-4 md:py-4">
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="inline md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-2xl font-bold text-primary">Initiatives</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
              <div className="flex">
                <img
                  className="mx-auto h-20 w-fit dark:invert opacity-60 hover:opacity-100 transition-opacity"
                  src="/assets/strategic-partners/Bhumi-World.jpg"
                  alt="FICCI Logo"
                  height="56"
                  width="120"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-20 w-fit dark:invert opacity-60 hover:opacity-100 transition-opacity"
                  src="/assets/strategic-partners/comano.jpg"
                  alt="CII Logo"
                  height="56"
                  width="120"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-20 w-fit dark:invert opacity-60 hover:opacity-100 transition-opacity"
                  src="/assets/strategic-partners/InstaPe.jpg"
                  alt="ASSOCHAM Logo"
                  height="56"
                  width="120"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-20 w-fit dark:invert opacity-60 hover:opacity-100 transition-opacity"
                  src="/assets/strategic-partners/LoanExpress.jpg"
                  alt="EXIM Bank Logo"
                  height="56"
                  width="120"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-20 w-fit dark:invert opacity-60 hover:opacity-100 transition-opacity"
                  src="/assets/strategic-partners/MK.jpg"
                  alt="SIDBI Logo"
                  height="56"
                  width="120"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-20 w-fit dark:invert opacity-60 hover:opacity-100 transition-opacity"
                  src="assets/strategic-partners/sats.jpg"
                  alt="MSME Ministry Logo"
                  height="56"
                  width="120"
                />
              </div>
            
            </InfiniteSlider>

            <div className="bg-gradient-to-r from-background absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-gradient-to-l from-background absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
