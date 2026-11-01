"use client";

import React, { useState } from "react";
import { Calendar, Users, Mail, Phone, User, CheckCircle2, ShieldAlert, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/ToastProvider";
import { formatCurrency } from "@/lib/utils";
import { validateBookingForm } from "@/lib/validation";
import {
  calculateStayPricing,
  calculateGuidePricing,
  calculateExperiencePricing,
} from "@/lib/pricing";

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: "stay" | "guide" | "experience";
  serviceTitle: string;
  serviceId: string;
  destinationName: string;
  basePrice: number; // Night rate, Day rate, or Person rate
  priceUnitLabel: string; // "per night", "per day", "per person"
  maxCapacity?: number;
}

export function BookingModal({
  isOpen,
  onClose,
  serviceType,
  serviceTitle,
  destinationName,
  basePrice,
  priceUnitLabel,
  maxCapacity = 6,
}: BookingModalProps) {
  const { addToast } = useToast();
  const [step, setStep] = useState<"details" | "review" | "confirmed">("details");

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guestsCount, setGuestsCount] = useState(2);
  const [specialRequests, setSpecialRequests] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculations using shared pricing module
  const calculateTotal = () => {
    if (serviceType === "stay") {
      const p = calculateStayPricing(basePrice, startDate, endDate);
      return {
        units: p.nightsCount,
        unitName: p.nightsCount === 1 ? "night" : "nights",
        subtotal: p.roomSubtotal,
        cleaningFee: p.cleaningFee,
        serviceFee: p.serviceFee,
        taxes: p.taxAmount,
        total: p.totalEstimated,
      };
    } else if (serviceType === "experience") {
      const p = calculateExperiencePricing(basePrice, guestsCount);
      return {
        units: p.participantsCount,
        unitName: p.participantsCount === 1 ? "participant" : "participants",
        subtotal: p.subtotal,
        cleaningFee: 0,
        serviceFee: p.serviceFee,
        taxes: p.taxAmount,
        total: p.totalEstimated,
      };
    } else {
      // Guide
      const p = calculateGuidePricing(basePrice, undefined, 1);
      return {
        units: p.durationDays,
        unitName: "session",
        subtotal: p.subtotal,
        cleaningFee: 0,
        serviceFee: 0,
        taxes: p.taxAmount,
        total: p.totalEstimated,
      };
    }
  };

  const pricing = calculateTotal();

  const handleNextToReview = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingForm({
      fullName,
      email,
      phone,
      startDate,
      guestsCount,
    });

    if (serviceType === "stay" && !endDate) {
      validation.errors.endDate = "Please select a checkout date.";
      validation.isValid = false;
    }

    if (!agreedToTerms) {
      validation.errors.terms = "You must acknowledge the demonstration terms.";
      validation.isValid = false;
    }

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setStep("review");
  };

  const handleConfirmDemonstration = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("confirmed");
      addToast({
        type: "info",
        title: "Demonstration Enquiry Recorded",
        message: `Your sample request for ${serviceTitle} was simulated successfully.`,
      });
    }, 700);
  };

  const handleResetAndClose = () => {
    setStep("details");
    setFullName("");
    setEmail("");
    setPhone("");
    setStartDate("");
    setEndDate("");
    setSpecialRequests("");
    setAgreedToTerms(false);
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      title={
        step === "confirmed"
          ? "Demonstration Enquiry Summary"
          : step === "review"
          ? "Review Enquiry Details"
          : `Plan Your Booking Enquiry`
      }
      description={
        step === "confirmed"
          ? "Demonstration mode only — no transaction has occurred"
          : `${serviceTitle} • ${destinationName}`
      }
      maxWidth="lg"
    >
      {/* Demonstration Banner */}
      <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200/90 text-xs text-amber-900 flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <strong>Demonstration Interface:</strong> All pricing and inquiries are simulated with local sample data.
          No real charges or reservations occur.
        </p>
      </div>

      {/* STEP 1: Details Form */}
      {step === "details" && (
        <form onSubmit={handleNextToReview} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Full Name"
              placeholder="e.g. Ramesh Hegde"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={errors.fullName}
              leftIcon={<User className="w-4 h-4" />}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              leftIcon={<Mail className="w-4 h-4" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Mobile Number (India)"
              placeholder="e.g. 9845012345"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
              leftIcon={<Phone className="w-4 h-4" />}
            />

            <div>
              <label className="block text-xs font-semibold text-surface-text mb-1.5">
                {serviceType === "experience" ? "Participants" : "Guests Count"}
              </label>
              <div className="relative flex items-center">
                <Users className="w-4 h-4 text-surface-muted absolute left-3 pointer-events-none" />
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-surface-border bg-white focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Person" : "Persons"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label={serviceType === "stay" ? "Check-in Date" : "Preferred Date"}
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              error={errors.startDate}
              leftIcon={<Calendar className="w-4 h-4" />}
            />

            {serviceType === "stay" && (
              <Input
                label="Check-out Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                error={errors.endDate}
                leftIcon={<Calendar className="w-4 h-4" />}
              />
            )}
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs font-semibold text-surface-text mb-1.5">
              Special Requests or Dietary Preferences (Optional)
            </label>
            <textarea
              rows={2}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="e.g. Pure vegetarian meals, late arrival, ground floor room..."
              className="w-full rounded-lg border border-surface-border p-2.5 text-sm text-surface-text focus:outline-none focus:ring-2 focus:ring-teal"
            />
          </div>

          {/* Pricing Preview Box */}
          <div className="p-3.5 rounded-xl bg-surface-light border border-surface-border flex items-center justify-between">
            <div>
              <span className="text-xs text-surface-muted block">
                Indicative Estimate ({pricing.units} {pricing.unitName})
              </span>
              <span className="text-base font-bold text-navy">
                {formatCurrency(pricing.total)}
              </span>
              <span className="text-[10px] text-surface-muted block">
                (Inclusive of illustrative taxes)
              </span>
            </div>
            <span className="text-xs font-medium text-teal px-2 py-1 bg-teal-50 rounded-lg">
              {formatCurrency(basePrice)} {priceUnitLabel}
            </span>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="terms-check"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 rounded border-surface-border text-teal focus:ring-teal"
            />
            <label htmlFor="terms-check" className="text-xs text-surface-muted leading-tight">
              I understand this is a demonstration inquiry form. No actual booking will be finalized.
            </label>
          </div>
          {errors.terms && (
            <p className="text-xs text-rose-600 font-medium">{errors.terms}</p>
          )}

          <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-surface-border">
            <Button type="button" variant="ghost" onClick={handleResetAndClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Review Enquiry
            </Button>
          </div>
        </form>
      )}

      {/* STEP 2: Review Step */}
      {step === "review" && (
        <div className="space-y-4">
          <div className="rounded-xl bg-surface-light border border-surface-border p-4 space-y-3">
            <div className="flex justify-between text-xs pb-2 border-b border-surface-border">
              <span className="text-surface-muted">Service:</span>
              <span className="font-semibold text-navy text-right">{serviceTitle}</span>
            </div>
            <div className="flex justify-between text-xs pb-2 border-b border-surface-border">
              <span className="text-surface-muted">Destination:</span>
              <span className="font-medium text-navy">{destinationName}</span>
            </div>
            <div className="flex justify-between text-xs pb-2 border-b border-surface-border">
              <span className="text-surface-muted">Traveler:</span>
              <span className="font-medium text-navy">{fullName} ({phone})</span>
            </div>
            <div className="flex justify-between text-xs pb-2 border-b border-surface-border">
              <span className="text-surface-muted">Date:</span>
              <span className="font-medium text-navy">
                {startDate} {endDate ? `to ${endDate}` : ""}
              </span>
            </div>
            <div className="flex justify-between text-xs pb-2 border-b border-surface-border">
              <span className="text-surface-muted">Group Size:</span>
              <span className="font-medium text-navy">{guestsCount} Persons</span>
            </div>
            {specialRequests && (
              <div className="flex justify-between text-xs pb-2 border-b border-surface-border">
                <span className="text-surface-muted">Requests:</span>
                <span className="font-medium text-navy italic">{specialRequests}</span>
              </div>
            )}
            {/* Price breakdown */}
            <div className="pt-2 space-y-1.5 text-xs">
              <div className="flex justify-between text-surface-muted">
                <span>Base ({pricing.units} {pricing.unitName}):</span>
                <span>{formatCurrency(pricing.subtotal)}</span>
              </div>
              <div className="flex justify-between text-surface-muted">
                <span>Estimated Taxes & Service (Sample):</span>
                <span>{formatCurrency(pricing.taxes)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-navy pt-1 border-t border-surface-border">
                <span>Indicative Total:</span>
                <span>{formatCurrency(pricing.total)}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between border-t border-surface-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("details")}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Edit
            </Button>
            <Button
              type="button"
              variant="orange"
              isLoading={isSubmitting}
              onClick={handleConfirmDemonstration}
              rightIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Submit Demo Enquiry
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: Honest Demonstration Confirmation */}
      {step === "confirmed" && (
        <div className="text-center py-4 space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-navy">
              Simulated Demonstration Complete
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-surface-muted max-w-md mx-auto leading-relaxed">
              This request was successfully processed by the frontend demonstration engine.
              Because this website is in prototype/demo mode, <strong>no message has been transmitted</strong> to any actual homestay, guide, or tour provider.
            </p>
          </div>

          <div className="p-3.5 bg-navy-50 rounded-xl text-left text-xs text-navy-800 space-y-1">
            <div className="font-semibold text-navy">Simulated Reference:</div>
            <div>Reference Code: <code className="font-mono font-bold">DEMO-{Math.floor(100000 + Math.random() * 900000)}</code></div>
            <div>Service: {serviceTitle}</div>
            <div>Contact: {email}</div>
          </div>

          <div className="pt-4 flex justify-center">
            <Button variant="primary" onClick={handleResetAndClose}>
              Done & Return to Browsing
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
