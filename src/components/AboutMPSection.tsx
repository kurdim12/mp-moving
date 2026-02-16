import { RevealGroup, Reveal, RevealDivider } from "@/components/RevealOnScroll";

const AboutMPSection = () => {
  return (
    <section className="section-padding">
      <div className="content-container">
        <RevealGroup className="max-w-2xl">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
              About
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-foreground mb-8">
              Moving People is a globally connected, remote-first build group.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="body-large mb-8">
              We were founded on a simple belief: partnership drives lasting impact.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="body-medium mb-10">
              Our team operates across disciplines and geographies, but is united by one ethos.
            </p>
          </Reveal>

          <RevealDivider delay={350} />

          <div className="pt-8 space-y-5">
            <Reveal delay={400}>
              <p className="text-lg md:text-xl font-medium text-foreground">
                Clarity before scale.
              </p>
            </Reveal>
            <Reveal delay={450}>
              <p className="text-lg md:text-xl font-medium text-foreground">
                Structure before speed.
              </p>
            </Reveal>
            <Reveal delay={500}>
              <p className="text-lg md:text-xl font-medium text-foreground">
                Ownership before optics.
              </p>
            </Reveal>
          </div>

          <Reveal delay={600}>
            <p className="body-medium mt-12">
              We work with founders who think long-term. We build with people who value alignment. We move deliberately.
            </p>
          </Reveal>

          <Reveal delay={700}>
            <p className="text-xl md:text-2xl font-medium text-foreground mt-12 leading-relaxed">
              We move people.
              <br />
              <span className="text-muted-foreground">And people move possibilities.</span>
            </p>
          </Reveal>
        </RevealGroup>
      </div>
    </section>
  );
};

export default AboutMPSection;
