import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { portfolioItems } from "@/components/portfolio/PortfolioData";

function usePageTransition() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => setIsLoaded(true), []);
  return isLoaded;
}

/* ─── Client Cell (3-col grid item) ─── */
const ClientCell = ({ item }: { item: (typeof portfolioItems)[0] }) => (
  <Link
    to={`/portfolio/${item.slug}`}
    className="group block border-t border-foreground/15 pt-6 pb-8"
  >
    <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground mb-3 leading-tight">
      {item.name}
    </h3>
    <p className="text-[13px] leading-relaxed text-muted-foreground mb-4">
      {item.context.length > 140 ? item.context.slice(0, 140) + "…" : item.context}
    </p>
    <span className="inline-block text-[13px] text-destructive font-medium relative">
      View case study
      <span className="absolute bottom-0 left-0 w-0 h-px bg-destructive group-hover:w-full transition-all duration-300" />
    </span>
  </Link>
);

/* ─── Portfolio Page ─── */
const Portfolio = () => {
  const isLoaded = usePageTransition();

  return (
    <div
      className={cn(
        "min-h-screen bg-muted/30 transition-opacity duration-500",
        isLoaded ? "opacity-100" : "opacity-0"
      )}
    >
      <Header />

      <main className="pt-24 md:pt-32 pb-24 md:pb-32">
        <div className="content-container">
          {/* Two-panel layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* LEFT PANEL — Introduction */}
            <div className="bg-background p-8 md:p-12 lg:p-16">
              <h2 className="text-sm font-medium tracking-wide text-foreground mb-1">
                Introduction
              </h2>
              <div className="w-full h-px bg-destructive mb-12" />

              <div className="space-y-8 mt-16 md:mt-24">
                <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.15] text-foreground">
                  We solve complex problems through design & technology
                </h1>

                <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">
                  "Each project chosen, not pitched. We partner with founders and leaders who believe in building something meaningful." — MP
                </p>

                <a
                  href="/#contact"
                  className="inline-block text-sm text-destructive font-medium relative group"
                >
                  Learn more
                  <span className="absolute bottom-0 left-0 w-full h-px bg-destructive scale-x-100 group-hover:scale-x-0 transition-transform duration-300 origin-left" />
                </a>
              </div>
            </div>

            {/* RIGHT PANEL — Select Clients */}
            <div className="bg-background p-8 md:p-12 lg:p-16">
              <h2 className="text-sm font-medium tracking-wide text-foreground mb-1">
                Select Clients
              </h2>
              <div className="w-full h-px bg-destructive mb-10" />

              {/* 3-column client grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-0">
                {portfolioItems.map((item) => (
                  <ClientCell key={item.slug} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
