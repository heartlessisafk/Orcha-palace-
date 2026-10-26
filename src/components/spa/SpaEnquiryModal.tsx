"use client";

import React, { useState } from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { X, MessageCircle, Mail, Sparkles, Clock, AlertCircle } from "lucide-react";

export interface SpaEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTreatmentName?: string;
}

export function SpaEnquiryModal({
  isOpen,
  onClose,
  defaultTreatmentName = "",
}: SpaEnquiryModalProps) {
  const today = new Date().toISOString().split("T")[0];

  const [treatment, setTreatment] = useState(defaultTreatmentName);
  const [preferredDate, setPreferredDate] = useState(today);
  const [timeSlot, setTimeSlot] = useState("Morning (8:00 AM – 12:00 PM)");
  const [guestCount, setGuestCount] = useState(1);
  const [guestName, setGuestName] = useState("");
  const [wellnessGoal, setWellnessGoal] = useState("");

  if (!isOpen) return null;

  // Build formatted WhatsApp Concierge URL
  const buildWhatsAppUrl = () => {
    const lines = [
      `*Ayurveda Spa Enquiry — The Orchha Resort*`,
      `----------------------------------------`,
      treatment ? `Treatment: ${treatment}` : `Treatment: General Consultation`,
      `Preferred Date: ${preferredDate}`,
      `Time Slot: ${timeSlot}`,
      `Guests: ${guestCount} Person${guestCount > 1 ? "s" : ""}`,
      guestName ? `Guest Name: ${guestName}` : null,
      wellnessGoal ? `Wellness Focus: ${wellnessGoal}` : null,
      `----------------------------------------`,
      `Sent via Orchha Resort Wellness Concierge`,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    const phone = SITE_CONFIG.contact.phonePrimary.replace(/[^0-9]/g, "");
    return `https://wa.me/${phone}?text=${text}`;
  };

  // Build formatted mailto URL
  const buildEmailUrl = () => {
    const subject = encodeURIComponent(
      `Ayurveda Spa Enquiry: ${treatment || "General Consultation"} on ${preferredDate}`
    );
    const body = encodeURIComponent(
      `Dear Wellness Team,\n\nI would like to enquire about Ayurvedic spa therapy at The Orchha Resort with the following details:\n\n` +
        `- Treatment / Focus: ${treatment || "General Ayurvedic Consultation"}\n` +
        `- Preferred Date: ${preferredDate}\n` +
        `- Preferred Time: ${timeSlot}\n` +
        `- Number of Guests: ${guestCount}\n` +
        (guestName ? `- Guest Name: ${guestName}\n` : "") +
        (wellnessGoal ? `- Health Focus / Goals: ${wellnessGoal}\n` : "") +
        `\nPlease advise on physician consultation slots and customized preparation.\n\nThank you.`
    );
    return `mailto:${SITE_CONFIG.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-luxury bg-white border border-brand-charcoal/10 shadow-floating p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-brand-charcoal/8 pb-4">
          <div>
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-brand-gold">
              Ayurvedic Wellness Desk
            </span>
            <h3 className="font-serif text-2xl font-semibold text-brand-navy mt-1">
              Enquire About Spa Therapies
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-brand-charcoal/15 flex items-center justify-center text-brand-muted hover:text-brand-charcoal hover:border-brand-charcoal transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Therapy Alert */}
        {treatment && (
          <div className="p-3.5 rounded-lg bg-brand-beige border border-brand-gold/30 text-xs text-brand-charcoal flex items-center justify-between">
            <div>
              <span className="text-brand-muted block text-[11px] uppercase tracking-wider">
                Selected Therapy:
              </span>
              <span className="font-semibold text-brand-navy text-sm">{treatment}</span>
            </div>
            <button
              type="button"
              onClick={() => setTreatment("")}
              className="text-xs text-brand-gold-dark hover:underline font-medium"
            >
              Change
            </button>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          {/* 1. Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block font-sans text-xs font-semibold tracking-wider uppercase text-brand-olive">
                Preferred Date
              </label>
              <input
                type="date"
                min={today}
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full rounded-lg bg-brand-canvas border border-brand-charcoal/15 px-3 py-2 font-sans text-xs text-brand-charcoal focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-sans text-xs font-semibold tracking-wider uppercase text-brand-olive">
                Preferred Time Slot
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full rounded-lg bg-brand-canvas border border-brand-charcoal/15 px-3 py-2 font-sans text-xs text-brand-charcoal focus:outline-none focus:border-brand-gold"
              >
                <option value="Morning (8:00 AM – 12:00 PM)">Morning (8:00 AM – 12:00 PM)</option>
                <option value="Afternoon (12:00 PM – 4:00 PM)">Afternoon (12:00 PM – 4:00 PM)</option>
                <option value="Evening (4:00 PM – 7:00 PM)">Evening (4:00 PM – 7:00 PM)</option>
              </select>
            </div>
          </div>

          {/* 2. Number of Guests */}
          <div className="space-y-1.5">
            <label className="block font-sans text-xs font-semibold tracking-wider uppercase text-brand-olive">
              Number of Guests
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setGuestCount(num)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    guestCount === num
                      ? "bg-brand-navy text-white border-brand-navy"
                      : "bg-white text-brand-charcoal border-brand-charcoal/20 hover:border-brand-gold"
                  }`}
                >
                  {num} {num === 1 ? "Guest" : "Guests"}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Name & Wellness Focus */}
          <div className="space-y-1.5">
            <label className="block font-sans text-xs font-semibold tracking-wider uppercase text-brand-olive">
              Your Name (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Eleanor Vance"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full rounded-lg bg-brand-canvas border border-brand-charcoal/15 px-3 py-2 font-sans text-xs text-brand-charcoal focus:outline-none focus:border-brand-gold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-sans text-xs font-semibold tracking-wider uppercase text-brand-olive">
              Wellness Focus or Special Health Notes
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Stress relief, travel fatigue, back stiffness, first time experiencing Ayurveda..."
              value={wellnessGoal}
              onChange={(e) => setWellnessGoal(e.target.value)}
              className="w-full rounded-lg bg-brand-canvas border border-brand-charcoal/15 p-3 font-sans text-xs text-brand-charcoal focus:outline-none focus:border-brand-gold"
            />
          </div>
        </div>

        {/* Enquiry Actions */}
        <div className="space-y-3 pt-2">
          <p className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-muted">
            Choose Enquiry Channel
          </p>

          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-3.5 rounded-xl border border-emerald-600/30 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-600 transition-all duration-200"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <span className="font-sans text-sm font-semibold text-emerald-950">
                  Instant WhatsApp Wellness Desk
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                  Recommended
                </span>
              </div>
              <p className="font-sans text-xs text-emerald-800/80 mt-0.5">
                Send directly to our front desk concierge at +91 99262 19900
              </p>
            </div>
          </a>

          <a
            href={buildEmailUrl()}
            className="flex items-center gap-3.5 p-3.5 rounded-xl border border-brand-charcoal/15 bg-white hover:bg-brand-beige/40 hover:border-brand-gold transition-all duration-200"
          >
            <div className="w-9 h-9 rounded-full bg-brand-navy text-white flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <span className="font-sans text-sm font-semibold text-brand-navy block">
                Direct Email Enquiry
              </span>
              <p className="font-sans text-xs text-brand-muted mt-0.5">
                Send formal message to orchha@orchharesort.com
              </p>
            </div>
          </a>
        </div>

        {/* Important Transparency Notice */}
        <div className="rounded-lg bg-brand-beige/50 border border-brand-charcoal/8 p-3 text-[11px] text-brand-olive leading-normal flex items-start gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
          <span>
            <strong>Enquiry Disclaimer:</strong> Submitting this form sends an enquiry to our wellness desk. It does not constitute a confirmed booking. Our on-site Ayurvedic team will confirm therapist availability and personalized oil preparation.
          </span>
        </div>
      </div>
    </div>
  );
}
