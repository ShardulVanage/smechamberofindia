'use client'
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider"
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur"
import { useState, useEffect } from 'react';

// Custom hook for responsive gap
const useResponsiveGap = () => {
  const [gap, setGap] = useState(112);

  useEffect(() => {
    const updateGap = () => {
      if (window.innerWidth < 640) {
        setGap(60); // Mobile
      } else if (window.innerWidth < 1024) {
        setGap(80); // Tablet
      } else {
        setGap(112); // Desktop
      }
    };

    updateGap();
    window.addEventListener('resize', updateGap);
    return () => window.removeEventListener('resize', updateGap);
  }, []);

  return gap;
};

export const Initiatives = () => {
  const responsiveGap = useResponsiveGap();

  return (
    <section className="bg-background py-8 sm:py-2 md:py-4 lg:py-8">
      <div className="group relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6 md:flex-row md:space-y-0">
          {/* Title Section */}
          <div className="w-full text-center md:w-auto md:max-w-44 md:border-r md:pr-6 md:text-right">
            <p className="text-xl font-bold text-[#29688A]/90 sm:text-2xl lg:text-3xl">
              Initiatives
            </p>
          </div>
          
          {/* Slider Section */}
          <div className="relative w-full py-6 md:w-[calc(100%-11rem)] md:py-8">
            <InfiniteSlider 
              speedOnHover={20} 
              speed={40} 
              gap={responsiveGap}
            >
              {/* Initiative Logo 1 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/strategic-partners/Bhumi-World.jpg"
                  alt="Bhumi World Initiative Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Initiative Logo 2 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/strategic-partners/comano.jpg"
                  alt="Comano Initiative Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Initiative Logo 3 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/strategic-partners/InstaPe.jpg"
                  alt="InstaPe Initiative Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Initiative Logo 4 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/strategic-partners/LoanExpress.jpg"
                  alt="Loan Express Initiative Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Initiative Logo 5 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/strategic-partners/MK.jpg"
                  alt="MK Initiative Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Initiative Logo 6 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/strategic-partners/sats.jpg"
                  alt="SATS Initiative Logo"
                  height="80"
                  width="auto"
                />
              </div>
            </InfiniteSlider>

            {/* Gradient Overlays - Responsive */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background sm:w-12 md:w-16 lg:w-20"></div>
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background sm:w-12 md:w-16 lg:w-20"></div>
            
            {/* Progressive Blur - Responsive */}
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-8 sm:w-12 md:w-16 lg:w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-8 sm:w-12 md:w-16 lg:w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  )
}