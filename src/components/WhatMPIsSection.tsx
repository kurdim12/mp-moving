import AnimatedReveal, { AnimatedChild } from "@/components/AnimatedReveal";

const WhatMPIsSection = () => {
  return (
    <section className="section-padding">
      <div className="content-container">
        <div className="max-w-2xl">
          <AnimatedReveal variant="fadeUp" delay={0}>
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">
              What MP Is
            </p>
          </AnimatedReveal>

          <AnimatedReveal variant="fadeUp" delay={0.1}>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-foreground mb-8">
              MP is a partnership driven build group.
            </p>
          </AnimatedReveal>

          <AnimatedReveal staggerChildren={0.1} className="space-y-4">
            <AnimatedChild variant="fadeUp">
              <p className="body-large">
                We work with people and teams to create clarity, structure, and momentum that compounds.
              </p>
            </AnimatedChild>
            <AnimatedChild variant="fadeUp">
              <p className="body-large">
                People create possibilities. We exist to align people around what truly matters.
              </p>
            </AnimatedChild>
            <AnimatedChild variant="fadeUp">
              <p className="body-large">
                When alignment is clear, momentum becomes natural.
              </p>
            </AnimatedChild>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
};

export default WhatMPIsSection;
