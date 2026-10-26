"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SubtitleTag, Heading, Text } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { SITE_CONFIG } from "@/lib/site-config";
import { Sparkles, Calendar, MessageCircle, Phone, ArrowUpRight, Bed } from "lucide-react";

export interface SpaConversionCtaProps {
  onOpenEnquiry: (treatmentName?: string) => void;
}

export function SpaConversionCta({ onOpenEnquiry }: SpaConversionCtaProps) {
  const phone = SITE_CONFIG.contact.phonePrimary.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    "Hello Orchha Resort, I would like to enquire about Ayurvedic spa treatments and wellness packages during my visit."
  )}`;

  return (
    <section className="relative py-24 md:py-32 bg-brand-navy text-white overflow-hidden">
      {/* Decorative background subtle glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-navy-light/40 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold-light text-xs font-sans mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold-light" />
              <span className="font-semibold tracking-wider uppercase text-[11px]">
                Your Wellness Journey Awaits
              </span>
            </div>

            <Heading as="h2" size="h2" className="text-white text-3xl md:text-5xl font-serif">
              Begin Your Restoration on the Banks of the Betwa
            </Heading>

            <Text className="text-brand-beige/80 text-base md:text-lg max-w-2xl mx-auto mt-4 leading-relaxed font-sans font-light">
              Whether you seek deep stress relief, traditional Shirodhara, or a detoxifying herbal steam bath, our Ayurvedic practitioners will personalize your experience to your natural constitution.
            </Text>
          </FadeIn>

          <FadeIn delay={0.2}>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onOpenEnquiry()}
                className="w-full sm:w-auto shadow-elevated"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Enquire About a Treatment
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
                  Chat with Concierge
                </Button>
              </a>

              <Link href="/#rooms" className="w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto text-brand-gold-light hover:text-white hover:bg-white/5"
                >
                  <Bed className="w-4 h-4 mr-2" />
                  Explore Room Stays
                  <ArrowUpRight className="w-4 h-4 ml-1 opacity-70" />
                </Button>
              </Link>
            </div>
          </FadeIn>

          {/* Practical Visit Notes & Verification */}
          <FadeIn delay={0.3}>
            <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 text-left">
              <div>
                <p className="text-xs uppercase tracking-wider text-brand-gold-light/90 font-medium">
                  Operating Hours
                </p>
                <p className="text-sm text-brand-beige/90 mt-1 font-sans">
                  Open Daily: 8:00 AM – 7:00 PM
                </p>
                <p className="text-xs text-white/50 mt-0.5">
                  Advance appointment advised
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-brand-gold-light/90 font-medium">
                  Physician Consultation
                </p>
                <p className="text-sm text-brand-beige/90 mt-1 font-sans">
                  Dosha Assessment
                </p>
                <p className="text-xs text-white/50 mt-0.5">
                  Personalized herb selection on-site
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-brand-gold-light/90 font-medium">
                  Direct Spa Desk
                </p>
                <a
                  href={`tel:${SITE_CONFIG.contact.phonePrimary}`}
                  className="inline-flex items-center gap-1.5 text-sm text-brand-beige/90 hover:text-brand-gold-light mt-1 font-sans transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-gold-light" />
                  <span>{SITE_CONFIG.contact.phonePrimary}</span>
                </a>
                <p className="text-xs text-white/50 mt-0.5">
                  Available for non-resident guests
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
