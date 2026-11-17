"use client";

import React, { forwardRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import { useTactile3D } from "@/hooks/useTactile3D";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "outline" | "ghost" | "navy-outline" | "sage";
  size?: "sm" | "md" | "lg" | "pill";
  withArrow?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  enable3D?: boolean;
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
      enable3D = true,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const tactile = useTactile3D<HTMLButtonElement>({
      disabled: disabled || isLoading || !enable3D,
      maxTilt: 6,
      elevation: 4,
    });

    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        tactile.ref.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      },
      [ref, tactile.ref]
    );

    // Base styles: luxury touch target, tactile 3D foundation, keyboard focus rings
    const baseStyles =
      "group relative inline-flex items-center justify-center font-sans font-medium select-none overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    // Variants based on the audited navy & beige design system
    const variants = {
      primary:
        "bg-brand-navy text-white hover:bg-brand-navy-light shadow-subtle hover:shadow-hover border border-white/10",
      secondary:
        "bg-brand-beige text-brand-charcoal hover:bg-brand-beige-sand hover:text-brand-charcoal border border-brand-charcoal/10 shadow-subtle hover:shadow-card",
      gold:
        "bg-brand-gold text-white hover:bg-brand-gold-light shadow-subtle hover:shadow-gold-ambient border border-brand-gold-light/40",
      sage:
        "bg-[#829D8A] text-[#080D15] hover:bg-[#708D79] shadow-subtle hover:shadow-[0_6px_25px_rgba(112,141,121,0.38)] border border-[#9BB4A2]/60 font-semibold",
      outline:
        "bg-transparent text-brand-charcoal border border-brand-charcoal/20 hover:border-brand-gold hover:text-brand-gold hover:bg-brand-beige/40 shadow-subtle",
      "navy-outline":
        "bg-transparent text-white border border-white/20 hover:border-brand-gold hover:text-brand-gold-light hover:bg-white/5 shadow-subtle",
      ghost:
        "bg-transparent text-brand-charcoal hover:bg-brand-beige/50 hover:text-brand-navy",
    };

    // Sizes
    const sizes = {
      sm: "text-xs px-3.5 py-1.5 rounded-full tracking-wide min-h-[36px]",
      md: "text-sm px-5 py-2.5 rounded-full tracking-wide min-h-[44px]",
      lg: "text-base px-7 py-3.5 rounded-full tracking-wide min-h-[48px]",
      pill: "text-sm px-6 py-2.5 rounded-full tracking-wide min-h-[44px]",
    };

    const handlePointerEnter = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (enable3D) tactile.handlers.onPointerEnter(e);
      props.onPointerEnter?.(e);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (enable3D) tactile.handlers.onPointerMove(e);
      props.onPointerMove?.(e);
    };

    const handlePointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (enable3D) tactile.handlers.onPointerLeave(e);
      props.onPointerLeave?.(e);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (enable3D) tactile.handlers.onPointerDown(e);
      props.onPointerDown?.(e);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (enable3D) tactile.handlers.onPointerUp(e);
      props.onPointerUp?.(e);
    };

    return (
      <button
        ref={setRefs}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          enable3D && "tactile-3d",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        {...props}
      >
        {/* Interactive Sheen Overlay */}
        {enable3D && <span className="tactile-sheen" aria-hidden="true" />}

        {/* Content Layer */}
        <span className="relative z-10 inline-flex items-center justify-center">
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
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
