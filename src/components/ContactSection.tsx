import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding">
      <div className="content-container">
        <div ref={ref}>
          <motion.div
            className="border-t border-foreground/15 pt-16 md:pt-20"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ originX: 0 }}
          >
            <div className="overflow-hidden">
              <motion.h2
                className="display-headline text-foreground mb-8"
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : { y: "100%" }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              >
                Start with alignment.
              </motion.h2>
            </div>
            <motion.p
              className="body-large max-w-lg mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              MP works selectively. If alignment exists, conversations start naturally.
            </motion.p>
            <motion.p
              className="body-medium mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              We'll know quickly if it makes sense.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href="mailto:inmotion@movingp.com"
                className="inline-flex items-center gap-2 text-base font-bold text-foreground border border-foreground/20 rounded-full px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-300"
              >
                inmotion@movingp.com
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
