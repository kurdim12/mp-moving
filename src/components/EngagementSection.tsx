const steps = [
  {
    number: "01",
    title: "Alignment First",
    description: "We start with a conversation, not a pitch. If there's mutual fit, we explore further.",
  },
  {
    number: "02",
    title: "Defining the System",
    description: "Together, we map what needs to exist — strategy, identity, platforms, workflows.",
  },
  {
    number: "03",
    title: "Building Together",
    description: "We work alongside you, not for you. Progress happens through embedded collaboration.",
  },
  {
    number: "04",
    title: "Momentum Compounding",
    description: "Each piece connects to the next. Systems start working for you, not the other way around.",
  },
];

const EngagementSection = () => {
  return (
    <section className="section-padding bg-foreground text-primary-foreground">
      <div className="content-container">
        <div className="mb-16 md:mb-24">
          <p className="text-sm font-medium tracking-widest uppercase text-primary-foreground/60 mb-4">
            Process
          </p>
          <h2 className="section-headline text-primary-foreground max-w-xl">
            How engagement works.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="group">
              <span className="text-sm font-medium text-primary-foreground/40 mb-4 block">
                {step.number}
              </span>
              <h3 className="text-xl font-medium text-primary-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-base leading-relaxed text-primary-foreground/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngagementSection;
