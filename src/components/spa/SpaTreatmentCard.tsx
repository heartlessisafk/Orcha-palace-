"use client";

import React from "react";
import Image from "next/image";
import { SpaTreatmentItem } from "@/data/spa-catalog";
import { Button } from "@/components/ui/Button";
import { HoverZoom } from "@/components/motion/HoverZoom";
import { Clock, Plus, Check, Eye, Sparkles } from "lucide-react";

export interface SpaTreatmentCardProps {
  treatment: SpaTreatmentItem;
  isSelected: boolean;
  onToggleSelect: (treatment: SpaTreatmentItem) => void;
  onOpenDetail: (treatment: SpaTreatmentItem) => void;
}

export function SpaTreatmentCard({
  treatment,
  isSelected,
  onToggleSelect,
  onOpenDetail,
}: SpaTreatmentCardProps) {
  return (
    <article
      className={`group relative bg-brand-canvas rounded-2xl overflow-hidden border transition-all duration-300 ease-out flex flex-col justify-between shadow-subtle hover:shadow-hover hover:-translate-y-1.5 hover:scale-[1.012] active:scale-[0.985] ${
        isSelected
          ? "border-brand-gold ring-2 ring-brand-gold/50 bg-brand-beige/20 shadow-md"
          : "border-brand-charcoal/10 hover:border-brand-gold/50"
      }`}
    >
      {/* Top: Photographic Preview with Hover Zoom */}
      <div>
        <div
          onClick={() => onOpenDetail(treatment)}
          className="relative w-full cursor-pointer"
        >
          <HoverZoom aspectRatio="4:3" className="w-full rounded-b-none">
            <Image
              src={treatment.asset.card}
              alt={treatment.asset.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center"
            />
          </HoverZoom>

          {/* Gradient Overlay for subtle depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* Duration Badge */}
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-navy/90 text-white backdrop-blur-md text-[11px] font-sans font-medium shadow-subtle">
            <Clock className="w-3 h-3 text-brand-gold-light" />
            <span>{treatment.duration}</span>
          </div>

          {/* Category Pill / Tag */}
          {treatment.tag && (
            <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-gold text-brand-navy font-sans text-[10px] font-bold uppercase tracking-wider shadow-subtle">
              <Sparkles className="w-2.5 h-2.5" />
              <span>{treatment.tag}</span>
            </div>
          )}

          {/* Quick View Button on Image Hover */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 text-brand-navy text-xs font-sans font-medium shadow-subtle">
              <Eye className="w-3 h-3" />
              <span>Quick View</span>
            </span>
          </div>
        </div>

        {/* Middle: Content & Typography */}
        <div className="p-5 sm:p-6 space-y-3">
          {/* Category Subtitle */}
          <div className="flex items-center justify-between text-xs text-brand-gold-dark font-sans font-semibold tracking-wider uppercase">
            <span>{treatment.categoryLabel}</span>
            <span className="text-[11px] text-brand-charcoal/40 font-normal">
              PDF Page {treatment.pdfPage}
            </span>
          </div>

          {/* Treatment Name & Sanskrit Heading */}
          <div className="space-y-0.5">
            <h3
              onClick={() => onOpenDetail(treatment)}
              className="font-serif font-bold text-xl sm:text-2xl text-brand-navy cursor-pointer hover:text-brand-gold-dark transition-colors"
            >
              {treatment.name}
            </h3>
            <p className="font-serif italic text-xs text-brand-charcoal/60">
              {treatment.sanskritName} • {treatment.subtitle}
            </p>
          </div>

          {/* Description verbatim from PDF */}
          <p className="font-sans text-xs sm:text-sm text-brand-charcoal/75 leading-relaxed line-clamp-3">
            {treatment.description}
          </p>
        </div>
      </div>

      {/* Bottom: Price, Tax Qualification & Quick-Commerce Selection Action */}
      <div className="p-5 sm:p-6 pt-0 border-t border-brand-charcoal/10 mt-2">
        <div className="flex items-end justify-between pt-4 gap-2">
          {/* Price & Tax Qualification */}
          <div>
            <div className="font-serif font-bold text-2xl text-brand-navy leading-none">
              {treatment.priceFormatted}
            </div>
            <p className="text-[10px] text-brand-charcoal/60 font-sans tracking-wide mt-1">
              {treatment.taxQualification}
            </p>
          </div>

          {/* Toggle Selection Button */}
          <button
            type="button"
            onClick={() => onToggleSelect(treatment)}
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-sans font-semibold transition-all shadow-subtle tactile-3d hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${
              isSelected
                ? "bg-brand-gold text-brand-navy hover:bg-brand-gold-dark hover:text-white hover:shadow-gold-ambient"
                : "bg-brand-navy text-white hover:bg-brand-navy-light hover:shadow-hover"
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Selected</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Select</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
