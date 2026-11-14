"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Maximize2,
  RotateCcw,
  Plus,
  Minus,
  Check,
  Building2,
  Landmark,
  Waves,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import "leaflet/dist/leaflet.css";

// Dynamic type for Leaflet map instance
type LeafletMap = any;

const CARTO_API_KEY =
  process.env.NEXT_PUBLIC_CARTO_API_KEY ||
  process.env.VITE_CARTO_API_KEY ||
  "";

function getCartoTileUrl() {
  const keyParam = CARTO_API_KEY ? `?key=${encodeURIComponent(CARTO_API_KEY)}` : "";
  return `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png${keyParam}`;
}

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
  const tileLayerRef = useRef<any>(null);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string>(
    selectedLandmarkId || "orchha-resort"
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Sync external selectedLandmarkId if provided
  useEffect(() => {
    if (selectedLandmarkId && selectedLandmarkId !== selectedId) {
      setSelectedId(selectedLandmarkId);
    }
  }, [selectedLandmarkId]);

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
  // LEAFLET MAP INITIALIZATION
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    // Dynamically load Leaflet to ensure window availability
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
        scrollWheelZoom: false, // Prevent scroll trapping on page scroll
        doubleClickZoom: true,
        touchZoom: true,
        dragging: true,
      });

      mapInstanceRef.current = map;

      // Add Tile Layer
      const tileUrl = getCartoTileUrl();

      const tileLayer = L.tileLayer(tileUrl, {
        subdomains: "abcd",
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> &copy; <a href="https://carto.com/" target="_blank" rel="noopener noreferrer">CARTO</a>',
      }).addTo(map);

      tileLayerRef.current = tileLayer;

      // Add Custom Attribution in corner
      L.control
        .attribution({
          position: "bottomright",
          prefix:
            '<span class="text-[9px] text-gray-700 font-sans tracking-wider">CARTO · OpenStreetMap</span>',
        })
        .addTo(map);

      // Create Custom Markers for all locations
      markersRef.current = {};

      ORCHHA_HERITAGE_LOCATIONS.forEach((location) => {
        const isResort = location.isPrimary;

        // Custom HTML Marker Icon
        const iconHtml = isResort
          ? `
            <div class="relative group cursor-pointer -translate-x-1/2 -translate-y-1/2">
              <div class="absolute -inset-2 rounded-full bg-[#C5A059]/30 animate-ping"></div>
              <div class="relative w-10 h-10 rounded-full bg-[#0E1624] border-2 border-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.7)] flex items-center justify-center transition-transform hover:scale-110">
                <svg class="w-5 h-5 text-[#C5A059]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </div>
              <div class="absolute top-11 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0E1624]/95 border border-[#C5A059]/60 px-2.5 py-0.5 rounded-full text-[10px] font-serif text-[#F4DFC0] shadow-xl pointer-events-none tracking-wide">
                ${location.name}
              </div>
            </div>
          `
          : `
            <div class="relative group cursor-pointer -translate-x-1/2 -translate-y-1/2 marker-item-${location.id}">
              <div class="marker-halo absolute -inset-1.5 rounded-full bg-[#C5A059]/0 transition-all duration-300"></div>
              <div class="relative w-7 h-7 rounded-full bg-[#0B131E] border border-[#C5A059]/80 shadow-md flex items-center justify-center transition-all duration-300 group-hover:scale-115 group-hover:border-[#F4DFC0] group-hover:shadow-[0_0_14px_rgba(197,160,89,0.5)]">
                <div class="w-2.5 h-2.5 rounded-full bg-[#C5A059]"></div>
              </div>
              <div class="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#080D15]/90 border border-white/10 px-2 py-0.5 rounded text-[9px] font-sans text-white/90 shadow-lg pointer-events-none transition-all">
                ${location.name}
              </div>
            </div>
          `;

        const customIcon = L.divIcon({
          className: `custom-landmark-marker marker-${location.id}`,
          html: iconHtml,
          iconSize: isResort ? [40, 40] : [28, 28],
          iconAnchor: isResort ? [20, 20] : [14, 14],
        });

        const marker = L.marker([location.lat, location.lng], {
          icon: customIcon,
          zIndexOffset: isResort ? 500 : 100,
        }).addTo(map);

        marker.on("click", () => {
          handleSelectLandmark(location, true);
        });

        markersRef.current[location.id] = marker;
      });

      setIsMapReady(true);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);


  // Handle marker selection visual highlighting
  useEffect(() => {
    if (!isMapReady) return;

    // Reset all non-resort marker styles
    ORCHHA_HERITAGE_LOCATIONS.forEach((loc) => {
      const el = document.querySelector(`.marker-item-${loc.id}`);
      if (el) {
        const halo = el.querySelector(".marker-halo");
        if (loc.id === selectedId) {
          el.classList.add("scale-125");
          if (halo) halo.classList.replace("bg-[#C5A059]/0", "bg-[#C5A059]/40");
        } else if (loc.id === hoveredId) {
          el.classList.add("scale-115");
          if (halo) halo.classList.replace("bg-[#C5A059]/0", "bg-[#C5A059]/25");
        } else {
          el.classList.remove("scale-125", "scale-115");
          if (halo) {
            halo.classList.remove("bg-[#C5A059]/40", "bg-[#C5A059]/25");
            halo.classList.add("bg-[#C5A059]/0");
          }
        }
      }
    });
  }, [selectedId, hoveredId, isMapReady]);

  // Select landmark handler
  const handleSelectLandmark = useCallback(
    (landmark: HeritageLocationMarker, shouldFly = true) => {
      setSelectedId(landmark.id);
      if (onSelectLandmark) {
        onSelectLandmark(landmark);
      }

      if (shouldFly && mapInstanceRef.current) {
        // Fly smoothly to landmark coordinates
        mapInstanceRef.current.flyTo([landmark.lat, landmark.lng], 16, {
          duration: 1.2,
          easeLinearity: 0.25,
        });
      }
    },
    [onSelectLandmark]
  );

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
    setSelectedId("orchha-resort");
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(
        [ORCHHA_MAP_CENTER.lat, ORCHHA_MAP_CENTER.lng],
        ORCHHA_MAP_DEFAULT_ZOOM,
        { duration: 1.2 }
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
          HEADER & CATEGORY FILTER BAR
          ───────────────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-6 border-b border-brand-gold/15 bg-[#0B131E]/90 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-4 h-4 text-brand-gold animate-spin-slow" />
            <span className="text-[10px] font-mono tracking-widest text-brand-gold uppercase">
              Cartographic Sanctuary Atlas · 25.348° N, 78.639° E
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-white font-medium tracking-tight">
            The Heritage Geography of Orchha
          </h3>
          <p className="font-sans text-xs sm:text-sm text-white/70 max-w-xl">
            Discover the temples, royal architecture, and sacred river landscapes surrounding your stay.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {MAP_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all duration-200 border tactile-3d hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
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
          MAIN EXPLORER: LIST + INTERACTIVE MAP
          ───────────────────────────────────────────────────────────────── */}
      <div className="relative flex-1 flex flex-col lg:flex-row min-h-[560px] lg:min-h-[620px]">
        {/* Left Side: Landmark List Panel */}
        <div className="w-full lg:w-[380px] xl:w-[420px] bg-[#0A1018]/95 border-b lg:border-b-0 lg:border-r border-brand-gold/15 flex flex-col justify-between p-4 sm:p-5 overflow-y-auto max-h-[400px] lg:max-h-[640px] z-10">
          <div className="space-y-2">
            <div className="text-[11px] font-mono text-brand-gold/80 uppercase tracking-wider flex items-center justify-between pb-1">
              <span>Verified Landmarks ({filteredLocations.length})</span>
              <span>Select to Navigate</span>
            </div>

            <div className="space-y-2 pr-1">
              {filteredLocations.map((location) => {
                const isSelected = location.id === selectedId;
                const isResort = location.isPrimary;

                return (
                  <div
                    key={location.id}
                    onClick={() => handleSelectLandmark(location, true)}
                    onMouseEnter={() => setHoveredId(location.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={cn(
                      "p-3.5 rounded-xl border cursor-pointer transition-all duration-300 relative group flex items-start justify-between gap-3",
                      isSelected
                        ? "bg-brand-gold/15 border-brand-gold shadow-[0_0_15px_rgba(197,160,89,0.25)] translate-x-1"
                        : "bg-white/[0.03] border-white/10 hover:border-brand-gold/40 hover:bg-white/[0.06] hover:-translate-y-0.5"
                    )}
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(location.category)}
                        <span
                          className={cn(
                            "text-[10px] font-mono uppercase tracking-wider",
                            isResort
                              ? "text-brand-gold font-bold"
                              : "text-white/60"
                          )}
                        >
                          {location.badgeText}
                        </span>
                        {isResort && (
                          <span className="px-1.5 py-0.2 rounded bg-brand-gold/20 text-brand-gold text-[9px] font-sans font-semibold">
                            Primary
                          </span>
                        )}
                      </div>

                      <h4
                        className={cn(
                          "font-serif text-sm font-semibold transition-colors leading-tight",
                          isSelected
                            ? "text-brand-gold"
                            : "text-white group-hover:text-brand-gold"
                        )}
                      >
                        {location.name}
                      </h4>

                      <p className="font-sans text-xs text-white/65 line-clamp-2 leading-relaxed">
                        {location.description}
                      </p>

                      <div className="pt-1 flex items-center gap-3 text-[11px] font-sans text-white/50">
                        <span className="flex items-center gap-1">
                          <Navigation className="w-3 h-3 text-brand-gold/80" />
                          {location.distanceFromResort}
                        </span>
                        {location.walkingTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-brand-gold/80" />
                            {location.walkingTime}
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center transition-all mt-1",
                        isSelected
                          ? "bg-brand-gold text-brand-charcoal"
                          : "text-white/40 group-hover:text-brand-gold group-hover:translate-x-0.5"
                      )}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Reset Button in List Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
            <button
              onClick={handleResetView}
              className="flex items-center gap-1.5 text-brand-gold hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Full Orchha Overview</span>
            </button>
            <span className="text-white/40 text-[11px]">
              {selectedLocation.categoryLabel}
            </span>
          </div>
        </div>

        {/* Right Side: Dominant Real Leaflet Map */}
        <div className="relative flex-1 min-h-[380px] lg:min-h-full w-full bg-[#080D15]">
          {/* Leaflet Container */}
          <div
            ref={mapContainerRef}
            className="absolute inset-0 w-full h-full z-0"
          />

          {/* Ambient Map Gradients to blend softly */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(8,13,21,0.2)] z-1" />

          {/* Floating Map Controls in Top Right */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            {/* Zoom In */}
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-2.5 rounded-xl bg-[#0B131E]/90 hover:bg-[#0E1724] border border-white/15 text-white hover:text-brand-gold shadow-xl backdrop-blur-md transition-all tactile-3d hover:-translate-y-0.5 active:scale-95 hover:shadow-gold-ambient flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <Plus className="w-4 h-4" />
            </button>

            {/* Zoom Out */}
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-2.5 rounded-xl bg-[#0B131E]/90 hover:bg-[#0E1724] border border-white/15 text-white hover:text-brand-gold shadow-xl backdrop-blur-md transition-all tactile-3d hover:-translate-y-0.5 active:scale-95 hover:shadow-gold-ambient flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <Minus className="w-4 h-4" />
            </button>

            {/* Reset View */}
            <button
              onClick={handleResetView}
              title="Reset Overview"
              className="p-2.5 rounded-xl bg-[#0B131E]/90 hover:bg-[#0E1724] border border-white/15 text-white hover:text-brand-gold shadow-xl backdrop-blur-md transition-all tactile-3d hover:-translate-y-0.5 active:scale-95 hover:shadow-gold-ambient flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Floating Docked Inspector Card in Bottom Left */}
          {selectedLocation && (
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-10 animate-fade-in">
              <div className="p-4 rounded-xl bg-[#0A1018]/95 border border-brand-gold/40 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row gap-4 items-center">
                {selectedLocation.imageSrc && (
                  <div className="relative w-full sm:w-28 h-24 rounded-lg overflow-hidden shrink-0 border border-brand-gold/20">
                    <Image
                      src={selectedLocation.imageSrc}
                      alt={selectedLocation.name}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 space-y-1 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider">
                      {selectedLocation.badgeText} · {selectedLocation.historicalEra}
                    </span>
                    <span className="text-[10px] font-sans text-white/50">
                      {selectedLocation.lat.toFixed(4)}° N, {selectedLocation.lng.toFixed(4)}° E
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-semibold text-white">
                    {selectedLocation.name}
                  </h4>
                  <p className="font-sans text-xs text-white/70 line-clamp-2">
                    {selectedLocation.description}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-brand-gold font-medium">
                      {selectedLocation.distanceFromResort}
                    </span>
                    {selectedLocation.isPrimary && (
                      <Link
                        href="#rooms"
                        className="text-[11px] font-sans text-brand-gold hover:underline flex items-center gap-1 font-semibold"
                      >
                        Reserve Your Room
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
