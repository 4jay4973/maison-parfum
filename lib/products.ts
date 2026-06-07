import { products } from "@/data/products";
import { Product } from "@/types/product";

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(
  product: Product,
  limit = 3
): Product[] {
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id
  );
  const otherProducts = products.filter(
    (item) => item.category !== product.category && item.id !== product.id
  );

  return [...sameCategory, ...otherProducts].slice(0, limit);
}

export function getAllProductSlugs(): string[] {
  return products.map((product) => product.slug);
}
