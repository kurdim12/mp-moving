import AnimatedReveal, { AnimatedChild } from "@/components/AnimatedReveal";

const services = [
  {
    title: "Brand & Positioning",
    description:
      "Clarity before aesthetics. We define what matters. We remove what does not. We shape language teams can build with. A brand is not a logo. It is shared understanding. It is direction made visible. When positioning is precise, trust compounds.",
  },
  {
    title: "Products, Platforms & Systems",
    description:
      "Architecture before interface. We design and build digital products, internal tools, and workflows as connected systems. Everything we build is structured to scale decision making, not just traffic. Speed without structure creates fragility. Systems create stability. Stability creates growth.",
  },
  {
    title: "AI & Automation",
    description:
      "Applied selectively. We use AI where it removes friction, increases leverage, or fundamentally changes how work gets done. No experimentation for the sake of trend. No automation without direction. Technology is only powerful when aligned with judgment.",
  },
  {
    title: "Partnership & Co-Building",
    description:
      "Ownership over output. We do not operate as a transactional vendor. We operate as a long term partner. Some collaborations remain build engagements. The right ones evolve into ventures. Momentum requires shared responsibility. Alignment requires trust.",
  },
];

const ServicesSection = () => {
  return (
    <section className="w-full py-20 md:py-28">
      <div className="content-container">
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 lg:p-16">
          <AnimatedReveal variant="fadeUp">
            <div className="mb-12 md:mb-16">
              <p className="text-sm font-medium tracking-widest uppercase text-primary-foreground/60 mb-6">
                What We Build
              </p>
            </div>
          </AnimatedReveal>

          <AnimatedReveal
            staggerChildren={0.12}
            className="grid md:grid-cols-2 gap-px bg-primary-foreground/10"
          >
            {services.map((service, index) => (
              <AnimatedChild key={index} variant="scaleIn">
                <div className="bg-primary p-6 md:p-8 lg:p-10">
                  <h3 className="text-lg md:text-xl font-medium text-primary-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-primary-foreground/70 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <a
                    href="mailto:inmotion@movingp.com"
                    className="text-sm text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors duration-300"
                  >
                    inmotion@movingp.com
                  </a>
                </div>
              </AnimatedChild>
            ))}
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
