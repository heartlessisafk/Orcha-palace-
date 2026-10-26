import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-sans text-xs font-semibold tracking-wider uppercase text-brand-olive"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 pointer-events-none text-brand-muted">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full rounded-lg bg-white border border-brand-charcoal/15 font-sans text-sm text-brand-charcoal placeholder:text-brand-muted/70",
              "px-3.5 py-2.5 transition-all duration-200 ease-out",
              "focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold",
              "disabled:bg-brand-beige/50 disabled:cursor-not-allowed",
              leftIcon && "pl-10",
              error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500",
              className
            )}
            {...props}
          />
        </div>
        {error ? (
          <p className="font-sans text-xs text-rose-600 mt-1">{error}</p>
        ) : helperText ? (
          <p className="font-sans text-xs text-brand-muted mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
