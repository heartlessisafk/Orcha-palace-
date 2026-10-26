import React from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "navy" | "beige" | "outline" | "rating";
  size?: "sm" | "md";
  className?: string;
  children?: React.ReactNode;
}

export function Badge({
  variant = "gold",
  size = "sm",
  className,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    gold: "bg-brand-gold/15 text-brand-gold-dark border border-brand-gold/30",
    navy: "bg-brand-navy text-white border border-brand-navy-light",
    beige: "bg-brand-beige text-brand-charcoal border border-brand-charcoal/10",
    outline: "bg-transparent text-brand-charcoal border border-brand-charcoal/20",
    rating: "bg-white/95 text-brand-navy border border-brand-charcoal/10 shadow-subtle backdrop-blur-md",
  };

  const sizes = {
    sm: "text-xs px-2.5 py-0.5 rounded-full font-medium tracking-wide",
    md: "text-sm px-3.5 py-1 rounded-full font-medium tracking-wide",
  };

  return (
    <span
      className={cn("inline-flex items-center gap-1.5 select-none", variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * Floating Social Rating Badge matching the Framer reference Hero element.
 * "4.9 ★ Excellent"
 */
export function HeroRatingBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-brand-navy/10 shadow-floating",
        className
      )}
    >
      <div className="flex -space-x-2">
        <span className="inline-block w-6 h-6 rounded-full bg-brand-gold/20 border-2 border-white flex items-center justify-center text-[10px] font-bold text-brand-gold-dark">
          ✦
        </span>
        <span className="inline-block w-6 h-6 rounded-full bg-brand-navy/20 border-2 border-white flex items-center justify-center text-[10px] font-bold text-brand-navy">
          R
        </span>
      </div>
      <div className="flex items-center gap-1.5 font-sans text-xs">
        <span className="font-semibold text-brand-navy">4.9</span>
        <div className="flex text-amber-500">
          <Star className="w-3.5 h-3.5 fill-current" />
        </div>
        <span className="text-brand-muted">·</span>
        <span className="font-medium text-brand-charcoal">Excellent Stay</span>
      </div>
    </div>
  );
}
