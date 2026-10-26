import type { Variants, Transition } from "framer-motion";

/**
 * Transition curves matching the audited Framer reference site.
 * Subtle, luxury cubic-bezier easing avoiding bouncing or jarring physics.
 */
export const LUXURY_EASE: [number, number, number, number] = [0.2, 0, 0, 1];

export const TRANSITIONS = {
  instant: { duration: 0.15, ease: "linear" } as Transition,
  fast: { duration: 0.25, ease: "easeOut" } as Transition,
  normal: { duration: 0.4, ease: LUXURY_EASE } as Transition,
  smooth: { duration: 0.6, ease: LUXURY_EASE } as Transition,
  slow: { duration: 0.9, ease: LUXURY_EASE } as Transition,
};

/**
 * Viewport entrance fade-up variants.
 */
export const FADE_UP_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: customDelay,
      ease: LUXURY_EASE,
    },
  }),
};

/**
 * Image container subtle zoom on hover.
 */
export const IMAGE_HOVER_VARIANTS: Variants = {
  rest: {
    scale: 1.0,
    transition: { duration: 0.5, ease: LUXURY_EASE },
  },
  hover: {
    scale: 1.03,
    transition: { duration: 0.5, ease: LUXURY_EASE },
  },
};

/**
 * Stagger container for lists, card grids, or word tokens.
 */
export const STAGGER_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const STAGGER_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: LUXURY_EASE },
  },
};

/**
 * Accordion content height expand/collapse.
 */
export const ACCORDION_VARIANTS: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: LUXURY_EASE },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.35, ease: LUXURY_EASE },
  },
};

/**
 * Modal dialog pop/fade.
 */
export const MODAL_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.25, ease: LUXURY_EASE },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 10,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};
