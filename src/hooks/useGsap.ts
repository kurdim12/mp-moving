import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MorphSVGPlugin);

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

/**
 * Hook: SplitText character/word stagger reveal.
 * type: "chars" | "words" | "lines"
 */
export function useGsapSplitText(options?: {
  type?: "chars" | "words" | "lines";
  stagger?: number;
  duration?: number;
  ease?: string;
  y?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const targets = ref.current.querySelectorAll("[data-split]");
    if (!targets.length) return;

    const splits: SplitText[] = [];

    targets.forEach((target) => {
      const split = SplitText.create(target, {
        type: options?.type ?? "chars,words",
      });
      splits.push(split);

      const animTargets = options?.type === "lines" ? split.lines
        : options?.type === "words" ? split.words
        : split.chars;

      gsap.set(animTargets, {
        opacity: 0,
        y: options?.y ?? 40,
        rotateX: 15,
        scale: 0.95,
      });

      gsap.to(animTargets, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: options?.duration ?? 0.8,
        ease: options?.ease ?? "back.out(1.4)",
        stagger: options?.stagger ?? 0.03,
        scrollTrigger: {
          trigger: target,
          start: options?.start ?? "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => {
      splits.forEach((s) => s.revert());
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && ref.current?.contains(st.trigger as Node)) st.kill();
      });
    };
  }, []);

  return ref;
}

/**
 * Hook: DrawSVG path animation on scroll.
 */
export function useGsapDrawSVG(options?: {
  duration?: number;
  ease?: string;
  start?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const paths = ref.current.querySelectorAll("path, line, circle, polyline, polygon, rect, ellipse");
    if (!paths.length) return;

    gsap.set(paths, { drawSVG: "0%" });

    gsap.to(paths, {
      drawSVG: "100%",
      duration: options?.duration ?? 1.5,
      ease: options?.ease ?? "power2.inOut",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ref.current,
        start: options?.start ?? "top 80%",
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

/**
 * Hook: MorphSVG animation on scroll — morphs one path into another.
 */
export function useGsapMorphSVG(targetShape: string, options?: {
  duration?: number;
  ease?: string;
}) {
  const ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      morphSVG: targetShape,
      duration: options?.duration ?? 1.5,
      ease: options?.ease ?? "power2.inOut",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current) st.kill();
      });
    };
  }, [targetShape]);

  return ref;
}
