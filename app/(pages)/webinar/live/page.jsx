"use client"

import { useState } from "react"
import { Play, Calendar, Clock, Users, ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react"
import { getClientPb } from "@/lib/pocketbase"
import { usePocketBaseFetchWithLoading } from "@/hooks/use-pocketbase-fetch"
import Link from "next/link"
const WEBINARS_PER_PAGE = 8

const convertToEmbedUrl = (url) => {
  if (!url) return ""

  // Extract video ID from various YouTube URL formats
  const regex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
  const match = url.match(regex)

  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`
  }

  return url // Return original URL if no match found
}

export default function LiveWebinarsPage() {
  const [webinars, setWebinars] = useState([])
  const [selectedWebinar, setSelectedWebinar] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [categories, setCategories] = useState(["All"])
  const [isVideoPlayerVisible, setIsVideoPlayerVisible] = useState(true)

  const isLoading = usePocketBaseFetchWithLoading(
    async (signal) => {
      try {
        const pb = getClientPb()

        const today = new Date().toISOString().split("T")[0] // Get today's date in YYYY-MM-DD format
        let filter = `date >= "${today}"`

        if (selectedCategory !== "All") {
          filter += ` && category = "${selectedCategory}"`
        }

        if (searchTerm) {
          filter += ` && (title ~ "${searchTerm}" || description ~ "${searchTerm}" || speaker ~ "${searchTerm}")`
        }

        const result = await pb.collection("Webinars").getList(currentPage, WEBINARS_PER_PAGE, {
          filter: filter,
          sort: "-date",
          signal,
        })

        setWebinars(result.items)
        setTotalPages(result.totalPages)

        const allWebinars = await pb.collection("Webinars").getFullList({
          filter: `date >= "${today}"`,
          signal,
        })
        const uniqueCategories = ["All", ...new Set(allWebinars.map((w) => w.category).filter(Boolean))]
        setCategories(uniqueCategories)

        // Auto-select first webinar if none selected
        if (!selectedWebinar && result.items.length > 0) {
          setSelectedWebinar(result.items[0])
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching webinars:", error)
        }
      }
    },
    [currentPage, searchTerm, selectedCategory],
  )

  const handleWebinarSelect = (webinar) => {
    setSelectedWebinar(webinar)
    setIsVideoPlayerVisible(true)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    setSelectedWebinar(null) // Reset selection when changing pages
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#29688A] mb-4">Live Webinars</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Join our live webinars to stay updated with the latest trends, insights, and opportunities for SMEs.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search webinars..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1) // Reset to first page on search
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29688A] focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setIsVideoPlayerVisible(!isVideoPlayerVisible)}
              className="flex items-center gap-2 px-4 py-2 bg-[#29688A] text-white rounded-lg hover:bg-[#1e5a7a] transition-colors duration-200"
            >
              {isVideoPlayerVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {isVideoPlayerVisible ? "Hide Player" : "Show Player"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentPage(1) // Reset to first page on filter change
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? "bg-[#29688A] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {isVideoPlayerVisible && (
          <div id="video-player" className="mb-8">
            {selectedWebinar ? (
              <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden shadow-lg">
                <div className="aspect-video">
                  <iframe
                    src={convertToEmbedUrl(selectedWebinar.youtubeUrl)}
                    title={selectedWebinar.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {selectedWebinar.isLive && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        LIVE
                      </span>
                    )}
                    <span className="bg-[#29688A] text-white text-xs px-2 py-1 rounded-full">
                      {selectedWebinar.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#29688A] mb-3">{selectedWebinar.title}</h2>
                  <p className="text-gray-600 mb-4">{selectedWebinar.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(selectedWebinar.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{selectedWebinar.time}</span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{selectedWebinar.attendees} registered</span>
                    </div> */}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{selectedWebinar.duration}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-medium">Speaker:</span> {selectedWebinar.speaker}
                    </p>
                    <p className="text-sm text-gray-600">{selectedWebinar.speakerTitle}</p>
                  </div>
                    <Link href={selectedWebinar.isLive ? selectedWebinar.youtubeUrl : selectedWebinar.registrationLink} target="_blank" rel="noopener noreferrer">
                    <button className="w-full bg-[#29688A] text-white py-3 px-4 rounded-lg hover:bg-[#1e5a7a] transition-colors duration-200 font-medium">
                      {selectedWebinar.isLive ? "Join Live Webinar" : "Register for Webinar"}
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Webinar</h3>
                <p className="text-gray-500">Choose a webinar from the grid below to view details and watch</p>
              </div>
            )}
          </div>
        )}

        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#29688A] mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading webinars...</p>
          </div>
        )}

        {!isLoading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {webinars.map((webinar) => (
                <div
                  key={webinar.id}
                  className={`bg-white border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedWebinar?.id === webinar.id
                      ? "border-[#29688A] shadow-lg ring-2 ring-[#29688A] ring-opacity-20"
                      : "border-gray-200 hover:border-[#29688A]"
                  }`}
                  onClick={() => handleWebinarSelect(webinar)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-2">
                        {webinar.isLive && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                            LIVE
                          </span>
                        )}
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {webinar.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#29688A] mb-2 line-clamp-2">{webinar.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{webinar.description}</p>
                    </div>
                    <Play className="w-6 h-6 text-[#29688A] ml-2 flex-shrink-0" />
                  </div>

                  <div className="space-y-2 text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(webinar.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{webinar.time}</span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <Users className="w-3 h-3" />
                      <span>{webinar.attendees} registered</span>
                    </div> */}
                  </div>

                  <div className="border-t pt-3 mb-3">
                    <p className="text-xs text-gray-700 mb-1">
                      <span className="font-medium">Speaker:</span> {webinar.speaker}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-1">{webinar.speakerTitle}</p>
                  </div>
                   <Link href={webinar.isLive ? webinar.youtubeUrl : webinar.registrationLink} target="_blank" rel="noopener noreferrer">       
                  <button className="w-full bg-[#29688A] text-white py-2 px-3 rounded-lg hover:bg-[#1e5a7a] transition-colors duration-200 text-sm font-medium">
                    {webinar.isLive ? "Join Live" : "Register"}
                  </button>
                  </Link>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-lg ${
                        currentPage === page ? "bg-[#29688A] text-white" : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {webinars.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No live webinars found matching your criteria.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
