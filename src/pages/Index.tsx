import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhatMPIsSection from "@/components/WhatMPIsSection";
import PhilosophySection from "@/components/PhilosophySection";
import ServicesSection from "@/components/ServicesSection";
import AboutMPSection from "@/components/AboutMPSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ParticleField from "@/components/ParticleField";
import StrideFigure from "@/components/StrideFigure";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ParticleField />
      <StrideFigure />
      <Header />
      <main className="relative z-10 flex flex-col items-center">
        <HeroSection />
        <WhatMPIsSection />
        <PhilosophySection />
        <ServicesSection />
        <AboutMPSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
