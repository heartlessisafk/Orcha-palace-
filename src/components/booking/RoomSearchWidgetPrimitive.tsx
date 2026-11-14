"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { SearchQuery } from "@/types/room";
import {
  validateSearchQuery,
  generateWhatsAppBookingUrl,
  generateEmailBookingUrl,
} from "@/lib/booking";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/ui/Stepper";
import {
  Calendar,
  Users,
  Search,
  MessageCircle,
  Mail,
  ExternalLink,
  X,
  AlertCircle,
  Phone,
  Bed,
  Check,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export interface RoomSearchWidgetPrimitiveProps {
  className?: string;
  defaultCategoryName?: string;
}

export function RoomSearchWidgetPrimitive({
  className,
  defaultCategoryName,
}: RoomSearchWidgetPrimitiveProps) {
  // Today and Tomorrow formatted as YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [query, setQuery] = useState<SearchQuery>({
    checkInDate: today,
    checkOutDate: tomorrow,
    adults: 2,
    children: 0,
    roomCount: 1,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>(
    defaultCategoryName || "all"
  );
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
  const [openDirection, setOpenDirection] = useState<"down" | "up">("down");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isHandoffModalOpen, setIsHandoffModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const guestPickerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Intelligent directional positioning for the occupancy popover
  const handleToggleGuestPicker = () => {
    if (!isGuestPickerOpen && guestPickerRef.current) {
      const rect = guestPickerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      // If space below is restricted (< 370px) and there is more headroom above, flip upward
      if (spaceBelow < 370 && spaceAbove > spaceBelow) {
        setOpenDirection("up");
      } else {
        setOpenDirection("down");
      }
    }
    setIsGuestPickerOpen(!isGuestPickerOpen);
  };

  // Close guest picker dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        guestPickerRef.current &&
        !guestPickerRef.current.contains(event.target as Node)
      ) {
        setIsGuestPickerOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsGuestPickerOpen(false);
      }
    }

    if (isGuestPickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGuestPickerOpen]);

  // BODY & ROOT SCROLL LOCKING WHEN MODAL IS OPEN
  useEffect(() => {
    if (isHandoffModalOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsHandoffModalOpen(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isHandoffModalOpen]);

  // Calculate nights
  const calculateNights = () => {
    if (!query.checkInDate || !query.checkOutDate) return 1;
    const start = new Date(query.checkInDate).getTime();
    const end = new Date(query.checkOutDate).getTime();
    const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateSearchQuery(query);
    if (!result.isValid) {
      setValidationErrors(result.errors);
      return;
    }
    setValidationErrors({});
    setIsHandoffModalOpen(true);
  };

  return (
    <>
      <div
        className={cn(
          "w-full rounded-2xl bg-white/95 border border-brand-charcoal/10 shadow-sm p-4 sm:p-6 transition-all duration-300",
          className
        )}
      >
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* 1. Check-In Date */}
            <div className="space-y-1.5">
              <label htmlFor="checkin-date" className="font-sans text-xs font-semibold tracking-wider uppercase text-brand-navy flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Check-In</span>
                </span>
                <span className="text-[10px] font-mono text-brand-muted">Arrival</span>
              </label>
              <div className="relative">
                <input
                  id="checkin-date"
                  type="date"
                  min={today}
                  value={query.checkInDate}
                  onChange={(e) => {
                    const newCheckIn = e.target.value;
                    const nextDay = new Date(new Date(newCheckIn).getTime() + 86400000)
                      .toISOString()
                      .split("T")[0];
                    setQuery({
                      ...query,
                      checkInDate: newCheckIn,
                      checkOutDate:
                        query.checkOutDate <= newCheckIn ? nextDay : query.checkOutDate,
                    });
                  }}
                  className="w-full rounded-xl bg-brand-canvas border border-brand-charcoal/15 px-3.5 py-3 font-sans text-sm font-medium text-brand-charcoal focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                />
              </div>
              {validationErrors.checkInDate && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {validationErrors.checkInDate}
                </p>
              )}
            </div>

            {/* 2. Check-Out Date */}
            <div className="space-y-1.5">
              <label htmlFor="checkout-date" className="font-sans text-xs font-semibold tracking-wider uppercase text-brand-navy flex items-center justify-between cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Check-Out</span>
                </span>
                <span className="text-[10px] font-mono text-brand-gold font-bold">
                  {nights} {nights === 1 ? "Night" : "Nights"}
                </span>
              </label>
              <div className="relative">
                <input
                  id="checkout-date"
                  type="date"
                  min={query.checkInDate || today}
                  value={query.checkOutDate}
                  onChange={(e) => setQuery({ ...query, checkOutDate: e.target.value })}
                  className="w-full rounded-xl bg-brand-canvas border border-brand-charcoal/15 px-3.5 py-3 font-sans text-sm font-medium text-brand-charcoal focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                />
              </div>
              {validationErrors.checkOutDate && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {validationErrors.checkOutDate}
                </p>
              )}
            </div>

            {/* 3. Guests Selector Dropdown */}
            <div
              className={cn(
                "space-y-1.5 relative",
                isGuestPickerOpen ? "z-40" : "z-10"
              )}
              ref={guestPickerRef}
            >
              <label className="font-sans text-xs font-semibold tracking-wider uppercase text-brand-navy flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Guests &amp; Rooms</span>
                </span>
                <span className="text-[10px] font-mono text-brand-muted">Occupancy</span>
              </label>
              <button
                type="button"
                aria-haspopup="dialog"
                aria-expanded={isGuestPickerOpen}
                onClick={handleToggleGuestPicker}
                className="w-full rounded-xl bg-brand-canvas border border-brand-charcoal/15 px-3.5 py-3 font-sans text-sm font-medium text-brand-charcoal text-left flex items-center justify-between focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
              >
                <span className="truncate">
                  {query.adults} Adults{query.children > 0 ? `, ${query.children} Kids` : ""} · {query.roomCount} Rm
                </span>
                <span className="text-xs text-brand-gold font-semibold ml-2 shrink-0">
                  {isGuestPickerOpen ? "Close" : "Change"}
                </span>
              </button>

              {/* Guest / Room Dropdown Popover */}
              {isGuestPickerOpen && (
                <div
                  className={cn(
                    "absolute left-0 right-0 sm:left-0 sm:right-auto lg:left-auto lg:right-0 w-full sm:w-[320px] max-w-[calc(100vw-2rem)] p-5 rounded-2xl bg-white border border-brand-gold/30 shadow-2xl z-50 space-y-4 animate-fade-in",
                    openDirection === "up"
                      ? "bottom-full mb-2 shadow-[0_-20px_50px_rgba(0,0,0,0.2)]"
                      : "top-full mt-2"
                  )}
                >
                  <div className="pb-2 border-b border-brand-charcoal/10 flex items-center justify-between">
                    <span className="font-serif text-sm font-semibold text-brand-navy">
                      Select Occupancy
                    </span>
                    <span className="text-[11px] font-sans text-brand-olive font-mono">
                      Up to 3 rooms online
                    </span>
                  </div>

                  <Stepper
                    label="Adults"
                    sublabel="Ages 12+"
                    value={query.adults}
                    min={1}
                    max={5}
                    onChange={(val) => setQuery({ ...query, adults: val })}
                  />
                  <Stepper
                    label="Children"
                    sublabel="Ages 0–11"
                    value={query.children}
                    min={0}
                    max={4}
                    onChange={(val) => setQuery({ ...query, children: val })}
                  />
                  <Stepper
                    label="Rooms"
                    sublabel="Private accommodation units"
                    value={query.roomCount}
                    min={1}
                    max={3}
                    onChange={(val) => setQuery({ ...query, roomCount: val })}
                  />

                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    fullWidth
                    onClick={() => setIsGuestPickerOpen(false)}
                    className="mt-2"
                  >
                    Done
                  </Button>
                </div>
              )}
            </div>

            {/* 4. Action Button */}
            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                withArrow
                className="h-[46px] shadow-md hover:shadow-lg font-medium text-sm"
              >
                Check Rates &amp; Book
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          ENGINEERED LUXURY BOOKING HANDOFF MODAL
          Strict body scroll-lock, backdrop containment, and keyboard support
          ───────────────────────────────────────────────────────────────── */}
      {mounted &&
        isHandoffModalOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsHandoffModalOpen(false);
            }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 bg-brand-navy/90 backdrop-blur-md animate-fade-in overflow-y-auto"
          >
            <div
              ref={modalRef}
              tabIndex={-1}
              className="relative w-full max-w-lg rounded-2xl sm:rounded-3xl bg-white border border-brand-gold/30 shadow-2xl p-4 sm:p-6 md:p-7 flex flex-col max-h-[92vh] sm:max-h-[90vh] my-auto overflow-hidden outline-none"
            >
              {/* Modal Header (Fixed top) */}
              <div className="shrink-0 pb-3 border-b border-brand-charcoal/10 flex items-start justify-between gap-3 sm:gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-[10px] font-mono uppercase tracking-widest text-brand-gold-dark font-semibold">
                    <Sparkles className="w-3 h-3 text-brand-gold shrink-0" />
                    <span className="truncate">Direct Concierge Handoff</span>
                  </div>
                  <h3
                    id="booking-modal-title"
                    className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold text-brand-navy leading-tight"
                  >
                    Complete Your Reservation
                  </h3>
                  <p className="font-sans text-xs text-brand-olive leading-relaxed">
                    Connect with our reservations desk for instant tariff confirmation &amp; riverfront allocation.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsHandoffModalOpen(false)}
                  className="w-10 h-10 rounded-full border border-brand-charcoal/15 flex items-center justify-center text-brand-muted hover:text-brand-charcoal hover:border-brand-charcoal hover:bg-brand-canvas transition-colors shrink-0 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                  aria-label="Close reservation dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Modal Body */}
              <div className="flex-1 overflow-y-auto space-y-4 py-3 sm:py-4 pr-1">
                {/* Stay Summary Strip */}
                <div className="rounded-2xl bg-brand-beige border border-brand-gold/20 p-3.5 sm:p-4 text-xs text-brand-olive space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-brand-charcoal/10 gap-2">
                    <span className="text-brand-muted flex items-center gap-1.5 font-medium shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Stay Dates:</span>
                    </span>
                    <span className="font-semibold text-brand-navy text-right truncate">
                      {query.checkInDate} → {query.checkOutDate}{" "}
                      <span className="text-brand-gold font-bold">({nights} {nights === 1 ? "Night" : "Nights"})</span>
                    </span>
                  </div>

                  <div className="flex justify-between items-center gap-2">
                    <span className="text-brand-muted flex items-center gap-1.5 font-medium shrink-0">
                      <Users className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Occupancy:</span>
                    </span>
                    <span className="font-semibold text-brand-navy text-right truncate">
                      {query.adults} Adults{query.children > 0 ? `, ${query.children} Children` : ""}{" "}
                      ({query.roomCount} {query.roomCount > 1 ? "Rooms" : "Room"})
                    </span>
                  </div>

                  {defaultCategoryName && (
                    <div className="flex justify-between items-center pt-1 border-t border-brand-charcoal/10 gap-2">
                      <span className="text-brand-muted flex items-center gap-1.5 font-medium shrink-0">
                        <Bed className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Preferred Stay:</span>
                      </span>
                      <span className="font-semibold text-brand-gold-dark text-right truncate">
                        {defaultCategoryName}
                      </span>
                    </div>
                  )}
                </div>

                {/* Handoff Channels */}
                <div className="space-y-2.5 sm:space-y-3">
                  <span className="block font-sans text-xs uppercase tracking-wider text-brand-navy font-semibold">
                    Select Your Preferred Booking Channel
                  </span>

                  {/* Option 1: WhatsApp Concierge (Recommended) */}
                  <a
                    href={generateWhatsAppBookingUrl({
                      ...query,
                      selectedCategoryName: defaultCategoryName,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border border-emerald-600/30 bg-emerald-50/60 hover:bg-emerald-50 hover:border-emerald-600 shadow-sm hover:shadow-md transition-all duration-200 group touch-manipulation"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-sans text-sm font-semibold text-emerald-950">
                          Instant WhatsApp Concierge
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                          Fastest
                        </span>
                      </div>
                      <p className="font-sans text-xs text-emerald-800/80 mt-0.5 line-clamp-2 sm:line-clamp-none">
                        Connect directly with our 24/7 front desk at +91 99262 19900 for best direct tariffs.
                      </p>
                    </div>
                  </a>

                  {/* Option 2: Direct Email Reservation */}
                  <a
                    href={generateEmailBookingUrl({
                      ...query,
                      selectedCategoryName: defaultCategoryName,
                    })}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border border-brand-charcoal/15 bg-white hover:bg-brand-beige/40 hover:border-brand-gold shadow-sm hover:shadow-md transition-all duration-200 group touch-manipulation"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-brand-navy text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <span className="font-sans text-sm font-semibold text-brand-navy block">
                        Direct Email Reservation
                      </span>
                      <p className="font-sans text-xs text-brand-muted mt-0.5 truncate sm:whitespace-normal">
                        Send formal reservation enquiry to orchha@orchharesort.com
                      </p>
                    </div>
                  </a>

                  {/* Option 3: MakeMyTrip Instant Checkout */}
                  <a
                    href={SITE_CONFIG.otaLinks.makeMyTrip}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border border-brand-charcoal/15 bg-white hover:bg-brand-beige/40 hover:border-brand-gold shadow-sm hover:shadow-md transition-all duration-200 group touch-manipulation"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <span className="font-sans text-sm font-semibold text-brand-charcoal block">
                        MakeMyTrip Instant Checkout
                      </span>
                      <p className="font-sans text-xs text-brand-muted mt-0.5 line-clamp-2 sm:line-clamp-none">
                        Automated online booking engine with instant credit card payment
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Reassurance Footer (Fixed bottom) */}
              <div className="shrink-0 pt-3 border-t border-brand-charcoal/10 flex items-center justify-between text-[11px] text-brand-muted font-sans gap-2">
                <span className="flex items-center gap-1.5 text-brand-olive truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <span className="truncate">Zero reservation fees · Best Rate Guarantee</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsHandoffModalOpen(false)}
                  className="text-brand-navy font-semibold hover:underline shrink-0 p-1"
                >
                  Return to Site
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
