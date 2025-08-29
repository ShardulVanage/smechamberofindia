"use client"

import Image from "next/image"
import { InfiniteSlider } from "./motion-primitives/infinite-slider"
import { motion } from "framer-motion"

export default function SupportedExibition() {
  const exhibitionImages = [
    {
      src: "/assets/supported-exibition/water_expo-2.jpg",
      alt: "Exhibition display 1",
    },
    {
      src: "/assets/supported-exibition/water_expo-3.jpg",
      alt: "Exhibition display 2",
    },
    {
      src: "/assets/supported-exibition/IPEC-3.jpg",
      alt: "Exhibition display 3",
    },
    {
      src: "/assets/supported-exibition/indialightexpo-1.jpg",
      alt: "Exhibition display 4",
    },
    // {
    //   src: "/placeholder.svg?height=400&width=600",
    //   alt: "Exhibition display 5",
    // },
    // {
    //   src: "/placeholder.svg?height=400&width=600",
    //   alt: "Exhibition display 6",
    // },
  ]

  return (
    <motion.section
      className="py-16 md:py-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <span className="block text-[#29688A]"> Exhibitions</span>
        We've Proudly Supported
      </motion.h2>
      <div className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-12 pt-16 bg-[#29688A]/10 backdrop-blur-sm p-6 mt-12 rounded-4xl">
        <div className="grid gap-6 sm:grid-cols-2 md:gap-3 lg:gap-4">
          <motion.div
            className="relative mb-6 sm:mb-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-linear-to-b aspect-5/2 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
              <Image
                src="/assets/supported-exibition/IPEC-3.jpg"
                className=" rounded-[15px] dark:block drop-shadow-2xl"
                alt="payments illustration dark"
                width={1207}
                height={929}
              />
            </div>
          </motion.div>

          <motion.div
            className="relative space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-linear-to-b aspect-5/2 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
              <Image
                src="/assets/supported-exibition/water_expo-2.jpg"
                className="rounded-[15px]  w-full h-full"
                alt="payments illustration dark"
                width={1207}
                height={929}
              />
            </div>
          </motion.div>
        </div>

        <div className="mt-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <InfiniteSlider gap={16} reverse={false} duration={20} speedOnHover={30} speed={45}>
              {exhibitionImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="w-96 flex-shrink-0"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: Math.min(0.2 + index * 0.05, 0.5) }}
                >
                  <div className="bg-linear-to-b aspect-5/2 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      className="rounded-[15px]  w-full h-full"
                      alt={image.alt}
                      width={600}
                      height={400}
                    />
                  </div>
                </motion.div>
              ))}
            </InfiniteSlider>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
