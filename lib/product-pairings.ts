import { products } from "@/data/products";
import { productPairingsBySlug } from "@/data/product-pairings";
import { Product } from "@/types/product";

export interface ResolvedPairing {
  product: Product;
  title: string;
  description: string;
}

export function getCuratedPairings(productSlug: string): ResolvedPairing[] {
  const entries = productPairingsBySlug[productSlug] ?? [];

  return entries.flatMap((entry) => {
    const product = products.find((item) => item.slug === entry.productSlug);

    if (!product) {
      return [];
    }

    return [
      {
        product,
        title: entry.title,
        description: entry.description,
      },
    ];
  });
}
