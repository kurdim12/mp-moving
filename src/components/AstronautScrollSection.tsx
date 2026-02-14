import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroVideo from "@/assets/hero-video.mp4";

gsap.registerPlugin(ScrollTrigger);

/* ─── palette ─── */
const BG = "#0B0B0D";
const TEXT_PRIMARY = "#FFFFFF";
const TEXT_SECONDARY = "#C7C7CC";
const ACCENT = "#D8B36A";

/* ─── scrub engine ─── */
class ScrubEngine {
  private video: HTMLVideoElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private currentFrame = -1;
  private rafId = 0;
  private isActive = true;
  private ready = false;

  constructor(canvas: HTMLCanvasElement, videoSrc: string, onReady: () => void) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;

    this.video = document.createElement("video");
    this.video.src = videoSrc;
    this.video.muted = true;
    this.video.playsInline = true;
    this.video.preload = "auto";
    this.video.crossOrigin = "anonymous";

    // Wait for video metadata
    this.video.addEventListener("loadeddata", () => {
      this.ready = true;
      this.resize();
      this.drawFrame();
      onReady();
    });

    this.video.load();
    window.addEventListener("resize", this.resize);
  }

  resize = () => {
    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (this.ready) this.drawFrame();
  };

  drawFrame = () => {
    if (!this.ready) return;
    const vw = this.video.videoWidth;
    const vh = this.video.videoHeight;
    const cw = window.innerWidth;
    const ch = window.innerHeight;

    // Cover behavior
    const vAspect = vw / vh;
    const cAspect = cw / ch;
    let drawW: number, drawH: number, dx: number, dy: number;

    if (cAspect > vAspect) {
      drawW = cw;
      drawH = cw / vAspect;
      dx = 0;
      dy = (ch - drawH) / 2;
    } else {
      drawH = ch;
      drawW = ch * vAspect;
      dx = (cw - drawW) / 2;
      dy = 0;
    }

    this.ctx.fillStyle = BG;
    this.ctx.fillRect(0, 0, cw, ch);
    this.ctx.drawImage(this.video, dx, dy, drawW, drawH);
  };

  scrubTo = (progress: number) => {
    if (!this.ready || !this.isActive) return;
    const duration = this.video.duration;
    if (!duration || isNaN(duration)) return;

    const targetTime = Math.max(0, Math.min(progress * duration, duration - 0.05));
    const frameIndex = Math.round(targetTime * 30); // ~30fps frame index

    if (frameIndex === this.currentFrame) return;
    this.currentFrame = frameIndex;

    this.video.currentTime = targetTime;
  };

  // Listen for seeked to draw
  init = () => {
    this.video.addEventListener("seeked", this.drawFrame);
  };

  setActive = (active: boolean) => {
    this.isActive = active;
  };

  destroy = () => {
    this.isActive = false;
    cancelAnimationFrame(this.rafId);
    window.removeEventListener("resize", this.resize);
    this.video.removeEventListener("seeked", this.drawFrame);
    this.video.pause();
    this.video.src = "";
  };
}

/* ─── component ─── */
const AstronautScrollSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ScrubEngine | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current) return;

    const engine = new ScrubEngine(canvasRef.current, heroVideo, () => {
      setLoaded(true);
    });
    engine.init();
    engineRef.current = engine;

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  // GSAP ScrollTrigger for pinning + scrub
  useEffect(() => {
    if (!loaded || !sectionRef.current) return;

    const scrollDist = isMobile ? 1.2 : 2;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${window.innerHeight * scrollDist}`,
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        engineRef.current?.scrubTo(progress);
        // Fade text as scroll progresses
        setTextOpacity(Math.max(0, 1 - progress * 3));
      },
      onLeave: () => {
        engineRef.current?.setActive(false);
      },
      onEnterBack: () => {
        engineRef.current?.setActive(true);
      },
    });

    return () => {
      st.kill();
    };
  }, [loaded, isMobile]);

  return (
    <>
      <section
        ref={sectionRef}
        data-cinematic
        className="relative w-full"
        style={{ height: "100vh", background: BG }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ zIndex: 1 }}
        />

        {/* Vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: `
              radial-gradient(ellipse at center, transparent 40%, ${BG} 100%),
              linear-gradient(to bottom, transparent 70%, ${BG} 100%)
            `,
          }}
        />

        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 3,
            opacity: 0.35,
            mixBlendMode: "overlay",
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Text layer — bottom-left anchored */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{
            zIndex: 10,
            opacity: textOpacity,
            transform: `translateY(${(1 - textOpacity) * -30}px)`,
            transition: "opacity 0.05s linear, transform 0.05s linear",
          }}
        >
          <div
            className="px-6 md:px-12 lg:px-16 pb-12 md:pb-16 lg:pb-20"
            style={{ maxWidth: "800px" }}
          >
            {/* Title */}
            <h1
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: isMobile ? "clamp(2.2rem, 9vw, 3rem)" : "clamp(3rem, 5vw, 5rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: TEXT_PRIMARY,
                marginBottom: "0.75rem",
              }}
            >
              MP exists to move{" "}
              <br />
              people forward.
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: isMobile ? "1rem" : "1.15rem",
                fontWeight: 400,
                color: TEXT_SECONDARY,
                letterSpacing: "0.01em",
                lineHeight: 1.5,
                marginBottom: "0.5rem",
                opacity: Math.min(1, textOpacity * 1.5),
              }}
            >
              Scroll to explore
            </p>

            {/* Caption */}
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: isMobile ? "0.7rem" : "0.75rem",
                fontWeight: 400,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: ACCENT,
                opacity: Math.min(1, textOpacity * 1.2),
              }}
            >
              Cinematic scroll sequence
            </p>
          </div>
        </div>

        {/* Loading state */}
        {!loaded && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 20, background: BG }}
          >
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-8 h-8 border-2 rounded-full animate-spin"
                style={{ borderColor: `${TEXT_SECONDARY}33`, borderTopColor: TEXT_SECONDARY }}
              />
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: TEXT_SECONDARY,
                }}
              >
                Loading sequence
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Post-hero "How This Works" section */}
      <section
        className="relative w-full"
        style={{ background: BG, zIndex: 20 }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-32">
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: TEXT_SECONDARY,
              marginBottom: "1.5rem",
            }}
          >
            How This Works
          </p>
          <h2
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: isMobile ? "clamp(1.5rem, 6vw, 2rem)" : "clamp(2rem, 3vw, 2.8rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: TEXT_PRIMARY,
              marginBottom: "3rem",
            }}
          >
            Frame-by-frame cinematic control.
          </h2>

          <div className={`grid ${isMobile ? "grid-cols-1 gap-8" : "grid-cols-2 gap-16"}`}>
            <div className="space-y-6">
              {[
                { title: "Video → Frame Sequence", desc: "The source video is deconstructed into individual frames, each mapped to a scroll position." },
                { title: "Scroll-Driven Playback", desc: "Your scroll controls the timeline. No play button. No buffering. Pure spatial control." },
              ].map((item, i) => (
                <div key={i}>
                  <h3
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: TEXT_PRIMARY,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 300,
                      color: TEXT_SECONDARY,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              {[
                { title: "Canvas Rendering", desc: "Each frame renders to a full-viewport canvas. No video element. No compression artifacts. Clean output." },
                { title: "Performance Optimized", desc: "Only redraws when the frame changes. Skips redundant renders. Manages memory automatically." },
              ].map((item, i) => (
                <div key={i}>
                  <h3
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: TEXT_PRIMARY,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 300,
                      color: TEXT_SECONDARY,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AstronautScrollSection;
