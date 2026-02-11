import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import mpLogo from "@/assets/mp-logo.png";

const blocks = [
  { title: "Brand Systems", path: "/what-we-build/brand-systems" },
  { title: "Product Platforms", path: "/what-we-build/product-platforms" },
  { title: "AI & Automation", path: "/what-we-build/ai-automation" },
  { title: "Co-Build Partnerships", path: "/what-we-build/co-build" },
];

const WhatWeBuild = () => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Sticky nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={mpLogo} alt="MP Logo" className="h-6 md:h-8 w-auto" />
          </Link>
          <Link
            to="/#contact"
            className="text-sm font-medium text-neutral-400 hover:text-black transition-colors duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </nav>

      <main className="pt-14">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-400 mb-4">
            What We Build
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black">
            Capabilities
          </h1>
        </div>

        {/* Grid */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {blocks.map((block) => (
              <GridBlock key={block.title} title={block.title} path={block.path} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const GridBlock = ({ title, path }: { title: string; path: string }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={path}
      className="block group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          "relative min-h-[240px] md:min-h-[320px] p-8 md:p-10 transition-colors duration-200 ease-out",
          hovered ? "bg-neutral-50" : "bg-white"
        )}
      >
        {/* Animated top border */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-px bg-black origin-left transition-transform duration-[350ms] ease-out",
            hovered ? "scale-x-100" : "scale-x-100"
          )}
        />
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-px bg-black origin-left transition-transform duration-[350ms] ease-out",
            "scale-x-100"
          )}
          style={{ opacity: 0.15 }}
        />
        {/* Hover border overlay */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-px bg-black origin-left transition-transform duration-[350ms] ease-out",
            hovered ? "scale-x-100" : "scale-x-0"
          )}
        />

        <h2 className="text-lg md:text-xl font-semibold tracking-tight text-black">
          {title}
        </h2>

        {/* Arrow indicator */}
        <span
          className={cn(
            "absolute bottom-8 right-8 md:bottom-10 md:right-10 text-sm text-neutral-300 transition-all duration-200 ease-out",
            hovered ? "text-black translate-x-0 opacity-100" : "opacity-0 -translate-x-2"
          )}
        >
          →
        </span>
      </div>
    </Link>
  );
};

export default WhatWeBuild;
