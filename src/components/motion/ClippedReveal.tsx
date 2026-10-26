"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LUXURY_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface ClippedRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * Editorial Clipped Mask Image Reveal.
 * Unmasks image smoothly using GPU-accelerated clip-path interpolation.
 */
export function ClippedReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className,
}: ClippedRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const clipInitial = {
    up: "inset(100% 0% 0% 0%)",
    down: "inset(0% 0% 100% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
  }[direction];

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ clipPath: clipInitial, opacity: 0.8 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: LUXURY_EASE,
      }}
      className={cn("overflow-hidden", className)}
    >
      {children}
    </motion.div>
  );
}
