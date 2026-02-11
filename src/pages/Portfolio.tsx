import { useState, useRef, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import CaseSpread from "@/components/portfolio/CaseSpread";
import { portfolioItems, categories, type PortfolioItem } from "@/components/portfolio/PortfolioData";

/* ─── Scroll reveal ─── */
function useScrollReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);
  return { ref, isVisible };
}

/* ─── Logo/wordmark cell ─── */
const LogoCell = ({
  item,
  index,
  onOpen,
}: {
  item: PortfolioItem;
  index: number;
  onOpen: (rect: DOMRect) => void;
}) => {
  const { ref, isVisible } = useScrollReveal(index * 60);
  const cellRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div
        ref={cellRef}
        onClick={() => {
          if (cellRef.current) onOpen(cellRef.current.getBoundingClientRect());
        }}
        className="group cursor-pointer text-center py-10 md:py-14 lg:py-16 px-4"
        style={{ cursor: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><text y='18' font-size='14'>↗</text></svg>\") 12 12, pointer" }}
      >
        {/* Wordmark */}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-foreground/80 group-hover:text-foreground transition-all duration-300 mb-3 leading-none">
          {item.name}
        </h3>

        {/* Descriptor */}
        <p className="text-[10px] md:text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground mb-2 relative inline-block">
          <span className="relative">
            {item.descriptor}
            <span className="absolute bottom-0 left-0 w-full h-px bg-foreground/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </span>
        </p>

        {/* Micro signal */}
        {item.microSignal && (
          <p className="text-[10px] tracking-[0.1em] text-muted-foreground/50 mt-1">
            {item.microSignal}
          </p>
        )}
      </div>
    </div>
  );
};

/* ─── Main portfolio page ─── */
const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expanded, setExpanded] = useState<{ item: PortfolioItem; rect: DOMRect } | null>(null);

  const filtered =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((i) => i.category === activeCategory);

  const handleOpen = useCallback((item: PortfolioItem, rect: DOMRect) => {
    setExpanded({ item, rect });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 md:pt-40 pb-16 md:pb-20">
          <div className="content-container">
            <div className="max-w-xl">
              <p className="fade-up text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-5">
                Selected Work
              </p>
              <h1 className="fade-up fade-up-delay-1 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-foreground mb-5">
                What we've built alongside the people we believe in.
              </h1>
              <p className="fade-up fade-up-delay-2 text-base md:text-lg leading-relaxed text-muted-foreground max-w-md">
                Each one chosen, not pitched.
              </p>
            </div>
          </div>
        </section>

        {/* Category filter */}
        <section className="pb-10 md:pb-14">
          <div className="content-container">
            <div className="flex flex-wrap gap-2 md:gap-3 fade-up fade-up-delay-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "text-[10px] md:text-[11px] font-medium tracking-[0.15em] uppercase px-4 py-2 transition-all duration-300",
                    activeCategory === cat
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Logo grid */}
        <section className="pb-24 md:pb-32">
          <div className="content-container">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((item, index) => (
                <LogoCell
                  key={item.name}
                  item={item}
                  index={index}
                  onOpen={(rect) => handleOpen(item, rect)}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-24 text-center">
                <p className="text-muted-foreground text-sm">
                  No projects in this category yet.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Bottom signal */}
        <section className="pb-24 md:pb-32">
          <div className="content-container">
            <div className="section-divider pt-16 md:pt-20">
              <p className="body-medium max-w-lg">
                We don't showcase everything we build. If you're curious about working together,{" "}
                <a
                  href="/#contact"
                  className="text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity"
                >
                  start a conversation
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Case spread overlay */}
      {expanded && (
        <CaseSpread
          item={expanded.item}
          originRect={expanded.rect}
          onClose={() => setExpanded(null)}
        />
      )}
    </div>
  );
};

export default Portfolio;
