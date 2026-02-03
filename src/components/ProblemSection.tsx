const problems = [
  "Planning without execution",
  "Deliverables without progress",
  "Systems that don't connect",
  "No real ownership",
];

const ProblemSection = () => {
  return (
    <section className="section-padding">
      <div className="content-container">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24">
          {/* Left - Headline */}
          <div>
            <h2 className="section-headline text-foreground">
              Most ideas stall.
            </h2>
          </div>

          {/* Right - Problems list */}
          <div className="space-y-5">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-start gap-4"
              >
                <span className="text-sm text-muted-foreground font-medium mt-1 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="body-medium text-muted-foreground">
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
