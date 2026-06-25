import { getCollectionByHandle, getCollections } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";

interface Params { params: Promise<{ handle: string }>; }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);
  if (!collection) return { title: "Collection not found" };
  return { title: collection.title, description: collection.description };
}

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((c) => ({ handle: c.handle }));
}

export const revalidate = 60;

const FEATURED_PRODUCT: Record<string, string> = {
  "brown-cargo-set": "chosen-brown-cargo-set",
  "washed-rhinestone-tracksuit": "rhinestone-tracksuit-set",
};

const PRODUCT_BADGES: Record<string, string> = {
  "chosen-brown-cargo-set": "Most Popular",
  "rhinestone-tracksuit-set": "New Arrival",
};

const COLLECTION_ITEM_ORDER: Record<string, string[]> = {
  "brown-cargo-set": ["brown-cargo-zip-up", "brown-cargo-pants"],
  "washed-rhinestone-tracksuit": ["rhinestone-zip-hoodie", "rhinestone-sweat-pants"],
};

const COLLECTION_HERO_IMAGES: Record<string, string> = {
  "brown-cargo-set": "/images/collections/Cargo/CargoHeader.jpg",
  "washed-rhinestone-tracksuit": "/images/collections/Rhinestone/2.png",
};

// Horizontal anchor for the hero title (% from left). Default 50 (centered),
// keeping the title aligned with the centered content below the hero.
const COLLECTION_TITLE_X: Record<string, string> = {};

export default async function CollectionPage({ params }: Params) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);
  if (!collection) notFound();

  const products = collection.products.nodes;
  const featuredHandle = FEATURED_PRODUCT[handle];
  const featured = featuredHandle ? products.find((p) => p.handle === featuredHandle) : null;
  const unordered = featured ? products.filter((p) => p.handle !== featuredHandle) : products;
  const order = COLLECTION_ITEM_ORDER[handle];
  const rest = order
    ? [...order.map((h) => unordered.find((p) => p.handle === h)).filter(Boolean) as typeof unordered,
       ...unordered.filter((p) => !order.includes(p.handle))]
    : unordered;

  // Featured (the set) shown first, then the individual pieces — all as equal cards
  const ordered = featured ? [featured, ...rest] : rest;

  const heroImageSrc = COLLECTION_HERO_IMAGES[handle];
  const heroImage = heroImageSrc ?? collection.image?.url ?? null;

  return (
    <div className="pt-14 min-h-screen bg-[#f7f8fa]">

      {/* Hero */}
      <div className="relative h-[42vh] min-h-[300px] overflow-hidden">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={collection.title}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-[#eef1f5]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/30" />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-0 right-0 px-6 sm:px-10">
          <p className="text-white/55 text-xs tracking-widest uppercase">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-white transition-colors">Collections</Link>
            <span className="mx-2">/</span>
            <span className="text-white/90">{collection.title}</span>
          </p>
        </div>

        {/* Title — anchored at COLLECTION_TITLE_X (defaults to center) */}
        <div
          className="absolute inset-y-0 -translate-x-1/2 flex flex-col items-center justify-center text-center px-6"
          style={{ left: COLLECTION_TITLE_X[handle] ?? "50%" }}
        >
          <p className="text-white/70 text-xs tracking-[0.4em] uppercase mb-4">Chosen Clothing</p>
          <h1 className="font-display text-5xl sm:text-7xl text-white tracking-wider leading-none">
            {collection.title.toUpperCase()}
          </h1>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 sm:py-20">

        {ordered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#5b6573] text-sm tracking-wide">New pieces dropping soon.</p>
          </div>
        ) : (
          <>
            {collection.description && (
              <p className="text-center text-[#5b6573] text-sm leading-relaxed max-w-md mx-auto mb-14">
                {collection.description}
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {ordered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  badge={PRODUCT_BADGES[product.handle]}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
