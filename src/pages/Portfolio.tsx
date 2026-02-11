import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import brandMeridian from "@/assets/portfolio/brand-meridian.jpg";
import brandTerravox from "@/assets/portfolio/brand-terravox.jpg";
import productUrbanflow from "@/assets/portfolio/product-urbanflow.jpg";
import productVaultline from "@/assets/portfolio/product-vaultline.jpg";
import aiPulseware from "@/assets/portfolio/ai-pulseware.jpg";
import cobuildNomad from "@/assets/portfolio/cobuild-nomad.jpg";

interface Case {
  name: string;
  descriptor: string;
  metric: { value: string; label: string };
  image: string;
  challenge: string;
  approach: string;
  outcome: string;
  hero?: boolean;
  tools?: string[];
  impactNumbers?: { value: string; label: string }[];
}

interface PillarSection {
  number: string;
  title: string;
  cases: Case[];
  bg: "white" | "neutral";
}

const pillars: PillarSection[] = [
  {
    number: "01",
    title: "Brand Systems",
    bg: "white",
    cases: [
      {
        name: "Meridian Health",
        descriptor: "Brand strategy and identity system for a Series A health-tech company.",
        metric: { value: "Series B", label: "closed with new narrative" },
        image: brandMeridian,
        challenge: "Five competing internal narratives. No positioning clarity. Investors couldn't repeat the pitch.",
        approach: "Two-week positioning sprint. Defined core narrative, competitive frame, and full messaging architecture.",
        outcome: "Unified brand language adopted across product, sales, and fundraising. Series B closed on the new narrative.",
        hero: true,
        tools: ["Strategy", "Messaging Architecture", "Visual Identity", "Brand Guidelines"],
        impactNumbers: [{ value: "2 wks", label: "To alignment" }, { value: "Series B", label: "Closed" }],
      },
      {
        name: "Terravox",
        descriptor: "Enterprise rebrand for a climate intelligence platform pivoting B2C to B2B.",
        metric: { value: "3 contracts", label: "in 90 days" },
        image: brandTerravox,
        challenge: "Consumer-facing brand lacked credibility with enterprise buyers.",
        approach: "Complete rebrand — positioning, identity, and website built to signal institutional trust.",
        outcome: "First three enterprise contracts signed within 90 days of rebrand launch.",
        tools: ["Positioning", "Visual Identity", "Web Platform"],
        impactNumbers: [{ value: "90 days", label: "To first contracts" }],
      },
    ],
  },
  {
    number: "02",
    title: "Product Systems",
    bg: "neutral",
    cases: [
      {
        name: "UrbanFlow",
        descriptor: "Unified operations platform for an urban mobility company across three cities.",
        metric: { value: "–40%", label: "operational overhead" },
        image: productUrbanflow,
        challenge: "Operations fragmented across spreadsheets, email, and four disconnected dashboards.",
        approach: "Single connected system — scheduling, routing, and reporting designed as infrastructure, not features.",
        outcome: "40% reduction in operational overhead. Scaled to two additional cities without adding headcount.",
        tools: ["React", "Node.js", "PostgreSQL", "Mapbox"],
        impactNumbers: [{ value: "–40%", label: "Overhead" }, { value: "+2", label: "Cities scaled" }],
      },
      {
        name: "Vaultline",
        descriptor: "Real-time analytics platform for institutional multi-asset portfolio management.",
        metric: { value: "2M+", label: "daily data points" },
        image: productVaultline,
        challenge: "Legacy dashboard couldn't handle real-time data at scale. Clients demanding modern interface.",
        approach: "Sub-second analytics platform designed for decision-making under pressure, not passive monitoring.",
        outcome: "Processing 2M+ data points daily. Client retention increased 25% in first quarter after launch.",
        hero: true,
        tools: ["TypeScript", "D3.js", "WebSocket", "AWS"],
        impactNumbers: [{ value: "2M+", label: "Data points/day" }, { value: "+25%", label: "Retention" }],
      },
    ],
  },
  {
    number: "03",
    title: "AI & Automation",
    bg: "white",
    cases: [
      {
        name: "Pulseware",
        descriptor: "ML-based alert prioritization for a clinical patient monitoring platform.",
        metric: { value: "–60%", label: "alert fatigue" },
        image: aiPulseware,
        challenge: "Nurses spending 30% of every shift reviewing non-critical alerts. Alert fatigue was a safety risk.",
        approach: "Integrated ML prioritization into existing workflow. No new interfaces — just smarter defaults embedded into daily operations.",
        outcome: "Alert fatigue reduced 60%. Zero critical alerts missed across 12 clinical sites in 12 months.",
        hero: true,
        tools: ["TensorFlow", "React", "FHIR API", "WebSocket"],
        impactNumbers: [{ value: "–60%", label: "Alert fatigue" }, { value: "0", label: "Missed critical" }, { value: "12", label: "Sites deployed" }],
      },
    ],
  },
  {
    number: "04",
    title: "Co-Build Partnerships",
    bg: "neutral",
    cases: [
      {
        name: "Nomad",
        descriptor: "Equity co-build with a boutique travel operator scaling custom itinerary operations.",
        metric: { value: "60%", label: "automation" },
        image: cobuildNomad,
        challenge: "Founder had deep domain expertise but no technical partner. Two previous agency builds had failed.",
        approach: "Embedded as co-building partner from day one. Shared product decisions, technical architecture, and operational strategy.",
        outcome: "60% of booking operations automated. MP remains an equity partner in the ongoing venture.",
        hero: true,
        tools: ["Next.js", "Prisma", "Stripe", "Vercel"],
        impactNumbers: [{ value: "60%", label: "Automated" }, { value: "Equity", label: "Partnership" }],
      },
    ],
  },
];

