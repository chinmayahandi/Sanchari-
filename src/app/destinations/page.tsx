"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Filter, RefreshCw, MapPin, SlidersHorizontal, ArrowUpDown, Loader2 } from "lucide-react";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { EmptyState } from "@/components/feedback/EmptyState";
import { DemoNotice } from "@/components/feedback/DemoNotice";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { searchDestinations } from "@/lib/search";
import { DESTINATIONS_DATA } from "@/data/destinations";
import { KarnatakaRegion } from "@/types";

const REGIONS: KarnatakaRegion[] = [
  "North Karnataka (Heritage)",
  "Malnad & Western Ghats",
  "Coastal Karnataka",
  "South Karnataka & Mysore Region",
  "Central Karnataka",
  "Bengaluru & Surrounds",
];

const CATEGORIES = [
  { label: "All Categories", value: "all" },
  { label: "Heritage and monuments", value: "heritage" },
  { label: "Nature and waterfalls", value: "nature" },
  { label: "Hill stations", value: "hills" },
  { label: "Beaches and coastal escapes", value: "beaches" },
  { label: "Temples and cultural heritage", value: "temples" },
  { label: "Adventure and outdoor activities", value: "adventure" },
  { label: "Local food and crafts", value: "food" },
  { label: "Family-friendly destinations", value: "family" },
];

function DestinationsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParam = searchParams.get("q") || "";
  const catParam = searchParams.get("cat") || "all";
  const regionParam = searchParams.get("region") || "all";

  const [query, setQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(catParam);
  const [selectedRegion, setSelectedRegion] = useState(regionParam);
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc">("name-asc");

  // Sync state if URL changes
  React.useEffect(() => {
    setQuery(queryParam);
    setSelectedCategory(catParam);
    setSelectedRegion(regionParam);
  }, [queryParam, catParam, regionParam]);

  const updateUrl = (q: string, cat: string, reg: string) => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (cat !== "all") params.set("cat", cat);
    if (reg !== "all") params.set("region", reg);
    router.replace(`/destinations?${params.toString()}`);
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    updateUrl(val, selectedCategory, selectedRegion);
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    updateUrl(query, val, selectedRegion);
  };

  const handleRegionChange = (val: string) => {
    setSelectedRegion(val);
    updateUrl(query, selectedCategory, val);
  };

  const handleResetFilters = () => {
    setQuery("");
    setSelectedCategory("all");
    setSelectedRegion("all");
    setSortBy("name-asc");
    router.replace("/destinations");
  };

  // Filtered results
  const filteredDestinations = useMemo(() => {
    return searchDestinations({
      query,
      category: selectedCategory,
      region: selectedRegion,
      sortBy,
    });
  }, [query, selectedCategory, selectedRegion, sortBy]);

  return (
    <div className="space-y-8">
      {/* Filter and Search Bar */}
      <div className="rounded-2xl bg-white border border-surface-border p-4 sm:p-5 shadow-card space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <label className="block text-xs font-semibold text-surface-text mb-1">
              Search by Destination
            </label>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-surface-muted absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="e.g. Hampi, Gokarna, Badami..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-surface-border bg-surface-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-semibold text-surface-text mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-surface-border bg-surface-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal text-navy cursor-pointer"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Region Filter */}
          <div>
            <label className="block text-xs font-semibold text-surface-text mb-1">
              Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => handleRegionChange(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-surface-border bg-surface-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal text-navy cursor-pointer"
            >
              <option value="all">All Karnataka Regions</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Control */}
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
                <option value="name-asc">Destination Name (A &rarr; Z)</option>
                <option value="name-desc">Destination Name (Z &rarr; A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count & Clear Row */}
        <div className="flex items-center justify-between pt-2 border-t border-surface-border/60 text-xs">
          <span className="font-semibold text-navy">
            Showing {filteredDestinations.length} of {DESTINATIONS_DATA.length} destinations
          </span>
          {(query || selectedCategory !== "all" || selectedRegion !== "all") && (
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
      {filteredDestinations.length === 0 ? (
        <EmptyState
          title="No destinations found"
          description="None of our curated Karnataka destinations match your current search and filters. Try adjusting your query or resetting all filters."
          onReset={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DestinationsPage() {
  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: "Destinations" }]} />

      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-teal uppercase tracking-wider">
          Travel Discovery
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          Karnataka Tourist Destinations
        </h1>
        <p className="text-xs sm:text-sm text-surface-muted max-w-2xl leading-relaxed">
          Explore iconic historical empires, misty Western Ghat peaks, ancient rock caves, and tranquil Arabian coasts.
        </p>
      </div>

      <DemoNotice compact={false} />

      <Suspense
        fallback={
          <div className="flex items-center justify-center p-12 text-surface-muted">
            <Loader2 className="w-6 h-6 animate-spin text-teal mr-2" />
            <span>Loading destinations...</span>
          </div>
        }
      >
        <DestinationsContent />
      </Suspense>
    </div>
  );
}
