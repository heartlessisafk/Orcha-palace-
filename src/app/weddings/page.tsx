"use client";

import React from "react";
import { NavbarPrimitive } from "@/components/layout/NavbarPrimitive";
import { FooterPrimitive } from "@/components/layout/FooterPrimitive";
import { WeddingHero } from "@/components/weddings/WeddingHero";
import { WeddingStory } from "@/components/weddings/WeddingStory";
import { WeddingVenues } from "@/components/weddings/WeddingVenues";
import { WeddingExperiences } from "@/components/weddings/WeddingExperiences";
import { WeddingEnquiryForm } from "@/components/weddings/WeddingEnquiryForm";
import { WeddingRomanticCta } from "@/components/weddings/WeddingRomanticCta";

export default function WeddingsPage() {
  return (
    <div className="min-h-screen bg-brand-canvas text-brand-charcoal flex flex-col selection:bg-brand-gold/20 selection:text-brand-navy">
      {/* Navigation Bar */}
      <NavbarPrimitive transparentAtTop />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section A: Cinematic Wedding Hero */}
        <WeddingHero />

        {/* Section B: The Wedding Story (Why Orchha?) */}
        <WeddingStory />

        {/* Section C: Wedding Venues & Spaces (Lawns, Stage, Mandap, Ballroom, Pool) */}
        <WeddingVenues />

        {/* Section D: Wedding Experiences & Rituals (Haldi, Sangeet, Pheras, Feasting) */}
        <WeddingExperiences />

        {/* Section E: Wedding Enquiry Experience (Interactive Form & Honest Handoff) */}
        <WeddingEnquiryForm />

        {/* Section F: Final Romantic Call to Action */}
        <WeddingRomanticCta />
      </main>

      {/* Global Footer */}
      <FooterPrimitive />
    </div>
  );
}
