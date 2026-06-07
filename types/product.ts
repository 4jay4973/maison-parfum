export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export type ProductCategory = "floral" | "oriental" | "woody";

export interface FragranceNotes {
  top: string[];
  middle: string[];
  base: string[];
}

export interface ProductSize {
  label: string;
  price: number;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  notes: FragranceNotes;
  sizes: ProductSize[];
  stockStatus: StockStatus;
  category: ProductCategory;
}
