import type { Product, Collection, Cart } from "@/types/shopify";

const sizes = (ids: number[], price: string) => ids.map((id, i) => ({
  id: `gid://shopify/ProductVariant/${id}`,
  title: ["S", "M", "L", "XL"][i],
  availableForSale: true,
  price: { amount: price, currencyCode: "CAD" },
  compareAtPrice: null,
  selectedOptions: [{ name: "Size", value: ["S", "M", "L", "XL"][i] }],
}));

export const mockProducts: Product[] = [
  // ── Brown Cargo Set ──────────────────────────────────────────────────────
  {
    id: "gid://shopify/Product/1",
    title: "Brown Cargo Set",
    handle: "chosen-brown-cargo-set",
    description: "The full Brown Cargo Set. Premium heavyweight cotton with oversized cargo pockets. Built for the streets, designed for longevity.",
    descriptionHtml: "<p>The full Brown Cargo Set. Premium heavyweight cotton with oversized cargo pockets. Built for the streets, designed for longevity.</p>",
    featuredImage: { url: "/images/collections/Cargo/2.png", altText: "Brown Cargo Set", width: 800, height: 1000 },
    images: { nodes: [
      { url: "/images/collections/Cargo/2.png", altText: "Brown Cargo Set", width: 800, height: 1000 },
      { url: "/images/collections/Cargo/1.png", altText: "Brown Cargo Set styled", width: 800, height: 1000 },
    ]},
    priceRange: { minVariantPrice: { amount: "159.99", currencyCode: "CAD" }, maxVariantPrice: { amount: "159.99", currencyCode: "CAD" } },
    variants: { nodes: sizes([1, 2, 3, 4], "159.99") },
    tags: ["cargo", "set", "featured"],
    availableForSale: true,
  },
  {
    id: "gid://shopify/Product/3",
    title: "Brown Cargo Zip Up",
    handle: "brown-cargo-zip-up",
    description: "The Brown Cargo Zip Up. Full-zip heavyweight corduroy with side cargo pockets. Pairs perfectly with the pants or worn solo.",
    descriptionHtml: "<p>The Brown Cargo Zip Up. Full-zip heavyweight corduroy with cargo pockets.</p>",
    featuredImage: { url: "/images/collections/Cargo/3.png", altText: "Brown Cargo Zip Up", width: 800, height: 1000 },
    images: { nodes: [
      { url: "/images/collections/Cargo/3.png", altText: "Brown Cargo Zip Up", width: 800, height: 1000 },
      { url: "/images/collections/Cargo/4.png", altText: "Brown Cargo Zip Up styled", width: 800, height: 1000 },
    ]},
    priceRange: { minVariantPrice: { amount: "89.99", currencyCode: "CAD" }, maxVariantPrice: { amount: "89.99", currencyCode: "CAD" } },
    variants: { nodes: sizes([9, 10, 11, 12], "89.99") },
    tags: ["cargo", "zip-up"],
    availableForSale: true,
  },
  {
    id: "gid://shopify/Product/2",
    title: "Brown Cargo Pants",
    handle: "brown-cargo-pants",
    description: "Heavyweight brown cargo pants with dual side pockets and adjustable waistband. The foundation of the set, worn alone or together.",
    descriptionHtml: "<p>Heavyweight brown cargo pants with dual side pockets and adjustable waistband.</p>",
    featuredImage: { url: "/images/collections/Cargo/1.png", altText: "Brown Cargo Pants", width: 800, height: 1000 },
    images: { nodes: [
      { url: "/images/collections/Cargo/1.png", altText: "Brown Cargo Pants", width: 800, height: 1000 },
    ]},
    priceRange: { minVariantPrice: { amount: "89.99", currencyCode: "CAD" }, maxVariantPrice: { amount: "89.99", currencyCode: "CAD" } },
    variants: { nodes: sizes([5, 6, 7, 8], "89.99") },
    tags: ["cargo", "pants"],
    availableForSale: true,
  },

  // ── Washed Rhinestone Tracksuit ──────────────────────────────────────────
  {
    id: "gid://shopify/Product/4",
    title: "Washed Rhinestone Tracksuit",
    handle: "rhinestone-tracksuit-set",
    description: "The full Washed Rhinestone Tracksuit. Oversized washed fleece with rhinestone Chosen logo. Unisex fit.",
    descriptionHtml: "<p>The full Washed Rhinestone Tracksuit. Oversized washed fleece with rhinestone Chosen logo. Unisex fit.</p>",
    featuredImage: { url: "/images/collections/Rhinestone/2.png", altText: "Washed Rhinestone Tracksuit", width: 800, height: 1000 },
    images: { nodes: [
      { url: "/images/collections/Rhinestone/2.png", altText: "Washed Rhinestone Tracksuit", width: 800, height: 1000 },
      { url: "/images/collections/Rhinestone/1.png", altText: "Washed Rhinestone Tracksuit styled", width: 800, height: 1000 },
    ]},
    priceRange: { minVariantPrice: { amount: "189.99", currencyCode: "CAD" }, maxVariantPrice: { amount: "189.99", currencyCode: "CAD" } },
    variants: { nodes: sizes([13, 14, 15, 16], "189.99") },
    tags: ["rhinestone", "tracksuit", "set", "new-arrivals"],
    availableForSale: true,
  },
  {
    id: "gid://shopify/Product/5",
    title: "Rhinestone Zip Up Hoodie",
    handle: "rhinestone-zip-hoodie",
    description: "Oversized washed zip-up hoodie with rhinestone Chosen logo on chest. Worn alone or as part of the full set.",
    descriptionHtml: "<p>Oversized washed zip-up hoodie with rhinestone Chosen logo. Worn solo or as the set.</p>",
    featuredImage: { url: "/images/collections/Rhinestone/3.png", altText: "Rhinestone Zip Up Hoodie", width: 800, height: 1000 },
    images: { nodes: [
      { url: "/images/collections/Rhinestone/3.png", altText: "Rhinestone Zip Up Hoodie", width: 800, height: 1000 },
    ]},
    priceRange: { minVariantPrice: { amount: "109.99", currencyCode: "CAD" }, maxVariantPrice: { amount: "109.99", currencyCode: "CAD" } },
    variants: { nodes: sizes([17, 18, 19, 20], "109.99") },
    tags: ["rhinestone", "hoodie"],
    availableForSale: true,
  },
  {
    id: "gid://shopify/Product/6",
    title: "Rhinestone Sweat Pants",
    handle: "rhinestone-sweat-pants",
    description: "Washed fleece sweatpants with rhinestone Chosen logo on the leg. Pairs with the hoodie or worn alone.",
    descriptionHtml: "<p>Washed fleece sweatpants with rhinestone Chosen logo. Pairs with the hoodie or worn alone.</p>",
    featuredImage: { url: "/images/collections/Rhinestone/1.png", altText: "Rhinestone Sweat Pants", width: 800, height: 1000 },
    images: { nodes: [
      { url: "/images/collections/Rhinestone/1.png", altText: "Rhinestone Sweat Pants", width: 800, height: 1000 },
    ]},
    priceRange: { minVariantPrice: { amount: "89.99", currencyCode: "CAD" }, maxVariantPrice: { amount: "89.99", currencyCode: "CAD" } },
    variants: { nodes: sizes([21, 22, 23, 24], "89.99") },
    tags: ["rhinestone", "pants"],
    availableForSale: true,
  },
];

