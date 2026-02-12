import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import mpLogo from "@/assets/mp-logo.png";
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
  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Sticky nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={mpLogo} alt="MP Logo" className="h-6 md:h-8 w-auto" />
          </Link>
          <Link
            to="/#contact"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </nav>

      <main className="pt-14">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
            What We Build
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Capabilities
          </h1>
        </div>

        {/* Grid */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blocks.map((block) => (
              <GridBlock key={block.title} title={block.title} path={block.path} image={block.image} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const GridBlock = ({ title, path, image }: { title: string; path: string; image: string }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={path}
      className="block group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
        {/* Image with slow zoom */}
        <img
          src={image}
          alt={title}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out",
            hovered ? "scale-110" : "scale-100"
          )}
        />
        {/* Dark overlay */}
        <div className={cn(
          "absolute inset-0 transition-colors duration-500",
          hovered ? "bg-foreground/50" : "bg-foreground/30"
        )} />
        {/* Title */}
        <div className="absolute inset-0 flex items-end p-6 md:p-8">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-lg md:text-xl font-semibold tracking-tight text-white">
              {title}
            </h2>
            <span className={cn(
              "text-sm text-white/80 transition-all duration-300",
              hovered ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
            )}>
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WhatWeBuild;
