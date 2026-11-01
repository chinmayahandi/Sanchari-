"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Compass, Home, Users, Sparkles, Handshake, LogIn, ChevronRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Explore Karnataka", href: "/destinations", icon: Compass },
  { name: "Homestays", href: "/stays", icon: Home },
  { name: "Tour Guides", href: "/guides", icon: Users },
  { name: "Experiences", href: "/experiences", icon: Sparkles },
  { name: "Help & FAQ", href: "/help", icon: HelpCircle },
  { name: "Become a Partner", href: "/partners", icon: Handshake },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200 bg-white/95 backdrop-blur-md border-b",
        scrolled
          ? "border-surface-border shadow-sm py-2.5"
          : "border-surface-border/80 py-3.5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group focus:outline-none focus:ring-2 focus:ring-forest rounded-lg p-1"
            aria-label="Sanchari Home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform overflow-hidden relative border border-surface-border">
              <Image
                src="/logo/sanchari-logo.jpg"
                alt="Sanchari emblem"
                width={44}
                height={44}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl text-navy tracking-tight leading-none">
                Sanchari
              </span>
              <span className="text-[10px] font-semibold text-forest tracking-wider uppercase mt-0.5 hidden sm:block">
                Explore Karnataka
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "text-teal font-semibold bg-teal-50"
                      : "text-surface-text hover:text-teal hover:bg-surface-light"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action Area */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-navy hover:text-teal px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-4 h-4 text-surface-muted" />
              <span>Sign In</span>
            </Link>
            <Link href="/destinations">
              <Button size="sm" variant="forest">
                Explore Karnataka
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link href="/login" className="text-xs font-semibold text-navy hover:text-teal px-2 py-1">
              Sign In
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-surface-text hover:text-teal hover:bg-surface-light transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden border-t border-surface-border bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200"
          role="navigation"
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "text-teal font-semibold bg-teal-50"
                      : "text-surface-text hover:text-teal hover:bg-surface-light"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("w-4 h-4", isActive ? "text-teal" : "text-surface-muted")} />
                    <span>{link.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-surface-muted/60" />
                </Link>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-surface-border flex flex-col gap-2.5">
            <Link href="/destinations" className="w-full">
              <Button className="w-full justify-center" variant="forest">
                Explore Karnataka
              </Button>
            </Link>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <Link href="/login" className="w-full">
                <Button className="w-full justify-center" variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/register" className="w-full">
                <Button className="w-full justify-center" variant="secondary" size="sm">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
