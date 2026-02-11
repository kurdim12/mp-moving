import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { portfolioItems } from "@/components/portfolio/PortfolioData";

const Portfolio = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => setIsLoaded(true), []);

  return (
    <div
      className={cn(
        "min-h-screen bg-[hsl(var(--muted))] transition-opacity duration-500",
        isLoaded ? "opacity-100" : "opacity-0"
      )}
    >
      <Header />

      <main className="pt-24 md:pt-28 pb-16 md:pb-24">
        <div className="px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
          {/* 2×3 Grid of panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">

            {/* ── ROW 1 ── */}

            {/* Panel 1: Introduction */}
            <div>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-2">
                Introduction
              </h2>
              <div className="h-[2px] bg-destructive mb-0" />
              <div className="bg-background p-8 md:p-12 min-h-[420px] overflow-hidden">
                <div className="mt-8 md:mt-16 space-y-8 max-w-md">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.15] text-foreground">
                    We solve complex problems through design & technology
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">
                    "Each project chosen, not pitched. We partner with founders who believe in building something meaningful." — MP
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
            </div>

            {/* Panel 2: Select Clients */}
            <div>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-2">
                Select Clients
              </h2>
              <div className="h-[2px] bg-foreground/15 mb-0" />
              <div className="bg-background p-6 md:p-8 min-h-[420px] overflow-hidden">
                <p className="text-[13px] text-muted-foreground mb-6">Select Clients</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-0">
                  {portfolioItems.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/portfolio/${item.slug}`}
                      className="group block border-t border-foreground/10 pt-4 pb-5"
                    >
                      <h3 className="text-base font-semibold tracking-tight text-foreground mb-1.5">
                        {item.name}
                      </h3>
                      <p className="text-[12px] text-muted-foreground leading-relaxed mb-2">
                        {item.context.length > 100 ? item.context.slice(0, 100) + "…" : item.context}
                      </p>
                      <span className="inline-block text-[12px] text-destructive font-medium relative">
                        View case study
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-destructive group-hover:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ── ROW 2 ── */}

            {/* Panel 3: Expertise & Capabilities */}
            <div>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-2">
                Expertise & Capabilities
              </h2>
              <div className="h-[2px] bg-foreground/15 mb-0" />
              <div className="bg-background p-8 md:p-12 min-h-[360px] overflow-hidden">
                <div className="space-y-6">
                  {[
                    { title: "Strategy & Positioning", desc: "Market validation, PMF research, founder-aligned GTM." },
                    { title: "Brand & Identity", desc: "Visual systems, messaging frameworks, investor-grade presence." },
                    { title: "Products & Platforms", desc: "Full-stack platforms, mobile apps, operational tools." },
                    { title: "AI & Automation", desc: "ML pipelines, intelligent workflows, compliance automation." },
                    { title: "Architecture & Infra", desc: "Scalable systems, API layers, multi-tenant infrastructure." },
                    { title: "Co-Building", desc: "Equity partnerships, team building, shared ownership." },
                  ].map((cap) => (
                    <div key={cap.title} className="border-t border-foreground/10 pt-3">
                      <h3 className="text-sm font-semibold text-foreground mb-0.5">{cap.title}</h3>
                      <p className="text-[12px] text-muted-foreground">{cap.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Panel 4: Outcomes */}
            <div>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-2">
                Outcomes
              </h2>
              <div className="h-[2px] bg-foreground/15 mb-0" />
              <div className="bg-background p-8 md:p-12 min-h-[360px] overflow-hidden">
                <div className="grid grid-cols-2 gap-8 mb-12">
                  {[
                    { num: "40+", label: "Firms served" },
                    { num: "12", label: "Ventures built" },
                    { num: "6", label: "Co-founded" },
                    { num: "3×", label: "Avg. value increase" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight">{s.num}</p>
                      <p className="text-[12px] text-muted-foreground mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We don't showcase everything we build. Start a conversation.
                </p>
              </div>
            </div>

            {/* ── ROW 3 ── */}

            {/* Panel 5: Process */}
            <div>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-2">
                Process
              </h2>
              <div className="h-[2px] bg-foreground/15 mb-0" />
              <div className="bg-background p-8 md:p-12 min-h-[360px] overflow-hidden">
                <div className="space-y-6">
                  {[
                    { step: "01", title: "Listen", desc: "Deep research, founder interviews, market analysis." },
                    { step: "02", title: "Define", desc: "Synthesize findings into a clear thesis. Name the constraints." },
                    { step: "03", title: "Build", desc: "Ship fast, iterate weekly. Real users, real feedback." },
                    { step: "04", title: "Scale", desc: "Hand over or grow together. Documented and repeatable." },
                  ].map((p) => (
                    <div key={p.step} className="border-t border-foreground/10 pt-3">
                      <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground mb-1">{p.step}</p>
                      <h3 className="text-sm font-semibold text-foreground mb-0.5">{p.title}</h3>
                      <p className="text-[12px] text-muted-foreground">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Panel 6: Leadership */}
            <div>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-2">
                Leadership
              </h2>
              <div className="h-[2px] bg-foreground/15 mb-0" />
              <div className="bg-background p-8 md:p-12 min-h-[360px] overflow-hidden">
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  Led by builders who've shipped products, raised capital, and scaled teams.
                </p>
                <div className="space-y-5">
                  {portfolioItems
                    .filter((i) => i.founderQuote)
                    .slice(0, 4)
                    .map((item) => (
                      <div key={item.slug} className="border-t border-foreground/10 pt-3">
                        <p className="text-[13px] text-foreground italic leading-relaxed mb-1">
                          "{item.founderQuote}"
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          — {item.founderName}, {item.founderRole}
                        </p>
                      </div>
                    ))}
                </div>
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
