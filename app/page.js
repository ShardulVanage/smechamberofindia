
import About from "@/components/About";
import { Division } from "@/components/Division";
import { EventSponsors } from "@/components/event-sponsors";
import Footer from "@/components/Footer";
import { HeroHeader } from "@/components/header";
import HeroSection from "@/components/Hero";
import { Initiatives } from "@/components/Initiatives";
import JoinusSection from "@/components/Joinus";
import Members from "@/components/Member";
import { StrategicPartners } from "@/components/strategic-partners";
import SupportedExibition from "@/components/SupportedExibition";



export default function Home() {
  return (
   <main>
    <HeroHeader/>
    <HeroSection/>
    <StrategicPartners/>
    <EventSponsors/>
    <About/>
    <SupportedExibition/>
    <Members/>
    <JoinusSection/>
    <Initiatives/>
    <Division/>
    <Footer/>
   </main>
  );
}
