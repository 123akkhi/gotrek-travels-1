import React from "react";
import { motion, HTMLMotionProps } from "motion/react";
import {
  slideUpItemVariants,
  slideRightItemVariants,
  slideDownItemVariants,
  scaleFadeItemVariants,
  staggerContainerVariants
} from "../utils/motionVariants";

interface SmoothSlideTextProps {
  children: React.ReactNode;
  as?: "div" | "h1" | "h2" | "h3" | "h4" | "p" | "span" | "section" | "article";
  direction?: "up" | "right" | "down" | "scale";
  delay?: number;
  duration?: number;
  className?: string;
  id?: string;
  onClick?: () => void;
  once?: boolean;
}

export const SmoothSlideText: React.FC<SmoothSlideTextProps> = ({
  children,
  as = "div",
  direction = "up",
  delay = 0,
  duration = 0.48,
  className = "",
  id,
  onClick,
}) => {
  const customTransition = {
    duration,
    delay,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  const initialValues = direction === "up" 
    ? { opacity: 0, y: 22 }
    : direction === "right"
    ? { opacity: 0, x: -20 }
    : direction === "down"
    ? { opacity: 0, y: -20 }
    : { opacity: 0, scale: 0.95, y: 10 };

  const Component = motion[as] as React.ElementType;

  return (
    <Component
      id={id}
      initial={initialValues}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={customTransition}
      className={className}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};

interface SmoothStaggerProps {
  children: React.ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
  id?: string;
  as?: "div" | "section" | "main" | "ul" | "ol";
}

export const SmoothStagger: React.FC<SmoothStaggerProps> = ({
  children,
  stagger = 0.08,
  delayChildren = 0.04,
  className = "",
  id,
  as = "div",
}) => {
  const Component = motion[as] as React.ElementType;

  return (
    <Component
      id={id}
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </Component>
  );
};

export const SmoothSlideItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "div" | "li" | "article" | "p" | "span" | "h1" | "h2" | "h3";
}> = ({ children, className = "", id, as = "div" }) => {
  const Component = motion[as] as React.ElementType;

  return (
    <Component
      id={id}
      variants={slideUpItemVariants}
      className={className}
    >
      {children}
    </Component>
  );
};
