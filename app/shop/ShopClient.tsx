"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Product, Collection } from "@/types/shopify";
import ProductCard from "@/components/ProductCard";
import { easeOut } from "@/lib/motion";

interface ShopClientProps {
  products: Product[];
  collections: Collection[];
}

export default function ShopClient({ products, collections }: ShopClientProps) {
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  const filtered = activeCollection
    ? products.filter((p) =>
        collections
          .find((c) => c.handle === activeCollection)
          ?.products.nodes.some((cp) => cp.id === p.id)
      )
    : products;

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <p className="text-[#a89880] text-xs tracking-[0.3em] uppercase mb-2">Everything</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#f0ebe3] tracking-wider">ALL PRODUCTS</h1>
      </div>

      {/* Collection filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        <button
          onClick={() => setActiveCollection(null)}
          className={`press text-xs font-medium tracking-widest uppercase px-5 py-2.5 border ${
            !activeCollection
              ? "bg-[#c4a882] border-[#c4a882] text-[#0f0d0b]"
              : "border-[#2e2820] text-[#a89880] hover:border-[#c4a882] hover:text-[#c4a882]"
          }`}
        >
          All
        </button>
        {collections.map((col) => (
          <button
            key={col.handle}
            onClick={() => setActiveCollection(col.handle)}
            className={`press text-xs font-medium tracking-widest uppercase px-5 py-2.5 border ${
              activeCollection === col.handle
                ? "bg-[#c4a882] border-[#c4a882] text-[#0f0d0b]"
                : "border-[#2e2820] text-[#a89880] hover:border-[#c4a882] hover:text-[#c4a882]"
            }`}
          >
            {col.title}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: easeOut }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-[#a89880] text-sm tracking-wide">No products found.</p>
        </div>
      )}
    </div>
  );
}
