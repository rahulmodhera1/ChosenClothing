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

const HERO_SRC = "/images/lookbook/01.png";

export default function LookbookPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fa]">

      {/* ── Cinematic hero banner (matches the collection page pattern) ── */}
      <section className="relative h-[58vh] min-h-[420px] w-full overflow-hidden pt-14">
        <Image
          src={HERO_SRC}
          alt="Chosen Lookbook"
          fill
          priority
          quality={95}
          className="object-cover object-[center_28%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080a10]/85 via-[#080a10]/35 to-[#080a10]/45" />

        {/* Breadcrumb */}
        <div className="absolute top-20 left-0 right-0 px-6 sm:px-10">
          <p className="text-white/55 text-xs tracking-widest uppercase">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/90">Lookbook</span>
          </p>
        </div>

        {/* Centered title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-white/70 text-[10px] sm:text-xs tracking-[0.5em] uppercase mb-5">
            Chosen Clothing — Season I
          </p>
          <h1
            className="font-display uppercase text-white tracking-[0.08em] leading-none"
            style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
          >
            Lookbook
          </h1>
          <div className="mt-7 flex items-center gap-5">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/45" />
            <span className="text-white/65 text-[10px] tracking-[0.4em] uppercase">
              Toronto · 44 Looks
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/45" />
          </div>
        </div>
      </section>

      {/* ── Intro line ── */}
      <div className="text-center px-6 pt-16 pb-12 sm:pt-20 sm:pb-14">
        <p className="text-[#5b6573] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          Shot on location in Toronto. Worn by the ones who move different —
          the full collection, styled and in motion.
        </p>
      </div>

      {/* ── Masonry gallery ──
          Light, wide and editorial. CSS columns lay images top-to-bottom in
          balanced columns; each keeps its true aspect ratio from the manifest,
          so the whole photo shows, stays sharp, and the layout fills the page. */}
      <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-8 pb-10">
        <div className="columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 [column-fill:balance]">
          {IMAGES.map((img) => (
            <figure
              key={img.n}
              className="group relative mb-4 sm:mb-5 break-inside-avoid overflow-hidden rounded-md bg-[#e9edf2] shadow-[0_1px_2px_rgba(20,23,28,0.04)] hover:shadow-[0_14px_40px_rgba(20,23,28,0.16)] transition-shadow duration-500"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                className="w-full h-auto block transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                quality={95}
                priority={img.n <= 8}
              />
              {/* Hover reveal — subtle label + number */}
              <figcaption className="absolute inset-0 flex items-end justify-between p-4 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <span className="text-white/80 text-[10px] tracking-[0.4em] uppercase font-light">
                  Chosen
                </span>
                <span className="text-white/50 text-xs font-light tabular-nums">
                  {String(img.n).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

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
