import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/utils";
import wwbBrand from "@/assets/wwb-brand.jpg";
import wwbPlatform from "@/assets/wwb-platform.jpg";
import wwbAi from "@/assets/wwb-ai.jpg";
import wwbPartnerships from "@/assets/wwb-partnerships.jpg";

const blocks = [
  { title: "Brand Systems", path: "/what-we-build/brand-systems", image: wwbBrand },
  { title: "Product Platforms", path: "/what-we-build/product-platforms", image: wwbPlatform },
  { title: "AI & Automation", path: "/what-we-build/ai-automation", image: wwbAi },
  { title: "Co-Build Partnerships", path: "/what-we-build/co-build", image: wwbPartnerships },
];

const WhatWeBuild = () => {
  useDocumentTitle("What We Build — MP");
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">What We Build</p>
          <h1 className="section-headline">Capabilities</h1>
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-12 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blocks.map((block) => (
              <GridBlock key={block.title} title={block.title} path={block.path} image={block.image} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const GridBlock = ({ title, path, image }: { title: string; path: string; image: string }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link to={path} className="block group" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
        <img src={image} alt={title} loading="lazy" className={cn("absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out", hovered ? "scale-110" : "scale-100")} />
        <div className={cn("absolute inset-0 transition-colors duration-500", hovered ? "bg-foreground/50" : "bg-foreground/30")} />
        <div className="absolute inset-0 flex items-end p-6 md:p-8">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight text-white font-body">{title}</h2>
            <span className={cn("text-sm text-white/80 transition-all duration-300", hovered ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0")}>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WhatWeBuild;
