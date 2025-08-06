import HeroCarousel from "@/components/Hero";
import InfowithPatner from "@/components/Info-with-Patner";
import Header from "@/components/Nav";
import SMEChamberSection from "@/components/about";
import SMEInitiativesSection from "@/components/Sme-initaive";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function Home() {
  return (
   <main>
    <Header/>
    <HeroCarousel/>
    <SMEChamberSection/>
    <InfowithPatner/>
    <SMEInitiativesSection/>
    <Footer/>
   </main>
  );
}
