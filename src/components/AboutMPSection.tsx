import { RevealGroup, Reveal } from "@/components/RevealOnScroll";
import visualPartnership from "@/assets/wwb-partnerships.jpg";

const AboutMPSection = () => {
  return (
    <section className="w-full">
      {/* Section statement */}
      <RevealGroup className="section-padding">
        <div className="content-container">
          <Reveal>
            <h2 className="display-massive text-foreground">
              we grow
              <span className="inline-block mx-[0.4em] text-muted-foreground">together.</span>
            </h2>
          </Reveal>
        </div>
      </RevealGroup>

      <div className="content-container pb-24 md:pb-32">
        <RevealGroup threshold={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Image */}
            <Reveal delay={100}>
              <div className="overflow-hidden rounded-lg aspect-[4/3]">
                <img
                  src={visualPartnership}
                  alt="Partnership"
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-[3000ms] ease-out"
                />
              </div>
            </Reveal>

            {/* Text */}
            <div className="flex flex-col justify-center py-4 space-y-8">
              <Reveal delay={200}>
                <p className="text-xl md:text-2xl font-bold text-foreground leading-snug tracking-tight">
                  Moving People is a globally connected, remote-first build group.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <p className="text-muted-foreground leading-[1.7] text-base md:text-lg max-w-md">
                  We were founded on a simple belief: partnership drives lasting impact. Our team operates across disciplines and geographies, but is united by one ethos.
                </p>
              </Reveal>
              <Reveal delay={400}>
                <div className="space-y-3 pt-4">
                  <p className="text-lg font-bold text-foreground">Clarity before scale.</p>
                  <p className="text-lg font-bold text-foreground">Structure before speed.</p>
                  <p className="text-lg font-bold text-foreground">Ownership before optics.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </RevealGroup>
      </div>

      {/* Ventures */}
      <div className="content-container pb-24 md:pb-32">
        <RevealGroup>
          <div className="border-t border-foreground/15 pt-16">
            <Reveal>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
                Ventures
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="section-headline text-foreground mb-8 max-w-xl">
                We build and co-own what we believe in.
              </h3>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 mt-12">
              <Reveal delay={200}>
                <div className="bg-background p-8 md:p-12">
                  <h4 className="text-xl font-bold text-foreground mb-4">MP Build</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    We originate and fully own these projects. We generate the idea and use MP's resources to develop it from scratch.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={300}>
                <div className="bg-background p-8 md:p-12">
                  <h4 className="text-xl font-bold text-foreground mb-4">MP Co-Build</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Co-founded projects with external partners. We collaborate from the ground up — shaping the concept, sharing equity, and executing jointly.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
};

export default AboutMPSection;
