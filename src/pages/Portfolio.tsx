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

  const handleToggle = useCallback(
    (index: number) => {
      setExpandedIndex((prev) => (prev === index ? null : index));
    },
    []
  );

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
            <div className="max-w-2xl">
              <p className="fade-up text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">
                Portfolio
              </p>
              <h1 className="fade-up fade-up-delay-1 section-headline text-foreground mb-6">
                What we've built alongside the people we believe in.
              </h1>
              <p className="fade-up fade-up-delay-2 body-large max-w-xl">
                Selected partnerships and ventures. Each one chosen, not pitched.
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

        {/* Project list */}
        <section className="pb-24 md:pb-32">
          <div className="border-t border-border">
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
            <div className="content-container py-24 text-center">
              <p className="text-muted-foreground text-sm">
                No projects in this category yet.
              </p>
            </div>
          )}
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
