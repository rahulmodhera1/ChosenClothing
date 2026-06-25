"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CartPageClient() {
  const { cart, isLoading, removeItem, updateItem } = useCart();
  const lines = cart?.lines.nodes ?? [];

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
      >
        <p className="text-[#5b6573] text-xs tracking-[0.3em] uppercase mb-2">Review</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#14171c] tracking-wider mb-10 sm:mb-12">YOUR BAG</h1>

        {lines.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#5b6573] text-sm mb-6 tracking-wide">Your bag is empty.</p>
            <Link
              href="/shop"
              className="press inline-block border border-[#8a98ad] text-[#8a98ad] hover:bg-[#8a98ad] hover:text-white font-display text-sm tracking-widest px-10 py-4"
            >
              SHOP NOW
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 space-y-6">
              {lines.map((line) => (
                <div key={line.id} className="flex gap-3 sm:gap-5 pb-6 border-b border-[#dde1e8]">
                  <div className="relative w-24 h-32 bg-[#eef1f5] flex-shrink-0 overflow-hidden">
                    {line.merchandise.product.featuredImage ? (
                      <Image
                        src={line.merchandise.product.featuredImage.url}
                        alt={line.merchandise.product.featuredImage.altText ?? line.merchandise.product.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#e4e8ee]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-[#14171c] font-medium text-sm leading-tight">
                          {line.merchandise.product.title}
                        </h3>
                        <p className="text-[#5b6573] text-xs mt-1">
                          {line.merchandise.selectedOptions.map((o) => o.value).join(" / ")}
                        </p>
                      </div>
                      <p className="text-[#8a98ad] font-medium text-sm flex-shrink-0">
                        {formatPrice(
                          (parseFloat(line.merchandise.price.amount) * line.quantity).toString(),
                          line.merchandise.price.currencyCode
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2 border border-[#dde1e8]">
                        <button
                          onClick={() => updateItem(line.id, line.quantity - 1)}
                          disabled={isLoading}
                          className="press px-3 py-2.5 min-w-[44px] text-[#5b6573] hover:text-[#14171c] disabled:opacity-50"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="text-[#14171c] text-sm w-5 text-center">{line.quantity}</span>
                        <button
                          onClick={() => updateItem(line.id, line.quantity + 1)}
                          disabled={isLoading}
                          className="press px-3 py-2.5 min-w-[44px] text-[#5b6573] hover:text-[#14171c] disabled:opacity-50"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(line.id)}
                        disabled={isLoading}
                        className="text-[#5b6573] hover:text-red-400 transition-colors text-xs disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-24 lg:self-start bg-[#eef1f5] border border-[#dde1e8] p-6 space-y-4">
              <h2 className="font-display text-lg text-[#14171c] tracking-widest">ORDER SUMMARY</h2>
              <div className="flex justify-between text-sm">
                <span className="text-[#5b6573]">Subtotal</span>
                <span className="text-[#14171c]">
                  {cart?.cost.subtotalAmount
                    ? formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)
                    : "$0.00"}
                </span>
              </div>
              <p className="text-[#5b6573] text-xs">Shipping and taxes calculated at checkout.</p>
              <a
                href={cart?.checkoutUrl ?? "#"}
                className="press block w-full bg-[#8a98ad] hover:bg-[#6f7e95] text-white text-center font-display text-sm tracking-widest py-4"
              >
                CHECKOUT
              </a>
              <Link
                href="/shop"
                className="block w-full text-center text-[#5b6573] hover:text-[#14171c] text-xs transition-colors"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
