import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PortfolioItem {
  name: string;
  category: string;
  description: string;
  initials: string;
  url?: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    name: "Meridian",
    category: "Brand & Digital Identity",
    description: "End-to-end brand system and digital presence for a climate infrastructure company.",
    initials: "ME",
  },
  {
    name: "Arcline",
    category: "Products & Platforms",
    description: "Custom operations platform connecting field teams, logistics, and real-time reporting.",
    initials: "AR",
  },
  {
    name: "Nørd Studio",
    category: "Strategy & Positioning",
    description: "Strategic repositioning and go-to-market framework for a Nordic design collective.",
    initials: "NØ",
  },
  {
    name: "Verra Health",
    category: "AI & Automation",
    description: "Intelligent intake and triage system reducing patient wait times by 40%.",
    initials: "VH",
  },
  {
    name: "Baseform",
    category: "Partnership & Co-Building",
    description: "Co-founded construction tech platform. From concept to 12-person team in 14 months.",
    initials: "BF",
  },
  {
    name: "Halcyon Capital",
    category: "Brand & Digital Identity",
    description: "Visual identity and investor portal for an emerging markets private equity fund.",
    initials: "HC",
  },
  {
    name: "Kindra",
    category: "Products & Platforms",
    description: "Membership platform and community tools for a wellness brand scaling across Europe.",
    initials: "KI",
  },
  {
    name: "Terrace",
    category: "Strategy & Positioning",
    description: "Product-market fit validation and launch strategy for a proptech startup.",
    initials: "TE",
  },
  {
    name: "Caspian",
    category: "AI & Automation",
    description: "Internal knowledge engine automating compliance workflows for a fintech firm.",
    initials: "CA",
  },
  {
    name: "Outline Labs",
    category: "Partnership & Co-Building",
    description: "Joint venture building developer tools. Equity partnership with shared roadmap.",
    initials: "OL",
  },
];

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 md:pt-40 pb-16 md:pb-24">
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

        {/* Grid */}
        <section className="pb-24 md:pb-32">
          <div className="content-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-border">
              {portfolioItems.map((item, index) => (
                <div
                  key={item.name}
                  className="bg-background p-8 md:p-10 flex flex-col justify-between min-h-[280px] group hover:bg-card transition-colors duration-500"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Top: Initials as logo placeholder */}
                  <div>
                    <div className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-4 transition-transform duration-500 group-hover:-translate-y-0.5">
                      {item.initials}
                    </div>
                    <span className="inline-block text-[11px] font-medium tracking-widest uppercase text-muted-foreground mb-4">
                      {item.category}
                    </span>
                  </div>

                  {/* Bottom: Name + description */}
                  <div>
                    <h3 className="text-base font-medium text-foreground mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom signal */}
        <section className="pb-24 md:pb-32">
          <div className="content-container">
            <div className="section-divider pt-16 md:pt-20">
              <p className="body-medium max-w-lg">
                We don't showcase everything we build. If you're curious about working together,{" "}
                <a href="/#contact" className="text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                  start a conversation
                </a>.
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
