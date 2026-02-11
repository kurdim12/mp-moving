import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, X } from "lucide-react";
import type { PortfolioItem } from "./PortfolioData";

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
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

const PortfolioCard = ({ item, index, isExpanded, onToggle }: PortfolioCardProps) => {
  const { ref, isVisible } = useScrollReveal(index * 60);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded]);

  // Scroll into view when expanded
  useEffect(() => {
    if (isExpanded && ref.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [isExpanded]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out border-b border-border",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      {/* Collapsed row — clickable */}
      <div
        onClick={onToggle}
        className={cn(
          "group cursor-pointer transition-all duration-500",
          "py-6 md:py-8",
          isExpanded && "pb-0 md:pb-0"
        )}
      >
        <div className="content-container">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Initials + Name */}
            <div className="flex items-center gap-5 md:gap-8 min-w-0">
              <div
                className={cn(
                  "w-12 h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0",
                  "bg-foreground text-background rounded-sm",
                  "text-sm md:text-base font-medium tracking-wide",
                  "transition-transform duration-500 group-hover:scale-105",
                  isExpanded && "scale-105"
                )}
              >
                {item.initials}
              </div>
              <div className="min-w-0">
                <h3
                  className={cn(
                    "text-lg md:text-xl lg:text-2xl font-medium tracking-tight text-foreground truncate",
                    "transition-all duration-300 group-hover:opacity-70"
                  )}
                >
                  {item.name}
                </h3>
                <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground mt-0.5 hidden sm:block">
                  {item.category}
                </p>
              </div>
            </div>

            {/* Right: Year + tagline + arrow */}
            <div className="flex items-center gap-4 md:gap-8 flex-shrink-0">
              <p className="text-sm text-muted-foreground hidden lg:block max-w-xs truncate">
                {item.tagline}
              </p>
              <span className="text-xs text-muted-foreground hidden md:block">{item.year}</span>
              <div
                className={cn(
                  "w-8 h-8 flex items-center justify-center transition-all duration-500",
                  isExpanded ? "rotate-45" : "rotate-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                )}
              >
                {isExpanded ? (
                  <X className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded content — smooth height animation */}
      <div
        style={{
          maxHeight: isExpanded ? `${contentHeight}px` : "0px",
          opacity: isExpanded ? 1 : 0,
        }}
        className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
      >
        <div ref={contentRef}>
          {/* Gradient visual block */}
          <div className="content-container pt-4 pb-8">
            <div
              className={cn(
                "w-full h-40 md:h-56 lg:h-64 bg-gradient-to-br rounded-sm relative overflow-hidden",
                item.accentColor
              )}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[100px] md:text-[160px] lg:text-[200px] font-medium tracking-tight text-white/[0.06] leading-none select-none">
                  {item.initials}
                </span>
              </div>
              <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')]" />
            </div>
          </div>

          {/* Description */}
          <div className="content-container pb-10 md:pb-14">
            <p className="text-lg md:text-xl leading-relaxed text-foreground/80 max-w-2xl mb-12 md:mb-16">
              {item.description}
            </p>

            {/* Challenge + Outcome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-12 md:mb-16">
              <div>
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  The Challenge
                </p>
                <p className="text-base leading-relaxed text-foreground/70">
                  {item.challenge}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  The Outcome
                </p>
                <p className="text-base leading-relaxed text-foreground/70">
                  {item.outcome}
                </p>
              </div>
            </div>

            {/* Stats */}
            {item.stats && item.stats.length > 0 && (
              <div className="border-t border-border pt-10 mb-12 md:mb-14">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {item.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-1.5">
                        {stat.value}
                      </p>
                      <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium tracking-[0.15em] uppercase px-3 py-1.5 border border-border text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="border-t border-border mt-10 pt-8 flex items-center justify-between">
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

export default PortfolioCard;
