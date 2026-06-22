"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeOut } from "@/lib/motion";
import type { Product } from "@/types/shopify";
import ProductCard from "@/components/ProductCard";

interface MostPopularProps {
  products: Product[];
}

export default function MostPopular({ products }: MostPopularProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: easeOut }}
        className="mb-10"
      >
        <p className="text-[#a89880] text-xs tracking-[0.3em] uppercase mb-2">Our Drop</p>
        <h2 className="font-display text-4xl sm:text-5xl text-[#f0ebe3] tracking-wider">MOST POPULAR</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1, ease: easeOut }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
