import Header from "@/components/Header";
import CinematicEngine from "@/components/CinematicEngine";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import AboutMPSection from "@/components/AboutMPSection";
import VenturesSection from "@/components/VenturesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <CinematicEngine />
      <div className="relative z-20 bg-background">
        <HowWeWorkSection />
        <AboutMPSection />
        <VenturesSection />
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
