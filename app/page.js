
import About from "@/components/AboutSection";
import { Division } from "@/components/Division";
import { EventSponsors } from "@/components/event-sponsors";
import Footer from "@/components/Footer";
import {  Navbar } from "@/components/Nav";
import HeroSection from "@/components/Hero";
import { Initiatives } from "@/components/Initiatives";
import JoinusSection from "@/components/Joinus";
import Members from "@/components/Member";
import { StrategicPartners } from "@/components/strategic-partners";
import SupportedExibition from "@/components/SupportedExibition";



export default function Home() {
  return (
   <main>
    
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
