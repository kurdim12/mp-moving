import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { VisualBreakFull } from "@/components/VisualBreak";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSceneVisibility, SceneReveal, SceneDivider } from "@/components/SceneReveal";

import visualBrandDefine from "@/assets/visual-brand-define.jpg";
import visualStructure from "@/assets/visual-structure-4.jpg";
import visualFramework from "@/assets/visual-framework.jpg";

/* ═══ SCENE 1 — Opening statement ═══ */
const Scene1 = () => {
  const { ref, visible } = useSceneVisibility(0.3);
  const [locked, setLocked] = useState(true);

  useEffect(() => {
    if (locked) {
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => {
        setLocked(false);
        document.body.style.overflow = "";
      }, 1000);
      return () => { clearTimeout(t); document.body.style.overflow = ""; };
    }
  }, [locked]);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center bg-background relative">
      <SceneReveal visible={visible} delay={0} className="absolute top-8 left-6 md:left-12">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">Brand Systems</p>
      </SceneReveal>
      <div className="text-center max-w-3xl mx-auto px-6">
        <SceneReveal visible={visible} delay={100}>
          <h1 className="display-headline">Brand is structure.</h1>
        </SceneReveal>
        <SceneReveal visible={visible} delay={250}>
          <div className="mt-8 mb-8"><SceneDivider visible={visible} delay={350} /></div>
        </SceneReveal>
        <SceneReveal visible={visible} delay={350}>
          <p className="body-large max-w-xl mx-auto">
            Not a logo. Not a color palette. Brand is the architecture beneath every decision your company makes. We build that architecture.
          </p>
        </SceneReveal>
      </div>
    </section>
  );
};

