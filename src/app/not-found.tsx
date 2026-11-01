import Link from "next/link";
import { Compass, Home, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-teal-50 text-teal flex items-center justify-center mx-auto shadow-inner">
          <Compass className="w-10 h-10 animate-pulse" />
        </div>

        <div>
          <span className="text-xs font-bold text-orange uppercase tracking-wider">
            404 — Lost Along the Trail
          </span>
          <h1 className="text-3xl font-extrabold text-navy tracking-tight mt-1">
            Destination Not Found
          </h1>
          <p className="mt-2 text-sm text-surface-muted leading-relaxed">
            The road you followed doesn&apos;t seem to lead anywhere in Karnataka.
            Let&apos;s guide you back to our curated discovery trails.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full justify-center" leftIcon={<Home className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
          <Link href="/destinations" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full justify-center" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore Destinations
            </Button>
          </Link>
        </div>

        <div className="pt-6 border-t border-surface-border">
          <p className="text-xs text-surface-muted mb-3 font-semibold">
            Or jump directly to:
          </p>
          <div className="flex justify-center gap-4 text-xs font-medium text-teal">
            <Link href="/destinations/hampi" className="hover:underline">
              Hampi
            </Link>
            <Link href="/destinations/coorg" className="hover:underline">
              Coorg
            </Link>
            <Link href="/stays" className="hover:underline">
              Homestays
            </Link>
            <Link href="/guides" className="hover:underline">
              Local Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
