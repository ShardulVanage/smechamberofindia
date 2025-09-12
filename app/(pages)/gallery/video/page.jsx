"use client"
import { useState, useEffect, useCallback } from "react"
import { getClientPb } from "@/lib/pocketbase"
import { usePocketBaseFetchWithLoading } from "@/hooks/use-pocketbase-fetch"
import { extractYouTubeId, getYouTubeThumbnail } from "@/utils/youtube"
import { Button } from "@/components/ui/button"

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const itemsPerPage = 15

  // Function to format relative time
  const formatRelativeTime = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInSeconds = Math.floor((now - date) / 1000)
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)
    const diffInWeeks = Math.floor(diffInDays / 7)
    const diffInMonths = Math.floor(diffInDays / 30)
    const diffInYears = Math.floor(diffInDays / 365)

    if (diffInSeconds < 60) {
      return "just now"
    } else if (diffInMinutes < 60) {
      return diffInMinutes === 1 ? "1 minute ago" : `${diffInMinutes} minutes ago`
    } else if (diffInHours < 24) {
      return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`
    } else if (diffInDays === 1) {
      return "yesterday"
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`
    } else if (diffInWeeks === 1) {
      return "1 week ago"
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks} weeks ago`
    } else if (diffInMonths === 1) {
      return "1 month ago"
    } else if (diffInMonths < 12) {
      return `${diffInMonths} months ago`
    } else if (diffInYears === 1) {
      return "1 year ago"
    } else {
      return `${diffInYears} years ago`
    }
  }

  const fetchVideos = useCallback(async (signal) => {
    try {
      setError(null)
      const pb = getClientPb()
      
      const response = await pb.collection("Gallery_video").getList(currentPage, itemsPerPage, {
        sort: "order",
        signal: signal // Pass the abort signal to the request
      })
      
      setData(response)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to fetch videos')
      }
    }
  }, [currentPage, itemsPerPage])

  const isLoading = usePocketBaseFetchWithLoading(fetchVideos, [currentPage])

  const videos = data?.items || []
  const totalPages = data?.totalPages || 1
  const totalItems = data?.totalItems || 0

  const openDialog = (video) => {
    setSelectedVideo(video)
  }

  const closeDialog = () => {
    setSelectedVideo(null)
  }

  const goToPage = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#29688A] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading videos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading videos: {error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#29688A] to-[#1e4a5f] text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">Video Gallery</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Watch inspiring stories, expert insights, and entrepreneurial journeys
          </p>
          <p className="text-lg opacity-75 mt-4">
            {totalItems} videos • Page {currentPage} of {totalPages}
          </p>
        </div>
      </div>

      {/* Video Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {videos.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No videos found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => {
                const youtubeId = extractYouTubeId(video.youtubeUrl)
                const thumbnailUrl = youtubeId ? getYouTubeThumbnail(youtubeId) : "/video-thumbnail.png"

                return (
                  <div
                  key={video.id}
                  className="group cursor-pointer bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  onClick={() => openDialog(video)}
                  >
                  <div className="relative overflow-hidden">
                    <img
                    src={
                      video.img
                      ? `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/Gallery_video/${video.id}/${video.img}`
                      : thumbnailUrl
                    }
                    alt={video.title}
                    className="w-full h-64 object-contain group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "/video-thumbnail.png"
                    }}
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-[#29688A]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-xl text-[#29688A] mb-3 group-hover:text-[#1e4a5f] transition-colors duration-300">
                    {video.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed line-clamp-3">{video.description}</p>
                    <div className="mt-4 flex items-center text-[#29688A] font-medium group-hover:text-[#1e4a5f] transition-colors duration-300">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>Watch Video</span>
                    </div>
                  </div>
                  </div>
                )
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-12">
                <Button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  variant="outline"
                  className="px-6 py-2 bg-transparent"
                >
                  Previous
                </Button>

                <div className="flex space-x-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }

                    return (
                      <Button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        className="w-10 h-10 p-0"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  className="px-6 py-2 bg-transparent"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Video Dialog Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="relative">
              <button
                onClick={closeDialog}
                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                {extractYouTubeId(selectedVideo.youtubeUrl) ? (
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-t-2xl"
                    src={`https://www.youtube.com/embed/${extractYouTubeId(selectedVideo.youtubeUrl)}?autoplay=1&rel=0`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center rounded-t-2xl">
                    <p className="text-gray-600">Invalid YouTube URL</p>
                  </div>
                )}
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-bold text-[#29688A] mb-4">{selectedVideo.title}</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{selectedVideo.description}</p>

                <div className="mt-6 flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Published {formatRelativeTime(selectedVideo.created)}</span>
                  </div>
                </div>
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