import { NextRequest, NextResponse } from "next/server";
import { createCart, addToCart, getCart, removeFromCart, updateCartLines } from "@/lib/shopify";

export async function GET(req: NextRequest) {
  const cartId = req.nextUrl.searchParams.get("cartId");
  if (!cartId) return NextResponse.json({ cart: null });
  const cart = await getCart(cartId);
  return NextResponse.json({ cart });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, cartId, lines, lineIds } = body;
  try {
    if (action === "add") {
      const cart = cartId ? await addToCart(cartId, lines) : await createCart(lines);
      return NextResponse.json({ cart });
    }
    if (action === "remove") {
      if (!cartId) return NextResponse.json({ error: "No cartId" }, { status: 400 });
      const cart = await removeFromCart(cartId, lineIds);
      return NextResponse.json({ cart });
    }
    if (action === "update") {
      if (!cartId) return NextResponse.json({ error: "No cartId" }, { status: 400 });
      const cart = await updateCartLines(cartId, lines);
      return NextResponse.json({ cart });
    }
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error("Cart API error:", err);
    return NextResponse.json({ error: "Cart operation failed" }, { status: 500 });
  }
}
