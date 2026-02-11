import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { portfolioItems, categories } from "@/components/portfolio/PortfolioData";

/* ─── Page transition ─── */
function usePageTransition() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return isLoaded;
}

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

/* ─── Clean client card (work.co style) ─── */
const ClientCard = ({
  item,
  index,
}: {
  item: (typeof portfolioItems)[0];
  index: number;
}) => {
  const { ref, isVisible } = useScrollReveal(index * 40);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <Link
        to={`/portfolio/${item.slug}`}
        className="group block border-t border-border py-8 hover:bg-muted/30 transition-all duration-300"
      >
        {/* Client name */}
        <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground mb-3 group-hover:text-foreground/80 transition-colors">
          {item.name}
        </h3>

        {/* Context/Description */}
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 max-w-2xl">
          {item.context}
        </p>

        {/* View case study link */}
        <span className="inline-block text-sm font-medium text-foreground/60 group-hover:text-foreground transition-colors relative">
          View case study
          <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
        </span>
      </Link>
    </div>
  );
};

/* ─── Main portfolio page ─── */
const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const isLoaded = usePageTransition();

  const filtered =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((i) => i.category === activeCategory);

  return (
    <div className={cn(
      "min-h-screen bg-background transition-opacity duration-700",
      isLoaded ? "opacity-100" : "opacity-0"
    )}>
      <Header />
      <main className="pt-24 md:pt-32">
        {/* Two column layout container */}
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left column - Introduction */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 space-y-16">
                {/* Introduction section */}
                <section>
                  <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-foreground mb-8 pb-4 border-b-2 border-foreground">
                    Introduction
                  </h2>
                  <div className="space-y-6">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] text-foreground">
                      We solve complex problems through design & technology
                    </h1>
                    <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                      Each project chosen, not pitched. We partner with founders and leaders who believe in building something meaningful.
                    </p>
                    <a
                      href="/#contact"
                      className="inline-block text-sm font-medium text-foreground hover:text-foreground/60 transition-colors relative group"
                    >
                      Learn more
                      <span className="absolute bottom-0 left-0 w-full h-px bg-foreground scale-x-100 group-hover:scale-x-0 transition-transform duration-300 origin-left" />
                    </a>
                  </div>
                </section>

                {/* Category filter */}
                <section className="hidden lg:block">
                  <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-foreground mb-6">
                    Filter by Category
                  </h2>
                  <div className="flex flex-col gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          "text-left text-sm font-medium py-2 px-3 transition-all duration-200 border-l-2",
                          activeCategory === cat
                            ? "border-foreground text-foreground bg-muted/30"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Right column - Select Clients */}
            <div className="lg:col-span-7">
              <section>
                <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-foreground mb-8 pb-4 border-b-2 border-foreground">
                  Select Clients
                </h2>

                {/* Mobile category filter */}
                <div className="lg:hidden mb-8">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          "text-[10px] font-medium tracking-[0.15em] uppercase px-3 py-2 transition-all duration-200",
                          activeCategory === cat
                            ? "bg-foreground text-background"
                            : "text-muted-foreground hover:text-foreground border border-border"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Client list */}
                <div className="space-y-0">
                  {filtered.map((item, index) => (
                    <ClientCard key={item.slug} item={item} index={index} />
                  ))}
                </div>

                {filtered.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-muted-foreground text-sm">
                      No projects in this category yet.
                    </p>
                  </div>
                )}
              </section>

              {/* Outcomes section */}
              <section className="mt-24 pt-16 border-t border-border">
                <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-foreground mb-8 pb-4 border-b-2 border-foreground">
                  Outcomes
                </h2>
                <div className="space-y-6">
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                    We don't showcase everything we build. If you're curious about working together, start a conversation.
                  </p>
                  <a
                    href="/#contact"
                    className="inline-block text-sm font-medium text-foreground hover:text-foreground/60 transition-colors relative group"
                  >
                    Get in touch
                    <span className="absolute bottom-0 left-0 w-full h-px bg-foreground scale-x-100 group-hover:scale-x-0 transition-transform duration-300 origin-left" />
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-24 md:h-32" />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
