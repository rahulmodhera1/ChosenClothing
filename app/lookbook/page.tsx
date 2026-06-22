import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lookbook",
  description: "The Chosen lookbook. Toronto street editorial.",
};

const lookbookItems = [
  {
    type: "image" as const,
    src: "/images/lookbook/look-1.jpg",
    alt: "Chosen lookbook shot 1",
    span: "lg:col-span-2 lg:row-span-2",
    caption: "Brown Cargo Set",
  },
  {
    type: "image" as const,
    src: "/images/lookbook/look-2.jpg",
    alt: "Chosen lookbook shot 2",
    span: "",
    caption: "",
  },
  {
    type: "image" as const,
    src: "/images/lookbook/look-3.jpg",
    alt: "Chosen lookbook shot 3",
    span: "",
    caption: "",
  },
  {
    type: "image" as const,
    src: "/images/lookbook/look-4.jpg",
    alt: "Chosen lookbook shot 4",
    span: "lg:col-span-2",
    caption: "Washed Rhinestone Tracksuit",
  },
  {
    type: "image" as const,
    src: "/images/lookbook/look-5.jpg",
    alt: "Chosen lookbook shot 5",
    span: "",
    caption: "",
  },
  {
    type: "image" as const,
    src: "/images/lookbook/look-6.jpg",
    alt: "Chosen lookbook shot 6",
    span: "",
    caption: "",
  },
];

export default function LookbookPage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-12 text-center">
          <p className="text-[#5b6573] text-xs tracking-[0.3em] uppercase mb-3">Editorial</p>
          <h1 className="font-display text-5xl sm:text-7xl text-[#14171c] tracking-wider">THE LOOKBOOK</h1>
          <p className="text-[#5b6573] text-sm mt-4 max-w-md mx-auto leading-relaxed">
            Shot in Toronto. Worn by the ones who move different.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[300px] lg:auto-rows-[320px]">
          {lookbookItems.map((item, i) => (
            <div
              key={i}
              className={`relative overflow-hidden bg-[#eef1f5] group ${item.span}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {item.caption && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-white text-sm font-medium tracking-wider">
                    {item.caption}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-[#5b6573] text-sm mb-6 tracking-wide">Ready to wear it yourself?</p>
          <Link
            href="/shop"
            className="press inline-block border border-[#8a98ad] text-[#8a98ad] hover:bg-[#8a98ad] hover:text-white font-display text-sm tracking-widest px-10 py-4"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
