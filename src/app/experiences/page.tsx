"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, RefreshCw, Sparkles, ArrowUpDown } from "lucide-react";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { EmptyState } from "@/components/feedback/EmptyState";
import { DemoNotice } from "@/components/feedback/DemoNotice";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { searchExperiences } from "@/lib/search";
import { EXPERIENCES_DATA } from "@/data/experiences";

const CATEGORIES = [
  { label: "All Categories", value: "all" },
  { label: "Regional Food & Culinary", value: "Regional Food & Culinary" },
  { label: "Photography Outings", value: "Photography Outings" },
  { label: "Heritage Walks", value: "Heritage Walks" },
  { label: "Village & Cultural Tours", value: "Village & Cultural Tours" },
];

export default function ExperiencesDiscoveryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name-asc">("price-asc");

  const handleResetFilters = () => {
    setQuery("");
    setCategory("all");
    setSortBy("price-asc");
  };

  const filteredExperiences = useMemo(() => {
    return searchExperiences({
      query,
      category,
      sortBy,
    });
  }, [query, category, sortBy]);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: "Experiences" }]} />

      {/* Heading */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-orange uppercase tracking-wider">
          Curated Encounters
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          Cultural Experiences of Karnataka
        </h1>
        <p className="text-xs sm:text-sm text-surface-muted max-w-2xl leading-relaxed">
          From hands-on single origin coffee cupping and dawn monument photography to ancient coastal theatre green-room visits.
        </p>
      </div>

      <DemoNotice message="All cultural workshops and tour itineraries are demonstration records. No verified live bookings or ticket purchases take place." />

      {/* Filter and Search Bar */}
      <div className="rounded-2xl bg-white border border-surface-border p-4 sm:p-5 shadow-card space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Query */}
          <div>
            <label className="block text-xs font-semibold text-surface-text mb-1">
              Search by Activity or Place
            </label>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-surface-muted absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Coffee, Photography, Walk..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-surface-border bg-surface-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-semibold text-surface-text mb-1">
              Category
            </label>
            <div className="relative flex items-center">
              <Sparkles className="w-4 h-4 text-surface-muted absolute left-3 pointer-events-none" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-surface-border bg-surface-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal text-navy cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
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
                <option value="price-asc">Price (Lowest first)</option>
                <option value="price-desc">Price (Highest first)</option>
                <option value="name-asc">Title (A &rarr; Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Summary */}
        <div className="flex items-center justify-between pt-2 border-t border-surface-border/60 text-xs">
          <span className="font-semibold text-navy">
            Showing {filteredExperiences.length} of {EXPERIENCES_DATA.length} experiences
          </span>
          {(query || category !== "all") && (
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

      {/* Grid or Empty */}
      {filteredExperiences.length === 0 ? (
        <EmptyState
          title="No experiences found"
          description="None of our curated cultural experiences match your current filters. Try resetting the criteria."
          onReset={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      )}
    </div>
  );
}
