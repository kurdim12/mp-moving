import { RevealGroup, Reveal, RevealDivider } from "@/components/RevealOnScroll";

const services = [
  {
    title: "Brand & Positioning",
    description: "Clarity before aesthetics. We define what matters. We remove what does not. We shape language teams can build with.",
    philosophy: "A brand is not a logo. It is shared understanding. It is direction made visible. When positioning is precise, trust compounds.",
  },
  {
    title: "Products, Platforms & Systems",
    description: "Architecture before interface. We design and build digital products, internal tools, and workflows as connected systems.",
    philosophy: "Speed without structure creates fragility. Systems create stability. Stability creates growth.",
  },
  {
    title: "AI & Automation",
    description: "Applied selectively. We use AI where it removes friction, increases leverage, or fundamentally changes how work gets done.",
    philosophy: "No automation without direction. Technology is only powerful when aligned with judgment.",
  },
  {
    title: "Partnership & Co-Building",
    description: "Ownership over output. We do not operate as a transactional vendor. We operate as a long-term partner.",
    philosophy: "Momentum requires shared responsibility. Alignment requires trust. Selectively.",
  },
];

const ServicesSection = () => {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="content-container">
        <RevealGroup className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 lg:p-16">
          <Reveal className="mb-12 md:mb-16">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-primary-foreground/50 mb-4">
              What We Build
            </p>
            <p className="text-xl md:text-2xl font-medium text-primary-foreground/80 max-w-lg">
              Partnership with purpose.
            </p>
          </Reveal>

          <div className="relative grid md:grid-cols-2">
            {/* Grid lines */}
            <div className="hidden md:block absolute left-1/2 top-6 bottom-6 w-px bg-primary-foreground/10" />
            <div className="hidden md:block absolute top-1/2 left-6 right-6 h-px bg-primary-foreground/10" />
            <div className="md:hidden absolute left-6 right-6 top-1/4 h-px bg-primary-foreground/10" />
            <div className="md:hidden absolute left-6 right-6 top-2/4 h-px bg-primary-foreground/10" />
            <div className="md:hidden absolute left-6 right-6 top-3/4 h-px bg-primary-foreground/10" />

            {services.map((service, index) => (
              <Reveal key={index} delay={100 + index * 120}>
                <div className="p-6 md:p-8 lg:p-10">
                  <h3 className="text-lg md:text-xl font-medium text-primary-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-primary-foreground/70 leading-relaxed mb-4 text-[15px]">
                    {service.description}
                  </p>
                  <p className="text-primary-foreground/40 leading-relaxed text-sm italic">
                    {service.philosophy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
};

export default ServicesSection;
