const expertise = [
  {
    title: "Product Strategy",
    description: "Clarity before execution. Direction that holds under pressure.",
  },
  {
    title: "Web Platforms",
    description: "Scalable systems built for real users, not demos.",
  },
  {
    title: "Intelligent Systems",
    description: "AI and automation applied where it creates genuine leverage.",
  },
  {
    title: "Interface Design",
    description: "Precision interfaces that feel inevitable, not decorated.",
  },
];

const WebbSection = () => {
  return (
    <section id="webb" className="section-padding">
      <div className="content-container">
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase mb-16">
          What We Build
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {expertise.map((item, i) => (
            <div
              key={i}
              className="bg-background p-8 md:p-10 group cursor-default transition-colors duration-300 hover:bg-muted/50"
            >
              <h3 className="text-base font-semibold text-foreground mb-3 relative inline-block after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-foreground after:transition-all after:duration-300 group-hover:after:w-full">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebbSection;
