import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticHoverProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

const MagneticHover = ({ children, strength = 4, className }: MagneticHoverProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = ((e.clientX - left - width / 2) / width) * strength;
    const y = ((e.clientY - top - height / 2) / height) * strength;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MagneticHover;
