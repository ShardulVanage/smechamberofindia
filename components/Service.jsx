import React from 'react'
import CardStack from './card-stack'

function Service() {
  return (
    <div>
       {/* Services Cards */}
          <div className="pb-16 sm:pb-20 lg:pb-24 pt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Services</h2>
              <p className="mt-4 text-lg text-gray-600">Comprehensive solutions for your business growth</p>
            </div>

            <div className="relative">
              <CardStack />
            </div>
          </div>

            <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-10rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-0rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+13rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#29688A] to-[#29688A] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
    </div>
  )
}

export default Service
