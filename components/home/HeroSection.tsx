"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HERO_VIDEO_SRC, HERO_VIDEO_POSTER } from "@/lib/config";
import { easeOut } from "@/lib/motion";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0f0d0b]">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={HERO_VIDEO_POSTER}
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Lighter gradient: let the skyline read up top, keep the bottom dark for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/85" />

      {/* Content, anchored to the lower third */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center text-center px-4 pb-24 sm:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
          className="text-[#f0ebe3] text-sm sm:text-base tracking-[0.4em] uppercase"
        >
          #OneInAMillion
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: easeOut }}
          className="mt-6"
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
