"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_VIDEO_SRC, HERO_VIDEO_POSTER } from "@/lib/config";
import { easeOut } from "@/lib/motion";

const FRAME = "absolute inset-x-0 top-0 w-full h-[115%] object-cover object-top";
const GRADE = "contrast(1.12) saturate(1.1) brightness(1.06)";

export default function HeroSection() {
  const [logoMissing, setLogoMissing] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden flex items-center justify-center bg-[#0f0d0b]">
      {/* Drone video — plays once, holds on final frame */}
      <video
        autoPlay
        muted
        playsInline
        poster={HERO_VIDEO_POSTER}
        onEnded={() => setVideoEnded(true)}
        className={FRAME}
        style={{ filter: GRADE }}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Dark gradient — light in the middle, heavy at top and bottom */}
      <div className="absolute inset-0 z-[11] pointer-events-none bg-gradient-to-b from-black/60 via-black/20 to-black/90" />

      {/* Top header band */}
      <div className="absolute inset-x-0 top-0 h-[38%] z-[12] pointer-events-none bg-gradient-to-b from-[#0f0d0b] via-[#0f0d0b]/45 to-transparent" />

      {/* Chosen logo — fades in after video ends, centered and prominent */}
      <AnimatePresence>
        {videoEnded && !logoMissing && (
          <motion.img
            key="logo"
            src="/images/chosen-hero-overlay.png"
            alt="Chosen"
            onError={() => setLogoMissing(true)}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.2, delay: 0.6, ease: easeOut }}
            className="absolute z-[20] pointer-events-none w-[88%] sm:w-[64%] md:w-[52%] lg:w-[44%] max-w-[600px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ filter: "drop-shadow(0 0 40px rgba(200,200,220,0.18)) drop-shadow(0 4px 24px rgba(0,0,0,0.7))" }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 z-[25] flex flex-col items-center text-center px-4 pb-16 sm:pb-20">
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
