const VenturesSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="content-container">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">
            Ventures
          </p>
          <h2 className="section-headline text-foreground mb-6">
            We build and co-own what we believe in.
          </h2>
          <p className="body-large">
            MP ventures come in two flavors. In either case, MP is more than an advisor — we are builders and co-owners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          <div className="bg-background p-8 md:p-10 lg:p-12">
            <h3 className="text-lg md:text-xl font-medium text-foreground mb-4">
              MP Build
            </h3>
            <p className="body-medium">
              We originate and fully own these projects. We generate the idea and use MP's resources — time, capital, and team — to develop it from scratch. 
              We retain majority ownership and drive the vision, just as a founder would.
            </p>
          </div>
          <div className="bg-background p-8 md:p-10 lg:p-12">
            <h3 className="text-lg md:text-xl font-medium text-foreground mb-4">
              MP Co-Build
            </h3>
            <p className="body-medium">
              Co-founded projects with external partners. We collaborate from the ground up — shaping the concept, sharing equity, and executing jointly. 
              These ventures start from mutual alignment on mission and values.
            </p>
          </div>
        </div>

        <p className="body-medium max-w-xl mt-10">
          We evaluate potential ventures rigorously. If an opportunity meets our criteria, we move quickly and with conviction. Otherwise, we pass. 
          We start every venture with alignment.
        </p>
      </div>
    </section>
  );
};

export default VenturesSection;
