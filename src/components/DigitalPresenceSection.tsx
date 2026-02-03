const DigitalPresenceSection = () => {
  return (
    <section className="section-padding">
      <div className="content-container">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">
            Presence
          </p>
          <h2 className="section-headline text-foreground mb-8">
            We don't manage channels.
          </h2>
          <p className="body-large mb-12">
            Websites, brand language, and platforms designed as one system. 
            Each piece reinforces the others.
          </p>
          
          <div className="space-y-6 border-l border-border pl-6">
            <p className="text-base text-muted-foreground">
              <span className="text-foreground font-medium">Intentional</span> — Presence should work quietly.
            </p>
            <p className="text-base text-muted-foreground">
              <span className="text-foreground font-medium">Connected</span> — Every touchpoint serves the same goal.
            </p>
            <p className="text-base text-muted-foreground">
              <span className="text-foreground font-medium">Sustainable</span> — Built to compound, not burn out.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalPresenceSection;
