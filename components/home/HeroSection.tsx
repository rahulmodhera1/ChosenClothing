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
// The deepening grade ramps in gradually across the final stretch of footage,
// tracking the camera as it tilts up — not a sudden switch at the very end.
const GRADE_FADE_WINDOW = 9;

export default function HeroSection() {
  const [logoMissing, setLogoMissing] = useState(false);
  // The starfield appears once the drone reaches the open sky.
  const [skyReached, setSkyReached] = useState(false);
  // The deepening gradient tracks video progress (0 → 1) so it ramps in
  // smoothly as the camera climbs, rather than snapping on near the end.
  const [gradeProgress, setGradeProgress] = useState(0);
  const armedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const revealSky = () => {
    if (armedRef.current) return;
    armedRef.current = true;
    setSkyReached(true);
  };

  // Robust autoplay for mobile. Browsers (notably iOS Safari) only autoplay
  // when the element is *programmatically* confirmed muted and play() is
  // explicitly invoked — the HTML attributes alone aren't always honored.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = () => {
      v.muted = true;
      v.defaultMuted = true;
      const p = v.play();
      if (p) p.catch(() => { /* will retry on interaction */ });
    };

    tryPlay();
    v.addEventListener("loadeddata", tryPlay);
    v.addEventListener("canplay", tryPlay);

    // Last resort: kick playback on the first user gesture, then detach.
    const onGesture = () => {
      tryPlay();
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("click", onGesture);
    };
    window.addEventListener("touchstart", onGesture, { passive: true });
    window.addEventListener("click", onGesture);

    return () => {
      v.removeEventListener("loadeddata", tryPlay);
      v.removeEventListener("canplay", tryPlay);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("click", onGesture);
    };
  }, []);

  // Fallback: if the video never plays (blocked autoplay), settle into the
  // final graded state anyway.
  useEffect(() => {
    const t = setTimeout(() => {
      revealSky();
      setGradeProgress(1);
    }, 8000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden flex items-center justify-center bg-[#080a10]">
      {/* Drone video — plays once, holds on final frame */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster={HERO_VIDEO_POSTER}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (!v.duration) return;
          if (v.currentTime >= v.duration - STARS_LEAD) revealSky();
          // Ramp the grade across the final window, easing 0 → 1.
          const start = v.duration - GRADE_FADE_WINDOW;
          const p = Math.min(1, Math.max(0, (v.currentTime - start) / GRADE_FADE_WINDOW));
          setGradeProgress(p);
        }}
        onEnded={() => {
          revealSky();
          setGradeProgress(1);
        }}
        className={FRAME}
        style={{ filter: GRADE }}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Light base grade — always present so the logo and text stay legible
          while the drone races through the lit-up city. Kept subtle on purpose. */}
      <div className="absolute inset-0 z-[10] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 90% at 50% 40%, transparent 30%, rgba(8,10,16,0.35) 75%, rgba(8,10,16,0.6) 100%)"
        }}
      />

      {/* Deepening grade — ramps in gradually as the camera tilts up to the
          open sky, pulling the frame into a darker, cinematic mood for the
          held finale. Opacity tracks video progress for a continuous fade. */}
      <motion.div
        className="absolute inset-0 z-[11] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: gradeProgress }}
        transition={{ duration: 0.4, ease: "linear" }}
      >
        {/* Heavy vignette — pulls the sky back so the logo owns the frame */}
        <div className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 80% at 50% 40%, transparent 10%, rgba(8,10,16,0.6) 55%, rgba(8,10,16,0.94) 100%)"
          }}
        />
        {/* Top-to-bottom cinematic grade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080a10]/85 via-[#080a10]/10 to-[#080a10]/96" />
        {/* Mid-frame darkening for depth */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 25%, rgba(8,10,16,0.3) 50%, transparent 70%)" }}
        />
      </motion.div>

      {/* Animated starfield — fades in once the drone reaches the sky */}
      <AnimatePresence>
        {skyReached && (
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
        {/* Signature tagline — metallic chrome with a slow travelling shimmer,
            flanked by hairline rules that draw outward on entrance. */}
        <div className="flex items-center gap-4 sm:gap-7">
          <motion.span
            aria-hidden="true"
            className="hidden sm:block h-px w-8 md:w-16 origin-right bg-gradient-to-r from-transparent to-white/55"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.6, ease: easeOut }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 14, letterSpacing: "0.6em" }}
            animate={{
              opacity: 1,
              y: 0,
              letterSpacing: "0.35em",
              backgroundPosition: ["200% 0%", "-40% 0%"],
            }}
            transition={{
              opacity: { duration: 1.3, delay: 0.4, ease: easeOut },
              y: { duration: 1.3, delay: 0.4, ease: easeOut },
              letterSpacing: { duration: 1.6, delay: 0.4, ease: easeOut },
              backgroundPosition: { duration: 6.5, delay: 1.4, ease: "linear", repeat: Infinity, repeatDelay: 1.2 },
            }}
            className="text-center text-xl sm:text-4xl md:text-5xl uppercase font-semibold"
            style={{
              backgroundImage:
                "linear-gradient(110deg, #8a98ad 0%, #dce5f0 18%, #ffffff 28%, #eef2f8 40%, #ffffff 52%, #c4cfde 64%, #ffffff 76%, #8a98ad 100%)",
              backgroundSize: "240% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              filter:
                "drop-shadow(0 2px 18px rgba(0,0,0,0.8)) drop-shadow(0 0 32px rgba(138,152,173,0.3))",
            }}
          >
            One in a Million
          </motion.h2>
          <motion.span
            aria-hidden="true"
            className="hidden sm:block h-px w-8 md:w-16 origin-left bg-gradient-to-l from-transparent to-white/55"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.6, ease: easeOut }}
          />
        </div>
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
