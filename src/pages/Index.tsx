import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { VisualBreakFull } from "@/components/VisualBreak";
import WhatMPIsSection from "@/components/WhatMPIsSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import ServicesSection from "@/components/ServicesSection";
import VenturesSection from "@/components/VenturesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Visual assets
import visualArchitecture from "@/assets/visual-architecture-1.jpg";
import visualStructure from "@/assets/visual-structure-4.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        {/* First visual: after hero */}
        <VisualBreakFull 
          image={visualArchitecture} 
          alt="Architectural structure with geometric lines and natural light" 
        />
        
        <WhatMPIsSection />
        <HowWeWorkSection />
        
        {/* Second visual: before what we build */}
        <VisualBreakFull 
          image={visualStructure} 
          alt="Diagonal beams suggesting momentum and direction" 
        />
        
        <ServicesSection />
        <VenturesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
