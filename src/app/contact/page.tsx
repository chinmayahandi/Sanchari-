import React from "react";
import { Metadata } from "next";
import { Mail, MessageSquare, Compass, ShieldAlert } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { DemoNotice } from "@/components/feedback/DemoNotice";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact Sanchari — Tourism Support & Inquiries",
  description: "Get in touch with the Sanchari team for platform feedback, host onboarding questions, or traveler guidance.",
};

export default function ContactPage() {
  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: "Contact & Support" }]} />

      {/* Heading */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-teal uppercase tracking-wider">
          Direct Inquiries
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          Contact Sanchari
        </h1>
        <p className="text-xs sm:text-sm text-surface-muted max-w-lg mx-auto leading-relaxed">
          Have questions regarding homestay partnerships, guide registrations, or platform feedback?
          Send a demonstration inquiry through the form below.
        </p>
      </div>

      <DemoNotice message="This is a demonstration contact interface. Submissions are verified locally on the frontend and do not send emails to live mail servers." />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Info Column */}
        <div className="md:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-white border border-surface-border shadow-card space-y-4">
            <h2 className="text-base font-bold text-navy">Inquiry Guidelines</h2>
            <p className="text-xs text-surface-muted leading-relaxed">
              We welcome discussions regarding sustainable travel initiatives, cultural documentation,
              and homestay network development across Karnataka.
            </p>
            <div className="pt-2 border-t border-surface-border text-xs text-surface-muted space-y-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-teal" />
                <span>Primary Region: Karnataka, India</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-orange" />
                <span>Typical Response (Live Ops): 24–48 Hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
