"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeOut } from "@/lib/motion";

// Cycle through the full set of looks — the marquee shows a few at a time and
// scrolls through them all, so the home page previews the whole lookbook
// without dumping 44 images on screen at once.
const LOOKS = Array.from({ length: 44 }, (_, i) => ({
  src: `/images/lookbook/${String(i + 1).padStart(2, "0")}.png`,
  alt: `Chosen lookbook ${i + 1}`,
}));

// Two copies back-to-back so the -50% loop is seamless.
const TRACK = [...LOOKS, ...LOOKS];

export default function LookbookTeaser() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 bg-[#eef1f5] overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOut }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-[#5b6573] text-xs tracking-[0.3em] uppercase mb-2">Editorial</p>
            <h2 className="font-display text-4xl sm:text-5xl text-[#14171c] tracking-wider">THE LOOKBOOK</h2>
          </div>
          <Link
            href="/lookbook"
            className="hidden sm:inline-block text-[#8a98ad] text-xs tracking-widest uppercase border-b border-[#8a98ad] pb-0.5 hover:text-[#14171c] hover:border-[#14171c] transition-colors"
          >
            View All
          </Link>
        </motion.div>
      </div>

      {/* Auto-scrolling marquee — pauses on hover. Edges fade out for a clean,
          continuous feel rather than a hard cut at the viewport border. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: easeOut }}
        className="group relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <motion.div
          className="flex gap-4 sm:gap-5 w-max group-hover:[animation-play-state:paused]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 140, ease: "linear", repeat: Infinity }}
        >
          {TRACK.map((img, i) => (
            <Link
              key={i}
              href="/lookbook"
              className="relative block w-[240px] sm:w-[320px] lg:w-[380px] aspect-[4/5] flex-shrink-0 overflow-hidden rounded-md bg-[#e2e7ee] shadow-[0_1px_2px_rgba(20,23,28,0.05)] hover:shadow-[0_12px_30px_rgba(20,23,28,0.16)] transition-shadow duration-500"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105"
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 380px"
              />
            </Link>
          ))}
        </motion.div>
      </motion.div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-8 sm:hidden">
        <Link
          href="/lookbook"
          className="text-[#8a98ad] text-xs tracking-widest uppercase border-b border-[#8a98ad] pb-0.5"
        >
          View All
        </Link>
      </div>
    </section>
  );
}
