import { Product, ProductCategory } from "@/types/product";

const categoryLabels: Record<ProductCategory, string> = {
  floral: "Floral",
  oriental: "Oriental",
  woody: "Woody",
};

export function getProductCategoryLine(category: ProductCategory): string {
  return `${categoryLabels[category].toUpperCase()} — EAU DE PARFUM`;
}

export function getBreadcrumbCategoryLabel(category: ProductCategory): string {
  return categoryLabels[category];
}

export function getShortScentStory(description: string): string {
  const sentence = description.split(/(?<=[.!?])\s+/)[0]?.trim();

  if (!sentence) {
    return description;
  }

  return sentence;
}

export function formatProductPrice(price: number): string {
  return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`;
}

export function getGalleryImages(product: Product): string[] {
  return [product.image, product.image, product.image, product.image];
}
