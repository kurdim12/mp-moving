import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { X, ArrowUpRight } from "lucide-react";

interface PortfolioItem {
  name: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  initials: string;
  challenge: string;
  outcome: string;
  stats?: { label: string; value: string }[];
  tags: string[];
  accentColor: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    name: "Baseform",
    category: "Partnership & Co-Building",
    year: "2023",
    tagline: "From concept to company in 14 months.",
    description: "Co-founded construction tech platform connecting project teams, scheduling, and real-time field data into one system.",
    initials: "BF",
    challenge: "The construction industry ran on fragmented tools — spreadsheets, WhatsApp, phone calls. No single source of truth across teams, subcontractors, and clients.",
    outcome: "Built and co-own the platform from zero. Now serving 40+ construction firms with a 12-person team. Revenue-positive within the first year.",
    stats: [
      { label: "Firms onboarded", value: "40+" },
      { label: "Team size", value: "12" },
      { label: "Time to revenue", value: "11mo" },
    ],
    tags: ["Co-Founded", "Equity Partnership", "Product & Engineering"],
    accentColor: "from-stone-800 to-stone-600",
  },
  {
    name: "Meridian",
    category: "Brand & Digital Identity",
    year: "2024",
    tagline: "Giving climate tech a voice that closes rounds.",
    description: "End-to-end brand system and digital presence for a climate infrastructure company preparing for Series B.",
    initials: "ME",
    challenge: "Deep technology, no clear brand voice. Needed to speak credibly to both institutional investors and enterprise procurement teams.",
    outcome: "Complete brand identity, messaging framework, and digital platform. Contributed to closing their Series B within 6 months of launch.",
    stats: [
      { label: "Series B closed", value: "6mo" },
      { label: "Brand touchpoints", value: "24" },
    ],
    tags: ["Brand System", "Website", "Messaging Framework"],
    accentColor: "from-emerald-900 to-emerald-700",
  },
  {
    name: "Arcline",
    category: "Products & Platforms",
    year: "2023",
    tagline: "Replacing spreadsheets with real-time ops.",
    description: "Custom operations platform connecting field teams, logistics, and real-time reporting across distributed locations.",
    initials: "AR",
    challenge: "200+ field workers reporting through spreadsheets and phone calls. Zero visibility for management, constant data lag, missed deadlines.",
    outcome: "Designed and built a custom ops platform adopted by 200+ field workers. Reduced reporting time by 70% and eliminated manual data reconciliation.",
    stats: [
      { label: "Field workers", value: "200+" },
      { label: "Reporting time", value: "−70%" },
    ],
    tags: ["Platform Build", "UX Design", "System Integration"],
    accentColor: "from-slate-800 to-slate-600",
  },
  {
    name: "Nørd Studio",
    category: "Strategy & Positioning",
    year: "2024",
    tagline: "Repositioned. Repriced. Respected.",
    description: "Strategic repositioning and go-to-market framework for a Nordic design collective punching below their weight.",
    initials: "NØ",
    challenge: "Talented collective winning projects through network alone, not strategy. Inconsistent positioning, underpriced, competing against juniors.",
    outcome: "Repositioned as a premium product design studio. New pricing model increased average project value by 3x. Pipeline shifted to inbound.",
    stats: [
      { label: "Avg. project value", value: "3×" },
      { label: "Pipeline shift", value: "Inbound" },
    ],
    tags: ["Strategy", "GTM", "Positioning"],
    accentColor: "from-blue-900 to-blue-700",
  },
  {
    name: "Verra Health",
    category: "AI & Automation",
    year: "2024",
    tagline: "AI that actually reduces wait times.",
    description: "Intelligent intake and triage system processing thousands of patients monthly across 12 clinics.",
    initials: "VH",
    challenge: "Manual patient intake created bottlenecks, misrouted cases, and frustrated both patients and staff across 12 clinics.",
    outcome: "AI-powered triage system now processing 2,000+ patients monthly. Wait times cut by 40%, staff redirected to higher-value care.",
    stats: [
      { label: "Patients/month", value: "2K+" },
      { label: "Wait time reduction", value: "40%" },
      { label: "Clinics", value: "12" },
    ],
    tags: ["AI Integration", "Healthcare", "Workflow Automation"],
    accentColor: "from-teal-900 to-teal-700",
  },
  {
    name: "Halcyon Capital",
    category: "Brand & Digital Identity",
    year: "2023",
    tagline: "Institutional credibility from day one.",
    description: "Visual identity and secure investor portal for an emerging markets private equity fund entering its first close.",
    initials: "HC",
    challenge: "A new PE fund needed to project institutional credibility while standing apart from legacy firms — before having a track record.",
    outcome: "Premium brand identity and secure investor portal. Helped attract $40M in first-close commitments from institutional LPs.",
    stats: [
      { label: "First close", value: "$40M" },
    ],
    tags: ["Visual Identity", "Investor Portal", "Finance"],
    accentColor: "from-amber-900 to-amber-700",
  },
  {
    name: "Kindra",
    category: "Products & Platforms",
    year: "2024",
    tagline: "Owned community, owned data.",
    description: "Membership platform and community tools for a wellness brand scaling across Europe.",
    initials: "KI",
    challenge: "Growing wellness brand with fragmented community across Instagram and Facebook groups. No owned platform, no data, no retention strategy.",
    outcome: "Built membership platform with integrated community tools. 8,000+ active members within 6 months. Churn cut in half.",
    stats: [
      { label: "Active members", value: "8K+" },
      { label: "Time to scale", value: "6mo" },
    ],
    tags: ["Platform", "Community", "Membership"],
    accentColor: "from-rose-900 to-rose-700",
  },
  {
    name: "Terrace",
    category: "Strategy & Positioning",
    year: "2023",
    tagline: "Validated before built.",
    description: "Product-market fit validation and launch strategy for a proptech startup before writing a single line of code.",
    initials: "TE",
    challenge: "Pre-seed proptech with a strong thesis but untested assumptions. Investors wanted validation, founders wanted to build. We bridged both.",
    outcome: "Validated core hypothesis through 60+ user interviews. Refined positioning led to successful pre-seed raise and a clear v1 roadmap.",
    stats: [
      { label: "User interviews", value: "60+" },
      { label: "Pre-seed", value: "Raised" },
    ],
    tags: ["PMF Validation", "User Research", "Launch Strategy"],
    accentColor: "from-violet-900 to-violet-700",
  },
  {
    name: "Caspian",
    category: "AI & Automation",
    year: "2024",
    tagline: "Compliance on autopilot.",
    description: "Internal knowledge engine automating compliance workflows for a regulated fintech firm.",
    initials: "CA",
    challenge: "Compliance team spending 30+ hours weekly on manual document review, regulatory cross-checks, and audit preparation.",
    outcome: "Knowledge engine handles 80% of routine compliance checks. Team redirected from data entry to strategic risk assessment.",
    stats: [
      { label: "Automated checks", value: "80%" },
      { label: "Hours saved/week", value: "30+" },
    ],
    tags: ["AI", "Compliance", "Knowledge Management"],
    accentColor: "from-cyan-900 to-cyan-700",
  },
  {
    name: "Outline Labs",
    category: "Partnership & Co-Building",
    year: "2024",
    tagline: "Built together. Growing independently.",
    description: "Joint venture building developer tools. Equity partnership with shared roadmap and go-to-market.",
    initials: "OL",
    challenge: "Technical founders with a strong product vision but no go-to-market muscle, brand presence, or distribution strategy.",
    outcome: "Joint venture with shared equity. Built brand, GTM engine, and acquired first 500 users. Now growing independently with clear momentum.",
    stats: [
      { label: "Users acquired", value: "500+" },
      { label: "Partnership", value: "Equity" },
    ],
    tags: ["Co-Founded", "DevTools", "GTM"],
    accentColor: "from-indigo-900 to-indigo-700",
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

// Scroll reveal hook
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

// Grid card — clean, minimal, like FF
const GridCard = ({
  item,
  index,
  onClick,
}: {
  item: PortfolioItem;
  index: number;
  onClick: () => void;
}) => {
  const { ref, isVisible } = useScrollReveal(index * 50);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={cn(
        "relative aspect-[4/3] flex flex-col items-center justify-center cursor-pointer group",
        "border-r border-b border-border",
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}
    >
      {/* Hover background */}
      <div className="absolute inset-0 bg-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <div className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground group-hover:text-background transition-colors duration-500 mb-3">
          {item.initials}
        </div>
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground group-hover:text-background/60 transition-colors duration-500">
          {item.name}
        </p>
      </div>

      {/* Corner arrow on hover */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 translate-x-2 -translate-y-2">
        <ArrowUpRight className="w-4 h-4 text-background/60" />
      </div>
    </div>
  );
};

// Showcase overlay
const ShowcaseOverlay = ({
  item,
  onClose,
}: {
  item: PortfolioItem;
  onClose: () => void;
}) => {
  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 h-full overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 md:top-8 md:right-8 z-20 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="min-h-full flex flex-col">
          {/* Hero area */}
          <div className="pt-24 md:pt-32 pb-16 md:pb-20">
            <div className="content-container">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                <div>
                  <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
                    {item.category} · {item.year}
                  </span>
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-foreground leading-[0.95]">
                    {item.name}
                  </h2>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed md:text-right">
                  {item.tagline}
                </p>
              </div>

              {/* Accent bar */}
              <div className={cn("h-1 w-24 bg-gradient-to-r rounded-full mb-0", item.accentColor)} />
            </div>
          </div>

          {/* Visual divider — gradient block */}
          <div className="w-full">
            <div className="content-container">
              <div className={cn(
                "w-full h-48 md:h-72 lg:h-80 bg-gradient-to-br rounded-sm relative overflow-hidden",
                item.accentColor
              )}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[120px] md:text-[200px] lg:text-[260px] font-medium tracking-tight text-white/[0.06] leading-none select-none">
                    {item.initials}
                  </span>
                </div>
                {/* Noise texture overlay */}
                <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')]" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="py-16 md:py-24">
            <div className="content-container">
              {/* Description */}
              <p className="text-lg md:text-xl leading-relaxed text-foreground/80 max-w-2xl mb-16 md:mb-20">
                {item.description}
              </p>

              {/* Challenge + Outcome in two columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16 md:mb-20">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-5">
                    The Challenge
                  </p>
                  <p className="text-base leading-relaxed text-foreground/70">
                    {item.challenge}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-5">
                    The Outcome
                  </p>
                  <p className="text-base leading-relaxed text-foreground/70">
                    {item.outcome}
                  </p>
                </div>
              </div>

              {/* Stats */}
              {item.stats && item.stats.length > 0 && (
                <div className="border-t border-border pt-12 mb-16 md:mb-20">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {item.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-2">
                          {stat.value}
                        </p>
                        <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium tracking-[0.15em] uppercase px-4 py-2 border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-auto pb-16 md:pb-20">
            <div className="content-container">
              <div className="border-t border-border pt-10 flex items-center justify-between">
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
    </div>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filtered =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((i) => i.category === activeCategory);

  const handleClose = useCallback(() => setSelectedItem(null), []);

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
                  onClick={() => setActiveCategory(cat)}
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
            <div className="border-t border-l border-border">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filtered.map((item, index) => (
                  <GridCard
                    key={item.name}
                    item={item}
                    index={index}
                    onClick={() => setSelectedItem(item)}
                  />
                ))}
              </div>
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

      {/* Showcase overlay */}
      {selectedItem && (
        <ShowcaseOverlay item={selectedItem} onClose={handleClose} />
      )}
    </div>
  );
};

export default Portfolio;
