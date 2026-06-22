"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_VIDEO_SRC, HERO_VIDEO_POSTER } from "@/lib/config";
import { easeOut, easeInOut } from "@/lib/motion";

const LOGO_SRC = "/images/ChosenLogo.png";

const FRAME = "absolute inset-x-0 top-0 w-full h-[115%] object-cover object-top";
const GRADE = "contrast(1.12) saturate(1.1) brightness(1.06)";

// Reveal the logo this many seconds before the footage ends, so it lands while
// the drone is still settling on the sky rather than after a dead cut.
const REVEAL_LEAD = 1.5;

export default function HeroSection() {
  const [logoMissing, setLogoMissing] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const armedRef = useRef(false);

  const reveal = () => {
    if (armedRef.current) return;
    armedRef.current = true;
    setRevealed(true);
  };

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden flex items-center justify-center bg-[#0f0d0b]">
      {/* Drone video — plays once, holds on final frame */}
      <video
        autoPlay
        muted
        playsInline
        poster={HERO_VIDEO_POSTER}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration && v.currentTime >= v.duration - REVEAL_LEAD) reveal();
        }}
        onEnded={reveal}
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

      {/* Chosen logo — chrome centerpiece. A calm, confident reveal: the mark eases
          up into focus, a single soft glint passes across the metal, and it breathes
          with a slow float. No flash, no bounce. */}
      <AnimatePresence>
        {revealed && !logoMissing && (
          <div
            key="logo"
            className="absolute z-[20] pointer-events-none w-[84%] sm:w-[64%] md:w-[52%] lg:w-[44%] max-w-[660px] left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
          >
            {/* Float wrapper — slow vertical breathing once it has landed */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 8, ease: easeInOut, repeat: Infinity, delay: 1.8 }}
              style={{ filter: "drop-shadow(0 0 48px rgba(196,168,130,0.22)) drop-shadow(0 8px 30px rgba(0,0,0,0.78))" }}
            >
              {/* Base chrome — eases up into focus, no overshoot */}
              <motion.img
                src={LOGO_SRC}
                alt="Chosen"
                onError={() => setLogoMissing(true)}
                initial={{ opacity: 0, scale: 1.04, y: 14, filter: "blur(12px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1.9,
                  ease: easeOut,
                  opacity: { duration: 1.1 },
                  filter: { duration: 1.4 },
                }}
                className="w-full h-auto block"
                aria-hidden="true"
              />

              {/* Specular glint — a single soft band drifting across the chrome,
                  then quietly recurring on a long interval to keep the metal alive */}
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
                    "linear-gradient(100deg, transparent 43%, rgba(255,255,255,0.45) 48%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.45) 52%, transparent 57%)",
                  backgroundSize: "260% 100%",
                  mixBlendMode: "screen",
                }}
                initial={{ backgroundPosition: "180% 0%" }}
                animate={{ backgroundPosition: "-80% 0%" }}
                transition={{ duration: 1.8, delay: 1.4, ease: easeInOut, repeat: Infinity, repeatDelay: 7 }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 z-[25] flex flex-col items-center text-center px-4 pb-16 sm:pb-20">
        <div className="flex items-center gap-4 sm:gap-6 mb-8">
          {/* Left rule — draws outward from the text */}
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: easeOut }}
            className="h-px w-12 sm:w-20 origin-right bg-gradient-to-r from-transparent to-[#c4a882]"
          />
          {/* Tagline — bigger, bolder, settles from wide to tight tracking */}
          <motion.span
            initial={{ opacity: 0, y: 16, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.28em" }}
            transition={{ duration: 1.1, delay: 0.3, ease: easeOut }}
            className="font-display font-bold text-[#f0ebe3] text-lg sm:text-2xl md:text-3xl uppercase whitespace-nowrap"
          >
            One in a Million
          </motion.span>
          {/* Right rule — draws outward from the text */}
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: easeOut }}
            className="h-px w-12 sm:w-20 origin-left bg-gradient-to-l from-transparent to-[#c4a882]"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: easeOut }}
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
