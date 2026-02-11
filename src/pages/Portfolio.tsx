import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Project visuals
import brandMeridian from "@/assets/portfolio/brand-meridian.jpg";
import brandTerravox from "@/assets/portfolio/brand-terravox.jpg";
import productUrbanflow from "@/assets/portfolio/product-urbanflow.jpg";
import productVaultline from "@/assets/portfolio/product-vaultline.jpg";
import aiPulseware from "@/assets/portfolio/ai-pulseware.jpg";
import cobuildNomad from "@/assets/portfolio/cobuild-nomad.jpg";

interface CaseStudy {
  name: string;
  context: string;
  type: string;
  image: string;
  challenge: string;
  approach: string;
  impact: string;
  variant: "hero" | "side" | "grid";
  tools?: string[];
  impactNumbers?: { label: string; value: string }[];
}

interface Section {
  number: string;
  category: string;
  cases: CaseStudy[];
}

const sections: Section[] = [
  {
    number: "01",
    category: "Brand & Positioning",
    cases: [
      {
        name: "Meridian Health",
        context: "Series A health-tech company entering a crowded wellness market.",
        type: "Brand Strategy · Identity System",
        image: brandMeridian,
        challenge: "Five different internal descriptions of what the company does. No positioning clarity.",
        approach: "Focused positioning sprint. Core narrative, competitive frame, and messaging architecture — two weeks.",
        impact: "Unified brand language across product, sales, and fundraising. Closed Series B with the new narrative.",
        variant: "hero",
        tools: ["Strategy", "Messaging", "Visual Identity", "Brand Guidelines"],
        impactNumbers: [
          { label: "Time to alignment", value: "2 weeks" },
          { label: "Result", value: "Series B closed" },
        ],
      },
      {
        name: "Terravox",
        context: "Climate intelligence startup pivoting from B2C to B2B.",
        type: "Rebrand · Enterprise Positioning",
        image: brandTerravox,
        challenge: "Consumer brand lacked credibility with enterprise buyers.",
        approach: "Complete rebrand — positioning, visual identity, and website built for institutional trust.",
        impact: "First three enterprise contracts signed within 90 days of launch.",
        variant: "side",
        tools: ["Positioning", "Identity", "Web Platform"],
        impactNumbers: [
          { label: "Enterprise contracts", value: "3 in 90 days" },
        ],
      },
    ],
  },
  {
    number: "02",
    category: "Products, Platforms & Systems",
    cases: [
      {
        name: "UrbanFlow",
        context: "Urban mobility company with fragmented tools across three cities.",
        type: "Operations Platform · System Design",
        image: productUrbanflow,
        challenge: "Operations running on spreadsheets, email, and four disconnected dashboards.",
        approach: "Unified operations platform — scheduling, routing, and reporting in one connected system.",
        impact: "40% reduction in operational overhead. Scaled to two additional cities without adding headcount.",
        variant: "side",
        tools: ["React", "Node.js", "PostgreSQL", "Mapbox"],
        impactNumbers: [
          { label: "Overhead reduction", value: "40%" },
          { label: "Cities scaled", value: "+2" },
        ],
      },
      {
        name: "Vaultline",
        context: "Institutional fintech managing complex multi-asset portfolios.",
        type: "Analytics Dashboard · Real-time Systems",
        image: productVaultline,
        challenge: "Legacy dashboard couldn't handle real-time data. Clients demanding modern interface.",
        approach: "Real-time analytics platform with sub-second updates, designed for decision-making under pressure.",
        impact: "Processing 2M+ data points daily. Client retention increased 25% in first quarter.",
        variant: "hero",
        tools: ["TypeScript", "D3.js", "WebSocket", "AWS"],
        impactNumbers: [
          { label: "Daily data points", value: "2M+" },
          { label: "Retention increase", value: "25%" },
        ],
      },
    ],
  },
  {
    number: "03",
    category: "AI & Automation",
    cases: [
      {
        name: "Pulseware",
        context: "Clinical monitoring platform with manual alert triage.",
        type: "ML Integration · Clinical UX",
        image: aiPulseware,
        challenge: "Nurses spending 30% of shift reviewing non-critical alerts.",
        approach: "ML-based alert prioritization integrated into existing workflow. No new interfaces — smarter defaults.",
        impact: "Alert fatigue reduced by 60%. Zero critical alerts missed in 12 months.",
        variant: "grid",
        tools: ["React", "TensorFlow", "FHIR API", "WebSocket"],
        impactNumbers: [
          { label: "Alert fatigue reduction", value: "60%" },
          { label: "Critical alerts missed", value: "0" },
          { label: "Deployment sites", value: "12" },
        ],
      },
    ],
  },
  {
    number: "04",
    category: "Partnership & Co-Build",
    cases: [
      {
        name: "Nomad",
        context: "Boutique travel operator with scaling ambitions and no technical partner.",
        type: "Co-Build · Equity Partnership",
        image: cobuildNomad,
        challenge: "Domain expertise without technical capability. Two previous agency builds failed.",
        approach: "Embedded as co-building partner. Shared product decisions, architecture, and strategy from day one.",
        impact: "60% of booking operations automated. MP remains equity partner in the ongoing venture.",
        variant: "hero",
        tools: ["Next.js", "Prisma", "Stripe", "Vercel"],
        impactNumbers: [
          { label: "Automation", value: "60%" },
          { label: "Partnership", value: "Equity" },
        ],
      },
    ],
  },
];

// Fade-in hook
const useFadeIn = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, style: { opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" } };
};

// Narrative row
const NarrativeRow = ({ label, text }: { label: string; text: string }) => (
  <div className="flex items-start gap-4 md:gap-6">
    <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase w-24 shrink-0 pt-0.5">
      {label}
    </span>
    <span className="text-sm text-foreground/80 leading-relaxed">{text}</span>
  </div>
);

