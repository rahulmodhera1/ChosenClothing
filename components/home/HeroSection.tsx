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

      {/* Chosen logo — chrome centerpiece. Bloom of light, then the mark rushes in
          and overshoots into focus, a bright glint rakes across the metal, and it
          breathes with a slow float + recurring shimmer. */}
      <AnimatePresence>
        {revealed && !logoMissing && (
          <div
            key="logo"
            className="absolute z-[20] pointer-events-none w-[84%] sm:w-[64%] md:w-[52%] lg:w-[44%] max-w-[660px] left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
          >
            {/* Light bloom behind the mark — the "wow" flash on arrival */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%]"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.9, 0], scale: [0.6, 1.3, 1.45] }}
              transition={{ duration: 1.6, ease: easeOut }}
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(240,235,227,0.55) 0%, rgba(196,168,130,0.32) 35%, transparent 70%)",
                mixBlendMode: "screen",
                filter: "blur(8px)",
              }}
            />

            {/* Float wrapper — slow vertical breathing once it has landed */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, ease: easeInOut, repeat: Infinity, delay: 1.4 }}
              style={{ filter: "drop-shadow(0 0 55px rgba(196,168,130,0.28)) drop-shadow(0 8px 30px rgba(0,0,0,0.78))" }}
            >
              {/* Base chrome — rushes in, overshoots, settles into focus */}
              <motion.img
                src={LOGO_SRC}
                alt="Chosen"
                onError={() => setLogoMissing(true)}
                initial={{ opacity: 0, scale: 1.22, filter: "blur(18px)" }}
                animate={{ opacity: 1, scale: [1.22, 0.97, 1], filter: "blur(0px)" }}
                transition={{
                  duration: 1.3,
                  ease: easeOut,
                  opacity: { duration: 0.6 },
                  scale: { duration: 1.3, times: [0, 0.72, 1], ease: easeOut },
                  filter: { duration: 1.0 },
                }}
                className="w-full h-auto block"
                aria-hidden="true"
              />

              {/* Specular glint — bright band raking across the chrome shape only,
                  fired on arrival then repeating slowly to keep the metal alive */}
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
                    "linear-gradient(100deg, transparent 40%, rgba(255,255,255,0.7) 47%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 53%, transparent 60%)",
                  backgroundSize: "260% 100%",
                  mixBlendMode: "screen",
                }}
                initial={{ backgroundPosition: "185% 0%" }}
                animate={{ backgroundPosition: "-85% 0%" }}
                transition={{ duration: 1.2, delay: 0.9, ease: easeInOut, repeat: Infinity, repeatDelay: 5 }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 z-[25] flex flex-col items-center text-center px-4 pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: easeOut }}
          className="flex items-center gap-4 sm:gap-5 mb-7"
        >
          <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#c4a882]/70" />
          <span className="font-display text-[#e7dcc7] text-[11px] sm:text-sm tracking-[0.5em] uppercase">
            One in a Million
          </span>
          <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#c4a882]/70" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: easeOut }}
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
