import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "standard" | "wide" | "narrow" | "full";
  className?: string;
  children: React.ReactNode;
}

export function Container({
  size = "standard",
  className,
  children,
  ...props
}: ContainerProps) {
  const sizes = {
    standard: "max-w-container",
    wide: "max-w-wide",
    narrow: "max-w-narrow",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 md:px-12 lg:px-16",
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
