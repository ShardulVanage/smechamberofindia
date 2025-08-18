const eventsData = [
  // Forthcoming Events
  {
    id: 1,
    title: "Digital Marketing Summit 2024",
    description:
      "Join industry leaders and marketing professionals for an intensive summit covering the latest trends in digital marketing, social media strategies, and customer engagement techniques.",
    eventDate: "March 15, 2024",
    timeOnward: "9:00 AM onwards",
    venue: "Mumbai Convention Center, Bandra Kurla Complex",
    registrationLink: "https://example.com/register/digital-marketing-summit",
    bannerImage: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "SME Growth Conference",
    description:
      "A comprehensive conference focused on small and medium enterprise growth strategies, funding opportunities, and scaling business operations in the modern economy.",
    eventDate: "April 22, 2024",
    timeOnward: "10:00 AM onwards",
    venue: "Delhi International Convention Centre",
    registrationLink: "https://example.com/register/sme-growth",
    bannerImage: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Tech Innovation Expo",
    description:
      "Explore cutting-edge technologies, meet innovative startups, and discover the future of business technology at this premier technology exposition.",
    eventDate: "May 10, 2024",
    timeOnward: "11:00 AM onwards",
    venue: "Bangalore International Exhibition Centre",
    registrationLink: "https://example.com/register/tech-expo",
    bannerImage: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // Past Events 2023
  {
    id: 4,
    title: "Annual Business Excellence Awards 2023",
    description:
      "Celebrating outstanding achievements in business excellence, innovation, and entrepreneurship across various industries.",
    eventDate: "December 15, 2023",
    timeOnward: "7:00 PM onwards",
    venue: "Grand Ballroom, The Taj Mahal Hotel, Mumbai",
    registrationLink: "https://example.com/register/awards-2023",
    bannerImage: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    year: 2023,
  },
  {
    id: 5,
    title: "Export-Import Trade Summit 2023",
    description:
      "A comprehensive summit focusing on international trade opportunities, export strategies, and import regulations for Indian businesses.",
    eventDate: "October 28, 2023",
    timeOnward: "9:30 AM onwards",
    venue: "India Expo Centre, Greater Noida",
    registrationLink: "https://example.com/register/trade-summit-2023",
    bannerImage: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    year: 2023,
  },
  {
    id: 6,
    title: "Manufacturing Excellence Workshop 2023",
    description:
      "Intensive workshop on lean manufacturing, quality control, and operational efficiency for manufacturing sector professionals.",
    eventDate: "September 12, 2023",
    timeOnward: "10:00 AM onwards",
    venue: "Pune International Centre",
    registrationLink: "https://example.com/register/manufacturing-2023",
    bannerImage: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    year: 2023,
  },

  // Past Events 2022
  {
    id: 7,
    title: "Digital Transformation Conference 2022",
    description:
      "Exploring digital transformation strategies, cloud adoption, and technology integration for traditional businesses.",
    eventDate: "November 20, 2022",
    timeOnward: "9:00 AM onwards",
    venue: "Hyderabad International Convention Centre",
    registrationLink: "https://example.com/register/digital-transformation-2022",
    bannerImage: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    year: 2022,
  },
  {
    id: 8,
    title: "Startup Funding Conclave 2022",
    description:
      "Connecting startups with investors, venture capitalists, and funding opportunities in the Indian startup ecosystem.",
    eventDate: "August 15, 2022",
    timeOnward: "11:00 AM onwards",
    venue: "Chennai Trade Centre",
    registrationLink: "https://example.com/register/startup-funding-2022",
    bannerImage: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    year: 2022,
  },
  {
    id: 9,
    title: "Sustainable Business Practices Summit 2022",
    description:
      "Focusing on environmental sustainability, green business practices, and corporate social responsibility initiatives.",
    eventDate: "June 25, 2022", 
    timeOnward: "10:30 AM onwards",
    venue: "Kolkata Information Technology Park",
    registrationLink: "https://example.com/register/sustainability-2022",
    bannerImage: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    year: 2022,
  },

  // Past Events 2021
  {
    id: 10,
    title: "Post-Pandemic Business Recovery Forum 2021",
    description:
      "Strategies for business recovery, adaptation to new market conditions, and building resilience in uncertain times.",
    eventDate: "September 30, 2021",
    timeOnward: "2:00 PM onwards",
    venue: "Virtual Event Platform",
    registrationLink: "https://example.com/register/recovery-forum-2021",
    bannerImage: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    year: 2021,
  },
  {
    id: 11,
    title: "E-commerce Growth Strategies 2021",
    description:
      "Comprehensive guide to e-commerce success, online marketing, and digital sales strategies in the post-COVID era.",
    eventDate: "July 18, 2021",
    timeOnward: "3:00 PM onwards",
    venue: "Virtual Event Platform",
    registrationLink: "https://example.com/register/ecommerce-2021",
    bannerImage: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    year: 2021,
  },
]

export { eventsData }
