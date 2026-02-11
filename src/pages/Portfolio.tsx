import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface PortfolioItem {
  name: string;
  category: string;
  description: string;
  initials: string;
  featured?: boolean;
  expandedDetails: {
    challenge: string;
    outcome: string;
    tags: string[];
  };
}

const portfolioItems: PortfolioItem[] = [
  {
    name: "Baseform",
    category: "Partnership & Co-Building",
    description: "Co-founded construction tech platform. From concept to 12-person team in 14 months.",
    initials: "BF",
    featured: true,
    expandedDetails: {
      challenge: "The construction industry lacked a unified platform for project coordination. Fragmented tools meant lost time, miscommunication, and delayed deliveries.",
      outcome: "Built and co-own the platform from zero. Now serving 40+ construction firms with a 12-person team. Revenue-positive within the first year.",
      tags: ["Co-Founded", "Equity Partnership", "Product & Engineering"],
    },
  },
  {
    name: "Meridian",
    category: "Brand & Digital Identity",
    description: "End-to-end brand system and digital presence for a climate infrastructure company.",
    initials: "ME",
    featured: true,
    expandedDetails: {
      challenge: "A climate-tech company with deep technology but no clear brand voice. Needed to speak to both investors and enterprise clients.",
      outcome: "Complete brand identity, messaging framework, and digital platform. Helped close their Series B within 6 months of launch.",
      tags: ["Brand System", "Website", "Messaging"],
    },
  },
  {
    name: "Arcline",
    category: "Products & Platforms",
    description: "Custom operations platform connecting field teams, logistics, and real-time reporting.",
    initials: "AR",
    expandedDetails: {
      challenge: "Field operations ran on spreadsheets and phone calls. No visibility, no accountability, no single source of truth.",
      outcome: "Designed and built a custom ops platform adopted by 200+ field workers. Reduced reporting time by 70%.",
      tags: ["Platform Build", "UX Design", "Integrations"],
    },
  },
  {
    name: "Nørd Studio",
    category: "Strategy & Positioning",
    description: "Strategic repositioning and go-to-market framework for a Nordic design collective.",
    initials: "NØ",
    expandedDetails: {
      challenge: "Talented collective with inconsistent positioning. Winning projects through network, not strategy.",
      outcome: "Repositioned as a premium product design studio. New pricing model increased average project value by 3x.",
      tags: ["Strategy", "GTM", "Positioning"],
    },
  },
  {
    name: "Verra Health",
    category: "AI & Automation",
    description: "Intelligent intake and triage system reducing patient wait times by 40%.",
    initials: "VH",
    expandedDetails: {
      challenge: "Manual patient intake created bottlenecks, misrouted cases, and frustrated staff across 12 clinics.",
      outcome: "AI-powered triage system now processing 2,000+ patients monthly. Wait times cut by 40%, staff satisfaction up significantly.",
      tags: ["AI Integration", "Healthcare", "Workflow Automation"],
    },
  },
  {
    name: "Halcyon Capital",
    category: "Brand & Digital Identity",
    description: "Visual identity and investor portal for an emerging markets private equity fund.",
    initials: "HC",
    expandedDetails: {
      challenge: "A new PE fund needed institutional credibility while standing apart from legacy firms.",
      outcome: "Premium brand identity and secure investor portal. Helped attract $40M in first-close commitments.",
      tags: ["Visual Identity", "Portal", "Finance"],
    },
  },
  {
    name: "Kindra",
    category: "Products & Platforms",
    description: "Membership platform and community tools for a wellness brand scaling across Europe.",
    initials: "KI",
    expandedDetails: {
      challenge: "Growing wellness brand with fragmented community across social channels. No owned platform, no data.",
      outcome: "Built a membership platform with integrated community tools. 8,000+ active members within 6 months.",
      tags: ["Platform", "Community", "Membership"],
    },
  },
  {
    name: "Terrace",
    category: "Strategy & Positioning",
    description: "Product-market fit validation and launch strategy for a proptech startup.",
    initials: "TE",
    expandedDetails: {
      challenge: "Pre-seed proptech with a strong thesis but untested assumptions. Needed clarity before building.",
      outcome: "Validated core hypothesis through 60+ user interviews. Refined positioning led to successful pre-seed raise.",
      tags: ["PMF Validation", "Research", "Launch Strategy"],
    },
  },
  {
    name: "Caspian",
    category: "AI & Automation",
    description: "Internal knowledge engine automating compliance workflows for a fintech firm.",
    initials: "CA",
    expandedDetails: {
      challenge: "Compliance team spending 30+ hours weekly on manual document review and regulatory checks.",
      outcome: "Knowledge engine now handles 80% of routine compliance checks. Team redirected to strategic work.",
      tags: ["AI", "Compliance", "Knowledge Management"],
    },
  },
  {
    name: "Outline Labs",
    category: "Partnership & Co-Building",
    description: "Joint venture building developer tools. Equity partnership with shared roadmap.",
    initials: "OL",
    expandedDetails: {
      challenge: "Technical founders with strong product vision but no go-to-market muscle or brand presence.",
      outcome: "Joint venture with shared equity. Built brand, GTM, and first 500 users. Now growing independently.",
      tags: ["Co-Founded", "DevTools", "GTM"],
    },
  },
];

const categories = [
  "All",
  "Strategy & Positioning",
  "Brand & Digital Identity",
  "Products & Platforms",
  "AI & Automation",
  "Partnership & Co-Building",
];

// Scroll animation hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

