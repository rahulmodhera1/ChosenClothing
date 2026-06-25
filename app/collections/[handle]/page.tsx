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
};

const PRODUCT_BADGES: Record<string, string> = {
  "chosen-brown-cargo-set": "Most Popular",
};

const COLLECTION_HERO_IMAGES: Record<string, string> = {
  "brown-cargo-set": "/images/collections/Cargo/CargoHeader.jpg",
  "washed-rhinestone-tracksuit": "/images/collections/Rhinestone/hero.jpg",
};

export default async function CollectionPage({ params }: Params) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);
  if (!collection) notFound();

  const products = collection.products.nodes;
  const featuredHandle = FEATURED_PRODUCT[handle];
  const featured = featuredHandle ? products.find((p) => p.handle === featuredHandle) : null;
  const rest = featured ? products.filter((p) => p.handle !== featuredHandle) : products;

  const heroImageSrc = COLLECTION_HERO_IMAGES[handle];
  const heroImage = heroImageSrc ?? collection.image?.url ?? null;

  return (
    <div className="pt-14 min-h-screen bg-[#f7f8fa]">

      {/* Hero */}
      <div className="relative h-[60vh] min-h-[380px] overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-0 right-0 px-6 sm:px-10">
          <p className="text-white/50 text-xs tracking-widest uppercase">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-white/80 transition-colors">Collections</Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">{collection.title}</span>
          </p>
        </div>

        {/* Title block */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-12">
          <p className="text-white/55 text-xs tracking-[0.35em] uppercase mb-3">Chosen Clothing</p>
          <h1 className="font-display text-5xl sm:text-7xl text-white tracking-wider leading-none">
            {collection.title.toUpperCase()}
          </h1>
          {collection.description && (
            <p className="text-white/65 text-sm mt-3 max-w-md leading-relaxed">
              {collection.description}
            </p>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#5b6573] text-sm tracking-wide">New pieces dropping soon.</p>
          </div>
        ) : (
          <>
            {/* Featured product — full-width editorial card */}
            {featured && (
              <div className="mb-10">
                <Link href={`/products/${featured.handle}`} className="group block relative overflow-hidden aspect-[16/7] sm:aspect-[21/9] bg-[#eef1f5]">
                  {featured.images.nodes[0] || featured.featuredImage ? (
                    <Image
                      src={(featured.images.nodes[0] ?? featured.featuredImage!).url}
                      alt={featured.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      priority
                      sizes="100vw"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-white text-[#14171c] text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2">
                      ★ Most Popular
                    </span>
                  </div>

                  {/* Text */}
                  <div className="absolute bottom-0 left-0 p-8 sm:p-12">
                    <p className="text-white/60 text-xs tracking-[0.3em] uppercase mb-2">The Full Set</p>
                    <h2 className="font-display text-3xl sm:text-5xl text-white tracking-wider leading-tight">
                      {featured.title.toUpperCase()}
                    </h2>
                    <p className="text-white/80 text-lg mt-2 font-medium">
                      {featured.priceRange?.minVariantPrice
                        ? `$${parseFloat(featured.priceRange.minVariantPrice.amount).toFixed(2)}`
                        : ""}
                    </p>
                    <span className="inline-block mt-5 text-white text-xs tracking-[0.25em] uppercase border-b border-white/60 pb-0.5 group-hover:border-white transition-colors">
                      Shop Now
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {/* Rest of the products */}
            {rest.length > 0 && (
              <>
                <div className="flex items-center gap-4 mb-8">
                  <p className="text-[#5b6573] text-xs tracking-[0.3em] uppercase">Complete the Look</p>
                  <div className="flex-1 h-px bg-[#dde1e8]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      badge={PRODUCT_BADGES[product.handle]}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
