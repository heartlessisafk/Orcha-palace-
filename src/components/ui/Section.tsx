import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  surface?: "canvas" | "beige" | "navy" | "white";
  spacing?: "none" | "compact" | "default" | "spacious";
  className?: string;
  children: React.ReactNode;
}

export function Section({
  as: Component = "section",
  surface = "canvas",
  spacing = "default",
  className,
  children,
  ...props
}: SectionProps) {
  const surfaces = {
    canvas: "bg-brand-canvas text-brand-charcoal",
    beige: "bg-brand-beige text-brand-charcoal",
    navy: "bg-brand-navy text-white",
    white: "bg-white text-brand-charcoal",
  };

  const spacings = {
    none: "py-0",
    compact: "py-10 md:py-16",
    default: "py-16 md:py-24 xl:py-28",
    spacious: "py-24 md:py-32 xl:py-36",
  };

  return (
    <Component
      className={cn("relative w-full overflow-hidden", surfaces[surface], spacings[spacing], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
