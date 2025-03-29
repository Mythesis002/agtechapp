"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem, Product } from "@/lib/types"

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  subtotal: () => number
  totalItems: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const currentItems = get().items
        const existingItem = currentItems.find((i) => i.productId === item.productId)

        if (existingItem) {
          // Update quantity if item already exists
          set({
            items: currentItems.map((i) =>
              i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i,
            ),
          })
        } else {
          // Add new item
          set({ items: [...currentItems, item] })
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.productId !== productId),
        })
      },

      updateQuantity: (productId, quantity) => {
        set({
          items: get().items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      subtotal: () => {
        return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0)
      },

      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)

interface WishlistState {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const currentItems = get().items
        const existingItem = currentItems.find((i) => i.id === product.id)

        if (!existingItem) {
          set({ items: [...currentItems, product] })
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        })
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId)
      },
    }),
    {
      name: "wishlist-storage",
    },
  ),
)

