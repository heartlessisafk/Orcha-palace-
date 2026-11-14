"use client";

import React from "react";
import { NavbarPrimitive } from "@/components/layout/NavbarPrimitive";
import { FooterPrimitive } from "@/components/layout/FooterPrimitive";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutBetwaSetting } from "@/components/about/AboutBetwaSetting";
import { AboutOrchhaSpirit } from "@/components/about/AboutOrchhaSpirit";
import { AboutArchitectureSpaces } from "@/components/about/AboutArchitectureSpaces";
import { AboutHospitality } from "@/components/about/AboutHospitality";
import { AboutDiscoveringOrchha } from "@/components/about/AboutDiscoveringOrchha";
import { AboutInvitationCta } from "@/components/about/AboutInvitationCta";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-canvas text-brand-charcoal flex flex-col selection:bg-brand-gold/20 selection:text-brand-navy">
      {/* Navigation Bar */}
      <NavbarPrimitive transparentAtTop />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
        {/* Section A: Cinematic Opening & Heritage Identity */}
        <AboutHero />

        {/* Section B: The Place Beside the Betwa (Kanchanghat & Sanctuary) */}
        <AboutBetwaSetting />

        {/* Section C: The Spirit of Orchha & 14 Royal Cenotaphs (Monuments & Dynasty) */}
        <AboutOrchhaSpirit />

        {/* Section D: Architecture & Spaces (Yogesh Chandra, Lotus Pool, Tents) */}
        <AboutArchitectureSpaces />

        {/* Section E: Hospitality, Dining & Cultural Rejuvenation (Kaleva, Spa, Tennis) */}
        <AboutHospitality />

        {/* Section F: Discovering Orchha (Palaces, Temples, River Rafting, Transit) */}
        <AboutDiscoveringOrchha />

        {/* Section G: Final Invitation & Stay Concierge (Booking & WhatsApp) */}
        <AboutInvitationCta />
      </main>

      {/* Global Footer */}
      <FooterPrimitive />
    </div>
  );
}
