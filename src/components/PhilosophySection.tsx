import { RevealGroup, Reveal } from "@/components/RevealOnScroll";
import visualBrand from "@/assets/wwb-brand.jpg";
import visualPlatform from "@/assets/wwb-platform.jpg";
import visualAi from "@/assets/wwb-ai.jpg";

const blocks = [
  {
    image: visualBrand,
    title: "Partnership over delivery.",
    text: "We don't operate as a vendor. We align with founders who think long-term, share ownership, and build what matters — together. Alignment creates momentum. Momentum compounds.",
  },
  {
    image: visualPlatform,
    title: "Structure before speed.",
    text: "Clarity before aesthetics. Architecture before interface. We define what matters, remove what doesn't, and design systems that create stability. Stability is what enables growth.",
  },
  {
    image: visualAi,
    title: "Technology with direction.",
    text: "We use AI and automation selectively — only where it removes friction, increases leverage, or fundamentally changes how work gets done. No automation without judgment.",
  },
];

const PhilosophySection = () => {
  return (
    <section className="w-full">
      {/* Section statement */}
      <RevealGroup className="section-padding">
        <div className="content-container">
          <Reveal>
            <h2 className="display-massive text-foreground">
              we create
              <span className="inline-block mx-[0.4em] text-muted-foreground">alignment.</span>
            </h2>
          </Reveal>
        </div>
      </RevealGroup>

      {/* Content blocks */}
      <div className="content-container space-y-24 md:space-y-32 pb-24 md:pb-32">
        {blocks.map((block, index) => (
          <RevealGroup key={index} threshold={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              {/* Image */}
              <Reveal delay={100}>
                <div className="overflow-hidden rounded-lg aspect-[4/3]">
                  <img
                    src={block.image}
                    alt={block.title}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-[3000ms] ease-out"
                  />
                </div>
              </Reveal>

              {/* Text */}
              <div className="flex flex-col justify-center py-4">
                <Reveal delay={200}>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">
                    {block.title}
                  </h3>
                </Reveal>
                <Reveal delay={300}>
                  <p className="text-muted-foreground leading-[1.7] text-base md:text-lg max-w-md">
                    {block.text}
                  </p>
                </Reveal>
              </div>
            </div>
          </RevealGroup>
        ))}
      </div>
    </section>
  );
};

export default PhilosophySection;