export const mockCollections: Collection[] = [
  {
    id: "gid://shopify/Collection/1",
    title: "Brown Cargo Set",
    handle: "brown-cargo-set",
    description: "The signature Brown Cargo Set. Built for the streets.",
    image: { url: "/images/collections/Cargo/CargoHeader.jpg", altText: "Brown Cargo Set Collection", width: 1920, height: 800 },
    products: { nodes: [mockProducts[0], mockProducts[1], mockProducts[2]] },
  },
  {
    id: "gid://shopify/Collection/2",
    title: "Washed Rhinestone Tracksuit",
    handle: "washed-rhinestone-tracksuit",
    description: "New arrivals. The Washed Rhinestone Tracksuit.",
    image: { url: "/images/collections/Rhinestone/2.png", altText: "Washed Rhinestone Tracksuit Collection", width: 1200, height: 800 },
    products: { nodes: [mockProducts[3], mockProducts[4], mockProducts[5]] },
  },
];

export const mockCart: Cart = {
  id: "mock-cart-id",
  checkoutUrl: "#",
  totalQuantity: 0,
  cost: {
    subtotalAmount: { amount: "0.00", currencyCode: "CAD" },
    totalAmount: { amount: "0.00", currencyCode: "CAD" },
  },
  lines: { nodes: [] },
};
