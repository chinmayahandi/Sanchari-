"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Filter,
  RefreshCw,
  MapPin,
  Home,
  Users,
  Sparkles,
  ArrowUpDown,
  Compass,
  Calendar,
  Layers,
  Loader2,
} from "lucide-react";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { StayCard } from "@/components/stays/StayCard";
import { GuideCard } from "@/components/guides/GuideCard";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { EmptyState } from "@/components/feedback/EmptyState";
import { DemoNotice } from "@/components/feedback/DemoNotice";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Pagination } from "@/components/common/Pagination";
import { CardSkeleton } from "@/components/common/Skeleton";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  searchDestinations,
  searchStays,
  searchGuides,
  searchExperiences,
} from "@/lib/search";
import { KarnatakaRegion } from "@/types";

const REGIONS: KarnatakaRegion[] = [
  "North Karnataka (Heritage)",
  "Malnad & Western Ghats",
  "Coastal Karnataka",
  "South Karnataka & Mysore Region",
  "Central Karnataka",
  "Bengaluru & Surrounds",
];

type CategoryTab = "all" | "destinations" | "stays" | "guides" | "experiences";

function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") || "";
  const initialCat = (searchParams.get("cat") || "all") as CategoryTab;
  const initialRegion = searchParams.get("region") || "all";
  const initialGuests = searchParams.get("guests") || "";
  const initialDate = searchParams.get("date") || "";

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<CategoryTab>(
    ["all", "destinations", "stays", "guides", "experiences"].includes(initialCat)
      ? initialCat
      : "all"
  );
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [sortBy, setSortBy] = useState<"relevance" | "price-asc" | "price-desc" | "name-asc">("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Sync with searchParams
  React.useEffect(() => {
    setQuery(initialQuery);
    if (["all", "destinations", "stays", "guides", "experiences"].includes(initialCat)) {
      setActiveTab(initialCat as CategoryTab);
    }
    setSelectedRegion(initialRegion);
  }, [initialQuery, initialCat, initialRegion]);

  const updateUrl = (q: string, tab: string, reg: string) => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (tab !== "all") params.set("cat", tab);
    if (reg !== "all") params.set("region", reg);
    router.replace(`/search?${params.toString()}`);
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setCurrentPage(1);
    updateUrl(val, activeTab, selectedRegion);
  };

  const handleTabChange = (tab: CategoryTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    updateUrl(query, tab, selectedRegion);
  };

  const handleRegionChange = (reg: string) => {
    setSelectedRegion(reg);
    setCurrentPage(1);
    updateUrl(query, activeTab, reg);
  };

  const handleResetFilters = () => {
    setQuery("");
    setActiveTab("all");
    setSelectedRegion("all");
    setSortBy("relevance");
    setCurrentPage(1);
    router.replace("/search");
  };

  // Perform multi-entity searches
  const destinations = useMemo(() => {
    return searchDestinations({
      query,
      region: selectedRegion !== "all" ? selectedRegion : undefined,
      sortBy: sortBy === "name-asc" ? "name-asc" : undefined,
    });
  }, [query, selectedRegion, sortBy]);

  const stays = useMemo(() => {
    return searchStays({
      query,
      sortBy:
        sortBy === "price-asc"
          ? "price-asc"
          : sortBy === "price-desc"
          ? "price-desc"
          : "name-asc",
    });
  }, [query, sortBy]);

  const guides = useMemo(() => {
    return searchGuides({
      query,
      sortBy:
        sortBy === "price-asc"
          ? "rate-asc"
          : sortBy === "price-desc"
          ? "rate-desc"
          : undefined,
    });
  }, [query, sortBy]);

  const experiences = useMemo(() => {
    return searchExperiences({
      query,
      sortBy:
        sortBy === "price-asc"
          ? "price-asc"
          : sortBy === "price-desc"
          ? "price-desc"
          : "name-asc",
    });
  }, [query, sortBy]);

  // Aggregate counts
  const totalCount =
    destinations.length + stays.length + guides.length + experiences.length;

  const currentResultsCount =
    activeTab === "all"
      ? totalCount
      : activeTab === "destinations"
      ? destinations.length
      : activeTab === "stays"
      ? stays.length
      : activeTab === "guides"
      ? guides.length
      : experiences.length;

  const isFiltered = Boolean(query || activeTab !== "all" || selectedRegion !== "all");

  return (
    <div className="space-y-8">
      {/* Search Header Banner */}
      <div className="rounded-3xl bg-forest-950 text-white p-6 sm:p-10 relative overflow-hidden shadow-xl border border-forest-800">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sunshine text-xs font-semibold backdrop-blur-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>Search Karnataka Tourism Directory</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {query.trim() ? (
              <span>
                Search Results for &ldquo;<span className="text-sunshine">{query.trim()}</span>&rdquo;
              </span>
            ) : (
              <span>Explore All Karnataka Offerings</span>
            )}
          </h1>

          <p className="text-xs sm:text-sm text-forest-200 leading-relaxed max-w-2xl">
            {initialDate && <span>Travel Date: <strong>{initialDate}</strong> &bull; </span>}
            {initialGuests && <span>Party: <strong>{initialGuests} Guests</strong> &bull; </span>}
            Showing <strong>{currentResultsCount}</strong> matching entries across Karnataka destinations, homestays, licensed guides, and curated experiences.
          </p>
        </div>
      </div>

      <DemoNotice message="Search queries are filtered instantaneously against Sanchari's verified Karnataka frontend sample records." />

      {/* Main Filter & Search Control Panel */}
      <div className="rounded-2xl bg-white border border-surface-border p-4 sm:p-6 shadow-card space-y-4">
        {/* Top Search & Filter Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Query input */}
          <div className="lg:col-span-5 relative">
            <label className="block text-[11px] font-bold text-navy uppercase tracking-wider mb-1">
              Search Keywords
            </label>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-forest absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="e.g. Hampi, Coorg, Coffee, Gokarna, Temple..."
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-surface-border bg-surface-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest text-navy"
              />
            </div>
          </div>

          {/* Region selector */}
          <div className="lg:col-span-4 relative">
            <label className="block text-[11px] font-bold text-navy uppercase tracking-wider mb-1">
              Karnataka Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => handleRegionChange(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-surface-border bg-surface-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest text-navy cursor-pointer"
            >
              <option value="all">All Karnataka Regions</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting */}
          <div className="lg:col-span-3 relative">
            <label className="block text-[11px] font-bold text-navy uppercase tracking-wider mb-1">
              Sort By
            </label>
            <div className="relative flex items-center">
              <ArrowUpDown className="w-4 h-4 text-surface-muted absolute left-3 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-surface-border bg-surface-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest text-navy cursor-pointer"
              >
                <option value="relevance">Relevance</option>
                <option value="name-asc">Name (A &rarr; Z)</option>
                <option value="price-asc">Price / Rate (Lowest first)</option>
                <option value="price-desc">Price / Rate (Highest first)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs Row */}
        <div className="pt-3 border-t border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => handleTabChange("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                activeTab === "all"
                  ? "bg-forest text-white shadow-sm"
                  : "bg-surface-light text-navy hover:bg-surface-border/50"
              }`}
            >
              All Categories ({totalCount})
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("destinations")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                activeTab === "destinations"
                  ? "bg-forest text-white shadow-sm"
                  : "bg-surface-light text-navy hover:bg-surface-border/50"
              }`}
            >
              Destinations ({destinations.length})
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("stays")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                activeTab === "stays"
                  ? "bg-forest text-white shadow-sm"
                  : "bg-surface-light text-navy hover:bg-surface-border/50"
              }`}
            >
              Homestays ({stays.length})
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("guides")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                activeTab === "guides"
                  ? "bg-forest text-white shadow-sm"
                  : "bg-surface-light text-navy hover:bg-surface-border/50"
              }`}
            >
              Guides ({guides.length})
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("experiences")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                activeTab === "experiences"
                  ? "bg-forest text-white shadow-sm"
                  : "bg-surface-light text-navy hover:bg-surface-border/50"
              }`}
            >
              Experiences ({experiences.length})
            </button>
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-semibold text-forest hover:underline inline-flex items-center gap-1 shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Clear all filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Results View */}
      {currentResultsCount === 0 ? (
        <EmptyState
          title="No results found"
          description={`We couldn't find any listings matching "${query}". Try adjusting your keywords, expanding your region selection, or clearing your filters.`}
          onReset={handleResetFilters}
        />
      ) : (
        <div className="space-y-12">
          {/* ALL CATEGORIES VIEW */}
          {activeTab === "all" && (
            <>
              {/* Destinations group */}
              {destinations.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-surface-border pb-2">
                    <h2 className="text-lg font-bold text-navy flex items-center gap-2">
                      <Compass className="w-4 h-4 text-forest" />
                      <span>Destinations ({destinations.length})</span>
                    </h2>
                    <button
                      type="button"
                      onClick={() => handleTabChange("destinations")}
                      className="text-xs font-semibold text-forest hover:underline"
                    >
                      View only destinations &rarr;
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destinations.slice(0, 4).map((dest) => (
                      <DestinationCard key={dest.id} destination={dest} />
                    ))}
                  </div>
                </div>
              )}

              {/* Stays group */}
              {stays.length > 0 && (
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between border-b border-surface-border pb-2">
                    <h2 className="text-lg font-bold text-navy flex items-center gap-2">
                      <Home className="w-4 h-4 text-forest" />
                      <span>Homestays & Stays ({stays.length})</span>
                    </h2>
                    <button
                      type="button"
                      onClick={() => handleTabChange("stays")}
                      className="text-xs font-semibold text-forest hover:underline"
                    >
                      View only stays &rarr;
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stays.slice(0, 3).map((stay) => (
                      <StayCard key={stay.id} stay={stay} />
                    ))}
                  </div>
                </div>
              )}

              {/* Guides group */}
              {guides.length > 0 && (
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between border-b border-surface-border pb-2">
                    <h2 className="text-lg font-bold text-navy flex items-center gap-2">
                      <Users className="w-4 h-4 text-forest" />
                      <span>Local Guides ({guides.length})</span>
                    </h2>
                    <button
                      type="button"
                      onClick={() => handleTabChange("guides")}
                      className="text-xs font-semibold text-forest hover:underline"
                    >
                      View only guides &rarr;
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {guides.slice(0, 3).map((guide) => (
                      <GuideCard key={guide.id} guide={guide} />
                    ))}
                  </div>
                </div>
              )}

              {/* Experiences group */}
              {experiences.length > 0 && (
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between border-b border-surface-border pb-2">
                    <h2 className="text-lg font-bold text-navy flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-terracotta" />
                      <span>Experiences & Cultural Tours ({experiences.length})</span>
                    </h2>
                    <button
                      type="button"
                      onClick={() => handleTabChange("experiences")}
                      className="text-xs font-semibold text-forest hover:underline"
                    >
                      View only experiences &rarr;
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {experiences.slice(0, 3).map((exp) => (
                      <ExperienceCard key={exp.id} experience={exp} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* DESTINATIONS ONLY VIEW */}
          {activeTab === "destinations" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          )}

          {/* STAYS ONLY VIEW */}
          {activeTab === "stays" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stays.map((stay) => (
                <StayCard key={stay.id} stay={stay} />
              ))}
            </div>
          )}

          {/* GUIDES ONLY VIEW */}
          {activeTab === "guides" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          )}

          {/* EXPERIENCES ONLY VIEW */}
          {activeTab === "experiences" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {experiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: "Search Results" }]} />

      <Suspense
        fallback={
          <div className="space-y-6">
            <div className="h-40 rounded-3xl bg-forest-950/20 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>
        }
      >
        <SearchResultsContent />
      </Suspense>
    </div>
  );
}
