"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Product } from "@/types/shopify";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  badge?: string;
}

export default function ProductCard({ product, badge }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(0);

  const gallery = product.images.nodes.length > 0
    ? product.images.nodes
    : product.featuredImage
    ? [product.featuredImage]
    : [];

  // Auto-crossfade between photos when a card has more than one image
  useEffect(() => {
    if (gallery.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % gallery.length);
    }, 4500);
    return () => clearInterval(id);
  }, [gallery.length]);

  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  );

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#eef1f5]">
        {gallery.length === 0 ? (
          <div className="w-full h-full bg-[#e4e8ee]" />
        ) : (
          gallery.map((img, i) => (
            <Image
              key={img.url}
              src={img.url}
              alt={img.altText ?? product.title}
              fill
              className={`object-cover absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={i === 0}
            />
          ))
        )}

        {badge && (
          <div className="absolute top-3 left-3 bg-[#14171c] text-white text-[10px] font-bold tracking-widest px-3 py-1.5 uppercase">
            {badge}
          </div>
        )}
        {!product.availableForSale && !badge && (
          <div className="absolute top-3 left-3 bg-white/85 text-[#14171c] text-[10px] font-medium tracking-widest px-2 py-1 uppercase">
            Sold Out
          </div>
        )}

        {/* View product overlay — visible on hover (desktop) or always on touch */}
        <div
          className={`absolute inset-0 flex items-end justify-center pb-5 transition-opacity duration-300 md:pointer-events-none ${
            hovered ? "opacity-100" : "opacity-0 md:opacity-0 [@media(hover:none)]:opacity-100"
          }`}
        >
          <span className="bg-white/90 text-[#14171c] text-xs font-medium tracking-widest px-5 py-2.5 uppercase border border-white/60">
            View Product
          </span>
        </div>
      </div>

      <div className="pt-3 pb-1">
        <h3 className="text-[#14171c] text-sm font-medium tracking-wide">{product.title}</h3>
        <p className="text-[#8a98ad] text-sm mt-0.5">{price}</p>
      </div>
    </Link>
  );
}
