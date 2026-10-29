// High performance, silk-smooth Framer Motion animation presets for GoTrek Travels

export const pageSlideVariants = {
  initial: {
    opacity: 0,
    y: 28,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const staggerContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const slideUpItemVariants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const slideRightItemVariants = {
  initial: {
    opacity: 0,
    x: -22,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const slideDownItemVariants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const scaleFadeItemVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 12,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

// Fluid text flowing animation variants
export const textFlowContainerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
};

export const textFlowWordVariants = {
  initial: {
    opacity: 0,
    y: 18,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const textFlowLetterVariants = {
  initial: {
    opacity: 0,
    y: 14,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

