const forList = [
  "Founders building something real",
  "Teams ready to execute",
  "People who value ownership",
];

const notForList = [
  "Vendors to execute a spec",
  "Quick campaigns",
  "Speed over alignment",
];

const WhoWeWorkWithSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="content-container">
        <div className="mb-16 md:mb-24">
          <h2 className="section-headline text-foreground max-w-xl">
            We choose who we work with.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:gap-32">
          {/* For */}
          <div>
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-8">
              We work with
            </p>
            <div className="space-y-4">
              {forList.map((item, index) => (
                <p key={index} className="text-lg text-foreground">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Not for */}
          <div>
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground/60 mb-8">
              Not looking for
            </p>
            <div className="space-y-4">
              {notForList.map((item, index) => (
                <p key={index} className="text-lg text-muted-foreground">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWithSection;
