"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { Heading, SubtitleTag, Text } from "@/components/ui/Typography";
import {
  SpaTreatmentItem,
  SpaCategory,
  SPA_CATEGORIES,
  SPA_CATALOGUE,
} from "@/data/spa-catalog";
import { SpaTreatmentCard } from "@/components/spa/SpaTreatmentCard";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  Search,
  X,
  SlidersHorizontal,
  Sparkles,
  RotateCcw,
  Clock,
  Filter,
} from "lucide-react";

export interface SpaCatalogueBrowserProps {
  selectedIds: Set<string>;
  onToggleSelect: (treatment: SpaTreatmentItem) => void;
  onOpenDetail: (treatment: SpaTreatmentItem) => void;
}

export function SpaCatalogueBrowser({
  selectedIds,
  onToggleSelect,
  onOpenDetail,
}: SpaCatalogueBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<SpaCategory>("all");
  const [sortBy, setSortBy] = useState<
    "pdf" | "price-asc" | "price-desc" | "duration-asc"
  >("pdf");

  // Filter and sort treatments
  const filteredTreatments = useMemo(() => {
    let list = [...SPA_CATALOGUE];

    // Category filter
    if (activeCategory !== "all") {
      list = list.filter((t) => t.category === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.sanskritName.toLowerCase().includes(q) ||
          t.subtitle.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.categoryLabel.toLowerCase().includes(q) ||
          t.duration.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "duration-asc") {
      list.sort((a, b) => a.durationMinutes - b.durationMinutes);
    } else {
      // Default: PDF Brochure order (page 1 to 11)
      list.sort((a, b) => a.pdfPage - b.pdfPage);
    }

    return list;
  }, [searchQuery, activeCategory, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setSortBy("pdf");
  };

  return (
    <section id="catalogue" className="py-20 md:py-28 bg-brand-canvas scroll-mt-20">
      <Container>
        {/* Header & Quick-Commerce Discovery Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
          <div className="max-w-2xl space-y-2">
            <SubtitleTag>Official Treatment Catalogue</SubtitleTag>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy leading-tight">
              Browse All 11 Ayurvedic Therapies
            </h2>
            <Text className="text-brand-charcoal/75 text-sm sm:text-base">
              Explore authentic therapies transcribed directly from the Orchha Palace Hotel Spa brochure. Filter by category, duration, or search specific wellness goals.
            </Text>
          </div>

          {/* Brochure Transparency Note */}
          <div className="rounded-xl bg-brand-beige/80 border border-brand-gold/30 p-3.5 max-w-sm text-xs text-brand-charcoal/80 flex items-start gap-2.5 shrink-0 shadow-subtle">
            <Sparkles className="w-4 h-4 text-brand-gold-dark shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-brand-navy">Verified Brochure Tariffs</p>
              <p className="text-[11px] text-brand-charcoal/70 mt-0.5">
                All prices are in Indian Rupees (₹). Applicable taxes are charged separately at the spa desk.
              </p>
            </div>
          </div>
        </div>

        {/* Quick-Commerce Search Bar & Controls */}
        <div className="bg-brand-canvas p-4 sm:p-5 rounded-2xl border border-brand-charcoal/10 shadow-subtle mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3.5">
            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search therapies by name, benefit (circulation, stress, sinus, fatigue), or duration..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-brand-beige/40 border border-brand-charcoal/15 text-sm font-sans text-brand-charcoal placeholder:text-brand-charcoal/40 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-charcoal/40 hover:text-brand-charcoal p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-brand-gold-dark hidden sm:block" />
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as "pdf" | "price-asc" | "price-desc" | "duration-asc"
                  )
                }
                aria-label="Sort therapies"
                className="px-3 py-2.5 rounded-xl bg-brand-beige/40 border border-brand-charcoal/15 text-xs sm:text-sm font-sans text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
              >
                <option value="pdf">Sort: Brochure Order (P. 1–11)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration-asc">Duration: Shortest First</option>
              </select>
            </div>
          </div>

          {/* Category Navigation (Horizontal scroll on mobile, wrap on desktop) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
            <span className="text-xs font-sans font-semibold text-brand-charcoal/60 uppercase tracking-wider hidden sm:inline-block mr-1">
              Categories:
            </span>
            {SPA_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all shrink-0 whitespace-nowrap tactile-3d hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold ${
                    isActive
                      ? "bg-brand-navy text-white shadow-subtle hover:shadow-hover"
                      : "bg-brand-beige/60 text-brand-charcoal/80 hover:bg-brand-beige hover:text-brand-navy border border-brand-charcoal/10 shadow-subtle hover:shadow-card"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? "bg-brand-gold text-brand-navy"
                        : "bg-brand-charcoal/10 text-brand-charcoal/60"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter & Active Filter Pills */}
        <div className="flex items-center justify-between text-xs text-brand-charcoal/70 mb-6">
          <p>
            Showing{" "}
            <span className="font-semibold text-brand-navy">
              {filteredTreatments.length}
            </span>{" "}
            of 11 traditional therapies
            {searchQuery && (
              <span>
                {" "}
                matching &ldquo;<span className="italic">{searchQuery}</span>&rdquo;
              </span>
            )}
          </p>

          {(searchQuery || activeCategory !== "all" || sortBy !== "pdf") && (
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1 text-xs text-brand-gold-dark hover:underline font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Treatment Cards Grid */}
        {filteredTreatments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTreatments.map((treatment) => (
              <SpaTreatmentCard
                key={treatment.id}
                treatment={treatment}
                isSelected={selectedIds.has(treatment.id)}
                onToggleSelect={onToggleSelect}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 bg-brand-beige/30 rounded-2xl border border-brand-gold/20 max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold-dark flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-navy">
              No therapies match your search
            </h3>
            <p className="text-xs sm:text-sm text-brand-charcoal/70">
              We couldn&apos;t find any treatment matching &ldquo;{searchQuery}&rdquo;. Try another term like &ldquo;massage&rdquo;, &ldquo;steam&rdquo;, or &ldquo;head&rdquo;.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 rounded-xl bg-brand-navy text-white text-xs font-sans font-medium hover:bg-brand-navy-light transition-colors"
            >
              Reset Search &amp; Show All 11 Treatments
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
