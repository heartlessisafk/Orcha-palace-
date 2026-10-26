"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Heading, Text, SubtitleTag } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { WEDDING_ASSETS } from "@/lib/wedding-assets";
import { Heart, MessageCircle, Phone, Sparkles, MapPin, ShieldCheck, ArrowUp } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export function WeddingRomanticCta() {
  const scrollToEnquiry = () => {
    const el = document.getElementById("wedding-enquiry");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const whatsappUrl = `https://wa.me/919926219900?text=${encodeURIComponent(
    "Hello Orchha Resort, I would like to speak with your wedding coordinator about hosting a celebration at the property."
  )}`;

  return (
    <section className="relative py-24 sm:py-32 bg-brand-navy text-white overflow-hidden">
      {/* Background Atmosphere Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={WEDDING_ASSETS.grandReceptionStage.src}
          alt={WEDDING_ASSETS.grandReceptionStage.alt}
          fill
          sizes="(max-width: 768px) 100vw, 828px"
          className="object-cover object-center scale-105"
        />
        {/* Layered dark scrim for high contrast and romantic mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/80 to-brand-navy/60" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-brand-gold/40 text-brand-gold text-xs font-sans font-medium uppercase tracking-widest shadow-subtle">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/40" />
            <span>Begin Your Forever</span>
          </div>

          <Heading as="h2" size="hero" inverted className="text-white">
            Celebrate Love Where Eternity Resides
          </Heading>

          <p className="font-serif italic text-xl sm:text-2xl text-brand-gold">
            A riverside haven where every vow is honored with royal grace
          </p>

          <p className="font-sans text-brand-beige/85 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Allow us to welcome your family and loved ones to Orchha. Contact our wedding concierge today to check seasonal auspicious dates and explore tailored celebration packages.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToEnquiry}
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-gold text-brand-navy hover:bg-brand-gold-light font-medium shadow-floating"
            >
              Fill Wedding Enquiry Form
              <ArrowUp className="w-4 h-4 ml-2" />
            </Button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-luxury border border-emerald-400/50 bg-emerald-700/80 hover:bg-emerald-600 text-white font-sans text-sm font-medium transition-all shadow-subtle"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Wedding Desk</span>
            </a>
          </div>

          {/* Contact Details Ribbon */}
          <div className="pt-10 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70 font-sans">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Kanchanghat, By the River Betwa, Orchha, Distt. Niwari, MP</span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={`tel:${SITE_CONFIG.contact.phoneDesk.replace(/\s+/g, "")}`}
                className="hover:text-brand-gold transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-brand-gold" />
                <span>Front Desk: {SITE_CONFIG.contact.phoneDesk}</span>
              </a>

              <span className="hidden sm:inline-block text-white/30">|</span>

              <div className="flex items-center gap-1.5 text-brand-gold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Property Venue</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
