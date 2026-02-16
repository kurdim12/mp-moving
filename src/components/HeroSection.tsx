import { useState, useEffect } from "react";
import visualBg from "@/assets/visual-light-space.jpg";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance after mount
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-end">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={visualBg}
          alt=""
          className="w-full h-full object-cover"
          style={{
            transform: loaded ? "scale(1)" : "scale(1.08)",
            transition: "transform 2.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content anchored to bottom-left */}
      <div className="relative z-10 w-full pb-20 md:pb-28 lg:pb-32">
        <div className="content-container">
          <div className="max-w-3xl">
            {/* Overline */}
            <p
              className="text-xs font-medium tracking-[0.25em] uppercase mb-6 md:mb-8"
              style={{
                color: "rgba(255,255,255,0.5)",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.4s",
              }}
            >
              Moving People
            </p>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.08] tracking-tight mb-8 md:mb-10"
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                color: "rgba(255,255,255,0.95)",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(24px)",
                transition: "all 1s cubic-bezier(0.25, 0.1, 0.25, 1) 0.6s",
              }}
            >
              We exist to move
              <br />
              people forward.
            </h1>

            {/* Subtext */}
            <p
              className="text-base md:text-lg lg:text-xl leading-relaxed max-w-xl"
              style={{
                color: "rgba(255,255,255,0.55)",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.9s",
              }}
            >
              A partnership-driven build group. We work with people and teams to create clarity, structure, and momentum that compounds.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.5s",
        }}
      >
        <span
          className="text-[10px] font-medium tracking-[0.2em] uppercase"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Scroll
        </span>
        <div className="w-px h-8 overflow-hidden relative">
          <div
            className="w-full h-full bg-white/30"
            style={{
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
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
