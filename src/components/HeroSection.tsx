import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroSection = () => {
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState<"counting" | "revealing" | "done">("counting");
  const sectionRef = useRef<HTMLElement>(null);

  // Counter animation (0 → 100%)
  useEffect(() => {
    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounter(Math.round(eased * 100));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setPhase("revealing");
        setTimeout(() => setPhase("done"), 200);
      }
    };
    requestAnimationFrame(tick);
  }, []);

  const isRevealed = phase === "revealing" || phase === "done";

  return (
    <section ref={sectionRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Counter - top left, Mantis style */}
      <motion.div
        className="absolute top-24 left-6 md:left-10 lg:left-16 z-20"
        initial={{ opacity: 1 }}
        animate={{ opacity: isRevealed ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-6xl md:text-8xl font-bold text-foreground/15 tabular-nums">
          {counter}%
        </span>
      </motion.div>

      {/* Main headline - clip reveal */}
      <div className="relative z-10 w-full content-container">
        <div className="overflow-hidden">
          <motion.h1
            className="display-massive text-foreground text-center"
            initial={{ y: "110%" }}
            animate={{ y: isRevealed ? "0%" : "110%" }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.1,
            }}
          >
            we move people
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            className="display-massive text-foreground text-center"
            initial={{ y: "110%" }}
            animate={{ y: isRevealed ? "0%" : "110%" }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.25,
            }}
          >
            forward.
          </motion.h1>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground">
          Scroll
        </span>
        <div className="w-px h-10 overflow-hidden relative">
          <div
            className="w-full h-full bg-foreground/30"
            style={{ animation: "scrollPulse 2s ease-in-out infinite" }}
          />
        </div>
      </motion.div>

      <style>{`
        @keyframes scrollPulse {
          0% { transform: translateY(-100%); opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
