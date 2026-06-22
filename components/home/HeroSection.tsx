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

// Start the reveal ~3s out so the logo emerges across the drone's final push-in
// and settles right as the camera comes to rest.
const REVEAL_LEAD = 3;

export default function HeroSection() {
  const [logoMissing, setLogoMissing] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const armedRef = useRef(false);

  const reveal = () => {
    if (armedRef.current) return;
    armedRef.current = true;
    setRevealed(true);
  };

  useEffect(() => {
    const t = setTimeout(reveal, 5000);
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
          if (v.duration && v.currentTime >= v.duration - REVEAL_LEAD) reveal();
        }}
        onEnded={reveal}
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

      {/* Chosen logo — emerges from the drone's push-in: scales up out of blur,
          rising and decelerating into rest exactly as the camera settles. */}
      <AnimatePresence>
        {revealed && !logoMissing && (
          <div
            key="logo"
            className="absolute z-[20] pointer-events-none w-[80%] sm:w-[60%] md:w-[48%] lg:w-[40%] max-w-[620px] left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2"
          >
            {/* Soft moonlit halo — fades in with the mark for depth, never flashes */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[135%] h-[135%]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.4, scale: 1.05 }}
              transition={{ duration: 2.8, ease: easeOut }}
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(170,190,230,0.4) 0%, rgba(120,140,190,0.16) 40%, transparent 70%)",
                mixBlendMode: "screen",
                filter: "blur(14px)",
              }}
            />

            {/* Float wrapper — slow breathing once it has landed */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 9, ease: easeInOut, repeat: Infinity, delay: 3 }}
              style={{ filter: "drop-shadow(0 0 60px rgba(160,180,220,0.18)) drop-shadow(0 12px 40px rgba(0,0,0,0.9))" }}
            >
              {/* Base chrome — scales up from the depth, blur clearing as it lands */}
              <motion.img
                src={LOGO_SRC}
                alt="Chosen"
                onError={() => setLogoMissing(true)}
                initial={{ opacity: 0, scale: 0.84, y: 26, filter: "blur(22px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 2.8,
                  ease: easeOut,
                  opacity: { duration: 1.8, ease: easeOut },
                  filter: { duration: 2.2, ease: easeOut },
                }}
                className="w-full h-auto block"
                aria-hidden="true"
              />
              {/* Left-to-right shine — fires once the mark has settled */}
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
                    "linear-gradient(100deg, transparent 40%, rgba(255,255,255,0.38) 47%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.38) 53%, transparent 60%)",
                  backgroundSize: "260% 100%",
                  mixBlendMode: "screen",
                }}
                initial={{ backgroundPosition: "-70% 0%" }}
                animate={{ backgroundPosition: "170% 0%" }}
                transition={{ duration: 1.8, delay: 2.8, ease: easeInOut, repeat: Infinity, repeatDelay: 4 }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
