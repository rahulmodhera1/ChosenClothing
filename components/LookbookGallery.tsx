"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface LookImage {
  n: number;
  w: number;
  h: number;
  src: string;
  alt: string;
}

export default function LookbookGallery({ images }: { images: LookImage[] }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );
  const prev = useCallback(
    () => setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );

  // Keyboard navigation + body scroll lock while the lightbox is open
  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, next, prev]);

  const active = open === null ? null : images[open];

  return (
    <>
      {/* Masonry grid */}
      <div className="mx-auto max-w-[1700px] px-4 sm:px-6 lg:px-8 pb-10">
        <div className="columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 [column-fill:balance]">
          {images.map((img, i) => (
            <button
              key={img.n}
              onClick={() => setOpen(i)}
              aria-label={`View ${img.alt} larger`}
              className="group relative mb-4 sm:mb-5 block w-full break-inside-avoid overflow-hidden rounded-md bg-[#e9edf2] shadow-[0_1px_2px_rgba(20,23,28,0.04)] hover:shadow-[0_14px_40px_rgba(20,23,28,0.16)] transition-shadow duration-500 cursor-zoom-in"
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
              <span className="absolute inset-0 flex items-end justify-between p-4 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <span className="text-white/80 text-[10px] tracking-[0.4em] uppercase font-light">
                  Chosen
                </span>
                <span className="text-white/50 text-xs font-light tabular-nums">
                  {String(img.n).padStart(2, "0")}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 backdrop-blur-sm p-4 sm:p-8"
            onClick={close}
          >
            {/* Close */}
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-5 right-5 z-10 text-white/70 hover:text-white transition-colors"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
              className="absolute left-3 sm:left-6 z-10 text-white/60 hover:text-white transition-colors p-2"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={active.n}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt}
                width={active.w}
                height={active.h}
                quality={100}
                className="block max-h-[86vh] w-auto h-auto max-w-[92vw] object-contain rounded-sm shadow-2xl"
                sizes="92vw"
                priority
              />
              <div className="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-3 text-white/50">
                <span className="text-[10px] tracking-[0.4em] uppercase">Chosen — Look {active.n}</span>
                <span className="text-white/30 text-xs tabular-nums">
                  {String(active.n).padStart(2, "0")} / {images.length}
                </span>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
              className="absolute right-3 sm:right-6 z-10 text-white/60 hover:text-white transition-colors p-2"
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
