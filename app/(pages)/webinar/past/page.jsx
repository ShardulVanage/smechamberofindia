"use client"

import { useState } from "react"
import { Play, Calendar, Clock, Users, Eye, Download } from "lucide-react"

const pastWebinars = [
  {
    id: 1,
    title: "Financial Planning and Investment Strategies for SMEs",
    description:
      "A comprehensive session on financial planning, investment opportunities, and funding options available for small and medium enterprises in India.",
    youtubeUrl: "https://www.youtube.com/embed/cSmg3XpMza4",
    recordingUrl: "https://example.com/recording/webinar-1",
    date: "2024-01-15",
    time: "2:00 PM IST",
    duration: "105 minutes",
    attendees: 1850,
    views: 3200,
    speaker: "CA Suresh Patel",
    speakerTitle: "Financial Advisor & Tax Consultant",
    category: "Finance",
  },
  {
    id: 2,
    title: "Digital Marketing Strategies for SME Growth",
    description:
      "Learn effective digital marketing techniques, social media strategies, and online branding tips to grow your SME business in the digital age.",
    youtubeUrl: "https://www.youtube.com/embed/cSmg3XpMza4",
    recordingUrl: "https://example.com/recording/webinar-2",
    date: "2024-01-08",
    time: "3:30 PM IST",
    duration: "90 minutes",
    attendees: 2100,
    views: 4500,
    speaker: "Ms. Neha Agarwal",
    speakerTitle: "Digital Marketing Expert",
    category: "Marketing",
  },
  {
    id: 3,
    title: "Government Schemes and Subsidies for SMEs",
    description:
      "Detailed overview of various government schemes, subsidies, and support programs available for SMEs, including application processes and eligibility criteria.",
    youtubeUrl: "https://www.youtube.com/embed/cSmg3XpMza4",
    recordingUrl: "https://example.com/recording/webinar-3",
    date: "2023-12-20",
    time: "11:00 AM IST",
    duration: "120 minutes",
    attendees: 2800,
    views: 5100,
    speaker: "Mr. Vikram Singh",
    speakerTitle: "Policy Advisor, Ministry of MSME",
    category: "Government",
  },
  {
    id: 4,
    title: "Technology Adoption in Manufacturing SMEs",
    description:
      "Explore how manufacturing SMEs can adopt new technologies like IoT, automation, and AI to improve productivity and reduce costs.",
    youtubeUrl: "https://www.youtube.com/embed/cSmg3XpMza4",
    recordingUrl: "https://example.com/recording/webinar-4",
    date: "2023-12-12",
    time: "4:00 PM IST",
    duration: "95 minutes",
    attendees: 1650,
    views: 2900,
    speaker: "Dr. Amit Khanna",
    speakerTitle: "Technology Consultant",
    category: "Technology",
  },
  {
    id: 5,
    title: "Building Strong Supply Chain Networks for SMEs",
    description:
      "Learn strategies to build resilient supply chains, manage vendor relationships, and optimize logistics for better business efficiency.",
    youtubeUrl: "https://www.youtube.com/embed/cSmg3XpMza4",
    recordingUrl: "https://example.com/recording/webinar-5",
    date: "2023-11-28",
    time: "1:30 PM IST",
    duration: "85 minutes",
    attendees: 1400,
    views: 2200,
    speaker: "Ms. Ritu Malhotra",
    speakerTitle: "Supply Chain Expert",
    category: "Operations",
  },
  {
    id: 6,
    title: "HR Management and Employee Retention in SMEs",
    description:
      "Best practices for human resource management, employee engagement strategies, and retention techniques specifically designed for small businesses.",
    youtubeUrl: "https://www.youtube.com/embed/cSmg3XpMza4",
    recordingUrl: "https://example.com/recording/webinar-6",
    date: "2023-11-15",
    time: "2:30 PM IST",
    duration: "100 minutes",
    attendees: 1950,
    views: 3800,
    speaker: "Mr. Rohit Sharma",
    speakerTitle: "HR Consultant",
    category: "Human Resources",
  },
]

const categories = ["All", "Finance", "Marketing", "Government", "Technology", "Operations", "Human Resources"]

export default function PastWebinarsPage() {
  const [selectedWebinar, setSelectedWebinar] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredWebinars = pastWebinars.filter((webinar) => {
    const matchesCategory = selectedCategory === "All" || webinar.category === selectedCategory
    const matchesSearch =
      webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      webinar.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      webinar.speaker.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white">

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#29688A] mb-4">Past Webinars</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Access our library of past webinars covering various topics relevant to SME growth and development. Learn
            from industry experts at your own pace.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search webinars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#29688A] focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Webinar List */}
          <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2">
            {filteredWebinars.map((webinar) => (
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
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {webinar.category}
                      </span>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Recorded</span>
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
                    <span>{webinar.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{webinar.attendees} attended</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{webinar.views} views</span>
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
                    Watch Recording
                  </button>
                  <a
                    href={webinar.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-[#29688A] text-[#29688A] rounded-lg hover:bg-[#29688A] hover:text-white transition-colors duration-200"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}

            {filteredWebinars.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No webinars found matching your criteria.</p>
              </div>
            )}
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
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {selectedWebinar.category}
                    </span>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Recorded</span>
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
                      <span>{selectedWebinar.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{selectedWebinar.attendees} attended</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{selectedWebinar.views} views</span>
                    </div>
                  </div>
                  <div className="border-t pt-4 mb-4">
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-medium">Speaker:</span> {selectedWebinar.speaker}
                    </p>
                    <p className="text-sm text-gray-600">{selectedWebinar.speakerTitle}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-[#29688A] text-white py-3 px-4 rounded-lg hover:bg-[#1e5a7a] transition-colors duration-200 font-medium">
                      Watch Full Recording
                    </button>
                    <a
                      href={selectedWebinar.recordingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-[#29688A] text-[#29688A] rounded-lg hover:bg-[#29688A] hover:text-white transition-colors duration-200"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Webinar</h3>
                <p className="text-gray-500">Choose a webinar from the list to watch the recording</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
