import { cn } from "@/lib/utils";

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

// Content-aligned visual break with 400px height for editorial rhythm
export const VisualBreakFull = ({ image, alt, className }: VisualBreakProps) => {
  return (
    <div className={cn("w-full my-12 md:my-20", className)}>
      <div className="content-container">
        <img
          src={image}
          alt={alt}
          className="w-full h-[300px] md:h-[400px] object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default VisualBreak;
