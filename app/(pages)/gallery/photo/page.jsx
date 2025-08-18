"use client"
import { useState } from "react"

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const photos = [
  {
    id: 1,
    src: "/assets/gallery/ncm.jpg",
    title: "Meeting with Hon'ble Prime Minister Shri Narendra Modi",
    description:
      "Shri Chandrakant Salunkhe, Founder and President - SME Chamber of India and Start-Ups Council of India met Hon'ble Prime Minister of India Shri Narendra Modi on 27th December 2019 at his residence and submitted suggestions and recommendations for the empowerment of SME sector, Manufacturing and Start Ups.",
  },
  {
    id: 2,
    src: "/assets/gallery/ramdas.jpg",
    title: "Felicitating Hon'ble Minister Shri Ramdas Athawale",
    description:
      "Shri Chandrakant Salunkhe, Founder & President of the SME Chamber of India and Maharashtra Industry Development Association, felicitates Shri Ramdas Athawale with flowers on his appointment as Minister of State for Social Justice & Empowerment, Government of India on 28th June 2024 at New Delhi",
  },
  {
    id: 3,
    src: "/assets/gallery/Narayan_Rane.jpg",
    title: "Activity Report Release by Hon'ble Union Minister Shri Narayan Rane",
    description:
      "Shri Narayan Rane - Hon'ble Union Minister of MSME, Government of India has released the Activity Report of SME Chamber of India and SMEConnect – Magazine for the year 2022 on 14th March 2023 at Delhi. The Chamber is putting efforts under the dynamic Presidentship of Shri Chandrakant Salunkhe for the empowerment of MSME for the last 30 years",
  },
]

  const openDialog = (photo) => {
    setSelectedPhoto(photo)
  }

  const closeDialog = () => {
    setSelectedPhoto(null)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#29688A] to-[#1e4a5f] text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">Photo Gallery</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Capturing moments of excellence, innovation, and entrepreneurial spirit
          </p>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group cursor-pointer bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              onClick={() => openDialog(photo)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-bold text-lg mb-1">{photo.title}</h3>
                  <p className="text-sm opacity-90 line-clamp-2">{photo.description}</p>
                </div> */}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-[#29688A] mb-3 group-hover:text-[#1e4a5f] transition-colors duration-300">
                  {photo.title}
                </h3>
                <p className="text-gray-600 leading-relaxed line-clamp-3">{photo.description}</p>
                <div className="mt-4 flex items-center text-[#29688A] font-medium group-hover:text-[#1e4a5f] transition-colors duration-300">
                  <span>View Details</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="relative">
              <button
                onClick={closeDialog}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <img
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.title}
                className="w-full h-[500px] object-contain rounded-4xl rounded-t-2xl"
              />

              <div className="p-8">
                <h2 className="text-3xl font-bold text-[#29688A] mb-4">{selectedPhoto.title}</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{selectedPhoto.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
