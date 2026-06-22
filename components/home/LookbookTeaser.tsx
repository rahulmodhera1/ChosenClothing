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
    <section ref={ref} className="py-20 bg-[#eef1f5]">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOut }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <p className="text-[#5b6573] text-xs tracking-[0.3em] uppercase mb-2">Editorial</p>
            <h2 className="font-display text-4xl sm:text-5xl text-[#14171c] tracking-wider">THE LOOKBOOK</h2>
          </div>
          <Link
            href="/lookbook"
            className="hidden sm:inline-block text-[#8a98ad] text-xs tracking-widest uppercase border-b border-[#8a98ad] pb-0.5 hover:text-[#14171c] hover:border-[#14171c] transition-colors"
          >
            View All
          </Link>
        </motion.div>
      </div>

      {/* Full-width image strip — 2 cols on mobile, 4 on sm+ */}
      <div className="grid grid-cols-2 sm:flex sm:gap-2 overflow-hidden gap-2 px-4 sm:px-0">
        {teaserImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1, ease: easeOut }}
            className="relative sm:flex-1 min-w-0 aspect-[2/3]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
          </motion.div>
        ))}
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-6 sm:hidden">
        <Link
          href="/lookbook"
          className="text-[#8a98ad] text-xs tracking-widest uppercase border-b border-[#8a98ad] pb-0.5"
        >
          View All
        </Link>
      </div>
    </section>
  );
}
