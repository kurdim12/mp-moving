import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowLeft, X, ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "./PortfolioData";

/* ─── 3-Page Spread Overlay ─── */
const CaseSpread = ({
  item,
  originRect,
  onClose,
}: {
  item: PortfolioItem;
  originRect: DOMRect;
  onClose: () => void;
}) => {
  const [phase, setPhase] = useState<"enter" | "visible" | "exit">("enter");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageDirection, setPageDirection] = useState<"next" | "prev">("next");

  // Enter animation
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("visible"));
    });
    return () => {
      document.body.style.overflow = "";
      cancelAnimationFrame(raf1);
    };
  }, []);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight" && currentPage < 2) goToPage(currentPage + 1, "next");
      if (e.key === "ArrowLeft" && currentPage > 0) goToPage(currentPage - 1, "prev");
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [currentPage]);

  const handleClose = useCallback(() => {
    setPhase("exit");
    setTimeout(() => onClose(), 400);
  }, [onClose]);

  const goToPage = (page: number, dir: "next" | "prev") => {
    setPageDirection(dir);
    setCurrentPage(page);
  };

  /* ── Page 1: Overview ── */
  const Page1 = () => (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground">
              {item.descriptor}
            </span>
            <span className="text-muted-foreground/30">·</span>
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground">
              {item.year}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-[0.95] mb-4">
            {item.name}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
            {item.tagline}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium tracking-[0.15em] uppercase px-3 py-1.5 border border-border text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Visual placeholder */}
        <div className="flex-1 min-h-[160px] md:min-h-[200px] bg-muted/50 rounded-sm flex items-center justify-center mb-8 md:mb-10">
          <span className="text-[80px] md:text-[120px] font-medium tracking-tight text-muted-foreground/10 leading-none select-none">
            {item.initials}
          </span>
        </div>

        {/* Context */}
        <div>
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">
            01 — Context
          </p>
          <p className="text-base md:text-lg leading-relaxed text-foreground/70 max-w-2xl">
            {item.context}
          </p>
        </div>
      </div>
    </div>
  );

  /* ── Page 2: What We Built ── */
  const Page2 = () => (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col">
        <div className="mb-10 md:mb-14">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">
            02 — What We Built
          </p>
          <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground leading-tight">
            System Breakdown
          </h3>
        </div>

        <div className="flex-1 space-y-0">
          {item.modules.map((mod, i) => (
            <div
              key={mod.name}
              className={cn(
                "py-6 md:py-8",
                i > 0 && "border-t border-border"
              )}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="text-lg md:text-xl font-medium tracking-tight text-foreground">
                  {mod.name}
                </h4>
                <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground px-2 py-1 border border-border flex-shrink-0 mt-1">
                  {mod.deliverable}
                </span>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-foreground/60 max-w-xl">
                {mod.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ── Page 3: Outcome ── */
  const Page3 = () => (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col">
        <div className="mb-10 md:mb-14">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">
            03 — Outcome
          </p>
          <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground leading-tight">
            Proof & Impact
          </h3>
        </div>

        {/* Impact statements */}
        <div className="mb-10 md:mb-14">
          <div className="space-y-4">
            {item.impactStatements.map((statement, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground mt-1.5 w-4 flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg md:text-xl font-medium tracking-tight text-foreground leading-snug">
                  {statement}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables checklist */}
        <div className="mb-10 md:mb-14">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
            What Was Delivered
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
            {item.deliverables.map((d) => (
              <div key={d} className="flex items-center gap-2">
                <div className="w-1 h-1 bg-foreground/40 rounded-full flex-shrink-0" />
                <span className="text-sm text-foreground/60">{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Founder quote */}
        {item.founderQuote && (
          <div className="border-t border-border pt-8 mb-10 md:mb-14">
            <p className="text-base md:text-lg italic text-foreground/50 max-w-lg leading-relaxed">
              "{item.founderQuote}"
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-8 border-t border-border">
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-60 transition-opacity"
          >
            Discuss a build
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );

  const pages = [Page1, Page2, Page3];
  const CurrentPageComponent = pages[currentPage];

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay background — soft neutral */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-[350ms]",
          phase === "visible"
            ? "bg-[hsl(40_10%_90%)] opacity-100"
            : "bg-[hsl(40_10%_90%)] opacity-0"
        )}
        onClick={handleClose}
      />

      {/* Close button */}
      <button
        onClick={handleClose}
        className={cn(
          "fixed top-6 right-6 md:top-8 md:right-8 z-30 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-300",
          phase === "visible" ? "opacity-100" : "opacity-0"
        )}
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Pages container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={cn(
            "relative w-full max-w-4xl mx-4 md:mx-8 pointer-events-auto",
            "transition-all duration-[500ms] ease-[cubic-bezier(0.4,0,0.15,1)]",
            phase === "visible"
              ? "opacity-100 scale-100 translate-y-0"
              : phase === "enter"
              ? "opacity-0 scale-[0.98] translate-y-4"
              : "opacity-0 scale-[0.98] translate-y-2"
          )}
        >
          {/* Stacked page shadows behind */}
          <div
            className={cn(
              "absolute inset-0 bg-background rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.04)] translate-y-3 translate-x-1.5 transition-all duration-[600ms] delay-[200ms]",
              phase === "visible" ? "opacity-40" : "opacity-0 translate-y-6"
            )}
          />
          <div
            className={cn(
              "absolute inset-0 bg-background rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.03)] translate-y-1.5 translate-x-0.5 transition-all duration-[600ms] delay-[100ms]",
              phase === "visible" ? "opacity-60" : "opacity-0 translate-y-4"
            )}
          />

          {/* Main page */}
          <div
            className="relative bg-background rounded-sm shadow-[0_2px_20px_rgba(0,0,0,0.06)] overflow-hidden"
            style={{ minHeight: "min(80vh, 700px)", maxHeight: "85vh" }}
          >
            <div className="h-full overflow-y-auto" style={{ minHeight: "min(80vh, 700px)", maxHeight: "85vh" }}>
              <CurrentPageComponent />
            </div>
          </div>

          {/* Navigation */}
          <div
            className={cn(
              "flex items-center justify-between mt-6 transition-all duration-500 delay-300",
              phase === "visible" ? "opacity-100" : "opacity-0"
            )}
          >
            <button
              onClick={() => currentPage > 0 && goToPage(currentPage - 1, "prev")}
              className={cn(
                "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all",
                currentPage === 0 && "opacity-0 pointer-events-none"
              )}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Prev
            </button>

            <span className="text-[11px] font-medium tracking-[0.15em] text-muted-foreground">
              {currentPage + 1} / 3
            </span>

            <button
              onClick={() => currentPage < 2 && goToPage(currentPage + 1, "next")}
              className={cn(
                "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all",
                currentPage === 2 && "opacity-0 pointer-events-none"
              )}
            >
              Next
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseSpread;
