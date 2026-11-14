"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Heading, Text, SubtitleTag } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  Calendar,
  Users,
  MessageCircle,
  Mail,
  Phone,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WeddingFormData {
  fullName: string;
  phone: string;
  email: string;
  targetDate: string;
  guestCount: string;
  durationDays: string;
  spacesInterested: string[];
  notes: string;
}

export function WeddingEnquiryForm() {
  const [formData, setFormData] = useState<WeddingFormData>({
    fullName: "",
    phone: "",
    email: "",
    targetDate: "",
    guestCount: "100–250 Guests",
    durationDays: "2 Days (Standard Wedding)",
    spacesInterested: ["The Grand Riverfront Banquet Lawns", "Lotus Poolside Terrace"],
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isHandoffOpen, setIsHandoffOpen] = useState(false);

  const availableSpaces = [
    "The Grand Riverfront Banquet Lawns",
    "The Royal Reception Stage",
    "Canopied Mandap Pavilion",
    "The Royal Ballroom (1,500 sq ft)",
    "Lotus Poolside Terrace",
    "Complete Resort Buyout (All 32 Keys)",
  ];

  const handleToggleSpace = (space: string) => {
    setFormData((prev) => {
      const exists = prev.spacesInterested.includes(space);
      return {
        ...prev,
        spacesInterested: exists
          ? prev.spacesInterested.filter((s) => s !== space)
          : [...prev.spacesInterested, space],
      };
    });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    }
    if (!formData.phone.trim() && !formData.email.trim()) {
      errs.contact = "Please provide at least a phone number or email for wedding coordination.";
    }
    if (formData.phone.trim() && formData.phone.trim().length < 8) {
      errs.phone = "Please enter a valid phone number.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsHandoffOpen(true);
    }
  };

  // Generate pre-filled WhatsApp message
  const generateWhatsAppUrl = () => {
    const text = `*New Royal Wedding Inquiry — The Orchha Resort*
----------------------------------------
*Name:* ${formData.fullName}
*Phone:* ${formData.phone || "Not specified"}
*Email:* ${formData.email || "Not specified"}
*Preferred Date / Period:* ${formData.targetDate || "Flexible"}
*Estimated Guests:* ${formData.guestCount}
*Celebration Duration:* ${formData.durationDays}
*Spaces of Interest:* ${formData.spacesInterested.join(", ") || "General Inquiry"}
${formData.notes ? `*Special Notes:* ${formData.notes}` : ""}
----------------------------------------
_Inquiry sent from Orchha Resort Weddings Portal_`;

    return `https://wa.me/919926219900?text=${encodeURIComponent(text)}`;
  };

  // Generate mailto link
  const generateMailtoUrl = () => {
    const subject = `Wedding Enquiry: ${formData.fullName} — The Orchha Resort`;
    const body = `Dear Orchha Resort Wedding Team,

I would like to inquire about hosting a wedding celebration at The Orchha Resort.

Enquiry Details:
----------------------------------------
Full Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email}
Target Date / Month: ${formData.targetDate || "To be discussed"}
Estimated Guest Count: ${formData.guestCount}
Celebration Duration: ${formData.durationDays}
Spaces of Interest: ${formData.spacesInterested.join(", ")}

Additional Notes & Vision:
${formData.notes || "None"}

Please connect with us regarding availability, venue packages, and banquet options.

Warm regards,
${formData.fullName}`;

    return `mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="wedding-enquiry" className="py-20 sm:py-28 bg-brand-white text-brand-charcoal overflow-hidden border-b border-brand-charcoal/8">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-3 mb-12 sm:mb-16">
            <SubtitleTag>Direct Wedding Desk</SubtitleTag>
            <Heading as="h2" size="hero" className="text-brand-navy">
              Plan Your Royal Celebration
            </Heading>
            <p className="font-serif italic text-xl sm:text-2xl text-brand-gold-dark">
              Every love story is unique; let us tailor your wedding by the Betwa
            </p>
            <Text variant="lead" className="mt-3 text-brand-charcoal/80 max-w-2xl mx-auto">
              Share your celebration vision below. Our dedicated wedding team will prepare tailored venue options, culinary proposals, and accommodation plans.
            </Text>
          </div>

          {/* Form Card */}
          <div className="bg-brand-canvas rounded-3xl p-6 sm:p-10 border border-brand-charcoal/10 shadow-floating">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="wedding-fullname" className="block text-xs font-sans font-semibold uppercase tracking-wider text-brand-navy cursor-pointer">
                    Your Name / Couple&apos;s Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="wedding-fullname"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Radhika Sharma &amp; Aryan Mehta"
                    className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/15 bg-white text-brand-charcoal font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="wedding-phone" className="block text-xs font-sans font-semibold uppercase tracking-wider text-brand-navy cursor-pointer">
                    WhatsApp / Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="wedding-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/15 bg-white text-brand-charcoal font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all"
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Email & Target Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="wedding-email" className="block text-xs font-sans font-semibold uppercase tracking-wider text-brand-navy cursor-pointer">
                    Email Address
                  </label>
                  <input
                    id="wedding-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/15 bg-white text-brand-charcoal font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="wedding-date" className="block text-xs font-sans font-semibold uppercase tracking-wider text-brand-navy flex items-center gap-1.5 cursor-pointer">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold-dark" />
                    Preferred Date / Month
                  </label>
                  <input
                    id="wedding-date"
                    type="text"
                    value={formData.targetDate}
                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                    placeholder="e.g. November 2026 or Spring 2027"
                    className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/15 bg-white text-brand-charcoal font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Guest Count & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="wedding-guests" className="block text-xs font-sans font-semibold uppercase tracking-wider text-brand-navy flex items-center gap-1.5 cursor-pointer">
                    <Users className="w-3.5 h-3.5 text-brand-gold-dark" />
                    Estimated Guest Count
                  </label>
                  <select
                    id="wedding-guests"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/15 bg-white text-brand-charcoal font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all"
                  >
                    <option value="Under 100 Guests (Intimate Gathering)">Under 100 Guests (Intimate Gathering)</option>
                    <option value="100–250 Guests">100–250 Guests</option>
                    <option value="250–500 Guests">250–500 Guests</option>
                    <option value="500+ Guests (Grand Reception)">500+ Guests (Grand Reception)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="wedding-duration" className="block text-xs font-sans font-semibold uppercase tracking-wider text-brand-navy flex items-center gap-1.5 cursor-pointer">
                    <Clock className="w-3.5 h-3.5 text-brand-gold-dark" />
                    Duration of Celebration
                  </label>
                  <select
                    id="wedding-duration"
                    value={formData.durationDays}
                    onChange={(e) => setFormData({ ...formData, durationDays: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/15 bg-white text-brand-charcoal font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all"
                  >
                    <option value="1 Day (Ceremony &amp; Reception)">1 Day (Ceremony &amp; Reception)</option>
                    <option value="2 Days (Standard Wedding)">2 Days (Standard Wedding)</option>
                    <option value="3+ Days (Full Destination Experience)">3+ Days (Full Destination Experience)</option>
                  </select>
                </div>
              </div>

              {/* Spaces of Interest Multi-Select */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-brand-navy">
                  Spaces &amp; Venues of Interest (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {availableSpaces.map((space) => {
                    const isChecked = formData.spacesInterested.includes(space);
                    return (
                      <button
                        key={space}
                        type="button"
                        onClick={() => handleToggleSpace(space)}
                        className={cn(
                          "flex items-center gap-2.5 p-3 rounded-xl text-left border text-xs sm:text-sm font-sans transition-all",
                          isChecked
                            ? "bg-brand-navy text-white border-brand-navy shadow-subtle"
                            : "bg-white text-brand-charcoal/80 border-brand-charcoal/15 hover:border-brand-gold/40"
                        )}
                      >
                        <div
                          className={cn(
                            "w-4 h-4 rounded border flex items-center justify-center shrink-0",
                            isChecked
                              ? "bg-brand-gold border-brand-gold text-brand-navy"
                              : "border-brand-charcoal/30 bg-transparent"
                          )}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <span className="truncate">{space}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Notes / Message */}
              <div className="space-y-1.5 pt-2">
                <label htmlFor="wedding-notes" className="block text-xs font-sans font-semibold uppercase tracking-wider text-brand-navy cursor-pointer">
                  Celebration Vision or Special Requests
                </label>
                <textarea
                  id="wedding-notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share any special preferences (e.g., pure vegetarian catering, specific dates, accommodation requirements for up to 32 rooms and tents)..."
                  className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/15 bg-white text-brand-charcoal font-sans text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Contact error fallback */}
              {errors.contact && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{errors.contact}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-brand-charcoal/8">
                <div className="flex items-center gap-2 text-xs text-brand-charcoal/60">
                  <ShieldCheck className="w-4 h-4 text-brand-gold-dark shrink-0" />
                  <span>Transparent Handoff · Direct to General Manager &amp; Reservations</span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto px-8 py-3.5 bg-brand-gold text-brand-navy hover:bg-brand-gold-light font-medium shadow-subtle"
                >
                  Proceed With Wedding Enquiry
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>

      {/* Honest Enquiry Handoff Modal */}
      {isHandoffOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/80 backdrop-blur-md animate-fade-in">
          <div className="bg-brand-canvas rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-brand-gold/40 shadow-floating space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-brand-charcoal/10">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold uppercase tracking-wider bg-brand-gold/20 text-brand-gold-dark mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Enquiry Prepared
                </span>
                <h3 className="font-serif text-2xl font-semibold text-brand-navy">
                  Connect with Our Wedding Concierge
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsHandoffOpen(false)}
                className="p-2 rounded-full hover:bg-brand-charcoal/5 text-brand-charcoal transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Summary Box */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-charcoal/10 text-xs sm:text-sm space-y-2 text-brand-charcoal/85">
              <div className="flex justify-between py-1 border-b border-brand-charcoal/5">
                <span className="font-semibold text-brand-navy">Name:</span>
                <span>{formData.fullName}</span>
              </div>
              {formData.phone && (
                <div className="flex justify-between py-1 border-b border-brand-charcoal/5">
                  <span className="font-semibold text-brand-navy">Contact:</span>
                  <span>{formData.phone}</span>
                </div>
              )}
              {formData.targetDate && (
                <div className="flex justify-between py-1 border-b border-brand-charcoal/5">
                  <span className="font-semibold text-brand-navy">Date / Period:</span>
                  <span>{formData.targetDate}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-brand-charcoal/5">
                <span className="font-semibold text-brand-navy">Estimated Guests:</span>
                <span>{formData.guestCount}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-brand-charcoal/5">
                <span className="font-semibold text-brand-navy">Celebration Duration:</span>
                <span>{formData.durationDays}</span>
              </div>
              <div className="pt-1">
                <span className="font-semibold text-brand-navy block mb-1">Spaces of Interest:</span>
                <span className="text-xs text-brand-charcoal/70">
                  {formData.spacesInterested.join(", ") || "General Inquiry"}
                </span>
              </div>
            </div>

            {/* Honest Dispatch Channels */}
            <div className="space-y-3">
              <p className="text-xs text-brand-charcoal/70 leading-relaxed text-center">
                To guarantee immediate personal attention, please dispatch your structured enquiry directly to our team via your preferred channel:
              </p>

              {/* 1. Primary: WhatsApp Wedding Desk */}
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all font-medium text-sm group shadow-subtle"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-100" />
                  <div className="text-left">
                    <span className="block font-sans font-semibold">Send via WhatsApp Wedding Desk</span>
                    <span className="block text-[11px] text-emerald-100">
                      Pre-formatted message directly to +91 99262 19900
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-emerald-100" />
              </a>

              {/* 2. Secondary: Email Concierge */}
              <a
                href={generateMailtoUrl()}
                className="flex items-center justify-between p-4 rounded-xl bg-brand-navy text-white hover:bg-brand-navy-light transition-all font-medium text-sm group shadow-subtle"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand-gold" />
                  <div className="text-left">
                    <span className="block font-sans font-semibold">Send via Official Email</span>
                    <span className="block text-[11px] text-brand-beige/70">
                      Delivered to orchha@orchharesort.com
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-gold" />
              </a>

              {/* 3. Call Wedding Desk */}
              <a
                href={`tel:${SITE_CONFIG.contact.phoneDesk.replace(/\s+/g, "")}`}
                className="flex items-center justify-between p-3.5 rounded-xl border border-brand-charcoal/20 text-brand-charcoal hover:bg-white transition-all text-xs font-sans font-medium"
              >
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand-gold-dark" />
                  <span>Call Front Desk Directly: {SITE_CONFIG.contact.phoneDesk}</span>
                </div>
                <span className="text-[11px] text-brand-charcoal/60">24/7 Assistance</span>
              </a>
            </div>

            {/* Honest Handoff Guarantee */}
            <div className="p-3 bg-brand-beige/60 rounded-xl text-[11px] text-brand-charcoal/70 leading-relaxed flex items-start gap-2 border border-brand-charcoal/10">
              <ShieldCheck className="w-4 h-4 text-brand-gold-dark shrink-0 mt-0.5" />
              <span>
                <strong>Direct Resort Communication:</strong> No third-party agency marks or automated bots. Your inquiry connects you directly with Orchha Resort management.
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
