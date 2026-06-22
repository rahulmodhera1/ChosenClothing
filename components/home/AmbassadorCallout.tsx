"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AmbassadorCallout() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-[#2e2820]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-[#a89880] text-xs tracking-[0.3em] uppercase mb-2">Community</p>
          <h2 className="font-display text-3xl sm:text-4xl text-[#f0ebe3] tracking-wider">BECOME A BRAND AMBASSADOR</h2>
          <p className="text-[#a89880] text-sm mt-2 max-w-md leading-relaxed">Interested in representing Chosen? We are always looking for people who move different.</p>
        </div>
        <Link href="/contact#ambassador" className="flex-shrink-0 border border-[#c4a882] text-[#c4a882] hover:bg-[#c4a882] hover:text-[#0f0d0b] font-display text-sm tracking-widest px-8 py-4 transition-all duration-300">APPLY NOW</Link>
      </motion.div>
    </section>
  );
}
