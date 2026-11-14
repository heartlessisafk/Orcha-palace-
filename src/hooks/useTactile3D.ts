"use client";

import React, { useRef, useCallback, useEffect } from "react";

export interface Tactile3DOptions {
  maxTilt?: number;      // Maximum tilt in degrees (default: 6)
  elevation?: number;    // Z-elevation lift in px (default: 4)
  disabled?: boolean;
}

/**
 * High-performance, zero-rerender 3D tactile interaction hook.
 * Directly animates GPU-accelerated CSS variables on pointermove without layout thrashing.
 */
export function useTactile3D<T extends HTMLElement = HTMLButtonElement>(
  options: Tactile3DOptions = {}
) {
  const { maxTilt = 6, elevation = 4, disabled = false } = options;
  const ref = useRef<T | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const isHoveredRef = useRef(false);

  const resetStyles = useCallback((el: HTMLElement) => {
    el.style.setProperty("--tactile-rx", "0deg");
    el.style.setProperty("--tactile-ry", "0deg");
    el.style.setProperty("--tactile-tz", "0px");
    el.style.setProperty("--tactile-scale", "1");
    el.style.setProperty("--tactile-sheen-opacity", "0");
  }, []);

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent<T>) => {
      if (disabled || e.pointerType === "touch") return;
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }
      const el = ref.current;
      if (!el) return;
      rectRef.current = el.getBoundingClientRect();
      isHoveredRef.current = true;
      el.style.setProperty("--tactile-tz", `${elevation}px`);
      el.style.setProperty("--tactile-scale", "1.015");
      el.style.setProperty("--tactile-sheen-opacity", "0.20");
    },
    [disabled, elevation]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      if (disabled || e.pointerType === "touch" || !isHoveredRef.current) return;
      const el = ref.current;
      if (!el) return;

      if (!rectRef.current) {
        rectRef.current = el.getBoundingClientRect();
      }

      const rect = rectRef.current;
      if (rect.width === 0 || rect.height === 0) return;

      const xRatio = (e.clientX - rect.left) / rect.width;
      const yRatio = (e.clientY - rect.top) / rect.height;

      const clampX = Math.max(0, Math.min(1, xRatio));
      const clampY = Math.max(0, Math.min(1, yRatio));

      // Calculate tilt angles (subtle, regal, non-cartoonish)
      const rx = (clampY - 0.5) * -2 * maxTilt;
      const ry = (clampX - 0.5) * 2 * maxTilt;

      el.style.setProperty("--tactile-rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--tactile-ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--tactile-sheen-x", `${(clampX * 100).toFixed(1)}%`);
      el.style.setProperty("--tactile-sheen-y", `${(clampY * 100).toFixed(1)}%`);
    },
    [disabled, maxTilt]
  );

  const handlePointerLeave = useCallback((_e?: React.PointerEvent<T>) => {
    isHoveredRef.current = false;
    rectRef.current = null;
    const el = ref.current;
    if (el) {
      resetStyles(el);
    }
  }, [resetStyles]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<T>) => {
      if (disabled) return;
      const el = ref.current;
      if (!el) return;
      el.style.setProperty("--tactile-tz", "-2px");
      el.style.setProperty("--tactile-scale", "0.975");
      el.style.setProperty("--tactile-sheen-opacity", "0.30");
    },
    [disabled]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<T>) => {
      if (disabled) return;
      const el = ref.current;
      if (!el) return;
      if (isHoveredRef.current && e.pointerType !== "touch") {
        el.style.setProperty("--tactile-tz", `${elevation}px`);
        el.style.setProperty("--tactile-scale", "1.015");
        el.style.setProperty("--tactile-sheen-opacity", "0.20");
      } else {
        resetStyles(el);
      }
    },
    [disabled, elevation, resetStyles]
  );

  useEffect(() => {
    const el = ref.current;
    return () => {
      if (el) resetStyles(el);
    };
  }, [resetStyles]);

  return {
    ref,
    handlers: {
      onPointerEnter: handlePointerEnter,
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
    },
  };
}
