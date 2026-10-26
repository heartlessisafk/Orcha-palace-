import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, leftIcon, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
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
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "w-full appearance-none rounded-lg bg-white border border-brand-charcoal/15 font-sans text-sm text-brand-charcoal",
              "px-3.5 py-2.5 pr-10 transition-all duration-200 ease-out",
              "focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold",
              "disabled:bg-brand-beige/50 disabled:cursor-not-allowed",
              leftIcon && "pl-10",
              error && "border-rose-500",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 pointer-events-none text-brand-muted">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <p className="font-sans text-xs text-rose-600 mt-1">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
