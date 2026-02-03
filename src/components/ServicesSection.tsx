const services = [
  {
    title: "Strategy & Positioning",
    description: "Direction, focus, and clarity before execution.",
    number: "01",
  },
  {
    title: "Brand & Digital Identity",
    description: "Messaging, visual identity, and websites built to communicate clearly and convert naturally.",
    number: "02",
  },
  {
    title: "Products, Platforms & Systems",
    description: "Websites, platforms, dashboards, workflows, and internal tools — fully connected.",
    number: "03",
  },
  {
    title: "AI & Automation",
    description: "AI agents and automation applied only where real leverage exists.",
    number: "04",
  },
  {
    title: "Partnership & Co-Building",
    description: "Selected long-term collaborations with shared ownership.",
    number: "05",
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="content-container">
        <div className="mb-16 md:mb-20">
          <p className="text-sm font-medium tracking-widest uppercase text-primary-foreground/60 mb-4">
            What We Build
          </p>
          <h2 className="section-headline text-primary-foreground max-w-2xl">
            Systems, not services.
          </h2>
        </div>

        <div className="space-y-0">
          {services.map((service, index) => (
            <div
              key={index}
              className="group border-t border-primary-foreground/20 py-8 md:py-10 hover:bg-primary-foreground/5 transition-colors duration-300 -mx-6 md:-mx-8 lg:-mx-12 px-6 md:px-8 lg:px-12"
            >
              <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-start">
                <span className="text-sm text-primary-foreground/50 font-medium md:col-span-1">
                  {service.number}
                </span>
                <h3 className="text-xl md:text-2xl font-medium text-primary-foreground md:col-span-4">
                  {service.title}
                </h3>
                <p className="text-primary-foreground/70 leading-relaxed md:col-span-7">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-primary-foreground/20" />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
