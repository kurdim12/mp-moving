const values = ["Precision", "Clarity", "Momentum"];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
              We build systems that move people.
            </h2>
          </div>

          {/* Right */}
          <div>
            <p className="text-base text-foreground/80 leading-relaxed mb-6">
              MP is a partnership-led studio. We work alongside founders and teams — thinking, 
              building, and deciding together. Not as an agency. Not as a vendor. As a committed 
              partner with shared ownership and responsibility.
            </p>
            <p className="text-base text-foreground/80 leading-relaxed mb-12">
              We focus on digital products, platforms, and systems that create lasting momentum. 
              Every engagement is selective. Every decision is intentional. We'd rather build 
              fewer things well than many things quickly.
            </p>

            <div className="flex gap-8">
              {values.map((value) => (
                <div key={value}>
                  <p className="text-sm font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
