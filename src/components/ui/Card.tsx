import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "flat" | "bordered" | "dark";
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  variant = "bordered",
  padding = "md",
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  const variants = {
    elevated: "bg-white border border-brand-charcoal/8 shadow-card",
    flat: "bg-brand-beige border border-transparent shadow-none",
    bordered: "bg-white border border-brand-charcoal/10 shadow-subtle",
    dark: "bg-brand-navy border border-white/10 shadow-navy text-white",
  };

  const paddings = {
    none: "p-0",
    sm: "p-4 sm:p-5",
    md: "p-6 sm:p-8",
    lg: "p-8 sm:p-10",
  };

  return (
    <div
      className={cn(
        "rounded-luxury overflow-hidden transition-all duration-300 ease-out",
        variants[variant],
        paddings[padding],
        interactive && "hover:shadow-hover hover:-translate-y-1 hover:border-brand-gold/40 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
