import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VisualBreakProps {
  image: string;
  alt: string;
  className?: string;
}

const VisualBreak = ({ image, alt, className }: VisualBreakProps) => {
  return (
    <div className={cn("w-full my-8 md:my-16", className)}>
      <div className="content-container">
        <img
          src={image}
          alt={alt}
          className="w-full h-64 md:h-80 lg:h-[28rem] object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export const VisualBreakFull = ({ image, alt, className }: VisualBreakProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imgRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax: image moves slower than scroll
      gsap.to(imgRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Scale up subtly
      gsap.fromTo(
        imgRef.current,
        { scale: 1.05 },
        {
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={cn("w-full my-12 md:my-20 overflow-hidden", className)}>
      <div className="content-container">
        <div className="overflow-hidden h-[300px] md:h-[400px]">
          <img
            ref={imgRef}
            src={image}
            alt={alt}
            className="w-full h-[140%] object-cover will-change-transform"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default VisualBreak;
