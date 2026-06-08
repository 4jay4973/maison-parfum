"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { getGalleryImages } from "@/lib/product-display";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const images = getGalleryImages(product);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--muted)] sm:aspect-[3/4]">
        <Image
          src={images[activeIndex]}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-6 sm:p-8"
        />
      </div>

      <div
        className="mt-4 flex gap-3 overflow-x-auto pb-1 sm:mt-5 sm:gap-4"
        role="tablist"
        aria-label="Product image thumbnails"
      >
        {images.map((image, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`View image ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden bg-[var(--muted)] transition sm:h-20 sm:w-20",
                isActive
                  ? "ring-2 ring-[var(--primary)] ring-offset-2 ring-offset-[var(--background)]"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="80px"
                className="object-contain p-2"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
