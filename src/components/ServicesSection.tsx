const services = [
  {
    title: "Strategy & Positioning",
    description: "Direction before execution.",
  },
  {
    title: "Brand & Identity",
    description: "Messaging and visuals that communicate.",
  },
  {
    title: "Platforms & Systems",
    description: "Products, tools, and workflows — connected.",
  },
  {
    title: "AI & Automation",
    description: "Applied where real leverage exists.",
  },
  {
    title: "Co-Building",
    description: "Long-term partnerships with shared ownership.",
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="content-container">
        <div className="mb-16 md:mb-24">
          <h2 className="section-headline text-primary-foreground max-w-md">
            Systems, not services.
          </h2>
        </div>

        <div className="space-y-0">
          {services.map((service, index) => (
            <div
              key={index}
              className="border-t border-primary-foreground/15 py-6 md:py-8"
            >
              <div className="grid md:grid-cols-2 gap-2 md:gap-8">
                <h3 className="text-lg md:text-xl font-medium text-primary-foreground">
                  {service.title}
                </h3>
                <p className="text-primary-foreground/60 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-primary-foreground/15" />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
