import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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

export default function LookbookPage() {
  return (
    <div className="min-h-screen bg-[#080a10]">

      {/* ── Editorial header ── */}
      <header className="pt-14 flex flex-col items-center justify-center py-20 sm:py-28 text-center px-6">
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

      {/* ── Masonry gallery ──
          CSS columns lay the images out top-to-bottom in balanced columns.
          Each image keeps its true aspect ratio (w/h via the manifest) so the
          full photo is always visible — no cropping, no stretching. Rendered
          near native resolution, so nothing is upscaled or blurry. */}
      <div className="mx-auto max-w-[1500px] px-3 sm:px-5 pb-8">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 [column-fill:balance]">
          {IMAGES.map((img) => (
            <figure
              key={img.n}
              className="group relative mb-3 sm:mb-4 break-inside-avoid overflow-hidden rounded-sm bg-[#111]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                className="w-full h-auto block transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={95}
                priority={img.n <= 6}
              />
              {/* Hover reveal — subtle label + number */}
              <figcaption className="absolute inset-0 flex items-end justify-between p-4 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <span className="text-white/75 text-[10px] tracking-[0.4em] uppercase font-light">
                  Chosen
                </span>
                <span className="text-white/40 text-xs font-light tabular-nums">
                  {String(img.n).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="flex flex-col items-center gap-8 py-24 sm:py-28 px-6 text-center">
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
