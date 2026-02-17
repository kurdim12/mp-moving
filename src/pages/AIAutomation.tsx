import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { VisualBreakFull } from "@/components/VisualBreak";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSceneVisibility, SceneReveal, SceneDivider } from "@/components/SceneReveal";

import visualAiLeverage from "@/assets/visual-ai-leverage.jpg";
import visualLightSpace from "@/assets/visual-light-space.jpg";
import visualThreshold from "@/assets/visual-threshold.jpg";

/* ═══ SCENE 1 — Opening ═══ */
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
            We don't chase trends. We apply AI where it removes friction, multiplies capability, or fundamentally changes the economics of how work gets done. Nowhere else.
          </p>
        </SceneReveal>
      </div>
    </section>
  );
};

/* ═══ SCENE 2 — Apply ═══ */
const Scene2 = () => {
  const { ref, visible } = useSceneVisibility();
  const blocks = [
    { title: "AI Agents", desc: "Intelligent systems for analysis, generation, and decision support — amplifying your team's judgment, never replacing it." },
    { title: "Automation Pipelines", desc: "End-to-end workflows for operations, marketing, and data processing. They run reliably in the background so your team can focus on what matters." },
    { title: "Human Oversight", desc: "Every system we build has a human in the loop. AI augments capability. Humans retain control." },
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
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Where we apply it</p>
              <h2 className="section-headline mb-6">Apply</h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg mb-12">
                Most companies adopt AI because it's available. We adopt it because it's necessary. We identify the exact points where automation creates disproportionate value — and leave everything else alone.
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

/* ═══ SCENE 3 — Principle ═══ */
const Scene3 = () => {
  const { ref, visible } = useSceneVisibility();
  return (
    <section className="min-h-screen flex items-center bg-secondary">
      <div ref={ref} className="w-full max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-0">
        <SceneReveal visible={visible} delay={0}>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Our conviction</p>
          <h2 className="section-headline mb-10">Principle</h2>
        </SceneReveal>
        <SceneReveal visible={visible} delay={150}>
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground leading-[1.2] mb-10 font-display italic">
            "AI isn't here to replace. It's here to multiply leverage."
          </blockquote>
        </SceneReveal>
        <SceneReveal visible={visible} delay={300}>
          <p className="text-muted-foreground leading-relaxed max-w-xl">
            We treat AI as a force multiplier — not a shortcut. Sustainable systems over hype cycles. We only implement when it genuinely enhances capability and aligns with where you're going long-term. No experiments for the sake of trend.
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

/* ═══ PAGE ═══ */
const AIAutomation = () => {
  useDocumentTitle("AI & Automation — MP");
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        <Scene1 />

        <VisualBreakFull
          image={visualAiLeverage}
          alt="Converging light — focused leverage through AI"
        />

        <Scene2 />

        <VisualBreakFull
          image={visualLightSpace}
          alt="Light in space — clarity over complexity"
        />

        <Scene3 />
      </main>
      <Footer />
    </div>
  );
};

export default AIAutomation;
