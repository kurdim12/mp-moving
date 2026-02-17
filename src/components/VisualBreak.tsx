import { cn } from "@/lib/utils";
import { useReveal } from "@/components/RevealOnScroll";

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

/* Architectural letterbox strip — a narrow, cinematic visual breath
   between narrative sections. Contained width, not full-bleed,
   to feel intentional and editorial rather than decorative. */
export const VisualBreakFull = ({ image, alt, className }: VisualBreakProps) => {
  const { ref, visible } = useReveal(0.05);

  return (
    <div
      ref={ref}
      className={cn("w-full py-4 md:py-8", className)}
    >
      <div className="content-container">
        <div
          className="w-full h-[20vh] md:h-[25vh] lg:h-[30vh] overflow-hidden"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scaleY(1)" : "scaleY(0.92)",
            transformOrigin: "center",
            transition: "opacity 1.4s ease-out, transform 1.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
          }}
        >
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-cover"
            style={{
              transform: visible ? "scale(1)" : "scale(1.06)",
              transition: "transform 2s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s",
            }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default VisualBreak;
