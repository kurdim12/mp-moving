const agitations = [
  "Another website won't fix confusion.",
  "Another strategy deck won't build traction.",
  "Without ownership, nothing compounds.",
];

const AgitationSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="content-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-headline text-foreground mb-12">
            More deliverables won't create momentum.
          </h2>

          <div className="space-y-4">
            {agitations.map((text, index) => (
              <p
                key={index}
                className="body-large text-muted-foreground"
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgitationSection;
