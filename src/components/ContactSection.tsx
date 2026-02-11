import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-card">
      <div className="content-container">
        <div className="max-w-xl">
          <h2 className="section-headline text-foreground mb-6">
            Start with alignment.
          </h2>
          <p className="body-large mb-4">
            MP works selectively. If alignment exists, conversations start naturally.
          </p>
          <p className="body-medium mb-10">
            We'll know quickly if it makes sense.
          </p>
          <Button variant="contact" size="xl" asChild>
            <a href="mailto:hello@movingpeople.studio">hello@movingpeople.studio</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
