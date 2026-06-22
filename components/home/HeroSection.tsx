"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_VIDEO_SRC, HERO_VIDEO_POSTER } from "@/lib/config";
import { easeOut, easeInOut } from "@/lib/motion";

export default function HeroSection() {
  const [videoEnded, setVideoEnded] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#0f0d0b]">
      {/* Video background */}
      <video
        autoPlay
        muted
        playsInline
        poster={HERO_VIDEO_POSTER}
        onEnded={() => setVideoEnded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />

      {/* Cover bottom-right watermark */}
      <div className="absolute bottom-0 right-0 w-40 h-40 z-10" style={{ background: 'radial-gradient(ellipse at bottom right, #000 30%, transparent 75%)' }} />

      {/* Chrome logo — fades in over the video's final frame when it ends */}
      <AnimatePresence>
        {videoEnded && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: easeOut }}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          >
            <Image
              src="/images/chosen-logo.png"
              alt="Chosen"
              width={700}
              height={350}
              className="w-[min(75vw,700px)] h-auto drop-shadow-[0_0_80px_rgba(255,255,255,0.15)]"
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

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
