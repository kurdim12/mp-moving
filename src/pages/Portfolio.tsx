import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { ArrowUpRight, X } from "lucide-react";
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

/* ─── Expanded full-screen panel ─── */
const ExpandedPanel = ({
  item,
  originRect,
  onClose,
}: {
  item: PortfolioItem;
  originRect: DOMRect;
  onClose: () => void;
}) => {
  const [phase, setPhase] = useState<"enter" | "visible" | "exit">("enter");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("visible"));
    });
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleClose = useCallback(() => {
    setPhase("exit");
    setTimeout(() => onClose(), 500);
  }, [onClose]);

  const scaleX = originRect.width / window.innerWidth;
  const scaleY = originRect.height / window.innerHeight;
  const translateX = originRect.left + originRect.width / 2 - window.innerWidth / 2;
  const translateY = originRect.top + originRect.height / 2 - window.innerHeight / 2;
  const enterTransform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className={cn(
          "absolute inset-0 bg-background transition-opacity duration-500",
          phase === "visible" ? "opacity-100" : "opacity-0"
        )}
        onClick={handleClose}
      />
      <div
        className="absolute inset-0 bg-background origin-center transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.15,1)] will-change-transform"
        style={{
          transform: phase === "visible" ? "translate(0,0) scale(1,1)" : enterTransform,
          opacity: phase === "exit" ? 0 : 1,
        }}
      >
        <div
          className={cn(
            "h-full overflow-y-auto transition-opacity duration-500 delay-200",
            phase === "visible" ? "opacity-100" : "opacity-0"
          )}
        >
          <button
            onClick={handleClose}
            className="fixed top-6 right-6 md:top-8 md:right-8 z-20 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero */}
          <div className="pt-20 md:pt-28 pb-12 md:pb-16">
            <div className="content-container">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
                <div>
                  <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
                    {item.category} · {item.year}
                  </span>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground leading-[0.95]">
                    {item.name}
                  </h2>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed md:text-right">
                  {item.tagline}
                </p>
              </div>
              <div className={cn("h-1 w-20 bg-gradient-to-r rounded-full", item.accentColor)} />
            </div>
          </div>

          {/* Visual block */}
          <div className="content-container pb-12 md:pb-16">
            <div className={cn("w-full h-44 md:h-64 lg:h-80 bg-gradient-to-br rounded-sm relative overflow-hidden", item.accentColor)}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[100px] md:text-[180px] lg:text-[240px] font-medium tracking-tight text-white/[0.06] leading-none select-none">
                  {item.initials}
                </span>
              </div>
              <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')]" />
            </div>
          </div>

          {/* Narrative: Challenge → Process → Outcome */}
          <div className="content-container pb-16 md:pb-24">
            <p className="text-lg md:text-xl leading-relaxed text-foreground/80 max-w-2xl mb-16 md:mb-20">
              {item.description}
            </p>

            <div className="mb-14 md:mb-18">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-6 flex items-center justify-center bg-foreground text-background text-[10px] font-medium rounded-sm">01</span>
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground">The Challenge</p>
              </div>
              <p className="text-base md:text-lg leading-relaxed text-foreground/70 max-w-2xl">{item.challenge}</p>
            </div>

            <div className="mb-14 md:mb-18">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-6 flex items-center justify-center bg-foreground text-background text-[10px] font-medium rounded-sm">02</span>
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground">The Process</p>
              </div>
              <p className="text-base md:text-lg leading-relaxed text-foreground/70 max-w-2xl">{item.process}</p>
            </div>

            <div className="mb-14 md:mb-18">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-6 flex items-center justify-center bg-foreground text-background text-[10px] font-medium rounded-sm">03</span>
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground">The Outcome</p>
              </div>
              <p className="text-base md:text-lg leading-relaxed text-foreground/70 max-w-2xl">{item.outcome}</p>
            </div>

            {item.stats && item.stats.length > 0 && (
              <div className="border-t border-border pt-10 mb-14">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {item.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-1.5">{stat.value}</p>
                      <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-10">
              {item.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-medium tracking-[0.15em] uppercase px-3 py-1.5 border border-border text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>

            <div className="border-t border-border pt-8 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Interested in building something like this?</p>
              <a href="/#contact" className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity flex items-center gap-2">
                Start a conversation <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Client row in the grid panel ─── */
const ClientRow = ({
  item,
  index,
  onOpen,
}: {
  item: PortfolioItem;
  index: number;
  onOpen: (rect: DOMRect) => void;
}) => {
  const cellRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={cellRef} className="group">
      <h4 className="text-base md:text-lg font-medium tracking-tight text-foreground mb-2 leading-tight">
        {item.name}
      </h4>
      <p className="text-xs md:text-sm leading-relaxed text-muted-foreground mb-3 line-clamp-3">
        {item.description}
      </p>
      <button
        onClick={() => {
          if (cellRef.current) onOpen(cellRef.current.getBoundingClientRect());
        }}
        className="text-xs font-medium text-foreground hover:opacity-60 transition-opacity inline-flex items-center gap-1 underline underline-offset-4"
      >
        View case study
      </button>
    </div>
  );
};

/* ─── Main page ─── */
const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expanded, setExpanded] = useState<{ item: PortfolioItem; rect: DOMRect } | null>(null);

  const filtered =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((i) => i.category === activeCategory);

  // Split into rows of 3
  const rows: PortfolioItem[][] = [];
  for (let i = 0; i < filtered.length; i += 3) {
    rows.push(filtered.slice(i, i + 3));
  }

  const handleOpen = useCallback((item: PortfolioItem, rect: DOMRect) => {
    setExpanded({ item, rect });
  }, []);

  const { ref: introRef, isVisible: introVisible } = useScrollReveal(0);
  const { ref: clientsRef, isVisible: clientsVisible } = useScrollReveal(100);
  const { ref: capRef, isVisible: capVisible } = useScrollReveal(0);
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal(100);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-28">
        {/* ─── Top bento row: Intro + Clients ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] min-h-[70vh]">
          {/* Left panel — Introduction */}
          <div
            ref={introRef}
            className={cn(
              "border-b border-r border-border p-8 md:p-12 lg:p-16 flex flex-col justify-between transition-all duration-700",
              introVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <div>
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
                Selected Work
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] text-foreground mb-6">
                What we've built alongside the people we believe in.
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-8 max-w-md">
                Selected partnerships and ventures. Each one chosen, not pitched.
              </p>
            </div>
            <div>
              <a
                href="/#contact"
                className="text-sm font-medium text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity"
              >
                Start a conversation
              </a>
            </div>
          </div>

          {/* Right panel — Select Projects */}
          <div
            ref={clientsRef}
            className={cn(
              "border-b border-border p-8 md:p-12 lg:p-16 transition-all duration-700",
              clientsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "text-[10px] md:text-[11px] font-medium tracking-[0.15em] uppercase px-3 py-1.5 transition-all duration-300",
                    activeCategory === cat
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Client grid — rows of 3 */}
            <div className="space-y-0">
              {rows.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className={cn(
                    "grid grid-cols-1 sm:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-6 py-6 md:py-8",
                    rowIdx > 0 && "border-t border-border"
                  )}
                >
                  {row.map((item, colIdx) => (
                    <ClientRow
                      key={item.name}
                      item={item}
                      index={rowIdx * 3 + colIdx}
                      onOpen={(rect) => handleOpen(item, rect)}
                    />
                  ))}
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="text-sm text-muted-foreground py-12 text-center">
                  No projects in this category yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ─── Bottom bento row: Capabilities + CTA ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Capabilities panel */}
          <div
            ref={capRef}
            className={cn(
              "border-b border-r border-border p-8 md:p-12 lg:p-16 transition-all duration-700",
              capVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
              What We Build
            </p>
            <div className="space-y-4">
              {[
                "Brand & Positioning",
                "Products, Platforms & Systems",
                "AI & Automation",
                "Partnership & Co-Building",
              ].map((cap) => (
                <p
                  key={cap}
                  className="text-xl md:text-2xl font-medium tracking-tight text-foreground leading-snug"
                >
                  {cap}
                </p>
              ))}
            </div>
          </div>

          {/* CTA / signal panel */}
          <div
            ref={ctaRef}
            className={cn(
              "border-b border-border p-8 md:p-12 lg:p-16 flex flex-col justify-between transition-all duration-700",
              ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
              Outcomes
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { value: "40+", label: "Firms served" },
                { value: "$40M", label: "Capital raised" },
                { value: "200+", label: "Workers connected" },
                { value: "80%", label: "Tasks automated" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-base leading-relaxed text-muted-foreground max-w-sm">
              We don't showcase everything we build. If you're curious,{" "}
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
      </main>
      <Footer />

      {expanded && (
        <ExpandedPanel
          item={expanded.item}
          originRect={expanded.rect}
          onClose={() => setExpanded(null)}
        />
      )}
    </div>
  );
};

export default Portfolio;
