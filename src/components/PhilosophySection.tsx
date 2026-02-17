import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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

/* Massive section header with word-by-word reveal */
const SectionStatement = ({ line1, line2 }: { line1: string; line2: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="section-padding">
      <div className="content-container">
        <div className="overflow-hidden">
          <motion.h2
            className="display-massive text-foreground"
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : { y: "100%" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {line1}
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            className="display-massive text-muted-foreground"
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : { y: "100%" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
          >
            {line2}
          </motion.h2>
        </div>
      </div>
    </div>
  );
};

/* Parallax image with scroll */
const ParallaxImage = ({ src, alt }: { src: string; alt: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1]);

  return (
    <div ref={ref} className="overflow-hidden rounded-lg aspect-[4/3]">
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
        style={{ y, scale }}
      />
    </div>
  );
};

/* Text block with staggered reveal */
const TextReveal = ({ title, text, delay = 0 }: { title: string; text: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="flex flex-col justify-center py-4">
      <div className="overflow-hidden">
        <motion.h3
          className="text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight"
          initial={{ y: "100%" }}
          animate={isInView ? { y: "0%" } : { y: "100%" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: delay + 0.1 }}
        >
          {title}
        </motion.h3>
      </div>
      <motion.p
        className="text-muted-foreground leading-[1.7] text-base md:text-lg max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: delay + 0.3 }}
      >
        {text}
      </motion.p>
    </div>
  );
};

const PhilosophySection = () => {
  return (
    <section className="w-full">
      <SectionStatement line1="we create" line2="alignment." />

      <div className="content-container space-y-24 md:space-y-32 pb-24 md:pb-32">
        {blocks.map((block, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            <ParallaxImage src={block.image} alt={block.title} />
            <TextReveal title={block.title} text={block.text} delay={index * 0.05} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhilosophySection;
