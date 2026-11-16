"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { SPA_DECORATIVE_ASSETS } from "@/lib/spa-assets";
import { SPA_CONTACT_INFO } from "@/data/spa-catalog";
import {
  Sparkles,
  Phone,
  MessageCircle,
  Calendar,
  Bed,
  ArrowUpRight,
  Clock,
  MapPin,
} from "lucide-react";

export interface SpaConversionRoyalProps {
  onOpenEnquiry: () => void;
  selectedCount: number;
}

export function SpaConversionRoyal({
  onOpenEnquiry,
  selectedCount,
}: SpaConversionRoyalProps) {
  const whatsappUrl = `https://wa.me/91${
    SPA_CONTACT_INFO.phonePrimary
  }?text=${encodeURIComponent(
    "Hello The Orchha Resort Spa, I would like to enquire about Ayurvedic wellness therapies and appointments during my stay."
  )}`;

  return (
    <section className="relative py-20 md:py-28 bg-brand-navy text-white overflow-hidden border-t border-brand-gold/30">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-navy-light/40 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <FadeIn>
            {/* Royal Crest Emblem */}
            <div className="relative w-14 h-14 mx-auto mb-2 opacity-90">
              <Image
                src={SPA_DECORATIVE_ASSETS.royalCrest.src}
                alt=""
                fill
                sizes="56px"
                className="object-contain"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold-light text-xs font-sans mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold-light" />
              <span className="font-semibold tracking-wider uppercase text-[11px]">
                {SPA_CONTACT_INFO.brandName}
              </span>
            </div>

            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight">
              Begin Your Restoration on the Riverbanks of Orchha
            </h2>

            <p className="text-brand-beige/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans font-light">
              Whether you desire four-hand Synchronized Abhyangam, restorative Shirodhara, or a detoxifying Ayur Herbal Wrap, our dedicated therapists invite you to experience timeless Indian wellness.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={onOpenEnquiry}
                className="w-full sm:w-auto shadow-elevated"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {selectedCount > 0
                  ? `Enquire for ${selectedCount} Selected Therapies`
                  : "Plan Your Spa Itinerary"}
              </Button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
                >
                  <MessageCircle className="w-4 h-4 mr-2 text-emerald-400" />
                  WhatsApp Concierge
                </Button>
              </a>

              <Link href="/#rooms" className="w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto text-brand-gold-light hover:text-white hover:bg-white/5"
                >
                  <Bed className="w-4 h-4 mr-2" />
                  Explore Resort Stays
                  <ArrowUpRight className="w-4 h-4 ml-1 opacity-70" />
                </Button>
              </Link>
            </div>
          </FadeIn>

          {/* Contact Numbers verbatim from PDF */}
          <FadeIn delay={0.3}>
            <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 text-left">
              <div>
                <p className="text-xs uppercase tracking-wider text-brand-gold-light font-medium">
                  Official Spa Desk Contacts
                </p>
                <div className="mt-1 space-y-1">
                  <a
                    href={`tel:+91${SPA_CONTACT_INFO.phonePrimary}`}
                    className="flex items-center gap-1.5 text-sm text-brand-beige hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-gold-light" />
                    <span>{SPA_CONTACT_INFO.phonePrimaryFormatted}</span>
                  </a>
                  <a
                    href={`tel:+91${SPA_CONTACT_INFO.phoneSecondary}`}
                    className="flex items-center gap-1.5 text-sm text-brand-beige hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-gold-light" />
                    <span>{SPA_CONTACT_INFO.phoneSecondaryFormatted}</span>
                  </a>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-brand-gold-light font-medium">
                  Location &amp; Setting
                </p>
                <div className="mt-1 flex items-start gap-1.5 text-sm text-brand-beige/90">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold-light shrink-0 mt-0.5" />
                  <span>Kanchanghat, Orchha, Madhya Pradesh 472246</span>
                </div>
                <p className="text-xs text-white/50 mt-1">
                  River Betwa Heritage Sanctuary
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-brand-gold-light font-medium">
                  Operational Hours
                </p>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-brand-beige/90">
                  <Clock className="w-3.5 h-3.5 text-brand-gold-light" />
                  <span>Open Daily: 8:00 AM – 7:00 PM</span>
                </div>
                <p className="text-xs text-white/50 mt-1">
                  Resident &amp; non-resident appointments welcome
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
