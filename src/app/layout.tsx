import type { Metadata } from "next";
import "./globals.css";
import { AnnouncementStrip } from "@/components/layout/AnnouncementStrip";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/ToastProvider";

export const metadata: Metadata = {
  title: {
    default: "Sanchari — Explore Karnataka. Your Way.",
    template: "%s | Sanchari",
  },
  description:
    "Discover Karnataka's heritage monuments, misty Western Ghats, coastal escapes, authentic homestays, licensed local guides, and curated cultural experiences.",
  keywords: [
    "Karnataka tourism",
    "Hampi heritage",
    "Coorg homestays",
    "Gokarna beaches",
    "Mysuru palace",
    "Chikkamagaluru coffee estates",
    "Karnataka local guides",
    "Western Ghats travel",
  ],
  authors: [{ name: "Sanchari" }],
  creator: "Sanchari",
  icons: {
    icon: "/logo/sanchari-logo.jpg",
    apple: "/logo/sanchari-logo.jpg",
  },
  openGraph: {
    title: "Sanchari — Explore Karnataka. Your Way.",
    description:
      "Modern local tourism discovery platform for Karnataka. Plan homestays, find licensed guides, and book authentic cultural experiences.",
    url: "https://sanchari.in",
    siteName: "Sanchari",
    images: [{ url: "/logo/sanchari-logo.jpg", width: 800, height: 800, alt: "Sanchari Logo" }],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-surface-light text-surface-text antialiased">
        <ToastProvider>
          <AnnouncementStrip />
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
