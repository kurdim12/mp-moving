const forList = [
  "Founders building something they believe in",
  "Operators who need execution, not just advice",
  "Teams ready to move, not just plan",
  "People who value ownership over outsourcing",
];

const notForList = [
  "Those looking for a vendor to execute a spec",
  "Projects needing 'just a website'",
  "Short-term campaigns without long-term thinking",
  "Anyone prioritizing speed over alignment",
];

const WhoWeWorkWithSection = () => {
  return (
    <section className="section-padding">
      <div className="content-container">
        <div className="section-divider mb-section" />
        
        <div className="mb-16 md:mb-20">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Alignment
          </p>
          <h2 className="section-headline text-foreground max-w-2xl">
            We work with people, not projects.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* For */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-8">
              MP is for
            </h3>
            <div className="space-y-5">
              {forList.map((item, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2.5 shrink-0" />
                  <p className="body-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Not for */}
          <div>
            <h3 className="text-lg font-medium text-muted-foreground mb-8">
              MP is not for
            </h3>
            <div className="space-y-5">
              {notForList.map((item, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 mt-2.5 shrink-0" />
                  <p className="body-medium text-muted-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWithSection;
