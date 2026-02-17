import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { VisualBreakFull } from "@/components/VisualBreak";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSceneVisibility, SceneReveal, SceneDivider } from "@/components/SceneReveal";

import visualCobuild from "@/assets/visual-cobuild-together.jpg";
import visualFlow1 from "@/assets/visual-flow-1.jpg";
import visualFlow3 from "@/assets/visual-flow-3.jpg";

/* ═══ SCENE 1 — Opening ═══ */
const Scene1 = () => {
  const { ref, visible } = useSceneVisibility(0.3);
  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center bg-background relative">
      <SceneReveal visible={visible} delay={0} className="absolute top-8 left-6 md:left-12">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">Partnership & Co-Building</p>
      </SceneReveal>
      <div className="text-center max-w-3xl mx-auto px-6">
        <SceneReveal visible={visible} delay={100}>
          <h1 className="display-headline">Build together.</h1>
        </SceneReveal>
        <SceneReveal visible={visible} delay={250}>
          <div className="mt-8 mb-8"><SceneDivider visible={visible} delay={350} /></div>
        </SceneReveal>
        <SceneReveal visible={visible} delay={350}>
          <p className="body-large max-w-xl mx-auto">
            Some projects don't need a vendor. They need a co-founder. Shared conviction, shared risk, shared upside. That's where the best work happens.
          </p>
        </SceneReveal>
      </div>
    </section>
  );
};

/* ═══ SCENE 2 — Partner ═══ */
const Scene2 = () => {
  const { ref, visible } = useSceneVisibility();
  const blocks = [
    { title: "Long-term Commitment", desc: "We're in it for the journey. Quick wins are for consultants. We build what lasts." },
    { title: "Shared Equity & Rewards", desc: "Skin in the game. We invest effort and ownership alongside founders because alignment only works when it's mutual." },
    { title: "Hands-On Capability", desc: "Strategy, design, engineering — we don't advise from the sidelines. We're in the codebase, in the pitch, in the room." },
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
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">How we show up</p>
              <h2 className="section-headline mb-6">Partner</h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg mb-12">
                Every engagement starts with shared vision and mutual conviction. From day one, we act as co-founders — investing effort and equity alongside you. If we don't believe in it, we don't do it.
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

/* ═══ SCENE 3 — Evolve ═══ */
const Scene3 = () => {
  const { ref, visible } = useSceneVisibility();
  return (
    <section className="min-h-screen flex items-center bg-secondary">
      <div ref={ref} className="w-full max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-0">
        <SceneReveal visible={visible} delay={0}>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">What happens next</p>
          <h2 className="section-headline mb-10">Evolve</h2>
        </SceneReveal>
        <SceneReveal visible={visible} delay={150}>
          <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-8 font-display">
            When a partnership proves successful, some collaborations naturally evolve into something new.
          </p>
        </SceneReveal>
        <SceneReveal visible={visible} delay={300}>
          <p className="text-muted-foreground leading-relaxed max-w-xl mb-8">
            At that point, we shift from service to co-ownership — formalizing a joint company or product.
            We don't measure success by hours billed. We measure it by momentum created together.
          </p>
        </SceneReveal>
        <SceneReveal visible={visible} delay={400}>
          <div className="mt-16"><SceneDivider visible={visible} delay={450} /></div>
          <p className="mt-10 text-sm text-muted-foreground">This is how we partner at MP.</p>
        </SceneReveal>
      </div>
    </section>
  );
};

/* ═══ PAGE ═══ */
const CoBuild = () => {
  useDocumentTitle("Co-Build Partnerships — MP");
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        <Scene1 />

        <VisualBreakFull
          image={visualCobuild}
          alt="Hands shaping clay together — partnership in motion"
        />

        <Scene2 />

        <VisualBreakFull
          image={visualFlow1}
          alt="Water flowing — natural momentum between partners"
        />

        <Scene3 />
      </main>
      <Footer />
    </div>
  );
};

export default CoBuild;
