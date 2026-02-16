import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  scrub?: boolean;
  start?: string;
  end?: string;
  markers?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const {
      y = 40,
      x = 0,
      opacity = 0,
      duration = 0.8,
      delay = 0,
      stagger = 0,
      scrub = false,
      start = "top 85%",
      end = "top 20%",
    } = options;

    const children = stagger
      ? ref.current.children
      : [ref.current];

    gsap.set(children, { y, x, opacity });

    const tween = gsap.to(children, {
      y: 0,
      x: 0,
      opacity: 1,
      duration: scrub ? undefined : duration,
      delay: scrub ? undefined : delay,
      stagger: scrub ? undefined : stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start,
        end,
        scrub: scrub ? 1 : false,
        toggleActions: scrub ? undefined : "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return ref;
}

export function useParallax<T extends HTMLElement>(speed = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const tween = gsap.to(ref.current, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return ref;
}