const PortfolioCard = ({
  item,
  index,
  isExpanded,
  onToggle,
}: {
  item: PortfolioItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0 transition-all duration-700 ease-out",
        isVisible && "opacity-100 translate-y-0",
        !isVisible && "translate-y-8"
      )}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div
        onClick={onToggle}
        className={cn(
          "border-b border-border cursor-pointer transition-all duration-500",
          "hover:bg-card/50",
          isExpanded && "bg-card/80"
        )}
      >
        {/* Main row */}
        <div className="flex items-center justify-between py-6 md:py-8 px-0">
          <div className="flex items-center gap-6 md:gap-10 flex-1 min-w-0">
            {/* Initials */}
            <div
              className={cn(
                "text-2xl md:text-3xl font-medium tracking-tight text-foreground w-14 md:w-16 shrink-0 transition-all duration-500",
                isExpanded && "text-foreground",
                !isExpanded && "group-hover:opacity-70"
              )}
            >
              {item.initials}
            </div>

            {/* Name + category */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-medium text-foreground mb-1 truncate">
                {item.name}
              </h3>
              <span className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground">
                {item.category}
              </span>
            </div>

            {/* Short description - hidden on mobile */}
            <p className="hidden lg:block text-sm text-muted-foreground max-w-xs truncate">
              {item.description}
            </p>
          </div>

          {/* Arrow indicator */}
          <ArrowRight
            className={cn(
              "w-4 h-4 text-muted-foreground shrink-0 ml-4 transition-transform duration-500",
              isExpanded && "rotate-90"
            )}
          />
        </div>

        {/* Expanded detail */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-500 ease-out",
            isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="pb-8 md:pb-10 pl-20 md:pl-[6.5rem] pr-8">
            {/* Description on mobile */}
            <p className="lg:hidden text-sm text-muted-foreground mb-6">
              {item.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground mb-3">
                  Challenge
                </p>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {item.expandedDetails.challenge}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground mb-3">
                  Outcome
                </p>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {item.expandedDetails.outcome}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {item.expandedDetails.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium tracking-wider uppercase px-3 py-1.5 border border-border text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedCard = ({
  item,
  index,
  isExpanded,
  onToggle,
}: {
  item: PortfolioItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      onClick={onToggle}
      className={cn(
        "opacity-0 transition-all duration-700 ease-out cursor-pointer",
        isVisible && "opacity-100 translate-y-0",
        !isVisible && "translate-y-8",
        "border border-border p-8 md:p-12 hover:bg-card/50 transition-colors duration-500",
        isExpanded && "bg-card/80"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground">
          {item.initials}
        </div>
        <ArrowRight
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform duration-500 mt-2",
            isExpanded && "rotate-90"
          )}
        />
      </div>

      <span className="inline-block text-[11px] font-medium tracking-widest uppercase text-muted-foreground mb-4">
        {item.category}
      </span>

      <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3">
        {item.name}
      </h3>

      <p className="body-medium max-w-md">
        {item.description}
      </p>

      {/* Expanded detail */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-out",
          isExpanded ? "max-h-[500px] opacity-100 mt-8" : "max-h-0 opacity-0 mt-0"
        )}
      >
        <div className="border-t border-border pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground mb-3">
                Challenge
              </p>
              <p className="text-sm leading-relaxed text-foreground/80">
                {item.expandedDetails.challenge}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground mb-3">
                Outcome
              </p>
              <p className="text-sm leading-relaxed text-foreground/80">
                {item.expandedDetails.outcome}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {item.expandedDetails.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium tracking-wider uppercase px-3 py-1.5 border border-border text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const featured = portfolioItems.filter((i) => i.featured);
  const regular = portfolioItems.filter((i) => !i.featured);

  const filteredRegular =
    activeCategory === "All"
      ? regular
      : regular.filter((i) => i.category === activeCategory);

  const filteredFeatured =
    activeCategory === "All"
      ? featured
      : featured.filter((i) => i.category === activeCategory);

  const handleToggle = useCallback((name: string) => {
    setExpandedItem((prev) => (prev === name ? null : name));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 md:pt-40 pb-12 md:pb-16">
          <div className="content-container">
            <div className="max-w-2xl">
              <p className="fade-up text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">
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
        <section className="pb-12 md:pb-16">
          <div className="content-container">
            <div className="flex flex-wrap gap-2 md:gap-3 fade-up fade-up-delay-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setExpandedItem(null);
                  }}
                  className={cn(
                    "text-[11px] md:text-xs font-medium tracking-widest uppercase px-4 py-2 transition-all duration-300",
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

        {/* Featured projects */}
        {filteredFeatured.length > 0 && (
          <section className="pb-12 md:pb-16">
            <div className="content-container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
                {filteredFeatured.map((item, index) => (
                  <FeaturedCard
                    key={item.name}
                    item={item}
                    index={index}
                    isExpanded={expandedItem === item.name}
                    onToggle={() => handleToggle(item.name)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regular grid — list style */}
        <section className="pb-24 md:pb-32">
          <div className="content-container">
            <div className="border-t border-border">
              {filteredRegular.map((item, index) => (
                <PortfolioCard
                  key={item.name}
                  item={item}
                  index={index}
                  isExpanded={expandedItem === item.name}
                  onToggle={() => handleToggle(item.name)}
                />
              ))}
            </div>

            {filteredRegular.length === 0 && filteredFeatured.length === 0 && (
              <p className="text-muted-foreground text-sm py-16 text-center">
                No projects in this category yet.
              </p>
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
