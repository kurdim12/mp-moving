import { RevealGroup, Reveal, RevealDivider } from "@/components/RevealOnScroll";

const WhatMPIsSection = () => {
  return (
    <section className="section-padding">
      <div className="content-container">
        <RevealGroup className="max-w-2xl">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
              Alignment
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.2] text-foreground mb-8">
              People create possibilities.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="body-large mb-6">
              We exist to align people around what truly matters.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="body-medium">
              When alignment is clear, momentum becomes natural.
            </p>
          </Reveal>
        </RevealGroup>
      </div>
    </section>
  );
};

export default WhatMPIsSection;
