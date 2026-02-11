import Header from "@/components/Header";
import Footer from "@/components/Footer";

const capabilities = [
  {
    title: "Brand & Positioning",
    what: "Defining direction, message, and market clarity before anything is built.",
    how: "We start with the question most teams skip: what does this actually need to mean? We work through positioning, naming, messaging architecture, and visual identity as a connected system — not isolated deliverables.",
    when: "When a company is launching, repositioning, or has outgrown its current narrative. When the team can't articulate what they do in one sentence.",
    deliver: "Positioning strategy, messaging framework, brand identity system, and guidelines that teams can actually use to build consistently.",
  },
  {
    title: "Products, Platforms & Systems",
    what: "Digital products, internal tools, and workflows designed as connected systems.",
    how: "We treat every build as infrastructure. Not features in isolation, but systems that connect decisions, data, and people. Architecture before interface. Logic before layout.",
    when: "When you need a product that scales with decision-making, not just users. When disconnected tools are slowing your team down.",
    deliver: "Web platforms, internal tools, operational systems, and the technical architecture to support them long-term.",
  },
  {
    title: "AI & Automation",
    what: "Applied intelligence — only where it creates real leverage.",
    how: "We evaluate where AI actually changes how work gets done versus where it's just noise. Then we build it into existing systems, not as standalone experiments.",
    when: "When manual processes are the bottleneck. When there's a clear, measurable outcome — not when AI is the trend of the quarter.",
    deliver: "Integrated AI workflows, automated decision systems, and intelligent tooling embedded into your operations.",
  },
  {
    title: "Partnership & Co-Build",
    what: "Long-term collaborations with shared ownership and shared risk.",
    how: "We embed alongside founding teams. We think, build, and decide together. Partnerships start as build work. The right ones evolve into ventures.",
    when: "When you need a committed partner, not a vendor. When the work requires someone who thinks like an owner.",
    deliver: "A working partner with skin in the game. Shared accountability, shared upside, and a relationship built to last.",
  },
];

const WhatWeBuild = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-32 md:pt-40 pb-16">
          <div className="content-container">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              What We Build
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Systems, not services. Each capability is a discipline we apply with depth — not a menu item.
            </p>
          </div>
        </section>

        {capabilities.map((cap, i) => (
          <section key={i} className="border-t border-border py-16 md:py-24">
            <div className="content-container">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-12">
                {cap.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                <div>
                  <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-3">
                    What It Is
                  </p>
                  <p className="text-base text-foreground/80 leading-relaxed mb-10">
                    {cap.what}
                  </p>

                  <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-3">
                    How MP Approaches It
                  </p>
                  <p className="text-base text-foreground/80 leading-relaxed">
                    {cap.how}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-3">
                    When It Fits
                  </p>
                  <p className="text-base text-foreground/80 leading-relaxed mb-10">
                    {cap.when}
                  </p>

                  <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase mb-3">
                    What We Deliver
                  </p>
                  <p className="text-base text-foreground/80 leading-relaxed">
                    {cap.deliver}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default WhatWeBuild;
