import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { portfolioItems, categories } from "@/components/portfolio/PortfolioData";

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

/* ─── Logo grid cell ─── */
const LogoCell = ({
  item,
  index,
}: {
  item: (typeof portfolioItems)[0];
  index: number;
}) => {
  const { ref, isVisible } = useScrollReveal(index * 60);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <Link
        to={`/portfolio/${item.slug}`}
        className="group block text-center py-16 md:py-20 lg:py-24 px-6 hover:bg-muted/30 transition-colors duration-200"
      >
        {/* Wordmark */}
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground/80 group-hover:text-foreground transition-colors duration-200 mb-4 leading-none">
          {item.name}
        </h3>

        {/* Descriptor */}
        <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground mb-3">
          {item.descriptor}
        </p>

        {/* View Case link */}
        <span className="inline-block text-[11px] font-medium tracking-[0.1em] uppercase text-muted-foreground/60 group-hover:text-foreground transition-colors duration-200 relative">
          View Case
          <span className="absolute bottom-0 left-0 w-full h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </span>
      </Link>
    </div>
  );
};

/* ─── Main portfolio page ─── */
const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((i) => i.category === activeCategory);

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
                    "text-[10px] md:text-[11px] font-medium tracking-[0.15em] uppercase px-4 py-2 transition-all duration-200",
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, index) => (
                <LogoCell key={item.slug} item={item} index={index} />
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
    </div>
  );
};

export default Portfolio;
