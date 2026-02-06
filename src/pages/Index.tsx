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
import visualLightSpace from "@/assets/visual-light-space.jpg";
import visualFramework from "@/assets/visual-framework.jpg";
import visualThreshold from "@/assets/visual-threshold.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        {/* After hero: architectural structure */}
        <VisualBreakFull 
          image={visualArchitecture} 
          alt="Architectural structure with geometric lines and natural light" 
        />
        
        <WhatMPIsSection />
        
        {/* After what MP is: light and clarity */}
        <VisualBreakFull 
          image={visualLightSpace} 
          alt="Concrete interior space with dramatic natural light" 
        />
        
        <HowWeWorkSection />
        
        {/* Before what we build: framework/scaffolding */}
        <VisualBreakFull 
          image={visualFramework} 
          alt="Steel scaffolding structure suggesting building and systems" 
        />
        
        <ServicesSection />
        <VenturesSection />
        
        {/* Before contact: threshold/doorway */}
        <VisualBreakFull 
          image={visualThreshold} 
          alt="Open doorway with soft light suggesting conversation" 
        />
        
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
