"use client";

import React, { useState } from "react";
import { SearchQuery } from "@/types/room";
import { validateSearchQuery, generateWhatsAppBookingUrl, generateEmailBookingUrl } from "@/lib/booking";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/ui/Stepper";
import { Calendar, Users, Home, Search, MessageCircle, Mail, ExternalLink, X, AlertCircle } from "lucide-react";
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

  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isHandoffModalOpen, setIsHandoffModalOpen] = useState(false);

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
          "w-full rounded-luxury bg-white border border-brand-charcoal/10 shadow-floating p-4 sm:p-6 transition-all duration-300",
          className
        )}
      >
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* 1. Check-In Date */}
            <div className="space-y-1.5">
              <label className="block font-sans text-xs font-semibold tracking-wider uppercase text-brand-olive flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                <span>Check-In Date</span>
              </label>
              <input
                type="date"
                min={today}
                value={query.checkInDate}
                onChange={(e) => setQuery({ ...query, checkInDate: e.target.value })}
                className="w-full rounded-lg bg-brand-canvas border border-brand-charcoal/15 px-3 py-2.5 font-sans text-sm text-brand-charcoal focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
              />
              {validationErrors.checkInDate && (
                <p className="text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {validationErrors.checkInDate}
                </p>
              )}
            </div>

            {/* 2. Check-Out Date */}
            <div className="space-y-1.5">
              <label className="block font-sans text-xs font-semibold tracking-wider uppercase text-brand-olive flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                <span>Check-Out Date</span>
              </label>
              <input
                type="date"
                min={query.checkInDate || today}
                value={query.checkOutDate}
                onChange={(e) => setQuery({ ...query, checkOutDate: e.target.value })}
                className="w-full rounded-lg bg-brand-canvas border border-brand-charcoal/15 px-3 py-2.5 font-sans text-sm text-brand-charcoal focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
              />
              {validationErrors.checkOutDate && (
                <p className="text-xs text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {validationErrors.checkOutDate}
                </p>
              )}
            </div>

            {/* 3. Guests Selector Dropdown */}
            <div className="space-y-1.5 relative">
              <label className="block font-sans text-xs font-semibold tracking-wider uppercase text-brand-olive flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-brand-gold" />
                <span>Guests & Rooms</span>
              </label>
              <button
                type="button"
                onClick={() => setIsGuestPickerOpen(!isGuestPickerOpen)}
                className="w-full rounded-lg bg-brand-canvas border border-brand-charcoal/15 px-3 py-2.5 font-sans text-sm text-brand-charcoal text-left flex items-center justify-between focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
              >
                <span className="truncate">
                  {query.adults} Adults, {query.children} Kids · {query.roomCount} Rm
                </span>
                <span className="text-xs text-brand-gold font-medium ml-2">Edit</span>
              </button>

              {/* Guest / Room Dropdown Popover */}
              {isGuestPickerOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 p-4 rounded-luxury bg-white border border-brand-charcoal/15 shadow-floating z-50 space-y-3">
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
                    sublabel="Max 3 rooms online"
                    value={query.roomCount}
                    min={1}
                    max={3}
                    onChange={(val) => setQuery({ ...query, roomCount: val })}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => setIsGuestPickerOpen(false)}
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
                className="h-[42px] py-0"
              >
                Check Rates & Book
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Booking Handoff Resolution Modal */}
      {isHandoffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-luxury bg-white border border-brand-charcoal/10 shadow-floating p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-gold">
                  Direct Concierge & Instant Handoff
                </span>
                <h3 className="font-serif text-2xl font-semibold text-brand-navy mt-1">
                  Complete Your Stay at Orchha Resort
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsHandoffModalOpen(false)}
                className="w-8 h-8 rounded-full border border-brand-charcoal/15 flex items-center justify-center text-brand-muted hover:text-brand-charcoal hover:border-brand-charcoal transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Stay Summary Strip */}
            <div className="rounded-lg bg-brand-beige/50 border border-brand-charcoal/8 p-3.5 text-xs text-brand-olive space-y-1">
              <div className="flex justify-between">
                <span className="text-brand-muted">Stay Dates:</span>
                <span className="font-semibold text-brand-charcoal">
                  {query.checkInDate} → {query.checkOutDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Guests & Accommodation:</span>
                <span className="font-semibold text-brand-charcoal">
                  {query.adults} Adults{query.children > 0 ? `, ${query.children} Children` : ""}{" "}
                  ({query.roomCount} Room{query.roomCount > 1 ? "s" : ""})
                </span>
              </div>
              {defaultCategoryName && (
                <div className="flex justify-between">
                  <span className="text-brand-muted">Selected Room:</span>
                  <span className="font-semibold text-brand-gold-dark">{defaultCategoryName}</span>
                </div>
              )}
            </div>

            {/* Handoff Options */}
            <div className="space-y-3">
              <p className="font-sans text-xs uppercase tracking-wider text-brand-muted font-semibold">
                Select Booking Method
              </p>

              {/* Option 1: WhatsApp Concierge */}
              <a
                href={generateWhatsAppBookingUrl({
                  ...query,
                  selectedCategoryName: defaultCategoryName,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-emerald-600/30 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-600 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-sm font-semibold text-emerald-950">
                      Instant WhatsApp Concierge
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  </div>
                  <p className="font-sans text-xs text-emerald-800/80 mt-0.5">
                    Connect directly with our 24/7 front desk at +91 99262 19900 for best rates.
                  </p>
                </div>
              </a>

              {/* Option 2: Direct Email */}
              <a
                href={generateEmailBookingUrl({
                  ...query,
                  selectedCategoryName: defaultCategoryName,
                })}
                className="flex items-center gap-4 p-4 rounded-xl border border-brand-charcoal/15 bg-white hover:bg-brand-beige/40 hover:border-brand-gold transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <span className="font-sans text-sm font-semibold text-brand-navy block">
                    Direct Email Reservation
                  </span>
                  <p className="font-sans text-xs text-brand-muted mt-0.5">
                    Send formal enquiry to orchha@orchharesort.com
                  </p>
                </div>
              </a>

              {/* Option 3: MakeMyTrip OTA Direct */}
              <a
                href={SITE_CONFIG.otaLinks.makeMyTrip}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-brand-charcoal/15 bg-white hover:bg-brand-beige/40 hover:border-brand-gold transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <span className="font-sans text-sm font-semibold text-brand-charcoal block">
                    MakeMyTrip Instant Checkout
                  </span>
                  <p className="font-sans text-xs text-brand-muted mt-0.5">
                    Direct automated reservation with instant credit card receipt
                  </p>
                </div>
              </a>
            </div>

            {/* Disclaimer */}
            <p className="font-sans text-[11px] text-brand-muted text-center pt-2 border-t border-brand-charcoal/8">
              Orchha Resort values your privacy. No payment is taken until room confirmation is issued.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
