"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SPA_CONTACT_INFO } from "@/data/spa-catalog";
import { Sparkles, Phone, ShoppingBag, ArrowLeft, Clock } from "lucide-react";

export interface SpaNavbarProps {
  selectedCount: number;
  subtotal: number;
  onOpenTray: () => void;
  onOpenEnquiry: () => void;
}

export function SpaNavbar({
  selectedCount,
  subtotal,
  onOpenTray,
  onOpenEnquiry,
}: SpaNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-canvas/95 backdrop-blur-md shadow-subtle border-b border-brand-gold/20 py-2.5"
          : "bg-brand-canvas/80 backdrop-blur-sm border-b border-brand-charcoal/5 py-3.5"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between gap-4">
          {/* Left: Brand Identity & Official Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-brand-charcoal/60 hover:text-brand-navy transition-colors font-sans mr-1 hidden sm:inline-flex"
              title="Return to Main Resort Website"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Resort Home</span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Official The Orchha Resort Logo (Matching Main Website Header) */}
              <Link
                href="/"
                className="group relative inline-flex items-center justify-center rounded-xl bg-white px-2.5 sm:px-3 py-1.5 border border-brand-charcoal/10 shadow-subtle hover:bg-brand-navy hover:border-brand-navy focus-visible:bg-brand-navy focus-visible:border-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold transition-all duration-300 ease-out shrink-0 select-none touch-manipulation"
                aria-label="The Orchha Resort — Return to Homepage"
              >
                <div className="relative w-[115px] sm:w-[135px] md:w-[155px] aspect-[607/92] overflow-hidden">
                  <Image
                    src="/images/brand/orchha-logo-navy.png"
                    alt="The Orchha Resort"
                    fill
                    sizes="(max-width: 640px) 115px, (max-width: 768px) 135px, 155px"
                    className="object-contain group-hover:opacity-0 group-focus-visible:opacity-0 transition-opacity duration-300 ease-out"
                  />
                  <Image
                    src="/images/brand/orchha-logo-white.png"
                    alt="The Orchha Resort"
                    fill
                    sizes="(max-width: 640px) 115px, (max-width: 768px) 135px, 155px"
                    className="object-contain opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 ease-out"
                  />
                </div>
              </Link>

              {/* Distinctive Spa Identity Badge */}
              <Link
                href="/spa"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-beige border border-brand-gold/30 hover:border-brand-gold text-brand-navy transition-colors shrink-0"
              >
                <Sparkles className="w-3 h-3 text-brand-gold-dark shrink-0" />
                <span className="font-serif font-semibold text-xs sm:text-sm tracking-tight text-brand-navy whitespace-nowrap">
                  <span className="hidden sm:inline">Ayurveda </span>Spa
                </span>
              </Link>
            </div>
          </div>

          {/* Center: Hours / Status (Desktop only) */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-brand-charcoal/70 bg-brand-beige/50 px-3 py-1 rounded-full border border-brand-gold/20">
            <Clock className="w-3.5 h-3.5 text-brand-gold-dark" />
            <span>{SPA_CONTACT_INFO.hours}</span>
            <span className="text-brand-charcoal/30">•</span>
            <span>Kanchanghat, Orchha</span>
          </div>

          {/* Right: Direct Phone & Quick Selection Tray */}
          <div className="flex items-center gap-2.5">
            {/* Direct Phone Action */}
            <a
              href={`tel:+91${SPA_CONTACT_INFO.phonePrimary}`}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-charcoal/15 text-xs font-sans text-brand-charcoal hover:border-brand-gold hover:text-brand-gold-dark transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>{SPA_CONTACT_INFO.phonePrimaryFormatted}</span>
            </a>

            {/* Quick-Commerce Selection Tray Pill */}
            <button
              onClick={onOpenTray}
              type="button"
              className={`relative inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-sans text-xs sm:text-sm font-medium transition-all shadow-subtle ${
                selectedCount > 0
                  ? "bg-brand-navy text-white hover:bg-brand-navy-light"
                  : "bg-brand-beige text-brand-charcoal hover:bg-brand-beige-dark border border-brand-gold/30"
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-brand-gold-light" />
              <span className="font-medium">
                {selectedCount > 0 ? (
                  <>
                    <span className="font-semibold">{selectedCount}</span>
                    <span className="hidden sm:inline"> selected</span> • ₹
                    {subtotal.toLocaleString("en-IN")}
                  </>
                ) : (
                  <>
                    <span>Treatment Tray</span>
                  </>
                )}
              </span>
              {selectedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-gold text-brand-navy text-[11px] font-bold flex items-center justify-center border-2 border-white">
                  {selectedCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
