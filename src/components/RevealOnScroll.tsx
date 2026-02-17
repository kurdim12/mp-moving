import { useEffect, useRef, useState, createContext, useContext } from "react";
import { cn } from "@/lib/utils";

/* ─── Visibility context for staggered children ─── */
const VisibilityContext = createContext(false);

export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* Parent wrapper — tracks visibility, children stagger via delay */
export const RevealGroup = ({
  children,
  className,
  threshold = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}) => {
  const { ref, visible } = useReveal(threshold);
  return (
    <div ref={ref} className={className}>
      <VisibilityContext.Provider value={visible}>
        {children}
      </VisibilityContext.Provider>
    </div>
  );
};

/* Individual reveal item — uses parent visibility or self-tracks */
export const Reveal = ({
  children,
  delay = 0,
  className,
  standalone = false,
  threshold = 0.15,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  standalone?: boolean;
  threshold?: number;
}) => {
  const parentVisible = useContext(VisibilityContext);
  const self = useReveal(threshold);
  const visible = standalone ? self.visible : parentVisible;

  return (
    <div
      ref={standalone ? self.ref : undefined}
      className={cn(
        "transition-all ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        className
      )}
      style={{
        transitionDuration: "800ms",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* Staggered word reveal */
export const RevealWords = ({
  text,
  delay = 0,
  stagger = 60,
  className,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
}) => {
  const parentVisible = useContext(VisibilityContext);
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className={cn(
            "inline-block transition-all ease-out mr-[0.3em]",
            parentVisible
              ? "opacity-100 translate-y-0 blur-0"
              : "opacity-0 translate-y-3 blur-[2px]"
          )}
          style={{
            transitionDuration: "600ms",
            transitionDelay: `${delay + i * stagger}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

/* Animated horizontal divider */
export const RevealDivider = ({
  delay = 0,
  className,
}: {
  delay?: number;
  className?: string;
}) => {
  const parentVisible = useContext(VisibilityContext);
  return (
    <div
      className={cn(
        "h-px bg-foreground/10 origin-left transition-transform ease-out",
        parentVisible ? "scale-x-100" : "scale-x-0",
        className
      )}
      style={{
        transitionDuration: "1000ms",
        transitionDelay: `${delay}ms`,
      }}
    />
  );
};
