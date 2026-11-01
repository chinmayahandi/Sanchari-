"use client";

import React, { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Users,
  Home,
  Bed,
  Bath,
  Check,
  Calendar,
  Clock,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Star,
  Info,
  Car,
  Wifi,
  Coffee,
  Utensils,
  Flame,
  Droplets,
  Wind,
  Trees,
  Compass,
} from "lucide-react";
import { STAYS_DATA } from "@/data/stays";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BookingModal } from "@/components/booking/BookingModal";
import { DemoNotice } from "@/components/feedback/DemoNotice";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { MapPlaceholder } from "@/components/common/MapPlaceholder";
import { ImageGallery } from "@/components/common/ImageGallery";
import { DateRangePicker } from "@/components/booking/DateRangePicker";
import { GuestSelector, GuestCounts } from "@/components/booking/GuestSelector";
import { PriceBreakdown } from "@/components/booking/PriceBreakdown";
import { MobileStickyBookingBar } from "@/components/booking/MobileStickyBookingBar";
import { calculateStayPricing } from "@/lib/pricing";
import { formatCurrency } from "@/lib/utils";

// Map amenity strings to appropriate icons
function getAmenityIcon(amenity: string) {
  const lower = amenity.toLowerCase();
  if (lower.includes("wi-fi") || lower.includes("internet")) {
    return <Wifi className="w-4 h-4 text-teal" />;
  }
  if (lower.includes("park") || lower.includes("ev")) {
    return <Car className="w-4 h-4 text-teal" />;
  }
  if (lower.includes("dining") || lower.includes("meal") || lower.includes("breakfast") || lower.includes("restaurant")) {
    return <Utensils className="w-4 h-4 text-teal" />;
  }
  if (lower.includes("kaapi") || lower.includes("coffee") || lower.includes("tea")) {
    return <Coffee className="w-4 h-4 text-teal" />;
  }
  if (lower.includes("campfire") || lower.includes("bonfire")) {
    return <Flame className="w-4 h-4 text-teal" />;
  }
  if (lower.includes("hot water") || lower.includes("geyser") || lower.includes("solar")) {
    return <Droplets className="w-4 h-4 text-teal" />;
  }
  if (lower.includes("conditioning") || lower.includes("ac")) {
    return <Wind className="w-4 h-4 text-teal" />;
  }
  if (lower.includes("walk") || lower.includes("trail") || lower.includes("balcony") || lower.includes("mountain") || lower.includes("plantation")) {
    return <Trees className="w-4 h-4 text-teal" />;
  }
  return <Check className="w-4 h-4 text-forest" />;
}

