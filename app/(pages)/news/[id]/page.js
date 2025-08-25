"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, User } from "lucide-react"
import { getClientPb } from "@/lib/pocketbase"
import { usePocketBaseFetchWithLoading } from "@/hooks/use-pocketbase-fetch"
import { RichTextRenderer } from "../components/rich-text-renderer"
import Image from "next/image"

export default function NewsDetailPage() {
  const params = useParams()
  const [article, setArticle] = useState(null)
  const [events, setEvents] = useState([])
  const [relatedNews, setRelatedNews] = useState([])
  const pb = getClientPb()

  const fetchData = async (signal) => {
    try {
      // Fetch the main article
      const articleRecord = await pb.collection("news").getOne(params.id, { signal })
      setArticle(articleRecord)

      // Fetch latest 3 events
      const eventsRecords = await pb.collection("forthcoming_events").getList(1, 3, {
        sort: "-eventDate",
        signal,
      })
      setEvents(eventsRecords.items)

      // Fetch related news (excluding current article)
      const relatedRecords = await pb.collection("news").getList(1, 4, {
        sort: "-created",
        filter: `id != "${params.id}"`,
        signal,
      })
      setRelatedNews(relatedRecords.items)
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching data:", error)
      }
    }
  }

  const isLoading = usePocketBaseFetchWithLoading(fetchData, [params.id])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatEventDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getImageUrl = (record, filename) => {
    if (!filename) return "/placeholder.svg?height=400&width=800"
    return pb.files.getUrl(record, filename)
  }

  const getEventImageUrl = (record, filename) => {
    if (!filename) return "/placeholder.svg?height=200&width=400"
    return pb.files.getUrl(record, filename)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        {/* Hero skeleton */}
        <div className="relative h-96 bg-muted animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-12 bg-muted rounded"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 ">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Link href="/news">
            <Button>Back to News</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        className="relative h-96 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0">
          <img
            src={getImageUrl(article, article.img) || "/images/news-hero-bg.png"}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="relative h-full flex items-end">
          <div className="container mx-auto  max-w-7xl px-4 pb-12">
            <motion.div
              className="max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.created)}</span>
                </div>
                {/* <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Admin</span>
                </div> */}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Back button overlay */}
        <div className="absolute top-6 left-6">
          <Link href="/news">
            <Button
              variant="secondary"
              size="sm"
              className="bg-neutral-900/30 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
                <div>
                    <Image
                        src={getImageUrl(article, article.img) || "/placeholder.svg"}
                        alt={article.title}
                        width={400}
                        height={400}
                        className=" mb-6 w-full max-w-4xl max-h-[500px] rounded-lg object-contain object-center"
                    />
                </div>
              <article className="bg-white rounded-lg shadow-sm border p-8">
                {/* Article metadata */}
              
                <div className="prose prose-lg max-w-none">
                  <RichTextRenderer content={article.content} />
                </div>
              </article>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {/* Latest News Section */}
              <section className="bg-white rounded-lg shadow-sm border p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    LATEST <span className="bg-[#29688A] text-white px-2 py-1 text-sm rounded-4xl">NEWS</span>
                  </h2>
                </div>
                    <hr className="my-4" />
                <div className="space-y-6 bg-[#29688A]/10 p-4 rounded">
                  {relatedNews.slice(0, 3).map((news) => (
                    <Link key={news.id} href={`/news/${news.id}`}>
                      <div className="group cursor-pointer mb-3 border-2 p-3 rounded-xl drop-shadow-sm bg-slate-50">
                        <h3 className="font-semibold text-sm line-clamp-3 text-gray-900 group-hover:text-[#29688A] transition-colors duration-200 mb-2 leading-tight">
                          {news.title}
                        </h3>
                        <Button variant="link" className="p-0 h-auto text-sm text-[#29688A] hover:text-[#29688A]">
                          READ MORE
                        </Button>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Upcoming Events Section */}
              <section className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 underline underline-offset-4  decoration-[#29688A]">UPCOMING EVENTS</h2>

                <div className="space-y-6">
                  {events.map((event) => (
                    <Link key={event.id} href={`/events/forthcoming-events/${event.id}`}>
                      <div className="group cursor-pointer border-2 p-3 rounded-xl drop-shadow-sm bg-slate-50 mb-3">
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#29688A] transition-colors duration-200 mb-2 line-clamp-2">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3" />
                          <span>{event.venue}</span>
                          <span>•</span>
                          <span>{formatEventDate(event.eventDate)}</span>
                        </div>
                        <Button variant="link" className="p-0 h-auto text-sm text-[#29688A] hover:text-[#29688A]">
                          READ MORE
                        </Button>
                      </div>
                    </Link>
                  ))}
                </div>

                {events.length === 0 && <p className="text-muted-foreground text-sm">No upcoming events</p>}
              </section>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
