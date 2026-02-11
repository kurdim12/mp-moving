import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/* ─── helpers ─── */
function useOnScreen(ref: React.RefObject<HTMLElement>, threshold = 0.25) {
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

/* ─── Scene wrapper ─── */
const Scene = ({
  children,
  className,
  bg = "bg-white",
}: {
  children: React.ReactNode;
  className?: string;
  bg?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref as React.RefObject<HTMLElement>, 0.15);
  return (
    <section
      ref={ref}
      className={cn(
        "relative min-h-screen flex items-center transition-opacity duration-[400ms] ease-out",
        bg,
        visible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {children}
    </section>
  );
};

/* ─── Staggered child ─── */
const Reveal = ({
  children,
  delay = 0,
  visible,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  visible: boolean;
  className?: string;
}) => (
  <div
    className={cn(
      "transition-all duration-[400ms] ease-out",
      visible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-[10px]",
      className
    )}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

/* ─── Animated divider ─── */
const Divider = ({ visible, delay = 0 }: { visible: boolean; delay?: number }) => (
  <div
    className={cn(
      "h-px bg-black origin-left transition-transform duration-[400ms] ease-out",
      visible ? "scale-x-100" : "scale-x-0"
    )}
    style={{ transitionDelay: `${delay}ms` }}
  />
);

/* ─── Scene hooks ─── */
function useSceneVisibility() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref as React.RefObject<HTMLElement>, 0.2);
  return { ref, visible };
}

/* ════════════════════════════════════════════
   SCENES
   ════════════════════════════════════════════ */

const Scene1Entry = () => {
  const { ref, visible } = useSceneVisibility();
  const [scrollLocked, setScrollLocked] = useState(true);

  useEffect(() => {
    if (scrollLocked) {
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => {
        setScrollLocked(false);
        document.body.style.overflow = "";
      }, 1200);
      return () => { clearTimeout(t); document.body.style.overflow = ""; };
    }
  }, [scrollLocked]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-white"
    >
      <div className="text-center max-w-3xl mx-auto px-6">
        <Reveal visible={visible} delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[1.08]">
            Brand is not design.
            <br />
            It is structure.
          </h1>
        </Reveal>

        <Reveal visible={visible} delay={300}>
          <div className="mt-8 mb-8">
            <Divider visible={visible} delay={500} />
          </div>
        </Reveal>

        <Reveal visible={visible} delay={500}>
          <p className="text-lg md:text-xl text-neutral-500 font-normal leading-relaxed">
            We build brand systems engineered for scale.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

const Scene2Define = () => {
  const { ref, visible } = useSceneVisibility();
  const blocks = [
    { title: "Positioning Architecture", desc: "Where you stand and why it matters." },
    { title: "Messaging Framework", desc: "Language that compounds across every touchpoint." },
    { title: "Audience Definition", desc: "Precision over personas." },
  ];

  return (
    <Scene bg="bg-white">
      <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-0">
        <div className="grid md:grid-cols-[200px_1fr] gap-12 md:gap-20 items-start">
          {/* Number */}
          <Reveal visible={visible} delay={0}>
            <span className="text-[120px] md:text-[180px] font-bold leading-none text-neutral-100 select-none block">
              01
            </span>
          </Reveal>

          {/* Content */}
          <div>
            <Reveal visible={visible} delay={150}>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-400 mb-3">
                Stage 01
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-6">
                DEFINE
              </h2>
              <p className="text-neutral-500 leading-relaxed max-w-lg mb-12">
                Before anything is designed, everything is clarified. Positioning, language, and audience — defined with surgical precision so nothing downstream is wasted.
              </p>
            </Reveal>

            <div className="space-y-0">
              {blocks.map((b, i) => (
                <Reveal key={b.title} visible={visible} delay={300 + i * 100}>
                  <div>
                    {i > 0 && <Divider visible={visible} delay={350 + i * 100} />}
                    <div className="py-6">
                      <h3 className="text-base font-semibold text-black mb-1">{b.title}</h3>
                      <p className="text-sm text-neutral-400">{b.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
              <Divider visible={visible} delay={700} />
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
};

const Scene3Structure = () => {
  const { ref, visible } = useSceneVisibility();
  const bullets = ["Identity System", "Visual Language", "Component Logic", "Governance Rules"];

  return (
    <Scene bg="bg-[#f7f7f7]">
      <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-0">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* Left */}
          <div>
            <Reveal visible={visible} delay={0}>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-400 mb-3">
                Stage 02
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-6">
                STRUCTURE
              </h2>
              <p className="text-neutral-500 leading-relaxed max-w-md mb-10">
                Every identity decision is systematized. Typography, color, spacing, and component logic — codified into rules that hold at any scale.
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

          {/* Right — minimal diagram placeholder */}
          <Reveal visible={visible} delay={300}>
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

        <Reveal visible={visible} delay={500}>
          <div className="mt-16">
            <Divider visible={visible} delay={600} />
          </div>
        </Reveal>
      </div>
    </Scene>
  );
};

const Scene4Systemize = () => {
  const { ref, visible } = useSceneVisibility();
  const modules = [
    { title: "Design System", desc: "Scalable component library with governance." },
    { title: "Digital Templates", desc: "Production-ready assets across all channels." },
    { title: "Automation Layer", desc: "Workflows that eliminate manual brand work." },
    { title: "Asset Governance", desc: "Control, versioning, and distribution at scale." },
  ];

  return (
    <Scene bg="bg-white">
      <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-0">
        <Reveal visible={visible} delay={0}>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-400 mb-3">
            Stage 03
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-16">
            SYSTEMIZE
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-px bg-neutral-200">
          {modules.map((m, i) => (
            <Reveal key={m.title} visible={visible} delay={200 + i * 100}>
              <div className="bg-white p-8 md:p-10 relative">
                <div
                  className={cn(
                    "absolute top-0 left-0 right-0 h-px bg-black origin-left transition-transform duration-[400ms] ease-out",
                    visible ? "scale-x-100" : "scale-x-0"
                  )}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
                />
                <h3 className="text-base font-semibold text-black mb-2">{m.title}</h3>
                <p className="text-sm text-neutral-400">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Scene>
  );
};

const Scene5Scale = () => {
  const { ref, visible } = useSceneVisibility();
  const impacts = [
    "+40% brand clarity across touchpoints",
    "Faster launch cycles",
    "Consistent global rollout",
  ];

  return (
    <Scene bg="bg-white">
      <div ref={ref} className="w-full max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-0 text-center">
        <Reveal visible={visible} delay={0}>
          <span className="text-[100px] md:text-[160px] font-bold leading-none text-neutral-100 select-none block mb-4">
            04
          </span>
        </Reveal>

        <Reveal visible={visible} delay={150}>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-400 mb-3">
            Stage 04
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-6">
            SCALE
          </h2>
          <p className="text-neutral-500 leading-relaxed max-w-lg mx-auto mb-16">
            A brand system is only valuable if it compounds. We engineer for long-term consistency — across teams, markets, and time.
          </p>
        </Reveal>

        <div className="space-y-6">
          {impacts.map((line, i) => (
            <Reveal key={i} visible={visible} delay={350 + i * 120}>
              <p className="text-xl md:text-2xl lg:text-3xl font-medium text-black">
                {line}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal visible={visible} delay={800}>
          <div className="mt-20">
            <Divider visible={visible} delay={900} />
          </div>
          <p className="mt-10 text-sm text-neutral-400">
            This is how we build brand systems at MP.
          </p>
        </Reveal>
      </div>
    </Scene>
  );
};

/* ════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════ */

const BrandSystems = () => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Sticky nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="text-sm font-medium text-neutral-400 hover:text-black transition-colors duration-200"
          >
            ← Back to What We Build
          </Link>
          <span className="text-xs font-medium tracking-[0.15em] uppercase text-neutral-300">
            Brand &amp; Systems
          </span>
        </div>
      </nav>

      <main className="pt-14">
        <Scene1Entry />
        <Scene2Define />
        <Scene3Structure />
        <Scene4Systemize />
        <Scene5Scale />
      </main>
    </div>
  );
};

export default BrandSystems;
