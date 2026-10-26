"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { LUXURY_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface InteractiveTileProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  lift?: number; // Lift in px (default 4)
  scale?: number; // Hover scale (default 1.015)
  pressScale?: number; // Tap / active scale (default 0.985)
  interactive?: boolean;
  isSelected?: boolean;
  selectedClassName?: string;
  className?: string;
  onSelect?: () => void;
}

/**
 * Universal Luxury Interactive Tile Primitive.
 * Provides tactile vertical lift (3-5px), gentle scale (1.015), smooth shadow expansion,
 * and tactile press confirmation (0.985) without shifting adjacent layout items.
 */
export function InteractiveTile({
  children,
  lift = 4,
  scale = 1.015,
  pressScale = 0.985,
  interactive = true,
  isSelected = false,
  selectedClassName,
  className,
  onClick,
  onSelect,
  role,
  tabIndex,
  ...props
}: InteractiveTileProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) onClick(e);
    if (onSelect) onSelect();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (interactive && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      if (onSelect) onSelect();
      if (onClick) (e.target as HTMLElement).click();
    }
  };

  if (!interactive || shouldReduceMotion) {
    return (
      <div
        role={role}
        tabIndex={interactive ? tabIndex ?? 0 : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-selected={isSelected ? true : undefined}
        className={cn(
          "transition-all duration-300 ease-out",
          isSelected && (selectedClassName || "ring-2 ring-brand-gold/60 border-brand-gold"),
          className
        )}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      role={role}
      tabIndex={interactive ? tabIndex ?? 0 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-selected={isSelected ? true : undefined}
      whileHover={{
        y: -lift,
        scale: scale,
        transition: { duration: 0.32, ease: LUXURY_EASE },
      }}
      whileTap={{
        scale: pressScale,
        transition: { duration: 0.12, ease: "easeOut" },
      }}
      className={cn(
        "transition-shadow duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2",
        interactive && "cursor-pointer",
        isSelected && (selectedClassName || "ring-2 ring-brand-gold/60 border-brand-gold shadow-lg"),
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
