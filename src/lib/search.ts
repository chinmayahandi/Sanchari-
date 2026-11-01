import { Destination, Stay, Guide, Experience, DestinationCategory, KarnatakaRegion } from "@/types";
import { DESTINATIONS_DATA } from "@/data/destinations";
import { STAYS_DATA } from "@/data/stays";
import { GUIDES_DATA } from "@/data/guides";
import { EXPERIENCES_DATA } from "@/data/experiences";

/**
 * Filter and search destinations.
 */
export function searchDestinations(params: {
  query?: string;
  category?: string;
  region?: string;
  sortBy?: "name-asc" | "name-desc";
}): Destination[] {
  let results = [...DESTINATIONS_DATA];

  if (params.query && params.query.trim()) {
    const q = params.query.toLowerCase().trim();
    results = results.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.district.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.highlights.some((h) => h.toLowerCase().includes(q))
    );
  }

  if (params.category && params.category !== "all") {
    const cat = params.category.toLowerCase();
    results = results.filter((d) =>
      d.categories.some((c) => c.toLowerCase().includes(cat) || c.toLowerCase().replace(/\s+/g, "-") === cat)
    );
  }

  if (params.region && params.region !== "all") {
    results = results.filter((d) => d.region === params.region);
  }

  if (params.sortBy === "name-desc") {
    results.sort((a, b) => b.name.localeCompare(a.name));
  } else {
    results.sort((a, b) => a.name.localeCompare(b.name));
  }

  return results;
}

/**
 * Filter and search stays.
 */
export function searchStays(params: {
  query?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
  sortBy?: "price-asc" | "price-desc" | "name-asc";
}): Stay[] {
  let results = [...STAYS_DATA];

  if (params.query && params.query.trim()) {
    const q = params.query.toLowerCase().trim();
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.destinationName.toLowerCase().includes(q) ||
        s.district.toLowerCase().includes(q) ||
        s.type.toLowerCase().includes(q)
    );
  }

  if (params.type && params.type !== "all") {
    results = results.filter((s) => s.type === params.type);
  }

  if (params.minPrice !== undefined) {
    results = results.filter((s) => s.indicativePricePerNight >= (params.minPrice || 0));
  }

  if (params.maxPrice !== undefined && params.maxPrice > 0) {
    results = results.filter((s) => s.indicativePricePerNight <= (params.maxPrice || Infinity));
  }

  if (params.guests && params.guests > 0) {
    results = results.filter((s) => s.maxGuests >= params.guests!);
  }

  if (params.sortBy === "price-asc") {
    results.sort((a, b) => a.indicativePricePerNight - b.indicativePricePerNight);
  } else if (params.sortBy === "price-desc") {
    results.sort((a, b) => b.indicativePricePerNight - a.indicativePricePerNight);
  } else {
    results.sort((a, b) => a.name.localeCompare(b.name));
  }

  return results;
}

/**
 * Filter and search guides.
 */
export function searchGuides(params: {
  query?: string;
  language?: string;
  expertise?: string;
  district?: string;
  sortBy?: "rate-asc" | "rate-desc" | "exp-desc";
}): Guide[] {
  let results = [...GUIDES_DATA];

  if (params.query && params.query.trim()) {
    const q = params.query.toLowerCase().trim();
    results = results.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.location.toLowerCase().includes(q) ||
        g.district.toLowerCase().includes(q) ||
        g.languages.some((l) => l.toLowerCase().includes(q)) ||
        g.expertise.some((e) => e.toLowerCase().includes(q))
    );
  }

  if (params.language && params.language !== "all") {
    results = results.filter((g) =>
      g.languages.some((l) => l.toLowerCase() === params.language?.toLowerCase())
    );
  }

  if (params.expertise && params.expertise !== "all") {
    results = results.filter((g) =>
      g.expertise.some((e) => e.toLowerCase().includes(params.expertise!.toLowerCase()))
    );
  }

  if (params.district && params.district !== "all") {
    results = results.filter((g) => g.district === params.district);
  }

  if (params.sortBy === "rate-asc") {
    results.sort((a, b) => a.indicativeDayRate - b.indicativeDayRate);
  } else if (params.sortBy === "rate-desc") {
    results.sort((a, b) => b.indicativeDayRate - a.indicativeDayRate);
  } else if (params.sortBy === "exp-desc") {
    results.sort((a, b) => b.yearsExperience - a.yearsExperience);
  } else {
    results.sort((a, b) => a.name.localeCompare(b.name));
  }

  return results;
}

/**
 * Filter and search experiences.
 */
export function searchExperiences(params: {
  query?: string;
  category?: string;
  destination?: string;
  maxPrice?: number;
  sortBy?: "price-asc" | "price-desc" | "name-asc";
}): Experience[] {
  let results = [...EXPERIENCES_DATA];

  if (params.query && params.query.trim()) {
    const q = params.query.toLowerCase().trim();
    results = results.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.destinationName.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.overview.toLowerCase().includes(q)
    );
  }

  if (params.category && params.category !== "all") {
    results = results.filter((e) => e.category === params.category);
  }

  if (params.destination && params.destination !== "all") {
    results = results.filter((e) => e.destinationSlug === params.destination);
  }

  if (params.maxPrice && params.maxPrice > 0) {
    results = results.filter((e) => e.indicativePricePerPerson <= params.maxPrice!);
  }

  if (params.sortBy === "price-asc") {
    results.sort((a, b) => a.indicativePricePerPerson - b.indicativePricePerPerson);
  } else if (params.sortBy === "price-desc") {
    results.sort((a, b) => b.indicativePricePerPerson - a.indicativePricePerPerson);
  } else {
    results.sort((a, b) => a.title.localeCompare(b.title));
  }

  return results;
}
