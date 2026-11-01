import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Compass } from "lucide-react";
import { Destination } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { truncateText } from "@/lib/utils";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="group rounded-2xl bg-white border border-surface-border shadow-card hover:shadow-cardHover transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
        <Image
          src={destination.heroImage}
          alt={`Scenic photograph of ${destination.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-black/20" />

        {/* Region badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="navy" size="sm" className="bg-navy/80 backdrop-blur-sm text-[11px]">
            {destination.region}
          </Badge>
        </div>

        {/* Duration Chip */}
        <div className="absolute bottom-3 right-3">
          <span className="px-2 py-1 rounded-md text-[11px] font-semibold bg-white/90 text-navy backdrop-blur-sm">
            {destination.suggestedDuration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-teal font-semibold mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{destination.district} District</span>
          </div>

          <h3 className="text-xl font-bold text-navy group-hover:text-teal transition-colors tracking-tight mb-2">
            {destination.name}
          </h3>

          <p className="text-xs sm:text-sm text-surface-muted leading-relaxed line-clamp-2 mb-4">
            {destination.description}
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {destination.categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="text-[11px] px-2 py-0.5 rounded-full bg-surface-light text-navy-700 border border-surface-border font-medium"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Action Link */}
        <div className="pt-3 border-t border-surface-border flex items-center justify-between">
          <span className="text-xs font-semibold text-surface-muted">
            {destination.highlights.length} Highlights
          </span>
          <Link
            href={`/destinations/${destination.slug}`}
            className="inline-flex items-center gap-1 text-sm font-bold text-teal hover:text-teal-700 transition-colors"
          >
            <span>Explore {destination.name}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
