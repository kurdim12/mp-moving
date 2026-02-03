import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VisualBreak from "@/components/VisualBreak";
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

// Import visual assets
import visualArchitecture from "@/assets/visual-architecture-1.jpg";
import visualLines from "@/assets/visual-lines-2.jpg";
import visualLight from "@/assets/visual-light-3.jpg";
import visualStructure from "@/assets/visual-structure-4.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        <VisualBreak 
          image={visualArchitecture} 
          alt="Abstract architectural structure with geometric lines and natural light" 
          size="large"
        />
        
        <ProblemSection />
        <AgitationSection />
        
        <VisualBreak 
          image={visualLines} 
          alt="Minimal grid pattern suggesting structure and systems" 
          size="small"
        />
        
        <SolutionSection />
        <WhoWeWorkWithSection />
        
        <ServicesSection />
        
        <VisualBreak 
          image={visualLight} 
          alt="Architectural interior with soft natural light creating calm space" 
          size="medium"
        />
        
        <DigitalPresenceSection />
        <EngagementSection />
        
        <VisualBreak 
          image={visualStructure} 
          alt="Diagonal concrete beams suggesting momentum and direction" 
          size="medium"
        />
        
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
