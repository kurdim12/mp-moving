import { Button } from "@/components/ui/button";
import mpLogo from "@/assets/mp-logo.png";

const HeroSection = () => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center pt-20 md:pt-24">
      <div className="content-container">
        <div className="max-w-3xl">
          {/* Logo mark */}
          <div className="fade-up mb-10">
            <img 
              src={mpLogo} 
              alt="MP — Moving People" 
              className="h-14 md:h-16 lg:h-20 w-auto"
            />
          </div>

          {/* Main headline - more decisive */}
          <h1 className="fade-up fade-up-delay-1 display-headline mb-8 text-foreground">
            Ideas become momentum.
          </h1>

          {/* Subtext - tighter, no repetition */}
          <p className="fade-up fade-up-delay-2 body-large max-w-xl mb-14">
            MP partners with founders and teams to build what matters. 
            Strategy, systems, and execution — designed to compound.
          </p>

          {/* CTA */}
          <div className="fade-up fade-up-delay-3">
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
