import { useGsapReveal, useGsapClipReveal, useGsapLineReveal } from "@/hooks/useGsap";

const ContactSection = () => {
  const lineRef = useGsapLineReveal();
  const clipRef = useGsapClipReveal();
  const bodyRef = useGsapReveal({ stagger: 0.12 });

  return (
    <section className="section-padding">
      <div className="content-container">
        <div ref={lineRef} className="h-px bg-foreground/15" />
        <div className="pt-16 md:pt-20">
          <div ref={clipRef}>
            <div className="overflow-hidden">
              <h2 data-clip className="display-headline text-foreground mb-8">
                Start with alignment.
              </h2>
            </div>
          </div>
          <div ref={bodyRef}>
            <p data-gsap className="body-large max-w-lg mb-4">
              MP works selectively. If alignment exists, conversations start naturally.
            </p>
            <p data-gsap className="body-medium mb-12">
              We'll know quickly if it makes sense.
            </p>
            <div data-gsap>
              <a
                href="mailto:inmotion@movingp.com"
                className="inline-flex items-center gap-2 text-base font-bold text-foreground border border-foreground/20 rounded-full px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
              >
                inmotion@movingp.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
