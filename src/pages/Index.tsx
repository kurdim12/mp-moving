import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { VisualBreakFull } from "@/components/VisualBreak";
import WhatMPIsSection from "@/components/WhatMPIsSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import ServicesSection from "@/components/ServicesSection";
import AboutMPSection from "@/components/AboutMPSection";
import VenturesSection from "@/components/VenturesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

import visualFlow2 from "@/assets/visual-flow-2.jpg";
import visualFlow4 from "@/assets/visual-flow-4.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex flex-col items-center">
        <HeroSection />
        <WhatMPIsSection />

        {/* Visual pause — transition from philosophy to method */}
        <VisualBreakFull
          image={visualFlow2}
          alt="Flowing water over dark stone — momentum in motion"
        />

        <HowWeWorkSection />
        <ServicesSection />

        {/* Visual pause — transition from services to identity */}
        <VisualBreakFull
          image={visualFlow4}
          alt="Water carving through volcanic rock — structure creates direction"
        />

        <AboutMPSection />
        <VenturesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
