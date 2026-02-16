import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const constraints = [
  { left: "Momentum over noise", right: "Partnership over services" },
  { left: "Ownership over output", right: "Long-term over short-term" },
  { left: "Clarity over complexity", right: "Conviction over consensus" },
];

const HowWeWorkSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate each divider line
      const lines = sectionRef.current!.querySelectorAll(".divider-line");
      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.05,
          }
        );
      });

      // Animate text rows
      const rows = sectionRef.current!.querySelectorAll(".constraint-row");
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: 0.1 + i * 0.08,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-card">
      <div className="content-container">
        <div className="mb-12 md:mb-16">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">
            How We Work
          </p>
        </div>

        <div className="mb-16 md:mb-20">
          {constraints.map((row, i) => (
            <div key={i}>
              <div className="divider-line h-px bg-foreground/10 origin-left" />
              <div className="constraint-row grid grid-cols-1 md:grid-cols-2 opacity-0">
                <p className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground py-5 md:py-6 md:pr-8">
                  {row.left}
                </p>
                <p className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground py-5 md:py-6 md:pl-8 md:border-l md:border-foreground/10">
                  {row.right}
                </p>
              </div>
            </div>
          ))}
          <div className="divider-line h-px bg-foreground/10 origin-left" />
        </div>

        <p className="body-medium max-w-md text-muted-foreground">
          These aren't values we market. They're constraints we operate under.
        </p>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
