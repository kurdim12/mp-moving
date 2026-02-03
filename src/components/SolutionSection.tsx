const solutions = [
  {
    title: "Partnership, not vendor",
    description: "We work as true partners invested in your outcome.",
  },
  {
    title: "Ownership mindset",
    description: "We think and act like we have skin in the game.",
  },
  {
    title: "Build alongside you",
    description: "Embedded collaboration, not external delivery.",
  },
  {
    title: "Momentum that lasts",
    description: "Systems and strategies designed to compound over time.",
  },
];

const SolutionSection = () => {
  return (
    <section className="section-padding">
      <div className="content-container">
        <div className="section-divider mb-section" />
        
        <div className="mb-16 md:mb-20">
          <h2 className="section-headline text-foreground max-w-2xl">
            That's where MP comes in.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {solutions.map((item, index) => (
            <div key={index} className="group">
              <div className="h-px bg-border mb-6 group-hover:bg-foreground transition-colors duration-500" />
              <h3 className="text-lg font-medium text-foreground mb-3">
                {item.title}
              </h3>
              <p className="body-medium">
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
