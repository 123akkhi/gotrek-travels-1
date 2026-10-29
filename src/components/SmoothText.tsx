import React, { memo } from "react";
import { motion } from "motion/react";

interface SmoothTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  type?: "words" | "fade" | "blur-up" | "lines";
}

export const SmoothText: React.FC<SmoothTextProps> = memo(({
  text,
  as: Component = "span",
  className = "",
  delay = 0,
  type = "blur-up"
}) => {
  if (type === "words") {
    const words = text.split(" ");
    return (
      <Component className={`inline-block ${className}`}>
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{
              duration: 0.42,
              delay: delay + index * 0.035,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="inline-block mr-[0.28em] will-change-transform"
          >
            {word}
          </motion.span>
        ))}
      </Component>
    );
  }

  if (type === "fade") {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        className={`inline-block will-change-opacity ${className}`}
      >
        <Component>{text}</Component>
      </motion.span>
    );
  }

  // Default: "blur-up"
  return (
    <motion.span
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{
        duration: 0.48,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={`inline-block will-change-transform ${className}`}
    >
      <Component>{text}</Component>
    </motion.span>
  );
});

SmoothText.displayName = "SmoothText";
