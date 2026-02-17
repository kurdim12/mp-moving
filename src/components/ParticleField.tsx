import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  homeX: number;
  homeY: number;
  radius: number;
}

const PARTICLE_COUNT = 80;
const CONNECTION_DIST = 120;
const MOUSE_RADIUS = 150;
const MOUSE_STRENGTH = 0.02;

const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  const scrollProgress = useRef(0);
  const rafId = useRef<number>(0);
  const dpr = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    dpr.current = window.devicePixelRatio || 1;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr.current;
      canvas.height = h * dpr.current;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr.current, dpr.current);
      initParticles(w, h);
    };

    const initParticles = (w: number, h: number) => {
      const cols = Math.ceil(Math.sqrt(PARTICLE_COUNT * (w / h)));
      const rows = Math.ceil(PARTICLE_COUNT / cols);
      const cellW = w / cols;
      const cellH = h / rows;

      particles.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const homeX = cellW * (col + 0.5);
        const homeY = cellH * (row + 0.5);
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          homeX,
          homeY,
          radius: 1.5 + Math.random() * 1,
        };
      });
    };

    // Scroll progress via GSAP ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    resize();

    // Get foreground color from CSS
    const getFgColor = () => {
      const style = getComputedStyle(document.documentElement);
      const fg = style.getPropertyValue("--foreground").trim();
      return fg || "0 0% 5%";
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const progress = scrollProgress.current;
      const fg = getFgColor();

      ctx.setTransform(dpr.current, 0, 0, dpr.current, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const ps = particles.current;

      // Update particles
      for (const p of ps) {
        // Drift force (always)
        p.x += p.vx;
        p.y += p.vy;

        // Home attraction (increases with scroll)
        const homePull = progress * 0.03;
        p.vx += (p.homeX - p.x) * homePull;
        p.vy += (p.homeY - p.y) * homePull;

        // Mouse attraction
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_STRENGTH;
          p.vx += dx * force;
          p.vy += dy * force;
        }

        // Damping
        p.vx *= 0.97;
        p.vy *= 0.97;

        // Wrap edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }

      // Draw connections
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          // Connection distance increases slightly with scroll (more connections = more alignment)
          const maxDist = CONNECTION_DIST + progress * 40;
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * (0.08 + progress * 0.06);
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `hsla(${fg} / ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of ps) {
        const opacity = 0.15 + progress * 0.15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${fg} / ${opacity})`;
        ctx.fill();
      }

      rafId.current = requestAnimationFrame(draw);
    };

    // Pause when hidden
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId.current);
      } else {
        rafId.current = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    rafId.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId.current);
      st.kill();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default ParticleField;
