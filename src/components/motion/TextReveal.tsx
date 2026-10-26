"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

/**
 * Editorial Word-by-Word Scroll Opacity Reveal Component.
 * Words transition progressively from subdued (0.18 opacity) to fully visible (1.0 opacity).
 * Fully accessible: Provides a unified aria-label for screen readers, while individual
 * animated span tokens are hidden from assistive technology to prevent stuttered speech.
 */
export function TextReveal({ text, className, wordClassName }: TextRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.40"],
  });

  const words = text.split(" ");

  if (shouldReduceMotion) {
    return (
      <h3
        className={cn(
          "font-serif text-2xl sm:text-3xl md:text-4xl text-brand-charcoal leading-heading tracking-tightest",
          className
        )}
      >
        {text}
      </h3>
    );
  }

  return (
    <h3
      ref={containerRef}
      aria-label={text}
      className={cn(
        "font-serif text-2xl sm:text-3xl md:text-4xl text-brand-charcoal leading-relaxed tracking-tightest flex flex-wrap gap-x-2 gap-y-1.5",
        className
      )}
    >
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={index}
            progress={scrollYProgress}
            range={[start, end]}
            className={wordClassName}
          >
            {word}
          </Word>
        );
      })}
    </h3>
  );
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}

function Word({ children, progress, range, className }: WordProps) {
  const opacity = useTransform(progress, range, [0.18, 1]);

  return (
    <motion.span
      aria-hidden="true"
      style={{ opacity }}
      className={cn("inline-block transition-colors duration-200 select-none", className)}
    >
      {children}
    </motion.span>
  );
}
