import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSceneVisibility, SceneReveal, SceneDivider } from "@/components/SceneReveal";

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
            We engineer positioning, identity, and systems designed to scale.
          </p>
        </SceneReveal>
      </div>
    </section>
  );
};

const Scene2 = () => {
  const { ref, visible } = useSceneVisibility();
  const blocks = [
    { title: "Positioning Architecture", desc: "Where you stand and why it matters." },
    { title: "Messaging Framework", desc: "Language that compounds across every touchpoint." },
    { title: "Audience Definition", desc: "Precision over personas." },
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
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Stage 01</p>
              <h2 className="section-headline mb-6">DEFINE</h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg mb-12">
                Before anything is designed, everything is clarified. Positioning, language, and audience — defined with surgical precision so nothing downstream is wasted.
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

const Scene3 = () => {
  const { ref, visible } = useSceneVisibility();
  const bullets = ["Identity System", "Visual Language", "Component Logic", "Governance Rules"];

  return (
    <section className="min-h-screen flex items-center bg-secondary">
      <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-0">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
          <div>
            <SceneReveal visible={visible} delay={0}>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Stage 02</p>
              <h2 className="section-headline mb-6">STRUCTURE</h2>
              <p className="text-muted-foreground leading-relaxed max-w-md mb-10">
                Every identity decision is systematized. Typography, color, spacing, and component logic — codified into rules that hold at any scale.
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

const Scene4 = () => {
  const { ref, visible } = useSceneVisibility();
  const modules = [
    { title: "Design System", desc: "Scalable component library with governance." },
    { title: "Digital Templates", desc: "Production-ready assets across all channels." },
    { title: "Automation Layer", desc: "Workflows that eliminate manual brand work." },
    { title: "Asset Governance", desc: "Control, versioning, and distribution at scale." },
  ];

  return (
    <section className="min-h-screen flex items-center bg-background">
      <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-0">
        <SceneReveal visible={visible} delay={0}>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Stage 03</p>
          <h2 className="section-headline mb-16">SYSTEMIZE</h2>
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
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Stage 04</p>
          <h2 className="section-headline mb-6">SCALE</h2>
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
          <p className="mt-10 text-sm text-muted-foreground">This is how we build brand systems at MP.</p>
        </SceneReveal>
      </div>
    </section>
  );
};

const BrandSystems = () => {
  useDocumentTitle("Brand Systems — MP");
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        <Scene1 />
        <Scene2 />
        <Scene3 />
        <Scene4 />
        <Scene5 />
      </main>
      <Footer />
    </div>
  );
};

export default BrandSystems;
