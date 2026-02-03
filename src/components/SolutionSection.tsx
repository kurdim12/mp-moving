const solutions = [
  {
    title: "Partnership",
    description: "We work as partners, not vendors.",
  },
  {
    title: "Ownership",
    description: "We think like we have skin in the game.",
  },
  {
    title: "Embedded",
    description: "We build alongside you, not around you.",
  },
  {
    title: "Compounding",
    description: "Every system connects to what comes next.",
  },
];

const SolutionSection = () => {
  return (
    <section className="section-padding">
      <div className="content-container">
        <div className="mb-20 md:mb-28">
          <h2 className="section-headline text-foreground max-w-lg">
            That's where MP comes in.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {solutions.map((item, index) => (
            <div key={index} className="bg-background p-8 md:p-10">
              <h3 className="text-lg font-medium text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
