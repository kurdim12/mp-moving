import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { portfolioItems } from "@/components/portfolio/PortfolioData";

const panels = [
  { id: "all", label: "All Work" },
  { id: "Strategy & Positioning", label: "Strategy" },
  { id: "Brand & Digital Identity", label: "Brand" },
  { id: "Products & Platforms", label: "Products" },
  { id: "AI & Automation", label: "AI & Auto" },
  { id: "Partnership & Co-Building", label: "Co-Build" },
] as const;

const Portfolio = () => {
  const [active, setActive] = useState<string>("all");
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => setIsLoaded(true), []);

  const getItems = (panelId: string) =>
    panelId === "all"
      ? portfolioItems
      : portfolioItems.filter((i) => i.category === panelId);

  return (
    <div
      className={cn(
        "min-h-screen bg-muted/30 transition-opacity duration-500",
        isLoaded ? "opacity-100" : "opacity-0"
      )}
    >
      <Header />

      {/* Mobile: tab bar + content */}
      <div className="lg:hidden pt-24 pb-16">
        <div className="content-container">
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-border scrollbar-none">
            {panels.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={cn(
                  "whitespace-nowrap text-xs font-medium tracking-wide px-3 py-2 transition-colors duration-200",
                  active === p.id
                    ? "text-foreground border-b-2 border-destructive"
                    : "text-muted-foreground"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="space-y-0">
            {getItems(active).map((item) => (
              <Link
                key={item.slug}
                to={`/portfolio/${item.slug}`}
                className="group block border-t border-foreground/10 py-6"
              >
                <h3 className="text-lg font-semibold tracking-tight text-foreground mb-2">
                  {item.name}
                </h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">
                  {item.context.slice(0, 120)}…
                </p>
                <span className="text-[13px] text-destructive font-medium">
                  View case study
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: 6-panel editorial layout */}
      <main className="hidden lg:flex pt-20 h-[calc(100vh-5rem)] overflow-hidden">
        {panels.map((panel) => {
          const isActive = active === panel.id;
          const items = getItems(panel.id);

          return (
            <div
              key={panel.id}
              onClick={() => setActive(panel.id)}
              className={cn(
                "relative h-full cursor-pointer border-r border-foreground/10 last:border-r-0 overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                isActive ? "bg-background" : "bg-muted/40"
              )}
              style={{
                flex: isActive ? "3 1 0%" : "1 1 0%",
                opacity: isActive ? 1 : 0.7,
              }}
            >
              {/* Sticky panel header */}
              <div className="sticky top-0 z-10 bg-inherit px-5 xl:px-7 pt-8 pb-4">
                <h2 className="text-[11px] font-semibold tracking-[0.15em] uppercase text-foreground mb-2">
                  {panel.label}
                </h2>
                <div
                  className={cn(
                    "h-px w-full transition-colors duration-300",
                    isActive ? "bg-destructive" : "bg-foreground/15"
                  )}
                />
              </div>

              {/* Scrollable content */}
              <div className="h-[calc(100%-5rem)] overflow-y-auto px-5 xl:px-7 pb-12">
                {isActive ? (
                  /* Active panel: full grid of projects */
                  <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-y-0">
                    {items.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/portfolio/${item.slug}`}
                        className="group block border-t border-foreground/10 pt-5 pb-6"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="text-base xl:text-lg font-semibold tracking-tight text-foreground mb-2 leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-[12px] xl:text-[13px] leading-relaxed text-muted-foreground mb-3">
                          {item.context.slice(0, 130)}…
                        </p>
                        <span className="inline-block text-[12px] text-destructive font-medium relative">
                          View case study
                          <span className="absolute bottom-0 left-0 w-0 h-px bg-destructive group-hover:w-full transition-all duration-300" />
                        </span>
                      </Link>
                    ))}
                    {items.length === 0 && (
                      <p className="text-sm text-muted-foreground pt-8">
                        No projects yet.
                      </p>
                    )}
                  </div>
                ) : (
                  /* Inactive panel: compact list */
                  <div className="space-y-0">
                    {items.slice(0, 4).map((item) => (
                      <div
                        key={item.slug}
                        className="border-t border-foreground/10 py-4"
                      >
                        <p className="text-sm font-semibold text-foreground truncate">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-1 truncate">
                          {item.descriptor}
                        </p>
                      </div>
                    ))}
                    {items.length > 4 && (
                      <p className="text-[11px] text-muted-foreground pt-3">
                        +{items.length - 4} more
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </main>

      <div className="lg:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;
