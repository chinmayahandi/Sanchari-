import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  TreePine,
  Landmark,
  Home,
  Users,
  HeartHandshake,
  BookOpen,
  Calendar,
  PhoneCall,
} from "lucide-react";
import { HeroSearch } from "@/components/search/HeroSearch";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { StayCard } from "@/components/stays/StayCard";
import { GuideCard } from "@/components/guides/GuideCard";
import { ExperienceCard } from "@/components/experiences/ExperienceCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DemoNotice } from "@/components/feedback/DemoNotice";
import { DESTINATIONS_DATA } from "@/data/destinations";
import { STAYS_DATA } from "@/data/stays";
import { GUIDES_DATA } from "@/data/guides";
import { EXPERIENCES_DATA } from "@/data/experiences";
import { ARTICLES_DATA } from "@/data/articles";
import { CATEGORIES_DATA } from "@/data/categories";

export default function HomePage() {
  const popularDestinations = DESTINATIONS_DATA.filter((d) => d.featured);
  const featuredStays = STAYS_DATA.slice(0, 3);
  const featuredGuides = GUIDES_DATA.slice(0, 3);
  const featuredExperiences = EXPERIENCES_DATA.slice(0, 3);
  const travelArticles = ARTICLES_DATA.slice(0, 4);

  return (
    <div className="flex flex-col space-y-16 sm:space-y-24 pb-16">
      {/* ==================================================== */}
      {/* HERO SECTION                                         */}
      {/* ==================================================== */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-navy-950">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-karnataka-landmarks.jpg"
            alt="Scenic Karnataka tourist destinations including Hampi Stone Chariot, Mysuru Palace, Western Ghats waterfalls and Gokarna coast"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-55 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/75 via-navy-950/50 to-navy-950/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-orange" />
            <span>Discover Karnataka. Your Way.</span>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Discover Karnataka,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-amber-200">
                Beyond the Ordinary.
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-navy-100 max-w-2xl mx-auto leading-relaxed">
              Find beautiful places, welcoming stays, local guides and memorable
              experiences across Karnataka.
            </p>
          </div>

          {/* Search Box */}
          <div className="pt-2">
            <HeroSearch />
          </div>

          {/* Value Props Row */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-navy-200 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              8 Historic & Nature Hubs
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              Verified Local Homestays
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-nature-400" />
              Licensed Archaeological Guides
            </span>
          </div>
        </div>
      </section>

      {/* Global Demonstration Notice */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-6 sm:-mt-10 relative z-20">
        <DemoNotice message="This website is a complete frontend demonstration. Listings, guide profiles, and price quotations represent curated Karnataka sample data." />
      </div>

      {/* ==================================================== */}
      {/* POPULAR DESTINATIONS                                  */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-teal uppercase tracking-wider">
              Iconic Locations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight mt-1">
              Popular Karnataka Destinations
            </h2>
            <p className="text-xs sm:text-sm text-surface-muted mt-1 max-w-xl">
              From the boulder-strewn ruins of Vijayanagara to misty coffee valleys and sacred coastlines.
            </p>
          </div>
          <Link href="/destinations" className="shrink-0">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All 8 Destinations
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {DESTINATIONS_DATA.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      </section>

      {/* ==================================================== */}
      {/* EXPLORE BY CATEGORY                                  */}
      {/* ==================================================== */}
      <section className="bg-white py-16 border-y border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-orange uppercase tracking-wider">
              Curated Travel Styles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight mt-1">
              Explore by Category
            </h2>
            <p className="text-xs sm:text-sm text-surface-muted mt-1.5 leading-relaxed">
              Find travel itineraries tailored to your passion—whether architectural history, outdoor treks, or authentic Malnad food.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {CATEGORIES_DATA.map((cat) => (
              <Link
                key={cat.id}
                href={`/destinations?cat=${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-navy-900 border border-surface-border shadow-sm hover:shadow-cardHover transition-all flex flex-col justify-end p-4 text-left"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />

                <div className="relative z-10">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-orange transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-navy-200 line-clamp-1 mt-1 opacity-90 hidden sm:block">
                    {cat.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* STAYS & HOMESTAYS                                    */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-teal uppercase tracking-wider">
              Welcoming Accommodations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight mt-1">
              Homestays & Plantation Estates
            </h2>
            <p className="text-xs sm:text-sm text-surface-muted mt-1 max-w-xl">
              Immerse yourself in ancestral hospitality with Kodava estate houses, riverside chalets, and heritage courtyards.
            </p>
          </div>
          <Link href="/stays" className="shrink-0">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Browse All Stays
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStays.map((stay) => (
            <StayCard key={stay.id} stay={stay} />
          ))}
        </div>
      </section>

      {/* ==================================================== */}
      {/* LOCAL EXPERIENCES                                    */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-orange uppercase tracking-wider">
              Living Heritage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight mt-1">
              Curated Cultural Experiences
            </h2>
            <p className="text-xs sm:text-sm text-surface-muted mt-1 max-w-xl">
              Coffee cupping sessions, dawn boulder photography in Hampi, and century-old market food walks.
            </p>
          </div>
          <Link href="/experiences" className="shrink-0">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore Experiences
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredExperiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </section>

      {/* ==================================================== */}
      {/* LOCAL GUIDES                                         */}
      {/* ==================================================== */}
      <section className="bg-surface-light border-y border-surface-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-teal uppercase tracking-wider">
                Local Storytellers
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight mt-1">
                Meet Licensed Local Guides
              </h2>
              <p className="text-xs sm:text-sm text-surface-muted mt-1 max-w-xl">
                Passionate historians, epigraphists, and Western Ghats naturalists who bring Karnataka&apos;s wonders alive.
              </p>
            </div>
            <Link href="/guides" className="shrink-0">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All Guides
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* WHY CHOOSE SANCHARI                                  */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-teal uppercase tracking-wider">
            Our Purpose
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight mt-1">
            Why Discover Karnataka with Sanchari
          </h2>
          <p className="text-xs sm:text-sm text-surface-muted mt-2 leading-relaxed">
            Designed to bridge responsible travelers with authentic local hosts and knowledgeable guides.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white border border-surface-border p-6 shadow-card hover:shadow-cardHover transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal flex items-center justify-center mb-4">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-navy mb-2">
              Discover Lesser-Known Destinations
            </h3>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Venture beyond typical tourist spots to uncover early Chalukya temples in Badami, secluded Malpe island rocks, and tranquil Malnad backwaters.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-surface-border p-6 shadow-card hover:shadow-cardHover transition-all">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange flex items-center justify-center mb-4">
              <Home className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-navy mb-2">
              Find Authentic Homestays & Stays
            </h3>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Stay directly on active coffee plantations and ancestral mansions, enjoying genuine home-cooked meals prepared with regional spices.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-surface-border p-6 shadow-card hover:shadow-cardHover transition-all">
            <div className="w-12 h-12 rounded-xl bg-nature-50 text-nature flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-navy mb-2">
              Support Local Guides & Communities
            </h3>
            <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
              Connect directly with verified local guides and cultural practitioners, ensuring tourism directly benefits local Karnataka families.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* TRAVEL INSPIRATION (EDITORIAL)                       */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-orange uppercase tracking-wider">
              Editorial & Itineraries
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight mt-1">
              Travel Inspiration
            </h2>
            <p className="text-xs sm:text-sm text-surface-muted mt-1 max-w-xl">
              Curated guides, weekend routes, and architectural walk-throughs across Karnataka.
            </p>
          </div>
          <Link href="/articles" className="shrink-0">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Read All Articles
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelArticles.map((art) => (
            <Link
              key={art.id}
              href={`/articles/${art.slug}`}
              className="group rounded-2xl bg-white border border-surface-border shadow-card hover:shadow-cardHover transition-all duration-300 overflow-hidden flex flex-col h-full"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
                <Image
                  src={art.heroImage}
                  alt={art.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-surface-muted mb-1.5 font-medium">
                    <span>{art.publishedDate}</span>
                    <span>&bull;</span>
                    <span>{art.readTimeMinutes} min read</span>
                  </div>
                  <h3 className="text-sm font-bold text-navy group-hover:text-teal transition-colors line-clamp-2 leading-snug mb-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-surface-muted line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-surface-border flex items-center justify-between text-xs font-bold text-teal mt-3">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================================================== */}
      {/* TRAVEL SAFETY & ADVISORY INFORMATION                 */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl bg-surface-ivory border border-sunshine/40 p-8 sm:p-10 shadow-card">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-50 text-forest text-xs font-bold mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald" />
                <span>Travel Safety & Responsible Tourism</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
                Karnataka Travel Safety & Advisory
              </h2>
              <p className="text-xs sm:text-sm text-surface-muted mt-1 max-w-2xl leading-relaxed">
                Essential guidelines for exploring Karnataka&apos;s diverse terrains, archaeological heritage sites, and Western Ghats forest reserves safely.
              </p>
            </div>
            <Link href="/help">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Visit Travel Help Center
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-white border border-surface-border shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest flex items-center justify-center font-bold">
                <TreePine className="w-5 h-5 text-forest" />
              </div>
              <h3 className="text-sm font-bold text-navy">Western Ghats & Monsoons</h3>
              <p className="text-xs text-surface-muted leading-relaxed">
                Monsoons (June–Sept) bring lush waterfalls but require cautious mountain driving on Shiradi and Charmadi ghats. Carry rainproof gear and leech protection on coffee trails.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-surface-border shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-sunshine-50 text-sunshine-900 flex items-center justify-center font-bold">
                <Landmark className="w-5 h-5 text-terracotta" />
              </div>
              <h3 className="text-sm font-bold text-navy">Archaeological Heritage Etiquette</h3>
              <p className="text-xs text-surface-muted leading-relaxed">
                Hampi, Badami, and Pattadakal are protected ASI World Heritage monuments. Avoid leaning or carving on ancient stone masonry; licensed guides ensure accurate historical context.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-surface-border shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                <Home className="w-5 h-5 text-emerald" />
              </div>
              <h3 className="text-sm font-bold text-navy">Homestay Security & Standards</h3>
              <p className="text-xs text-surface-muted leading-relaxed">
                Sanchari profiles authentic family-run homestays adhering to Karnataka Tourism regulatory guidelines, featuring verified hosts, secure perimeters, and clean home-cooked dining.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-surface-border shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center font-bold">
                <PhoneCall className="w-5 h-5 text-sky-600" />
              </div>
              <h3 className="text-sm font-bold text-navy">Emergency Helpline Contacts</h3>
              <p className="text-xs text-surface-muted leading-relaxed">
                Keep these Karnataka 24/7 helplines saved: <strong>112</strong> (All Emergencies), <strong>1363</strong> (Karnataka Tourism Info), <strong>108</strong> (Medical Ambulance), <strong>1090</strong> (Women&apos;s Safety).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* PARTNER INVITATION                                   */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl bg-navy text-white p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-2xl">
          {/* Subtle background embellishment */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-orange text-xs font-semibold">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>For Homestay Owners, Guides & Experience Providers</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Share Your Place With the World.
            </h2>
            <p className="text-sm sm:text-base text-navy-100 leading-relaxed">
              Are you a homestay host, licensed archaeological guide, or cultural workshop instructor in Karnataka?
              Join Sanchari to present your services to travelers who value local heritage and authentic hospitality.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link href="/partners" className="w-full sm:w-auto">
                <Button variant="orange" size="lg" className="w-full justify-center">
                  Learn How to Partner
                </Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full justify-center border-white/30 text-white bg-transparent hover:bg-white/10">
                  About Our Platform
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* FINAL CALL TO ACTION                                 */}
      {/* ==================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
          Ready to Plan Your Karnataka Journey?
        </h2>
        <p className="text-xs sm:text-sm text-surface-muted max-w-lg mx-auto leading-relaxed">
          Explore curated destinations, discover welcoming local homestays, or connect with expert heritage guides today.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Link href="/destinations">
            <Button variant="primary" size="md">
              Explore Destinations
            </Button>
          </Link>
          <Link href="/stays">
            <Button variant="outline" size="md">
              Browse Stays
            </Button>
          </Link>
          <Link href="/guides">
            <Button variant="outline" size="md">
              Find Guides
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
