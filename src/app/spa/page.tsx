"use client";

import React, { useState, useMemo } from "react";
import {
  SPA_CATALOGUE,
  SpaTreatmentItem,
  SPA_CONTACT_INFO,
} from "@/data/spa-catalog";
import { SpaNavbar } from "@/components/spa/SpaNavbar";
import { SpaHeroRoyal } from "@/components/spa/SpaHeroRoyal";
import { SpaEditorialRoyal } from "@/components/spa/SpaEditorialRoyal";
import { SpaCatalogueBrowser } from "@/components/spa/SpaCatalogueBrowser";
import { SpaConversionRoyal } from "@/components/spa/SpaConversionRoyal";
import { SpaSelectionTray } from "@/components/spa/SpaSelectionTray";
import { SpaDetailModal } from "@/components/spa/SpaDetailModal";
import { SpaEnquiryModalRoyal } from "@/components/spa/SpaEnquiryModalRoyal";
import { FooterPrimitive } from "@/components/layout/FooterPrimitive";

export default function SpaPage() {
  // Quick-Commerce Selection State (Set of Treatment IDs)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modal / Drawer States
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailTreatment, setDetailTreatment] = useState<SpaTreatmentItem | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Derived selected treatments array
  const selectedTreatments = useMemo(() => {
    return SPA_CATALOGUE.filter((item) => selectedIds.has(item.id));
  }, [selectedIds]);

  // Derived subtotal in INR
  const subtotal = useMemo(() => {
    return selectedTreatments.reduce((acc, curr) => acc + curr.price, 0);
  }, [selectedTreatments]);

  // Derived total duration in minutes
  const totalDurationMinutes = useMemo(() => {
    return selectedTreatments.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  }, [selectedTreatments]);

  // Toggle selection for a treatment
  const handleToggleSelect = (treatment: SpaTreatmentItem) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(treatment.id)) {
        next.delete(treatment.id);
      } else {
        next.add(treatment.id);
      }
      return next;
    });
  };

  // Remove single item from selection tray
  const handleRemoveItem = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  // Clear all items from tray
  const handleClearAll = () => {
    setSelectedIds(new Set());
  };

  // Open detail view for a treatment
  const handleOpenDetail = (treatment: SpaTreatmentItem) => {
    setDetailTreatment(treatment);
    setIsDetailOpen(true);
  };

  // Close detail view
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setDetailTreatment(null);
  };

  // Handle direct enquiry from detail modal
  const handleEnquireForTreatment = (treatment: SpaTreatmentItem) => {
    // Ensure item is selected
    if (!selectedIds.has(treatment.id)) {
      setSelectedIds((prev) => new Set(prev).add(treatment.id));
    }
    setIsDetailOpen(false);
    setIsEnquiryOpen(true);
  };

  // Proceed from selection tray to enquiry modal
  const handleProceedToEnquiry = () => {
    setIsTrayOpen(false);
    setIsEnquiryOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-canvas text-brand-charcoal flex flex-col selection:bg-brand-gold/20 selection:text-brand-navy">
      {/* 1. Sticky Spa Navigation with Quick Selection Tray */}
      <SpaNavbar
        selectedCount={selectedTreatments.length}
        subtotal={subtotal}
        onOpenTray={() => setIsTrayOpen(true)}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
      />

      <main id="main-content" className="flex-1">
        {/* 2. Royal Cinematic Opening Hero */}
        <SpaHeroRoyal
          selectedCount={selectedTreatments.length}
          subtotal={subtotal}
          onOpenTray={() => setIsTrayOpen(true)}
          onOpenEnquiry={() => setIsEnquiryOpen(true)}
        />

        {/* 3. Royal Indian Wellness Editorial & Dosha Philosophy */}
        <SpaEditorialRoyal />

        {/* 4. Quick-Commerce Catalogue Browser (Search, Filter, 11 Treatment Cards) */}
        <SpaCatalogueBrowser
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onOpenDetail={handleOpenDetail}
        />

        {/* 5. Royal Conversion Banner with Direct Contacts */}
        <SpaConversionRoyal
          onOpenEnquiry={() => setIsEnquiryOpen(true)}
          selectedCount={selectedTreatments.length}
        />
      </main>

      {/* 6. Footer Navigation & Resort Information */}
      <FooterPrimitive />

      {/* Interactive Selection Tray (Quick-Commerce Cart/Drawer) */}
      <SpaSelectionTray
        selectedTreatments={selectedTreatments}
        subtotal={subtotal}
        totalDurationMinutes={totalDurationMinutes}
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
        onOpen={() => setIsTrayOpen(true)}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAll}
        onProceedToEnquiry={handleProceedToEnquiry}
      />

      {/* Treatment Detail Modal (Full Image & Verbatim PDF Description) */}
      <SpaDetailModal
        treatment={detailTreatment}
        isOpen={isDetailOpen}
        isSelected={detailTreatment ? selectedIds.has(detailTreatment.id) : false}
        onClose={handleCloseDetail}
        onToggleSelect={handleToggleSelect}
        onEnquireForTreatment={handleEnquireForTreatment}
      />

      {/* Royal Spa Enquiry Modal (Pre-populated Itinerary, WhatsApp, Call & Copy Actions) */}
      <SpaEnquiryModalRoyal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        selectedTreatments={selectedTreatments}
        subtotal={subtotal}
        totalDurationMinutes={totalDurationMinutes}
      />
    </div>
  );
}
