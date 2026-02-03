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

// Full-bleed variant for key moments
export const VisualBreakFull = ({ image, alt, className }: VisualBreakProps) => {
  return (
    <div className={cn("w-full", className)}>
      <img
        src={image}
        alt={alt}
        className="w-full h-72 md:h-96 lg:h-[32rem] object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default VisualBreak;
