"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_VIDEO_SRC, HERO_VIDEO_POSTER } from "@/lib/config";
import { easeOut, easeInOut } from "@/lib/motion";
import Starfield from "./Starfield";

const LOGO_SRC = "/images/ChosenLogo.png";

const FRAME = "absolute inset-x-0 top-0 w-full h-[115%] object-cover object-top";
// Desaturate slightly so the video reads as cinematic backdrop, not focal point.
const GRADE = "contrast(1.08) saturate(0.82) brightness(0.9)";

// Reveal the stars once the drone reaches the sky — the last stretch of footage.
const STARS_LEAD = 2.5;

export default function HeroSection() {
  const [logoMissing, setLogoMissing] = useState(false);
  // Stars hold off until the sky shows; the logo is present from the start.
  const [starsVisible, setStarsVisible] = useState(false);
  const armedRef = useRef(false);

  const showStars = () => {
    if (armedRef.current) return;
    armedRef.current = true;
    setStarsVisible(true);
  };

  // Fallback: if the video never plays (blocked autoplay), still show the stars.
  useEffect(() => {
    const t = setTimeout(showStars, 8000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden flex items-center justify-center bg-[#080a10]">
      {/* Drone video — plays once, holds on final frame */}
      <video
        autoPlay
        muted
        playsInline
        poster={HERO_VIDEO_POSTER}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration && v.currentTime >= v.duration - STARS_LEAD) showStars();
        }}
        onEnded={showStars}
        className={FRAME}
        style={{ filter: GRADE }}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Heavy vignette — pulls the sky back so the logo owns the frame */}
      <div className="absolute inset-0 z-[10] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 40%, transparent 10%, rgba(8,10,16,0.65) 55%, rgba(8,10,16,0.96) 100%)"
        }}
      />

      {/* Top-to-bottom cinematic grade */}
      <div className="absolute inset-0 z-[11] pointer-events-none bg-gradient-to-b from-[#080a10]/90 via-[#080a10]/10 to-[#080a10]/98" />

      {/* Extra mid-frame darkening layer for depth */}
      <div className="absolute inset-0 z-[11] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 25%, rgba(8,10,16,0.3) 50%, transparent 70%)" }}
      />

      {/* Animated starfield — fades in once the drone reaches the sky */}
      <AnimatePresence>
        {starsVisible && (
          <motion.div
            key="stars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, ease: easeOut }}
            className="absolute inset-0 z-[12] pointer-events-none"
          >
            <Starfield />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chosen logo — present from the start with a refined, continuous life:
          a clean entrance, a softly breathing glow, a recurring shine, and a
          gentle float. Smooth and premium — no flash, no bounce. */}
      {/* The star sits at 53.3% of the logo's width, so we offset the translate to
          center the star (not the image) on the viewport — aligning it with the
          centered CN Tower behind it. */}
      {!logoMissing && (
        <div className="absolute z-[20] pointer-events-none w-[80%] sm:w-[60%] md:w-[48%] lg:w-[40%] max-w-[620px] left-1/2 top-[30%] -translate-x-[53.3%] -translate-y-1/2">
          {/* Moonlit halo — fades in, then breathes continuously for life */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[135%] h-[135%]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: [0, 0.45, 0.32, 0.45], scale: [0.85, 1.05, 1, 1.05] }}
            transition={{
              duration: 8,
              ease: easeInOut,
              times: [0, 0.25, 0.6, 1],
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(170,190,230,0.4) 0%, rgba(120,140,190,0.16) 40%, transparent 70%)",
              mixBlendMode: "screen",
              filter: "blur(14px)",
            }}
          />

          {/* Float wrapper — slow vertical breathing */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 9, ease: easeInOut, repeat: Infinity, delay: 1.6 }}
            style={{ filter: "drop-shadow(0 0 60px rgba(160,180,220,0.18)) drop-shadow(0 12px 40px rgba(0,0,0,0.9))" }}
          >
            {/* Base chrome — clean entrance from a soft focus */}
            <motion.img
              src={LOGO_SRC}
              alt="Chosen"
              onError={() => setLogoMissing(true)}
              initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{
                duration: 1.8,
                ease: easeOut,
                opacity: { duration: 1.2, ease: easeOut },
                filter: { duration: 1.5, ease: easeOut },
              }}
              className="w-full h-auto block"
              aria-hidden="true"
            />
            {/* Left-to-right shine — sweeps in shortly after the entrance, recurring */}
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
                  "linear-gradient(100deg, transparent 40%, rgba(255,255,255,0.4) 47%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.4) 53%, transparent 60%)",
                backgroundSize: "260% 100%",
                mixBlendMode: "screen",
              }}
              initial={{ backgroundPosition: "-70% 0%" }}
              animate={{ backgroundPosition: "170% 0%" }}
              transition={{ duration: 1.7, delay: 1.4, ease: easeInOut, repeat: Infinity, repeatDelay: 3.5 }}
            />
          </motion.div>
        </div>
      )}

      {/* Bottom content — larger, editorial, futuristic */}
      <div className="absolute inset-x-0 bottom-0 z-[25] flex flex-col items-center text-center px-6 pb-28 sm:pb-36 gap-9 sm:gap-11">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.4, ease: easeOut }}
          className="text-white text-2xl sm:text-4xl md:text-5xl tracking-[0.35em] sm:tracking-[0.45em] uppercase font-semibold"
          style={{ textShadow: "0 0 40px rgba(255,255,255,0.35), 0 2px 20px rgba(0,0,0,0.8)" }}
        >
          One in a Million
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.7, ease: easeOut }}
          whileHover={{ scale: 1.04 }}
        >
          <Link
            href="/shop"
            className="press inline-flex items-center rounded-full border border-white/30 bg-white/[0.07] backdrop-blur-md px-9 py-4 sm:px-12 sm:py-5 text-white text-xs sm:text-sm tracking-[0.3em] uppercase font-light transition-all duration-300 hover:border-white/70 hover:bg-white/[0.15] hover:shadow-[0_0_35px_rgba(255,255,255,0.14),inset_0_0_20px_rgba(255,255,255,0.04)]"
          >
            Shop the Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
