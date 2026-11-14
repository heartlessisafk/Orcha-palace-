"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out",
        isScrolled
          ? "bg-brand-canvas/90 backdrop-blur-md border-b border-brand-charcoal/8 py-3.5 shadow-subtle"
          : transparentAtTop
          ? "bg-transparent py-5"
          : "bg-brand-canvas/80 backdrop-blur-sm border-b border-brand-charcoal/5 py-4",
        className
      )}
    >
      <div className="max-w-wide mx-auto px-5 sm:px-8 md:px-12 flex items-center justify-between">
        {/* Official Brand Logo & Interactive Luxury White-to-Blue Container */}
        <Link
          href="/"
          className="group relative inline-flex items-center justify-center rounded-xl bg-white px-3.5 py-1.5 sm:px-4 sm:py-2 border border-brand-charcoal/10 shadow-subtle hover:bg-brand-navy hover:border-brand-navy focus-visible:bg-brand-navy focus-visible:border-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 transition-all duration-300 ease-out shrink-0 select-none"
          aria-label="The Orchha Resort — Return to Homepage"
        >
          {/* Logo Lettering & Tagline via Antialiased Mask Asset */}
          <span
            className="block w-[145px] sm:w-[170px] md:w-[192px] aspect-[607/92] bg-brand-navy group-hover:bg-white group-focus-visible:bg-white transition-colors duration-300 ease-out"
            style={{
              maskImage: 'url("/images/brand/orchha-logo.png")',
              WebkitMaskImage: 'url("/images/brand/orchha-logo.png")',
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
            aria-hidden="true"
          />
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
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`tel:${SITE_CONFIG.contact.phonePrimary.replace(/\s+/g, "")}`}
            className="hidden xl:flex items-center gap-2 font-sans text-xs font-medium text-brand-olive hover:text-brand-gold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand-gold" />
            <span>{SITE_CONFIG.contact.phonePrimary}</span>
          </a>

          <Link href="/#booking-sequence">
            <Button variant="primary" size="pill" withArrow>
              Reserve Stay
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-full border border-brand-charcoal/15 text-brand-charcoal hover:bg-brand-beige transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-brand-canvas/98 border-b border-brand-charcoal/10 shadow-floating p-6 backdrop-blur-lg animate-fade-in">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-3">
            {SITE_CONFIG.navigation.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-lg text-brand-charcoal hover:text-brand-gold py-1.5 border-b border-brand-charcoal/5"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href={`tel:${SITE_CONFIG.contact.phonePrimary.replace(/\s+/g, "")}`}
                className="flex items-center justify-center gap-2 font-sans text-sm font-medium py-2.5 rounded-full border border-brand-charcoal/20 text-brand-charcoal"
              >
                <Phone className="w-4 h-4 text-brand-gold" />
                <span>Call Concierge: {SITE_CONFIG.contact.phonePrimary}</span>
              </a>
              <Link href="/#booking-sequence" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" size="md" fullWidth withArrow>
                  Reserve Stay
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
