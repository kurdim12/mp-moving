import { useEffect, useRef, useCallback, useState } from "react";
import heroVideo from "@/assets/hero-video.mp4";

/* ─── palette ─── */
const BG = "#0B0B0D";
const TEXT_PRIMARY = "#F5F5F5";
const TEXT_SECONDARY = "#C7C7CC";
const ACCENT = "#D8B36A";

/* ─── particle canvas ─── */
interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

const PARTICLE_COUNT = 80;

const useParticles = (canvasRef: React.RefObject<HTMLCanvasElement | null>, scrollProgress: number) => {
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  const init = useCallback((w: number, h: number) => {
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 3 + 0.5,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.1,
      size: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.3 + 0.05,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particles.current.length === 0) init(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Shift particles based on scroll
      const drift = scrollProgress * 0.4;

      for (const p of particles.current) {
        p.x += p.vx + drift * p.z * 0.3;
        p.y += p.vy;

        // Wrap
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.y > canvas.height + 10) p.y = -10;
        if (p.y < -10) p.y = canvas.height + 10;

        const scale = p.z;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 245, 245, ${p.alpha * (0.5 + scale * 0.2)})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef, scrollProgress, init]);
};

/* ─── helpers ─── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.max(0, Math.min(1, t));
const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));

/* ─── services data ─── */
const services = [
  {
    title: "Brand & Positioning",
    highlight: "Clarity",
    description: "Clarity before aesthetics. We define what matters, remove what doesn't, and give teams language they can build with.",
  },
  {
    title: "Products, Platforms & Systems",
    highlight: "connected systems",
    description: "We design and build digital products, internal tools, and workflows as connected systems. Everything we build is meant to scale with decision-making, not just traffic.",
  },
  {
    title: "AI & Automation",
    highlight: "Applied selectively",
    lead: "Applied selectively.",
    description: "Only where it removes friction, increases leverage, or fundamentally changes how work gets done. No experiments for the sake of trend.",
  },
  {
    title: "Partnership & Co-Building",
    highlight: "evolve into ventures",
    description: "Long-term collaborations with shared ownership and responsibility. Some partnerships start as build work. The right ones evolve into ventures.",
  },
];

/* ─── highlighted text renderer ─── */
const HighlightedText = ({ text, highlight, opacity }: { text: string; highlight: string; opacity: number }) => {
  if (!highlight || !text.includes(highlight)) {
    return <span style={{ opacity }}>{text}</span>;
  }
  const parts = text.split(highlight);
  return (
    <span style={{ opacity }}>
      {parts[0]}
      <span style={{ color: ACCENT, opacity: lerp(0.6, 1, opacity) }}>{highlight}</span>
      {parts[1]}
    </span>
  );
};

