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

/* ─── Portfolio card cell ─── */
const PortfolioCard = ({
  item,
  index,
}: {
  item: (typeof portfolioItems)[0];
  index: number;
}) => {
  const { ref, isVisible } = useScrollReveal(index * 60);
  const [isHovered, setIsHovered] = useState(false);

  // Generate a color based on initials for visual interest
  const getColorFromInitials = (initials: string) => {
    const colors = [
      "from-blue-500/20 to-purple-500/20",
      "from-emerald-500/20 to-teal-500/20",
      "from-orange-500/20 to-red-500/20",
      "from-violet-500/20 to-fuchsia-500/20",
      "from-cyan-500/20 to-blue-500/20",
      "from-amber-500/20 to-orange-500/20",
      "from-rose-500/20 to-pink-500/20",
      "from-indigo-500/20 to-purple-500/20",
      "from-lime-500/20 to-green-500/20",
      "from-pink-500/20 to-rose-500/20",
    ];
    const charCode = initials.charCodeAt(0) + initials.charCodeAt(1);
    return colors[charCode % colors.length];
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      <Link
        to={`/portfolio/${item.slug}`}
        className="group block relative overflow-hidden bg-card border border-border hover:border-foreground/20 transition-all duration-500 h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient background */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            getColorFromInitials(item.initials)
          )}
        />

        {/* Content */}
        <div className="relative p-8 md:p-10 lg:p-12 h-full flex flex-col justify-between min-h-[400px]">
          {/* Top section */}
          <div>
            {/* Category & Year */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground">
                {item.category}
              </span>
              <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground">
                {item.year}
              </span>
            </div>

            {/* Large initials as visual element */}
            <div className="mb-6">
              <div className="text-7xl md:text-8xl font-bold tracking-tighter text-foreground/5 group-hover:text-foreground/10 transition-colors duration-500 leading-none">
                {item.initials}
              </div>
            </div>

            {/* Project name */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-foreground mb-4 leading-tight">
              {item.name}
            </h3>

            {/* Tagline */}
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 group-hover:text-foreground/80 transition-colors duration-300">
              {item.tagline}
            </p>

            {/* Micro signal (impact metric) */}
            {item.microSignal && (
              <div className="inline-block px-3 py-1.5 bg-foreground/5 group-hover:bg-foreground/10 transition-colors duration-300 mb-6">
                <span className="text-xs font-medium tracking-wide text-foreground">
                  {item.microSignal}
                </span>
              </div>
            )}
          </div>

          {/* Bottom section - appears on hover */}
          <div
            className={cn(
              "transition-all duration-500 ease-out",
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tags.slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] font-medium tracking-wider uppercase text-foreground/60 px-2 py-1 bg-foreground/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* View Case link */}
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <span>View Case Study</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </div>
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

        {/* Portfolio grid */}
        <section className="pb-24 md:pb-32">
          <div className="content-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((item, index) => (
                <PortfolioCard key={item.slug} item={item} index={index} />
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
