import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import { portfolioItems, categories } from "@/components/portfolio/PortfolioData";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((i) => i.category === activeCategory);

  const handleToggle = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setExpandedIndex(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 md:pt-40 pb-12 md:pb-16">
          <div className="content-container">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-xl">
                <p className="fade-up text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-5">
                  Selected Work
                </p>
                <h1 className="fade-up fade-up-delay-1 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-foreground">
                  What we've built alongside the people we believe in.
                </h1>
              </div>
              <p className="fade-up fade-up-delay-2 text-base md:text-lg leading-relaxed text-muted-foreground max-w-sm md:text-right">
                Each one chosen, not pitched.
              </p>
            </div>
          </div>
        </section>

        {/* Category filter */}
        <section className="pb-8 md:pb-12">
          <div className="content-container">
            <div className="flex flex-wrap gap-2 md:gap-3 fade-up fade-up-delay-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    "text-[11px] md:text-xs font-medium tracking-[0.15em] uppercase px-4 py-2 transition-all duration-300",
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

        {/* Grid */}
        <section className="pb-24 md:pb-32">
          <div className="content-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {filtered.map((item, index) => (
                <PortfolioCard
                  key={item.name}
                  item={item}
                  index={index}
                  isExpanded={expandedIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="border border-border py-24 text-center">
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
                  className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity"
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
