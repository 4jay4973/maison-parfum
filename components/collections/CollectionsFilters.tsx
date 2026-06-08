"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { collectionsPage } from "@/data/collections-page";
import { cn } from "@/lib/utils";

function FilterLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
      {children}
    </p>
  );
}

export default function CollectionsFilters() {
  const { filters } = collectionsPage;

  const [activeFamily, setActiveFamily] = useState(
    filters.fragranceFamily.defaultActive
  );
  const [activeSize, setActiveSize] = useState(filters.size.defaultActive);
  const [gender, setGender] = useState<Record<string, boolean>>({
    Women: false,
    Men: false,
    Unisex: true,
  });
  const [occasion, setOccasion] = useState<Record<string, boolean>>({
    Evening: true,
    Daytime: false,
    Office: false,
    "Special Event": false,
  });

  function toggleCheckbox(
    group: "gender" | "occasion",
    option: string
  ) {
    if (group === "gender") {
      setGender((current) => ({
        ...current,
        [option]: !current[option],
      }));
      return;
    }

    setOccasion((current) => ({
      ...current,
      [option]: !current[option],
    }));
  }

  return (
    <aside className="h-fit lg:pr-4">
      <div className="mb-6 flex items-center gap-2">
        <SlidersHorizontal
          size={18}
          className="text-[var(--primary)]"
          aria-hidden
        />
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold">
          {filters.title}
        </h2>
      </div>

      <div className="divide-y divide-[var(--border)]">
        <div className="pb-6">
          <FilterLabel>{filters.fragranceFamily.label}</FilterLabel>
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.fragranceFamily.options.map((option) => {
              const isActive = activeFamily === option;

              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFamily(option)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs transition-colors duration-300",
                    isActive
                      ? "bg-[var(--primary)] text-white"
                      : "border border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--primary)]"
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="py-6">
          <FilterLabel>{filters.gender.label}</FilterLabel>
          <ul className="mt-4 space-y-3">
            {filters.gender.options.map((option) => (
              <li key={option}>
                <label className="flex cursor-pointer items-center gap-3 text-sm text-[var(--foreground)]">
                  <input
                    type="checkbox"
                    checked={gender[option]}
                    onChange={() => toggleCheckbox("gender", option)}
                    className="h-4 w-4 rounded border-[var(--border)] accent-[var(--primary)]"
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="py-6">
          <FilterLabel>{filters.occasion.label}</FilterLabel>
          <ul className="mt-4 space-y-3">
            {filters.occasion.options.map((option) => (
              <li key={option}>
                <label className="flex cursor-pointer items-center gap-3 text-sm text-[var(--foreground)]">
                  <input
                    type="checkbox"
                    checked={occasion[option]}
                    onChange={() => toggleCheckbox("occasion", option)}
                    className="h-4 w-4 rounded border-[var(--border)] accent-[var(--primary)]"
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-6">
          <FilterLabel>{filters.size.label}</FilterLabel>
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.size.options.map((option) => {
              const isActive = activeSize === option;

              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveSize(option)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs transition-colors duration-300",
                    isActive
                      ? "bg-[var(--primary)] text-white"
                      : "border border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--primary)]"
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
