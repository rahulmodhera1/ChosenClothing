import { getAllProducts, getCollections } from "@/lib/shopify";
import ShopClient from "./ShopClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse all Chosen products. Premium Toronto streetwear.",
};

export const revalidate = 60;

export default async function ShopPage() {
  const [products, collections] = await Promise.all([getAllProducts(), getCollections()]);
  return <ShopClient products={products} collections={collections} />;
}
