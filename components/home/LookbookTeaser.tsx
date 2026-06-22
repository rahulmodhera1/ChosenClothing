"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { easeOut } from "@/lib/motion";

const teaserImages = [
  { src: "/images/lookbook/look-1.jpg", alt: "Chosen lookbook 1" },
  { src: "/images/lookbook/look-2.jpg", alt: "Chosen lookbook 2" },
  { src: "/images/lookbook/look-3.jpg", alt: "Chosen lookbook 3" },
  { src: "/images/lookbook/look-4.jpg", alt: "Chosen lookbook 4" },
];

export default function LookbookTeaser() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 bg-[#0a0906]">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOut }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <p className="text-[#a89880] text-xs tracking-[0.3em] uppercase mb-2">Editorial</p>
            <h2 className="font-display text-4xl sm:text-5xl text-[#f0ebe3] tracking-wider">THE LOOKBOOK</h2>
          </div>
          <Link
            href="/lookbook"
            className="hidden sm:inline-block text-[#c4a882] text-xs tracking-widest uppercase border-b border-[#c4a882] pb-0.5 hover:text-[#f0ebe3] hover:border-[#f0ebe3] transition-colors"
          >
            View All
          </Link>
        </motion.div>
      </div>

      {/* Full-width image strip */}
      <div className="flex gap-2 overflow-hidden">
        {teaserImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1, ease: easeOut }}
            className="relative flex-1 min-w-0 aspect-[2/3]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="25vw"
            />
          </motion.div>
        ))}
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-6 sm:hidden">
        <Link
          href="/lookbook"
          className="text-[#c4a882] text-xs tracking-widest uppercase border-b border-[#c4a882] pb-0.5"
        >
          View All
        </Link>
      </div>
    </section>
  );
}
