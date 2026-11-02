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
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-gold rounded-lg p-1">
          <div className="relative w-10 h-10 shrink-0 rounded-full border border-brand-gold/40 flex items-center justify-center p-1 bg-white">
            <Image
              src="/images/brand/orchha-emblem.svg"
              alt="Orchha Resort Emblem"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div>
            <span className="block font-serif text-lg sm:text-xl font-semibold tracking-tight text-brand-navy group-hover:text-brand-gold transition-colors">
              The Orchha Resort
            </span>
            <span className="block font-sans text-[10px] tracking-widest uppercase text-brand-gold font-medium">
              Betwa River Sanctuary
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Pill */}
        <nav className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full bg-brand-beige/60 border border-brand-charcoal/8 backdrop-blur-sm">
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
          className="lg:hidden p-2 rounded-full border border-brand-charcoal/15 text-brand-charcoal hover:bg-brand-beige transition-colors"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-brand-canvas/98 border-b border-brand-charcoal/10 shadow-floating p-6 backdrop-blur-lg animate-fade-in">
          <nav className="flex flex-col space-y-3">
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
