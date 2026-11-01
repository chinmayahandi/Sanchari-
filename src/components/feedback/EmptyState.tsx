import React from "react";
import { Compass, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  resetLabel?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = "No results found",
  description = "We couldn't find any listings matching your search and filter criteria. Try adjusting your keywords or clearing active filters.",
  onReset,
  resetLabel = "Clear all filters",
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-white border border-surface-border shadow-card max-w-xl mx-auto my-6">
      <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal flex items-center justify-center mb-4">
        {icon || <Compass className="w-8 h-8" />}
      </div>
      <h3 className="text-lg font-bold text-navy mb-1.5">{title}</h3>
      <p className="text-sm text-surface-muted mb-6 max-w-md leading-relaxed">
        {description}
      </p>
      {onReset && (
        <Button
          variant="outline"
          onClick={onReset}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          {resetLabel}
        </Button>
      )}
    </div>
  );
}
