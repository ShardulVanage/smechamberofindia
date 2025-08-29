  import Image from "next/image"
  import { InfiniteSlider } from "./motion-primitives/infinite-slider"

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
      <section className="py-16 md:py-32">
        
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight text-center">
            
              <span className="block text-[#29688A]">  Exhibitions</span>

              We've Proudly Supported
            </h2>
        <div className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-12 pt-16 bg-[#29688A]/10 backdrop-blur-sm p-6 mt-12 rounded-4xl">
          <div className="grid gap-6 sm:grid-cols-2 md:gap-3 lg:gap-4">
            <div className="relative mb-6 sm:mb-0">
              <div className="bg-linear-to-b aspect-5/2 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                <Image
                  src="/assets/supported-exibition/IPEC-3.jpg"
                  className=" rounded-[15px] dark:block drop-shadow-2xl"
                  alt="payments illustration dark"
                  width={1207}
                  height={929}
                />
              </div>
            </div>

            <div className="relative space-y-4">
              <div className="relative mb-6 sm:mb-0">
                <div className="bg-linear-to-b aspect-5/2 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                  <Image
                    src="/assets/supported-exibition/water_expo-2.jpg"
                    className=" rounded-[15px] dark:block drop-shadow-2xl"
                    alt="payments illustration dark"
                    width={1207}
                    height={929}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <InfiniteSlider gap={16} reverse={false} duration={20} speedOnHover={30} speed={45} >
              {exhibitionImages.map((image, index) => (
                <div key={index} className="w-96 flex-shrink-0">
                  <div className="bg-linear-to-b aspect-5/2 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      className="rounded-[15px]  w-full h-full"
                      alt={image.alt}
                      width={600}
                      height={400}
                    />
                  </div>
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </div>
      </section>
    )
  }
