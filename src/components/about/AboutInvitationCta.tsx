"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading, Text, SubtitleTag } from "@/components/ui/Typography";
import { RoomSearchWidgetPrimitive } from "@/components/booking/RoomSearchWidgetPrimitive";
import { SITE_CONFIG } from "@/lib/site-config";
import { Phone, MessageCircle, Mail, MapPin, ShieldCheck, Clock, Sparkles } from "lucide-react";

export function AboutInvitationCta() {
  const whatsappUrl = `https://wa.me/919926219900?text=${encodeURIComponent(
    "Hello Orchha Resort, I would like to inquire about booking a stay at your riverfront sanctuary."
  )}`;

  return (
    <section id="reserve" className="py-20 sm:py-28 bg-brand-navy text-white relative overflow-hidden">
      {/* Subtle luxury glow backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-gold/10 blur-[120px] pointer-events-none" />

      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-sans font-medium uppercase tracking-widest border border-brand-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Begin Your Journey</span>
          </div>

          <Heading as="h2" size="hero" inverted className="text-white">
            Reserve Your Sanctuary on the River Betwa
          </Heading>

          <p className="font-serif italic text-xl sm:text-2xl text-brand-gold">
            Step away from the rush of the world into quiet Bundelkhand luxury
          </p>

          <p className="font-sans text-brand-beige/85 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Choose your dates below to check availability for our 32 rooms and luxury Swiss tents, or connect directly with our reservation team.
          </p>
        </div>

        {/* Embedded Booking Widget */}
        <div className="max-w-4xl mx-auto mb-14">
          <RoomSearchWidgetPrimitive className="bg-brand-canvas text-brand-charcoal border-2 border-brand-gold/40 shadow-floating" />
        </div>

        {/* Direct Concierge Contact Matrix */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center sm:text-left">
          {/* WhatsApp Concierge */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-gold/50 hover:bg-white/10 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-sans font-bold uppercase tracking-wider text-brand-gold">
                WhatsApp Concierge
              </span>
              <span className="block font-sans text-sm font-semibold text-white group-hover:text-brand-gold transition-colors">
                +91 99262 19900
              </span>
              <span className="block text-[11px] text-white/60">
                Instant quotes &amp; assistance
              </span>
            </div>
          </a>

          {/* Front Desk Telephone */}
          <a
            href={`tel:${SITE_CONFIG.contact.phoneDesk.replace(/\s+/g, "")}`}
            className="flex items-center gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-gold/50 hover:bg-white/10 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/30 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-sans font-bold uppercase tracking-wider text-brand-gold">
                Reception Desk
              </span>
              <span className="block font-sans text-sm font-semibold text-white group-hover:text-brand-gold transition-colors">
                +91 562 2225712
              </span>
              <span className="block text-[11px] text-white/60">
                24 Hours / 365 Days
              </span>
            </div>
          </a>

          {/* Official Email */}
          <a
            href={`mailto:${SITE_CONFIG.contact.email}`}
            className="flex items-center gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-gold/50 hover:bg-white/10 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[11px] font-sans font-bold uppercase tracking-wider text-brand-gold">
                Official Email
              </span>
              <span className="block font-sans text-sm font-semibold text-white group-hover:text-brand-gold transition-colors truncate">
                orchha@orchharesort.com
              </span>
              <span className="block text-[11px] text-white/60">
                Direct booking support
              </span>
            </div>
          </a>
        </div>

        {/* Property Address & Verified Guarantee */}
        <div className="max-w-4xl mx-auto pt-8 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 font-sans">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
            <span>Kanchanghat, By the River Betwa, Orchha, Distt. Niwari, MP 472246</span>
          </div>

          <div className="flex items-center gap-2 text-brand-gold/90 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Genuine Direct Resort Reservations</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
