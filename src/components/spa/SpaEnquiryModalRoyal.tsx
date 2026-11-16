"use client";

import React, { useState } from "react";
import { SpaTreatmentItem, SPA_CONTACT_INFO } from "@/data/spa-catalog";
import { Button } from "@/components/ui/Button";
import {
  X,
  MessageCircle,
  Phone,
  Copy,
  Check,
  Calendar,
  Clock,
  Sparkles,
  Info,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

export interface SpaEnquiryModalRoyalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTreatments: SpaTreatmentItem[];
  subtotal: number;
  totalDurationMinutes: number;
}

export function SpaEnquiryModalRoyal({
  isOpen,
  onClose,
  selectedTreatments,
  subtotal,
  totalDurationMinutes,
}: SpaEnquiryModalRoyalProps) {
  const today = new Date().toISOString().split("T")[0];

  const [preferredDate, setPreferredDate] = useState(today);
  const [preferredTimeSlot, setPreferredTimeSlot] = useState(
    "Morning (8:00 AM – 12:00 PM)"
  );
  const [guestCount, setGuestCount] = useState(1);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Format the structured enquiry text
  const treatmentSummary =
    selectedTreatments.length > 0
      ? selectedTreatments
          .map((t) => `• ${t.name} (${t.duration}) — ${t.priceFormatted}`)
          .join("\n")
      : "• General Ayurvedic Consultation & Wellness Assessment";

  const enquiryMessage = [
    `*SPA ENQUIRY — THE ORCHHA RESORT SPA*`,
    `========================================`,
    `Guest Name: ${guestName || "Guest"}`,
    guestPhone ? `Contact Phone: ${guestPhone}` : null,
    `Preferred Date: ${preferredDate}`,
    `Preferred Time Slot: ${preferredTimeSlot}`,
    `Number of Guests: ${guestCount} Person${guestCount > 1 ? "s" : ""}`,
    `----------------------------------------`,
    `Selected Therapies:`,
    treatmentSummary,
    `----------------------------------------`,
    `Estimated Total Duration: ${totalDurationMinutes} Minutes`,
    `Subtotal: ₹${subtotal.toLocaleString("en-IN")} (+ applicable taxes)`,
    specialNote ? `Special Request / Focus: ${specialNote}` : null,
    `----------------------------------------`,
    `*Note:* This is a direct booking enquiry. Confirmation & personalized herbal preparation are finalized at the spa front desk.`,
  ]
    .filter(Boolean)
    .join("\n");

  // WhatsApp concierge links for both numbers from the PDF
  const whatsappUrlPrimary = `https://wa.me/91${
    SPA_CONTACT_INFO.phonePrimary
  }?text=${encodeURIComponent(enquiryMessage)}`;

  const whatsappUrlSecondary = `https://wa.me/91${
    SPA_CONTACT_INFO.phoneSecondary
  }?text=${encodeURIComponent(enquiryMessage)}`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(enquiryMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // fallback
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-brand-canvas rounded-3xl shadow-2xl overflow-hidden z-10 border border-brand-gold/40 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-brand-navy text-white flex items-center justify-between shrink-0">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs text-brand-gold-light font-sans font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Orchha Resort Spa Concierge</span>
            </div>
            <h2
              id="enquiry-modal-title"
              className="font-serif font-bold text-xl sm:text-2xl"
            >
              Spa Treatment Enquiry
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            aria-label="Close enquiry modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Transparency Disclaimer Banner */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-brand-beige border border-brand-gold/30 text-xs text-brand-charcoal/80 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-brand-gold-dark shrink-0 mt-0.5" />
            <p>
              <strong className="font-semibold text-brand-navy">
                Consultative Booking Enquiry:
              </strong>{" "}
              This submits a direct enquiry to our spa reception desk. To maintain the highest quality of Ayurvedic care, appointments and customized herbal preparations are confirmed in person with our practitioners.
            </p>
          </div>

          {/* Selected Itinerary Summary */}
          <div className="p-4 rounded-2xl bg-white border border-brand-charcoal/10 shadow-subtle space-y-3">
            <div className="flex items-center justify-between border-b border-brand-charcoal/10 pb-2">
              <p className="text-xs font-sans font-bold uppercase tracking-wider text-brand-navy">
                Selected Itinerary ({selectedTreatments.length}{" "}
                {selectedTreatments.length === 1 ? "Therapy" : "Therapies"})
              </p>
              <span className="text-xs text-brand-gold-dark font-semibold">
                Total ~{totalDurationMinutes} mins
              </span>
            </div>

            {selectedTreatments.length > 0 ? (
              <div className="space-y-2 text-xs">
                {selectedTreatments.map((t) => (
                  <div key={t.id} className="flex justify-between items-center">
                    <span className="font-medium text-brand-charcoal">
                      {t.name}{" "}
                      <span className="text-brand-charcoal/50">
                        ({t.duration})
                      </span>
                    </span>
                    <span className="font-serif font-bold text-brand-navy">
                      {t.priceFormatted}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-brand-charcoal/10 flex justify-between items-center text-sm font-serif font-bold text-brand-navy">
                  <span>Subtotal</span>
                  <span className="text-brand-gold-dark text-base">
                    ₹{subtotal.toLocaleString("en-IN")}{" "}
                    <span className="text-[11px] font-sans font-normal text-brand-charcoal/60">
                      + taxes
                    </span>
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-brand-charcoal/60 italic">
                No specific treatment selected. You may request a general Ayurvedic doctor consultation.
              </p>
            )}
          </div>

          {/* Guest Contact Details */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-lg text-brand-navy">
              Guest Preferences
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Guest Name */}
              <div>
                <label className="block text-xs font-sans font-semibold text-brand-charcoal/80 mb-1">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Anand Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-charcoal/20 bg-brand-beige/20 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
                />
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-sans font-semibold text-brand-charcoal/80 mb-1">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-charcoal/20 bg-brand-beige/20 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Preferred Date */}
              <div>
                <label className="block text-xs font-sans font-semibold text-brand-charcoal/80 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-brand-charcoal/20 bg-brand-beige/20 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
                />
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-xs font-sans font-semibold text-brand-charcoal/80 mb-1">
                  Preferred Time
                </label>
                <select
                  value={preferredTimeSlot}
                  onChange={(e) => setPreferredTimeSlot(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-brand-charcoal/20 bg-brand-beige/20 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
                >
                  <option value="Morning (8:00 AM – 12:00 PM)">
                    Morning (8 AM – 12 PM)
                  </option>
                  <option value="Afternoon (12:00 PM – 4:00 PM)">
                    Afternoon (12 PM – 4 PM)
                  </option>
                  <option value="Evening (4:00 PM – 7:00 PM)">
                    Evening (4 PM – 7 PM)
                  </option>
                </select>
              </div>

              {/* Guest Count */}
              <div>
                <label className="block text-xs font-sans font-semibold text-brand-charcoal/80 mb-1">
                  Number of Guests
                </label>
                <div className="flex items-center rounded-xl border border-brand-charcoal/20 bg-brand-beige/20 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="px-3 py-2 text-brand-charcoal hover:bg-brand-charcoal/10 font-bold"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-xs font-bold font-sans">
                    {guestCount} {guestCount === 1 ? "Guest" : "Guests"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuestCount(guestCount + 1)}
                    className="px-3 py-2 text-brand-charcoal hover:bg-brand-charcoal/10 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label className="block text-xs font-sans font-semibold text-brand-charcoal/80 mb-1">
                Wellness Focus or Health Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                placeholder="e.g. Focus on neck and lower back stiffness, gentle pressure preferred..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-charcoal/20 bg-brand-beige/20 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
              />
            </div>
          </div>
        </div>

        {/* Footer Contact Actions */}
        <div className="p-5 sm:p-6 bg-brand-beige/60 border-t border-brand-charcoal/10 space-y-3 shrink-0">
          <p className="text-xs font-sans font-semibold uppercase tracking-wider text-brand-charcoal/70">
            Submit Enquiry via Official Spa Desk
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Primary Action: WhatsApp Concierge (Primary Number 9516006201) */}
            <a
              href={whatsappUrlPrimary}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <button
                type="button"
                className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-sans text-xs sm:text-sm font-bold transition-all shadow-elevated flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send via WhatsApp (Primary)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </button>
            </a>

            {/* Secondary Action: Call Spa Reception Desk */}
            <a
              href={`tel:+91${SPA_CONTACT_INFO.phonePrimary}`}
              className="w-full"
            >
              <button
                type="button"
                className="w-full py-3 px-4 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-sans text-xs sm:text-sm font-bold transition-all shadow-elevated flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-gold-light" />
                <span>Call {SPA_CONTACT_INFO.phonePrimaryFormatted}</span>
              </button>
            </a>
          </div>

          {/* Secondary Number & Copy Details Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 text-xs text-brand-charcoal/70 font-sans">
            <div className="flex items-center gap-2">
              <span>Secondary Desk:</span>
              <a
                href={`tel:+91${SPA_CONTACT_INFO.phoneSecondary}`}
                className="font-medium text-brand-navy hover:underline"
              >
                {SPA_CONTACT_INFO.phoneSecondaryFormatted}
              </a>
              <span>•</span>
              <a
                href={whatsappUrlSecondary}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline inline-flex items-center gap-1 font-medium"
              >
                <span>WhatsApp Desk 2</span>
              </a>
            </div>

            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 text-xs text-brand-gold-dark hover:text-brand-navy font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">
                    Enquiry Copied!
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Formatted Enquiry</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
