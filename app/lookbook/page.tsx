import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LookbookGallery from "@/components/LookbookGallery";

export const metadata: Metadata = {
  title: "Lookbook — Chosen",
  description: "The Chosen lookbook. Toronto street editorial.",
};

// Exact intrinsic dimensions per image so each one renders at its true aspect
// ratio — no cropping, no distortion. Sizes are near-native so they stay sharp.
const IMAGES = [
  { n: 1, w: 566, h: 682 },
  { n: 2, w: 882, h: 694 },
  { n: 3, w: 566, h: 706 },
  { n: 4, w: 568, h: 716 },
  { n: 5, w: 572, h: 712 },
  { n: 6, w: 568, h: 700 },
  { n: 7, w: 572, h: 682 },
  { n: 8, w: 564, h: 690 },
  { n: 9, w: 572, h: 710 },
  { n: 10, w: 572, h: 718 },
  { n: 11, w: 568, h: 720 },
  { n: 12, w: 566, h: 692 },
  { n: 13, w: 566, h: 714 },
  { n: 14, w: 576, h: 706 },
  { n: 15, w: 570, h: 710 },
  { n: 16, w: 570, h: 716 },
  { n: 17, w: 570, h: 714 },
  { n: 18, w: 570, h: 710 },
  { n: 19, w: 570, h: 700 },
  { n: 20, w: 568, h: 678 },
  { n: 21, w: 572, h: 714 },
  { n: 22, w: 570, h: 716 },
  { n: 23, w: 568, h: 712 },
  { n: 24, w: 574, h: 712 },
  { n: 25, w: 572, h: 686 },
  { n: 26, w: 574, h: 712 },
  { n: 27, w: 568, h: 704 },
  { n: 28, w: 560, h: 686 },
  { n: 29, w: 572, h: 686 },
  { n: 30, w: 572, h: 708 },
  { n: 31, w: 564, h: 708 },
  { n: 32, w: 570, h: 676 },
  { n: 33, w: 574, h: 714 },
  { n: 34, w: 568, h: 700 },
  { n: 35, w: 570, h: 714 },
  { n: 36, w: 572, h: 712 },
  { n: 37, w: 566, h: 704 },
  { n: 38, w: 562, h: 706 },
  { n: 39, w: 568, h: 718 },
  { n: 40, w: 574, h: 712 },
  { n: 41, w: 568, h: 710 },
  { n: 42, w: 568, h: 700 },
  { n: 43, w: 574, h: 704 },
  { n: 44, w: 572, h: 712 },
].map((img) => ({
  ...img,
  src: `/images/lookbook/${String(img.n).padStart(2, "0")}.png`,
  alt: `Chosen — Look ${img.n}`,
}));

// Pre-cropped hero panels. Each was cropped with face detection so every
// subject's head sits at the same level and the same scale — see the crop
// script. They share one aspect ratio, so they tile cleanly with no CSS
// trickery needed.
const HERO_PANELS = [
  "/images/lookbook/hero-1.png",
  "/images/lookbook/hero-2.png",
  "/images/lookbook/hero-3.png",
  "/images/lookbook/hero-4.png",
];

export default function LookbookPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fa]">

      {/* ── 4-panel editorial hero ──
          Four portrait shots fill the full viewport height side by side.
          Massive LOOKBOOK type sits centred across all panels so the photos
          bleed through the letters — classic fashion-editorial opening spread. */}
      <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">

        {/* Panels */}
        <div className="absolute inset-0 flex pt-14">
          {HERO_PANELS.map((src, i) => (
            <div
              key={i}
              className={`relative overflow-hidden ${i >= 2 ? "hidden sm:block" : ""} flex-1`}
            >
              <Image
                src={src}
                alt=""
                fill
                priority
                quality={92}
                className="object-cover object-top"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              {/* Uniform tint so text sits clearly on top */}
              <div className="absolute inset-0 bg-black/30" />
              {/* Hard black hairline divider between panels */}
              {i < HERO_PANELS.length - 1 && (
                <div className="absolute top-0 right-0 bottom-0 w-px bg-black/40" />
              )}
            </div>
          ))}
        </div>

        {/* Left + right edge vignette to pull focus inward */}
        <div className="absolute inset-0 pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.55) 100%)" }}
        />
        {/* Top + bottom gradient for legibility */}
        <div className="absolute inset-0 pointer-events-none z-10
          bg-gradient-to-b from-black/60 via-transparent to-black/70"
        />

        {/* Breadcrumb */}
        <div className="absolute top-20 left-0 right-0 px-6 sm:px-10 z-20">
          <p className="text-white/55 text-xs tracking-widest uppercase">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/90">Lookbook</span>
          </p>
        </div>

        {/* Central editorial title — sits over all four panels */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <p className="text-white/55 text-[10px] sm:text-xs tracking-[0.55em] uppercase mb-6 sm:mb-8">
            Chosen Clothing — Season I
          </p>
          <h1
            className="font-display uppercase text-white leading-none tracking-[0.05em] drop-shadow-[0_2px_30px_rgba(0,0,0,0.5)]"
            style={{ fontSize: "clamp(3rem, 10vw, 8.5rem)" }}
          >
            Lookbook
          </h1>
          <div className="mt-7 sm:mt-9 flex items-center gap-5">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-white/40" />
            <span className="text-white/55 text-[10px] tracking-[0.45em] uppercase">
              Toronto · 44 Looks
            </span>
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-white/40" />
          </div>
        </div>

        {/* Scroll hint at the very bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="text-white/35 text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ── Intro line ── */}
      <div className="text-center px-6 pt-16 pb-12 sm:pt-20 sm:pb-14">
        <p className="text-[#5b6573] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          Shot on location in Toronto. Worn by the ones who move different —
          the full collection, styled and in motion.
        </p>
      </div>

      {/* ── Masonry gallery (click any image to view it larger) ── */}
      <LookbookGallery images={IMAGES} />

      {/* ── CTA (matches the collection page button style) ── */}
      <div className="flex flex-col items-center gap-6 py-20 sm:py-24 px-6 text-center border-t border-[#dde1e8] mt-6">
        <div className="space-y-2">
          <p className="text-[#8a98ad] text-[10px] tracking-[0.5em] uppercase">Wear the look</p>
          <p className="text-[#5b6573] text-sm tracking-wide">Every piece is available now.</p>
        </div>
        <Link
          href="/shop"
          className="press inline-block border border-[#8a98ad] text-[#8a98ad] hover:bg-[#8a98ad] hover:text-white font-display text-sm tracking-widest px-10 py-4 transition-colors duration-300"
        >
          SHOP THE COLLECTION
        </Link>
      </div>
    </div>
  );
}
