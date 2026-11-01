"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, RefreshCw, Users, Languages, ArrowUpDown, Award } from "lucide-react";
import { GuideCard } from "@/components/guides/GuideCard";
import { EmptyState } from "@/components/feedback/EmptyState";
import { DemoNotice } from "@/components/feedback/DemoNotice";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { searchGuides } from "@/lib/search";
import { GUIDES_DATA } from "@/data/guides";

const LANGUAGES = [
  { label: "All Languages", value: "all" },
  { label: "Kannada", value: "kannada" },
  { label: "English", value: "english" },
  { label: "Hindi", value: "hindi" },
  { label: "Telugu", value: "telugu" },
  { label: "Kodava Takk", value: "kodava takk" },
];

export default function GuidesDiscoveryPage() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("all");
  const [sortBy, setSortBy] = useState<"rate-asc" | "rate-desc" | "exp-desc">("rate-asc");

  const handleResetFilters = () => {
    setQuery("");
    setLanguage("all");
    setSortBy("rate-asc");
  };

  const filteredGuides = useMemo(() => {
    return searchGuides({
      query,
      language,
      sortBy,
    });
  }, [query, language, sortBy]);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: "Tour Guides" }]} />

      {/* Heading */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-teal uppercase tracking-wider">
          Certified & Local Storytellers
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          Licensed Guides of Karnataka
        </h1>
        <p className="text-xs sm:text-sm text-surface-muted max-w-2xl leading-relaxed">
          Explore Vijayanagara stone inscriptions, Shola forest wildlife, and Mysore royal history alongside knowledgeable local experts.
        </p>
      </div>

      <DemoNotice message="Guide listings, ratings, and rates are demonstration profiles designed to illustrate the Sanchari guide network." />

      {/* Filter and Search Bar */}
      <div className="rounded-2xl bg-white border border-surface-border p-4 sm:p-5 shadow-card space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Query */}
          <div>
            <label className="block text-xs font-semibold text-surface-text mb-1">
              Search by Name or Specialty
            </label>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-surface-muted absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Hampi, Architecture, Coffee..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-surface-border bg-surface-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal"
              />
            </div>
          </div>

          {/* Language Filter */}
          <div>
            <label className="block text-xs font-semibold text-surface-text mb-1">
              Language
            </label>
            <div className="relative flex items-center">
              <Languages className="w-4 h-4 text-surface-muted absolute left-3 pointer-events-none" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-surface-border bg-surface-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal text-navy cursor-pointer"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
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
                <option value="rate-asc">Day Rate (Lowest first)</option>
                <option value="rate-desc">Day Rate (Highest first)</option>
                <option value="exp-desc">Experience (Most experienced)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Clear & Count */}
        <div className="flex items-center justify-between pt-2 border-t border-surface-border/60 text-xs">
          <span className="font-semibold text-navy">
            Showing {filteredGuides.length} of {GUIDES_DATA.length} guides
          </span>
          {(query || language !== "all") && (
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
      {filteredGuides.length === 0 ? (
        <EmptyState
          title="No guides found"
          description="None of our local guides match your current filter parameters. Try clearing your search."
          onReset={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      )}
    </div>
  );
}
