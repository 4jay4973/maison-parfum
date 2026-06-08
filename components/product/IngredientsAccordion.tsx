"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  howToApplyContent,
  sourcingContent,
} from "@/data/product-ingredients";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

interface IngredientsAccordionProps {
  description: string;
}

export default function IngredientsAccordion({
  description,
}: IngredientsAccordionProps) {
  const items: AccordionItem[] = [
    {
      id: "composition",
      title: "Full Ingredient List",
      content: description,
    },
    {
      id: "sourcing",
      title: "Sourcing & Sustainability",
      content: sourcingContent,
    },
    {
      id: "apply",
      title: "How to Apply",
      content: howToApplyContent,
    },
  ];

  const [openId, setOpenId] = useState<string>("composition");

  function toggleItem(id: string) {
    setOpenId((current) => (current === id ? "" : id));
  }

  return (
    <section className="border-t border-[var(--border)] bg-white py-16 md:py-20 lg:py-24">
      <Container>
        <SectionTitle
          subtitle="Composition"
          title="Ingredients"
          subtitleTone="gold"
        />

        <div className="mx-auto max-w-3xl divide-y divide-[var(--border)]">
          {items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `accordion-panel-${item.id}`;
            const buttonId = `accordion-button-${item.id}`;

            return (
              <div key={item.id}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[var(--primary)]"
                  >
                    <span className="font-[family-name:var(--font-heading)] text-lg font-medium sm:text-xl">
                      {item.title}
                    </span>
                    <ChevronDown
                      size={20}
                      className={cn(
                        "shrink-0 text-gray-500 transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                      aria-hidden
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-base leading-relaxed text-gray-600">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
