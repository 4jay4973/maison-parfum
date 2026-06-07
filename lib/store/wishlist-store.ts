"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem(product) {
        if (get().isInWishlist(product.id)) {
          return;
        }

        set({
          items: [...get().items, product],
        });
      },

      removeItem(productId) {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      toggleItem(product) {
        if (get().isInWishlist(product.id)) {
          get().removeItem(product.id);
          return;
        }

        get().addItem(product);
      },

      isInWishlist(productId) {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: "maison-parfum-wishlist",
    }
  )
);
