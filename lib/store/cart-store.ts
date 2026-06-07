"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, ProductSize } from "@/types/product";

export interface CartItem {
  product: Product;
  selectedSize: ProductSize;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, sizeLabel: string, quantity?: number) => void;
  removeItem: (productId: number, sizeLabel: string) => void;
  updateQuantity: (
    productId: number,
    sizeLabel: string,
    quantity: number
  ) => void;
  clearCart: () => void;
}

function getItemKey(productId: number, sizeLabel: string) {
  return `${productId}-${sizeLabel}`;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem(product, sizeLabel, quantity = 1) {
        const selectedSize = product.sizes.find(
          (size) => size.label === sizeLabel
        );

        if (!selectedSize) {
          return;
        }

        const itemKey = getItemKey(product.id, sizeLabel);
        const existingItem = get().items.find(
          (item) =>
            getItemKey(item.product.id, item.selectedSize.label) === itemKey
        );

        if (existingItem) {
          set({
            items: get().items.map((item) =>
              getItemKey(item.product.id, item.selectedSize.label) === itemKey
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
          return;
        }

        set({
          items: [
            ...get().items,
            { product, selectedSize, quantity },
          ],
        });
      },

      removeItem(productId, sizeLabel) {
        const itemKey = getItemKey(productId, sizeLabel);

        set({
          items: get().items.filter(
            (item) =>
              getItemKey(item.product.id, item.selectedSize.label) !== itemKey
          ),
        });
      },

      updateQuantity(productId, sizeLabel, quantity) {
        if (quantity <= 0) {
          get().removeItem(productId, sizeLabel);
          return;
        }

        const itemKey = getItemKey(productId, sizeLabel);

        set({
          items: get().items.map((item) =>
            getItemKey(item.product.id, item.selectedSize.label) === itemKey
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart() {
        set({ items: [] });
      },
    }),
    {
      name: "maison-parfum-cart",
    }
  )
);
