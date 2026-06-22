"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_VIDEO_SRC, HERO_VIDEO_POSTER } from "@/lib/config";
import { easeOut } from "@/lib/motion";

// Shared framing + grade so the still overlay lands pixel-perfect on the video's
// final frame and the fade is imperceptible.
const FRAME = "absolute inset-x-0 top-0 w-full h-[115%] object-cover object-top";
const GRADE = "contrast(1.12) saturate(1.1) brightness(1.06)";

export default function HeroSection() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [logoMissing, setLogoMissing] = useState(false);

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden flex items-center justify-center bg-[#0f0d0b]">
      {/* Video background. Slightly taller than the hero, anchored to the top, so
          the logo sits higher and the bottom-right watermark falls into the dark
          corner. The overlay below shares this exact framing + grade. */}
      <video
        autoPlay
        muted
        loop={false}
        playsInline
        poster={HERO_VIDEO_POSTER}
        onEnded={() => setVideoEnded(true)}
        className={FRAME}
        style={{ filter: GRADE }}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Crisp chrome logo — same framing + grade as the video, so it lines up
          exactly with the video's final frame. Opacity-only fade = seamless. */}
      <AnimatePresence>
        {videoEnded && !logoMissing && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <motion.img
            key="logo"
            src="/images/chosen-hero-overlay.png"
            alt="Chosen"
            onError={() => setLogoMissing(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.6, ease: easeOut }}
            className={`${FRAME} z-10 pointer-events-none`}
            style={{ filter: GRADE }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Base gradient — light in the middle so the logo shows through, dark at the
          bottom to seat the content and bury the corner watermark. */}
      <div className="absolute inset-0 z-[11] pointer-events-none bg-gradient-to-b from-black/55 via-black/20 to-black/90" />

      {/* Top header band — reduces the open sky and frames the navigation. */}
      <div className="absolute inset-x-0 top-0 h-[38%] z-[12] pointer-events-none bg-gradient-to-b from-[#0f0d0b] via-[#0f0d0b]/45 to-transparent" />

      {/* Soft vignette over the baked-in bottom-right watermark. */}
      <div
        className="absolute bottom-0 right-0 w-72 h-56 z-[12] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom right, #0f0d0b 0%, #0f0d0b 42%, transparent 75%)" }}
      />

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center text-center px-4 pb-16 sm:pb-20">
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
