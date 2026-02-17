import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WhatMPIsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding">
      <div className="content-container">
        <div ref={ref} className="max-w-3xl">
          <div className="overflow-hidden">
            <motion.p
              className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground mb-8"
              initial={{ y: "100%" }}
              animate={isInView ? { y: "0%" } : { y: "100%" }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Moving People
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.p
              className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.2] text-foreground mb-8 tracking-tight"
              initial={{ y: "100%" }}
              animate={isInView ? { y: "0%" } : { y: "100%" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            >
              People create possibilities.
              <br />
              We exist to align people around what truly matters.
            </motion.p>
          </div>
          <motion.p
            className="body-large max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          >
            When alignment is clear, momentum becomes natural. We move people — and people move possibilities.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default WhatMPIsSection;
