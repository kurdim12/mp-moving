import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroVideo from "@/assets/hero-video.mp4";

gsap.registerPlugin(ScrollTrigger);

const BG = "#0B0B0D";
const TEXT_PRIMARY = "#F5F5F5";
const TEXT_SECONDARY = "#C7C7CC";
const ACCENT = "#D8B36A";

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const remap = (v: number, inMin: number, inMax: number) => clamp((v - inMin) / (inMax - inMin));

const services = [
  {
    title: "Brand & Positioning",
    text: "Clarity before aesthetics. We define what matters, remove what doesn't, and give teams language they can build with.",
  },
  {
    title: "Products, Platforms & Systems",
    text: "We design and build digital products, internal tools, and workflows as connected systems. Everything we build is meant to scale with decision-making, not just traffic.",
  },
  {
    title: "AI & Automation",
    text: "Applied selectively. Only where it removes friction, increases leverage, or fundamentally changes how work gets done. No experiments for the sake of trend.",
  },
  {
    title: "Partnership & Co-Building",
    text: "Long-term collaborations with shared ownership and responsibility. Some partnerships start as build work. The right ones evolve into ventures.",
  },
];

const clusters = [
  "We work alongside founders and teams,",
  "thinking, building, and deciding together.",
  "Through shared responsibility, clear thinking, and disciplined execution.",
  "When we commit, we commit as owners.",
];

