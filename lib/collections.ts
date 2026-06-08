import { collections } from "@/data/collections";
import { products } from "@/data/products";
import { Collection } from "@/types/collection";
import { Product, ProductCategory } from "@/types/product";

export function getCollectionBySlug(
  slug: ProductCategory
): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((product) => product.category === category);
}

export function getProductCountByCategory(category: ProductCategory): number {
  return getProductsByCategory(category).length;
}

export function getCollectionForProduct(product: Product): Collection | undefined {
  return getCollectionBySlug(product.category);
}

export function getCategoryFromFilterLabel(
  label: string
): ProductCategory | "all" {
  const normalized = label.toLowerCase();

  if (normalized === "all") {
    return "all";
  }

  if (
    normalized === "floral" ||
    normalized === "oriental" ||
    normalized === "woody"
  ) {
    return normalized;
  }

  return "all";
}

export function getFilterLabelFromCategory(
  category: ProductCategory | "all"
): string {
  if (category === "all") {
    return "All";
  }

  return category.charAt(0).toUpperCase() + category.slice(1);
}
