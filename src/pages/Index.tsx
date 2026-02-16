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
import visualFlow3 from "@/assets/visual-flow-3.jpg";
import visualFlow4 from "@/assets/visual-flow-4.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex flex-col items-center">
        <HeroSection />
        
        <WhatMPIsSection />
        
        <VisualBreakFull 
          image={visualFlow2} 
          alt="Silky flowing water over dark rocks" 
        />
        
        <HowWeWorkSection />
        
        <VisualBreakFull 
          image={visualFlow3} 
          alt="Glacial ice and water landscape with soft mist" 
        />
        
        <ServicesSection />
        <AboutMPSection />
        <VenturesSection />
        
        <VisualBreakFull 
          image={visualFlow4} 
          alt="Flowing water carving a path through volcanic rock" 
        />
        
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
