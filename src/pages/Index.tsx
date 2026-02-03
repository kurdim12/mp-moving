import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { VisualBreakFull } from "@/components/VisualBreak";
import ProblemSection from "@/components/ProblemSection";
import AgitationSection from "@/components/AgitationSection";
import SolutionSection from "@/components/SolutionSection";
import WhoWeWorkWithSection from "@/components/WhoWeWorkWithSection";
import ServicesSection from "@/components/ServicesSection";
import DigitalPresenceSection from "@/components/DigitalPresenceSection";
import EngagementSection from "@/components/EngagementSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import VenturesSection from "@/components/VenturesSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Visual assets - reduced to two key images
import visualArchitecture from "@/assets/visual-architecture-1.jpg";
import visualStructure from "@/assets/visual-structure-4.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        {/* First visual: after hero, before the problem */}
        <VisualBreakFull 
          image={visualArchitecture} 
          alt="Architectural structure with geometric lines and natural light" 
        />
        
        <ProblemSection />
        <AgitationSection />
        <SolutionSection />
        
        <WhoWeWorkWithSection />
        
        <ServicesSection />
        
        {/* Second visual: before engagement/process */}
        <VisualBreakFull 
          image={visualStructure} 
          alt="Diagonal beams suggesting momentum and direction" 
        />
        
        <DigitalPresenceSection />
        <EngagementSection />
        <HowWeWorkSection />
        
        <VenturesSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
