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

/* Full-width cinematic break with parallax-like fixed attachment */
export const VisualBreakFull = ({ image, alt, className }: VisualBreakProps) => {
  const { ref, visible } = useReveal(0.1);

  return (
    <div
      ref={ref}
      className={cn("w-full overflow-hidden", className)}
    >
      <div
        className="w-full h-[40vh] md:h-[50vh] lg:h-[60vh] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${image})`,
          opacity: visible ? 1 : 0,
          transition: "opacity 1.2s ease-out",
        }}
        role="img"
        aria-label={alt}
      />
    </div>
  );
};

export default VisualBreak;
