import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSceneVisibility, SceneReveal, SceneDivider } from "@/components/SceneReveal";

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
            Long-term collaborations with shared ownership and responsibility. We don't just deliver projects and leave — we build ventures with our partners.
          </p>
        </SceneReveal>
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
    <section className="min-h-screen flex items-center bg-background">
      <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-0">
        <div className="grid md:grid-cols-[200px_1fr] gap-12 md:gap-20 items-start">
          <SceneReveal visible={visible} delay={0}>
            <span className="text-[120px] md:text-[180px] font-bold leading-none text-muted/50 select-none block font-body">01</span>
          </SceneReveal>
          <div>
            <SceneReveal visible={visible} delay={100}>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">How We Partner</p>
              <h2 className="section-headline mb-6">PARTNER</h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg mb-12">
                Our engagements start with a shared vision and mutual conviction. From day one, we act as co-founders, investing effort and equity alongside you.
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
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Evolution</p>
          <h2 className="section-headline mb-8">EVOLVE</h2>
        </SceneReveal>
        <SceneReveal visible={visible} delay={150}>
          <p className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-8">
            When the partnership proves successful, some collaborations naturally evolve into a new venture.
          </p>
        </SceneReveal>
        <SceneReveal visible={visible} delay={300}>
          <p className="text-muted-foreground leading-relaxed max-w-xl mb-8">
            At that point, we shift from service to co-ownership, formalizing a joint company or product.
            We measure success not by hours billed but by how much momentum we've created together.
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

const CoBuild = () => {
  useDocumentTitle("Co-Build Partnerships — MP");
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

export default CoBuild;
