const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center">
      <div className="content-container">
        <div className="max-w-3xl">
          <h1 className="fade-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.02] text-foreground mb-8">
            Moving digital products forward.
          </h1>
          <p className="fade-up fade-up-delay-1 text-lg md:text-xl text-muted-foreground mb-12 max-w-lg">
            We design and build systems that move people.
          </p>
          <a
            href="#portfolio"
            className="fade-up fade-up-delay-2 inline-block text-sm font-medium text-foreground border border-foreground px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Explore Work
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
