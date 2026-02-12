import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { portfolioItems } from "@/components/portfolio/PortfolioData";
import type { PortfolioItem } from "@/components/portfolio/PortfolioData";

const sectionOrder = [
  "introduction",
  "clients",
  "capabilities",
  "outcomes",
  "process",
  "leadership",
] as const;

const sectionLabels: Record<string, string> = {
  introduction: "Introduction",
  clients: "MaraNasi — Brand Rebirth",
  capabilities: "Expertise & Capabilities",
  outcomes: "Outcomes",
  process: "Process",
  leadership: "Leadership",
};

/* ── Section content renderers ── */

const IntroductionContent = ({ item }: { item: PortfolioItem }) => (
  <div className="fade-up">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 mb-16">
      <div>
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
          Overview
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-foreground/80">
          {item.tagline}
        </p>
      </div>
      <div>
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
          Year
        </p>
        <p className="text-lg text-foreground">{item.year}</p>
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4 mt-8">
          Category
        </p>
        <p className="text-lg text-foreground">{item.category}</p>
      </div>
    </div>

    <div className="border-t border-foreground pt-12">
      <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">
        Context
      </p>
      <p className="text-base md:text-lg leading-relaxed text-foreground/70 max-w-2xl">
        {item.context}
      </p>
    </div>

    <div className="border-t border-border pt-12 mt-12">
      <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">
        Tags
      </p>
      <div className="flex flex-wrap gap-3">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-medium tracking-[0.15em] uppercase px-3 py-1.5 border border-border text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ClientsContent = ({ item }: { item: PortfolioItem }) => (
  <div className="fade-up">
    <div className="mb-16">
      <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">
        Project
      </p>
      <div className="flex items-center gap-6 mb-8">
        <span className="text-6xl md:text-8xl font-medium tracking-tight text-muted-foreground/10 leading-none select-none">
          {item.initials}
        </span>
        <div>
          <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
            {item.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{item.descriptor}</p>
        </div>
      </div>
    </div>

    <div className="border-t border-foreground pt-12">
      <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">
        Engagement
      </p>
      <p className="text-base md:text-lg leading-relaxed text-foreground/70 max-w-2xl">
        {item.context}
      </p>
    </div>

    {item.microSignal && (
      <div className="border-t border-border pt-12 mt-12">
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
          Signal
        </p>
        <p className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
          {item.microSignal}
        </p>
      </div>
    )}
  </div>
);

const CapabilitiesContent = ({ item }: { item: PortfolioItem }) => (
  <div className="fade-up">
    <div className="mb-12">
      <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">
        What We Built
      </p>
    </div>

    <div>
      {item.modules.map((mod, i) => (
        <div
          key={mod.name}
          className={`py-10 md:py-12 ${i > 0 ? "border-t border-border" : "border-t border-foreground"}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <div>
              <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground mb-2">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h4 className="text-xl md:text-2xl font-medium tracking-tight text-foreground">
                {mod.name}
              </h4>
            </div>
            <div>
              <p className="text-base leading-relaxed text-foreground/60 mb-4">
                {mod.description}
              </p>
              <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground px-2 py-1 border border-border inline-block">
                {mod.deliverable}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const OutcomesContent = ({ item }: { item: PortfolioItem }) => (
  <div className="fade-up">
    <div className="mb-16">
      <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">
        Impact
      </p>
      <div className="space-y-6">
        {item.impactStatements.map((statement, i) => (
          <div key={i} className="flex items-start gap-4">
            <span className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground mt-2 w-5 flex-shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-xl md:text-2xl font-medium tracking-tight text-foreground leading-snug">
              {statement}
            </p>
          </div>
        ))}
      </div>
    </div>

    <div className="border-t border-foreground pt-12">
      <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">
        Deliverables
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
        {item.deliverables.map((d) => (
          <div key={d} className="flex items-center gap-2">
            <div className="w-1 h-1 bg-foreground/40 flex-shrink-0" />
            <span className="text-sm text-foreground/60">{d}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProcessContent = ({ item }: { item: PortfolioItem }) => (
  <div className="fade-up">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
      <div>
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">
          How We Worked
        </p>
        <p className="text-base md:text-lg leading-relaxed text-foreground/70">
          {item.process}
        </p>
      </div>
      <div>
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">
          Approach
        </p>
        <div className="space-y-4">
          {item.tags.map((tag, i) => (
            <div key={tag} className="flex items-center gap-3">
              <span className="text-[10px] font-medium text-muted-foreground w-5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-base text-foreground">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const LeadershipContent = ({ item }: { item: PortfolioItem }) => (
  <div className="fade-up">
    {item.founderQuote ? (
      <div className="mb-16">
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
          From the Founder
        </p>
        <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-foreground leading-[1.2] max-w-3xl mb-6">
          "{item.founderQuote}"
        </blockquote>
        {item.founderName && (
          <p className="text-sm text-muted-foreground">
            — {item.founderName}, {item.founderRole}
          </p>
        )}
      </div>
    ) : (
      <div className="mb-16">
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
          Partnership
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-foreground/70 max-w-2xl">
          We worked alongside the {item.name} team as partners — sharing ownership, risk, and ambition from start to finish.
        </p>
      </div>
    )}

    <div className="border-t border-foreground pt-12">
      <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">
        Ready to build?
      </p>
      <a
        href="/#contact"
        className="inline-block text-base font-medium text-foreground underline underline-offset-4 hover:opacity-60 transition-opacity"
      >
        Start a conversation
      </a>
    </div>
  </div>
);

const contentMap: Record<string, React.FC<{ item: PortfolioItem }>> = {
  introduction: IntroductionContent,
  clients: ClientsContent,
  capabilities: CapabilitiesContent,
  outcomes: OutcomesContent,
  process: ProcessContent,
  leadership: LeadershipContent,
};

/* ─── Main section page ─── */
const PortfolioSection = () => {
  const { slug, section } = useParams<{ slug: string; section: string }>();
  const item = portfolioItems.find((p) => p.slug === slug);

  if (!item || !section || !sectionLabels[section]) {
    return <Navigate to="/portfolio" replace />;
  }

  const currentIdx = sectionOrder.indexOf(section as (typeof sectionOrder)[number]);
  const prevSection = currentIdx > 0 ? sectionOrder[currentIdx - 1] : null;
  const nextSection = currentIdx < sectionOrder.length - 1 ? sectionOrder[currentIdx + 1] : null;

  const ContentComponent = contentMap[section];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Breadcrumb */}
        <section className="pt-32 md:pt-40 pb-8">
          <div className="content-container">
            <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] uppercase text-muted-foreground">
              <Link to="/portfolio" className="hover:text-foreground transition-colors duration-200">
                Portfolio
              </Link>
              <span>/</span>
              <Link to={`/portfolio/${slug}`} className="hover:text-foreground transition-colors duration-200">
                {item.name}
              </Link>
              <span>/</span>
              <span className="text-foreground">{sectionLabels[section]}</span>
            </div>
          </div>
        </section>

        {/* Section title */}
        <section className="pb-12 md:pb-16">
          <div className="content-container">
            <h1 className="fade-up text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-foreground">
              {sectionLabels[section]}
            </h1>
            <div className="border-t border-foreground mt-8" />
          </div>
        </section>

        {/* Content */}
        <section className="pb-24 md:pb-32">
          <div className="content-container">
            {ContentComponent && <ContentComponent item={item} />}
          </div>
        </section>

        {/* Prev / Next navigation */}
        <section className="pb-24 md:pb-32">
          <div className="content-container">
            <div className="border-t border-border pt-12 flex items-center justify-between">
              {prevSection ? (
                <Link
                  to={`/portfolio/${slug}/${prevSection}`}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  ← {sectionLabels[prevSection]}
                </Link>
              ) : (
                <Link
                  to={`/portfolio/${slug}`}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  ← Overview
                </Link>
              )}
              {nextSection ? (
                <Link
                  to={`/portfolio/${slug}/${nextSection}`}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {sectionLabels[nextSection]} →
                </Link>
              ) : (
                <Link
                  to={`/portfolio/${slug}`}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Overview →
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioSection;
