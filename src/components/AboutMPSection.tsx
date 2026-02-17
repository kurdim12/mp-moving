import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import visualPartnership from "@/assets/wwb-partnerships.jpg";

/* Clip reveal for section headings */
const SectionStatement = () => {
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
            we grow
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.h2
            className="display-massive text-muted-foreground"
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : { y: "100%" }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
          >
            together.
          </motion.h2>
        </div>
      </div>
    </div>
  );
};

const AboutMPSection = () => {
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const venturesRef = useRef(null);
  const textInView = useInView(textRef, { once: true, margin: "-80px" });
  const venturesInView = useInView(venturesRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.05, 1]);

  return (
    <section className="w-full">
      <SectionStatement />

      <div className="content-container pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Image with parallax */}
          <div ref={imgRef} className="overflow-hidden rounded-lg aspect-[4/3]">
            <motion.img
              src={visualPartnership}
              alt="Partnership"
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ y: imgY, scale: imgScale }}
            />
          </div>

          {/* Text */}
          <div ref={textRef} className="flex flex-col justify-center py-4 space-y-8">
            <div className="overflow-hidden">
              <motion.p
                className="text-xl md:text-2xl font-bold text-foreground leading-snug tracking-tight"
                initial={{ y: "100%" }}
                animate={textInView ? { y: "0%" } : { y: "100%" }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Moving People is a globally connected, remote-first build group.
              </motion.p>
            </div>
            <motion.p
              className="text-muted-foreground leading-[1.7] text-base md:text-lg max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={textInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
              We were founded on a simple belief: partnership drives lasting impact. Our team operates across disciplines and geographies, but is united by one ethos.
            </motion.p>
            <div className="space-y-3 pt-4">
              {["Clarity before scale.", "Structure before speed.", "Ownership before optics."].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.p
                    className="text-lg font-bold text-foreground"
                    initial={{ y: "100%" }}
                    animate={textInView ? { y: "0%" } : { y: "100%" }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 + i * 0.1 }}
                  >
                    {line}
                  </motion.p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ventures */}
      <div className="content-container pb-24 md:pb-32">
        <div ref={venturesRef}>
          <motion.div
            className="border-t border-foreground/15 pt-16"
            initial={{ scaleX: 0 }}
            animate={venturesInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ originX: 0 }}
          >
            <div className="overflow-hidden">
              <motion.p
                className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8"
                initial={{ y: "100%" }}
                animate={venturesInView ? { y: "0%" } : { y: "100%" }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              >
                Ventures
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.h3
                className="section-headline text-foreground mb-8 max-w-xl"
                initial={{ y: "100%" }}
                animate={venturesInView ? { y: "0%" } : { y: "100%" }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
              >
                We build and co-own what we believe in.
              </motion.h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 mt-12">
              {[
                { title: "MP Build", text: "We originate and fully own these projects. We generate the idea and use MP's resources to develop it from scratch." },
                { title: "MP Co-Build", text: "Co-founded projects with external partners. We collaborate from the ground up — shaping the concept, sharing equity, and executing jointly." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-background p-8 md:p-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={venturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 + i * 0.15 }}
                >
                  <h4 className="text-xl font-bold text-foreground mb-4">{item.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMPSection;
