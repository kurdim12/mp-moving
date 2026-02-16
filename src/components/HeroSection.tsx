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
              className="h-12 md:h-14 lg:h-16 w-auto"
            />
          </div>

          {/* Tagline */}
          <p className="fade-up fade-up-delay-1 text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8">
            Moving People
          </p>

          {/* Main headline */}
          <h1 className="fade-up fade-up-delay-1 display-headline mb-8 text-foreground">
            We exist to move
            <br />
            people forward.
          </h1>

          {/* Subtext */}
          <p className="fade-up fade-up-delay-2 body-large max-w-xl">
            Moving People is a partnership-driven build group. We work with people and teams to create clarity, structure, and momentum that compounds.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
