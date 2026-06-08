import { wooCommerceGet } from "@/lib/api/wooCommerce";
import {
  FragranceNotes,
  Product,
  ProductCategory,
  ProductSize,
  StockStatus,
} from "@/types/product";

interface WooCommerceMetaData {
  id: number;
  key: string;
  value: unknown;
}

interface WooCommerceImage {
  id: number;
  src: string;
  alt: string;
}

interface WooCommerceCategory {
  id: number;
  name: string;
  slug: string;
}

interface WooCommerceAttribute {
  id: number;
  name: string;
  slug: string;
  options: string[];
}

interface WooCommerceVariationAttribute {
  id: number;
  name: string;
  option: string;
}

interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  type: "simple" | "variable" | "grouped" | "external" | string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  stock_status: "instock" | "outofstock" | "onbackorder";
  average_rating: string;
  rating_count: number;
  featured: boolean;
  images: WooCommerceImage[];
  categories: WooCommerceCategory[];
  attributes: WooCommerceAttribute[];
  meta_data: WooCommerceMetaData[];
  variations?: number[];
}

interface WooCommerceVariation {
  id: number;
  price: string;
  regular_price: string;
  stock_status: "instock" | "outofstock" | "onbackorder";
  attributes: WooCommerceVariationAttribute[];
}

const DEFAULT_FETCH_OPTIONS = {
  next: { revalidate: 60 },
} as const;

const PRODUCT_CATEGORIES: ProductCategory[] = ["floral", "oriental", "woody"];

function parsePrice(value: string): number {
  const price = parseFloat(value);
  return Number.isFinite(price) ? price : 0;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function getMetaValue(
  meta: WooCommerceMetaData[],
  key: string
): unknown {
  return meta.find((item) => item.key === key)?.value;
}

function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string") {
    try {
      const parsed: unknown = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === "string");
      }
    } catch {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return [];
}

function mapStockStatus(
  status: WooCommerceProduct["stock_status"]
): StockStatus {
  switch (status) {
    case "instock":
      return "in_stock";
    case "onbackorder":
      return "low_stock";
    case "outofstock":
      return "out_of_stock";
    default:
      return "out_of_stock";
  }
}

function mapCategory(categories: WooCommerceCategory[]): ProductCategory {
  const categorySlug = categories[0]?.slug?.toLowerCase();

  if (
    categorySlug &&
    PRODUCT_CATEGORIES.includes(categorySlug as ProductCategory)
  ) {
    return categorySlug as ProductCategory;
  }

  return "floral";
}

function mapFragranceNotes(meta: WooCommerceMetaData[]): FragranceNotes {
  const fragranceNotes = getMetaValue(meta, "fragrance_notes");

  if (fragranceNotes && typeof fragranceNotes === "object" && fragranceNotes !== null) {
    const notes = fragranceNotes as Record<string, unknown>;

    return {
      top: parseStringArray(notes.top),
      middle: parseStringArray(notes.middle),
      base: parseStringArray(notes.base),
    };
  }

  return {
    top: parseStringArray(getMetaValue(meta, "notes_top")),
    middle: parseStringArray(getMetaValue(meta, "notes_middle")),
    base: parseStringArray(getMetaValue(meta, "notes_base")),
  };
}

function parseSizesFromMeta(meta: WooCommerceMetaData[]): ProductSize[] | null {
  const sizesValue = getMetaValue(meta, "sizes");

  if (!Array.isArray(sizesValue)) {
    return null;
  }

  const sizes = sizesValue
    .map((item) => {
      if (
        typeof item === "object" &&
        item !== null &&
        "label" in item &&
        "price" in item &&
        typeof item.label === "string" &&
        (typeof item.price === "number" || typeof item.price === "string")
      ) {
        return {
          label: item.label,
          price:
            typeof item.price === "number"
              ? item.price
              : parsePrice(item.price),
        };
      }

      return null;
    })
    .filter((item): item is ProductSize => item !== null);

  return sizes.length > 0 ? sizes : null;
}

async function mapProductSizes(
  product: WooCommerceProduct
): Promise<ProductSize[]> {
  const metaSizes = parseSizesFromMeta(product.meta_data);

  if (metaSizes) {
    return metaSizes;
  }

  if (product.type === "variable" && product.variations?.length) {
    const variations = await wooCommerceGet<WooCommerceVariation[]>(
      `products/${product.id}/variations`,
      { per_page: 100 },
      DEFAULT_FETCH_OPTIONS
    );

    const sizes = variations.map((variation) => {
      const sizeAttribute = variation.attributes.find(
        (attribute) => attribute.name.toLowerCase() === "size"
      );

      return {
        label: sizeAttribute?.option ?? "Standard",
        price: parsePrice(variation.price || variation.regular_price),
      };
    });

    if (sizes.length > 0) {
      return sizes;
    }
  }

  const sizeAttribute = product.attributes.find(
    (attribute) => attribute.slug === "pa_size" || attribute.name.toLowerCase() === "size"
  );

  if (sizeAttribute?.options.length) {
    const basePrice = parsePrice(product.price || product.regular_price);

    return sizeAttribute.options.map((label) => ({
      label,
      price: basePrice,
    }));
  }

  return [
    {
      label: "Standard",
      price: parsePrice(product.price || product.regular_price),
    },
  ];
}

async function mapWooCommerceProduct(
  product: WooCommerceProduct
): Promise<Product> {
  const sizes = await mapProductSizes(product);
  const displayPrice =
    sizes[sizes.length - 1]?.price ??
    parsePrice(product.price || product.regular_price);
  const brandMeta = getMetaValue(product.meta_data, "brand");

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: typeof brandMeta === "string" && brandMeta.length > 0
      ? brandMeta
      : "Maison Parfum",
    description: stripHtml(product.short_description || product.description),
    price: displayPrice,
    image: product.images[0]?.src ?? "",
    rating: parseFloat(product.average_rating) || 0,
    reviewCount: product.rating_count ?? 0,
    notes: mapFragranceNotes(product.meta_data),
    sizes,
    stockStatus: mapStockStatus(product.stock_status),
    category: mapCategory(product.categories),
  };
}

async function mapWooCommerceProducts(
  products: WooCommerceProduct[]
): Promise<Product[]> {
  return Promise.all(products.map((product) => mapWooCommerceProduct(product)));
}

export async function getProducts(): Promise<Product[]> {
  const wcProducts = await wooCommerceGet<WooCommerceProduct[]>(
    "products",
    {
      per_page: 100,
      status: "publish",
    },
    DEFAULT_FETCH_OPTIONS
  );

  return mapWooCommerceProducts(wcProducts);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const wcProducts = await wooCommerceGet<WooCommerceProduct[]>(
    "products",
    {
      slug,
      status: "publish",
      per_page: 1,
    },
    DEFAULT_FETCH_OPTIONS
  );

  const product = wcProducts[0];

  if (!product) {
    return null;
  }

  return mapWooCommerceProduct(product);
}

export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const wcProducts = await wooCommerceGet<WooCommerceProduct[]>(
    "products",
    {
      featured: true,
      per_page: limit,
      status: "publish",
    },
    DEFAULT_FETCH_OPTIONS
  );

  return mapWooCommerceProducts(wcProducts);
}
