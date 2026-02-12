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
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-400">Partnership & Co-Building</p>
      </Reveal>
      <div className="text-center max-w-3xl mx-auto px-6">
        <Reveal visible={visible} delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[1.08]">
            Build together.
          </h1>
        </Reveal>
        <Reveal visible={visible} delay={250}>
          <div className="mt-8 mb-8"><Divider visible={visible} delay={350} /></div>
        </Reveal>
        <Reveal visible={visible} delay={350}>
          <p className="text-lg md:text-xl text-neutral-500 font-normal leading-relaxed max-w-xl mx-auto">
            Long-term collaborations with shared ownership and responsibility. We don't just deliver projects and leave — we build ventures with our partners.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

const Scene2 = () => {
  const { ref, visible } = useSceneVisibility();
  const blocks = [
    { title: "Long-term Commitment", desc: "We're in it for the journey, not the quick win." },
    { title: "Shared Equity & Rewards", desc: "We put skin in the game, sharing ownership and upside with founders." },
    { title: "Hands-On Support", desc: "Our team provides expertise in strategy, design, development — effectively expanding your capabilities." },
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
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-400 mb-3">How We Partner</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-6">PARTNER</h2>
              <p className="text-neutral-500 leading-relaxed max-w-lg mb-12">
                Our engagements start with a shared vision and mutual conviction. From day one, we act as co-founders, investing effort and equity alongside you.
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
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-400 mb-3">Evolution</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-8">EVOLVE</h2>
        </Reveal>
        <Reveal visible={visible} delay={150}>
          <p className="text-xl md:text-2xl font-medium text-black leading-relaxed mb-8">
            When the partnership proves successful, some collaborations naturally evolve into a new venture.
          </p>
        </Reveal>
        <Reveal visible={visible} delay={300}>
          <p className="text-neutral-500 leading-relaxed max-w-xl mb-8">
            At that point, we shift from service to co-ownership, formalizing a joint company or product. 
            We measure success not by hours billed but by how much momentum we've created together.
          </p>
        </Reveal>
        <Reveal visible={visible} delay={400}>
          <div className="mt-16"><Divider visible={visible} delay={450} /></div>
          <p className="mt-10 text-sm text-neutral-400">This is how we partner at MP.</p>
        </Reveal>
      </div>
    </section>
  );
};

const CoBuild = () => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <Link to="/what-we-build" className="text-sm font-medium text-neutral-400 hover:text-black transition-colors duration-200">← WWB</Link>
          <span className="text-xs font-medium tracking-[0.15em] uppercase text-neutral-300">Co-Build</span>
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

export default CoBuild;
