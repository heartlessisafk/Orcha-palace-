"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

export interface StepperProps {
  label: string;
  sublabel?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (newValue: number) => void;
  className?: string;
}

export function Stepper({
  label,
  sublabel,
  value,
  min = 0,
  max = 10,
  onChange,
  className,
}: StepperProps) {
  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (value < max) onChange(value + 1);
  };

  return (
    <div className={cn("flex items-center justify-between py-2 border-b border-brand-charcoal/8 last:border-none", className)}>
      <div>
        <p className="font-sans text-sm font-medium text-brand-charcoal">{label}</p>
        {sublabel && <p className="font-sans text-xs text-brand-muted">{sublabel}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="w-8 h-8 rounded-full border border-brand-charcoal/20 flex items-center justify-center text-brand-charcoal hover:border-brand-gold hover:text-brand-gold disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-6 text-center font-sans text-sm font-semibold text-brand-charcoal">
          {value}
        </span>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="w-8 h-8 rounded-full border border-brand-charcoal/20 flex items-center justify-center text-brand-charcoal hover:border-brand-gold hover:text-brand-gold disabled:opacity-30 disabled:pointer-events-none transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
