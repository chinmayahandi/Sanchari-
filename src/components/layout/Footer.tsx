import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Compass, ShieldCheck, HeartHandshake } from "lucide-react";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-navy-950 text-white border-t border-navy-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group inline-block">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center overflow-hidden border border-white/20">
                <Image
                  src="/logo/sanchari-logo.png"
                  alt="Sanchari"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                Sanchari
              </span>
            </Link>
            <p className="text-orange text-xs font-semibold uppercase tracking-wider mb-3">
              Explore Karnataka. Your Way.
            </p>
            <p className="text-navy-300 text-sm leading-relaxed max-w-sm mb-6">
              A modern tourism discovery platform dedicated to showcasing Karnataka&apos;s
              ancient heritage, pristine Western Ghats, coastal serenity, and authentic
              local communities through verified stays, licensed guides, and curated experiences.
            </p>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-navy-200 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-teal shrink-0 mt-0.5" />
              <span>
                <strong>Demonstration Platform:</strong> Curated sample data for frontend demonstration.
                No real transactions, personal data capture, or commercial bookings take place.
              </span>
            </div>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Destinations
            </h3>
            <ul className="space-y-2.5 text-sm text-navy-300">
              <li>
                <Link href="/destinations/hampi" className="hover:text-teal transition-colors">
                  Hampi Heritage
                </Link>
              </li>
              <li>
                <Link href="/destinations/coorg" className="hover:text-teal transition-colors">
                  Coorg (Kodagu)
                </Link>
              </li>
              <li>
                <Link href="/destinations/mysuru" className="hover:text-teal transition-colors">
                  Mysuru Royal City
                </Link>
              </li>
              <li>
                <Link href="/destinations/gokarna" className="hover:text-teal transition-colors">
                  Gokarna Coastline
                </Link>
              </li>
              <li>
                <Link href="/destinations/chikkamagaluru" className="hover:text-teal transition-colors">
                  Chikkamagaluru Peaks
                </Link>
              </li>
              <li>
                <Link href="/destinations/badami" className="hover:text-teal transition-colors">
                  Badami Cave Temples
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-teal font-medium hover:underline inline-flex items-center gap-1">
                  View all destinations &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Discovery & Services */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Discover
            </h3>
            <ul className="space-y-2.5 text-sm text-navy-300">
              <li>
                <Link href="/stays" className="hover:text-teal transition-colors">
                  Homestays & Estates
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-teal transition-colors">
                  Licensed Local Guides
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-teal transition-colors">
                  Cultural Experiences
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-teal transition-colors">
                  Travel Inspiration & Guides
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-teal transition-colors flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-orange" />
                  <span>Become a Partner</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Policies */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Information
            </h3>
            <ul className="space-y-2.5 text-sm text-navy-300">
              <li>
                <Link href="/about" className="hover:text-teal transition-colors">
                  About Sanchari
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-teal transition-colors">
                  Help Center & FAQs
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-teal transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-teal transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="hover:text-teal transition-colors">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-navy-400">
          <p>
            &copy; {currentYear} Sanchari Tourism Discovery Platform. All rights reserved.
          </p>
          <p className="text-navy-400 text-center sm:text-right">
            Designed for Karnataka Tourism Enthusiasts &bull; Built with Next.js & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
