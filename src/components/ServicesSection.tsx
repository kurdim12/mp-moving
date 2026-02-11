const services = [
  {
    title: "Brand & Positioning",
    description: "Clarity before aesthetics. We define what matters, remove what doesn't, and give teams language they can build with.",
  },
  {
    title: "Products, Platforms & Systems",
    description: "We design and build digital products, internal tools, and workflows as connected systems. Everything we build is meant to scale with decision-making, not just traffic.",
  },
  {
    title: "AI & Automation",
    description: "Applied selectively. Only where it removes friction, increases leverage, or fundamentally changes how work gets done. No experiments for the sake of trend.",
  },
  {
    title: "Partnership & Co-Building",
    description: "Long-term collaborations with shared ownership and responsibility. Some partnerships start as build work. The right ones evolve into ventures.",
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="content-container">
        <div className="mb-16 md:mb-24">
          <p className="text-sm font-medium tracking-widest uppercase text-primary-foreground/60 mb-6">
            What We Build
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-primary-foreground/10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-primary p-8 md:p-10 lg:p-12"
            >
              <h3 className="text-lg md:text-xl font-medium text-primary-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-primary-foreground/70 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