const AstronautScrollSection = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef = useRef(0);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isPinned = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Mobile check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Setup video + canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    const video = document.createElement("video");
    video.src = heroVideo;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.crossOrigin = "anonymous";
    videoRef.current = video;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    video.addEventListener("loadeddata", () => {
      resize();
      drawFrame();
      setLoaded(true);
    });

    video.addEventListener("seeked", drawFrame);
    window.addEventListener("resize", resize);
    video.load();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      video.removeEventListener("seeked", drawFrame);
      video.pause();
      video.src = "";
    };
  }, []);

  // Draw current video frame to canvas (cover behavior)
  const drawFrame = useCallback(() => {
    const video = videoRef.current;
    const ctx = ctxRef.current;
    if (!video || !ctx || video.readyState < 2) return;

    const vw = video.videoWidth;
    const vh = video.videoHeight;
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    const vAspect = vw / vh;
    const cAspect = cw / ch;

    let dw: number, dh: number, dx: number, dy: number;
    if (cAspect > vAspect) {
      dw = cw; dh = cw / vAspect;
      dx = 0; dy = (ch - dh) / 2;
    } else {
      dh = ch; dw = ch * vAspect;
      dx = (cw - dw) / 2; dy = 0;
    }

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(video, dx, dy, dw, dh);
  }, []);

  // GSAP ScrollTrigger
  useEffect(() => {
    if (!loaded || !sectionRef.current) return;

    const scrollDist = isMobile ? 1.5 : 2.5;
    let lastTime = -1;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * scrollDist}`,
      pin: true,
      scrub: 0.3,
      onUpdate: (self) => {
        const p = self.progress;
        progressRef.current = p;
        setProgress(p);

        // Scrub video
        const video = videoRef.current;
        if (video && video.duration && !isNaN(video.duration)) {
          const targetTime = p * video.duration;
          const rounded = Math.round(targetTime * 30) / 30;
          if (rounded !== lastTime) {
            lastTime = rounded;
            video.currentTime = Math.min(rounded, video.duration - 0.05);
          }
        }
      },
      onToggle: (self) => {
        isPinned.current = self.isActive;
      },
    });

    return () => st.kill();
  }, [loaded, isMobile]);

  // ── Text timeline mapping ──
  // Scene 1: 0.00–0.15 (Existence)
  // Scene 2: 0.15–0.30 (What MP Is)
  // Scene 3: 0.30–0.55 (Philosophy clusters)
  // Scene 4: 0.55–1.00 (What We Build)

  // Scene 1 is visible immediately (mounted fade) and fades out on scroll
  const s1visible = progress < 0.01 ? (mounted ? 1 : 0) : 1;
  const s1out = remap(progress, 0.12, 0.18);

  const s2in = remap(progress, 0.14, 0.20);
  const s2out = remap(progress, 0.27, 0.33);

  const s3in = remap(progress, 0.30, 0.35);
  const s3out = remap(progress, 0.52, 0.58);

  const s4in = remap(progress, 0.55, 0.60);

  return (
    <div ref={wrapperRef}>
      <section
        ref={sectionRef}
        data-cinematic
        className="relative w-full"
        style={{ height: "100vh", background: BG, overflow: "hidden" }}
      >
        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0" style={{ zIndex: 1 }} />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: `
              radial-gradient(ellipse at center, transparent 30%, ${BG}dd 90%),
              linear-gradient(to top, ${BG} 0%, transparent 30%),
              linear-gradient(to bottom, ${BG}88 0%, transparent 15%)
            `,
          }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 3,
            opacity: 0.3,
            mixBlendMode: "overlay",
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ═══ TEXT LAYER ═══ */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>

          {/* SCENE 1 — Existence */}
          <div
            className="absolute bottom-0 left-0 px-6 md:px-12 lg:px-16 pb-16 md:pb-20 lg:pb-24"
            style={{
              maxWidth: "600px",
              opacity: s1visible * (1 - s1out),
              transform: `translateY(${(1 - s1visible) * 40 + s1out * -30}px)`,
              transition: progress < 0.01 ? "opacity 1s ease, transform 1s ease" : "none",
            }}
          >
            <h1
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: isMobile ? "clamp(2rem, 8vw, 2.8rem)" : "clamp(2.8rem, 4.5vw, 4.5rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                color: TEXT_PRIMARY,
              }}
            >
              MP exists to move people forward.
            </h1>
          </div>

          {/* SCENE 2 — What MP Is */}
          <div
            className="absolute bottom-0 left-0 px-6 md:px-12 lg:px-16 pb-16 md:pb-20 lg:pb-24"
            style={{
              maxWidth: "600px",
              opacity: s2in * (1 - s2out),
              transform: `translateY(${(1 - s2in) * 40 + s2out * -30}px)`,
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: TEXT_SECONDARY,
                marginBottom: "1rem",
                opacity: clamp(s2in * 3),
              }}
            >
              What MP Is
            </p>
            <h2
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: isMobile ? "clamp(1.6rem, 6vw, 2.2rem)" : "clamp(2rem, 3.2vw, 3rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                color: TEXT_PRIMARY,
              }}
            >
              MP is a partnership-led build studio.
            </h2>
          </div>

          {/* SCENE 3 — Philosophy Clusters */}
          <div
            className="absolute inset-0 px-6 md:px-12 lg:px-16"
            style={{
              opacity: s3in * (1 - s3out),
            }}
          >
            {clusters.map((text, i) => {
              const cIn = remap(progress, 0.32 + i * 0.05, 0.36 + i * 0.05);
              const isCurrent = i === clusters.length - 1
                || remap(progress, 0.32 + (i + 1) * 0.05, 0.36 + (i + 1) * 0.05) < 0.5;
              const dimmed = !isCurrent && cIn > 0.5;

              // Stagger vertical positions
              const yBase = isMobile
                ? 30 + i * 15
                : 28 + i * 13;

              const xOffset = isMobile ? 0 : (i % 2 === 0 ? 0 : 8);

              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${xOffset}%`,
                    top: `${yBase}%`,
                    maxWidth: isMobile ? "90%" : "45vw",
                    opacity: cIn * (dimmed ? 0.4 : 1),
                    transform: `translateY(${(1 - cIn) * 25}px)`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: isMobile ? "clamp(1rem, 4vw, 1.2rem)" : "clamp(1.1rem, 1.6vw, 1.5rem)",
                      fontWeight: i === clusters.length - 1 ? 400 : 300,
                      lineHeight: 1.5,
                      color: i === clusters.length - 1 ? TEXT_PRIMARY : TEXT_SECONDARY,
                    }}
                  >
                    {text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* SCENE 4 — What We Build */}
          <div
            className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-10 md:pb-16"
            style={{
              opacity: s4in,
              transform: `translateY(${(1 - s4in) * 30}px)`,
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: TEXT_SECONDARY,
                marginBottom: "1.5rem",
                opacity: clamp(remap(progress, 0.55, 0.60) * 3),
              }}
            >
              What We Build
            </p>

            <div
              className={`grid ${isMobile ? "grid-cols-1 gap-5" : "grid-cols-2 gap-x-12 gap-y-6"}`}
              style={{ maxWidth: "900px" }}
            >
              {services.map((s, i) => {
                const sIn = remap(progress, 0.62 + i * 0.08, 0.68 + i * 0.08);
                return (
                  <div
                    key={i}
                    style={{
                      opacity: sIn,
                      transform: `translateY(${(1 - sIn) * 20}px)`,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: isMobile ? "0.9rem" : "1rem",
                        fontWeight: 500,
                        color: TEXT_PRIMARY,
                        marginBottom: "0.35rem",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: isMobile ? "0.8rem" : "0.85rem",
                        fontWeight: 300,
                        color: TEXT_SECONDARY,
                        lineHeight: 1.55,
                      }}
                    >
                      {s.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Loading */}
        {!loaded && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 20, background: BG }}
          >
            <div
              className="w-8 h-8 border-2 rounded-full animate-spin"
              style={{ borderColor: `${TEXT_SECONDARY}33`, borderTopColor: TEXT_SECONDARY }}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default AstronautScrollSection;
