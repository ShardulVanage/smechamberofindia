import Image from 'next/image'
import React from 'react'

function page() {
  return (
    <div>
      <Image
        src="/entrepreneurship-development/EDC.jpg"
        alt="Entrepreneurship Development"  
        width={1920}
        height={600}
        className="w-full h-auto object-cover"
        />
    </div>
  )
}

export default page