/* ─── main component ─── */
const CinematicEngine = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useParticles(canvasRef, progress);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = containerRef.current.scrollHeight - window.innerHeight;
      const p = clamp(-rect.top / total);
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ─── scene progress mapping (0-1 total → per scene) ─── */
  // Scene 1: 0.00 - 0.20  (Existence)
  // Scene 2: 0.18 - 0.38  (What MP Is)
  // Scene 3: 0.35 - 0.58  (Co-Build Philosophy)
  // Scene 4: 0.55 - 1.00  (What We Build)

  const s1 = clamp((progress - 0.0) / 0.20);   // 0→1 within scene 1
  const s1fade = clamp((progress - 0.15) / 0.08); // fade out

  const s2in = clamp((progress - 0.16) / 0.06);
  const s2 = clamp((progress - 0.18) / 0.20);
  const s2fade = clamp((progress - 0.33) / 0.08);

  const s3in = clamp((progress - 0.33) / 0.06);
  const s3 = clamp((progress - 0.35) / 0.23);
  const s3fade = clamp((progress - 0.52) / 0.08);

  const s4in = clamp((progress - 0.52) / 0.06);
  const s4 = clamp((progress - 0.55) / 0.45);

  /* ─── cluster reveals for scene 3 ─── */
  const clusters = [
    { text: "We work alongside founders and teams,", x: "8%", y: "30%", mobileY: "22%" },
    { text: "thinking, building, and deciding together.", x: "55%", y: "25%", mobileY: "36%" },
    { text: "Through shared responsibility, clear thinking, and disciplined execution.", x: "12%", y: "58%", mobileY: "50%" },
    { text: "When we commit, we commit as owners.", x: "50%", y: "65%", mobileY: "66%" },
  ];

  /* ─── service reveal stagger for scene 4 ─── */
  const serviceProgress = (i: number) => clamp((s4 - 0.15 - i * 0.12) / 0.15);

  // Check if mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      ref={containerRef}
      data-cinematic
      style={{ height: "600vh", position: "relative", background: BG }}
    >
      {/* Fixed viewport */}
      <div
        className="fixed inset-0 overflow-hidden"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
          zIndex: 5,
          pointerEvents: progress > 0.98 ? "none" : "auto",
          opacity: progress > 0.96 ? lerp(1, 0, (progress - 0.96) / 0.04) : 1,
        }}
      >
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            zIndex: 0,
            filter: "brightness(0.35)",
            transform: `scale(${1 + progress * 0.1})`,
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ zIndex: 1 }}
        />

        {/* Subtle grain overlay */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
            opacity: 0.4,
            mixBlendMode: "overlay",
          }}
        />

        {/* Atmospheric gradient */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background: `radial-gradient(ellipse at ${50 + progress * 20}% ${40 + progress * 15}%, rgba(216,179,106,0.03) 0%, transparent 60%)`,
            transition: "background 0.3s ease",
          }}
        />

        {/* ═══════════════ SCENE 1 — EXISTENCE ═══════════════ */}
        <div
          className="absolute inset-0 flex items-center"
          style={{
            zIndex: 10,
            opacity: 1 - s1fade,
            transform: `translateY(${s1fade * -80}px) translateZ(${s1 * 30}px)`,
            pointerEvents: s1fade > 0.9 ? "none" : "auto",
          }}
        >
          <div
            className="w-full px-6 md:px-0"
            style={{
              marginLeft: isMobile ? "0" : "12vw",
              maxWidth: isMobile ? "100%" : "70vw",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <h1
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: isMobile ? "clamp(2rem, 8vw, 3rem)" : "clamp(3rem, 5.5vw, 5.5rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                color: TEXT_PRIMARY,
              }}
            >
              {"MP exists to move people forward.".split(" ").map((word, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    opacity: progress > 0.01 ? clamp((s1 * 6 - i * 0.8) / 1) : (mounted ? clamp((1 - i * 0.12)) : 0),
                    transform: `translateY(${progress > 0.01 ? lerp(20, 0, clamp((s1 * 6 - i * 0.8) / 1)) : (mounted ? 0 : 20)}px)${
                      word === "exists" ? ` translateZ(${lerp(0, 15, s1)}px)` : ""
                    }`,
                    transition: progress < 0.01 ? `opacity 0.8s ease ${i * 0.12}s, transform 0.8s ease ${i * 0.12}s` : "none",
                    marginRight: "0.3em",
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* ═══════════════ SCENE 2 — WHAT MP IS ═══════════════ */}
        <div
          className="absolute inset-0 flex items-center"
          style={{
            zIndex: 10,
            opacity: s2in * (1 - s2fade),
            transform: `translateY(${(1 - s2in) * 60 + s2fade * -60}px)`,
            pointerEvents: s2fade > 0.9 || s2in < 0.1 ? "none" : "auto",
          }}
        >
          <div
            className="w-full px-6 md:px-0"
            style={{
              marginLeft: isMobile ? "0" : "8vw",
              maxWidth: isMobile ? "100%" : "65vw",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: isMobile ? "0.7rem" : "0.8rem",
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: TEXT_SECONDARY,
                marginBottom: isMobile ? "1.5rem" : "2rem",
                opacity: clamp(s2 * 4),
              }}
            >
              What MP Is
            </p>
            <h2
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: isMobile ? "clamp(1.5rem, 6vw, 2.2rem)" : "clamp(2rem, 3.8vw, 3.8rem)",
                fontWeight: 400,
                letterSpacing: "-0.015em",
                lineHeight: 1.12,
                color: TEXT_PRIMARY,
                opacity: clamp((s2 - 0.1) * 5),
                transform: `translateY(${lerp(15, 0, clamp((s2 - 0.1) * 5))}px)`,
              }}
            >
              MP is a{" "}
              <span
                style={{
                  position: "relative",
                  display: "inline",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: "-4px -8px",
                    background: `radial-gradient(ellipse, rgba(216,179,106,${clamp((s2 - 0.3) * 3) * 0.08}) 0%, transparent 70%)`,
                    borderRadius: "4px",
                    zIndex: -1,
                  }}
                />
                partnership-led
              </span>{" "}
              build studio.
            </h2>
          </div>
        </div>

        {/* ═══════════════ SCENE 3 — CO-BUILD PHILOSOPHY ═══════════════ */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 10,
            opacity: s3in * (1 - s3fade),
            pointerEvents: s3fade > 0.9 || s3in < 0.1 ? "none" : "auto",
          }}
        >
          {clusters.map((cluster, i) => {
            const reveal = clamp((s3 - i * 0.18) / 0.2);
            const fadeBack = i < 3 ? clamp((s3 - (i + 1) * 0.18) / 0.15) * 0.5 : 0;

            return (
              <div
                key={i}
                className="absolute px-4 md:px-0"
                style={{
                  left: isMobile ? "5%" : cluster.x,
                  top: isMobile ? cluster.mobileY : cluster.y,
                  maxWidth: isMobile ? "90%" : "40vw",
                  opacity: reveal * (1 - fadeBack),
                  transform: `translateY(${lerp(30, 0, reveal)}px) translateZ(${lerp(-20, 0, reveal)}px) ${
                    !isMobile ? `rotate(${(i % 2 === 0 ? -0.3 : 0.3)}deg)` : ""
                  }`,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: isMobile ? "clamp(1rem, 4.5vw, 1.3rem)" : "clamp(1.1rem, 1.8vw, 1.6rem)",
                    fontWeight: 300,
                    lineHeight: 1.5,
                    color: i === clusters.length - 1 ? TEXT_PRIMARY : TEXT_SECONDARY,
                    letterSpacing: "0.01em",
                  }}
                >
                  {cluster.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* ═══════════════ SCENE 4 — WHAT WE BUILD ═══════════════ */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{
            zIndex: 10,
            opacity: s4in,
            pointerEvents: s4in < 0.1 ? "none" : "auto",
          }}
        >
          {/* Headline */}
          <h2
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: isMobile ? "clamp(1.4rem, 6vw, 2rem)" : "clamp(2rem, 3.5vw, 3.2rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: TEXT_PRIMARY,
              marginBottom: isMobile ? "2.5rem" : "4rem",
              opacity: clamp(s4 * 6),
              transform: `translateY(${lerp(20, 0, clamp(s4 * 6))}px)`,
            }}
          >
            What We Build
          </h2>

          {/* Services grid */}
          <div
            className="w-full px-6 md:px-12"
            style={{ maxWidth: isMobile ? "100%" : "1000px" }}
          >
            <div
              className={`grid ${isMobile ? "grid-cols-1 gap-8" : "grid-cols-2 gap-x-16 gap-y-12"}`}
            >
              {services.map((service, i) => {
                const sp = serviceProgress(i);
                return (
                  <div
                    key={i}
                    style={{
                      opacity: sp,
                      transform: `translateY(${lerp(30, 0, sp)}px)`,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: isMobile ? "1rem" : "1.1rem",
                        fontWeight: 500,
                        color: TEXT_PRIMARY,
                        marginBottom: "0.75rem",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {service.title}
                    </h3>
                    {service.lead ? (
                      <>
                        <p
                          style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontSize: isMobile ? "0.85rem" : "0.95rem",
                            fontWeight: 400,
                            color: TEXT_PRIMARY,
                            lineHeight: 1.6,
                            marginBottom: "0.4rem",
                            opacity: clamp((sp - 0.3) / 0.4),
                          }}
                        >
                          {service.lead}
                        </p>
                        <p
                          style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontSize: isMobile ? "0.85rem" : "0.95rem",
                            fontWeight: 300,
                            color: TEXT_SECONDARY,
                            lineHeight: 1.6,
                            opacity: clamp((sp - 0.5) / 0.4),
                          }}
                        >
                          <HighlightedText text={service.description} highlight={service.highlight} opacity={1} />
                        </p>
                      </>
                    ) : (
                      <p
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: isMobile ? "0.85rem" : "0.95rem",
                          fontWeight: 300,
                          color: TEXT_SECONDARY,
                          lineHeight: 1.6,
                          opacity: clamp((sp - 0.3) / 0.5),
                        }}
                      >
                        <HighlightedText text={service.description} highlight={service.highlight} opacity={1} />
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinematicEngine;
