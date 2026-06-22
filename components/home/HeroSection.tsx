"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HERO_VIDEO_SRC, HERO_VIDEO_POSTER } from "@/lib/config";
import { easeOut } from "@/lib/motion";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#0f0d0b]">
      {/* Video background — filter sharpens/brightens the chrome logo so it pops */}
      <video
        autoPlay
        muted
        playsInline
        poster={HERO_VIDEO_POSTER}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "contrast(1.12) saturate(1.1) brightness(1.06)" }}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Gradient overlay — lighter in the center so the logo shows through brighter */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/85" />

      {/* Solid cover over the baked-in bottom-right watermark */}
      <div
        className="absolute bottom-0 right-0 w-56 h-56 z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom right, #0f0d0b 0%, #0f0d0b 45%, transparent 80%)" }}
      />

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center text-center px-4 pb-20 sm:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
          className="text-[#a89880] text-xs tracking-[0.4em] uppercase mb-6"
        >
          #OneInAMillion
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: easeOut }}
        >
          <Link
            href="/shop"
            className="press inline-block bg-transparent border border-[#f0ebe3] text-[#f0ebe3] hover:bg-[#f0ebe3] hover:text-[#0f0d0b] font-display text-sm tracking-[0.25em] px-10 py-4"
          >
            SHOP NOW
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