export default function StayDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const stay = STAYS_DATA.find((s) => s.slug === slug);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guestCounts, setGuestCounts] = useState<GuestCounts>({
    adults: 2,
    children: 0,
    rooms: 1,
  });

  if (!stay) {
    notFound();
  }

  // Calculate pricing breakdown using shared utility
  const pricing = calculateStayPricing(
    stay.indicativePricePerNight,
    checkInDate,
    checkOutDate
  );

  const priceBreakdownItems = [
    {
      label: `${formatCurrency(stay.indicativePricePerNight)} × ${pricing.nightsCount} ${
        pricing.nightsCount === 1 ? "night" : "nights"
      }`,
      amount: pricing.roomSubtotal,
    },
    {
      label: "Heritage property cleaning fee",
      amount: pricing.cleaningFee,
      subtext: "Standard room preparation & sanitization",
    },
    {
      label: "Platform facilitation preview",
      amount: pricing.serviceFee,
      subtext: "3% local host community support",
    },
    {
      label: "Estimated GST (12%)",
      amount: pricing.taxAmount,
      subtext: "Statutory state accommodation tax preview",
    },
  ];

  return (
    <div className="pb-24 lg:pb-16 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: "Homestays & Stays", href: "/stays" },
          { label: stay.name },
        ]}
      />

      {/* Property Introduction Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="teal" size="sm">
              {stay.type}
            </Badge>
            <Badge variant="default" size="sm">
              {stay.region}
            </Badge>
            {stay.demoRating && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{stay.demoRating.toFixed(2)}</span>
                <span className="text-surface-muted font-normal">
                  ({stay.demoReviewsCount} demo reviews)
                </span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-navy tracking-tight">
            {stay.name}
          </h1>

          <p className="flex items-center gap-1.5 text-xs sm:text-sm text-surface-muted">
            <MapPin className="w-4 h-4 text-teal shrink-0" />
            <span>
              {stay.destinationName}, {stay.district} District, Karnataka
            </span>
          </p>
        </div>

        {/* Desktop Quick Rate Display */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-surface-muted block">Indicative Rate (Demo)</span>
            <span className="text-2xl font-black text-navy">
              {formatCurrency(stay.indicativePricePerNight)}
            </span>
            <span className="text-xs text-surface-muted ml-1">/ night</span>
          </div>
          <Button
            size="lg"
            variant="forest"
            onClick={() => setIsBookingOpen(true)}
            leftIcon={<Calendar className="w-4 h-4 text-sunshine" />}
          >
            Enquire Dates
          </Button>
        </div>
      </div>

      {/* Image Gallery with Fullscreen Lightbox */}
      <ImageGallery
        images={stay.gallery}
        title={stay.name}
        badgeText={`${stay.type} • ${stay.district}`}
      />

      <DemoNotice message="Room rates, guest selectors, and calendar dates are presented in demonstration mode. No real payment or inventory reservation is processed." />

      {/* Main Grid: Content & Booking Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Property Details & Guides */}
        <div className="lg:col-span-8 space-y-8">
          {/* Key Property Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white border border-surface-border text-center shadow-sm">
            <div className="p-2">
              <span className="text-[11px] font-semibold text-surface-muted block uppercase tracking-wider">
                Max Capacity
              </span>
              <span className="text-sm sm:text-base font-bold text-navy flex items-center justify-center gap-1.5 mt-0.5">
                <Users className="w-4 h-4 text-teal" />
                {stay.maxGuests} Guests
              </span>
            </div>
            <div className="p-2">
              <span className="text-[11px] font-semibold text-surface-muted block uppercase tracking-wider">
                Bedrooms
              </span>
              <span className="text-sm sm:text-base font-bold text-navy flex items-center justify-center gap-1.5 mt-0.5">
                <Home className="w-4 h-4 text-teal" />
                {stay.bedrooms} {stay.bedrooms === 1 ? "Room" : "Rooms"}
              </span>
            </div>
            <div className="p-2">
              <span className="text-[11px] font-semibold text-surface-muted block uppercase tracking-wider">
                Beds
              </span>
              <span className="text-sm sm:text-base font-bold text-navy flex items-center justify-center gap-1.5 mt-0.5">
                <Bed className="w-4 h-4 text-teal" />
                {stay.beds ?? stay.bedrooms} {stay.beds === 1 ? "Bed" : "Beds"}
              </span>
            </div>
            <div className="p-2">
              <span className="text-[11px] font-semibold text-surface-muted block uppercase tracking-wider">
                Bathrooms
              </span>
              <span className="text-sm sm:text-base font-bold text-navy flex items-center justify-center gap-1.5 mt-0.5">
                <Bath className="w-4 h-4 text-teal" />
                {stay.bathrooms} Private
              </span>
            </div>
          </div>

          {/* About this property */}
          <section className="rounded-2xl bg-white border border-surface-border p-6 shadow-card space-y-3">
            <h2 className="text-lg font-bold text-navy">About This Homestay</h2>
            <p className="text-sm text-surface-muted leading-relaxed">
              {stay.description}
            </p>
          </section>

          {/* Highlights */}
          {stay.highlights && stay.highlights.length > 0 && (
            <section className="rounded-2xl bg-white border border-surface-border p-6 shadow-card space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange" />
                <h2 className="text-lg font-bold text-navy">Stay Highlights</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stay.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-light border border-surface-border text-xs sm:text-sm text-navy"
                  >
                    <span className="w-5 h-5 rounded-full bg-forest text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Sleeping arrangements */}
          {stay.sleepingArrangements && stay.sleepingArrangements.length > 0 && (
            <section className="rounded-2xl bg-white border border-surface-border p-6 shadow-card space-y-4">
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5 text-teal" />
                <h2 className="text-lg font-bold text-navy">Sleeping Arrangements</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stay.sleepingArrangements.map((room, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-surface-border bg-surface-light space-y-1.5"
                  >
                    <span className="text-xs font-bold text-navy block">
                      {room.roomName}
                    </span>
                    <span className="text-xs text-surface-muted flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-teal" />
                      {room.bedType}
                    </span>
                    {room.ensuite && (
                      <span className="inline-block text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Ensuite Bathroom
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Amenities with appropriate icons */}
          <section className="rounded-2xl bg-white border border-surface-border p-6 shadow-card space-y-4">
            <h2 className="text-lg font-bold text-navy">
              Amenities & Local Experiences Included
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stay.amenities.map((amenity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-surface-light border border-surface-border text-xs sm:text-sm text-navy"
                >
                  <span className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    {getAmenityIcon(amenity)}
                  </span>
                  <span className="font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* House Rules, Timings & Cancellation Policy */}
          <section className="rounded-2xl bg-white border border-surface-border p-6 shadow-card space-y-4">
            <h2 className="text-lg font-bold text-navy">Stay Guidelines & House Rules</h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-surface-muted">
              {stay.houseRules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange mt-2 shrink-0" />
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-surface-border grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-surface-light border border-surface-border space-y-1">
                <span className="font-bold text-navy flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-forest" />
                  Check-in / Check-out Timings:
                </span>
                <span className="text-surface-muted block pl-5">
                  Check-in: <strong>{stay.checkInTime}</strong> &bull; Check-out: <strong>{stay.checkOutTime}</strong>
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface-light border border-surface-border space-y-1">
                <span className="font-bold text-navy flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                  Cancellation Terms:
                </span>
                <span className="text-surface-muted block pl-5">
                  {stay.cancellationPolicy}
                </span>
              </div>
            </div>
          </section>

          {/* Nearby Attractions */}
          {stay.nearbyAttractions && stay.nearbyAttractions.length > 0 && (
            <section className="rounded-2xl bg-white border border-surface-border p-6 shadow-card space-y-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-teal" />
                <h2 className="text-lg font-bold text-navy">Nearby Attractions & Distances</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {stay.nearbyAttractions.map((spot, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-surface-light border border-surface-border text-xs"
                  >
                    <span className="font-semibold text-navy truncate pr-2">{spot.name}</span>
                    <span className="font-bold text-forest shrink-0">{spot.distance}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Location Summary Map Placeholder */}
          <div className="pt-2">
            <MapPlaceholder
              locationName={stay.name}
              district={stay.district}
              region={stay.region}
            />
          </div>
        </div>

        {/* Right Column: Desktop Sticky Booking Panel */}
        <aside className="lg:col-span-4 sticky top-24 space-y-5">
          <div className="rounded-2xl bg-white border border-surface-border p-6 shadow-card space-y-5">
            {/* Price Header */}
            <div className="flex items-baseline justify-between border-b border-surface-border pb-4">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-navy">
                  {formatCurrency(stay.indicativePricePerNight)}
                </span>
                <span className="text-xs text-surface-muted ml-1">/ night</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Sample Rate
              </span>
            </div>

            {/* Date Range Picker Component */}
            <DateRangePicker
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onCheckInChange={setCheckInDate}
              onCheckOutChange={setCheckOutDate}
              onReset={() => {
                setCheckInDate("");
                setCheckOutDate("");
              }}
              minNights={1}
            />

            {/* Guest & Room Selector */}
            <GuestSelector
              counts={guestCounts}
              onChange={setGuestCounts}
              maxCapacity={stay.maxGuests}
              maxRooms={stay.bedrooms}
              allowRooms={true}
            />

            {/* Dynamic Transparent Price Breakdown */}
            <PriceBreakdown
              items={priceBreakdownItems}
              total={pricing.totalEstimated}
              totalLabel="Estimated Total (Demo)"
            />

            {/* Continue to Booking CTA */}
            <Button
              variant="forest"
              size="lg"
              className="w-full justify-center shadow-md font-bold text-sm"
              onClick={() => setIsBookingOpen(true)}
              leftIcon={<Calendar className="w-4 h-4 text-sunshine" />}
            >
              Continue to Booking
            </Button>

            <p className="text-[11px] text-surface-muted text-center leading-tight">
              * Phase 3 demonstration interface. Submitting records a preview enquiry without collecting payments.
            </p>
          </div>

          {/* Host Profile Card */}
          <div className="rounded-2xl bg-white border border-surface-border p-5 shadow-sm space-y-3">
            <span className="text-[11px] font-bold text-forest uppercase tracking-wider block">
              Hosted Locally By
            </span>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-forest text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                {stay.hostName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-navy truncate">{stay.hostName}</h4>
                <p className="text-xs text-surface-muted truncate">Verified Local Host</p>
              </div>
            </div>
            <p className="text-xs text-surface-muted leading-relaxed">
              {stay.hostBio ||
                "Speaks Kannada, English & regional dialects. Dedicated to sustainable estate hosting and authentic home dining."}
            </p>
          </div>
        </aside>
      </div>

      {/* Mobile Sticky Booking Bar */}
      <MobileStickyBookingBar
        price={stay.indicativePricePerNight}
        unitLabel="/ night"
        onBookClick={() => setIsBookingOpen(true)}
        subtitle={`${pricing.nightsCount} ${pricing.nightsCount === 1 ? "night" : "nights"} • ${
          guestCounts.adults + guestCounts.children
        } guests`}
        ctaText="Enquire Stay"
      />

      {/* Booking Enquiry Drawer / Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        serviceType="stay"
        serviceId={stay.id}
        serviceTitle={stay.name}
        destinationName={stay.destinationName}
        basePrice={stay.indicativePricePerNight}
        priceUnitLabel="per night"
        maxCapacity={stay.maxGuests}
      />
    </div>
  );
}
