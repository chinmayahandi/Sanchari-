"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, RefreshCw, Home, Users, ArrowUpDown } from "lucide-react";
import { StayCard } from "@/components/stays/StayCard";
import { EmptyState } from "@/components/feedback/EmptyState";
import { DemoNotice } from "@/components/feedback/DemoNotice";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { searchStays } from "@/lib/search";
import { STAYS_DATA } from "@/data/stays";
import { AccommodationType } from "@/types";

const ACCOMMODATION_TYPES: { label: string; value: string }[] = [
  { label: "All Accommodation Types", value: "all" },
  { label: "Coffee Plantation Estate", value: "Coffee Plantation Estate" },
  { label: "Heritage Homestay", value: "Heritage Homestay" },
  { label: "Coastal Beach Villa", value: "Coastal Beach Villa" },
  { label: "Traditional Tharavadu / Mane", value: "Traditional Tharavadu / Mane" },
  { label: "Riverside Cottage", value: "Riverside Cottage" },
];

export default function StaysDiscoveryPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [guestCount, setGuestCount] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name-asc">("price-asc");

  const handleResetFilters = () => {
    setQuery("");
    setType("all");
    setGuestCount(0);
    setMaxPrice(6000);
    setSortBy("price-asc");
  };

  const filteredStays = useMemo(() => {
    return searchStays({
      query,
      type,
      guests: guestCount > 0 ? guestCount : undefined,
      maxPrice: maxPrice < 6000 ? maxPrice : undefined,
      sortBy,
    });
  }, [query, type, guestCount, maxPrice, sortBy]);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: "Homestays & Stays" }]} />

      {/* Heading */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-teal uppercase tracking-wider">
          Karnataka Homestays & Stays
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          Plantation Retreats & Heritage Homes
        </h1>
        <p className="text-xs sm:text-sm text-surface-muted max-w-2xl leading-relaxed">
          Stay directly with local families inside coffee estates, riverbank chalets, and heritage courtyards with authentic regional hospitality.
        </p>
      </div>

      <DemoNotice message="All accommodation availability, room details, and pricing are demonstration records for prototype interaction." />

      {/* Filter and Search Bar */}
      <div className="rounded-2xl bg-white border border-surface-border p-4 sm:p-5 shadow-card space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Query */}
          <div>
            <label className="block text-xs font-semibold text-surface-text mb-1">
              Search by Location or Name
            </label>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-surface-muted absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Coorg, Malpe, Hampi..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-surface-border bg-surface-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-xs font-semibold text-surface-text mb-1">
              Accommodation Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-surface-border bg-surface-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal text-navy cursor-pointer"
            >
              {ACCOMMODATION_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Guest Capacity */}
          <div>
            <label className="block text-xs font-semibold text-surface-text mb-1">
              Minimum Guests
            </label>
            <select
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm rounded-lg border border-surface-border bg-surface-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal text-navy cursor-pointer"
            >
              <option value={0}>Any Capacity</option>
              <option value={2}>2+ Guests</option>
              <option value={3}>3+ Guests</option>
              <option value={4}>4+ Guests</option>
              <option value={5}>5+ Guests</option>
            </select>
          </div>

          {/* Sorting */}
          <div>
            <label className="block text-xs font-semibold text-surface-text mb-1">
              Sort By
            </label>
            <div className="relative flex items-center">
              <ArrowUpDown className="w-4 h-4 text-surface-muted absolute left-3 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-surface-border bg-surface-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal text-navy cursor-pointer"
              >
                <option value="price-asc">Price (Lowest first)</option>
                <option value="price-desc">Price (Highest first)</option>
                <option value="name-asc">Property Name (A &rarr; Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter summary & reset */}
        <div className="flex items-center justify-between pt-2 border-t border-surface-border/60 text-xs">
          <span className="font-semibold text-navy">
            Showing {filteredStays.length} of {STAYS_DATA.length} stays
          </span>
          {(query || type !== "all" || guestCount > 0) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-teal font-semibold hover:underline inline-flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredStays.length === 0 ? (
        <EmptyState
          title="No stays found"
          description="None of our homestays or estate retreats matched your filters. Try resetting the criteria."
          onReset={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStays.map((stay) => (
            <StayCard key={stay.id} stay={stay} />
          ))}
        </div>
      )}
    </div>
  );
}
