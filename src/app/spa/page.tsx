"use client";

import React, { useState } from "react";
import { NavbarPrimitive } from "@/components/layout/NavbarPrimitive";
import { FooterPrimitive } from "@/components/layout/FooterPrimitive";
import { SpaHero } from "@/components/spa/SpaHero";
import { SpaEditorial } from "@/components/spa/SpaEditorial";
import { SpaFacilities } from "@/components/spa/SpaFacilities";
import { SpaTreatments } from "@/components/spa/SpaTreatments";
import { SpaConversionCta } from "@/components/spa/SpaConversionCta";
import { SpaEnquiryModal } from "@/components/spa/SpaEnquiryModal";

export default function SpaPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTreatmentName, setSelectedTreatmentName] = useState<string>("");

  const handleOpenEnquiry = (treatmentName?: string) => {
    setSelectedTreatmentName(treatmentName || "");
    setIsModalOpen(true);
  };

  const handleSelectTreatment = (treatmentName: string) => {
    setSelectedTreatmentName(treatmentName);
    setIsModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-brand-canvas text-brand-charcoal flex flex-col selection:bg-brand-gold/20 selection:text-brand-navy">
      {/* Primary Global Navigation */}
      <NavbarPrimitive transparentAtTop />

      {/* 1. Serene Cinematic Spa Hero */}
      <SpaHero onOpenEnquiry={handleOpenEnquiry} />

      {/* 2. Editorial Philosophy & Dosha Balance */}
      <SpaEditorial />

      {/* 3. Verified Property Spa Facilities */}
      <SpaFacilities />

      {/* 4. Authentic Ayurvedic Treatment Menu */}
      <SpaTreatments onSelectTreatment={handleSelectTreatment} />

      {/* 5. Spa Conversion Banner & Concierge Gateway */}
      <SpaConversionCta onOpenEnquiry={handleOpenEnquiry} />

      {/* 6. Footer Navigation & Resort Information */}
      <FooterPrimitive />

      {/* Modal: Interactive Treatment & Concierge Enquiry */}
      <SpaEnquiryModal
        isOpen={isModalOpen}
        onClose={handleCloseEnquiry}
        defaultTreatmentName={selectedTreatmentName}
      />
    </div>
  );
}
