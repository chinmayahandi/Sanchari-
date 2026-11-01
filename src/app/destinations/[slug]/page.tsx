import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  MapPin,
  Calendar,
  Clock,
  Compass,
  Lightbulb,
  ArrowRight,
  Home,
  Users,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { DESTINATIONS_DATA } from "@/data/destinations";
import { STAYS_DATA } from "@/data/stays";
import { GUIDES_DATA } from "@/data/guides";
import { EXPERIENCES_DATA } from "@/data/experiences";
import { ARTICLES_DATA } from "@/data/articles";
import { StayCard } from "@/components/stays/StayCard";
import { GuideCard } from "@/components/guides/GuideCard";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DemoNotice } from "@/components/feedback/DemoNotice";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { MapPlaceholder } from "@/components/common/MapPlaceholder";
import { ImageGallery } from "@/components/common/ImageGallery";

const DESTINATION_GEO: Record<
  string,
  {
    lat: number;
    lng: number;
    airport: string;
    railway: string;
    elevation: string;
    highways: string[];
  }
> = {
  hampi: {
    lat: 15.335,
    lng: 76.46,
    airport: "Hubballi (140 km) / Jindal Toranagallu (35 km)",
    railway: "Hosapete Junction (13 km)",
    elevation: "467 m",
    highways: ["NH-50", "SH-49"],
  },
  coorg: {
    lat: 12.4244,
    lng: 75.7382,
    airport: "Kannur (90 km) / Mangaluru (135 km)",
    railway: "Mysuru Junction (120 km)",
    elevation: "1,150 m (Western Ghats)",
    highways: ["NH-275", "SH-88"],
  },
  mysuru: {
    lat: 12.2958,
    lng: 76.6394,
    airport: "Mysuru Domestic (MYQ) / Bengaluru Kempegowda (170 km)",
    railway: "Mysuru Junction (City center)",
    elevation: "763 m",
    highways: ["NH-275 Expressway", "NH-766"],
  },
  gokarna: {
    lat: 14.5479,
    lng: 74.3188,
    airport: "Dabolim Goa (140 km) / Hubballi (145 km)",
    railway: "Gokarna Road Station (9 km)",
    elevation: "Sea level",
    highways: ["NH-66 Coastal Highway"],
  },
  chikkamagaluru: {
    lat: 13.3161,
    lng: 75.772,
    airport: "Mangaluru International (150 km)",
    railway: "Kadur Junction (40 km)",
    elevation: "1,090 m",
    highways: ["NH-173", "SH-57"],
  },
  badami: {
    lat: 15.9189,
    lng: 75.6766,
    airport: "Hubballi Airport (105 km)",
    railway: "Badami Railway Station (5 km)",
    elevation: "586 m",
    highways: ["SH-14", "SH-57"],
  },
  udupi: {
    lat: 13.3409,
    lng: 74.7421,
    airport: "Mangaluru International Airport (55 km)",
    railway: "Udupi Railway Station (4 km)",
    elevation: "39 m",
    highways: ["NH-66", "NH-169A"],
  },
  shivamogga: {
    lat: 13.9299,
    lng: 75.5681,
    airport: "Kuvempu Airport Shivamogga",
    railway: "Shivamogga Town (SME)",
    elevation: "569 m",
    highways: ["NH-206", "NH-69"],
  },
};

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return DESTINATIONS_DATA.map((d) => ({
    slug: d.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const dest = DESTINATIONS_DATA.find((d) => d.slug === params.slug);
  if (!dest) {
    return {
      title: "Destination Not Found",
    };
  }

  return {
    title: `${dest.name} Tourism Guide — Explore Karnataka`,
    description: `${dest.tagline}. Discover things to do in ${dest.name}, travel tips, best time to visit, and local homestays.`,
    openGraph: {
      title: `${dest.name} | Sanchari Karnataka Discovery`,
      description: dest.description,
      images: [{ url: dest.heroImage }],
    },
  };
}

export default function DestinationDetailPage({ params }: PageProps) {
  const destination = DESTINATIONS_DATA.find((d) => d.slug === params.slug);

  if (!destination) {
    notFound();
  }

  // Related data
  const relatedStays = STAYS_DATA.filter((s) => s.destinationSlug === destination.slug);
  const relatedGuides = GUIDES_DATA.filter(
    (g) =>
      g.location.toLowerCase().includes(destination.name.toLowerCase()) ||
      g.district === destination.district
  );
  const relatedExperiences = EXPERIENCES_DATA.filter(
    (e) => e.destinationSlug === destination.slug
  );
  const relatedArticles = ARTICLES_DATA.filter(
    (a) => a.destinationSlug === destination.slug
  );

  return (
    <div className="pb-20 space-y-12">
      {/* Hero Header */}
      <section className="relative min-h-[460px] lg:min-h-[520px] flex items-end pb-12 px-4 sm:px-6 lg:px-8 bg-navy-950 overflow-hidden">
        <Image
          src={destination.heroImage}
          alt={`Scenic view of ${destination.name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto w-full space-y-4">
          {/* Breadcrumb */}
          <Breadcrumbs
            items={[
              { label: "Destinations", href: "/destinations" },
              { label: destination.name },
            ]}
            variant="dark"
          />

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="teal" size="md">
              {destination.region}
            </Badge>
            <Badge variant="outline" size="md" className="bg-white/10 text-white border-white/20">
              {destination.district} District
            </Badge>
            <span className="text-xs text-navy-200 font-medium px-2 py-0.5 rounded bg-white/10">
              Recommended: {destination.suggestedDuration}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            {destination.name}
          </h1>
          <p className="text-base sm:text-xl text-navy-100 max-w-3xl leading-relaxed">
            {destination.tagline}
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <DemoNotice message="This destination guide is built on curated Karnataka cultural and geographic records for frontend display." />

        {/* Overview & Quick Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Description & Highlights */}
          <div className="lg:col-span-8 space-y-8">
            <div className="rounded-2xl bg-white border border-surface-border p-6 sm:p-8 shadow-card space-y-4">
              <h2 className="text-xl font-bold text-navy">About {destination.name}</h2>
              <p className="text-sm sm:text-base text-surface-muted leading-relaxed">
                {destination.description}
              </p>

              {/* Categories */}
              <div className="pt-2 flex flex-wrap gap-2">
                {destination.categories.map((c) => (
                  <Badge key={c} variant="default" size="md">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="rounded-2xl bg-white border border-surface-border p-6 sm:p-8 shadow-card space-y-4">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange" />
                <span>Key Highlights</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {destination.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-surface-light border border-surface-border text-xs sm:text-sm text-navy"
                  >
                    <span className="w-5 h-5 rounded-full bg-teal text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Things to do */}
            <div className="rounded-2xl bg-white border border-surface-border p-6 sm:p-8 shadow-card space-y-4">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <Compass className="w-5 h-5 text-teal" />
                <span>Things to Do & Experiences</span>
              </h2>
              <div className="space-y-3.5 pt-2">
                {destination.thingsToDo.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-surface-light border border-surface-border space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-navy">
                        {item.title}
                      </h3>
                      {item.duration && (
                        <span className="text-[11px] font-semibold text-teal bg-teal-50 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                          <Clock className="w-3 h-3" />
                          {item.duration}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-navy">Destination Gallery</h2>
              <ImageGallery
                images={destination.gallery}
                title={`${destination.name} Highlights`}
                badgeText={`${destination.name} • ${destination.region}`}
              />
            </div>
          </div>

          {/* Right Sidebar: Planning Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Best time to visit card */}
            <div className="rounded-2xl bg-white border border-surface-border p-5 sm:p-6 shadow-card space-y-3">
              <div className="flex items-center gap-2 text-orange font-bold text-sm">
                <Calendar className="w-4 h-4" />
                <span>Best Time to Visit</span>
              </div>
              <h3 className="text-base font-extrabold text-navy">
                {destination.bestTimeToVisit.months}
              </h3>
              <p className="text-xs text-surface-muted leading-relaxed">
                {destination.bestTimeToVisit.reason}
              </p>
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-200/80 text-[11px] text-orange-950 leading-relaxed">
                <strong>Weather Note:</strong> {destination.bestTimeToVisit.weatherNote}
              </div>
            </div>

            {/* Travel Tips */}
            <div className="rounded-2xl bg-white border border-surface-border p-5 sm:p-6 shadow-card space-y-3">
              <div className="flex items-center gap-2 text-teal font-bold text-sm">
                <Lightbulb className="w-4 h-4" />
                <span>Practical Travel Tips</span>
              </div>
              <ul className="space-y-2.5 text-xs text-surface-muted leading-relaxed">
                {destination.travelTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal font-bold">&bull;</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nearby destinations */}
            {destination.nearbyDestinations.length > 0 && (
              <div className="rounded-2xl bg-white border border-surface-border p-5 sm:p-6 shadow-card space-y-3">
                <div className="flex items-center gap-2 text-navy font-bold text-sm">
                  <MapPin className="w-4 h-4 text-teal" />
                  <span>Nearby Karnataka Places</span>
                </div>
                <div className="space-y-2">
                  {destination.nearbyDestinations.map((nearby) => (
                    <Link
                      key={nearby.slug}
                      href={`/destinations/${nearby.slug}`}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-light border border-transparent hover:border-surface-border transition-colors text-xs"
                    >
                      <span className="font-semibold text-navy">{nearby.name}</span>
                      <span className="text-surface-muted flex items-center gap-1 font-medium">
                        {nearby.distanceKm} km &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Location & Access Map Section */}
        <div className="pt-2">
          <MapPlaceholder
            locationName={destination.name}
            district={destination.district}
            region={destination.region}
            coordinates={
              DESTINATION_GEO[destination.slug]
                ? {
                    lat: DESTINATION_GEO[destination.slug].lat,
                    lng: DESTINATION_GEO[destination.slug].lng,
                  }
                : undefined
            }
            nearestAirport={DESTINATION_GEO[destination.slug]?.airport}
            nearestRailway={DESTINATION_GEO[destination.slug]?.railway}
            elevation={DESTINATION_GEO[destination.slug]?.elevation}
            highways={DESTINATION_GEO[destination.slug]?.highways}
          />
        </div>

        {/* Related Stays Section */}
        {relatedStays.length > 0 && (
          <div className="pt-6 border-t border-surface-border space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-teal uppercase tracking-wider">
                  Stay Locally
                </span>
                <h2 className="text-2xl font-extrabold text-navy tracking-tight mt-0.5">
                  Homestays in & around {destination.name}
                </h2>
              </div>
              <Link href="/stays" className="text-xs font-bold text-teal hover:underline">
                View all stays &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedStays.map((stay) => (
                <StayCard key={stay.id} stay={stay} />
              ))}
            </div>
          </div>
        )}

        {/* Related Guides Section */}
        {relatedGuides.length > 0 && (
          <div className="pt-6 border-t border-surface-border space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-orange uppercase tracking-wider">
                  Local Experts
                </span>
                <h2 className="text-2xl font-extrabold text-navy tracking-tight mt-0.5">
                  Guides for {destination.name}
                </h2>
              </div>
              <Link href="/guides" className="text-xs font-bold text-teal hover:underline">
                View all guides &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </div>
        )}

        {/* Related Experiences */}
        {relatedExperiences.length > 0 && (
          <div className="pt-6 border-t border-surface-border space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-nature uppercase tracking-wider">
                  Activities
                </span>
                <h2 className="text-2xl font-extrabold text-navy tracking-tight mt-0.5">
                  Experiences in {destination.name}
                </h2>
              </div>
              <Link href="/experiences" className="text-xs font-bold text-teal hover:underline">
                View all experiences &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedExperiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          </div>
        )}

        {/* Related Travel Articles */}
        {relatedArticles.length > 0 && (
          <div className="pt-6 border-t border-surface-border space-y-6">
            <div>
              <span className="text-xs font-bold text-orange uppercase tracking-wider">
                Inspiration
              </span>
              <h2 className="text-2xl font-extrabold text-navy tracking-tight mt-0.5">
                Related Travel Guides
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((art) => (
                <Link
                  key={art.id}
                  href={`/articles/${art.slug}`}
                  className="p-5 rounded-2xl bg-white border border-surface-border shadow-card hover:shadow-cardHover transition-all flex items-start gap-4"
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-navy-100 shrink-0">
                    <Image
                      src={art.heroImage}
                      alt={art.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <span className="text-[11px] text-surface-muted font-medium">
                      {art.readTimeMinutes} min read &bull; {art.publishedDate}
                    </span>
                    <h3 className="text-sm font-bold text-navy line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-surface-muted line-clamp-2">
                      {art.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
