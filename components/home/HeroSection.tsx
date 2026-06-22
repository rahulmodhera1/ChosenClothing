"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_VIDEO_SRC, HERO_VIDEO_POSTER } from "@/lib/config";
import { easeOut, easeInOut } from "@/lib/motion";

const LOGO_SRC = "/images/ChosenLogo.png";

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

      {/* Chosen logo — chrome centerpiece. Reveals after the drone footage holds on
          the sky: a focus-pull (blur clears as it settles) with a specular glint that
          sweeps across the metal once it lands. */}
      <AnimatePresence>
        {videoEnded && !logoMissing && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 1.06, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.9, delay: 0.4, ease: easeOut }}
            className="absolute z-[20] pointer-events-none w-[82%] sm:w-[62%] md:w-[50%] lg:w-[42%] max-w-[620px] left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
            style={{ filter: "drop-shadow(0 0 50px rgba(196,168,130,0.22)) drop-shadow(0 6px 28px rgba(0,0,0,0.75))" }}
          >
            {/* Base chrome — blur clears as the logo settles into focus */}
            <motion.img
              src={LOGO_SRC}
              alt="Chosen"
              onError={() => setLogoMissing(true)}
              initial={{ filter: "blur(14px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={{ duration: 1.7, delay: 0.4, ease: easeOut }}
              className="w-full h-auto block"
              aria-hidden="true"
            />
            {/* Specular glint — a light band sweeping across the chrome shape only */}
            <motion.div
              className="absolute inset-0"
              style={{
                maskImage: `url(${LOGO_SRC})`,
                WebkitMaskImage: `url(${LOGO_SRC})`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
                background:
                  "linear-gradient(105deg, transparent 42%, rgba(255,255,255,0.55) 48%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.55) 52%, transparent 58%)",
                backgroundSize: "260% 100%",
                mixBlendMode: "screen",
              }}
              initial={{ backgroundPosition: "185% 0%" }}
              animate={{ backgroundPosition: "-85% 0%" }}
              transition={{ duration: 1.5, delay: 1.9, ease: easeInOut }}
            />
          </motion.div>
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