// Scroll fade-in
const useFade = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, className: `transition-all duration-700 ease-out ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}` };
};

// Narrative block
const Block = ({ label, text }: { label: string; text: string }) => (
  <div>
    <p className="text-[11px] font-semibold text-muted-foreground tracking-[0.15em] uppercase mb-2">{label}</p>
    <p className="text-[15px] text-foreground/75 leading-relaxed">{text}</p>
  </div>
);

// Detail modal
const DetailModal = ({ c, onClose }: { c: Case | null; onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = c ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [c]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  if (!c) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-background overflow-y-auto" style={{ animation: "fadeIn 0.3s ease-out" }}>
      <button onClick={onClose} className="fixed top-6 right-6 md:top-8 md:right-10 z-[110] text-sm text-muted-foreground hover:text-foreground transition-colors">
        Close
      </button>
      <img src={c.image} alt={c.name} className="w-full h-[50vh] md:h-[60vh] object-cover" />
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">{c.name}</h1>
        <p className="text-base text-muted-foreground mb-16">{c.descriptor}</p>
        {c.impactNumbers && (
          <div className="flex gap-12 mb-16">
            {c.impactNumbers.map((n, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-bold text-foreground">{n.value}</p>
                <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">{n.label}</p>
              </div>
            ))}
          </div>
        )}
        <div className="space-y-8 mb-16">
          <Block label="Challenge" text={c.challenge} />
          <Block label="Approach" text={c.approach} />
          <Block label="Outcome" text={c.outcome} />
        </div>
        {c.tools && (
          <div className="mb-16">
            <p className="text-[11px] font-semibold text-muted-foreground tracking-[0.15em] uppercase mb-4">Tools & Methods</p>
            <div className="flex flex-wrap gap-2">
              {c.tools.map((t, i) => (
                <span key={i} className="text-xs text-foreground/60 border border-border px-3 py-1.5">{t}</span>
              ))}
            </div>
          </div>
        )}
        <button onClick={onClose} className="text-sm font-medium text-foreground border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-300">
          Back to Portfolio
        </button>
      </div>
    </div>
  );
};

