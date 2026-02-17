import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/* ─── Scene visibility hook ─── */
export function useSceneVisibility(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─── Scene Reveal item (takes explicit visible prop) ─── */
export const SceneReveal = ({
  children,
  delay = 0,
  visible,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  visible: boolean;
  className?: string;
}) => (
  <div
    className={cn(
      "transition-all duration-[350ms] ease-out",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[8px]",
      className
    )}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

/* ─── Scene Divider ─── */
export const SceneDivider = ({ visible, delay = 0 }: { visible: boolean; delay?: number }) => (
  <div
    className={cn(
      "h-px bg-foreground/10 origin-left transition-transform duration-[350ms] ease-out",
      visible ? "scale-x-100" : "scale-x-0"
    )}
    style={{ transitionDelay: `${delay}ms` }}
  />
);
