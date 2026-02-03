const DigitalPresenceSection = () => {
  return (
    <section className="section-padding">
      <div className="content-container">
        <div className="section-divider mb-section" />
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left - Main content */}
          <div>
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
              Digital Presence
            </p>
            <h2 className="section-headline text-foreground mb-8">
              We don't "do social media."
            </h2>
            <p className="body-large mb-6">
              MP designs digital presence as a system — not a collection of channels to manage.
            </p>
            <p className="body-medium">
              Websites, brand language, content strategy, and platform choices are designed together. 
              Each piece reinforces the others. Nothing exists in isolation.
            </p>
          </div>

          {/* Right - Principles */}
          <div className="space-y-8 md:pt-16">
            <div className="border-l-2 border-border pl-6">
              <h3 className="text-lg font-medium text-foreground mb-2">
                Intentional over active
              </h3>
              <p className="body-medium">
                Presence should work quietly. Not demand constant attention.
              </p>
            </div>
            <div className="border-l-2 border-border pl-6">
              <h3 className="text-lg font-medium text-foreground mb-2">
                Connected over scattered
              </h3>
              <p className="body-medium">
                Every touchpoint speaks the same language and serves the same goal.
              </p>
            </div>
            <div className="border-l-2 border-border pl-6">
              <h3 className="text-lg font-medium text-foreground mb-2">
                Sustainable over viral
              </h3>
              <p className="body-medium">
                We build presence that compounds. Not content that burns out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalPresenceSection;
