"use client";

import React, { useState, useMemo } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import {
  MapPin,
  Languages,
  Award,
  Clock,
  Calendar,
  Check,
  X,
  Star,
  Users,
  ShieldCheck,
  Sparkles,
  Info,
  MapPinned,
  ChevronRight,
} from "lucide-react";
import { GUIDES_DATA } from "@/data/guides";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BookingModal } from "@/components/booking/BookingModal";
import { DemoNotice } from "@/components/feedback/DemoNotice";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { TimeSlotPicker, TimeSlot } from "@/components/booking/TimeSlotPicker";
import { PriceBreakdown } from "@/components/booking/PriceBreakdown";
import { MobileStickyBookingBar } from "@/components/booking/MobileStickyBookingBar";
import { calculateGuidePricing } from "@/lib/pricing";
import { formatCurrency, cn } from "@/lib/utils";

export default function GuideDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const guide = GUIDES_DATA.find((g) => g.slug === slug);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [participantsCount, setParticipantsCount] = useState(2);
  const [selectedTourIndex, setSelectedTourIndex] = useState(0);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>("slot-morning");

  if (!guide) {
    notFound();
  }

  const selectedTour = guide.sampleTours[selectedTourIndex] ?? guide.sampleTours[0];

  // Dynamic sample slots based on the guide's rates
  const availableSlots: TimeSlot[] = useMemo(() => {
    return [
      {
        id: "slot-morning",
        timeRange: "07:30 AM – 10:30 AM",
        slotTitle: "Morning Heritage & Archaeology Walk",
        duration: "3 hours",
        rate: Math.round(guide.indicativeDayRate * 0.55),
        isAvailable: true,
        remainingCapacity: 6,
      },
      {
        id: "slot-afternoon",
        timeRange: "03:30 PM – 06:45 PM",
        slotTitle: "Golden Hour Sunset & Architectural Trail",
        duration: "3.25 hours",
        rate: Math.round(guide.indicativeDayRate * 0.55),
        isAvailable: true,
        remainingCapacity: 4,
      },
      {
        id: "slot-fullday",
        timeRange: "08:30 AM – 05:00 PM",
        slotTitle: "Full-Day Comprehensive Expedition",
        duration: "8 hours (incl. meal break)",
        rate: guide.indicativeDayRate,
        isAvailable: true,
        remainingCapacity: 2,
      },
    ];
  }, [guide.indicativeDayRate]);

  const activeSlot = availableSlots.find((s) => s.id === selectedSlotId) ?? availableSlots[0];
  const effectiveRate = activeSlot?.rate ?? guide.indicativeDayRate;

  // Shared price calculation
  const pricing = calculateGuidePricing(guide.indicativeDayRate, effectiveRate, 1);

  const priceBreakdownItems = [
    {
      label: activeSlot ? activeSlot.slotTitle : "Guided Session Fee",
      amount: pricing.subtotal,
      subtext: `Dedicated guidance for up to ${participantsCount} participants`,
    },
    {
      label: "Estimated Service Tax (5% GST)",
      amount: pricing.taxAmount,
      subtext: "Statutory tour facilitation rate",
    },
  ];

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="pb-24 lg:pb-16 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: "Tour Guides", href: "/guides" },
          { label: guide.name },
        ]}
      />

      {/* Guide Profile Banner Card */}
      <div className="rounded-2xl bg-white border border-surface-border p-6 sm:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar with fallback */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-navy-100 shrink-0 border-2 border-surface-border shadow-md">
            <Image
              src={guide.avatar}
              alt={guide.name}
              fill
              priority
              sizes="112px"
              className="object-cover"
            />
          </div>

          {/* Bio & Credentials */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="teal" size="sm">
                Licensed Regional Guide
              </Badge>
              <Badge variant="default" size="sm">
                {guide.yearsExperience} Years Experience
              </Badge>
              {guide.demoRating && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{guide.demoRating.toFixed(2)}</span>
                  <span className="text-surface-muted font-normal">
                    ({guide.demoReviewsCount} demo reviews)
                  </span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
              {guide.name}
            </h1>

            <p className="flex items-center gap-1.5 text-xs sm:text-sm text-surface-muted">
              <MapPin className="w-4 h-4 text-teal shrink-0" />
              <span>
                {guide.location} ({guide.district} District, Karnataka)
              </span>
            </p>

            <div className="flex items-center gap-1.5 text-xs text-surface-muted flex-wrap">
              <Languages className="w-3.5 h-3.5 text-teal" />
              <span className="font-semibold text-navy">Spoken Languages:</span>
              <div className="flex flex-wrap gap-1">
                {guide.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-2 py-0.5 rounded-md bg-navy-50 text-navy text-[11px] font-semibold border border-navy-100"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Rate & Action */}
          <div className="sm:text-right shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-surface-border w-full sm:w-auto">
            <span className="text-xs text-surface-muted block">Indicative Day Rate</span>
            <span className="text-2xl sm:text-3xl font-black text-navy">
              {formatCurrency(guide.indicativeDayRate)}
            </span>
            <span className="text-xs text-surface-muted ml-1">/ day (demo)</span>
            <div className="mt-3">
              <Button
                variant="forest"
                size="md"
                onClick={() => setIsBookingOpen(true)}
                leftIcon={<Calendar className="w-4 h-4 text-sunshine" />}
              >
                Request Booking
              </Button>
            </div>
          </div>
        </div>
      </div>

      <DemoNotice message="This guide profile illustrates the Sanchari local storytellers directory using demonstration content. Verified license numbers and real schedules will be integrated in future phases." />

      {/* Main Grid: Details & Availability Scheduling */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Bio, Expertise & Tour Offerings */}
        <div className="lg:col-span-8 space-y-8">
          {/* Biography */}
          <section className="rounded-2xl bg-white border border-surface-border p-6 shadow-card space-y-3">
            <h2 className="text-lg font-bold text-navy">About {guide.name}</h2>
            <p className="text-sm text-surface-muted leading-relaxed">
              {guide.bio}
            </p>
          </section>

          {/* Specializations */}
          <section className="rounded-2xl bg-white border border-surface-border p-6 shadow-card space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-forest" />
              <h2 className="text-lg font-bold text-navy">Specializations & Domain Knowledge</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {guide.expertise.map((exp, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-light border border-surface-border text-xs sm:text-sm font-medium text-navy"
                >
                  <span className="w-5 h-5 rounded-full bg-forest text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                  <span>{exp}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tour Itineraries & Offerings */}
          <section className="rounded-2xl bg-white border border-surface-border p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-navy">Curated Tour Offerings</h2>
              <span className="text-xs text-surface-muted">Click to preview schedule</span>
            </div>

            <div className="space-y-3">
              {guide.sampleTours.map((tour, idx) => {
                const isSelected = selectedTourIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedTourIndex(idx)}
                    className={cn(
                      "p-5 rounded-2xl border transition-all cursor-pointer space-y-3",
                      isSelected
                        ? "bg-forest-50/50 border-forest ring-1 ring-forest shadow-sm"
                        : "bg-surface-light border-surface-border hover:border-forest/40"
                    )}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-forest uppercase tracking-wider">
                          Tour Option {idx + 1}
                        </span>
                        <h3 className="text-base font-bold text-navy">{tour.title}</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-surface-border text-xs font-semibold text-navy">
                          <Clock className="w-3.5 h-3.5 text-teal" />
                          {tour.duration}
                        </span>
                        <span className="text-sm font-black text-navy">
                          {formatCurrency(tour.indicativeRate)}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
                      {tour.description}
                    </p>

                    {tour.meetingPoint && (
                      <div className="flex items-center gap-1.5 text-xs text-navy font-medium pt-1">
                        <MapPinned className="w-3.5 h-3.5 text-teal" />
                        <span>Meeting point: <strong>{tour.meetingPoint}</strong></span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Inclusions, Exclusions & Meeting Spot */}
          <section className="rounded-2xl bg-white border border-surface-border p-6 shadow-card space-y-5">
            <h2 className="text-lg font-bold text-navy">Tour Logistics & Inclusions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2.5">
                  Included in Guided Session
                </h3>
                <ul className="space-y-2 text-xs text-surface-muted">
                  {(guide.included ?? [
                    "Direct licensed local guide commentary",
                    "Cultural and archaeological storytelling",
                    "Tailored walking pace for photography",
                  ]).map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-2.5">
                  Not Included
                </h3>
                <ul className="space-y-2 text-xs text-surface-muted">
                  {(guide.excluded ?? [
                    "ASI entry tickets or shrine access passes",
                    "Personal vehicle transit between locations",
                    "Meals and bottled drinks",
                  ]).map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-surface-border text-xs text-surface-muted space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-navy">
                <ShieldCheck className="w-4 h-4 text-forest" />
                <span>Cancellation & Weather Policy:</span>
              </div>
              <p className="pl-5 leading-relaxed">
                {guide.cancellationPolicy ||
                  "Free cancellation up to 24 hours prior to tour departure time. In case of extreme weather, alternative indoor monument circuits will be coordinated."}
              </p>
            </div>
          </section>
        </div>

        {/* Right Column: Interactive Scheduling & Price Panel */}
        <aside className="lg:col-span-4 sticky top-24 space-y-5">
          <div className="rounded-2xl bg-white border border-surface-border p-6 shadow-card space-y-5">
            <div className="flex items-baseline justify-between border-b border-surface-border pb-4">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-navy">
                  {formatCurrency(effectiveRate)}
                </span>
                <span className="text-xs text-surface-muted ml-1">/ session (demo)</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Demo Slot
              </span>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-[11px] font-bold text-navy uppercase tracking-wider mb-1">
                Select Tour Date
              </label>
              <input
                type="date"
                min={todayStr}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-surface-border bg-surface-light focus:bg-white focus:outline-none focus:ring-2 focus:ring-forest text-navy cursor-pointer transition-all"
                aria-label="Tour date"
              />
            </div>

            {/* Interactive TimeSlotPicker */}
            <TimeSlotPicker
              slots={availableSlots}
              selectedSlotId={selectedSlotId}
              onSelectSlot={(slot) => setSelectedSlotId(slot.id)}
              selectedDateText={selectedDate}
            />

            {/* Participants Selector */}
            <div>
              <label className="block text-[11px] font-bold text-navy uppercase tracking-wider mb-1">
                Number of Participants
              </label>
              <div className="flex items-center justify-between p-2.5 rounded-xl border border-surface-border bg-surface-light">
                <span className="text-xs font-semibold text-navy">
                  {participantsCount} {participantsCount === 1 ? "Person" : "People"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setParticipantsCount((prev) => Math.max(1, prev - 1))}
                    disabled={participantsCount <= 1}
                    className="w-6 h-6 rounded-md bg-white border border-surface-border flex items-center justify-center text-xs font-bold text-navy disabled:opacity-40"
                    aria-label="Decrease participants"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => setParticipantsCount((prev) => Math.min(10, prev + 1))}
                    disabled={participantsCount >= 10}
                    className="w-6 h-6 rounded-md bg-white border border-surface-border flex items-center justify-center text-xs font-bold text-navy disabled:opacity-40"
                    aria-label="Increase participants"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <PriceBreakdown
              items={priceBreakdownItems}
              total={pricing.totalEstimated}
              totalLabel="Estimated Total (Demo)"
            />

            {/* Action CTA */}
            <Button
              variant="forest"
              size="lg"
              className="w-full justify-center shadow-md font-bold text-sm"
              onClick={() => setIsBookingOpen(true)}
              leftIcon={<Calendar className="w-4 h-4 text-sunshine" />}
            >
              Continue with {guide.name.split(" ")[0]}
            </Button>

            <p className="text-[11px] text-surface-muted text-center leading-tight">
              * Demonstration booking preview. Transmits mock itinerary requirements without real financial processing.
            </p>
          </div>

          {/* Guide Charter Notice */}
          <div className="rounded-2xl bg-white border border-surface-border p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-forest" />
              Sanchari Guide Charter
            </h3>
            <ul className="space-y-2 text-xs text-surface-muted leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-forest font-bold">&bull;</span>
                <span>Licensed regional specialists with factual historical storytelling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-forest font-bold">&bull;</span>
                <span>Strict adherence to Archaeological Survey of India (ASI) site etiquette</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-forest font-bold">&bull;</span>
                <span>Zero commission-pressure at souvenir and handicraft emporiums</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Mobile Sticky Booking Bar */}
      <MobileStickyBookingBar
        price={effectiveRate}
        unitLabel="/ session"
        onBookClick={() => setIsBookingOpen(true)}
        subtitle={`${selectedDate} • ${activeSlot?.slotTitle || "Selected Tour"}`}
        ctaText="Book Guide"
      />

      {/* Booking Enquiry Drawer */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        serviceType="guide"
        serviceId={guide.id}
        serviceTitle={`${guide.name} — ${selectedTour.title}`}
        destinationName={guide.location}
        basePrice={effectiveRate}
        priceUnitLabel="per session"
        maxCapacity={10}
      />
    </div>
  );
}
