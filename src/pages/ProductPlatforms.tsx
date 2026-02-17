import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSceneVisibility, SceneReveal, SceneDivider } from "@/components/SceneReveal";

const Scene1 = () => {
  const { ref, visible } = useSceneVisibility(0.3);
  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center bg-background relative">
      <SceneReveal visible={visible} delay={0} className="absolute top-8 left-6 md:left-12">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">Products, Platforms & Systems</p>
      </SceneReveal>
      <div className="text-center max-w-3xl mx-auto px-6">
        <SceneReveal visible={visible} delay={100}>
          <h1 className="display-headline">Everything connects.</h1>
        </SceneReveal>
        <SceneReveal visible={visible} delay={250}>
          <div className="mt-8 mb-8"><SceneDivider visible={visible} delay={350} /></div>
        </SceneReveal>
        <SceneReveal visible={visible} delay={350}>
          <p className="body-large max-w-xl mx-auto">
            We design and build digital products, internal tools, and workflows as connected systems that scale with decision-making.
          </p>
        </SceneReveal>
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
    <section className="min-h-screen flex items-center bg-background">
      <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-0">
        <div className="grid md:grid-cols-[200px_1fr] gap-12 md:gap-20 items-start">
          <SceneReveal visible={visible} delay={0}>
            <span className="text-[120px] md:text-[180px] font-bold leading-none text-muted/50 select-none block font-body">01</span>
          </SceneReveal>
          <div>
            <SceneReveal visible={visible} delay={100}>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">What We Build</p>
              <h2 className="section-headline mb-6">BUILD</h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg mb-12">
                Every digital product and workflow is part of a bigger system. We design architecture that grows with your organization — aligning design with business goals.
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
  const bullets = ["Modular Architecture", "Clear Boundaries", "Independent Teams", "Predictable Growth"];

  return (
    <section className="min-h-screen flex items-center bg-secondary">
      <div ref={ref} className="w-full max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-0">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
          <div>
            <SceneReveal visible={visible} delay={0}>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-3">Stage 02</p>
              <h2 className="section-headline mb-6">SCALE</h2>
              <p className="text-muted-foreground leading-relaxed max-w-md mb-10">
                By enforcing clear boundaries and ownership of each component, we make future growth predictable. Teams can move independently and innovate in parallel.
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
      </div>
    </section>
  );
};

const Scene4 = () => {
  const { ref, visible } = useSceneVisibility();
  const impacts = ["Scalable product strategy", "Systemized design", "Safe iteration and expansion"];

  return (
    <section className="min-h-screen flex items-center bg-background">
      <div ref={ref} className="w-full max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-0 text-center">
        <SceneReveal visible={visible} delay={0}>
          <span className="text-[100px] md:text-[160px] font-bold leading-none text-muted/50 select-none block mb-4 font-body">02</span>
        </SceneReveal>
        <SceneReveal visible={visible} delay={100}>
          <h2 className="section-headline mb-6">OUTCOME</h2>
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
          <p className="mt-10 text-sm text-muted-foreground">This is how we build products, platforms & systems at MP.</p>
        </SceneReveal>
      </div>
    </section>
  );
};

const ProductPlatforms = () => {
  useDocumentTitle("Product Platforms — MP");
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        <Scene1 />
        <Scene2 />
        <Scene3 />
        <Scene4 />
      </main>
      <Footer />
    </div>
  );
};

export default ProductPlatforms;