// Hero case layout
const HeroCase = ({ c, onClick }: { c: Case; onClick: () => void }) => {
  const f = useFade();
  return (
    <div ref={f.ref} className={f.className}>
      <div className="cursor-pointer group" onClick={onClick}>
        <div className="relative overflow-hidden">
          <img src={c.image} alt={c.name} className="w-full h-[28rem] md:h-[38rem] object-cover transition-transform duration-700 group-hover:scale-[1.015]" loading="lazy" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
        </div>
        <div className="content-container mt-8">
          <div className="flex items-start justify-between gap-8 mb-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">{c.name}</h3>
              <p className="text-sm text-muted-foreground max-w-lg">{c.descriptor}</p>
            </div>
            <div className="text-right shrink-0 hidden md:block">
              <p className="text-2xl font-bold text-foreground">{c.metric.value}</p>
              <p className="text-xs text-muted-foreground tracking-widest uppercase">{c.metric.label}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Block label="Challenge" text={c.challenge} />
            <Block label="Approach" text={c.approach} />
            <Block label="Outcome" text={c.outcome} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Standard case layout
const StandardCase = ({ c, onClick }: { c: Case; onClick: () => void }) => {
  const f = useFade();
  return (
    <div ref={f.ref} className={f.className}>
      <div className="content-container cursor-pointer group" onClick={onClick}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-14">
          <div className="overflow-hidden">
            <img src={c.image} alt={c.name} className="w-full h-[22rem] md:h-[28rem] object-cover transition-transform duration-700 group-hover:scale-[1.015]" loading="lazy" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-start justify-between gap-6 mb-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-2">{c.name}</h3>
                <p className="text-sm text-muted-foreground">{c.descriptor}</p>
              </div>
              <div className="text-right shrink-0 hidden md:block">
                <p className="text-xl font-bold text-foreground">{c.metric.value}</p>
                <p className="text-[10px] text-muted-foreground tracking-widest uppercase">{c.metric.label}</p>
              </div>
            </div>
            <div className="space-y-6">
              <Block label="Challenge" text={c.challenge} />
              <Block label="Approach" text={c.approach} />
              <Block label="Outcome" text={c.outcome} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [selected, setSelected] = useState<Case | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Title */}
        <section className="pt-32 md:pt-40 pb-20 md:pb-28">
          <div className="content-container">
            <h1 className="fade-up text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              Portfolio
            </h1>
            <p className="fade-up fade-up-delay-1 text-lg text-muted-foreground max-w-lg">
              Selected work that shows clarity, impact, and systems thinking.
            </p>
          </div>
        </section>

        {/* Pillar sections */}
        {pillars.map((pillar) => (
          <section
            key={pillar.number}
            className={`py-20 md:py-28 ${pillar.bg === "neutral" ? "bg-muted/30" : "bg-background"}`}
          >
            {/* Section header */}
            <div className="content-container mb-16 md:mb-20">
              <div className="flex items-end gap-6">
                <span className="text-[5rem] md:text-[7rem] font-bold leading-none text-border/60 -mb-2">
                  {pillar.number}
                </span>
                <div className="pb-3">
                  <h2 className="text-lg md:text-xl font-semibold text-foreground tracking-tight">
                    {pillar.title}
                  </h2>
                </div>
              </div>
              <div className="border-t border-border mt-6" />
            </div>

            {/* Cases */}
            <div className="space-y-20 md:space-y-28">
              {pillar.cases.map((c, ci) =>
                c.hero ? (
                  <HeroCase key={ci} c={c} onClick={() => setSelected(c)} />
                ) : (
                  <StandardCase key={ci} c={c} onClick={() => setSelected(c)} />
                )
              )}
            </div>
          </section>
        ))}
      </main>
      <Footer />
      <DetailModal c={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default Portfolio;
