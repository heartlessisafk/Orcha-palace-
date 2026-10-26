"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { LUXURY_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface AnimatedHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "hero" | "h1" | "h2" | "h3" | "h4" | "h5";
  inverted?: boolean;
  delay?: number;
  duration?: number;
  stagger?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Editorial Animated Heading with Clipped Line/Word Reveal.
 * Text rises into view through an overflow-hidden mask with luxury cubic-bezier easing.
 * 100% accessible: Screen readers receive uninterrupted heading text via aria-label.
 */
export function AnimatedHeading({
  as: Component = "h2",
  size = "h2",
  inverted = false,
  delay = 0,
  duration = 0.65,
  stagger = false,
  className,
  children,
  ...props
}: AnimatedHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  const sizes = {
    hero: "font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-display tracking-tightest",
    h1: "font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tightest",
    h2: "font-serif text-2xl sm:text-3xl md:text-4xl font-semibold leading-heading tracking-tighter",
    h3: "font-serif text-xl sm:text-2xl font-semibold leading-heading tracking-tight",
    h4: "font-serif text-lg sm:text-xl font-semibold leading-snug tracking-normal",
    h5: "font-sans text-base font-semibold leading-snug tracking-normal",
  };

  const textContent = typeof children === "string" ? children : undefined;

  if (shouldReduceMotion) {
    return (
      <Component
        className={cn(sizes[size], inverted ? "text-white" : "text-brand-charcoal", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }

  // If text is a simple string, we can split into words for a staggered mask reveal
  if (stagger && textContent) {
    const words = textContent.split(" ");
    return (
      <Component
        aria-label={textContent}
        className={cn(sizes[size], inverted ? "text-white" : "text-brand-charcoal", "flex flex-wrap gap-x-[0.25em] overflow-hidden", className)}
        {...props}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em]">
            <motion.span
              aria-hidden="true"
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: duration * 0.85,
                delay: delay + i * 0.04,
                ease: LUXURY_EASE,
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Component>
    );
  }

  // Single-block clipped line entrance
  return (
    <div className="overflow-hidden pb-[0.06em]">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration,
          delay,
          ease: LUXURY_EASE,
        }}
      >
        <Component
          className={cn(sizes[size], inverted ? "text-white" : "text-brand-charcoal", className)}
          {...props}
        >
          {children}
        </Component>
      </motion.div>
    </div>
  );
}

export interface AnimatedParagraphProps extends Omit<HTMLMotionProps<"p">, "children"> {
  variant?: "body" | "lead" | "muted" | "caption" | "on-dark";
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Editorial Animated Paragraph Reveal.
 * Paragraph gently enters with subtle upward translation and smooth opacity.
 */
export function AnimatedParagraph({
  variant = "body",
  delay = 0.12,
  duration = 0.55,
  className,
  children,
  ...props
}: AnimatedParagraphProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    body: "font-sans text-base text-brand-charcoal/90 leading-relaxed tracking-tight",
    lead: "font-sans text-lg sm:text-xl text-brand-olive leading-relaxed font-normal",
    muted: "font-sans text-sm text-brand-muted leading-relaxed font-normal",
    caption: "font-sans text-xs text-brand-muted leading-normal tracking-wide",
    "on-dark": "font-sans text-base text-brand-beige-sand/90 leading-relaxed font-normal",
  };

  if (shouldReduceMotion) {
    return (
      <p className={cn(variants[variant], className)} {...(props as React.HTMLAttributes<HTMLParagraphElement>)}>
        {children}
      </p>
    );
  }

  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration,
        delay,
        ease: LUXURY_EASE,
      }}
      className={cn(variants[variant], className)}
      {...props}
    >
      {children}
    </motion.p>
  );
}

export interface AnimatedTagProps extends Omit<HTMLMotionProps<"span">, "children"> {
  inverted?: boolean;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Small tracked uppercase category tag with smooth letter-spacing and opacity entrance.
 */
export function AnimatedTag({
  inverted = false,
  delay = 0,
  className,
  children,
  ...props
}: AnimatedTagProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <span
        className={cn(
          "inline-block font-sans text-xs font-semibold tracking-widest uppercase mb-3",
          inverted ? "text-brand-gold-light" : "text-brand-gold",
          className
        )}
        {...(props as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {children}
      </span>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.45,
        delay,
        ease: LUXURY_EASE,
      }}
      className={cn(
        "inline-block font-sans text-xs font-semibold tracking-widest uppercase mb-3",
        inverted ? "text-brand-gold-light" : "text-brand-gold",
        className
      )}
      {...props}
    >
      {children}
    </motion.span>
  );
}
