"use client";

import { ChevronDown } from "lucide-react";
import { collectionsPage } from "@/data/collections-page";

interface CollectionsToolbarProps {
  showing: number;
  total: number;
  sort: string;
  onSortChange: (sort: string) => void;
}

export default function CollectionsToolbar({
  showing,
  total,
  sort,
  onSortChange,
}: CollectionsToolbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-gray-600">
        Showing{" "}
        <span className="font-medium text-[var(--foreground)]">{showing}</span>{" "}
        of{" "}
        <span className="font-medium text-[var(--foreground)]">{total}</span>{" "}
        fragrances
      </p>

      <div className="flex w-full items-center gap-3 sm:w-auto">
        <label
          htmlFor="sort-products"
          className="shrink-0 text-xs uppercase tracking-[0.2em] text-gray-500"
        >
          {collectionsPage.catalog.sortLabel}
        </label>
        <div className="relative min-w-0 flex-1 sm:w-52 sm:flex-none">
          <select
            id="sort-products"
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
            aria-label={collectionsPage.catalog.sortLabel}
            className="w-full cursor-pointer appearance-none rounded-xl border border-[var(--border)] bg-white py-2.5 pr-10 pl-4 text-sm text-[var(--foreground)] transition-colors hover:border-[var(--primary)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          >
            {collectionsPage.sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
