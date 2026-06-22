import { getAllProducts } from "@/lib/shopify";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import MostPopular from "@/components/home/MostPopular";
import LookbookTeaser from "@/components/home/LookbookTeaser";
import Newsletter from "@/components/home/Newsletter";
import AmbassadorCallout from "@/components/home/AmbassadorCallout";

export const revalidate = 60;

export default async function HomePage() {
  const products = await getAllProducts();
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <MostPopular products={products} />
      <LookbookTeaser />
      <Newsletter />
      <AmbassadorCallout />
    </>
  );
}
