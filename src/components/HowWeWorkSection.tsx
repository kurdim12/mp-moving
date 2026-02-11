import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  {
    label: "M",
    constraints: [
      { title: "Partnership over services" },
      { title: "Ownership over output" },
      { title: "Momentum over noise" },
    ],
    footnote: "These aren't values we market. They're constraints we operate under.",
  },
  {
    label: "P",
    constraints: [
      { title: "Clarity over complexity" },
      { title: "Conviction over consensus" },
      { title: "Long-term over short-term" },
    ],
    footnote: "We choose partners the way we choose problems — carefully.",
  },
];

const HowWeWorkSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const active = tabs[activeTab];

  return (
    <section className="section-padding bg-card">
      <div className="content-container">
        <div className="mb-12 md:mb-16">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-8 md:mb-10">
            How We Work
          </p>

          {/* Tab navigation */}
          <div className="flex items-center gap-0 border-b border-foreground/10">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "relative px-6 md:px-8 py-3 text-lg md:text-xl font-medium tracking-tight transition-colors duration-300",
                  activeTab === i
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground/70"
                )}
              >
                {tab.label}
                {/* Active indicator */}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-[2px] bg-destructive transition-transform duration-300 origin-left",
                    activeTab === i ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 md:space-y-6 mb-16 md:mb-20 animate-fade-in" key={activeTab}>
          {active.constraints.map((constraint, index) => (
            <p
              key={index}
              className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground"
            >
              {constraint.title}
            </p>
          ))}
        </div>

        <p className="body-medium max-w-md text-muted-foreground">
          {active.footnote}
        </p>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
