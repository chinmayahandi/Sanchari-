import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Clock, Calendar, User, ArrowLeft, ArrowRight, Share2, Compass } from "lucide-react";
import { ARTICLES_DATA } from "@/data/articles";
import { DESTINATIONS_DATA } from "@/data/destinations";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DemoNotice } from "@/components/feedback/DemoNotice";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return ARTICLES_DATA.map((a) => ({
    slug: a.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = ARTICLES_DATA.find((a) => a.slug === params.slug);
  if (!article) {
    return { title: "Article Not Found" };
  }
  return {
    title: `${article.title} — Sanchari Travel Inspiration`,
    description: article.excerpt,
  };
}

export default function ArticleDetailPage({ params }: PageProps) {
  const article = ARTICLES_DATA.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const linkedDestination = article.destinationSlug
    ? DESTINATIONS_DATA.find((d) => d.slug === article.destinationSlug)
    : null;

  return (
    <article className="pb-20 max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-surface-muted">
        <Link href="/" className="hover:text-navy transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-navy transition-colors">
          Inspiration
        </Link>
        <span>/</span>
        <span className="text-navy font-semibold truncate max-w-xs">{article.title}</span>
      </nav>

      {/* Header Area */}
      <header className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="teal" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-surface-muted leading-relaxed">
          {article.excerpt}
        </p>

        {/* Byline */}
        <div className="flex items-center justify-between py-3 border-y border-surface-border text-xs text-surface-muted">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-navy flex items-center gap-1.5">
              <User className="w-4 h-4 text-teal" />
              {article.author}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.publishedDate}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTimeMinutes} min read
            </span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-navy-100 shadow-card">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          priority
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
        />
      </div>

      <DemoNotice message="Sample travel article for demonstration purposes." />

      {/* Article Markdown/HTML styled body */}
      <div className="prose prose-navy max-w-none text-navy leading-relaxed text-sm sm:text-base space-y-6 pt-2">
        {article.content.split("\n\n").map((block, idx) => {
          const trimmed = block.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith("### ")) {
            return (
              <h2 key={idx} className="text-xl sm:text-2xl font-bold text-navy mt-6 mb-2">
                {trimmed.replace("### ", "")}
              </h2>
            );
          }

          if (trimmed.startsWith("- ")) {
            const listItems = trimmed.split("\n").map((li) => li.replace("- ", ""));
            return (
              <ul key={idx} className="list-disc pl-5 space-y-1.5 text-sm text-surface-muted">
                {listItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          }

          return (
            <p key={idx} className="text-surface-muted leading-relaxed">
              {trimmed}
            </p>
          );
        })}
      </div>

      {/* Linked Destination CTA */}
      {linkedDestination && (
        <div className="p-6 rounded-2xl bg-teal-50 border border-teal-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
          <div>
            <span className="text-xs font-bold text-teal uppercase tracking-wider block">
              Plan Your Trip
            </span>
            <h3 className="text-lg font-bold text-navy mt-0.5">
              Ready to explore {linkedDestination.name}?
            </h3>
            <p className="text-xs text-surface-muted mt-1">
              Browse verified homestays, licensed local guides, and top sights in {linkedDestination.name}.
            </p>
          </div>
          <Link href={`/destinations/${linkedDestination.slug}`} className="shrink-0">
            <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore {linkedDestination.name}
            </Button>
          </Link>
        </div>
      )}

      {/* Back button */}
      <div className="pt-6 border-t border-surface-border">
        <Link href="/articles">
          <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to All Travel Guides
          </Button>
        </Link>
      </div>
    </article>
  );
}
