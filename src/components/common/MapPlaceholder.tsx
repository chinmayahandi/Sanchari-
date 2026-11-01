"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Compass, ExternalLink, Layers, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface MapPlaceholderProps {
  locationName: string;
  district: string;
  region?: string;
  coordinates?: { lat: number; lng: number };
  nearestAirport?: string;
  nearestRailway?: string;
  elevation?: string;
  highways?: string[];
}

export function MapPlaceholder({
  locationName,
  district,
  region = "Karnataka",
  coordinates = { lat: 15.335, lng: 76.46 },
  nearestAirport = "Hubballi / Jindal Toranagallu (Hampi area)",
  nearestRailway = "Hosapete Junction (13 km)",
  elevation = "467 m above sea level",
  highways = ["NH-50", "SH-49"],
}: MapPlaceholderProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"terrain" | "transit">("terrain");

  const coordString = `${coordinates.lat.toFixed(4)}° N, ${coordinates.lng.toFixed(4)}° E`;

  const handleCopyCoords = () => {
    navigator.clipboard?.writeText(coordString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-white border border-surface-border shadow-card overflow-hidden">
      {/* Map Header */}
      <div className="p-4 sm:p-5 border-b border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-forest uppercase tracking-wider mb-1">
            <Compass className="w-3.5 h-3.5 text-forest" />
            <span>Karnataka Geographic Positioning</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-navy">
            {locationName}, {district} District
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg bg-surface-light p-1 border border-surface-border text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("terrain")}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === "terrain"
                  ? "bg-white text-navy shadow-sm font-semibold"
                  : "text-surface-muted hover:text-navy"
              }`}
            >
              Terrain & Area
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("transit")}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === "transit"
                  ? "bg-white text-navy shadow-sm font-semibold"
                  : "text-surface-muted hover:text-navy"
              }`}
            >
              Transit Access
            </button>
          </div>
        </div>
      </div>

      {/* Visual Canvas Representation */}
      <div className="relative h-64 sm:h-72 w-full bg-gradient-to-br from-emerald-900/10 via-forest-900/5 to-amber-900/10 overflow-hidden flex items-center justify-center p-6 border-b border-surface-border">
        {/* Decorative Grid Lines */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#14532D 1px, transparent 1px), radial-gradient(#14532D 1px, #FFFBF2 1px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 12px 12px",
          }}
        />

        {/* Contour Rings Simulation */}
        <div className="absolute w-72 h-72 rounded-full border border-forest-300/30 animate-pulse pointer-events-none" />
        <div className="absolute w-48 h-48 rounded-full border border-forest-400/40 pointer-events-none" />
        <div className="absolute w-28 h-28 rounded-full border border-forest-500/50 pointer-events-none" />

        {/* Central Pin Callout */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-12 h-12 rounded-full bg-forest/20 animate-ping" />
            <div className="w-12 h-12 rounded-2xl bg-forest text-white shadow-xl flex items-center justify-center border-2 border-white">
              <MapPin className="w-6 h-6 text-sunshine" />
            </div>
          </div>
          <div className="mt-3 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-surface-border shadow-md">
            <span className="text-xs font-bold text-navy block">
              {locationName} &bull; {district}
            </span>
            <span className="text-[11px] text-surface-muted font-mono">{coordString}</span>
          </div>
        </div>

        {/* Bottom Overlay Info Tag */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-surface-border/80 text-[11px] text-charcoal font-medium shadow-sm">
          📍 Karnataka Region: {region}
        </div>

        <div className="absolute bottom-3 right-3">
          <button
            type="button"
            onClick={handleCopyCoords}
            className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md border border-surface-border text-[11px] text-forest font-semibold shadow-sm hover:bg-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Navigation className="w-3 h-3 text-forest" />
                <span>Copy Coordinates</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Transit & Access Details */}
      <div className="p-4 sm:p-5 bg-surface-ivory/40">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-white border border-surface-border/80 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-surface-muted uppercase tracking-wider block">
              Nearest Airport
            </span>
            <span className="font-semibold text-navy block leading-snug">{nearestAirport}</span>
          </div>

          <div className="p-3 rounded-xl bg-white border border-surface-border/80 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-surface-muted uppercase tracking-wider block">
              Nearest Railway Hub
            </span>
            <span className="font-semibold text-navy block leading-snug">{nearestRailway}</span>
          </div>

          <div className="p-3 rounded-xl bg-white border border-surface-border/80 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-surface-muted uppercase tracking-wider block">
              Elevation & Roads
            </span>
            <span className="font-semibold text-navy block leading-snug">
              {elevation} &bull; {highways.join(", ")}
            </span>
          </div>
        </div>

        <p className="text-[11px] text-surface-muted mt-3 text-center italic">
          * Detailed driving directions, verified homestay GPS waypoints and KSRTC bus schedules are provided upon booking confirmation.
        </p>
      </div>
    </div>
  );
}
