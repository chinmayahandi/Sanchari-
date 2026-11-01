"use client";

import React, { useState } from "react";
import { User, Building, Mail, Phone, MapPin, CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/ToastProvider";
import { validatePartnerForm } from "@/lib/validation";

const KARNATAKA_DISTRICTS = [
  "Bagalkot", "Ballari (Bellary)", "Belagavi (Belgaum)", "Bengaluru Rural", "Bengaluru Urban",
  "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga",
  "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan",
  "Haveri", "Kalaburagi (Gulbarga)", "Kodagu (Coorg)", "Kolar", "Koppal",
  "Mandya", "Mysuru (Mysore)", "Raichur", "Ramanagara", "Shivamogga (Shimoga)",
  "Tumakuru (Tumkur)", "Udupi", "Uttara Kannada", "Vijayanagara", "Vijayapura (Bijapur)", "Yadgir"
];

export function PartnerForm() {
  const { addToast } = useToast();
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState<
    "Homestay Owner" | "Local Guide" | "Tour Operator" | "Cultural Experience Provider" | "Local Tourism Business"
  >("Homestay Owner");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("Kodagu (Coorg)");
  const [description, setDescription] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validatePartnerForm({
      fullName,
      businessName,
      email,
      phone,
      district,
      description,
      agreedToTerms,
    });

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      addToast({
        type: "success",
        title: "Application Received (Demonstration)",
        message: "Your partner interest profile has been processed in demonstration mode.",
      });
    }, 800);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-2xl bg-white border border-surface-border p-8 shadow-card text-center max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-navy mb-2">
          Partner Application Simulated
        </h3>
        <p className="text-sm text-surface-muted leading-relaxed mb-6">
          Thank you for showcasing your tourism service! Because Sanchari is currently running as a
          <strong> frontend prototype</strong>, your details have not been transmitted to a live verification server.
          The interface is structured for seamless integration with upcoming backend workflows.
        </p>
        <div className="p-4 rounded-xl bg-navy-50 text-left text-xs text-navy-800 mb-6 space-y-1">
          <div><strong>Registered Entity:</strong> {businessName}</div>
          <div><strong>Category:</strong> {category}</div>
          <div><strong>District:</strong> {district}</div>
          <div><strong>Representative:</strong> {fullName} ({email})</div>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setIsSubmitted(false);
            setFullName("");
            setBusinessName("");
            setDescription("");
            setPhone("");
            setEmail("");
            setAgreedToTerms(false);
          }}
        >
          Submit Another Demonstration Entry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white border border-surface-border p-6 sm:p-8 shadow-card max-w-2xl mx-auto space-y-5"
    >
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/90 text-xs text-amber-950 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <strong>Notice:</strong> This form demonstrates the partner registration experience for Karnataka hosts, guides, and operators.
          Submissions are simulated on the frontend.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Full Name"
          placeholder="e.g. Anand Hegde"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={errors.fullName}
          leftIcon={<User className="w-4 h-4" />}
        />
        <Input
          label="Business or Property Name"
          placeholder="e.g. Coffee Hill Homestay"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          error={errors.businessName}
          leftIcon={<Building className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-surface-text mb-1.5">
            Partner Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-surface-border bg-white focus:outline-none focus:ring-2 focus:ring-teal text-navy"
          >
            <option value="Homestay Owner">Homestay Owner</option>
            <option value="Local Guide">Licensed Local Guide</option>
            <option value="Tour Operator">Regional Tour Operator</option>
            <option value="Cultural Experience Provider">Cultural Experience Provider</option>
            <option value="Local Tourism Business">Local Tourism Business</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-surface-text mb-1.5">
            Karnataka District
          </label>
          <div className="relative flex items-center">
            <MapPin className="w-4 h-4 text-surface-muted absolute left-3 pointer-events-none" />
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-surface-border bg-white focus:outline-none focus:ring-2 focus:ring-teal text-navy"
            >
              {KARNATAKA_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="contact@business.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          leftIcon={<Mail className="w-4 h-4" />}
        />
        <Input
          label="Phone Number"
          placeholder="e.g. 9845012345"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
          leftIcon={<Phone className="w-4 h-4" />}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-surface-text mb-1.5">
          Tell us about your property, experience or guiding specialty
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your location, amenities, heritage story, or unique experiences offered to travelers..."
          className="w-full rounded-lg border border-surface-border p-3 text-sm text-surface-text focus:outline-none focus:ring-2 focus:ring-teal"
        />
        {errors.description && (
          <p className="mt-1 text-xs text-rose-600 font-medium">{errors.description}</p>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-start gap-2.5">
          <input
            type="checkbox"
            id="partner-terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 rounded border-surface-border text-teal focus:ring-teal"
          />
          <label htmlFor="partner-terms" className="text-xs text-surface-muted leading-relaxed">
            I agree to the Sanchari local partner standards and acknowledge this application demonstrates the onboarding interface.
          </label>
        </div>
        {errors.agreedToTerms && (
          <p className="text-xs text-rose-600 font-medium">{errors.agreedToTerms}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        className="w-full justify-center"
        leftIcon={<HeartHandshake className="w-4 h-4" />}
      >
        Submit Partner Application (Demo)
      </Button>
    </form>
  );
}
