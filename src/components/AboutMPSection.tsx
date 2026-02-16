import AnimatedReveal, { AnimatedChild } from "@/components/AnimatedReveal";

const AboutMPSection = () => {
  return (
    <section className="section-padding">
      <div className="content-container">
        <div className="max-w-2xl">
          <AnimatedReveal variant="fadeUp">
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">
              About Moving People
            </p>
          </AnimatedReveal>

          <AnimatedReveal variant="fadeUp" delay={0.1}>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-foreground mb-8">
              Moving People is a globally connected, remote first build group.
            </p>
          </AnimatedReveal>

          <AnimatedReveal staggerChildren={0.1} className="space-y-6">
            <AnimatedChild variant="fadeUp">
              <p className="body-large">
                We were founded on a simple belief: Partnership drives lasting impact.
              </p>
            </AnimatedChild>
            <AnimatedChild variant="fadeUp">
              <p className="body-large">
                Our team operates across disciplines and geographies, but is united by one ethos.
              </p>
            </AnimatedChild>
          </AnimatedReveal>

          <AnimatedReveal variant="fadeUp" delay={0.3}>
            <div className="space-y-2 border-t border-border pt-8 mt-10">
              <p className="text-lg md:text-xl font-medium text-foreground">Clarity before scale.</p>
              <p className="text-lg md:text-xl font-medium text-foreground">Structure before speed.</p>
              <p className="text-lg md:text-xl font-medium text-foreground">Ownership before optics.</p>
            </div>
          </AnimatedReveal>

          <AnimatedReveal staggerChildren={0.1} delay={0.2} className="mt-10 space-y-4">
            <AnimatedChild variant="fadeUp">
              <p className="body-medium">
                We work with founders who think long term. We build with people who value alignment. We move deliberately.
              </p>
            </AnimatedChild>
            <AnimatedChild variant="fadeUp">
              <p className="body-medium">
                The name is literal. We move people. And people move possibilities.
              </p>
            </AnimatedChild>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutMPSection;
