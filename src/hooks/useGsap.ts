import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook: animate elements when they scroll into view using GSAP.
 * Applies a "pop out" effect (scale + opacity + y).
 */
export function useGsapReveal(options?: { stagger?: number; delay?: number; once?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const els = containerRef.current.querySelectorAll("[data-gsap]");
    if (!els.length) return;

    gsap.set(els, {
      opacity: 0,
      y: 60,
      scale: 0.92,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: options?.once !== false ? "play none none none" : "play reverse play reverse",
      },
    });

    tl.to(els, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.9,
      ease: "back.out(1.4)",
      stagger: options?.stagger ?? 0.12,
      delay: options?.delay ?? 0,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === containerRef.current) st.kill();
      });
    };
  }, []);

  return containerRef;
}

/**
 * Hook: clip-reveal text lines (slide up from behind overflow:hidden parent).
 */
export function useGsapClipReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const lines = containerRef.current.querySelectorAll("[data-clip]");
    if (!lines.length) return;

    gsap.set(lines, { yPercent: 110 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.to(lines, {
      yPercent: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return containerRef;
}

/**
 * Hook: parallax image effect on scroll.
 */
export function useGsapParallax(speed = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const img = ref.current.querySelector("img");
    if (!img) return;

    gsap.set(img, { scale: 1.15 });

    gsap.to(img, {
      yPercent: -speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current) st.kill();
      });
    };
  }, [speed]);

  return ref;
}

/**
 * Hook: horizontal line reveal (scaleX from left).
 */
export function useGsapLineReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.set(ref.current, { scaleX: 0, transformOrigin: "left" });

    gsap.to(ref.current, {
      scaleX: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current) st.kill();
      });
    };
  }, []);

  return ref;
}
