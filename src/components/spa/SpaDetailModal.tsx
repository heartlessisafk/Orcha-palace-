"use client";

import React from "react";
import Image from "next/image";
import { SpaTreatmentItem } from "@/data/spa-catalog";
import { Button } from "@/components/ui/Button";
import {
  X,
  Clock,
  Check,
  Plus,
  Sparkles,
  Phone,
  MessageCircle,
  FileText,
} from "lucide-react";

export interface SpaDetailModalProps {
  treatment: SpaTreatmentItem | null;
  isOpen: boolean;
  isSelected: boolean;
  onClose: () => void;
  onToggleSelect: (treatment: SpaTreatmentItem) => void;
  onEnquireForTreatment: (treatment: SpaTreatmentItem) => void;
}

export function SpaDetailModal({
  treatment,
  isOpen,
  isSelected,
  onClose,
  onToggleSelect,
  onEnquireForTreatment,
}: SpaDetailModalProps) {
  if (!isOpen || !treatment) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-treatment-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-brand-canvas rounded-3xl shadow-2xl overflow-hidden z-10 border border-brand-gold/30 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-md transition-colors"
          aria-label="Close treatment details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1">
          {/* Large Extracted Photographic Image */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-brand-beige">
            <Image
              src={treatment.asset.master}
              alt={treatment.asset.alt}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Overlaid Badges */}
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold text-brand-navy font-sans text-xs font-bold uppercase tracking-wider shadow-subtle">
                  <Sparkles className="w-3 h-3" />
                  <span>{treatment.categoryLabel}</span>
                </span>
                <p className="text-white/80 text-xs font-sans">
                  Official Spa Brochure • Page {treatment.pdfPage}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-navy/90 text-white backdrop-blur-md font-sans text-xs font-semibold shadow-subtle">
                <Clock className="w-3.5 h-3.5 text-brand-gold-light" />
                <span>{treatment.duration}</span>
              </div>
            </div>
          </div>

          {/* Treatment Information & Narrative */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <h2
                id="modal-treatment-title"
                className="font-serif font-bold text-2xl sm:text-3xl text-brand-navy"
              >
                {treatment.name}
              </h2>
              <p className="font-serif italic text-base text-brand-gold-dark">
                {treatment.sanskritName} • {treatment.subtitle}
              </p>
            </div>

            {/* Verbatim Description from PDF */}
            <div className="p-4 sm:p-5 rounded-2xl bg-brand-beige/40 border border-brand-gold/20 space-y-2">
              <p className="text-xs font-sans font-semibold uppercase tracking-wider text-brand-charcoal/60">
                Therapy Details &amp; Benefits
              </p>
              <p className="font-sans text-sm sm:text-base text-brand-charcoal/85 leading-relaxed">
                {treatment.description}
              </p>
            </div>

            {/* Duration and Pricing Breakdown */}
            <div className="grid grid-cols-2 gap-4 border-y border-brand-charcoal/10 py-4 text-left">
              <div>
                <p className="text-xs uppercase tracking-wider text-brand-charcoal/60 font-sans">
                  Listed Duration
                </p>
                <p className="font-serif font-bold text-xl text-brand-navy mt-1">
                  {treatment.duration}
                </p>
                <p className="text-[11px] text-brand-charcoal/60 font-sans">
                  Dedicated therapeutic session
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-brand-charcoal/60 font-sans">
                  Tariff (INR)
                </p>
                <p className="font-serif font-bold text-2xl text-brand-gold-dark mt-0.5">
                  {treatment.priceFormatted}
                </p>
                <p className="text-[11px] text-brand-charcoal/60 font-sans">
                  {treatment.taxQualification}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-brand-beige/50 border-t border-brand-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onToggleSelect(treatment)}
            className={`w-full sm:w-auto px-5 py-3 rounded-xl font-sans text-sm font-semibold transition-all shadow-subtle flex items-center justify-center gap-2 ${
              isSelected
                ? "bg-brand-gold text-brand-navy hover:bg-brand-gold-dark hover:text-white"
                : "bg-brand-beige border border-brand-charcoal/20 text-brand-charcoal hover:bg-brand-beige-dark"
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Selected in Tray</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add to Selection Tray</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onEnquireForTreatment(treatment)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-navy text-white hover:bg-brand-navy-light font-sans text-sm font-bold transition-all shadow-elevated flex items-center justify-center gap-2"
          >
            <span>Enquire for this Therapy</span>
          </button>
        </div>
      </div>
    </div>
  );
}
