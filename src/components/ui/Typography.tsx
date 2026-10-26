import React from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "hero" | "h1" | "h2" | "h3" | "h4" | "h5";
  inverted?: boolean;
}

export function Heading({
  as: Component = "h2",
  size = "h2",
  inverted = false,
  className,
  children,
  ...props
}: HeadingProps) {
  const sizes = {
    hero: "font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-display tracking-tightest",
    h1: "font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tightest",
    h2: "font-serif text-2xl sm:text-3xl md:text-4xl font-semibold leading-heading tracking-tighter",
    h3: "font-serif text-xl sm:text-2xl font-semibold leading-heading tracking-tight",
    h4: "font-serif text-lg sm:text-xl font-semibold leading-snug tracking-normal",
    h5: "font-sans text-base font-semibold leading-snug tracking-normal",
  };

  return (
    <Component
      className={cn(
        sizes[size],
        inverted ? "text-white" : "text-brand-charcoal",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "body" | "lead" | "muted" | "caption" | "on-dark";
  className?: string;
  children: React.ReactNode;
}

export function Text({
  variant = "body",
  className,
  children,
  ...props
}: TextProps) {
  const variants = {
    body: "font-sans text-base text-brand-charcoal/90 leading-relaxed tracking-tight",
    lead: "font-sans text-lg sm:text-xl text-brand-olive leading-relaxed font-normal",
    muted: "font-sans text-sm text-brand-muted leading-relaxed font-normal",
    caption: "font-sans text-xs text-brand-muted leading-normal tracking-wide",
    "on-dark": "font-sans text-base text-brand-beige-sand/90 leading-relaxed font-normal",
  };

  return (
    <p className={cn(variants[variant], className)} {...props}>
      {children}
    </p>
  );
}

export interface SubtitleTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  inverted?: boolean;
}

/**
 * Small tracked uppercase category tag matching the Framer reference.
 * Example: "ORCHHA PALACE" or "OUR PHILOSOPHY"
 */
export function SubtitleTag({
  children,
  inverted = false,
  className,
  ...props
}: SubtitleTagProps) {
  return (
    <span
      className={cn(
        "inline-block font-sans text-xs font-semibold tracking-widest uppercase mb-3",
        inverted ? "text-brand-gold-light" : "text-brand-gold",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
