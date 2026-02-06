const constraints = [
  {
    title: "Partnership over services",
  },
  {
    title: "Ownership over output",
  },
  {
    title: "Momentum over noise",
  },
];

const HowWeWorkSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="content-container">
        <div className="mb-16 md:mb-20">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">
            How We Work
          </p>
        </div>

        <div className="space-y-4 md:space-y-6 mb-16 md:mb-20">
          {constraints.map((constraint, index) => (
            <p 
              key={index} 
              className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground"
            >
              {constraint.title}
            </p>
          ))}
        </div>

        <p className="body-medium max-w-md text-muted-foreground">
          These aren't values we market. They're constraints we operate under.
        </p>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
