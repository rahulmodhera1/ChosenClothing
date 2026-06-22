import type { Product, Collection, Cart } from "@/types/shopify";
import {
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_HANDLE,
  GET_ALL_COLLECTIONS,
  GET_COLLECTION_BY_HANDLE,
  CREATE_CART,
  ADD_TO_CART,
  GET_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_LINES,
} from "./queries";
import { mockProducts, mockCollections, mockCart } from "./mock-data";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const useMock = !domain || !token;

async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const response = await fetch(
    `https://${domain}/api/2024-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token!,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    }
  );
  if (!response.ok) throw new Error(`Shopify API error: ${response.status}`);
  const json = await response.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data as T;
}

export async function getAllProducts(): Promise<Product[]> {
  if (useMock) return mockProducts;
  const data = await shopifyFetch<{ products: { nodes: Product[] } }>({
    query: GET_ALL_PRODUCTS,
    variables: { first: 50 },
  });
  return data.products.nodes;
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  if (useMock) return mockProducts.find((p) => p.handle === handle) ?? null;
  const data = await shopifyFetch<{ product: Product | null }>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
  });
  return data.product;
}

export async function getCollections(): Promise<Collection[]> {
  if (useMock) return mockCollections;
  const data = await shopifyFetch<{ collections: { nodes: Collection[] } }>({
    query: GET_ALL_COLLECTIONS,
    variables: { first: 20 },
  });
  return data.collections.nodes;
}

export async function getCollectionByHandle(handle: string): Promise<Collection | null> {
  if (useMock) return mockCollections.find((c) => c.handle === handle) ?? null;
  const data = await shopifyFetch<{ collection: Collection | null }>({
    query: GET_COLLECTION_BY_HANDLE,
    variables: { handle, productsFirst: 50 },
  });
  return data.collection;
}

export async function createCart(
  lines: { merchandiseId: string; quantity: number }[] = []
): Promise<Cart> {
  if (useMock) return { ...mockCart };
  const data = await shopifyFetch<{ cartCreate: { cart: Cart } }>({
    query: CREATE_CART,
    variables: { lines },
  });
  return data.cartCreate.cart;
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  if (useMock) return { ...mockCart };
  const data = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>({
    query: ADD_TO_CART,
    variables: { cartId, lines },
  });
  return data.cartLinesAdd.cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  if (useMock) return null;
  const data = await shopifyFetch<{ cart: Cart | null }>({
    query: GET_CART,
    variables: { cartId },
  });
  return data.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  if (useMock) return { ...mockCart };
  const data = await shopifyFetch<{ cartLinesRemove: { cart: Cart } }>({
    query: REMOVE_FROM_CART,
    variables: { cartId, lineIds },
  });
  return data.cartLinesRemove.cart;
}

export async function updateCartLines(cartId: string, lines: { id: string; quantity: number }[]): Promise<Cart> {
  if (useMock) return { ...mockCart };
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: Cart } }>({
    query: UPDATE_CART_LINES,
    variables: { cartId, lines },
  });
  return data.cartLinesUpdate.cart;
}
