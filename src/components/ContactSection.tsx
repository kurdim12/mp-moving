const ContactSection = () => {
  return (
    <section id="contact" className="section-padding border-t border-border">
      <div className="content-container">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Let's build something meaningful.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-10">
            We work selectively. If there's alignment, the conversation starts naturally.
          </p>
          <a
            href="mailto:hello@movingpeople.studio"
            className="inline-block text-sm font-medium text-foreground border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
          >
            hello@movingpeople.studio
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
