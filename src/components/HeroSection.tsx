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

          {/* Tagline */}
          <p className="fade-up fade-up-delay-1 text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">
            Moving People
          </p>

          {/* Main headline */}
          <h1 className="fade-up fade-up-delay-1 display-headline mb-8 text-foreground">
            MP exists to move people forward.
          </h1>

          {/* Subtext */}
          <p className="fade-up fade-up-delay-2 body-large max-w-xl">
            We partner with people to build products, systems, and companies that create momentum.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
