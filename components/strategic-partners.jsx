'use client';
import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'motion/react';
import { useState, useEffect } from 'react';
import useMeasure from 'react-use-measure';

import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur"
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

 function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let controls;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;
    const distanceToTravel = Math.abs(to - from);
    const duration = distanceToTravel / currentSpeed;

    if (isTransitioning) {
      const remainingDistance = Math.abs(translation.get() - to);
      const transitionDuration = remainingDistance / currentSpeed;
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: transitionDuration,
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: duration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [
    key,
    translation,
    currentSpeed,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speedOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speed);
        },
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className='flex w-max'
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}



export const StrategicPartners = () => {
  const responsiveGap = useResponsiveGap();
  
  return (
    <section className="bg-background py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="group relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6 md:flex-row md:space-y-0">
          {/* Title Section */}
          <div className="w-full text-center md:w-auto md:max-w-44 md:border-r md:pr-6 md:text-right">
            <p className="text-xl font-bold  sm:text-2xl lg:text-3xl text-[#29688A]/90">
              Strategic Partners
            </p>
          </div>
          
          {/* Slider Section */}
          <div className="relative w-full py-6 md:w-[calc(100%-11rem)] md:py-8">
            <InfiniteSlider 
              speedOnHover={20} 
              speed={40} 
              gap={responsiveGap}
            >
              {/* Partner Logo 1 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/strategic-partners/Bhumi-World.jpg"
                  alt="Bhumi World Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Partner Logo 2 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/strategic-partners/comano.jpg"
                  alt="Comano Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Partner Logo 3 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/strategic-partners/InstaPe.jpg"
                  alt="InstaPe Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Partner Logo 4 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/strategic-partners/LoanExpress.jpg"
                  alt="Loan Express Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Partner Logo 5 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/strategic-partners/MK.jpg"
                  alt="MK Logo"
                  height="80"
                  width="auto"
                />
              </div>
              
              {/* Partner Logo 6 */}
              <div className="flex shrink-0">
                <img
                  className="mx-auto h-12 w-fit object-contain opacity-60 transition-opacity duration-300 hover:opacity-100 dark:invert sm:h-16 md:h-20"
                  src="/assets/strategic-partners/sats.jpg"
                  alt="SATS Logo"
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