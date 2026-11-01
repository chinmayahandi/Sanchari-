"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const POPULAR_SUGGESTIONS = [
  { name: "Hampi", slug: "hampi" },
  { name: "Coorg", slug: "coorg" },
  { name: "Gokarna", slug: "gokarna" },
  { name: "Mysuru", slug: "mysuru" },
  { name: "Chikkamagaluru", slug: "chikkamagaluru" },
  { name: "Badami", slug: "badami" },
];

export function HeroSearch() {
  const router = useRouter();
  const [destinationQuery, setDestinationQuery] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [guests, setGuests] = useState("2");
  const [category, setCategory] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destinationQuery.trim()) {
      params.set("q", destinationQuery.trim());
    }
    if (category !== "all") {
      params.set("cat", category);
    }
    if (travelDate) {
      params.set("date", travelDate);
    }
    if (guests) {
      params.set("guests", guests);
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Container */}
      <form
        onSubmit={handleSearch}
        className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/40 text-navy"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-2.5 sm:gap-3 items-center">
          {/* Destination Field */}
          <div className="md:col-span-4 relative">
            <label className="block text-[11px] font-bold text-navy-700 uppercase tracking-wider mb-1 px-1">
              Where in Karnataka?
            </label>
            <div className="relative flex items-center">
              <MapPin className="w-4 h-4 text-forest absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={destinationQuery}
                onChange={(e) => setDestinationQuery(e.target.value)}
                placeholder="Hampi, Coorg, Gokarna..."
                className="w-full pl-9 pr-3 py-2.5 bg-surface-light rounded-xl text-sm font-medium text-navy placeholder:text-surface-muted/70 border border-surface-border focus:border-forest focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all"
              />
            </div>
          </div>

          {/* Travel Date */}
          <div className="md:col-span-3 relative">
            <label className="block text-[11px] font-bold text-navy-700 uppercase tracking-wider mb-1 px-1">
              When?
            </label>
            <div className="relative flex items-center">
              <Calendar className="w-4 h-4 text-forest absolute left-3 pointer-events-none" />
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-surface-light rounded-xl text-sm font-medium text-navy border border-surface-border focus:border-forest focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* Guests Count Selector */}
          <div className="md:col-span-2 relative">
            <label className="block text-[11px] font-bold text-navy-700 uppercase tracking-wider mb-1 px-1">
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full px-3 py-2.5 bg-surface-light rounded-xl text-sm font-medium text-navy border border-surface-border focus:border-forest focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all cursor-pointer"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5+ Guests</option>
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3 relative">
            <label className="block text-[11px] font-bold text-navy-700 uppercase tracking-wider mb-1 px-1">
              Experience Type
            </label>
            <div className="relative flex items-center">
              <Compass className="w-4 h-4 text-forest absolute left-3 pointer-events-none" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-surface-light rounded-xl text-sm font-medium text-navy border border-surface-border focus:border-forest focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest/20 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Experiences</option>
                <option value="destinations">Destinations</option>
                <option value="stays">Homestays</option>
                <option value="guides">Local Guides</option>
                <option value="heritage-and-monuments">Heritage & Monuments</option>
                <option value="hill-stations">Hill Stations & Estates</option>
                <option value="nature-and-waterfalls">Nature & Waterfalls</option>
                <option value="beaches-and-coastal-escapes">Beaches & Coastal</option>
                <option value="temples-and-cultural-heritage">Temples & Culture</option>
                <option value="adventure-and-outdoor-activities">Adventure & Outdoors</option>
                <option value="local-food-and-crafts">Local Food & Crafts</option>
              </select>
              <div className="absolute right-3 pointer-events-none text-surface-muted text-xs">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Submit Bar & Quick Suggestions */}
        <div className="mt-3 pt-3 border-t border-surface-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-surface-muted mr-1">
              Popular:
            </span>
            {POPULAR_SUGGESTIONS.map((item) => (
              <button
                type="button"
                key={item.slug}
                onClick={() => setDestinationQuery(item.name)}
                className="px-2.5 py-1 text-xs rounded-full bg-navy-50 text-navy-800 hover:bg-teal hover:text-white transition-colors font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          <Button
            type="submit"
            variant="forest"
            size="md"
            className="w-full sm:w-auto shrink-0 shadow-md font-bold px-6"
            rightIcon={<Search className="w-4 h-4 text-sunshine" />}
          >
            Find Journeys
          </Button>
        </div>
      </form>
    </div>
  );
}
