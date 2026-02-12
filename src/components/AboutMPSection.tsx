const AboutMPSection = () => {
  return (
    <section className="section-padding">
      <div className="content-container">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">
            About Moving People
          </p>
          <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-foreground mb-8">
            A global, remote-first design and build studio.
          </p>
          <p className="body-large mb-10">
            We were founded on the principle that partnerships, not transactions, drive success. 
            Our small team is spread around the world, bringing diverse perspectives but united by a common ethos.
          </p>

          <div className="space-y-6 border-t border-border pt-8">
            <div>
              <h3 className="text-base font-medium text-foreground mb-1">Ownership Mindset</h3>
              <p className="body-medium">We think and act like owners in every project.</p>
            </div>
            <div>
              <h3 className="text-base font-medium text-foreground mb-1">Remote-First Culture</h3>
              <p className="body-medium">We collaborate across time zones seamlessly, using the best tools and processes to stay in sync.</p>
            </div>
            <div>
              <h3 className="text-base font-medium text-foreground mb-1">Values</h3>
              <p className="body-medium">Partnership over services. Ownership over output. Momentum over noise.</p>
            </div>
          </div>

          <p className="body-medium mt-10">
            Our mission is to help visionary founders and teams create momentum in their businesses. 
            The name "Moving People" reflects exactly that — moving individuals and companies forward, together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMPSection;
