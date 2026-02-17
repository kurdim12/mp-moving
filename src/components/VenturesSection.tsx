import { RevealGroup, Reveal } from "@/components/RevealOnScroll";

const VenturesSection = () => {
  return (
    <section className="section-padding">
      <div className="content-container">
        <RevealGroup className="max-w-2xl mb-16">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Ventures
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="section-headline text-foreground mb-6">
              We build and co-own what we believe in.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="body-large">
              MP ventures come in two forms. In either case, MP is more than an advisor — we are builders and co-owners.
            </p>
          </Reveal>
        </RevealGroup>

        <RevealGroup className="grid md:grid-cols-2 gap-px bg-border">
          <Reveal delay={0}>
            <div className="bg-background p-8 md:p-10 lg:p-12">
              <h3 className="text-lg md:text-xl font-medium text-foreground mb-4">
                MP Build
              </h3>
              <p className="body-medium">
                We originate and fully own these projects. We generate the idea and use MP's resources to develop it from scratch.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="bg-background p-8 md:p-10 lg:p-12">
              <h3 className="text-lg md:text-xl font-medium text-foreground mb-4">
                MP Co-Build
              </h3>
              <p className="body-medium">
                Co-founded projects with external partners. We collaborate from the ground up — shaping the concept, sharing equity, and executing jointly.
              </p>
            </div>
          </Reveal>
        </RevealGroup>
      </div>
    </section>
  );
};

export default VenturesSection;
