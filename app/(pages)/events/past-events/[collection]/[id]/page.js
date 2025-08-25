"use client"

import { useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, ExternalLink, ArrowLeft } from "lucide-react"
import { getClientPb } from "@/lib/pocketbase"
import { usePocketBaseFetchWithLoading } from "@/hooks/use-pocketbase-fetch"


export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState(null)
  const [error, setError] = useState(null)

  const fetchEventDetail = useCallback(
    async (signal) => {
      try {
        const pb = getClientPb()
        const collection = params.collection 
        const id = params.id 

        if (!collection || !id) {
          setError("Invalid event parameters")
          return
        }

        const eventData = await pb.collection(collection).getOne(id, { signal })
        setEvent(eventData )
        setError(null)
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching event detail:", error)
          setError("Failed to load event details")
        }
      }
    },
    [params.collection, params.id],
  )

  const isLoading = usePocketBaseFetchWithLoading(fetchEventDetail, [params.collection, params.id])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getImageUrl = (event, imageField) => {
    if (!event[imageField]) return "/vibrant-event-banner.png"
    const pb = getClientPb()
    return pb.files.getUrl(event, event[imageField])
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#29688A]"></div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "The requested event could not be found."}</p>
          <Button onClick={() => router.back()} className="bg-[#29688A] hover:bg-[#1e4f6b]">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-[#29688A] text-[#29688A] hover:bg-[#29688A] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Past Events
          </Button>
        </div>

        {/* Event Detail Card */}
        <Card className="overflow-hidden">
          {/* Hero Image */}
          <div className="aspect-[21/9] relative overflow-hidden">
            <img
              src={getImageUrl(event, "bannerImageScreen") || getImageUrl(event, "bannerImageFront")}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-[#29688A] text-white">
                {event.collectionName === "supported_exhibitions" ? "Exhibition" : "Event"}
              </Badge>
            </div>
          </div>

          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-bold text-[#29688A] mb-4">{event.title}</CardTitle>

            {/* Event Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-5 w-5 text-[#29688A]" />
                <div>
                  <div className="font-medium">Date</div>
                  <div>{formatDate(event.eventDate)}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5 text-[#29688A]" />
                <div>
                  <div className="font-medium">Time</div>
                  <div>{event.timeOnward}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5 text-[#29688A]" />
                <div>
                  <div className="font-medium">Venue</div>
                  <div>{event.venue}</div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold text-[#29688A] mb-3">About This Event</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{event.description}</p>
            </div>

            {/* Additional Images */}
            {event.bannerImageFront &&
              event.bannerImageScreen &&
              event.bannerImageFront !== event.bannerImageScreen && (
                <div>
                  <h3 className="text-xl font-semibold text-[#29688A] mb-3">Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <img
                      src={getImageUrl(event, "bannerImageFront") || "/placeholder.svg"}
                      alt={`${event.title} - Front Banner`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <img
                      src={getImageUrl(event, "bannerImageScreen") || "/placeholder.svg"}
                      alt={`${event.title} - Screen Banner`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                </div>
              )}

            {/* Registration Link */}
            {event.registrationLink && (
              <div>
                <h3 className="text-xl font-semibold text-[#29688A] mb-3">More Information</h3>
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#29688A] hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit Event Page
                </a>
              </div>
            )}

            {/* Event Metadata */}
            <div className="border-t pt-6 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                <div>
                  <span className="font-medium">Event Type:</span>{" "}
                  {event.collectionName === "supported_exhibitions" ? "Supported Exhibition" : "Forthcoming Event"}
                </div>
                <div>
                  <span className="font-medium">Created:</span> {formatDate(event.created)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
