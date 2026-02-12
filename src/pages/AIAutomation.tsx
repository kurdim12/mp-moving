import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import mpLogo from "@/assets/mp-logo.png";

function useOnScreen(ref: React.RefObject<HTMLElement>, threshold = 0.2) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function useSceneVisibility(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref as React.RefObject<HTMLElement>, threshold);
  return { ref, visible };
}

const Reveal = ({ children, delay = 0, visible, className }: { children: React.ReactNode; delay?: number; visible: boolean; className?: string }) => (
  <div className={cn("transition-all duration-[350ms] ease-out", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[8px]", className)} style={{ transitionDelay: `${delay}ms` }}>
    {children}
  </div>
);

const Divider = ({ visible, delay = 0 }: { visible: boolean; delay?: number }) => (
  <div className={cn("h-px bg-black origin-left transition-transform duration-[350ms] ease-out", visible ? "scale-x-100" : "scale-x-0")} style={{ transitionDelay: `${delay}ms` }} />
);

const Scene1 = () => {
  const { ref, visible } = useSceneVisibility(0.3);
  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center bg-white relative">
      <Reveal visible={visible} delay={0} className="absolute top-8 left-6 md:left-12">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-400">AI & Automation</p>
      </Reveal>
      <div className="text-center max-w-3xl mx-auto px-6">
        <Reveal visible={visible} delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[1.08]">
            Multiply leverage.
          </h1>
        </Reveal>
        <Reveal visible={visible} delay={250}>
          <div className="mt-8 mb-8"><Divider visible={visible} delay={350} /></div>
        </Reveal>
        <Reveal visible={visible} delay={350}>
          <p className="text-lg md:text-xl text-neutral-500 font-normal leading-relaxed max-w-xl mx-auto">
            Applied selectively. Only where it removes friction, increases leverage, or fundamentally changes how work gets done.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

const Scene2 = () => {
  const { ref, visible } = useSceneVisibility();
  const blocks = [
    { title: "AI Agents", desc: "AI assistants and ML models for data analysis, content generation, and personalized experiences — speeding up workflows without sacrificing quality." },
    { title: "Automation Workflows", desc: "End-to-end automation pipelines for marketing, operations, and data processing that run reliably in the background." },
    { title: "Human Oversight", desc: "At every step, we ensure transparency and review. AI augments your team's judgment, rather than dictating actions." },
  ];

  return (
    <section className="min-h-screen flex items-center bg-white">
      <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-0">
        <div className="grid md:grid-cols-[200px_1fr] gap-12 md:gap-20 items-start">
          <Reveal visible={visible} delay={0}>
            <span className="text-[120px] md:text-[180px] font-bold leading-none text-neutral-100 select-none block">01</span>
          </Reveal>
          <div>
            <Reveal visible={visible} delay={100}>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-400 mb-3">How We Apply</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-6">APPLY</h2>
              <p className="text-neutral-500 leading-relaxed max-w-lg mb-12">
                We harness AI and automation to amplify human work, not replace it. We identify repeatable tasks or high-complexity problems and automate them intelligently.
              </p>
            </Reveal>
            <div className="space-y-0">
              {blocks.map((b, i) => (
                <Reveal key={b.title} visible={visible} delay={250 + i * 100}>
                  <div>
                    {i > 0 && <Divider visible={visible} delay={300 + i * 100} />}
                    <div className="py-6">
                      <h3 className="text-base font-semibold text-black mb-1">{b.title}</h3>
                      <p className="text-sm text-neutral-400">{b.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
              <Divider visible={visible} delay={650} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Scene3 = () => {
  const { ref, visible } = useSceneVisibility();
  return (
    <section className="min-h-screen flex items-center bg-[#f7f7f7]">
      <div ref={ref} className="w-full max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-0">
        <Reveal visible={visible} delay={0}>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-400 mb-3">Philosophy</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-8">PRINCIPLE</h2>
        </Reveal>
        <Reveal visible={visible} delay={150}>
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-black leading-[1.2] mb-8">
            "AI isn't here to replace — it's here to multiply leverage."
          </blockquote>
        </Reveal>
        <Reveal visible={visible} delay={300}>
          <p className="text-neutral-500 leading-relaxed max-w-xl">
            We apply AI as a force multiplier — not a shortcut — focusing on sustainable systems rather than hype. 
            We only implement AI when it truly enhances capabilities and aligns with long-term goals. No experiments for the sake of trend.
          </p>
        </Reveal>
        <Reveal visible={visible} delay={400}>
          <div className="mt-16"><Divider visible={visible} delay={450} /></div>
          <p className="mt-10 text-sm text-neutral-400">This is how we approach AI & automation at MP.</p>
        </Reveal>
      </div>
    </section>
  );
};

const AIAutomation = () => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <Link to="/what-we-build" className="text-sm font-medium text-neutral-400 hover:text-black transition-colors duration-200">← WWB</Link>
          <span className="text-xs font-medium tracking-[0.15em] uppercase text-neutral-300">AI & Automation</span>
        </div>
      </nav>
      <main className="pt-14">
        <Scene1 />
        <Scene2 />
        <Scene3 />
      </main>
    </div>
  );
};

export default AIAutomation;
