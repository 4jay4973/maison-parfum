import { collections } from "@/data/collections";
import { ProductCategory } from "@/types/product";

export interface Category {
  id: number;
  slug: ProductCategory;
  name: string;
  description: string;
  image: string;
}

const categorySlugs: ProductCategory[] = ["floral", "oriental", "woody"];

const categories: Category[] = collections.map((collection, index) => ({
  id: collection.id,
  slug: categorySlugs[index],
  name: collection.title,
  description: collection.description,
  image: collection.image,
}));

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategoryBySlug(
  slug: ProductCategory
): Promise<Category | null> {
  const category = categories.find((item) => item.slug === slug);
  return category ?? null;
}

export async function getCategorySlugs(): Promise<ProductCategory[]> {
  return categories.map((category) => category.slug);
}
