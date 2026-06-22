"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_VIDEO_SRC, HERO_VIDEO_POSTER } from "@/lib/config";
import { easeOut, easeInOut } from "@/lib/motion";
import Starfield from "./Starfield";

const LOGO_SRC = "/images/ChosenLogo.png";

const FRAME = "absolute inset-x-0 top-0 w-full h-[115%] object-cover object-top";
// Desaturate slightly so the video reads as cinematic backdrop, not focal point.
const GRADE = "contrast(1.08) saturate(0.82) brightness(0.9)";

export default function HeroSection() {
  const [logoMissing, setLogoMissing] = useState(false);
  // Logo + stars reveal from the start, over the opening footage.
  const revealed = true;

  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden flex items-center justify-center bg-[#080a10]">
      {/* Drone video — plays once, holds on final frame */}
      <video
        autoPlay
        muted
        playsInline
        poster={HERO_VIDEO_POSTER}
        className={FRAME}
        style={{ filter: GRADE }}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Heavy vignette — pulls the sky back so the logo owns the frame */}
      <div className="absolute inset-0 z-[10] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 40%, transparent 20%, rgba(8,10,16,0.55) 60%, rgba(8,10,16,0.92) 100%)"
        }}
      />

      {/* Top-to-bottom cinematic grade */}
      <div className="absolute inset-0 z-[11] pointer-events-none bg-gradient-to-b from-[#080a10]/80 via-transparent to-[#080a10]/95" />

      {/* Animated starfield */}
      <AnimatePresence>
        {revealed && (
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
        <div className="absolute z-[20] pointer-events-none w-[80%] sm:w-[60%] md:w-[48%] lg:w-[40%] max-w-[620px] left-1/2 top-[44%] -translate-x-[53.3%] -translate-y-1/2">
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

      {/* Bottom content — refined, editorial */}
      <div className="absolute inset-x-0 bottom-0 z-[25] flex flex-col items-center text-center px-6 pb-14 sm:pb-20 gap-7">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: easeOut }}
          className="text-white/50 text-[10px] sm:text-[11px] tracking-[0.55em] uppercase font-light"
        >
          One in a Million
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: easeOut }}
        >
          <Link
            href="/shop"
            className="press group relative inline-flex items-center gap-3 text-white/80 hover:text-white font-light text-[11px] tracking-[0.4em] uppercase transition-colors duration-300"
          >
            <span className="h-px w-8 bg-white/30 group-hover:bg-white/70 group-hover:w-10 transition-all duration-500" />
            Shop the Collection
            <span className="h-px w-8 bg-white/30 group-hover:bg-white/70 group-hover:w-10 transition-all duration-500" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
