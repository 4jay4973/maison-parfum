import { products } from "@/data/products";
import { Product, ProductSize } from "@/types/product";

export interface ApiCartItem {
  productId: number;
  sizeLabel: string;
  quantity: number;
}

export interface ApiCartLineItem {
  product: Product;
  selectedSize: ProductSize;
  quantity: number;
}

export interface CartTotals {
  subtotal: number;
  total: number;
  itemCount: number;
}

export interface CartValidationResult {
  valid: boolean;
  errors: string[];
}

export function calculateCartTotals(items: ApiCartLineItem[]): CartTotals {
  const subtotal = items.reduce(
    (total, item) => total + item.selectedSize.price * item.quantity,
    0
  );

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return {
    subtotal,
    total: subtotal,
    itemCount,
  };
}

export async function resolveCartItems(
  items: ApiCartItem[]
): Promise<ApiCartLineItem[]> {
  const resolvedItems: ApiCartLineItem[] = [];

  for (const item of items) {
    const product = products.find((entry) => entry.id === item.productId);

    if (!product) {
      continue;
    }

    const selectedSize = product.sizes.find(
      (size) => size.label === item.sizeLabel
    );

    if (!selectedSize) {
      continue;
    }

    resolvedItems.push({
      product,
      selectedSize,
      quantity: item.quantity,
    });
  }

  return resolvedItems;
}

export async function validateCart(
  items: ApiCartItem[]
): Promise<CartValidationResult> {
  const errors: string[] = [];

  if (items.length === 0) {
    errors.push("Cart is empty.");
    return { valid: false, errors };
  }

  for (const item of items) {
    const product = products.find((entry) => entry.id === item.productId);

    if (!product) {
      errors.push(`Product ${item.productId} is no longer available.`);
      continue;
    }

    const selectedSize = product.sizes.find(
      (size) => size.label === item.sizeLabel
    );

    if (!selectedSize) {
      errors.push(
        `Size "${item.sizeLabel}" is not available for ${product.name}.`
      );
      continue;
    }

    if (item.quantity <= 0) {
      errors.push(`Invalid quantity for ${product.name}.`);
      continue;
    }

    if (product.stockStatus === "out_of_stock") {
      errors.push(`${product.name} is out of stock.`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
