import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { portfolioItems } from "@/components/portfolio/PortfolioData";

/* ── Mini-page content for each "preview card" ── */

const IntroductionPage = () => (
  <div className="bg-background w-full md:w-[900px] min-h-[500px] md:min-h-[700px] p-6 md:p-16">
    <div className="max-w-lg mt-6 md:mt-16 space-y-6 md:space-y-10">
      <h1 className="text-2xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-foreground">
        Our portfolio is lean by design.
      </h1>
      <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
        We work selectively, so each project we undertake gets our full attention and care. Rather than publishing glossy case studies, we focus on real outcomes and lessons learned with our partners.
      </p>
      <p className="text-xs md:text-sm text-muted-foreground italic">
        Our partners are welcome to share details of what we've built together — word-of-mouth and direct experience are the strongest endorsements.
      </p>
    </div>
  </div>
);

const ClientsPage = () => (
  <div className="bg-background w-full md:w-[900px] min-h-[500px] md:min-h-[700px] p-6 md:p-16">
    <h2 className="text-base md:text-lg font-medium tracking-[0.08em] uppercase text-muted-foreground mb-6 md:mb-8">Select Clients</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-0">
      {portfolioItems.map((item) => (
        <div key={item.slug} className="border-t border-foreground/10 pt-4 md:pt-5 pb-5 md:pb-6">
          <h3 className="text-base md:text-xl font-semibold text-foreground mb-1 md:mb-2">{item.name}</h3>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-2 md:mb-3">
            {item.context.length > 90 ? item.context.slice(0, 90) + "…" : item.context}
          </p>
          <span className="text-xs md:text-sm text-destructive font-medium">View →</span>
        </div>
      ))}
    </div>
  </div>
);

