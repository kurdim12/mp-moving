import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface CaseStudy {
  name: string;
  context: string;
  challenge: string;
  approach: string;
  outcome: string;
}

const sections: { category: string; cases: CaseStudy[] }[] = [
  {
    category: "Brand & Positioning",
    cases: [
      {
        name: "Meridian Health",
        context: "Series A health-tech company entering a crowded wellness market.",
        challenge: "No clear positioning. Five different internal descriptions of what the company does.",
        approach: "Ran a focused positioning sprint. Defined the core narrative, competitive frame, and messaging architecture in two weeks.",
        outcome: "Unified brand language adopted across product, sales, and fundraising. Closed Series B with the new narrative.",
      },
      {
        name: "Terravox",
        context: "Climate intelligence startup pivoting from B2C to B2B.",
        challenge: "Existing brand was consumer-facing and informal. Needed credibility with enterprise buyers.",
        approach: "Complete rebrand including positioning, visual identity, and website. Built to signal technical depth and institutional trust.",
        outcome: "Signed first three enterprise contracts within 90 days of rebrand launch.",
      },
    ],
  },
  {
    category: "Products, Platforms & Systems",
    cases: [
      {
        name: "UrbanFlow",
        context: "Urban mobility company with fragmented internal tools across three cities.",
        challenge: "Operations team using spreadsheets, email, and four disconnected dashboards.",
        approach: "Designed and built a unified operations platform connecting scheduling, routing, and reporting into one system.",
        outcome: "Reduced operational overhead by 40%. Scaled to two additional cities without adding ops headcount.",
      },
      {
        name: "Vaultline",
        context: "Institutional fintech managing complex multi-asset portfolios.",
        challenge: "Legacy dashboard couldn't handle real-time data at scale. Clients demanding modern interface.",
        approach: "Built a real-time analytics platform with sub-second updates, designed for decision-making under pressure.",
        outcome: "Processing 2M+ data points daily. Client retention increased 25% in first quarter.",
      },
    ],
  },
  {
    category: "AI & Automation",
    cases: [
      {
        name: "Pulseware",
        context: "Clinical monitoring platform with manual alert triage process.",
        challenge: "Nurses spending 30% of shift reviewing non-critical alerts.",
        approach: "Integrated ML-based alert prioritization into the existing workflow. No new interfaces — just smarter defaults.",
        outcome: "Alert fatigue reduced by 60%. Zero critical alerts missed in 12-month period.",
      },
    ],
  },
  {
    category: "Partnership & Co-Build",
    cases: [
      {
        name: "Nomad",
        context: "Boutique travel operator with manual booking workflow and scaling ambitions.",
        challenge: "Founder had domain expertise but no technical partner. Previous agency builds failed twice.",
        approach: "Embedded as co-building partner. Shared product decisions, technical architecture, and operational strategy from day one.",
        outcome: "Automated 60% of booking operations. MP remains an equity partner in the ongoing venture.",
      },
    ],
  },
];

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-32 md:pt-40 pb-16">
          <div className="content-container">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Portfolio
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Organized by what we did, not who we did it for. Each project reflects a capability applied with depth.
            </p>
          </div>
        </section>

        {sections.map((section, si) => (
          <section key={si} className="border-t border-border py-16 md:py-24">
            <div className="content-container">
              <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-12">
                {section.category}
              </p>

              <div className="space-y-16">
                {section.cases.map((c, ci) => (
                  <div key={ci} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {c.name}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-2">Context</p>
                        <p className="text-sm text-foreground/80 leading-relaxed mb-6">{c.context}</p>
                        <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-2">Challenge</p>
                        <p className="text-sm text-foreground/80 leading-relaxed">{c.challenge}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-2">MP Approach</p>
                        <p className="text-sm text-foreground/80 leading-relaxed mb-6">{c.approach}</p>
                        <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-2">Outcome</p>
                        <p className="text-sm text-foreground/80 leading-relaxed">{c.outcome}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
