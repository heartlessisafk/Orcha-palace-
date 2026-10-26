"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SpaTreatmentItem } from "@/data/spa-catalog";
import { Button } from "@/components/ui/Button";
import {
  ShoppingBag,
  X,
  Trash2,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Info,
} from "lucide-react";

export interface SpaSelectionTrayProps {
  selectedTreatments: SpaTreatmentItem[];
  subtotal: number;
  totalDurationMinutes: number;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onProceedToEnquiry: () => void;
}

export function SpaSelectionTray({
  selectedTreatments,
  subtotal,
  totalDurationMinutes,
  isOpen,
  onClose,
  onOpen,
  onRemoveItem,
  onClearAll,
  onProceedToEnquiry,
}: SpaSelectionTrayProps) {
  const count = selectedTreatments.length;

  if (count === 0 && !isOpen) return null;

  return (
    <>
      {/* 1. Persistent Floating Quick-Commerce Bottom Bar (Visible when items selected & tray drawer closed) */}
      {!isOpen && count > 0 && (
        <aside
          aria-label="Treatment Selection Summary"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-40 max-w-md w-auto animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="bg-brand-navy text-white p-3.5 sm:p-4 rounded-2xl shadow-elevated border border-brand-gold/40 flex items-center justify-between gap-4">
            {/* Left: Summary Info */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold-light shrink-0">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-gold text-brand-navy text-[10px] font-bold flex items-center justify-center">
                  {count}
                </span>
              </div>
              <div>
                <p className="font-serif font-bold text-base leading-tight">
                  ₹{subtotal.toLocaleString("en-IN")}
                  <span className="text-[10px] font-sans font-normal text-white/60 ml-1">
                    + taxes
                  </span>
                </p>
                <p className="text-xs text-brand-gold-light flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  <span>
                    {count} {count === 1 ? "Therapy" : "Therapies"} •{" "}
                    {totalDurationMinutes} mins total
                  </span>
                </p>
              </div>
            </div>

            {/* Right: Review & Enquire Button */}
            <button
              onClick={onOpen}
              className="px-4 py-2 rounded-xl bg-brand-gold text-brand-navy font-sans text-xs sm:text-sm font-bold hover:bg-brand-gold-light transition-all flex items-center gap-1.5 shrink-0 shadow-subtle"
            >
              <span>Review Tray</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* 2. Expanded Slide-Over Drawer / Bottom Sheet */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Your Spa Journey Tray"
          className="fixed inset-0 z-50 flex justify-end"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />

          {/* Drawer Container */}
          <div className="relative w-full max-w-lg bg-brand-canvas h-full shadow-2xl flex flex-col justify-between overflow-hidden z-10 border-l border-brand-gold/20 animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-brand-charcoal/10 bg-brand-beige/50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold-dark">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-brand-navy">
                    Your Spa Journey Tray
                  </h3>
                  <p className="text-xs text-brand-charcoal/60">
                    {count} {count === 1 ? "treatment" : "treatments"} selected
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-brand-charcoal/10 text-brand-charcoal transition-colors"
                aria-label="Close tray"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Item List */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {count === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-brand-beige flex items-center justify-center text-brand-charcoal/40 mx-auto">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-brand-navy">
                    Your tray is currently empty
                  </h4>
                  <p className="text-xs text-brand-charcoal/70 max-w-xs mx-auto">
                    Explore our 11 traditional therapies and select the treatments you would like to experience.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-4 py-2 rounded-xl bg-brand-navy text-white text-xs font-sans font-medium"
                  >
                    Browse Treatments
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedTreatments.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 sm:p-3.5 rounded-xl bg-white border border-brand-charcoal/10 shadow-subtle flex items-center justify-between gap-3"
                    >
                      {/* Image Thumbnail */}
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-brand-beige shrink-0 border border-brand-gold/20">
                        <Image
                          src={item.asset.square}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-sm text-brand-navy truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-brand-charcoal/60 flex items-center gap-1.5 mt-0.5">
                          <Clock className="w-3 h-3 text-brand-gold-dark" />
                          <span>{item.duration}</span>
                        </p>
                        <p className="text-xs font-serif font-bold text-brand-gold-dark mt-1">
                          {item.priceFormatted}
                        </p>
                      </div>

                      {/* Remove Action */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 text-brand-charcoal/40 hover:text-red-600 transition-colors shrink-0"
                        title={`Remove ${item.name}`}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {/* Clear All Link */}
                  <div className="pt-2 text-right">
                    <button
                      onClick={onClearAll}
                      className="text-xs text-brand-charcoal/50 hover:text-red-600 underline font-sans"
                    >
                      Clear all items
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Summary & Proceed to Enquiry Action */}
            {count > 0 && (
              <div className="p-5 sm:p-6 border-t border-brand-charcoal/10 bg-brand-beige/40 space-y-4">
                {/* Duration & Subtotal Breakdown */}
                <div className="space-y-2 text-xs text-brand-charcoal/80">
                  <div className="flex justify-between">
                    <span>Estimated Total Duration</span>
                    <span className="font-semibold text-brand-navy">
                      {totalDurationMinutes} Minutes (~
                      {(totalDurationMinutes / 60).toFixed(1)} hrs)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Selected Therapies</span>
                    <span className="font-semibold text-brand-navy">{count}</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-brand-navy pt-2 border-t border-brand-charcoal/10">
                    <span>Subtotal</span>
                    <span className="text-xl text-brand-gold-dark">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <p className="text-[11px] text-brand-charcoal/60 flex items-center gap-1 pt-0.5">
                    <Info className="w-3.5 h-3.5 text-brand-gold-dark shrink-0" />
                    <span>Applicable government taxes will be added at billing.</span>
                  </p>
                </div>

                {/* Primary Proceed CTA */}
                <button
                  type="button"
                  onClick={onProceedToEnquiry}
                  className="w-full py-3.5 px-4 rounded-xl bg-brand-navy text-white hover:bg-brand-navy-light font-sans text-sm font-bold transition-all shadow-elevated flex items-center justify-center gap-2"
                >
                  <span>Proceed to Spa Enquiry</span>
                  <ArrowRight className="w-4 h-4 text-brand-gold-light" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
