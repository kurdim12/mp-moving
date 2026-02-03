const problems = [
  "Endless planning without execution",
  "Agencies delivering assets, not progress",
  "Disconnected tech, branding, and systems",
  "No real ownership or accountability",
];

const ProblemSection = () => {
  return (
    <section className="section-padding">
      <div className="content-container">
        <div className="section-divider mb-section" />
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left - Headline */}
          <div>
            <h2 className="section-headline text-foreground">
              Most ideas don't fail — they stall.
            </h2>
          </div>

          {/* Right - Problems list */}
          <div className="space-y-6">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-start gap-4 group"
              >
                <span className="text-sm text-muted-foreground font-medium mt-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="body-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                  {problem}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
