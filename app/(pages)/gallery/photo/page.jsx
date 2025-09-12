"use client"
import { useState, useCallback } from "react"
import { getClientPb } from "@/lib/pocketbase"
import { usePocketBaseFetchWithLoading } from "@/hooks/use-pocketbase-fetch"


export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [photos, setPhotos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const perPage = 15

  const fetchPhotos = useCallback(
    async (signal) => {
      try {
        const pb = getClientPb()
        const result = await pb.collection("Gallery_photo").getList(currentPage, perPage, {
          sort: "order",
            
          signal,
        })

        if (!signal.aborted) {
          setPhotos(result.items)
          setTotalPages(result.totalPages)
          setTotalItems(result.totalItems)
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error("Error fetching photos:", error)
          setPhotos([])
        }
      }
    },
    [currentPage],
  )

  const isLoading = usePocketBaseFetchWithLoading(fetchPhotos, [currentPage])

  const getImageUrl = (photo, filename) => {
    const pb = getClientPb()
    return pb.files.getUrl(photo, filename)
  }

  const openDialog = (photo) => {
    setSelectedPhoto(photo)
  }

  const closeDialog = () => {
    setSelectedPhoto(null)
  }

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const goToPrevious = () => goToPage(currentPage - 1)
  const goToNext = () => goToPage(currentPage + 1)

  const getPaginationNumbers = () => {
    const numbers = []
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      numbers.push(i)
    }
    return numbers
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
          {totalItems > 0 && (
            <p className="text-lg opacity-75 mt-4">
              {totalItems} {totalItems === 1 ? "photo" : "photos"} • Page {currentPage} of {totalPages}
            </p>
          )}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#29688A]"></div>
            <span className="ml-4 text-lg text-gray-600">Loading photos...</span>
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No photos found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group cursor-pointer bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  onClick={() => openDialog(photo)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        photo.img && photo.img.length > 0
                          ? getImageUrl(photo, photo.img[0])
                          : "/placeholder.svg?height=256&width=384"
                      }
                      alt={photo.title}
                      className="w-full h-64 object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 space-x-2">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Previous
                </button>

                {getPaginationNumbers().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                      currentPage === pageNum
                        ? "bg-[#29688A] text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
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
                src={
                  selectedPhoto.img && selectedPhoto.img.length > 0
                    ? getImageUrl(selectedPhoto, selectedPhoto.img[0])
                    : "/placeholder.svg"
                }
                alt={selectedPhoto.title}
                className="w-full h-[500px] object-contain rounded-t-2xl"
              />

              <div className="p-8">
                <h2 className="text-3xl font-bold text-[#29688A] mb-4">{selectedPhoto.title}</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{selectedPhoto.description}</p>
                <p className="text-sm text-gray-500 mt-4">
                  Created: {new Date(selectedPhoto.created).toLocaleDateString()}
                </p>
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
