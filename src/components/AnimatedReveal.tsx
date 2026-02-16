import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  lineWipe: {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1 },
  },
};

interface AnimatedRevealProps {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  delay?: number;
  duration?: number;
  className?: string;
  staggerChildren?: number;
  once?: boolean;
  as?: "div" | "section" | "p" | "h1" | "h2" | "h3" | "span";
}

const AnimatedReveal = ({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.6,
  className,
  staggerChildren,
  once = true,
  as = "div",
}: AnimatedRevealProps) => {
  const Component = motion[as] as any;

  const containerVariants: Variants = staggerChildren
    ? {
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren: delay,
          },
        },
      }
    : {};

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={staggerChildren ? containerVariants : variants[variant]}
      transition={staggerChildren ? undefined : { duration, delay, ease: [0.4, 0, 0.2, 1] }}
      className={cn(className)}
    >
      {children}
    </Component>
  );
};

export const AnimatedChild = ({
  children,
  variant = "fadeUp",
  duration = 0.6,
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  duration?: number;
  className?: string;
}) => (
  <motion.div
    variants={variants[variant]}
    transition={{ duration, ease: [0.4, 0, 0.2, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default AnimatedReveal;
