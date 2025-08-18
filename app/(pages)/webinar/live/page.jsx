"use client"

import { useState } from "react"
import { Play, Calendar, Clock, Users, ExternalLink } from "lucide-react"

const liveWebinars = [
  {
    id: 1,
    title: "Digital Transformation for SMEs: Building Future-Ready Businesses",
    description:
      "Join industry experts as they discuss the latest trends in digital transformation and how SMEs can leverage technology to stay competitive in today's market.",
    youtubeUrl: "https://www.youtube.com/embed/cSmg3XpMza4",
    registrationUrl: "https://example.com/register/webinar-1",
    date: "2024-01-25",
    time: "2:00 PM IST",
    duration: "90 minutes",
    attendees: 1250,
    speaker: "Dr. Rajesh Kumar",
    speakerTitle: "Digital Strategy Consultant",
    isLive: true,
  },
  {
    id: 2,
    title: "Export Opportunities for Indian SMEs in Global Markets",
    description:
      "Discover new export opportunities and learn about government schemes that can help your SME expand internationally. Get insights from successful exporters.",
    youtubeUrl: "https://www.youtube.com/embed/cSmg3XpMza4",
    registrationUrl: "https://example.com/register/webinar-2",
    date: "2024-01-28",
    time: "3:30 PM IST",
    duration: "120 minutes",
    attendees: 890,
    speaker: "Ms. Priya Sharma",
    speakerTitle: "Export Promotion Specialist",
    isLive: false,
  },
  {
    id: 3,
    title: "Sustainable Manufacturing Practices for SMEs",
    description:
      "Learn about sustainable manufacturing practices that can reduce costs, improve efficiency, and meet environmental compliance requirements.",
    youtubeUrl: "https://www.youtube.com/embed/cSmg3XpMza4",
    registrationUrl: "https://example.com/register/webinar-3",
    date: "2024-02-02",
    time: "11:00 AM IST",
    duration: "75 minutes",
    attendees: 650,
    speaker: "Mr. Anil Gupta",
    speakerTitle: "Sustainability Expert",
    isLive: false,
  },
]

export default function LiveWebinarsPage() {
  const [selectedWebinar, setSelectedWebinar] = useState(null)

  return (
    <div className="min-h-screen bg-white">

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#29688A] mb-4">Live Webinars</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Join our live webinars to stay updated with the latest trends, insights, and opportunities for SMEs. Connect
            with industry experts and fellow entrepreneurs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Webinar List */}
          <div className="space-y-6">
            {liveWebinars.map((webinar) => (
              <div
                key={webinar.id}
                className={`bg-white border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedWebinar?.id === webinar.id
                    ? "border-[#29688A] shadow-lg"
                    : "border-gray-200 hover:border-[#29688A]"
                }`}
                onClick={() => setSelectedWebinar(webinar)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {webinar.isLive && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          LIVE
                        </span>
                      )}
                      <span className="bg-[#29688A] text-white text-xs px-2 py-1 rounded-full">Upcoming</span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#29688A] mb-2 line-clamp-2">{webinar.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{webinar.description}</p>
                  </div>
                  <Play className="w-8 h-8 text-[#29688A] ml-4 flex-shrink-0" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{webinar.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{webinar.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{webinar.attendees} registered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{webinar.duration}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Speaker:</span> {webinar.speaker}
                  </p>
                  <p className="text-sm text-gray-600">{webinar.speakerTitle}</p>
                </div>

                <div className="mt-4 flex gap-3">
                  <button className="flex-1 bg-[#29688A] text-white py-2 px-4 rounded-lg hover:bg-[#1e5a7a] transition-colors duration-200 text-sm font-medium">
                    {webinar.isLive ? "Join Live" : "Register Now"}
                  </button>
                  <a
                    href={webinar.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-[#29688A] text-[#29688A] rounded-lg hover:bg-[#29688A] hover:text-white transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Video Player */}
          <div className="lg:sticky lg:top-8">
            {selectedWebinar ? (
              <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src={selectedWebinar.youtubeUrl}
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
                    <span className="bg-[#29688A] text-white text-xs px-2 py-1 rounded-full">Upcoming</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#29688A] mb-3">{selectedWebinar.title}</h2>
                  <p className="text-gray-600 mb-4">{selectedWebinar.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedWebinar.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{selectedWebinar.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{selectedWebinar.attendees} registered</span>
                    </div>
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
                  <button className="w-full bg-[#29688A] text-white py-3 px-4 rounded-lg hover:bg-[#1e5a7a] transition-colors duration-200 font-medium">
                    {selectedWebinar.isLive ? "Join Live Webinar" : "Register for Webinar"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Webinar</h3>
                <p className="text-gray-500">Choose a webinar from the list to view details and watch the video</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
