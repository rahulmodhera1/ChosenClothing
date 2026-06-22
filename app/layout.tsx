import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Chosen | #OneInAMillion",
    template: "%s | Chosen",
  },
  description:
    "Toronto streetwear. Premium but raw. Chosen is built for the ones who move different.",
  keywords: ["streetwear", "Toronto", "Chosen", "cargo", "fashion"],
  openGraph: {
    siteName: "Chosen",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <MotionProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
