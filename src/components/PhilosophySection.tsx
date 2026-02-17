import { useGsapSplitText, useGsapReveal, useGsapParallax } from "@/hooks/useGsap";
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

const SectionStatement = () => {
  const ref = useGsapSplitText({ type: "chars", stagger: 0.03, y: 60, ease: "back.out(1.6)" });
  return (
    <div ref={ref} className="section-padding" style={{ perspective: "600px" }}>
      <div className="content-container">
        <h2 data-split className="display-massive text-foreground">
          we create
        </h2>
        <h2 data-split className="display-massive text-muted-foreground">
          alignment.
        </h2>
      </div>
    </div>
  );
};

const ContentBlock = ({ image, title, text }: { image: string; title: string; text: string }) => {
  const imgRef = useGsapParallax(0.12);
  const textRef = useGsapReveal({ stagger: 0.15 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
      <div ref={imgRef} className="overflow-hidden rounded-lg aspect-[4/3]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div ref={textRef} className="flex flex-col justify-center py-4">
        <h3 data-gsap className="text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">
          {title}
        </h3>
        <p data-gsap className="text-muted-foreground leading-[1.7] text-base md:text-lg max-w-md">
          {text}
        </p>
      </div>
    </div>
  );
};

const PhilosophySection = () => {
  return (
    <section className="w-full">
      <SectionStatement />
      <div className="content-container space-y-24 md:space-y-32 pb-24 md:pb-32">
        {blocks.map((block, index) => (
          <ContentBlock key={index} {...block} />
        ))}
      </div>
    </section>
  );
};

export default PhilosophySection;
