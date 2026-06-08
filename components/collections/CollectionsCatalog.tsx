"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/layout/Container";
import CollectionsToolbar from "@/components/collections/CollectionsToolbar";
import CollectionsFilters from "@/components/collections/CollectionsFilters";
import ProductCard from "@/components/ui/ProductCard";
import { collectionsPage } from "@/data/collections-page";
import {
  getCategoryFromFilterLabel,
  getFilterLabelFromCategory,
} from "@/lib/collections";
import { Product, ProductCategory } from "@/types/product";

interface CollectionsCatalogProps {
  products: Product[];
}

function isValidCategory(value: string | null): value is ProductCategory {
  return value === "floral" || value === "oriental" || value === "woody";
}

function getInitialCategory(searchParams: URLSearchParams): ProductCategory | "all" {
  const category = searchParams.get("category");

  if (isValidCategory(category)) {
    return category;
  }

  return "all";
}

export default function CollectionsCatalog({ products }: CollectionsCatalogProps) {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">(
    () => getInitialCategory(searchParams)
  );
  const [sort, setSort] = useState(collectionsPage.catalog.defaultSort);

  const activeFamily = getFilterLabelFromCategory(activeCategory);

  const filteredProducts = useMemo(() => {
    const byCategory =
      activeCategory === "all"
        ? products
        : products.filter((product) => product.category === activeCategory);

    const sorted = [...byCategory];

    switch (sort) {
      case "Price: Low to High":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "Newest":
        sorted.sort((a, b) => b.id - a.id);
        break;
      case "Featured":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "Best Sellers":
      default:
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return sorted;
  }, [activeCategory, products, sort]);

  function handleFamilyChange(label: string) {
    setActiveCategory(getCategoryFromFilterLabel(label));
  }

  return (
    <section className="py-14 md:py-20 lg:py-24">
      <Container>
        <CollectionsToolbar
          showing={filteredProducts.length}
          total={products.length}
          sort={sort}
          onSortChange={setSort}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">
          <CollectionsFilters
            activeFamily={activeFamily}
            onFamilyChange={handleFamilyChange}
          />

          {filteredProducts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No fragrances match this collection yet.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
