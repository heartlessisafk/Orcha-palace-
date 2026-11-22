"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ORCHHA_HERITAGE_LOCATIONS,
  ORCHHA_MAP_CENTER,
  ORCHHA_MAP_DEFAULT_ZOOM,
  MAP_CATEGORIES,
  HeritageLocationMarker,
} from "@/data/orchha-map";
import {
  Navigation,
  Compass,
  Clock,
  Sparkles,
  MapPin,
  ChevronRight,
  RotateCcw,
  Plus,
  Minus,
  Building2,
  Landmark,
  Waves,
  ExternalLink,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import "leaflet/dist/leaflet.css";

// Dynamic type for Leaflet map instance
type LeafletMap = any;

// Reliable OpenStreetMap tile server
const OSM_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

// Intelligent Label Offsets to guarantee ZERO overlapping between adjacent landmarks
// Note: Ram Raja Temple and Chaturbhuj Temple are ~75m apart north-south;
// Ram Raja label is anchored ABOVE, Chaturbhuj label is anchored BELOW.
const MARKER_LABEL_POSITIONS: Record<
  string,
  { labelClass: string; zOffset: number }
> = {
  "orchha-resort": {
    labelClass: "bottom-11 left-1/2 -translate-x-1/2",
    zOffset: 600,
  },
  "royal-chhatris": {
    labelClass: "top-1/2 right-9 -translate-y-1/2 text-right",
    zOffset: 300,
  },
  "orchha-fort": {
    labelClass: "top-1/2 left-9 -translate-y-1/2 text-left",
    zOffset: 300,
  },
  "ram-raja-temple": {
    labelClass: "bottom-9 left-1/2 -translate-x-1/2",
    zOffset: 450,
  },
  "chaturbhuj-temple": {
    labelClass: "top-9 left-1/2 -translate-x-1/2",
    zOffset: 400,
  },
  "laxmi-narayan-temple": {
    labelClass: "bottom-9 left-1/2 -translate-x-1/2",
    zOffset: 300,
  },
  "betwa-sanctuary": {
    labelClass: "top-9 left-1/2 -translate-x-1/2",
    zOffset: 300,
  },
};

export interface RealOrchhaMapProps {
  className?: string;
  onSelectLandmark?: (landmark: HeritageLocationMarker) => void;
  selectedLandmarkId?: string;
}

export function RealOrchhaMap({
  className,
  onSelectLandmark,
  selectedLandmarkId,
}: RealOrchhaMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const listContainerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const programmaticScrollTimer = useRef<NodeJS.Timeout | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string>(
    selectedLandmarkId || "orchha-resort"
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isPopupDismissed, setIsPopupDismissed] = useState(false);

  // Sync external selectedLandmarkId if provided
  useEffect(() => {
    if (selectedLandmarkId && selectedLandmarkId !== selectedId) {
      setSelectedId(selectedLandmarkId);
    }
  }, [selectedLandmarkId, selectedId]);

  const selectedLocation =
    ORCHHA_HERITAGE_LOCATIONS.find((loc) => loc.id === selectedId) ||
    ORCHHA_HERITAGE_LOCATIONS[0];

  // Filtered locations
  const filteredLocations =
    activeCategory === "all"
      ? ORCHHA_HERITAGE_LOCATIONS
      : ORCHHA_HERITAGE_LOCATIONS.filter(
          (loc) => loc.category === activeCategory
        );

  // ─────────────────────────────────────────────────────────────────────────
  // CENTRALIZED SELECT LANDMARK HANDLER
  // ─────────────────────────────────────────────────────────────────────────
  const handleSelectLandmark = useCallback(
    (
      landmark: HeritageLocationMarker,
      shouldPan = true,
      source: "click" | "scroll" = "click"
    ) => {
      setSelectedId(landmark.id);
      setIsPopupDismissed(false);
      if (onSelectLandmark) {
        onSelectLandmark(landmark);
      }

      // If triggered by click, scroll the corresponding card into view in the left list
      if (source === "click") {
        isProgrammaticScroll.current = true;
        if (programmaticScrollTimer.current) {
          clearTimeout(programmaticScrollTimer.current);
        }
        const cardEl = cardRefs.current[landmark.id];
        if (cardEl && listContainerRef.current) {
          cardEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        programmaticScrollTimer.current = setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 700);
      }

      // Pan or fly map to landmark without resetting user zoom
      if (shouldPan && mapInstanceRef.current) {
        const map = mapInstanceRef.current;
        const currentZoom = map.getZoom();
        const targetZoom = Math.max(currentZoom, 15);

        if (source === "scroll") {
          // Gentle smooth pan during scroll to avoid jumpiness
          map.panTo([landmark.lat, landmark.lng], {
            animate: true,
            duration: 0.6,
          });
        } else {
          // Smooth fly transition during explicit click
          map.flyTo([landmark.lat, landmark.lng], targetZoom, {
            duration: 1.0,
            easeLinearity: 0.25,
          });
        }
      }
    },
    [onSelectLandmark]
  );

  // ─────────────────────────────────────────────────────────────────────────
  // 1. LEAFLET MAP INITIALIZATION & TILE RENDERING (PHASE 1)
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      // Clean up previous instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const map = L.map(mapContainerRef.current, {
        center: [ORCHHA_MAP_CENTER.lat, ORCHHA_MAP_CENTER.lng],
        zoom: ORCHHA_MAP_DEFAULT_ZOOM,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: true,
        touchZoom: true,
        dragging: true,
      });

      mapInstanceRef.current = map;

      // Add High-Reliability OpenStreetMap Tile Layer
      const tileLayer = L.tileLayer(OSM_TILE_URL, {
        subdomains: "abc",
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
        className: "custom-osm-atlas-tiles",
      }).addTo(map);

      tileLayer.on("tileload", (e: any) => {
        if (e.tile) {
          e.tile.alt = "";
          e.tile.setAttribute("role", "presentation");
          e.tile.setAttribute("aria-hidden", "true");
        }
      });

      // Add Custom Attribution in Corner
      L.control
        .attribution({
          position: "bottomright",
          prefix:
            '<span class="text-[9px] text-white/50 font-sans tracking-wider">OpenStreetMap · The Orchha Resort Atlas</span>',
        })
        .addTo(map);

      // Create Custom Markers with Intelligent Non-Overlapping Label Positioning
      markersRef.current = {};

      ORCHHA_HERITAGE_LOCATIONS.forEach((location) => {
        const isResort = location.isPrimary;
        const layoutConfig = MARKER_LABEL_POSITIONS[location.id] || {
          labelClass: "top-9 left-1/2 -translate-x-1/2",
          zOffset: 300,
        };

        const iconHtml = isResort
          ? `
            <div class="relative group cursor-pointer -translate-x-1/2 -translate-y-1/2 marker-node marker-node-${location.id}">
              <div class="marker-halo absolute -inset-2.5 rounded-full bg-[#C5A059]/40 animate-ping"></div>
              <div class="relative w-10 h-10 rounded-full bg-[#0E1624] border-2 border-[#C5A059] shadow-[0_0_22px_rgba(197,160,89,0.85)] flex items-center justify-center transition-transform hover:scale-115">
                <svg class="w-5 h-5 text-[#C5A059]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </div>
              <div class="marker-label absolute ${layoutConfig.labelClass} whitespace-nowrap bg-[#0E1624]/95 border border-[#C5A059] px-2.5 py-1 rounded-full text-[10px] font-serif text-[#F4DFC0] shadow-2xl pointer-events-none tracking-wide transition-all z-20">
                ★ ${location.name}
              </div>
            </div>
          `
          : `
            <div class="relative group cursor-pointer -translate-x-1/2 -translate-y-1/2 marker-node marker-node-${location.id}">
              <div class="marker-halo absolute -inset-2 rounded-full bg-[#C5A059]/0 transition-all duration-300"></div>
              <div class="marker-dot relative w-7 h-7 rounded-full bg-[#0B131E] border border-[#C5A059]/90 shadow-lg flex items-center justify-center transition-all duration-300 group-hover:scale-120 group-hover:border-[#F4DFC0] group-hover:shadow-[0_0_16px_rgba(197,160,89,0.6)]">
                <div class="w-2.5 h-2.5 rounded-full bg-[#C5A059]"></div>
              </div>
              <div class="marker-label absolute ${layoutConfig.labelClass} whitespace-nowrap bg-[#080D15]/90 border border-white/15 px-2 py-0.5 rounded-md text-[10px] font-sans text-white/90 shadow-xl pointer-events-none transition-all z-10">
                ${location.name}
              </div>
            </div>
          `;

        const customIcon = L.divIcon({
          className: `custom-landmark-marker marker-id-${location.id}`,
          html: iconHtml,
          iconSize: isResort ? [40, 40] : [28, 28],
          iconAnchor: isResort ? [20, 20] : [14, 14],
        });

        const marker = L.marker([location.lat, location.lng], {
          icon: customIcon,
          zIndexOffset: layoutConfig.zOffset,
        }).addTo(map);

        marker.on("click", () => {
          handleSelectLandmark(location, true, "click");
        });

        markersRef.current[location.id] = marker;
      });

      // Force size invalidation to guarantee full container filling
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 200);

      setIsMapReady(true);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [handleSelectLandmark]);

  // Window resize observer to keep map container perfectly sized
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const observer = new ResizeObserver(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    });
    observer.observe(mapContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // 2. SCROLL-SYNCHRONIZED INTERACTION OBSERVER (PHASE 2)
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const container = listContainerRef.current;
    if (!container) return;

    // Detect active landmark card as user scrolls through the left panel
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) return;

        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length === 0) return;

        // Find the entry closest to the vertical center of the scroll container
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.top + containerRect.height / 2;

        let closestId: string | null = null;
        let minDistance = Infinity;

        visibleEntries.forEach((entry) => {
          const rect = entry.target.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - containerCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestId = entry.target.getAttribute("data-landmark-id");
          }
        });

        if (closestId && closestId !== selectedId) {
          const loc = ORCHHA_HERITAGE_LOCATIONS.find((l) => l.id === closestId);
          if (loc) {
            handleSelectLandmark(loc, true, "scroll");
          }
        }
      },
      {
        root: container,
        rootMargin: "-15% 0px -25% 0px",
        threshold: [0.1, 0.4, 0.7],
      }
    );

    Object.values(cardRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [selectedId, handleSelectLandmark, activeCategory]);

  // ─────────────────────────────────────────────────────────────────────────
  // 3. MAP MARKER DYNAMIC HIGHLIGHTING
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isMapReady) return;

    ORCHHA_HERITAGE_LOCATIONS.forEach((loc) => {
      const el = document.querySelector(`.marker-node-${loc.id}`);
      const marker = markersRef.current[loc.id];
      const config = MARKER_LABEL_POSITIONS[loc.id] || { zOffset: 300 };

      if (el) {
        const halo = el.querySelector(".marker-halo");
        const dot = el.querySelector(".marker-dot");
        const label = el.querySelector(".marker-label");

        if (loc.id === selectedId) {
          el.classList.add("scale-125");
          if (marker) marker.setZIndexOffset(1000);
          if (halo) {
            halo.classList.remove("bg-[#C5A059]/0");
            halo.classList.add("bg-[#C5A059]/50", "animate-pulse");
          }
          if (dot) {
            dot.classList.add("border-[#F4DFC0]", "shadow-[0_0_18px_rgba(197,160,89,0.8)]");
          }
          if (label) {
            label.classList.remove("bg-[#080D15]/90", "border-white/15", "text-white/90");
            label.classList.add(
              "bg-[#0B131E]/98",
              "border-[#C5A059]",
              "text-[#F4DFC0]",
              "font-semibold",
              "shadow-2xl",
              "scale-105"
            );
          }
        } else if (loc.id === hoveredId) {
          el.classList.add("scale-115");
          if (marker) marker.setZIndexOffset(800);
          if (halo) {
            halo.classList.remove("bg-[#C5A059]/0");
            halo.classList.add("bg-[#C5A059]/30");
          }
        } else {
          el.classList.remove("scale-125", "scale-115");
          if (marker) marker.setZIndexOffset(config.zOffset);
          if (halo && !loc.isPrimary) {
            halo.classList.remove("bg-[#C5A059]/50", "bg-[#C5A059]/30", "animate-pulse");
            halo.classList.add("bg-[#C5A059]/0");
          }
          if (dot) {
            dot.classList.remove("border-[#F4DFC0]", "shadow-[0_0_18px_rgba(197,160,89,0.8)]");
          }
          if (label && !loc.isPrimary) {
            label.classList.remove(
              "bg-[#0B131E]/98",
              "border-[#C5A059]",
              "text-[#F4DFC0]",
              "font-semibold",
              "shadow-2xl",
              "scale-105"
            );
            label.classList.add("bg-[#080D15]/90", "border-white/15", "text-white/90");
          }
        }
      }
    });
  }, [selectedId, hoveredId, isMapReady]);

  // Zoom controls
  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  const handleResetView = () => {
    const resort = ORCHHA_HERITAGE_LOCATIONS[0];
    handleSelectLandmark(resort, false, "click");
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(
        [ORCHHA_MAP_CENTER.lat, ORCHHA_MAP_CENTER.lng],
        ORCHHA_MAP_DEFAULT_ZOOM,
        { duration: 1.0 }
      );
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "resort":
        return <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />;
      case "palace":
        return <Landmark className="w-3.5 h-3.5 text-[#C5A059]" />;
      case "temple":
        return <Building2 className="w-3.5 h-3.5 text-[#C5A059]" />;
      case "river":
        return <Waves className="w-3.5 h-3.5 text-[#6BA2CE]" />;
      default:
        return <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />;
    }
  };

  return (
    <div
      className={cn(
        "relative w-full rounded-2xl overflow-hidden border border-brand-gold/25 bg-[#080D15] text-white shadow-2xl flex flex-col",
        className
      )}
    >
      {/* ─────────────────────────────────────────────────────────────────
          MAP TILE FILTER STYLES (GOLD & DARK-NAVY THEME)
          ───────────────────────────────────────────────────────────────── */}
      <style>{`
        .leaflet-container {
          background-color: #080D15 !important;
        }
        .custom-osm-atlas-tiles .leaflet-tile {
          filter: brightness(0.68) invert(1) contrast(2.1) hue-rotate(200deg) saturate(0.35) brightness(0.85);
        }
        .custom-landmark-marker {
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────────────
          HEADER & CATEGORY FILTER BAR
          ───────────────────────────────────────────────────────────────── */}
      <div className="p-3.5 sm:p-5 border-b border-brand-gold/15 bg-[#0B131E]/98 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="hidden sm:flex items-center gap-2 mb-1">
            <Compass className="w-3.5 h-3.5 text-brand-gold animate-spin-slow" />
            <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase">
              Cartographic Sanctuary Atlas · 25.348° N, 78.639° E
            </span>
          </div>
          <h3 className="font-serif text-lg sm:text-2xl text-white font-medium tracking-tight">
            The Heritage Geography of Orchha
          </h3>
          <p className="font-sans text-xs sm:text-sm text-white/70 max-w-xl leading-relaxed">
            Navigate the living geography of the Bundela rulers and the sacred Betwa River.
          </p>
        </div>

        {/* Category Pills (Single horizontally scrollable row on mobile, wrapped on desktop) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scrollbar-none whitespace-nowrap pb-1 pt-0.5 -mx-3.5 px-3.5 sm:mx-0 sm:px-0 lg:flex-wrap lg:overflow-visible">
          {MAP_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all duration-200 border tactile-3d shrink-0 hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                  isActive
                    ? "bg-brand-gold text-brand-charcoal font-semibold border-brand-gold shadow-md hover:shadow-gold-ambient"
                    : "bg-white/5 text-white/75 border-white/10 hover:border-brand-gold/40 hover:text-white shadow-subtle"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          MAIN EXPLORER: SCROLL-SYNCHRONIZED LIST + INTERACTIVE ATLAS
          Mobile-First: Dedicated Map on top (order-1), Compact Cards below (order-2)
          Desktop: Side-by-side synchronized view (lg:flex-row)
          ───────────────────────────────────────────────────────────────── */}
      <div className="relative flex-1 flex flex-col lg:flex-row min-h-[580px] lg:min-h-[640px]">
        {/* Landmark List Panel (Desktop: Left side, Mobile: Positioned below map) */}
        <div className="order-2 lg:order-1 w-full lg:w-[380px] xl:w-[420px] bg-[#0A1018]/95 border-t lg:border-t-0 lg:border-r border-brand-gold/15 flex flex-col justify-between p-3.5 sm:p-5 z-10">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="text-[11px] font-mono text-brand-gold/80 uppercase tracking-wider flex items-center justify-between pb-2">
              <span>Landmarks ({filteredLocations.length})</span>
              <span className="text-[10px] text-white/40">Synchronized Atlas</span>
            </div>

            {/* Scrollable Container with IntersectionObserver */}
            <div
              ref={listContainerRef}
              className="space-y-2 pr-1 overflow-y-auto max-h-[280px] sm:max-h-[340px] lg:max-h-[500px] scroll-smooth overscroll-contain"
            >
              {filteredLocations.map((location) => {
                const isSelected = location.id === selectedId;
                const isResort = location.isPrimary;

                return (
                  <div
                    key={location.id}
                    ref={(el) => {
                      cardRefs.current[location.id] = el;
                    }}
                    data-landmark-id={location.id}
                    onClick={() => handleSelectLandmark(location, true, "click")}
                    onMouseEnter={() => setHoveredId(location.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={cn(
                      "p-2.5 sm:p-3 rounded-xl border cursor-pointer transition-all duration-300 relative group flex items-start justify-between gap-2.5",
                      isSelected
                        ? "bg-brand-gold/15 border-brand-gold shadow-[0_0_18px_rgba(197,160,89,0.3)] translate-x-0.5 sm:translate-x-1"
                        : "bg-white/[0.03] border-white/10 hover:border-brand-gold/40 hover:bg-white/[0.06]"
                    )}
                  >
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {getCategoryIcon(location.category)}
                        <span
                          className={cn(
                            "text-[9px] sm:text-[10px] font-mono uppercase tracking-wider",
                            isResort
                              ? "text-brand-gold font-bold"
                              : "text-white/60"
                          )}
                        >
                          {location.badgeText}
                        </span>
                        {isResort && (
                          <span className="px-1.5 py-0.2 rounded bg-brand-gold/20 text-brand-gold text-[8px] sm:text-[9px] font-sans font-semibold">
                            Primary
                          </span>
                        )}
                      </div>

                      <h4
                        className={cn(
                          "font-serif text-xs sm:text-sm font-semibold transition-colors leading-snug truncate",
                          isSelected
                            ? "text-brand-gold"
                            : "text-white group-hover:text-brand-gold"
                        )}
                      >
                        {location.name}
                      </h4>

                      <p className="font-sans text-[11px] sm:text-xs text-white/65 line-clamp-2 leading-relaxed">
                        {location.description}
                      </p>

                      <div className="pt-0.5 flex items-center gap-2.5 text-[10px] sm:text-[11px] font-sans text-white/50">
                        <span className="flex items-center gap-1">
                          <Navigation className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-gold/80 shrink-0" />
                          {location.distanceFromResort}
                        </span>
                        {location.walkingTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-gold/80 shrink-0" />
                            {location.walkingTime}
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className={cn(
                        "w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all mt-1 flex-shrink-0",
                        isSelected
                          ? "bg-brand-gold text-brand-charcoal font-bold"
                          : "text-white/40 group-hover:text-brand-gold group-hover:translate-x-0.5"
                      )}
                    >
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Reset Button in List Footer */}
          <div className="pt-2.5 mt-2 border-t border-white/10 flex items-center justify-between text-xs">
            <button
              onClick={handleResetView}
              className="flex items-center gap-1.5 text-brand-gold hover:text-white transition-colors text-[11px] sm:text-xs"
            >
              <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Reset Overview</span>
            </button>
            <span className="text-white/40 text-[10px] sm:text-[11px]">
              {selectedLocation.categoryLabel}
            </span>
          </div>
        </div>

        {/* Interactive Leaflet Map Viewport (Desktop: Right side, Mobile: Positioned on top) */}
        <div className="order-1 lg:order-2 relative flex-1 h-[460px] sm:h-[500px] lg:h-auto lg:min-h-full w-full bg-[#080D15]">
          {/* Leaflet Container */}
          <div
            ref={mapContainerRef}
            className="absolute inset-0 w-full h-full z-0"
          />

          {/* Ambient Map Inset Shadow to blend softly with border */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_24px_rgba(8,13,21,0.4)] z-1" />

          {/* Floating Map Controls in Top Right */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex flex-col gap-1.5 sm:gap-2">
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-2 sm:p-2.5 rounded-xl bg-[#0B131E]/90 hover:bg-[#0E1724] border border-white/15 text-white hover:text-brand-gold shadow-xl backdrop-blur-md transition-all tactile-3d hover:-translate-y-0.5 active:scale-95 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-2 sm:p-2.5 rounded-xl bg-[#0B131E]/90 hover:bg-[#0E1724] border border-white/15 text-white hover:text-brand-gold shadow-xl backdrop-blur-md transition-all tactile-3d hover:-translate-y-0.5 active:scale-95 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <button
              onClick={handleResetView}
              title="Reset Overview"
              className="p-2 sm:p-2.5 rounded-xl bg-[#0B131E]/90 hover:bg-[#0E1724] border border-white/15 text-white hover:text-brand-gold shadow-xl backdrop-blur-md transition-all tactile-3d hover:-translate-y-0.5 active:scale-95 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              DESKTOP FLOATING HUD DIALOGUE (hidden on mobile, visible on lg)
              ───────────────────────────────────────────────────────────── */}
          <div className="hidden lg:block absolute top-4 left-4 z-20 w-auto max-w-md max-h-[calc(100%-2rem)] overflow-y-auto pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLocation.id}
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="p-4 rounded-2xl bg-[#0A1018]/95 border border-brand-gold/45 shadow-[0_12px_36px_rgba(0,0,0,0.6)] backdrop-blur-md flex flex-col sm:flex-row gap-3.5 items-start sm:items-center"
              >
                {selectedLocation.imageSrc && (
                  <div className="relative w-full sm:w-28 h-24 rounded-xl overflow-hidden shrink-0 border border-brand-gold/25 bg-black/40">
                    <Image
                      src={selectedLocation.imageSrc}
                      alt={selectedLocation.name}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 space-y-1 w-full min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider font-semibold">
                      {selectedLocation.badgeText} · {selectedLocation.historicalEra}
                    </span>
                    <span className="text-[10px] font-mono text-white/50">
                      {selectedLocation.lat.toFixed(4)}°N, {selectedLocation.lng.toFixed(4)}°E
                    </span>
                  </div>
                  <h4 className="font-serif text-sm sm:text-base font-semibold text-white truncate">
                    {selectedLocation.name}
                  </h4>
                  <p className="font-sans text-xs text-white/75 line-clamp-2 leading-relaxed">
                    {selectedLocation.description}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-xs border-t border-white/10 mt-1">
                    <span className="text-brand-gold font-medium flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-brand-gold" />
                      {selectedLocation.distanceFromResort}
                    </span>
                    {selectedLocation.isPrimary ? (
                      <Link
                        href="#rooms"
                        className="text-[11px] font-sans text-brand-gold hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Reserve Sanctuary</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleSelectLandmark(selectedLocation, true, "click")}
                        className="text-[11px] font-sans text-brand-gold-light hover:underline flex items-center gap-1"
                      >
                        <span>Focus on Map</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              MOBILE COMPACT FLOATING BOTTOM CARD (visible on mobile, hidden on lg)
              Non-intrusive preview occupying < 25% of map height with close button
              ───────────────────────────────────────────────────────────── */}
          <div className="lg:hidden absolute bottom-3 inset-x-3 z-20 max-w-sm sm:max-w-md mx-auto pointer-events-auto">
            <AnimatePresence mode="wait">
              {!isPopupDismissed ? (
                <motion.div
                  key={selectedLocation.id}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.97 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="relative p-2.5 sm:p-3 rounded-2xl bg-[#0A1018]/95 border border-brand-gold/45 shadow-[0_12px_36px_rgba(0,0,0,0.7)] backdrop-blur-xl flex items-center gap-2.5 sm:gap-3 overflow-hidden"
                >
                  {/* Close Button to dismiss popup */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPopupDismissed(true);
                    }}
                    className="absolute top-2 right-2 p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 active:scale-90 transition-all z-10"
                    aria-label="Dismiss landmark preview"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  {/* Compact Thumbnail (hidden on screens < 360px) */}
                  {selectedLocation.imageSrc && (
                    <div className="hidden xs:block relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-brand-gold/25 bg-black/40">
                      <Image
                        src={selectedLocation.imageSrc}
                        alt={selectedLocation.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Landmark Compact Content */}
                  <div className="flex-1 min-w-0 pr-5 space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono text-brand-gold uppercase tracking-wider font-semibold">
                        {selectedLocation.badgeText}
                      </span>
                      <span className="text-white/40 text-[9px]">·</span>
                      <span className="text-brand-gold/90 font-mono text-[9px] flex items-center gap-0.5">
                        <Navigation className="w-2.5 h-2.5" />
                        {selectedLocation.distanceFromResort}
                      </span>
                    </div>

                    <h4 className="font-serif text-sm font-semibold text-white truncate leading-tight">
                      {selectedLocation.name}
                    </h4>

                    <p className="font-sans text-[11px] text-white/75 line-clamp-2 leading-snug">
                      {selectedLocation.description}
                    </p>

                    <div className="pt-0.5 flex items-center gap-3 text-[10px]">
                      {selectedLocation.isPrimary ? (
                        <Link
                          href="#rooms"
                          className="font-sans text-brand-gold hover:underline flex items-center gap-0.5 font-semibold"
                        >
                          <span>Reserve Sanctuary</span>
                          <ChevronRight className="w-2.5 h-2.5" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSelectLandmark(selectedLocation, true, "click")}
                          className="font-sans text-brand-gold hover:text-brand-gold-light hover:underline flex items-center gap-0.5 font-medium"
                        >
                          <span>Focus on Map</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Minimal Re-open Floating Pill when user explicitly dismissed preview */
                <motion.button
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  type="button"
                  onClick={() => setIsPopupDismissed(false)}
                  className="mx-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A1018]/95 border border-brand-gold/35 shadow-lg text-[10px] font-sans text-brand-gold hover:text-white backdrop-blur-md active:scale-95 transition-all"
                >
                  <Compass className="w-3 h-3 text-brand-gold" />
                  <span className="truncate max-w-[170px]">{selectedLocation.name}</span>
                  <span className="text-white/50">· Show Info</span>
                  <ChevronRight className="w-3 h-3" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
