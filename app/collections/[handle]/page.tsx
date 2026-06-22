import { getCollectionByHandle, getCollections } from "@/lib/shopify";
import { notFound } from "next/navigation";
import Image from "next/image";
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

export default async function CollectionPage({ params }: Params) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);
  if (!collection) notFound();
  return (
    <div className="pt-16 min-h-screen">
      <div className="relative h-[40vh] min-h-[280px] overflow-hidden">
        {collection.image ? <Image src={collection.image.url} alt={collection.image.altText ?? collection.title} fill className="object-cover" priority sizes="100vw" /> : <div className="w-full h-full bg-[#eef1f5]" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-10">
          <h1 className="font-display text-4xl sm:text-6xl text-white tracking-wider">{collection.title.toUpperCase()}</h1>
          {collection.description && <p className="text-white/75 text-sm mt-2 max-w-lg leading-relaxed">{collection.description}</p>}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {collection.products.nodes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {collection.products.nodes.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : <div className="text-center py-20"><p className="text-[#5b6573] text-sm tracking-wide">New pieces dropping soon.</p></div>}
      </div>
    </div>
  );
}
