import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSceneVisibility, SceneReveal, SceneDivider } from "@/components/SceneReveal";

const Scene1 = () => {
  const { ref, visible } = useSceneVisibility(0.3);
  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center bg-background relative">
      <SceneReveal visible={visible} delay={0} className="absolute top-8 left-6 md:left-12">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">AI & Automation</p>
      </SceneReveal>
      <div className="text-center max-w-3xl mx-auto px-6">
        <SceneReveal visible={visible} delay={100}>
          <h1 className="display-headline">Multiply leverage.</h1>
        </SceneReveal>
        <SceneReveal visible={visible} delay={250}>
          <div className="mt-8 mb-8"><SceneDivider visible={visible} delay={350} /></div>
        </SceneReveal>
        <SceneReveal visible={visible} delay={350}>
          <p className="body-large max-w-xl mx-auto">
            Applied selectively. Only where it removes friction, increases leverage, or fundamentally changes how work gets done.
          </p>
        </SceneReveal>
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
    <section className="min-h-screen flex items-center bg-background">
      <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-0">
        <div className="grid md:grid-cols-[200px_1fr] gap-12 md:gap-20 items-start">
          <SceneReveal visible={visible} delay={0}>
            <span className="text-[120px] md:text-[180px] font-bold leading-none text-muted/50 select-none block font-body">01</span>
          </SceneReveal>
          <div>
            <SceneReveal visible={visible} delay={100}>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">How We Apply</p>
              <h2 className="section-headline mb-6">APPLY</h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg mb-12">
                We harness AI and automation to amplify human work, not replace it. We identify repeatable tasks or high-complexity problems and automate them intelligently.
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
  return (
    <section className="min-h-screen flex items-center bg-secondary">
      <div ref={ref} className="w-full max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-0">
        <SceneReveal visible={visible} delay={0}>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Philosophy</p>
          <h2 className="section-headline mb-8">PRINCIPLE</h2>
        </SceneReveal>
        <SceneReveal visible={visible} delay={150}>
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground leading-[1.2] mb-8 font-display">
            "AI isn't here to replace — it's here to multiply leverage."
          </blockquote>
        </SceneReveal>
        <SceneReveal visible={visible} delay={300}>
          <p className="text-muted-foreground leading-relaxed max-w-xl">
            We apply AI as a force multiplier — not a shortcut — focusing on sustainable systems rather than hype.
            We only implement AI when it truly enhances capabilities and aligns with long-term goals. No experiments for the sake of trend.
          </p>
        </SceneReveal>
        <SceneReveal visible={visible} delay={400}>
          <div className="mt-16"><SceneDivider visible={visible} delay={450} /></div>
          <p className="mt-10 text-sm text-muted-foreground">This is how we approach AI & automation at MP.</p>
        </SceneReveal>
      </div>
    </section>
  );
};

const AIAutomation = () => {
  useDocumentTitle("AI & Automation — MP");
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        <Scene1 />
        <Scene2 />
        <Scene3 />
      </main>
      <Footer />
    </div>
  );
};

export default AIAutomation;
