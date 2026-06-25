"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Cart } from "@/types/shopify";

interface CartContextValue {
  cart: Cart | null;
  isLoading: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  totalQuantity: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getCartId = () =>
    typeof window !== "undefined" ? localStorage.getItem("cartId") : null;
  const setCartId = (id: string) =>
    typeof window !== "undefined" && localStorage.setItem("cartId", id);

  const persist = (c: Cart | null) => {
    setCart(c);
    if (typeof window !== "undefined") {
      if (c) localStorage.setItem("cart", JSON.stringify(c));
      else localStorage.removeItem("cart");
    }
  };

  const fetchCart = useCallback(async (cartId: string) => {
    const res = await fetch(`/api/cart?cartId=${cartId}`);
    if (res.ok) {
      const data = await res.json();
      if (data.cart) {
        setCart(data.cart);
        if (typeof window !== "undefined") localStorage.setItem("cart", JSON.stringify(data.cart));
      }
    }
  }, []);

  useEffect(() => {
    // Rehydrate the bag instantly from localStorage so it survives refreshes
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      if (saved) {
        try { setCart(JSON.parse(saved)); } catch {}
      }
    }
    const cartId = getCartId();
    if (cartId) fetchCart(cartId);
  }, [fetchCart]);

  const addItem = useCallback(async (merchandiseId: string, quantity = 1) => {
    setIsLoading(true);
    try {
      const cartId = getCartId();
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add", cartId, lines: [{ merchandiseId, quantity }] }),
      });
      if (res.ok) {
        const data = await res.json();
        persist(data.cart);
        if (data.cart?.id) setCartId(data.cart.id);
        setIsOpen(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (lineId: string) => {
    setIsLoading(true);
    try {
      const cartId = getCartId();
      if (!cartId) return;
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove", cartId, lineIds: [lineId] }),
      });
      if (res.ok) { const data = await res.json(); persist(data.cart); }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    if (quantity <= 0) { await removeItem(lineId); return; }
    setIsLoading(true);
    try {
      const cartId = getCartId();
      if (!cartId) return;
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", cartId, lines: [{ id: lineId, quantity }] }),
      });
      if (res.ok) { const data = await res.json(); persist(data.cart); }
    } finally {
      setIsLoading(false);
    }
  }, [removeItem]);

  return (
    <CartContext.Provider
      value={{
        cart, isLoading, isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addItem, removeItem, updateItem,
        totalQuantity: cart?.totalQuantity ?? 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
