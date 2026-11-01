import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock, Calendar, ArrowRight } from "lucide-react";
import { ARTICLES_DATA } from "@/data/articles";
import { Badge } from "@/components/ui/Badge";
import { DemoNotice } from "@/components/feedback/DemoNotice";

export const metadata = {
  title: "Karnataka Travel Guides & Sample Itineraries",
  description: "Curated itineraries, weekend road trips, and cultural stories across Karnataka.",
};

export default function ArticlesPage() {
  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Heading */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-orange uppercase tracking-wider">
          Editorial & Itineraries
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
          Karnataka Travel Inspiration
        </h1>
        <p className="text-xs sm:text-sm text-surface-muted max-w-2xl leading-relaxed">
          In-depth guides, 48-hour weekend road trips, and architectural walking trails across Karnataka.
        </p>
      </div>

      <DemoNotice message="Sample travel guides and editorial stories written for the Sanchari discovery platform." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ARTICLES_DATA.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="group rounded-2xl bg-white border border-surface-border shadow-card hover:shadow-cardHover transition-all duration-300 overflow-hidden flex flex-col h-full"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-navy-100">
              <Image
                src={article.heroImage}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-surface-muted mb-2 font-medium">
                  <span>{article.author}</span>
                  <span>&bull;</span>
                  <span>{article.publishedDate}</span>
                  <span>&bull;</span>
                  <span>{article.readTimeMinutes} min read</span>
                </div>

                <h2 className="text-xl font-bold text-navy group-hover:text-teal transition-colors tracking-tight mb-2.5">
                  {article.title}
                </h2>

                <p className="text-xs sm:text-sm text-surface-muted leading-relaxed line-clamp-2 mb-4">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-surface-light text-navy-700 border border-surface-border font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-surface-border flex items-center justify-between text-xs font-bold text-teal">
                <span>Read Full Itinerary</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