const ExpertisePage = () => (
  <div className="bg-background w-full md:w-[900px] min-h-[500px] md:min-h-[700px] p-6 md:p-16">
    <h2 className="text-base md:text-lg font-medium tracking-[0.08em] uppercase text-muted-foreground mb-6 md:mb-8">Expertise</h2>
    <div className="space-y-5 md:space-y-8">
      {[
        { title: "Strategy & Positioning", desc: "Market validation, PMF research, founder-aligned GTM." },
        { title: "Brand & Identity", desc: "Visual systems, messaging frameworks, investor-grade presence." },
        { title: "Products & Platforms", desc: "Full-stack platforms, mobile apps, operational tools." },
        { title: "AI & Automation", desc: "ML pipelines, intelligent workflows, compliance automation." },
        { title: "Architecture & Infra", desc: "Scalable systems, API layers, multi-tenant infrastructure." },
        { title: "Co-Building", desc: "Equity partnerships, team building, shared ownership." },
      ].map((cap) => (
        <div key={cap.title} className="border-t border-foreground/10 pt-3 md:pt-4">
          <h3 className="text-sm md:text-lg font-semibold text-foreground mb-1">{cap.title}</h3>
          <p className="text-xs md:text-sm text-muted-foreground">{cap.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const OutcomesPage = () => (
  <div className="bg-background w-full md:w-[900px] min-h-[500px] md:min-h-[700px] p-6 md:p-16">
    <h2 className="text-base md:text-lg font-medium tracking-[0.08em] uppercase text-muted-foreground mb-8 md:mb-12">Outcomes</h2>
    <div className="grid grid-cols-2 gap-6 md:gap-12 mb-10 md:mb-16">
      {[
        { num: "40+", label: "Firms served" },
        { num: "12", label: "Ventures built" },
        { num: "6", label: "Co-founded" },
        { num: "3×", label: "Avg. value increase" },
      ].map((s) => (
        <div key={s.label}>
          <p className="text-3xl md:text-6xl font-semibold text-foreground tracking-tight">{s.num}</p>
          <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-2">{s.label}</p>
        </div>
      ))}
    </div>
    <p className="text-sm md:text-base text-muted-foreground">We don't showcase everything we build. Start a conversation.</p>
  </div>
);

const ProcessPage = () => (
  <div className="bg-background w-full md:w-[900px] min-h-[500px] md:min-h-[700px] p-6 md:p-16">
    <h2 className="text-base md:text-lg font-medium tracking-[0.08em] uppercase text-muted-foreground mb-6 md:mb-8">Process</h2>
    <div className="space-y-5 md:space-y-8">
      {[
        { step: "01", title: "Listen", desc: "Deep research, founder interviews, market analysis." },
        { step: "02", title: "Define", desc: "Synthesize findings into a clear thesis. Name the constraints." },
        { step: "03", title: "Build", desc: "Ship fast, iterate weekly. Real users, real feedback." },
        { step: "04", title: "Scale", desc: "Hand over or grow together. Documented and repeatable." },
      ].map((p) => (
        <div key={p.step} className="border-t border-foreground/10 pt-3 md:pt-4">
          <p className="text-[10px] md:text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground mb-1">{p.step}</p>
          <h3 className="text-sm md:text-lg font-semibold text-foreground mb-1">{p.title}</h3>
          <p className="text-xs md:text-sm text-muted-foreground">{p.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const LeadershipPage = () => (
  <div className="bg-background w-full md:w-[900px] min-h-[500px] md:min-h-[700px] p-6 md:p-16">
    <h2 className="text-base md:text-lg font-medium tracking-[0.08em] uppercase text-muted-foreground mb-6 md:mb-8">Leadership</h2>
    <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-10">
      Led by builders who've shipped products, raised capital, and scaled teams.
    </p>
    <div className="space-y-4 md:space-y-6">
      {portfolioItems
        .filter((i) => i.founderQuote)
        .slice(0, 4)
        .map((item) => (
          <div key={item.slug} className="border-t border-foreground/10 pt-3 md:pt-4">
            <p className="text-sm md:text-base text-foreground italic leading-relaxed mb-1">"{item.founderQuote}"</p>
            <p className="text-xs md:text-sm text-muted-foreground">— {item.founderName}, {item.founderRole}</p>
          </div>
        ))}
    </div>
  </div>
);

/* ── Panel config ── */

const panels = [
  { id: "intro", title: "Introduction", component: IntroductionPage, accent: true },
  { id: "clients", title: "Select Clients", component: ClientsPage },
  { id: "expertise", title: "Expertise", component: ExpertisePage },
  { id: "outcomes", title: "Outcomes", component: OutcomesPage },
  { id: "process", title: "Process", component: ProcessPage },
  { id: "leadership", title: "Leadership", component: LeadershipPage },
];

const Portfolio = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);

  useEffect(() => setIsLoaded(true), []);

  const activeData = activePanel ? panels.find((p) => p.id === activePanel) : null;
  const ActiveComponent = activeData?.component;

  return (
    <div
      className={cn(
        "min-h-screen bg-[hsl(220,10%,92%)] transition-opacity duration-500",
        isLoaded ? "opacity-100" : "opacity-0"
      )}
    >
      <Header />

      {/* ── Expanded full-size view ── */}
      {activePanel && ActiveComponent && (
        <div
          className="fixed inset-0 z-40 bg-background overflow-y-auto animate-fade-in cursor-pointer"
          onClick={() => setActivePanel(null)}
        >
          <div className="max-w-[1200px] mx-auto pt-16 md:pt-0">
            <div className="w-full">
              <ActiveComponent />
            </div>
          </div>
        </div>
      )}

      {/* ── Sitemap grid (desktop) / List (mobile) ── */}
      <main className="pt-20 md:pt-28 pb-12 md:pb-24">
        <div className="px-4 md:px-8 lg:px-12 max-w-[1500px] mx-auto">

          {/* Mobile: simple list of panels */}
          <div className="md:hidden space-y-3">
            {panels.map((panel) => (
              <button
                key={panel.id}
                className="w-full text-left bg-background p-5 border border-foreground/8 active:bg-muted transition-colors"
                onClick={() => setActivePanel(panel.id)}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold tracking-tight text-foreground">
                    {panel.title}
                  </h2>
                  <span className="text-xs text-muted-foreground">→</span>
                </div>
                <div className={cn(
                  "h-[2px] mt-3",
                  panel.accent ? "bg-destructive" : "bg-foreground/10"
                )} />
              </button>
            ))}
          </div>

          {/* Desktop: miniaturized preview cards */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {panels.map((panel) => {
              const PageComponent = panel.component;

              return (
                <div
                  key={panel.id}
                  className="group cursor-pointer"
                  onClick={() => setActivePanel(panel.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-semibold tracking-tight text-foreground">
                      {panel.title}
                    </h2>
                  </div>
                  <div className={cn(
                    "h-[2px] mb-0",
                    panel.accent ? "bg-destructive" : "bg-foreground/10"
                  )} />

                  <div
                    className="overflow-hidden border border-foreground/8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] group-hover:border-foreground/15 transition-all duration-300"
                    style={{ height: "280px", position: "relative" }}
                  >
                    <div
                      className="origin-top-left pointer-events-none select-none"
                      style={{ transform: "scale(0.4)", width: "250%" }}
                    >
                      <PageComponent />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
