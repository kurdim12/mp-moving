import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { portfolioItems } from "@/components/portfolio/PortfolioData";

/* ─── Tab definitions ─── */
const tabs = [
  { id: "introduction", label: "Introduction" },
  { id: "clients", label: "Select Clients" },
  { id: "capabilities", label: "Expertise & Capabilities" },
  { id: "outcomes", label: "Outcomes" },
  { id: "process", label: "Process" },
  { id: "leadership", label: "Leadership" },
] as const;

type TabId = (typeof tabs)[number]["id"];

/* ─── Tab content renderers ─── */
const TabContent = ({ id }: { id: TabId }) => {
  switch (id) {
    case "introduction":
      return (
        <div className="max-w-2xl space-y-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] text-foreground">
            We solve complex problems through design & technology
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Each project chosen, not pitched. We partner with founders and leaders
            who believe in building something meaningful.
          </p>
          <a
            href="/#contact"
            className="inline-block text-sm text-destructive font-medium relative group"
          >
            Learn more
            <span className="absolute bottom-0 left-0 w-full h-px bg-destructive scale-x-100 group-hover:scale-x-0 transition-transform duration-300 origin-left" />
          </a>
        </div>
      );

    case "clients":
      return (
        <div>
          <p className="text-sm text-muted-foreground mb-8">Select Clients</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-0">
            {portfolioItems.map((item) => (
              <Link
                key={item.slug}
                to={`/portfolio/${item.slug}`}
                className="group block border-t border-foreground/10 pt-5 pb-7"
              >
                <h3 className="text-lg font-semibold tracking-tight text-foreground mb-2">
                  {item.name}
                </h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">
                  {item.context.length > 130
                    ? item.context.slice(0, 130) + "…"
                    : item.context}
                </p>
                <span className="inline-block text-[13px] text-destructive font-medium relative">
                  View case study
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-destructive group-hover:w-full transition-all duration-300" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      );

    case "capabilities":
      return (
        <div className="max-w-3xl">
          <p className="text-lg text-muted-foreground mb-10">
            From concept to company. We build across every layer.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              { title: "Strategy & Positioning", desc: "Market validation, PMF research, founder-aligned GTM." },
              { title: "Brand & Identity", desc: "Visual systems, messaging frameworks, investor-grade presence." },
              { title: "Products & Platforms", desc: "Full-stack platforms, mobile apps, operational tools." },
              { title: "AI & Automation", desc: "ML pipelines, intelligent workflows, compliance automation." },
              { title: "Architecture & Infra", desc: "Scalable systems, API layers, multi-tenant infrastructure." },
              { title: "Co-Building", desc: "Equity partnerships, team building, shared ownership." },
            ].map((cap) => (
              <div key={cap.title} className="border-t border-foreground/10 pt-4">
                <h3 className="text-base font-semibold text-foreground mb-1">
                  {cap.title}
                </h3>
                <p className="text-sm text-muted-foreground">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case "outcomes":
      return (
        <div className="max-w-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { num: "40+", label: "Firms served" },
              { num: "12", label: "Ventures built" },
              { num: "6", label: "Co-founded" },
              { num: "3×", label: "Avg. value increase" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
                  {stat.num}
                </p>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            We don't showcase everything we build. If you're curious about working
            together, start a conversation.
          </p>
          <a
            href="/#contact"
            className="inline-block mt-6 text-sm text-destructive font-medium relative group"
          >
            Get in touch
            <span className="absolute bottom-0 left-0 w-full h-px bg-destructive scale-x-100 group-hover:scale-x-0 transition-transform duration-300 origin-left" />
          </a>
        </div>
      );

    case "process":
      return (
        <div className="max-w-2xl space-y-8">
          {[
            { step: "01", title: "Listen", desc: "We start with the problem, not the solution. Deep research, founder interviews, market analysis." },
            { step: "02", title: "Define", desc: "Synthesize findings into a clear thesis. Name the constraints. Set the frame." },
            { step: "03", title: "Build", desc: "Ship fast, iterate weekly. Real users, real feedback, real traction." },
            { step: "04", title: "Scale", desc: "Hand over or grow together. Documented, repeatable, ready for the next phase." },
          ].map((p) => (
            <div key={p.step} className="border-t border-foreground/10 pt-5">
              <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground mb-2">
                {p.step}
              </p>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      );

    case "leadership":
      return (
        <div className="max-w-2xl space-y-8">
          <p className="text-lg text-muted-foreground leading-relaxed">
            MP is led by builders who've shipped products, raised capital, and
            scaled teams. We don't advise from the sidelines — we build alongside.
          </p>
          <div className="space-y-6">
            {portfolioItems
              .filter((i) => i.founderQuote)
              .slice(0, 3)
              .map((item) => (
                <div key={item.slug} className="border-t border-foreground/10 pt-5">
                  <p className="text-sm text-foreground italic leading-relaxed mb-2">
                    "{item.founderQuote}"
                  </p>
                  <p className="text-[12px] text-muted-foreground">
                    — {item.founderName}, {item.founderRole}
                  </p>
                </div>
              ))}
          </div>
          <a
            href="/#contact"
            className="inline-block text-sm text-destructive font-medium relative group"
          >
            Work with us
            <span className="absolute bottom-0 left-0 w-full h-px bg-destructive scale-x-100 group-hover:scale-x-0 transition-transform duration-300 origin-left" />
          </a>
        </div>
      );
  }
};

/* ─── Portfolio Page ─── */
const Portfolio = () => {
  const [active, setActive] = useState<TabId>("introduction");
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => setIsLoaded(true), []);

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
          {/* 2×3 Tab Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
            {tabs.map((tab, i) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={cn(
                    "text-left px-6 md:px-8 py-8 md:py-10 border-t-2 transition-colors duration-200 cursor-pointer",
                    isActive
                      ? "border-t-destructive bg-background"
                      : "border-t-foreground/15 bg-transparent hover:bg-background/60"
                  )}
                >
                  <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2
                    className={cn(
                      "text-lg md:text-xl lg:text-2xl font-semibold tracking-tight leading-tight transition-colors duration-200",
                      isActive ? "text-foreground" : "text-foreground/50"
                    )}
                  >
                    {tab.label}
                  </h2>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div className="bg-background mt-0 p-8 md:p-12 lg:p-16 border-t border-foreground/10 animate-fade-in">
            <TabContent id={active} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
