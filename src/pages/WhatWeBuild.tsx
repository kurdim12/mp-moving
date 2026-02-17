import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/utils";
import { RevealGroup, Reveal, RevealDivider } from "@/components/RevealOnScroll";
import wwbBrand from "@/assets/wwb-brand.jpg";
import wwbPlatform from "@/assets/wwb-platform.jpg";
import wwbAi from "@/assets/wwb-ai.jpg";
import wwbPartnerships from "@/assets/wwb-partnerships.jpg";

const capabilities = [
  {
    title: "Brand Systems",
    path: "/what-we-build/brand-systems",
    image: wwbBrand,
    description: "Identity isn't decoration — it's architecture. We define positioning, build visual systems, and codify everything into rules that hold at any scale.",
    label: "01",
  },
  {
    title: "Product Platforms",
    path: "/what-we-build/product-platforms",
    image: wwbPlatform,
    description: "Websites, tools, and workflows designed as connected systems. Every component serves a decision. Every interface earns its place.",
    label: "02",
  },
  {
    title: "AI & Automation",
    path: "/what-we-build/ai-automation",
    image: wwbAi,
    description: "Applied selectively. We implement AI only where it removes friction, increases leverage, or fundamentally changes how work gets done.",
    label: "03",
  },
  {
    title: "Co-Build Partnerships",
    path: "/what-we-build/co-build",
    image: wwbPartnerships,
    description: "Long-term collaborations with shared ownership. We don't deliver and leave — we build ventures alongside founders who think in years, not quarters.",
    label: "04",
  },
];

const WhatWeBuild = () => {
  useDocumentTitle("What We Build — MP");
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        {/* Hero */}
        <RevealGroup className="max-w-6xl mx-auto px-6 md:px-12 pt-20 md:pt-32 pb-16 md:pb-24">
          <Reveal delay={0}>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">
              What We Build
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display-headline max-w-2xl">
              Four ways we create momentum.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="body-large max-w-lg mt-8">
              Each discipline exists to serve one goal: turning alignment into progress that compounds.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <RevealDivider delay={400} />
          </Reveal>
        </RevealGroup>

        {/* Capability blocks */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 pb-24 md:pb-32 space-y-0">
          {capabilities.map((cap, index) => (
            <CapabilityBlock key={cap.title} {...cap} index={index} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const CapabilityBlock = ({
  title,
  path,
  image,
  description,
  label,
  index,
}: {
  title: string;
  path: string;
  image: string;
  description: string;
  label: string;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <RevealGroup className="group" threshold={0.1}>
      <Reveal delay={0}>
        <RevealDivider delay={100} />
      </Reveal>
      <Link
        to={path}
        className="block py-10 md:py-16"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={cn(
          "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center",
          !isEven && "md:[direction:rtl]"
        )}>
          {/* Image */}
          <Reveal delay={150}>
            <div className="overflow-hidden rounded-lg aspect-[4/3] md:[direction:ltr]">
              <img
                src={image}
                alt={title}
                loading="lazy"
                className={cn(
                  "w-full h-full object-cover transition-transform duration-[4000ms] ease-out",
                  hovered ? "scale-105" : "scale-100"
                )}
              />
            </div>
          </Reveal>

          {/* Text */}
          <div className="md:[direction:ltr]">
            <Reveal delay={100}>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
                {label}
              </span>
            </Reveal>
            <Reveal delay={200}>
              <h2 className="section-headline mt-3 mb-5">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={300}>
              <p className="text-muted-foreground leading-relaxed max-w-md mb-6">
                {description}
              </p>
            </Reveal>
            <Reveal delay={400}>
              <span className={cn(
                "inline-flex items-center gap-2 text-sm font-medium text-foreground transition-all duration-300",
                hovered ? "gap-3" : "gap-2"
              )}>
                Explore
                <span className={cn(
                  "transition-transform duration-300",
                  hovered ? "translate-x-1" : ""
                )}>→</span>
              </span>
            </Reveal>
          </div>
        </div>
      </Link>
    </RevealGroup>
  );
};

export default WhatWeBuild;
