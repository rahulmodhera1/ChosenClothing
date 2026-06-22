"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/types/shopify";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  const primaryImage = product.images.nodes[0] ?? product.featuredImage;
  const hoverImage = product.images.nodes[1] ?? null;

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
      <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1714]">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.altText ?? product.title}
            fill
            className={`object-cover transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              hovered && hoverImage ? "opacity-0" : "opacity-100"
            } group-hover:scale-105`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-[#2e2820]" />
        )}

        {hoverImage && (
          <Image
            src={hoverImage.url}
            alt={hoverImage.altText ?? product.title}
            fill
            className={`object-cover absolute inset-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              hovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}

        {!product.availableForSale && (
          <div className="absolute top-3 left-3 bg-[#0f0d0b]/80 text-[#a89880] text-[10px] font-medium tracking-widest px-2 py-1 uppercase">
            Sold Out
          </div>
        )}

        {/* View product overlay — visible on hover (desktop) or always on touch */}
        <div
          className={`absolute inset-0 flex items-end justify-center pb-5 transition-opacity duration-300 md:pointer-events-none ${
            hovered ? "opacity-100" : "opacity-0 md:opacity-0 [@media(hover:none)]:opacity-100"
          }`}
        >
          <span className="bg-[#0f0d0b]/80 text-[#f0ebe3] text-xs font-medium tracking-widest px-5 py-2.5 uppercase border border-[#2e2820]">
            View Product
          </span>
        </div>
      </div>

      <div className="pt-3 pb-1">
        <h3 className="text-[#f0ebe3] text-sm font-medium tracking-wide">{product.title}</h3>
        <p className="text-[#c4a882] text-sm mt-0.5">{price}</p>
      </div>
    </Link>
  );
}
