import { useEffect, useRef, useState } from "react";
import mpLogo from "@/assets/mp-logo.png";
import parallaxVideo from "@/assets/parallax-bg.mp4";

const services = [
  {
    title: "Brand & Positioning",
    description:
      "Clarity before aesthetics. We define what matters, remove what doesn't, and give teams language they can build with.",
  },
  {
    title: "Products, Platforms & Systems",
    description:
      "We design and build digital products, internal tools, and workflows as connected systems. Everything we build is meant to scale with decision-making, not just traffic.",
  },
  {
    title: "AI & Automation",
    description:
      "Applied selectively. Only where it removes friction, increases leverage, or fundamentally changes how work gets done. No experiments for the sake of trend.",
  },
  {
    title: "Partnership & Co-Building",
    description:
      "Long-term collaborations with shared ownership and responsibility. Some partnerships start as build work. The right ones evolve into ventures.",
  },
];

const ParallaxHome = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Hide fixed layers once we scroll past the parallax container
  const pastParallax = scrollProgress >= 0.98;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = containerRef.current.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scene boundaries (0-1 range)
  const scene1End = 0.3;
  const scene2Start = 0.25;
  const scene2End = 0.6;
  const scene3Start = 0.55;

  // Scene opacities with crossfade
  const scene1Opacity = scrollProgress < scene1End
    ? 1 - Math.max(0, (scrollProgress - (scene1End - 0.1)) / 0.1)
    : 0;

  const scene2Opacity =
    scrollProgress < scene2Start
      ? Math.max(0, (scrollProgress - (scene2Start - 0.05)) / 0.05)
      : scrollProgress > scene2End
      ? 1 - Math.min(1, (scrollProgress - (scene2End - 0.1)) / 0.1)
      : 1;

  const scene3Opacity =
    scrollProgress < scene3Start
      ? Math.max(0, (scrollProgress - (scene3Start - 0.05)) / 0.05)
      : 1;

  // Parallax Y offsets
  const scene1Y = scrollProgress * -120;
  const scene2Y = (scrollProgress - 0.4) * -80;
  const scene3Y = (scrollProgress - 0.7) * -60;

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      {/* Fixed video background */}
      {!pastParallax && (
        <div className="fixed inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{
              filter: "brightness(0.3)",
              transform: `scale(${1 + scrollProgress * 0.15})`,
              transition: "transform 0.1s linear",
            }}
          >
            <source src={parallaxVideo} type="video/mp4" />
          </video>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>
      )}

      {/* Fixed content layer */}
      {!pastParallax && (
        <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
        {/* Scene 1 — Hero */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
          style={{
            opacity: scene1Opacity,
            transform: `translateY(${scene1Y}px)`,
            transition: "opacity 0.05s linear",
          }}
        >
          <img
            src={mpLogo}
            alt="MP — Moving People"
            className="h-12 md:h-16 lg:h-20 w-auto mb-8 opacity-90"
          />
          <p className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-white/50 mb-6">
            Moving People
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-white text-center leading-[1.05] max-w-4xl">
            MP exists to move people forward.
          </h1>
        </div>

        {/* Scene 2 — What MP Is */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
          style={{
            opacity: scene2Opacity,
            transform: `translateY(${scene2Y}px)`,
            transition: "opacity 0.05s linear",
          }}
        >
          <p className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-white/40 mb-6">
            What MP Is
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white text-center leading-[1.1] max-w-3xl mb-8">
            MP is a partnership-led build studio.
          </h2>
          <div className="w-12 h-px bg-white/20 mb-8" />
          <p className="text-base md:text-lg lg:text-xl text-white/60 text-center leading-relaxed max-w-2xl">
            We work alongside founders and teams — thinking, building, and
            deciding together. Through shared responsibility, clear thinking,
            and disciplined execution. When we commit, we commit as owners.
          </p>
        </div>

        {/* Scene 3 — What We Build */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 py-20"
          style={{
            opacity: scene3Opacity,
            transform: `translateY(${scene3Y}px)`,
            transition: "opacity 0.05s linear",
          }}
        >
          <p className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-white/40 mb-10">
            What We Build
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 max-w-4xl w-full rounded-xl overflow-hidden pointer-events-auto">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-black/50 backdrop-blur-md p-6 md:p-8 lg:p-10"
              >
                <h3 className="text-base md:text-lg font-medium text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-sm md:text-base text-white/50 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}

      {!pastParallax && (
        <div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20"
          style={{
            opacity: scrollProgress < 0.05 ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">
              Scroll
            </span>
            <div className="w-px h-8 bg-white/20 animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ParallaxHome;
