import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { portfolioItems } from "@/components/portfolio/PortfolioData";

const sections = [
  { key: "introduction", label: "Introduction" },
  { key: "clients", label: "Select Clients" },
  { key: "capabilities", label: "Expertise & Capabilities" },
  { key: "outcomes", label: "Outcomes" },
  { key: "process", label: "Process" },
  { key: "leadership", label: "Leadership" },
] as const;

const PortfolioProject = () => {
  const { slug } = useParams<{ slug: string }>();
  const item = portfolioItems.find((p) => p.slug === slug);

  if (!item) return <Navigate to="/portfolio" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Project header */}
        <section className="pt-32 md:pt-40 pb-12 md:pb-16">
          <div className="content-container">
            <Link
              to="/portfolio"
              className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8 inline-block"
            >
              ← All Projects
            </Link>
            <h1 className="fade-up text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05] text-foreground mb-4">
              {item.name}
            </h1>
            <p className="fade-up fade-up-delay-1 text-lg md:text-xl text-muted-foreground max-w-xl">
              {item.tagline}
            </p>
          </div>
        </section>

        {/* 2×3 Grid */}
        <section className="pb-24 md:pb-32">
          <div className="content-container">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {sections.map((section, i) => (
                <Link
                  key={section.key}
                  to={`/portfolio/${slug}/${section.key}`}
                  className="group block border-t border-foreground px-6 md:px-8 py-12 md:py-16 lg:py-20 hover:bg-muted/20 transition-colors duration-150 cursor-pointer"
                  style={{
                    animationDelay: `${i * 60}ms`,
                  }}
                >
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-foreground leading-tight group-hover:text-foreground transition-colors duration-150">
                    {section.label}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioProject;
