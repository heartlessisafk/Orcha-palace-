"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "outline" | "ghost" | "navy-outline";
  size?: "sm" | "md" | "lg" | "pill";
  withArrow?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      withArrow = false,
      isLoading = false,
      fullWidth = false,
      leftIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles: luxury touch target, smooth transitions, keyboard focus rings
    const baseStyles =
      "group relative inline-flex items-center justify-center font-sans font-medium select-none transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    // Variants based on the audited navy & beige design system
    const variants = {
      primary:
        "bg-brand-navy text-white hover:bg-brand-navy-light shadow-subtle hover:shadow-hover border border-transparent",
      secondary:
        "bg-brand-beige text-brand-charcoal hover:bg-brand-beige-sand hover:text-brand-charcoal border border-brand-charcoal/10",
      gold:
        "bg-brand-gold text-white hover:bg-brand-gold-light shadow-subtle hover:shadow-hover border border-transparent",
      outline:
        "bg-transparent text-brand-charcoal border border-brand-charcoal/20 hover:border-brand-gold hover:text-brand-gold hover:bg-brand-beige/40",
      "navy-outline":
        "bg-transparent text-white border border-white/20 hover:border-brand-gold hover:text-brand-gold-light hover:bg-white/5",
      ghost:
        "bg-transparent text-brand-charcoal hover:bg-brand-beige/50 hover:text-brand-navy",
    };

    // Sizes
    const sizes = {
      sm: "text-xs px-3.5 py-1.5 rounded-full tracking-wide",
      md: "text-sm px-5 py-2.5 rounded-full tracking-wide",
      lg: "text-base px-7 py-3.5 rounded-full tracking-wide",
      pill: "text-sm px-6 py-2.5 rounded-full tracking-wide",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin text-current" />
        ) : leftIcon ? (
          <span className="mr-2 inline-flex items-center">{leftIcon}</span>
        ) : null}

        <span>{children}</span>

        {withArrow && (
          <span className="ml-2 inline-flex items-center transition-transform duration-300 ease-out group-hover:translate-x-1">
            <ArrowRight className="w-4 h-4 text-current" />
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
