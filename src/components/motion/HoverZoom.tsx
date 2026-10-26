"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface HoverZoomProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "16:9" | "4:3" | "3:2" | "1:1";
  className?: string;
  children: React.ReactNode;
}

export function HoverZoom({
  aspectRatio = "4:3",
  className,
  children,
  ...props
}: HoverZoomProps) {
  const aspectClasses = {
    "16:9": "aspect-video",
    "4:3": "aspect-[4/3]",
    "3:2": "aspect-[3/2]",
    "1:1": "aspect-square",
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-luxury bg-brand-beige/50",
        aspectClasses[aspectRatio],
        className
      )}
      {...props}
    >
      <div className="w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.03]">
        {children}
      </div>
    </div>
  );
}
