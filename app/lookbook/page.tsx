import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lookbook — Chosen",
  description: "The Chosen lookbook. Toronto street editorial.",
};

const IMAGES = Array.from({ length: 44 }, (_, i) => ({
  src: `/images/lookbook/${String(i + 1).padStart(2, "0")}.png`,
  alt: `Chosen — Look ${i + 1}`,
  n: i + 1,
}));

// Repeating 7-image cycle: one 2×2 hero, one 2×1 wide, five standard
function getSpan(i: number): string {
  const p = i % 7;
  if (p === 0) return "lg:col-span-2 lg:row-span-2";
  if (p === 4) return "lg:col-span-2";
  return "";
}

export default function LookbookPage() {
  return (
    <div className="min-h-screen bg-[#080a10]">

      {/* ── Editorial header ── */}
      <header className="pt-14 flex flex-col items-center justify-center py-24 text-center px-6">
        <p className="text-white/35 text-[10px] tracking-[0.55em] uppercase mb-6">
          Chosen Clothing — Season I
        </p>
        <h1
          className="font-display uppercase text-white tracking-[0.1em] leading-none mb-7"
          style={{ fontSize: "clamp(3.2rem, 10vw, 8rem)" }}
        >
          Lookbook
        </h1>
        <p className="text-white/45 text-xs tracking-[0.3em] uppercase">
          Toronto · Shot on location
        </p>
        <div className="mt-12 flex items-center gap-5">
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-white/20 text-[10px] tracking-[0.4em] uppercase">44 Looks</span>
          <div className="h-px w-14 bg-gradient-to-l from-transparent to-white/20" />
        </div>
      </header>

      {/* ── Full-bleed grid ── */}
      {/*
        gap-px with bg-[#0d0f14] creates a hairline black seam between cells —
        cleaner than a colour gap and more editorial. dense fill packs images
        tightly so the varied spans don't leave holes.
      */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0d0f14] [grid-auto-flow:dense]"
        style={{ gridAutoRows: "clamp(220px, 28vw, 360px)" }}
      >
        {IMAGES.map((img) => (
          <div
            key={img.n}
            className={`relative overflow-hidden group bg-[#111] ${getSpan(img.n - 1)}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={92}
              priority={img.n <= 4}
            />
            {/* Hover reveal — gradient + label + number */}
            <div className="absolute inset-0 flex items-end justify-between p-5 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <span className="text-white/75 text-[10px] tracking-[0.4em] uppercase font-light">
                Chosen
              </span>
              <span className="text-white/35 text-xs font-light tabular-nums">
                {String(img.n).padStart(2, "0")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="flex flex-col items-center gap-8 py-28 px-6 text-center">
        <div className="space-y-3">
          <p className="text-white/25 text-[10px] tracking-[0.5em] uppercase">Wear the look</p>
          <p className="text-white/55 text-sm tracking-wider">Every piece is available now.</p>
        </div>
        <Link
          href="/shop"
          className="press inline-flex items-center border border-white/20 hover:border-white/60 text-white/65 hover:text-white font-display text-sm tracking-[0.4em] px-12 py-5 transition-all duration-300 hover:bg-white/[0.04]"
        >
          SHOP THE COLLECTION
        </Link>
      </div>
    </div>
  );
}