/* ═══ SCENE 2 — Define ═══ */
const Scene2 = () => {
  const { ref, visible } = useSceneVisibility();
  const blocks = [
    { title: "Positioning Architecture", desc: "Where you stand in the market — clarified with surgical precision so nothing downstream is wasted." },
    { title: "Messaging Framework", desc: "Language that compounds. Every touchpoint reinforces the same truth." },
    { title: "Audience Definition", desc: "Not personas. Precision. Who moves when you speak, and why." },
  ];

  return (
    <section className="min-h-screen flex items-center bg-background">
      <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-0">
        <div className="grid md:grid-cols-[200px_1fr] gap-12 md:gap-20 items-start">
          <SceneReveal visible={visible} delay={0}>
            <span className="text-[120px] md:text-[180px] font-bold leading-none text-muted/50 select-none block font-body">01</span>
          </SceneReveal>
          <div>
            <SceneReveal visible={visible} delay={100}>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Before design, clarity</p>
              <h2 className="section-headline mb-6">Define</h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg mb-12">
                Most brands start designing before they know what they stand for. We start with the harder question: what are you, and what are you not? The answer becomes the foundation everything else is built on.
              </p>
            </SceneReveal>
            <div className="space-y-0">
              {blocks.map((b, i) => (
                <SceneReveal key={b.title} visible={visible} delay={250 + i * 100}>
                  <div>
                    {i > 0 && <SceneDivider visible={visible} delay={300 + i * 100} />}
                    <div className="py-6">
                      <h3 className="text-base font-semibold text-foreground mb-1 font-body">{b.title}</h3>
                      <p className="text-sm text-muted-foreground">{b.desc}</p>
                    </div>
                  </div>
                </SceneReveal>
              ))}
              <SceneDivider visible={visible} delay={650} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══ SCENE 3 — Structure ═══ */
const Scene3 = () => {
  const { ref, visible } = useSceneVisibility();
  const bullets = ["Identity System", "Visual Language", "Component Logic", "Governance Rules"];

  return (
    <section className="min-h-screen flex items-center bg-secondary">
      <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-0">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
          <div>
            <SceneReveal visible={visible} delay={0}>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">From decisions to systems</p>
              <h2 className="section-headline mb-6">Structure</h2>
              <p className="text-muted-foreground leading-relaxed max-w-md mb-10">
                Every identity decision gets codified. Typography, color, spacing, component logic — turned into rules that hold whether you're a team of five or five hundred. The system protects the brand when you're not in the room.
              </p>
            </SceneReveal>
            <div className="space-y-3">
              {bullets.map((b, i) => (
                <SceneReveal key={b} visible={visible} delay={200 + i * 80}>
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                    <span className="text-sm font-medium text-foreground font-body">{b}</span>
                  </div>
                </SceneReveal>
              ))}
            </div>
          </div>
          <SceneReveal visible={visible} delay={250}>
            <div className="aspect-square max-w-[400px] mx-auto w-full border border-border p-8 flex flex-col justify-between">
              <div className="flex gap-4">
                <div className="flex-1 h-16 border border-border" />
                <div className="flex-1 h-16 border border-border" />
              </div>
              <div className="h-px bg-border my-4" />
              <div className="flex gap-4">
                <div className="flex-1 h-12 border border-border" />
                <div className="flex-1 h-12 border border-border" />
                <div className="flex-1 h-12 border border-border" />
              </div>
              <div className="h-px bg-border my-4" />
              <div className="h-20 border border-border" />
            </div>
          </SceneReveal>
        </div>
        <SceneReveal visible={visible} delay={450}>
          <div className="mt-16"><SceneDivider visible={visible} delay={500} /></div>
        </SceneReveal>
      </div>
    </section>
  );
};

/* ═══ SCENE 4 — Systemize ═══ */
const Scene4 = () => {
  const { ref, visible } = useSceneVisibility();
  const modules = [
    { title: "Design System", desc: "A living library of components. Governed, versioned, scalable." },
    { title: "Digital Templates", desc: "Production-ready assets across every channel. No reinvention." },
    { title: "Automation Layer", desc: "Workflows that eliminate the manual work nobody should be doing." },
    { title: "Asset Governance", desc: "Control and distribution at scale. One source of truth." },
  ];

  return (
    <section className="min-h-screen flex items-center bg-background">
      <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-0">
        <SceneReveal visible={visible} delay={0}>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">From structure to infrastructure</p>
          <h2 className="section-headline mb-16">Systemize</h2>
        </SceneReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {modules.map((m, i) => (
            <SceneReveal key={m.title} visible={visible} delay={150 + i * 100}>
              <div className="bg-background p-8 md:p-10 relative min-h-[160px]">
                <div
                  className={`absolute top-0 left-0 right-0 h-px bg-foreground origin-left transition-transform duration-[350ms] ease-out ${visible ? "scale-x-100" : "scale-x-0"}`}
                  style={{ transitionDelay: `${250 + i * 100}ms` }}
                />
                <h3 className="text-base font-semibold text-foreground mb-2 font-body">{m.title}</h3>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
              </div>
            </SceneReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══ SCENE 5 — Scale ═══ */
const Scene5 = () => {
  const { ref, visible } = useSceneVisibility();
  const impacts = ["Faster launches", "Consistent execution", "Long-term brand clarity"];

  return (
    <section className="min-h-screen flex items-center bg-background">
      <div ref={ref} className="w-full max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-0 text-center">
        <SceneReveal visible={visible} delay={0}>
          <span className="text-[100px] md:text-[160px] font-bold leading-none text-muted/50 select-none block mb-4 font-body">04</span>
        </SceneReveal>
        <SceneReveal visible={visible} delay={100}>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">The result</p>
          <h2 className="section-headline mb-6">Scale</h2>
        </SceneReveal>
        <div className="space-y-5 mt-12">
          {impacts.map((line, i) => (
            <SceneReveal key={i} visible={visible} delay={250 + i * 100}>
              <p className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground">{line}</p>
            </SceneReveal>
          ))}
        </div>
        <SceneReveal visible={visible} delay={600}>
          <div className="mt-20"><SceneDivider visible={visible} delay={650} /></div>
          <p className="mt-10 text-sm text-muted-foreground">
            This is how we build brand systems at MP.
          </p>
        </SceneReveal>
      </div>
    </section>
  );
};

/* ═══ PAGE ═══ */
const BrandSystems = () => {
  useDocumentTitle("Brand Systems — MP");
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        <Scene1 />

        <VisualBreakFull
          image={visualBrandDefine}
          alt="Architectural blueprint geometry — the precision behind identity"
        />

        <Scene2 />

        <VisualBreakFull
          image={visualStructure}
          alt="Structural grid — codified systems at scale"
        />

        <Scene3 />
        <Scene4 />

        <VisualBreakFull
          image={visualFramework}
          alt="Framework lines — from structure to infrastructure"
        />

        <Scene5 />
      </main>
      <Footer />
    </div>
  );
};

export default BrandSystems;
