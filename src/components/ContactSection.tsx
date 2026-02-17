import { RevealGroup, Reveal } from "@/components/RevealOnScroll";

const ContactSection = () => {
  return (
    <section className="section-padding">
      <div className="content-container">
        <RevealGroup>
          <div className="border-t border-foreground/15 pt-16 md:pt-20">
            <Reveal>
              <h2 className="display-headline text-foreground mb-8">
                Start with alignment.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="body-large max-w-lg mb-4">
                MP works selectively. If alignment exists, conversations start naturally.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="body-medium mb-12">
                We'll know quickly if it makes sense.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <a
                href="mailto:inmotion@movingp.com"
                className="inline-flex items-center gap-2 text-base font-bold text-foreground border border-foreground/20 rounded-full px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
              >
                inmotion@movingp.com
              </a>
            </Reveal>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
};

export default ContactSection;