// Project detail modal
const ProjectModal = ({ project, onClose }: { project: CaseStudy | null; onClose: () => void }) => {
  useEffect(() => {
    if (project) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background overflow-y-auto" style={{ animation: "fadeIn 0.3s ease-out" }}>
      <button
        onClick={onClose}
        className="fixed top-6 right-6 md:top-8 md:right-10 z-[110] text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        Close
      </button>

      <img src={project.image} alt={project.name} className="w-full h-[55vh] md:h-[65vh] object-cover" />

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-4">{project.type}</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">{project.name}</h1>
        <p className="text-lg text-muted-foreground mb-16">{project.context}</p>

        <div className="space-y-6 mb-16">
          <NarrativeRow label="Challenge" text={project.challenge} />
          <div className="border-t border-border" />
          <NarrativeRow label="Approach" text={project.approach} />
          <div className="border-t border-border" />
          <NarrativeRow label="Impact" text={project.impact} />
        </div>

        {project.impactNumbers && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
            {project.impactNumbers.map((n, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-foreground mb-1">{n.value}</p>
                <p className="text-xs text-muted-foreground tracking-widest uppercase">{n.label}</p>
              </div>
            ))}
          </div>
        )}

        {project.tools && (
          <div className="mb-16">
            <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-4">Tools & Methods</p>
            <div className="flex flex-wrap gap-3">
              {project.tools.map((t, i) => (
                <span key={i} className="text-xs text-foreground/70 border border-border px-3 py-1.5">{t}</span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="text-sm font-medium text-foreground border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
        >
          Back to Portfolio
        </button>
      </div>
    </div>
  );
};

// Variation A — Full-Bleed Hero
const CaseHero = ({ c, onClick }: { c: CaseStudy; onClick: () => void }) => {
  const fade = useFadeIn();
  return (
    <div ref={fade.ref} style={fade.style} className="cursor-pointer group" onClick={onClick}>
      <div className="relative overflow-hidden">
        <img
          src={c.image}
          alt={c.name}
          className="w-full h-[32rem] md:h-[40rem] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute bottom-8 left-6 md:left-10">
          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">{c.type}</p>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground">{c.name}</h3>
        </div>
      </div>
      <div className="content-container mt-8">
        <p className="text-base text-muted-foreground mb-8 max-w-xl">{c.context}</p>
        <div className="space-y-4">
          <NarrativeRow label="Challenge" text={c.challenge} />
          <NarrativeRow label="Approach" text={c.approach} />
          <NarrativeRow label="Impact" text={c.impact} />
        </div>
      </div>
    </div>
  );
};

// Variation B — Side-by-Side
const CaseSide = ({ c, onClick }: { c: CaseStudy; onClick: () => void }) => {
  const fade = useFadeIn();
  return (
    <div ref={fade.ref} style={fade.style} className="cursor-pointer group" onClick={onClick}>
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="overflow-hidden">
            <img
              src={c.image}
              alt={c.name}
              className="w-full h-[24rem] md:h-[32rem] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-3">{c.type}</p>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4 relative inline-block">
              {c.name}
            </h3>
            <p className="text-base text-muted-foreground mb-10">{c.context}</p>
            <div className="space-y-4">
              <NarrativeRow label="Challenge" text={c.challenge} />
              <NarrativeRow label="Approach" text={c.approach} />
              <NarrativeRow label="Impact" text={c.impact} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Variation C — Grid
const CaseGrid = ({ c, onClick }: { c: CaseStudy; onClick: () => void }) => {
  const fade = useFadeIn();
  return (
    <div ref={fade.ref} style={fade.style} className="cursor-pointer group" onClick={onClick}>
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="overflow-hidden">
            <img
              src={c.image}
              alt={c.name}
              className="w-full h-[18rem] md:h-[24rem] object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
          <div className="overflow-hidden">
            <img
              src={c.image}
              alt={c.name}
              className="w-full h-[18rem] md:h-[24rem] object-cover object-bottom transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground tracking-widest uppercase mb-3">{c.type}</p>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">{c.name}</h3>
        <p className="text-base text-muted-foreground mb-10 max-w-xl">{c.context}</p>
        <div className="space-y-4">
          <NarrativeRow label="Challenge" text={c.challenge} />
          <NarrativeRow label="Approach" text={c.approach} />
          <NarrativeRow label="Impact" text={c.impact} />
        </div>
      </div>
    </div>
  );
};

const CaseRenderer = ({ c, onClick }: { c: CaseStudy; onClick: () => void }) => {
  switch (c.variant) {
    case "hero": return <CaseHero c={c} onClick={onClick} />;
    case "side": return <CaseSide c={c} onClick={onClick} />;
    case "grid": return <CaseGrid c={c} onClick={onClick} />;
  }
};

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Title */}
        <section className="pt-32 md:pt-40 pb-20 md:pb-28">
          <div className="content-container">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              Portfolio
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Selected work that shows clarity, impact, and systems thinking.
            </p>
          </div>
        </section>

        {/* Sections */}
        {sections.map((section) => (
          <section key={section.number} className="mb-24 md:mb-32">
            {/* Section header */}
            <div className="content-container mb-16">
              <div className="flex items-baseline gap-6 mb-4">
                <span className="text-5xl md:text-6xl font-bold text-border">{section.number}</span>
                <h2 className="text-xl md:text-2xl font-semibold text-foreground">{section.category}</h2>
              </div>
              <div className="border-t border-border" />
            </div>

            {/* Cases */}
            <div className="space-y-20 md:space-y-28">
              {section.cases.map((c, ci) => (
                <CaseRenderer key={ci} c={c} onClick={() => setSelectedProject(c)} />
              ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};

export default Portfolio;
