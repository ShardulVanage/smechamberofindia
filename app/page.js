
import About from "@/components/AboutSection";
import { Division } from "@/components/Division";
import { EventSponsors } from "@/components/event-sponsors";

import HeroSection from "@/components/Hero";
import { Initiatives } from "@/components/Initiatives";
import JoinusSection from "@/components/Joinus";
import Members from "@/components/Member";
import Service from "@/components/Service";
import { StrategicPartners } from "@/components/strategic-partners";
import SupportedExibition from "@/components/SupportedExibition";
import { Testimonials } from "@/components/Testimonial";




export default function Home() {
  return (
   <main>
    <HeroSection/>
    <Service/>
    <StrategicPartners/>
    <EventSponsors/>
    <About/>
    <SupportedExibition/>
    <Members/>
    <JoinusSection/>
    <Initiatives/>
    <Division/>
    
    {/* <Testimonials/> */}

   </main>
  );
}
