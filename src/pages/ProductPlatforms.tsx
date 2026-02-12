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
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-400">Products, Platforms & Systems</p>
      </Reveal>
      <div className="text-center max-w-3xl mx-auto px-6">
        <Reveal visible={visible} delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[1.08]">
            Everything connects.
          </h1>
        </Reveal>
        <Reveal visible={visible} delay={250}>
          <div className="mt-8 mb-8"><Divider visible={visible} delay={350} /></div>
        </Reveal>
        <Reveal visible={visible} delay={350}>
          <p className="text-lg md:text-xl text-neutral-500 font-normal leading-relaxed max-w-xl mx-auto">
            We design and build digital products, internal tools, and workflows as connected systems that scale with decision-making.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

const Scene2 = () => {
  const { ref, visible } = useSceneVisibility();
  const blocks = [
    { title: "Websites & Apps", desc: "From landing pages to full web applications, built with clear navigation and purpose." },
    { title: "Dashboards & Internal Tools", desc: "Back-end systems and admin interfaces that make decision-making seamless and data-driven." },
    { title: "Integrated Workflows", desc: "Automated, linked systems via APIs, CRMs, and analytics — reducing friction as you scale." },
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
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-400 mb-3">What We Build</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-6">BUILD</h2>
              <p className="text-neutral-500 leading-relaxed max-w-lg mb-12">
                Every digital product and workflow is part of a bigger system. We design architecture that grows with your organization — aligning design with business goals.
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
  const bullets = ["Modular Architecture", "Clear Boundaries", "Independent Teams", "Predictable Growth"];

  return (
    <section className="min-h-screen flex items-center bg-[#f7f7f7]">
      <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-0">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
          <div>
            <Reveal visible={visible} delay={0}>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-400 mb-3">Stage 02</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-6">SCALE</h2>
              <p className="text-neutral-500 leading-relaxed max-w-md mb-10">
                By enforcing clear boundaries and ownership of each component, we make future growth predictable. Teams can move independently and innovate in parallel.
              </p>
            </Reveal>
            <div className="space-y-3">
              {bullets.map((b, i) => (
                <Reveal key={b} visible={visible} delay={200 + i * 80}>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-black" />
                    <span className="text-sm font-medium text-black">{b}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal visible={visible} delay={250}>
            <div className="aspect-square max-w-[400px] mx-auto w-full border border-neutral-200 p-8 flex flex-col justify-between">
              <div className="flex gap-4">
                <div className="flex-1 h-16 border border-neutral-300" />
                <div className="flex-1 h-16 border border-neutral-300" />
              </div>
              <div className="h-px bg-neutral-200 my-4" />
              <div className="flex gap-4">
                <div className="flex-1 h-12 border border-neutral-300" />
                <div className="flex-1 h-12 border border-neutral-300" />
                <div className="flex-1 h-12 border border-neutral-300" />
              </div>
              <div className="h-px bg-neutral-200 my-4" />
              <div className="h-20 border border-neutral-300" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Scene4 = () => {
  const { ref, visible } = useSceneVisibility();
  const impacts = ["Scalable product strategy", "Systemized design", "Safe iteration and expansion"];

  return (
    <section className="min-h-screen flex items-center bg-white">
      <div ref={ref} className="w-full max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-0 text-center">
        <Reveal visible={visible} delay={0}>
          <span className="text-[100px] md:text-[160px] font-bold leading-none text-neutral-100 select-none block mb-4">02</span>
        </Reveal>
        <Reveal visible={visible} delay={100}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-6">OUTCOME</h2>
        </Reveal>
        <div className="space-y-5 mt-12">
          {impacts.map((line, i) => (
            <Reveal key={i} visible={visible} delay={250 + i * 100}>
              <p className="text-xl md:text-2xl lg:text-3xl font-medium text-black">{line}</p>
            </Reveal>
          ))}
        </div>
        <Reveal visible={visible} delay={600}>
          <div className="mt-20"><Divider visible={visible} delay={650} /></div>
          <p className="mt-10 text-sm text-neutral-400">This is how we build products, platforms & systems at MP.</p>
        </Reveal>
      </div>
    </section>
  );
};

const ProductPlatforms = () => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <Link to="/what-we-build" className="text-sm font-medium text-neutral-400 hover:text-black transition-colors duration-200">← WWB</Link>
          <span className="text-xs font-medium tracking-[0.15em] uppercase text-neutral-300">Product Platforms</span>
        </div>
      </nav>
      <main className="pt-14">
        <Scene1 />
        <Scene2 />
        <Scene3 />
        <Scene4 />
      </main>
    </div>
  );
};

export default ProductPlatforms;
