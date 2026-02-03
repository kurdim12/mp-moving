import { cn } from "@/lib/utils";

interface VisualBreakProps {
  image: string;
  alt: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

const VisualBreak = ({ image, alt, size = "medium", className }: VisualBreakProps) => {
  const sizeClasses = {
    small: "h-48 md:h-64",
    medium: "h-64 md:h-80 lg:h-96",
    large: "h-80 md:h-[28rem] lg:h-[32rem]",
  };

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <img
        src={image}
        alt={alt}
        className={cn(
          "w-full object-cover transition-transform duration-1000 ease-out",
          sizeClasses[size]
        )}
        loading="lazy"
      />
    </div>
  );
};

export default VisualBreak;
