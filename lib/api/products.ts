import { products } from "@/data/products";
import { Product, ProductCategory } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = products.find((item) => item.slug === slug);
  return product ?? null;
}

export async function getProductById(id: number): Promise<Product | null> {
  const product = products.find((item) => item.id === id);
  return product ?? null;
}

export async function getProductsByCategory(
  category: ProductCategory
): Promise<Product[]> {
  return products.filter((item) => item.category === category);
}

export async function getProductSlugs(): Promise<string[]> {
  return products.map((product) => product.slug);
}

export async function getRelatedProducts(
  product: Product,
  limit = 3
): Promise<Product[]> {
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id
  );
  const otherProducts = products.filter(
    (item) => item.category !== product.category && item.id !== product.id
  );

  return [...sameCategory, ...otherProducts].slice(0, limit);
}
