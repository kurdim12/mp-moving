import { motion } from "framer-motion";
import MagneticHover from "@/components/MagneticHover";
import CinematicOverlay from "@/components/CinematicOverlay";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0B0B0D" }}
    >
      <CinematicOverlay />

      <div className="relative z-10 text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6"
          style={{ color: "hsl(40, 20%, 96%)" }}
        >
          Start with alignment.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="text-lg md:text-xl font-light mb-12"
          style={{ color: "hsl(40, 20%, 96%, 0.5)" }}
        >
          Selectively.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <MagneticHover strength={6}>
            <a
              href="mailto:inmotion@movingp.com"
              className="inline-block text-base md:text-lg font-medium tracking-wide border border-white/20 px-8 py-4 md:px-10 md:py-5 transition-all duration-300 hover:bg-white/10 hover:border-white/40"
              style={{ color: "hsl(40, 20%, 96%)" }}
              data-magnetic
            >
              inmotion@movingp.com
            </a>
          </MagneticHover>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
