"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, removeItem, updateItem } = useCart();

  const lines = cart?.lines.nodes ?? [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#1a1714] border-l border-[#2e2820] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#2e2820]">
              <h2 className="font-display text-xl text-[#f0ebe3] tracking-widest">
                YOUR BAG
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="text-[#a89880] hover:text-[#f0ebe3] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <p className="text-[#a89880] text-sm tracking-wide">Your bag is empty.</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="text-[#c4a882] text-sm underline underline-offset-4 hover:text-[#f0ebe3] transition-colors"
                  >
                    Continue shopping
                  </Link>
                </div>
              ) : (
                <ul className="space-y-5">
                  {lines.map((line) => (
                    <li key={line.id} className="flex gap-4">
                      <div className="relative w-20 h-24 bg-[#242018] rounded overflow-hidden flex-shrink-0">
                        {line.merchandise.product.featuredImage ? (
                          <Image
                            src={line.merchandise.product.featuredImage.url}
                            alt={line.merchandise.product.featuredImage.altText ?? line.merchandise.product.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#2e2820]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#f0ebe3] text-sm font-medium leading-tight">
                          {line.merchandise.product.title}
                        </p>
                        <p className="text-[#a89880] text-xs mt-0.5">
                          {line.merchandise.selectedOptions.map((o) => o.value).join(" / ")}
                        </p>
                        <p className="text-[#c4a882] text-sm font-medium mt-1">
                          {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-2 border border-[#2e2820] rounded">
                            <button
                              onClick={() => updateItem(line.id, line.quantity - 1)}
                              disabled={isLoading}
                              className="press px-2 py-1 text-[#a89880] hover:text-[#f0ebe3] disabled:opacity-50"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="text-[#f0ebe3] text-sm w-5 text-center">{line.quantity}</span>
                            <button
                              onClick={() => updateItem(line.id, line.quantity + 1)}
                              disabled={isLoading}
                              className="press px-2 py-1 text-[#a89880] hover:text-[#f0ebe3] disabled:opacity-50"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(line.id)}
                            disabled={isLoading}
                            className="text-[#a89880] hover:text-red-400 transition-colors text-xs underline underline-offset-2 disabled:opacity-50"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {lines.length > 0 && (
              <div className="px-6 py-5 border-t border-[#2e2820] space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#a89880] tracking-wide">Subtotal</span>
                  <span className="text-[#f0ebe3] font-medium">
                    {cart?.cost.subtotalAmount
                      ? formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)
                      : "$0.00"}
                  </span>
                </div>
                <p className="text-[#a89880] text-xs">Shipping and taxes calculated at checkout.</p>
                <a
                  href={cart?.checkoutUrl ?? "#"}
                  className="press block w-full bg-[#c4a882] hover:bg-[#d4bc9a] text-[#0f0d0b] text-center font-display text-sm tracking-widest py-4"
                >
                  CHECKOUT
                </a>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block w-full text-center text-[#a89880] hover:text-[#f0ebe3] text-sm transition-colors"
                >
                  View full cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
