import { ProductCategory } from "@/types/product";

export interface Collection {
  id: number;
  slug: ProductCategory;
  title: string;
  description: string;
  image: string;
  featuredProductSlug: string;
}
