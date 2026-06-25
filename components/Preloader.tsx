"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Minimum hold keeps the splash visible long enough for the video to
    // buffer its first frames — prevents the laggy/blank entry on the hero.
    const MIN_MS = 2800;
    const start = Date.now();

    let loadFired = false;
    let minElapsed = false;
    let safetyTimer: ReturnType<typeof setTimeout>;

    const tryHide = () => {
      if (loadFired && minElapsed) setVisible(false);
    };

    const onLoad = () => {
      loadFired = true;
      tryHide();
    };

    const onMinElapsed = () => {
      minElapsed = true;
      tryHide();
    };

    const minTimer = setTimeout(onMinElapsed, MIN_MS);

    if (document.readyState === "complete") {
      loadFired = true;
    } else {
      window.addEventListener("load", onLoad);
    }

    // Also wait for the hero video's canplay event so it's buffered before reveal
    const video = document.querySelector<HTMLVideoElement>("video");
    if (video) {
      const onCanPlay = () => {
        loadFired = true;
        tryHide();
      };
      video.addEventListener("canplay", onCanPlay, { once: true });
    }

    // Hard cap — never block more than 6 s regardless
    safetyTimer = setTimeout(() => setVisible(false), 6000);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(minTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#080a10]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="w-[200px] sm:w-[260px]"
          >
            <Image
              src="/images/ChosenLogo.png"
              alt="Chosen"
              width={260}
              height={140}
              priority
              className="w-full h-auto object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
