import { Button } from "@/components/ui/button";
import mpLogo from "@/assets/mp-logo.png";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 md:pt-24">
      <div className="content-container">
        <div className="max-w-4xl">
          {/* Logo mark */}
          <div className="fade-up mb-8">
            <img 
              src={mpLogo} 
              alt="MP — Moving People" 
              className="h-16 md:h-20 lg:h-24 w-auto"
            />
          </div>

          {/* Tagline */}
          <p className="fade-up fade-up-delay-1 text-sm md:text-base font-medium tracking-widest uppercase text-muted-foreground mb-6">
            Moving People
          </p>

          {/* Main headline */}
          <h1 className="fade-up fade-up-delay-2 display-headline mb-8 text-foreground">
            We partner with people to turn ideas into real momentum.
          </h1>

          {/* Subtext */}
          <p className="fade-up fade-up-delay-3 body-large max-w-2xl mb-12">
            MP is a partnership-driven build studio. We work alongside founders and teams 
            to design strategy, build systems, and create momentum that compounds.
          </p>

          {/* CTA */}
          <div className="fade-up fade-up-delay-4">
            <Button variant="hero" size="xl" asChild>
              <a href="#contact">Start a Conversation</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
