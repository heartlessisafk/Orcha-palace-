import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/site-config";
import { Phone, Mail, MapPin, Clock, Train, Plane, ExternalLink } from "lucide-react";

export function FooterPrimitive() {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-wide mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Column 1: Property Identity & Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-brand-gold/40 flex items-center justify-center p-1 bg-white shrink-0">
                <Image
                  src="/images/brand/orchha-emblem.svg"
                  alt="Orchha Resort Emblem"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="font-serif text-xl font-semibold text-white">The Orchha Resort</h4>
                <p className="font-sans text-[10px] tracking-widest uppercase text-brand-gold-light">
                  Riverside Heritage
                </p>
              </div>
            </div>

            <p className="font-sans text-xs text-brand-beige-sand/80 leading-relaxed">
              50 luxury rooms & suites nestled on the serene banks of the river Betwa, opposite
              the 14 Royal Cenotaphs in zero-pollution natural surroundings.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-brand-beige-sand/90 font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>
                  {SITE_CONFIG.contact.address.line1}, {SITE_CONFIG.contact.address.city} –{" "}
                  {SITE_CONFIG.contact.address.pinCode}, {SITE_CONFIG.contact.address.state}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a href={`tel:${SITE_CONFIG.contact.phonePrimary}`} className="hover:text-brand-gold-light transition-colors">
                  {SITE_CONFIG.contact.phonePrimary}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-brand-gold-light transition-colors">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Check-in: 2:00 PM · Check-out: 11:00 AM</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation & Experiences */}
          <div className="space-y-4">
            <h5 className="font-serif text-lg font-semibold text-white tracking-tight">
              Explore Property
            </h5>
            <ul className="space-y-2.5 text-xs text-brand-beige-sand/80 font-sans">
              {SITE_CONFIG.navigation.footer.explore.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-brand-gold-light transition-colors block py-0.5">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Transit & Location */}
          <div className="space-y-4">
            <h5 className="font-serif text-lg font-semibold text-white tracking-tight">
              How To Reach
            </h5>
            <div className="space-y-3 text-xs text-brand-beige-sand/80 font-sans">
              <div className="flex items-start gap-2.5">
                <Train className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-white block">By Railway</span>
                  <span>{SITE_CONFIG.transit.nearestRail}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Plane className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-white block">By Air</span>
                  <span>{SITE_CONFIG.transit.nearestAirport}</span>
                </div>
              </div>
              <p className="text-[11px] text-brand-beige-sand/60 pt-1">
                Direct highway road connections from Agra (230 km), Delhi (440 km), and Khajuraho (170 km).
              </p>
            </div>
          </div>

          {/* Column 4: Verified Channels */}
          <div className="space-y-4">
            <h5 className="font-serif text-lg font-semibold text-white tracking-tight">
              Instant Reservations
            </h5>
            <p className="font-sans text-xs text-brand-beige-sand/80 leading-relaxed">
              Book directly with our 24/7 on-property team for tailored group tariffs and destination weddings.
            </p>
            <div className="space-y-2.5 pt-1">
              <a
                href={SITE_CONFIG.otaLinks.makeMyTrip}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs text-white transition-all tactile-3d hover:-translate-y-0.5 active:scale-95 hover:shadow-subtle hover:border-brand-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                <span>MakeMyTrip Verified Listing</span>
                <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
              </a>
              <a
                href={SITE_CONFIG.otaLinks.agoda}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs text-white transition-all tactile-3d hover:-translate-y-0.5 active:scale-95 hover:shadow-subtle hover:border-brand-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                <span>Agoda International Listing</span>
                <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-beige-sand/60 font-sans">
          <p>© {new Date().getFullYear()} The Orchha Resort. All rights reserved.</p>
          <div className="flex flex-col sm:items-end text-center sm:text-right gap-0.5">
            <p className="text-brand-beige-sand/70">
              Designed &amp; Developed by{" "}
              <span className="font-medium text-brand-beige-sand/95 hover:text-brand-gold transition-colors duration-300 cursor-default">
                Samarth Shukla
              </span>
            </p>
            <p className="text-[11px] text-brand-beige-sand/50 tracking-wider">
              Web Developer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
