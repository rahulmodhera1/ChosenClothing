"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CartPageClient() {
  const { cart, isLoading, removeItem, updateItem } = useCart();
  const lines = cart?.lines.nodes ?? [];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-[#a89880] text-xs tracking-[0.3em] uppercase mb-2">Review</p>
        <h1 className="font-display text-5xl sm:text-6xl text-[#f0ebe3] tracking-wider mb-12">YOUR BAG</h1>
        {lines.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#a89880] text-sm mb-6 tracking-wide">Your bag is empty.</p>
            <Link href="/shop" className="inline-block border border-[#c4a882] text-[#c4a882] hover:bg-[#c4a882] hover:text-[#0f0d0b] font-display text-sm tracking-widest px-10 py-4 transition-all duration-300">SHOP NOW</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {lines.map((line) => (
                <div key={line.id} className="flex gap-5 pb-6 border-b border-[#2e2820]">
                  <div className="relative w-24 h-32 bg-[#1a1714] flex-shrink-0 overflow-hidden">
                    {line.merchandise.product.featuredImage ? <Image src={line.merchandise.product.featuredImage.url} alt={line.merchandise.product.featuredImage.altText ?? line.merchandise.product.title} fill className="object-cover" sizes="96px" /> : <div className="w-full h-full bg-[#2e2820]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-[#f0ebe3] font-medium text-sm leading-tight">{line.merchandise.product.title}</h3>
                        <p className="text-[#a89880] text-xs mt-1">{line.merchandise.selectedOptions.map((o) => o.value).join(" / ")}</p>
                      </div>
                      <p className="text-[#c4a882] font-medium text-sm flex-shrink-0">{formatPrice((parseFloat(line.merchandise.price.amount) * line.quantity).toString(), line.merchandise.price.currencyCode)}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2 border border-[#2e2820]">
                        <button onClick={() => updateItem(line.id, line.quantity - 1)} disabled={isLoading} className="px-3 py-1.5 text-[#a89880] hover:text-[#f0ebe3] transition-colors disabled:opacity-50" aria-label="Decrease quantity">-</button>
                        <span className="text-[#f0ebe3] text-sm w-5 text-center">{line.quantity}</span>
                        <button onClick={() => updateItem(line.id, line.quantity + 1)} disabled={isLoading} className="px-3 py-1.5 text-[#a89880] hover:text-[#f0ebe3] transition-colors disabled:opacity-50" aria-label="Increase quantity">+</button>
                      </div>
                      <button onClick={() => removeItem(line.id)} disabled={isLoading} className="text-[#a89880] hover:text-red-400 transition-colors text-xs disabled:opacity-50">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:sticky lg:top-24 lg:self-start bg-[#1a1714] border border-[#2e2820] p-6 space-y-4">
              <h2 className="font-display text-lg text-[#f0ebe3] tracking-widest">ORDER SUMMARY</h2>
              <div className="flex justify-between text-sm">
                <span className="text-[#a89880]">Subtotal</span>
                <span className="text-[#f0ebe3]">{cart?.cost.subtotalAmount ? formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode) : "$0.00"}</span>
              </div>
              <p className="text-[#a89880] text-xs">Shipping and taxes calculated at checkout.</p>
              <a href={cart?.checkoutUrl ?? "#"} className="block w-full bg-[#c4a882] hover:bg-[#d4bc9a] text-[#0f0d0b] text-center font-display text-sm tracking-widest py-4 transition-colors">CHECKOUT</a>
              <Link href="/shop" className="block w-full text-center text-[#a89880] hover:text-[#f0ebe3] text-xs transition-colors">Continue shopping</Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
