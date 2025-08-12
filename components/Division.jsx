import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider"
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur"

export const Division = () => {
  return (
    <section className="bg-background py-4 md:py-1">
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="relative py-6 md:w-[calc(100%-11rem)] order-2 md:order-1">
            <InfiniteSlider speedOnHover={20} speed={40} gap={112} reverse={true}>
              <div className="flex">
                <img
                  className="mx-auto h-20 w-fit dark:invert opacity-60 hover:opacity-100 transition-opacity"
                  src="/assets/event-sponsors/billmart.jpg"
                  alt="FICCI Logo"
                  height="56"
                  width="120"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-20 w-fit dark:invert opacity-60 hover:opacity-100 transition-opacity"
                  src="/assets//event-sponsors/bob.jpg"
                  alt="CII Logo"
                  height="56"
                  width="120"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-20 w-fit dark:invert opacity-60 hover:opacity-100 transition-opacity"
                  src="/assets//event-sponsors/boi.jpg"
                  alt="ASSOCHAM Logo"
                  height="56"
                  width="120"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-20 w-fit dark:invert opacity-60 hover:opacity-100 transition-opacity"
                  src="/assets/event-sponsors/dell.jpg"
                  alt="EXIM Bank Logo"
                  height="56"
                  width="120"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-20 w-fit dark:invert opacity-60 hover:opacity-100 transition-opacity"
                  src="/assets/event-sponsors/L&T.jpg"
                  alt="SIDBI Logo"
                  height="56"
                  width="120"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-20 w-fit dark:invert opacity-60 hover:opacity-100 transition-opacity"
                  src="assets/event-sponsors/orb.jpg"
                  alt="MSME Ministry Logo"
                  height="56"
                  width="120"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-20 w-fit dark:invert opacity-60 hover:opacity-100 transition-opacity"
                  src="assets/event-sponsors/pnb.jpg"
                  alt="MSME Ministry Logo"
                  height="56"
                  width="120"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-20 w-fit dark:invert opacity-60 hover:opacity-100 transition-opacity"
                  src="assets/event-sponsors/salesforce.jpg"
                  alt="MSME Ministry Logo"
                  height="56"
                  width="120"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-20 w-fit dark:invert opacity-60 hover:opacity-100 transition-opacity"
                  src="assets/event-sponsors/sbi.jpg"
                  alt="MSME Ministry Logo"
                  height="56"
                  width="120"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-20 w-fit dark:invert opacity-60 hover:opacity-100 transition-opacity"
                  src="assets/event-sponsors/tata.jpg"
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
          <div className="inline md:max-w-44 md:border-l md:pl-6 order-1 md:order-2">
            <p className="text-start text-2xl font-bold text-primary">Division</p>
          </div>
        </div>
      </div>
    </section>
  )
}
