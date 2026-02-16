import { RevealGroup, Reveal, RevealDivider } from "@/components/RevealOnScroll";

const constraints = [
  { left: "Momentum over noise", right: "Partnership over services" },
  { left: "Ownership over output", right: "Long-term over short-term" },
  { left: "Clarity over complexity", right: "Conviction over consensus" },
];

const HowWeWorkSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="content-container">
        <RevealGroup>
          <Reveal className="mb-12 md:mb-16">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6">
              How We Work
            </p>
          </Reveal>

          <div className="mb-16 md:mb-20">
            {constraints.map((row, i) => (
              <Reveal key={i} delay={100 + i * 80}>
                <div className="grid grid-cols-1 md:grid-cols-2 border-t border-foreground/10">
                  <p className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground py-5 md:py-6 md:pr-8">
                    {row.left}
                  </p>
                  <p className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground py-5 md:py-6 md:pl-8 md:border-l md:border-foreground/10">
                    {row.right}
                  </p>
                </div>
              </Reveal>
            ))}
            <RevealDivider delay={400} />
          </div>

          <Reveal delay={450}>
            <p className="body-medium max-w-md text-muted-foreground">
              These aren't values we market. They're constraints we operate under.
            </p>
          </Reveal>
        </RevealGroup>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
