import { getProductByHandle, getAllProducts } from "@/lib/shopify";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductClient from "./ProductClient";

interface Params { params: Promise<{ handle: string }>; }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Product not found" };
  return { title: product.title, description: product.description, openGraph: { images: product.featuredImage ? [product.featuredImage.url] : [] } };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export const revalidate = 60;

export default async function ProductPage({ params }: Params) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();
  return <ProductClient product={product} />;
}
