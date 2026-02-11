import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
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
  const { ref, isVisible } = useScrollReveal(index * 50);
  const expandRef = useRef<HTMLDivElement>(null);
  const [expandHeight, setExpandHeight] = useState(0);

  useEffect(() => {
    if (expandRef.current) {
      setExpandHeight(expandRef.current.scrollHeight);
    }
  }, [isExpanded]);

  useEffect(() => {
    if (isExpanded && ref.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [isExpanded]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        isExpanded && "col-span-1 md:col-span-2 lg:col-span-3 row-span-1"
      )}
    >
      {/* Card — collapsed state */}
      <div
        onClick={onToggle}
        className={cn(
          "group cursor-pointer h-full border border-border p-6 md:p-8 flex flex-col justify-between transition-all duration-500",
          "hover:bg-foreground/[0.02]",
          isExpanded && "bg-foreground text-background border-foreground"
        )}
      >
        <div>
          <div className="flex items-start justify-between gap-3 mb-4">
            <h3
              className={cn(
                "text-lg md:text-xl font-medium tracking-tight leading-tight",
                isExpanded ? "text-background" : "text-foreground"
              )}
            >
              {item.name}
            </h3>
            <div
              className={cn(
                "w-6 h-6 flex items-center justify-center flex-shrink-0 transition-all duration-500",
                "opacity-0 group-hover:opacity-100",
                isExpanded && "opacity-100 rotate-45"
              )}
            >
              <ArrowUpRight
                className={cn(
                  "w-4 h-4",
                  isExpanded ? "text-background/60" : "text-muted-foreground"
                )}
              />
            </div>
          </div>

          <p
            className={cn(
              "text-sm leading-relaxed mb-6",
              isExpanded ? "text-background/70" : "text-muted-foreground"
            )}
          >
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span
            className={cn(
              "text-[11px] font-medium tracking-[0.15em] uppercase",
              isExpanded ? "text-background/50" : "text-muted-foreground"
            )}
          >
            {item.category}
          </span>
          <span
            className={cn(
              "text-xs font-medium underline underline-offset-4 transition-colors",
              isExpanded
                ? "text-background/70 hover:text-background"
                : "text-foreground hover:text-foreground/70"
            )}
          >
            {isExpanded ? "Close" : "View case study"}
          </span>
        </div>
      </div>

      {/* Expanded detail panel */}
      <div
        style={{
          maxHeight: isExpanded ? `${expandHeight}px` : "0px",
          opacity: isExpanded ? 1 : 0,
        }}
        className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
      >
        <div ref={expandRef} className="border-x border-b border-border">
          {/* Gradient hero */}
          <div className="p-6 md:p-8">
            <div
              className={cn(
                "w-full h-36 md:h-52 lg:h-64 bg-gradient-to-br rounded-sm relative overflow-hidden",
                item.accentColor
              )}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[80px] md:text-[140px] lg:text-[180px] font-medium tracking-tight text-white/[0.06] leading-none select-none">
                  {item.initials}
                </span>
              </div>
              <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')]" />
              {/* Year badge */}
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/40">
                  {item.year}
                </span>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="px-6 md:px-8 pb-6">
            <p className="text-xl md:text-2xl font-medium tracking-tight text-foreground leading-snug max-w-xl">
              {item.tagline}
            </p>
          </div>

          {/* Challenge + Outcome */}
          <div className="px-6 md:px-8 pb-10 md:pb-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 mb-10 md:mb-14">
              <div>
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  The Challenge
                </p>
                <p className="text-sm md:text-base leading-relaxed text-foreground/70">
                  {item.challenge}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">
                  The Outcome
                </p>
                <p className="text-sm md:text-base leading-relaxed text-foreground/70">
                  {item.outcome}
                </p>
              </div>
            </div>

            {/* Stats */}
            {item.stats && item.stats.length > 0 && (
              <div className="border-t border-border pt-8 mb-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {item.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl md:text-3xl font-medium tracking-tight text-foreground mb-1">
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

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
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
            <div className="border-t border-border pt-6 flex items-center justify-between">
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
