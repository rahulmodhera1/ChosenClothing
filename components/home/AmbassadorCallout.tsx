"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeOut } from "@/lib/motion";

export default function AmbassadorCallout() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-[#dde1e8]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: easeOut }}
        className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div>
          <p className="text-[#5b6573] text-xs tracking-[0.3em] uppercase mb-2">Community</p>
          <h2 className="font-display text-3xl sm:text-4xl text-[#14171c] tracking-wider">
            BECOME A BRAND AMBASSADOR
          </h2>
          <p className="text-[#5b6573] text-sm mt-2 max-w-md leading-relaxed">
            Interested in representing Chosen? We are always looking for people who move different.
          </p>
        </div>
        <Link
          href="/contact#ambassador"
          className="press w-full sm:w-auto sm:flex-shrink-0 text-center border border-[#8a98ad] text-[#8a98ad] hover:bg-[#8a98ad] hover:text-white font-display text-sm tracking-widest px-8 py-4"
        >
          APPLY NOW
        </Link>
      </motion.div>
    </section>
  );
}
