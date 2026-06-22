import type { Product, Collection, Cart } from "@/types/shopify";

export const mockProducts: Product[] = [
  {
    id: "gid://shopify/Product/1",
    title: "Brown Cargo Set",
    handle: "chosen-brown-cargo-set",
    description: "The full Brown Cargo Set. Premium heavyweight cotton with oversized cargo pockets. Built for the streets, designed for longevity.",
    descriptionHtml: "<p>The full Brown Cargo Set. Premium heavyweight cotton with oversized cargo pockets. Built for the streets, designed for longevity.</p>",
    featuredImage: { url: "/images/products/brown-cargo-set-1.jpg", altText: "Brown Cargo Set", width: 800, height: 1000 },
    images: {
      nodes: [
        { url: "/images/products/brown-cargo-set-1.jpg", altText: "Brown Cargo Set front", width: 800, height: 1000 },
        { url: "/images/products/brown-cargo-set-2.jpg", altText: "Brown Cargo Set back", width: 800, height: 1000 },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: "159.99", currencyCode: "CAD" },
      maxVariantPrice: { amount: "159.99", currencyCode: "CAD" },
    },
    variants: {
      nodes: [
        { id: "gid://shopify/ProductVariant/1", title: "S", availableForSale: true, price: { amount: "159.99", currencyCode: "CAD" }, compareAtPrice: null, selectedOptions: [{ name: "Size", value: "S" }] },
        { id: "gid://shopify/ProductVariant/2", title: "M", availableForSale: true, price: { amount: "159.99", currencyCode: "CAD" }, compareAtPrice: null, selectedOptions: [{ name: "Size", value: "M" }] },
        { id: "gid://shopify/ProductVariant/3", title: "L", availableForSale: true, price: { amount: "159.99", currencyCode: "CAD" }, compareAtPrice: null, selectedOptions: [{ name: "Size", value: "L" }] },
        { id: "gid://shopify/ProductVariant/4", title: "XL", availableForSale: true, price: { amount: "159.99", currencyCode: "CAD" }, compareAtPrice: null, selectedOptions: [{ name: "Size", value: "XL" }] },
      ],
    },
    tags: ["cargo", "set", "featured"],
    availableForSale: true,
  },
  {
    id: "gid://shopify/Product/2",
    title: "Brown Cargo Pants",
    handle: "brown-cargo-pants",
    description: "Heavyweight brown cargo pants with dual side pockets and adjustable waistband. The foundation of the set, worn alone or together.",
    descriptionHtml: "<p>Heavyweight brown cargo pants with dual side pockets and adjustable waistband. The foundation of the set, worn alone or together.</p>",
    featuredImage: { url: "/images/products/brown-cargo-pants-1.jpg", altText: "Brown Cargo Pants", width: 800, height: 1000 },
    images: {
      nodes: [
        { url: "/images/products/brown-cargo-pants-1.jpg", altText: "Brown Cargo Pants front", width: 800, height: 1000 },
        { url: "/images/products/brown-cargo-pants-2.jpg", altText: "Brown Cargo Pants side", width: 800, height: 1000 },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: "89.99", currencyCode: "CAD" },
      maxVariantPrice: { amount: "89.99", currencyCode: "CAD" },
    },
    variants: {
      nodes: [
        { id: "gid://shopify/ProductVariant/5", title: "S", availableForSale: true, price: { amount: "89.99", currencyCode: "CAD" }, compareAtPrice: null, selectedOptions: [{ name: "Size", value: "S" }] },
        { id: "gid://shopify/ProductVariant/6", title: "M", availableForSale: true, price: { amount: "89.99", currencyCode: "CAD" }, compareAtPrice: null, selectedOptions: [{ name: "Size", value: "M" }] },
        { id: "gid://shopify/ProductVariant/7", title: "L", availableForSale: true, price: { amount: "89.99", currencyCode: "CAD" }, compareAtPrice: null, selectedOptions: [{ name: "Size", value: "L" }] },
        { id: "gid://shopify/ProductVariant/8", title: "XL", availableForSale: true, price: { amount: "89.99", currencyCode: "CAD" }, compareAtPrice: null, selectedOptions: [{ name: "Size", value: "XL" }] },
      ],
    },
    tags: ["cargo", "pants"],
    availableForSale: true,
  },
  {
    id: "gid://shopify/Product/3",
    title: "Brown Cargo Zip Up",
    handle: "brown-cargo-zip-up",
    description: "The Brown Cargo Zip Up. Full-zip heavyweight fleece with side cargo pockets. Pairs perfectly with the pants or worn solo.",
    descriptionHtml: "<p>The Brown Cargo Zip Up. Full-zip heavyweight fleece with side cargo pockets. Pairs perfectly with the pants or worn solo.</p>",
    featuredImage: { url: "/images/products/brown-cargo-zipup-1.jpg", altText: "Brown Cargo Zip Up", width: 800, height: 1000 },
    images: {
      nodes: [
        { url: "/images/products/brown-cargo-zipup-1.jpg", altText: "Brown Cargo Zip Up front", width: 800, height: 1000 },
        { url: "/images/products/brown-cargo-zipup-2.jpg", altText: "Brown Cargo Zip Up back", width: 800, height: 1000 },
      ],
    },
    priceRange: {
      minVariantPrice: { amount: "89.99", currencyCode: "CAD" },
      maxVariantPrice: { amount: "89.99", currencyCode: "CAD" },
    },
    variants: {
      nodes: [
        { id: "gid://shopify/ProductVariant/9", title: "S", availableForSale: true, price: { amount: "89.99", currencyCode: "CAD" }, compareAtPrice: null, selectedOptions: [{ name: "Size", value: "S" }] },
        { id: "gid://shopify/ProductVariant/10", title: "M", availableForSale: true, price: { amount: "89.99", currencyCode: "CAD" }, compareAtPrice: null, selectedOptions: [{ name: "Size", value: "M" }] },
        { id: "gid://shopify/ProductVariant/11", title: "L", availableForSale: true, price: { amount: "89.99", currencyCode: "CAD" }, compareAtPrice: null, selectedOptions: [{ name: "Size", value: "L" }] },
        { id: "gid://shopify/ProductVariant/12", title: "XL", availableForSale: true, price: { amount: "89.99", currencyCode: "CAD" }, compareAtPrice: null, selectedOptions: [{ name: "Size", value: "XL" }] },
      ],
    },
    tags: ["cargo", "zip-up", "new-arrivals"],
    availableForSale: true,
  },
];

export const mockCollections: Collection[] = [
  {
    id: "gid://shopify/Collection/1",
    title: "Brown Cargo Set",
    handle: "brown-cargo-set",
    description: "The signature Brown Cargo Set. Built for the streets.",
    image: { url: "/images/collections/brown-cargo-set.jpg", altText: "Brown Cargo Set Collection", width: 1200, height: 800 },
    products: { nodes: [] },
  },
  {
    id: "gid://shopify/Collection/2",
    title: "Washed Rhinestone Tracksuit",
    handle: "washed-rhinestone-tracksuit",
    description: "New arrivals. The Washed Rhinestone Tracksuit.",
    image: { url: "/images/collections/rhinestone-tracksuit.jpg", altText: "Washed Rhinestone Tracksuit Collection", width: 1200, height: 800 },
    products: { nodes: [] },
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
