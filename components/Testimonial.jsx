import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function Testimonials() {
 const testimonials = [
  {
    quote:
      "For over three decades, SME Chamber of India has been a guiding force for entrepreneurs like me. Their constant support in business growth and global competitiveness has been invaluable.",
    name: "Rajesh Mehta",
    designation: "Founder, Mehta Exports",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
  },
  {
    quote:
      "The Chamber connected our company with reliable partners for technology transfer and joint ventures. This collaboration helped us expand into international markets smoothly.",
    name: "Anita Sharma",
    designation: "Managing Director, TechNova Industries",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
  },
  {
    quote:
      "Through SME Chamber’s networking events, I was able to interact with CEOs, investors, and policy makers. These connections opened doors to new opportunities in domestic and global trade.",
    name: "Suresh Patil",
    designation: "CEO, Global Agro Solutions",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop",
  },
  {
    quote:
      "The business promotional activities and training programs by SME Chamber have enhanced my team’s knowledge, improved productivity, and boosted our exports significantly.",
    name: "Priya Nair",
    designation: "Director, Nair Textiles Pvt. Ltd.",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop",
  },
  {
    quote:
      "SME Chamber is more than just an organisation – it’s a trusted partner that empowers SMEs with resources, branding, finance facilitation, and the right exposure to scale 10X.",
    name: "Arvind Kapoor",
    designation: "Chairman, Kapoor Engineering Works",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop",
  },
];

  return <AnimatedTestimonials testimonials={testimonials} />;
}
