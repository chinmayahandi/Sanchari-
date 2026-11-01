import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  variant?: "light" | "dark";
}

export function Breadcrumbs({ items, className, variant = "light" }: BreadcrumbsProps) {
  const isDark = variant === "dark";

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-1.5 text-xs font-medium", className)}
    >
      <Link
        href="/"
        className={cn(
          "inline-flex items-center gap-1 transition-colors rounded hover:underline",
          isDark
            ? "text-navy-200 hover:text-white"
            : "text-surface-muted hover:text-navy"
        )}
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only sm:not-sr-only">Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <ChevronRight
              className={cn(
                "w-3.5 h-3.5 shrink-0",
                isDark ? "text-navy-400" : "text-surface-muted/60"
              )}
            />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className={cn(
                  "truncate max-w-[150px] sm:max-w-[200px] hover:underline transition-colors",
                  isDark
                    ? "text-navy-200 hover:text-white"
                    : "text-surface-muted hover:text-navy"
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  "truncate max-w-[180px] sm:max-w-[280px] font-semibold",
                  isDark ? "text-white" : "text-navy"
                )}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
