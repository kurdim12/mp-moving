import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  { id: 1, title: "Noise", text: "People exist. Possibilities exist. But direction is unclear." },
  { id: 2, title: "Alignment", text: "We align teams around what truly matters. Momentum becomes natural." },
  { id: 3, title: "Structure", text: "Architecture before interface. Systems that scale decision-making." },
  { id: 4, title: "Momentum", text: "People move possibilities. Trust compounds." },
];

const VideoCanvasScrub = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(-1);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [chapterProgress, setChapterProgress] = useState(0);
  const prefersReduced = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // Draw video frame to canvas with cover logic
  const drawFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const vw = video.videoWidth;
    const vh = video.videoHeight;

    // Cover calculation
    const scale = Math.max(cw / vw, ch / vh);
    const sw = cw / scale;
    const sh = ch / scale;
    const sx = (vw - sw) / 2;
    const sy = (vh - sh) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  };

  // Resize canvas
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    drawFrame();
  };

  // Video setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      setVideoReady(true);
      video.currentTime = 0;
      resizeCanvas();
      // Draw first frame
      setTimeout(() => drawFrame(), 100);
    };

    const onError = () => setVideoError(true);

    video.addEventListener("loadeddata", onLoaded);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("error", onError);
    };
  }, []);

  // Resize listener
  useEffect(() => {
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // GSAP ScrollTrigger scrub
  useEffect(() => {
    if (!videoReady || prefersReduced.current || !wrapperRef.current || !videoRef.current) return;

    const video = videoRef.current;
    const duration = video.duration || 10;

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: false,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const targetTime = progress * (duration - 0.01);

        // Chapter detection
        const chIdx = Math.min(Math.floor(progress * 4), 3);
        setActiveChapter(chIdx);
        setChapterProgress(progress);

        if (Math.abs(targetTime - lastTimeRef.current) > 0.01) {
          video.currentTime = targetTime;
          lastTimeRef.current = targetTime;
          cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(drawFrame);
        }
      },
    });

    // Also draw on seeked for iOS
    const onSeeked = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(drawFrame);
    };
    video.addEventListener("seeked", onSeeked);

    return () => {
      st.kill();
      video.removeEventListener("seeked", onSeeked);
      cancelAnimationFrame(rafRef.current);
    };
  }, [videoReady]);

  // Chapter text GSAP animations
  useEffect(() => {
    if (!videoReady || prefersReduced.current) return;

    const chapterEls = document.querySelectorAll("[data-chapter-panel]");
    chapterEls.forEach((el) => {
      const idx = parseInt(el.getAttribute("data-chapter-panel") || "0");
      const startPct = idx * 25;
      const endPct = (idx + 1) * 25;

      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: `${startPct}% top`,
            end: `${startPct + 8}% top`,
            scrub: true,
          },
        }
      );

      gsap.to(el, {
        opacity: 0,
        y: -30,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: `${endPct - 8}% top`,
          end: `${endPct}% top`,
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [videoReady]);

  return (
    <>
      {/* Hidden video */}
      <video
        ref={videoRef}
        src="/mp-hybrid.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute opacity-0 pointer-events-none w-0 h-0"
      />

      {/* Scroll spacer */}
      <div ref={wrapperRef} className="relative" style={{ height: "400vh" }}>
        {/* Pinned scene */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          {/* Canvas video background */}
          {!videoError ? (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 0 }}
            />
          ) : (
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: "linear-gradient(135deg, #0B0D10 0%, #1a1d24 40%, #0B0D10 100%)",
                zIndex: 0,
              }}
            />
          )}

          {/* Grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 1,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              opacity: 0.5,
            }}
          />

          {/* Dark overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 2,
              background: "linear-gradient(90deg, rgba(11,13,16,0.7) 0%, rgba(11,13,16,0.3) 45%, transparent 70%)",
            }}
          />

          {/* Hero label — visible at start */}
          <div
            className="absolute top-[10vh] left-0 w-[45%] px-8 md:px-16"
            style={{
              zIndex: 10,
              opacity: chapterProgress < 0.08 ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <span
              className="text-xs font-medium tracking-[0.25em] uppercase"
              style={{ color: "rgba(244,246,248,0.5)" }}
            >
              Moving People
            </span>
            <h1
              className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-[-0.03em]"
              style={{ color: "#F4F6F8", fontFamily: "var(--font-display)" }}
            >
              We move people
              <br />
              forward.
            </h1>
            <p
              className="mt-6 text-base md:text-lg leading-relaxed max-w-md"
              style={{ color: "rgba(244,246,248,0.6)" }}
            >
              Alignment creates structure.
              <br />
              Structure creates momentum.
            </p>
          </div>

          {/* Chapter panels */}
          {CHAPTERS.map((ch, i) => (
            <div
              key={ch.id}
              data-chapter-panel={i}
              className="absolute top-1/2 left-0 w-[45%] -translate-y-1/2 px-8 md:px-16"
              style={{ zIndex: 10, opacity: 0 }}
            >
              <span
                className="text-xs font-medium tracking-[0.25em] uppercase"
                style={{ color: "rgba(244,246,248,0.4)" }}
              >
                {String(ch.id).padStart(2, "0")} / 04
              </span>
              <h2
                className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.0] tracking-[-0.02em]"
                style={{ color: "#F4F6F8", fontFamily: "var(--font-display)" }}
              >
                {ch.title}
              </h2>
              <p
                className="mt-4 text-base md:text-lg leading-relaxed max-w-sm"
                style={{ color: "rgba(244,246,248,0.65)" }}
              >
                {ch.text}
              </p>
            </div>
          ))}

          {/* Progress indicator */}
          <div
            className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
            style={{ zIndex: 10 }}
          >
            {CHAPTERS.map((_, i) => (
              <div
                key={i}
                className="w-[2px] h-8 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    activeChapter === i
                      ? "rgba(244,246,248,0.8)"
                      : "rgba(244,246,248,0.15)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Reduced motion fallback */}
      {prefersReduced.current && (
        <div
          className="relative w-full"
          style={{ background: "#0B0D10" }}
        >
          <div className="py-24 px-8 md:px-16 max-w-2xl">
            <h1
              className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-[-0.03em] mb-6"
              style={{ color: "#F4F6F8", fontFamily: "var(--font-display)" }}
            >
              We move people forward.
            </h1>
            {CHAPTERS.map((ch) => (
              <div key={ch.id} className="mt-12">
                <h2
                  className="text-3xl font-bold"
                  style={{ color: "#F4F6F8" }}
                >
                  {ch.title}
                </h2>
                <p
                  className="mt-2 text-lg"
                  style={{ color: "rgba(244,246,248,0.65)" }}
                >
                  {ch.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCanvasScrub;
