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
import { mockProducts, mockCollections } from "./mock-data";
import type { CartLine } from "@/types/shopify";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const useMock = !domain || !token;

// ── Demo cart (used until a real Shopify Storefront token is configured) ──────
// Keeps an in-memory cart so the side bag, quantities and subtotal all work.
const STORE_URL = "https://chosenca.com";
const demoCarts = new Map<string, Cart>();

function findVariant(merchandiseId: string) {
  for (const product of mockProducts) {
    const variant = product.variants.nodes.find((v) => v.id === merchandiseId);
    if (variant) return { product, variant };
  }
  return null;
}

function buildLine(merchandiseId: string, quantity: number): CartLine | null {
  const found = findVariant(merchandiseId);
  if (!found) return null;
  const { product, variant } = found;
  return {
    id: `line-${merchandiseId}`,
    quantity,
    merchandise: {
      id: variant.id,
      title: variant.title,
      product: {
        id: product.id,
        title: product.title,
        handle: product.handle,
        featuredImage: product.featuredImage,
      },
      price: variant.price,
      selectedOptions: variant.selectedOptions,
    },
  };
}

function recompute(cart: Cart): Cart {
  const nodes = cart.lines.nodes;
  const subtotal = nodes.reduce(
    (sum, l) => sum + parseFloat(l.merchandise.price.amount) * l.quantity,
    0
  );
  const qty = nodes.reduce((sum, l) => sum + l.quantity, 0);
  const currency = nodes[0]?.merchandise.price.currencyCode ?? "CAD";
  cart.totalQuantity = qty;
  cart.cost = {
    subtotalAmount: { amount: subtotal.toFixed(2), currencyCode: currency },
    totalAmount: { amount: subtotal.toFixed(2), currencyCode: currency },
  };
  return cart;
}

function emptyDemoCart(id: string): Cart {
  return {
    id,
    checkoutUrl: `${STORE_URL}/cart`,
    totalQuantity: 0,
    cost: {
      subtotalAmount: { amount: "0.00", currencyCode: "CAD" },
      totalAmount: { amount: "0.00", currencyCode: "CAD" },
    },
    lines: { nodes: [] },
  };
}

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
  if (useMock) {
    const id = `demo-cart-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const cart = emptyDemoCart(id);
    for (const l of lines) {
      const line = buildLine(l.merchandiseId, l.quantity);
      if (line) cart.lines.nodes.push(line);
    }
    recompute(cart);
    demoCarts.set(id, cart);
    return cart;
  }
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
  if (useMock) {
    const cart = demoCarts.get(cartId) ?? (await createCart([]));
    for (const l of lines) {
      const existing = cart.lines.nodes.find((n) => n.merchandise.id === l.merchandiseId);
      if (existing) existing.quantity += l.quantity;
      else {
        const line = buildLine(l.merchandiseId, l.quantity);
        if (line) cart.lines.nodes.push(line);
      }
    }
    recompute(cart);
    demoCarts.set(cart.id, cart);
    return cart;
  }
  const data = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>({
    query: ADD_TO_CART,
    variables: { cartId, lines },
  });
  return data.cartLinesAdd.cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  if (useMock) return demoCarts.get(cartId) ?? null;
  const data = await shopifyFetch<{ cart: Cart | null }>({
    query: GET_CART,
    variables: { cartId },
  });
  return data.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  if (useMock) {
    const cart = demoCarts.get(cartId) ?? emptyDemoCart(cartId);
    cart.lines.nodes = cart.lines.nodes.filter((n) => !lineIds.includes(n.id));
    recompute(cart);
    demoCarts.set(cart.id, cart);
    return cart;
  }
  const data = await shopifyFetch<{ cartLinesRemove: { cart: Cart } }>({
    query: REMOVE_FROM_CART,
    variables: { cartId, lineIds },
  });
  return data.cartLinesRemove.cart;
}

export async function updateCartLines(cartId: string, lines: { id: string; quantity: number }[]): Promise<Cart> {
  if (useMock) {
    const cart = demoCarts.get(cartId) ?? emptyDemoCart(cartId);
    for (const l of lines) {
      const node = cart.lines.nodes.find((n) => n.id === l.id);
      if (node) node.quantity = l.quantity;
    }
    cart.lines.nodes = cart.lines.nodes.filter((n) => n.quantity > 0);
    recompute(cart);
    demoCarts.set(cart.id, cart);
    return cart;
  }
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: Cart } }>({
    query: UPDATE_CART_LINES,
    variables: { cartId, lines },
  });
  return data.cartLinesUpdate.cart;
}
