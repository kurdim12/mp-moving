import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const [counter, setCounter] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Set initial hidden state via GSAP (not inline styles)
  useEffect(() => {
    gsap.set([line1Ref.current, line2Ref.current], { yPercent: 120, scale: 0.9 });
    gsap.set(scrollRef.current, { opacity: 0, y: 20 });
  }, []);

  // Counter animation
  useEffect(() => {
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounter(Math.round(eased * 100));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else if (!hasAnimated.current) {
        hasAnimated.current = true;
        revealHero();
      }
    };
    requestAnimationFrame(tick);
  }, []);

  function revealHero() {
    const tl = gsap.timeline();

    // Fade out counter
    tl.to(counterRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: "power2.in",
    });

    // Pop in line 1 with bounce
    tl.to(
      line1Ref.current,
      { yPercent: 0, scale: 1, duration: 1.1, ease: "back.out(1.4)" },
      "-=0.1"
    );

    // Pop in line 2 with bounce (overlapping)
    tl.to(
      line2Ref.current,
      { yPercent: 0, scale: 1, duration: 1.1, ease: "back.out(1.4)" },
      "-=0.8"
    );

    // Scroll indicator fades in
    tl.to(
      scrollRef.current,
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );
  }

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Counter */}
      <div ref={counterRef} className="absolute top-24 left-6 md:left-10 lg:left-16 z-20">
        <span className="text-6xl md:text-8xl font-bold text-foreground/15 tabular-nums">
          {counter}%
        </span>
      </div>

      {/* Headline */}
      <div className="relative z-10 w-full content-container">
        <div className="overflow-hidden">
          <h1 ref={line1Ref} className="display-massive text-foreground text-center">
            we move people
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 ref={line2Ref} className="display-massive text-foreground text-center">
            forward.
          </h1>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
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
      </div>

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
