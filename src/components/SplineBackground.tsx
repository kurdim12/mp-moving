import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SplineBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !iframeWrapRef.current) return;

    // Animate the 3D scene as user scrolls: subtle zoom out, shift, and fade
    gsap.to(iframeWrapRef.current, {
      scale: 1.15,
      yPercent: -8,
      opacity: 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });

    // Slight rotation tilt on scroll for depth
    gsap.to(iframeWrapRef.current, {
      rotateY: 3,
      rotateX: -2,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "50% top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden" style={{ perspective: "1200px" }}>
      <div ref={iframeWrapRef} className="w-full h-full" style={{ transformOrigin: "center center" }}>
        <iframe
          src="https://my.spline.design/cybernetichuman-vhF5NJ0QB0qooL67POeaoKl0/"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{
            pointerEvents: "none",
            border: "none",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "calc(100% + 80px)",
          }}
          title="Cybernetic Human 3D"
          loading="lazy"
          allow="autoplay"
        />
      </div>
      {/* Hide the Spline watermark */}
      <div
        className="absolute bottom-0 right-0 w-[200px] h-[50px] bg-background"
        style={{ zIndex: 1 }}
      />
    </div>
  );
};

export default SplineBackground;
