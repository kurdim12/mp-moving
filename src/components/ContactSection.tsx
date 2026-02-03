import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-card">
      <div className="content-container">
        <div className="max-w-xl">
          <h2 className="section-headline text-foreground mb-6">
            Start with alignment.
          </h2>
          <p className="body-large mb-10">
            If there's fit, we'll know quickly.
          </p>
          <Button variant="contact" size="xl" asChild>
            <a href="mailto:hello@movingpeople.studio">Get in Touch</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
