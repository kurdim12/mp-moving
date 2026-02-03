const steps = [
  {
    number: "01",
    title: "Alignment",
    description: "Conversation first. If there's fit, we continue.",
  },
  {
    number: "02",
    title: "Definition",
    description: "Map what needs to exist together.",
  },
  {
    number: "03",
    title: "Building",
    description: "Work alongside, not around.",
  },
  {
    number: "04",
    title: "Momentum",
    description: "Systems start compounding.",
  },
];

const EngagementSection = () => {
  return (
    <section className="section-padding bg-foreground text-primary-foreground">
      <div className="content-container">
        <div className="grid lg:grid-cols-5 gap-16 md:gap-20">
          <div className="lg:col-span-2">
            <h2 className="section-headline text-primary-foreground">
              How it works.
            </h2>
          </div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-12 md:gap-16">
            {steps.map((step) => (
              <div key={step.number}>
                <span className="text-sm font-medium text-primary-foreground/40 mb-3 block">
                  {step.number}
                </span>
                <h3 className="text-xl font-medium text-primary-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-base text-primary-foreground/60">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngagementSection;
