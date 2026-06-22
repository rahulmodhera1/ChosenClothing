"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_VIDEO_SRC, HERO_VIDEO_POSTER } from "@/lib/config";
import { easeOut } from "@/lib/motion";

export default function HeroSection() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [logoMissing, setLogoMissing] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#0f0d0b]">
      {/* Video background. Slightly taller than the hero, anchored to the top, so
          the lower portion shows (logo sits higher, not pinned to the bottom)
          while the very bottom-right watermark is pushed into the dark corner.
          Filter sharpens/brightens the chrome logo so it pops. */}
      <video
        autoPlay
        muted
        playsInline
        poster={HERO_VIDEO_POSTER}
        onEnded={() => setVideoEnded(true)}
        className="absolute inset-x-0 top-0 w-full h-[115%] object-cover object-top"
        style={{ filter: "contrast(1.12) saturate(1.1) brightness(1.06)" }}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Base gradient — light in the middle so the logo shows through, dark at the
          bottom to seat the content and bury the corner watermark. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/90" />

      {/* Top header band — reduces the open sky and frames the navigation. */}
      <div className="absolute inset-x-0 top-0 h-[38%] z-[5] pointer-events-none bg-gradient-to-b from-[#0f0d0b] via-[#0f0d0b]/45 to-transparent" />

      {/* Soft vignette over the baked-in bottom-right watermark (now tucked in the
          darkest corner, so it reads as a natural vignette rather than a patch). */}
      <div
        className="absolute bottom-0 right-0 w-72 h-56 z-[6] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom right, #0f0d0b 0%, #0f0d0b 42%, transparent 75%)" }}
      />

      {/* Crisp chrome logo — fades in over the video's final frame when it ends */}
      <AnimatePresence>
        {videoEnded && !logoMissing && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: easeOut }}
            className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none w-[clamp(320px,55vw,820px)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/chosen-logo.png"
              alt="Chosen"
              onError={() => setLogoMissing(true)}
              className="w-full h-auto drop-shadow-[0_0_60px_rgba(180,200,255,0.18)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

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
