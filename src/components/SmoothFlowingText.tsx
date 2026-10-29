import React, { memo } from "react";
import { motion } from "motion/react";

export interface SmoothFlowingTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  variant?: "words" | "letters" | "shimmer" | "fade-blur";
  direction?: "up" | "down" | "left" | "right";
  glow?: boolean;
  shimmerColor?: "gold" | "white" | "amber" | "crimson";
  keyId?: string | number;
}

const SILKY_EASE = [0.16, 1, 0.3, 1] as const;

export const SmoothFlowingText: React.FC<SmoothFlowingTextProps> = memo(({
  text,
  as: Component = "span",
  className = "",
  delay = 0,
  keyId,
}) => {
  return (
    <Component className={className}>
      <motion.span
        key={keyId ? String(keyId) : undefined}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: Math.min(delay, 0.15), ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </Component>
  );
});

SmoothFlowingText.displayName = "SmoothFlowingText";
export default SmoothFlowingText;
