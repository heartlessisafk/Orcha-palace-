"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavbarPrimitiveProps {
  transparentAtTop?: boolean;
  className?: string;
}

export function NavbarPrimitive({
  transparentAtTop = false,
  className,
}: NavbarPrimitiveProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsMobileMenuOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalStyle;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out",
        isMobileMenuOpen
          ? "bg-[#FDFBF7] border-b border-brand-charcoal/10 shadow-subtle py-3.5"
          : isScrolled
          ? "bg-brand-canvas/90 backdrop-blur-md border-b border-brand-charcoal/8 py-3.5 shadow-subtle"
          : transparentAtTop
          ? "bg-transparent py-5"
          : "bg-brand-canvas/80 backdrop-blur-sm border-b border-brand-charcoal/5 py-4",
        className
      )}
    >
      <div className="max-w-wide mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex items-center justify-between">
        {/* Official Brand Logo & Interactive Luxury White-to-Blue Container */}
        <Link
          href="/"
          className="group relative inline-flex items-center justify-center rounded-xl bg-white px-3 sm:px-4 py-1.5 sm:py-2 border border-brand-charcoal/10 shadow-subtle hover:bg-brand-navy hover:border-brand-navy focus-visible:bg-brand-navy focus-visible:border-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 transition-all duration-300 ease-out shrink-0 select-none touch-manipulation"
          aria-label="The Orchha Resort — Return to Homepage"
        >
          {/* Authentic Brand Logo Image (Navy Default, White on Desktop Hover/Focus) */}
          <div className="relative w-[130px] sm:w-[160px] md:w-[180px] lg:w-[192px] aspect-[607/92] overflow-hidden">
            <Image
              src="/images/brand/orchha-logo-navy.png"
              alt="The Orchha Resort"
              fill
              priority
              sizes="(max-width: 640px) 130px, (max-width: 768px) 160px, (max-width: 1024px) 180px, 192px"
              className="object-contain group-hover:opacity-0 group-focus-visible:opacity-0 transition-opacity duration-300 ease-out"
            />
            <Image
              src="/images/brand/orchha-logo-white.png"
              alt="The Orchha Resort"
              fill
              priority
              sizes="(max-width: 640px) 130px, (max-width: 768px) 160px, (max-width: 1024px) 180px, 192px"
              className="object-contain opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 ease-out"
            />
          </div>
        </Link>

        {/* Center Desktop Navigation Pill */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full bg-brand-beige/60 border border-brand-charcoal/8 backdrop-blur-sm">
          {SITE_CONFIG.navigation.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-xs font-medium px-3.5 py-1.5 rounded-full text-brand-charcoal/80 hover:text-brand-navy hover:bg-white transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Action CTA & Phone */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Desktop Full Phone Pill */}
          <a
            href={`tel:${SITE_CONFIG.contact.phonePrimary.replace(/\s+/g, "")}`}
            className="hidden xl:inline-flex items-center gap-2 font-sans text-xs font-medium px-4 py-2 rounded-full bg-white/65 hover:bg-white/90 border border-brand-charcoal/10 backdrop-blur-sm text-brand-navy shadow-subtle hover:shadow-card active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 shrink-0 select-none touch-manipulation min-h-[36px]"
            aria-label={`Call concierge: ${SITE_CONFIG.contact.phonePrimary}`}
          >
            <Phone className="w-3.5 h-3.5 text-brand-navy shrink-0" aria-hidden="true" />
            <span className="tracking-wide">{SITE_CONFIG.contact.phonePrimary}</span>
          </a>

          {/* Tablet Quick Call Icon Pill (visible on sm to xl) */}
          <a
            href={`tel:${SITE_CONFIG.contact.phonePrimary.replace(/\s+/g, "")}`}
            className="hidden sm:inline-flex xl:hidden p-2.5 rounded-full bg-white/75 hover:bg-white border border-brand-charcoal/10 text-brand-navy shadow-subtle transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold active:scale-95 touch-manipulation min-w-[40px] min-h-[40px] items-center justify-center"
            aria-label={`Call concierge: ${SITE_CONFIG.contact.phonePrimary}`}
          >
            <Phone className="w-4 h-4 text-brand-navy shrink-0" aria-hidden="true" />
          </a>

          {/* Desktop & Tablet Reserve Stay CTA */}
          <div className="hidden sm:block">
            <Link href="/#booking-sequence">
              <Button variant="primary" size="pill" withArrow className="touch-manipulation">
                Reserve Stay
              </Button>
            </Link>
          </div>

          {/* Mobile & Tablet Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full border border-brand-charcoal/15 text-brand-charcoal hover:bg-brand-beige transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center select-none"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Backdrop & Drawer Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="lg:hidden fixed inset-0 top-[60px] sm:top-[70px] bg-black/50 backdrop-blur-sm z-30 transition-opacity animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className="lg:hidden absolute top-full left-0 right-0 bg-[#FDFBF7] border-b border-brand-charcoal/12 shadow-2xl p-5 sm:p-6 z-40 max-h-[calc(100vh-80px)] overflow-y-auto animate-fade-in"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1.5">
              {SITE_CONFIG.navigation.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-lg text-brand-charcoal hover:text-brand-gold active:bg-brand-beige/50 py-2.5 px-3 rounded-xl border-b border-brand-charcoal/5 transition-colors touch-manipulation"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href={`tel:${SITE_CONFIG.contact.phonePrimary.replace(/\s+/g, "")}`}
                  className="flex items-center justify-center gap-2.5 font-sans text-sm font-medium py-3 rounded-full bg-white/80 backdrop-blur-sm border border-brand-charcoal/10 text-brand-navy hover:bg-white active:scale-[0.98] transition-all shadow-subtle touch-manipulation min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-brand-navy shrink-0" />
                  <span>Call Concierge: {SITE_CONFIG.contact.phonePrimary}</span>
                </a>
                <Link href="/#booking-sequence" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                  <Button variant="primary" size="lg" fullWidth withArrow className="min-h-[44px] touch-manipulation">
                    Reserve Stay
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
