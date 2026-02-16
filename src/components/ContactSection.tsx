import { RevealGroup, Reveal } from "@/components/RevealOnScroll";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-card">
      <div className="content-container">
        <RevealGroup className="max-w-xl">
          <Reveal>
            <h2 className="section-headline text-foreground mb-6">
              Start with alignment.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="body-large mb-4">
              MP works selectively. If alignment exists, conversations start naturally.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="body-medium mb-10">
              We'll know quickly if it makes sense.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <a
              href="mailto:inmotion@movingp.com"
              className="inline-block text-base md:text-lg font-medium text-foreground border-b border-foreground/20 pb-1 hover:border-foreground transition-colors duration-300"
            >
              inmotion@movingp.com
            </a>
          </Reveal>
        </RevealGroup>
      </div>
    </section>
  );
};

export default ContactSection;
