import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="content-container">
        <div className="section-divider mb-section" />
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left */}
          <div>
            <h2 className="section-headline text-foreground mb-8">
              Start with alignment.
            </h2>
            <p className="body-large mb-8">
              MP works selectively. If alignment exists, conversations start naturally. 
              We'll know quickly if it makes sense.
            </p>
            <Button variant="contact" size="xl" asChild>
              <a href="mailto:hello@movingpeople.studio">Get in Touch</a>
            </Button>
          </div>

          {/* Right - Contact details */}
          <div className="flex flex-col justify-end">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-2">
                  Email
                </p>
                <a 
                  href="mailto:hello@movingpeople.studio" 
                  className="text-lg text-foreground hover:text-muted-foreground transition-colors duration-300"
                >
                  hello@movingpeople.studio
                </a>
              </div>
              <div>
                <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-2">
                  Location
                </p>
                <p className="text-lg text-foreground">
                  Remote-first, globally connected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
