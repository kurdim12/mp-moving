import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const capabilities = [
  {
    title: "Brand & Positioning",
    description: "Clarity before aesthetics. We define what matters and give teams language they can build with.",
    href: "/what-we-build",
  },
  {
    title: "Products, Platforms & Systems",
    description: "Connected digital systems designed to scale with decisions, not just traffic.",
    href: "/what-we-build",
  },
  {
    title: "AI & Automation",
    description: "Applied only where it removes friction, increases leverage, or changes how work gets done.",
    href: "/what-we-build",
  },
  {
    title: "Partnership & Co-Build",
    description: "Long-term collaborations with shared ownership. Some start as builds. The right ones become ventures.",
    href: "/ventures",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="min-h-[85vh] flex flex-col justify-center pt-20">
          <div className="content-container">
            <div className="max-w-3xl">
              <h1 className="fade-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-foreground mb-8">
                Built with founders.<br />
                Built for the long term.
              </h1>
              <p className="fade-up fade-up-delay-1 text-lg md:text-xl text-muted-foreground max-w-lg">
                We design brands, systems, and ventures that move people forward.
              </p>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="section-padding border-t border-border">
          <div className="content-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {capabilities.map((cap, i) => (
                <Link
                  key={i}
                  to={cap.href}
                  className="bg-background p-8 md:p-12 group transition-colors duration-300 hover:bg-muted/30"
                >
                  <h3 className="text-base font-semibold text-foreground mb-3 relative inline-block after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-foreground after:transition-all after:duration-300 group-hover:after:w-full">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cap.description}
                  </p>
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

export default Index;
