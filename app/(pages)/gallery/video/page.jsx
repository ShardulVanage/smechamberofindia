"use client"
import { useState } from "react"

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState(null)

  const videos = [
    {
      id: 1,
      youtubeId: "rci3weSCbhk",
      thumbnail: "/assets/gallery/video1.png",
      title: "SME Business Summit 2024 - Keynote Address",
      description:
        "Inspiring keynote presentation on the future of small and medium enterprises, featuring insights on digital transformation, sustainable growth, and emerging market opportunities in the post-pandemic economy.",
    },
    {
      id: 2,
      youtubeId: "rci3weSCbhk",
      thumbnail: "/assets/gallery/video1.png",
      title: "Entrepreneurship Panel Discussion",
      description:
        "Dynamic panel discussion featuring successful entrepreneurs sharing their journey, challenges overcome, and strategies for building resilient businesses in competitive markets.",
    },
    {
      id: 3,
      youtubeId: "rci3weSCbhk",
      thumbnail: "/assets/gallery/video1.png",
      title: "Innovation Showcase - Startup Pitches",
      description:
        "Exciting showcase of innovative startups presenting their groundbreaking solutions, from fintech innovations to sustainable technology, demonstrating the entrepreneurial spirit driving economic growth.",
    },
  ]

  const openDialog = (video) => {
    setSelectedVideo(video)
  }

  const closeDialog = () => {
    setSelectedVideo(null)
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
        </div>
      </div>

      {/* Video Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group cursor-pointer bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              onClick={() => openDialog(video)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-[#29688A]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Video Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                  5:42
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
          ))}
        </div>
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

              {/* YouTube Video Iframe */}
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-t-2xl"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>1,234 views</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Published 2 weeks ago</span>
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
