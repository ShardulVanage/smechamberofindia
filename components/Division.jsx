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

export const Division = () => {
  const responsiveGap = useResponsiveGap();

  return (
    <section className="bg-background py-8 sm:py-2 md:py-4 lg:py-8">
      <div className="group relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6 md:flex-row md:space-y-0">
          {/* Slider Section - Order 2 on mobile, Order 1 on desktop */}
          <div className="relative w-full py-6 order-2 md:order-1 md:w-[calc(100%-11rem)] md:py-8">
            <InfiniteSlider 
              speedOnHover={20} 
              speed={40} 
              gap={responsiveGap} 
              reverse={true}
            >
              {/* Division Logo 1 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/event-sponsors/billmart.jpg"
                  alt="Billmart Division Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Division Logo 2 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/event-sponsors/bob.jpg"
                  alt="Bank of Baroda Division Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Division Logo 3 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/event-sponsors/boi.jpg"
                  alt="Bank of India Division Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Division Logo 4 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/event-sponsors/dell.jpg"
                  alt="Dell Division Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Division Logo 5 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/event-sponsors/L&T.jpg"
                  alt="L&T Division Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Division Logo 6 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/event-sponsors/orb.jpg"
                  alt="ORB Division Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Division Logo 7 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/event-sponsors/pnb.jpg"
                  alt="Punjab National Bank Division Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Division Logo 8 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/event-sponsors/salesforce.jpg"
                  alt="Salesforce Division Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Division Logo 9 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/event-sponsors/sbi.jpg"
                  alt="State Bank of India Division Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Division Logo 10 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/event-sponsors/tata.jpg"
                  alt="Tata Division Logo"
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
          
          {/* Title Section - Order 1 on mobile, Order 2 on desktop */}
          <div className="w-full text-center order-1 md:order-2 md:w-auto md:max-w-44 md:border-l md:pl-6 md:text-left">
            <p className="text-xl font-bold text-[#29688A]/90  sm:text-2xl lg:text-3xl">
              Division
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}