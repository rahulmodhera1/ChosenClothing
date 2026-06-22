"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product, ProductVariant } from "@/types/shopify";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import { easeOut } from "@/lib/motion";

interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  const { addItem, isLoading } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants.nodes[0]
  );
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const images = product.images.nodes.length > 0 ? product.images.nodes : (product.featuredImage ? [product.featuredImage] : []);

  const handleAddToCart = async () => {
    if (!selectedVariant.availableForSale) return;
    await addItem(selectedVariant.id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const sizeOptions = product.variants.nodes.map((v) => ({
    variant: v,
    size: v.selectedOptions.find((o) => o.name === "Size")?.value ?? v.title,
  }));

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="space-y-3">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="relative aspect-[3/4] bg-[#1a1714] overflow-hidden"
            >
              {images[activeImage] ? (
                <Image
                  src={images[activeImage].url}
                  alt={images[activeImage].altText ?? product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-[#2e2820] flex items-center justify-center">
                  <span className="text-[#a89880] text-sm">No image</span>
                </div>
              )}
            </motion.div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`press relative w-16 h-20 overflow-hidden flex-shrink-0 ${
                      activeImage === i ? "ring-1 ring-[#c4a882]" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.altText ?? `${product.title} ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
            >
              <p className="text-[#a89880] text-xs tracking-[0.3em] uppercase mb-2">Chosen</p>
              <h1 className="font-display text-4xl sm:text-5xl text-[#f0ebe3] tracking-wider leading-tight">
                {product.title.toUpperCase()}
              </h1>

              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-[#c4a882] text-2xl font-medium">
                  {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
                </span>
                {selectedVariant.compareAtPrice && (
                  <span className="text-[#a89880] text-lg line-through">
                    {formatPrice(selectedVariant.compareAtPrice.amount, selectedVariant.compareAtPrice.currencyCode)}
                  </span>
                )}
              </div>

              {/* Size selector */}
              {sizeOptions.length > 1 && (
                <div className="mt-8">
                  <p className="text-[#f0ebe3] text-xs font-medium tracking-widest uppercase mb-3">
                    Size: <span className="text-[#c4a882]">{selectedVariant.selectedOptions.find((o) => o.name === "Size")?.value ?? selectedVariant.title}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sizeOptions.map(({ variant, size }) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        disabled={!variant.availableForSale}
                        className={`press w-12 h-12 text-xs font-medium tracking-widest border ${
                          selectedVariant.id === variant.id
                            ? "bg-[#f0ebe3] border-[#f0ebe3] text-[#0f0d0b]"
                            : variant.availableForSale
                            ? "border-[#2e2820] text-[#a89880] hover:border-[#c4a882] hover:text-[#c4a882]"
                            : "border-[#1a1714] text-[#2e2820] cursor-not-allowed line-through"
                        }`}
                        aria-label={`Select size ${size}`}
                        aria-pressed={selectedVariant.id === variant.id}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to cart */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant.availableForSale || isLoading}
                  className={`press w-full font-display text-sm tracking-widest py-5 ${
                    !selectedVariant.availableForSale
                      ? "bg-[#1a1714] border border-[#2e2820] text-[#a89880] cursor-not-allowed"
                      : added
                      ? "bg-[#5c3d1e] text-[#f0ebe3]"
                      : "bg-[#c4a882] hover:bg-[#d4bc9a] text-[#0f0d0b]"
                  }`}
                >
                  {!selectedVariant.availableForSale
                    ? "SOLD OUT"
                    : isLoading
                    ? "ADDING..."
                    : added
                    ? "ADDED TO BAG"
                    : "ADD TO BAG"}
                </button>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mt-8 pt-8 border-t border-[#2e2820]">
                  <p className="text-[#a89880] text-sm leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="text-[#a89880] text-[10px] tracking-widest uppercase border border-[#2e2820] px-2.5 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
