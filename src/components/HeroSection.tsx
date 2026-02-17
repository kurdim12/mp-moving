import { useState, useEffect } from "react";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 w-full content-container">
        <h1
          className="display-massive text-foreground text-center"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(40px)",
            transition: "all 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s",
          }}
        >
          we move people
          <br />
          forward.
        </h1>
      </div>

      {/* Scroll indicator - bottom center */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.8s",
        }}
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
