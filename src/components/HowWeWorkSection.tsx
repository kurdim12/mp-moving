const principles = [
  {
    title: "Partnership First",
    description: "We don't take on clients. We take on partnerships. The distinction matters. When incentives align, better outcomes follow.",
  },
  {
    title: "Ownership Mindset",
    description: "We approach every engagement as if we have equity in the outcome. Because often, we do.",
  },
  {
    title: "Momentum Over Hype",
    description: "We're not interested in impressive decks or flashy launches. We care about compounding progress.",
  },
];

const HowWeWorkSection = () => {
  return (
    <section className="section-padding">
      <div className="content-container">
        <div className="section-divider mb-section" />
        
        <div className="mb-16 md:mb-20">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            How We Work
          </p>
          <h2 className="section-headline text-foreground max-w-xl">
            Principles over process.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          {principles.map((principle, index) => (
            <div key={index} className="group">
              <h3 className="text-xl font-medium text-foreground mb-4">
                {principle.title}
              </h3>
              <p className="body-medium">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
