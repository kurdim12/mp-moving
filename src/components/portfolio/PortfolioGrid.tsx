import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, X } from "lucide-react";
import type { PortfolioItem } from "./PortfolioData";

interface PortfolioGridProps {
  items: PortfolioItem[];
}

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

/* ─── Single grid cell ─── */
const GridCell = ({
  item,
  index,
  onOpen,
}: {
  item: PortfolioItem;
  index: number;
  onOpen: (rect: DOMRect) => void;
}) => {
  const { ref, isVisible } = useScrollReveal(index * 50);
  const cellRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (cellRef.current) {
      onOpen(cellRef.current.getBoundingClientRect());
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
    >
      <div
        ref={cellRef}
        onClick={handleClick}
        className="group cursor-pointer border border-border p-6 md:p-8 flex flex-col justify-between h-full min-h-[220px] md:min-h-[260px] transition-colors duration-400 hover:bg-foreground hover:border-foreground"
      >
        <div>
          <h3 className="text-lg md:text-xl font-medium tracking-tight text-foreground group-hover:text-background transition-colors duration-400 mb-3 leading-tight">
            {item.name}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-background/60 transition-colors duration-400 line-clamp-3">
            {item.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-6">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground group-hover:text-background/40 transition-colors duration-400">
            {item.category}
          </span>
          <span className="text-xs font-medium text-foreground group-hover:text-background transition-colors duration-400 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-400">
            View case study
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── Full-viewport expanded panel ─── */
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
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    // Trigger enter → visible
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("visible"));
    });
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleClose = useCallback(() => {
    setPhase("exit");
    setTimeout(() => onClose(), 500);
  }, [onClose]);

  // Calculate transform for the "grow from card" effect
  const scaleX = originRect.width / window.innerWidth;
  const scaleY = originRect.height / window.innerHeight;
  const translateX = originRect.left + originRect.width / 2 - window.innerWidth / 2;
  const translateY = originRect.top + originRect.height / 2 - window.innerHeight / 2;

  const enterTransform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-background transition-opacity duration-500",
          phase === "visible" ? "opacity-100" : "opacity-0"
        )}
        onClick={handleClose}
      />

      {/* Panel that scales from card position to full viewport */}
      <div
        ref={panelRef}
        className="absolute inset-0 bg-background origin-center transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.15,1)] will-change-transform"
        style={{
          transform: phase === "visible" ? "translate(0,0) scale(1,1)" : enterTransform,
          opacity: phase === "exit" ? 0 : 1,
        }}
      >
        {/* Content — fades in after panel arrives */}
        <div
          className={cn(
            "h-full overflow-y-auto transition-opacity duration-500 delay-200",
            phase === "visible" ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Close button */}
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
            <div
              className={cn(
                "w-full h-44 md:h-64 lg:h-80 bg-gradient-to-br rounded-sm relative overflow-hidden",
                item.accentColor
              )}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[100px] md:text-[180px] lg:text-[240px] font-medium tracking-tight text-white/[0.06] leading-none select-none">
                  {item.initials}
                </span>
              </div>
              <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')]" />
            </div>
          </div>

          {/* Body content */}
          <div className="content-container pb-16 md:pb-24">
            <p className="text-lg md:text-xl leading-relaxed text-foreground/80 max-w-2xl mb-14 md:mb-18">
              {item.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-14 md:mb-18">
              <div>
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  The Challenge
                </p>
                <p className="text-base leading-relaxed text-foreground/70">{item.challenge}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  The Outcome
                </p>
                <p className="text-base leading-relaxed text-foreground/70">{item.outcome}</p>
              </div>
            </div>

            {item.stats && item.stats.length > 0 && (
              <div className="border-t border-border pt-10 mb-14">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {item.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-1.5">
                        {stat.value}
                      </p>
                      <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-10">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium tracking-[0.15em] uppercase px-3 py-1.5 border border-border text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="border-t border-border pt-8 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Interested in building something like this?
              </p>
              <a
                href="/#contact"
                className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity flex items-center gap-2"
              >
                Start a conversation
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioGrid = ({ items }: PortfolioGridProps) => {
  const [expanded, setExpanded] = useState<{
    item: PortfolioItem;
    rect: DOMRect;
  } | null>(null);

  const handleOpen = useCallback((item: PortfolioItem, rect: DOMRect) => {
    setExpanded({ item, rect });
  }, []);

  const handleClose = useCallback(() => {
    setExpanded(null);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {items.map((item, index) => (
          <GridCell
            key={item.name}
            item={item}
            index={index}
            onOpen={(rect) => handleOpen(item, rect)}
          />
        ))}
      </div>

      {expanded && (
        <ExpandedPanel
          item={expanded.item}
          originRect={expanded.rect}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default PortfolioGrid;
