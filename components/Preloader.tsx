"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = () => setVisible(false);

    if (document.readyState === "complete") {
      // Page already loaded — short hold so the logo registers, then fade
      const t = setTimeout(hide, 900);
      return () => clearTimeout(t);
    }

    window.addEventListener("load", hide);
    // Safety net: never block the page for more than 4 s
    const t = setTimeout(hide, 4000);
    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(t);
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
