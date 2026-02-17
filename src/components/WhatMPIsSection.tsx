import { RevealGroup, Reveal } from "@/components/RevealOnScroll";

const WhatMPIsSection = () => {
  return (
    <section className="section-padding">
      <div className="content-container">
        <RevealGroup>
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
                Moving People
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] text-foreground mb-8 tracking-tight">
                People create possibilities.
                <br />
                We exist to align people around what truly matters.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="body-large max-w-lg">
                When alignment is clear, momentum becomes natural. We move people — and people move possibilities.
              </p>
            </Reveal>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
};

export default WhatMPIsSection;
