import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhatMPIsSection from "@/components/WhatMPIsSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import ServicesSection from "@/components/ServicesSection";
import AboutMPSection from "@/components/AboutMPSection";
import VenturesSection from "@/components/VenturesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex flex-col items-center">
        <HeroSection />
        <WhatMPIsSection />
        <HowWeWorkSection />
        <ServicesSection />
        <AboutMPSection />
        <VenturesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
