"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Home,
  Users,
  Compass,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  ArrowRight,
  Handshake,
} from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { DemoNotice } from "@/components/feedback/DemoNotice";
import { Button } from "@/components/ui/Button";

interface FAQItem {
  id: string;
  category: "general" | "stays" | "guides" | "travel" | "partners";
  question: string;
  answer: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    id: "gen-1",
    category: "general",
    question: "What is Sanchari?",
    answer:
      "Sanchari is a dedicated Karnataka tourism marketplace designed to bridge conscious travelers with authentic local hosts, licensed archaeological guides, and living cultural traditions across the state—from the rock-cut cave temples of Badami to the coffee plantations of Kodagu.",
  },
  {
    id: "gen-2",
    category: "general",
    question: "Are live transactions currently processed on Sanchari?",
    answer:
      "No. Sanchari is currently functioning in Phase 2 frontend demonstration mode. Listings, sample guide rates, and availability selectors are realistic sample data to illustrate the user experience. No real payments or credit card collections occur.",
  },
  {
    id: "gen-3",
    category: "general",
    question: "Do I need an account to browse destinations, stays, or guides?",
    answer:
      "Not at all. Public browsing across all destinations, itineraries, homestays, and tour guides is open and requires no registration or login.",
  },
  {
    id: "stays-1",
    category: "stays",
    question: "How do homestay inquiries work?",
    answer:
      "On any homestay profile, you can select your tentative check-in/check-out dates and guest count to view an instant indicative price preview. Clicking 'Continue to Booking' opens an inquiry modal to submit your requirements directly to the host.",
  },
  {
    id: "stays-2",
    category: "stays",
    question: "What dining options are provided in Karnataka homestays?",
    answer:
      "Authentic Karnataka homestays typically include traditional home-cooked breakfast prepared with regional ingredients (e.g., Akki Rotti in Malnad, Kadambuttu and Pandi curry in Coorg, Neer Dosa along the coast). Most hosts offer home lunch and dinner upon prior notice.",
  },
  {
    id: "stays-3",
    category: "stays",
    question: "What is the typical cancellation policy for homestays?",
    answer:
      "Most Karnataka plantation and heritage homestays provide free cancellation up to 48 hours prior to check-in. Detailed terms are listed on each property page under Stay Guidelines.",
  },
  {
    id: "guides-1",
    category: "guides",
    question: "Who are Sanchari local guides?",
    answer:
      "Our guide directory highlights knowledgeable regional storytellers, licensed archaeological specialists, epigraphists, and Western Ghats naturalists who hold genuine local expertise and state certifications.",
  },
  {
    id: "guides-2",
    category: "guides",
    question: "Can I request tours in specific languages?",
    answer:
      "Yes! Our guides speak Kannada, English, Hindi, Telugu, and regional dialects such as Kodava Takk and Tulu. You can filter guides by their spoken languages on the Tour Guides directory page.",
  },
  {
    id: "travel-1",
    category: "travel",
    question: "What is the best time of year to visit Karnataka?",
    answer:
      "October to March offers pleasant, dry weather ideal for monument walking in Hampi, Badami, and Mysuru. June to September is the monsoon season, ideal for seeing Western Ghats waterfalls and misty coffee hills in full lush glory.",
  },
  {
    id: "travel-2",
    category: "travel",
    question: "What are the essential safety rules for visiting ASI monuments?",
    answer:
      "Hampi, Badami caves, Pattadakal, and Aihole are protected monuments under the Archaeological Survey of India (ASI). Do not lean on, scratch, or climb ancient stone carvings. Always hire licensed guides wearing official badges for accurate history.",
  },
  {
    id: "travel-3",
    category: "travel",
    question: "What emergency numbers should I save while traveling in Karnataka?",
    answer:
      "Keep these Karnataka 24/7 helplines saved: 112 (Central Police & Emergency), 1363 (Karnataka State Tourism Helpline), 108 (Ambulance), and 1090 (Women's Safety Toll-Free).",
  },
  {
    id: "partners-1",
    category: "partners",
    question: "How can I register my homestay or guide service on Sanchari?",
    answer:
      "Visit our 'Become a Partner' page (/partners) and submit your details. Our team reviews property registrations, safety certificates, and guide credentials before featuring profiles on Sanchari.",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>("gen-1");

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Breadcrumb */}
      <Breadcrumbs items={[{ label: "Help & FAQs" }]} />

      {/* Hero Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-forest uppercase tracking-wider">
          Traveler Support & Guidance
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy tracking-tight leading-tight">
          How Can We Help Your Journey?
        </h1>
        <p className="text-xs sm:text-sm text-surface-muted leading-relaxed">
          Find straightforward answers regarding Karnataka homestay reservations, guide services, regional travel advisories, and platform demonstration guidelines.
        </p>

        {/* Search Input */}
        <div className="pt-4 max-w-lg mx-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-forest absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. cancellation, guides, best season, food)..."
              className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border border-surface-border shadow-sm focus:outline-none focus:ring-2 focus:ring-forest text-sm text-navy"
            />
          </div>
        </div>
      </div>

      <DemoNotice message="Sanchari is an advanced frontend prototype. Questions and answers describe current simulated features and upcoming full-scale capabilities." />

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {[
          { label: "All Questions", value: "all" },
          { label: "General & Platform", value: "general" },
          { label: "Homestays & Stays", value: "stays" },
          { label: "Guides & Experts", value: "guides" },
          { label: "Travel & Safety", value: "travel" },
          { label: "Partners & Hosts", value: "partners" },
        ].map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveCategory(tab.value)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              activeCategory === tab.value
                ? "bg-forest text-white shadow-sm"
                : "bg-white text-navy border border-surface-border hover:bg-surface-light"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-white border border-surface-border p-6 shadow-sm space-y-3">
            <HelpCircle className="w-8 h-8 text-surface-muted mx-auto" />
            <h3 className="text-base font-bold text-navy">No matching questions found</h3>
            <p className="text-xs text-surface-muted max-w-md mx-auto">
              We couldn&apos;t find any FAQs matching &ldquo;{searchQuery}&rdquo;. Try another search keyword or contact our support team directly.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white border border-surface-border overflow-hidden shadow-card transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-surface-light/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-navy">
                    {faq.question}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? "bg-forest-50 text-forest" : "bg-surface-light text-surface-muted"
                    }`}
                  >
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-surface-muted leading-relaxed border-t border-surface-border/50 bg-surface-ivory/20">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Helpful Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-6">
        <Link
          href="/contact"
          className="p-5 rounded-2xl bg-white border border-surface-border shadow-card hover:shadow-cardHover transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest flex items-center justify-center group-hover:scale-105 transition-transform">
            <MessageSquare className="w-5 h-5 text-forest" />
          </div>
          <h3 className="text-sm font-bold text-navy group-hover:text-forest transition-colors">
            Contact Support &rarr;
          </h3>
          <p className="text-xs text-surface-muted leading-relaxed">
            Need tailored travel guidance or assistance? Submit an inquiry directly to the team.
          </p>
        </Link>

        <Link
          href="/partners"
          className="p-5 rounded-2xl bg-white border border-surface-border shadow-card hover:shadow-cardHover transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-sunshine-50 text-sunshine-900 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Handshake className="w-5 h-5 text-terracotta" />
          </div>
          <h3 className="text-sm font-bold text-navy group-hover:text-terracotta transition-colors">
            Become a Partner &rarr;
          </h3>
          <p className="text-xs text-surface-muted leading-relaxed">
            Learn how Karnataka homestay hosts, cultural artisans, and licensed guides can register.
          </p>
        </Link>

        <Link
          href="/cancellation-policy"
          className="p-5 rounded-2xl bg-white border border-surface-border shadow-card hover:shadow-cardHover transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 text-emerald" />
          </div>
          <h3 className="text-sm font-bold text-navy group-hover:text-emerald transition-colors">
            Cancellation Policy &rarr;
          </h3>
          <p className="text-xs text-surface-muted leading-relaxed">
            Understand standard refund terms, weather advisory policies, and host guidelines.
          </p>
        </Link>
      </div>
    </div>
  );
}
