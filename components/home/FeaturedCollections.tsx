"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const collections = [
  { handle: "brown-cargo-set", title: "Brown Cargo Set", subtitle: "The signature set. Heavy cotton. Built to last.", image: "/images/collections/brown-cargo-set.jpg", badge: "10% off first order", badgeColor: "bg-[#c4a882] text-[#0f0d0b]", href: "/collections/brown-cargo-set" },
  { handle: "washed-rhinestone-tracksuit", title: "Washed Rhinestone Tracksuit", subtitle: "New look. Raw materials. Rhinestone finish.", image: "/images/collections/rhinestone-tracksuit.jpg", badge: "New Arrivals", badgeColor: "bg-[#f0ebe3] text-[#0f0d0b]", href: "/collections/washed-rhinestone-tracksuit" },
];

export default function FeaturedCollections() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-10">
        <p className="text-[#a89880] text-xs tracking-[0.3em] uppercase mb-2">Collections</p>
        <h2 className="font-display text-4xl sm:text-5xl text-[#f0ebe3] tracking-wider">SHOP THE LOOK</h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {collections.map((col, i) => (
          <motion.div key={col.handle} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.15 }}>
            <Link href={col.href} className="group block relative overflow-hidden aspect-[4/5]">
              <Image src={col.image} alt={col.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4"><span className={`${col.badgeColor} text-xs font-bold tracking-widest uppercase px-3 py-1.5`}>{col.badge}</span></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl sm:text-3xl text-[#f0ebe3] tracking-wider leading-tight">{col.title.toUpperCase()}</h3>
                <p className="text-[#a89880] text-sm mt-1 leading-relaxed">{col.subtitle}</p>
                <span className="inline-block mt-4 text-[#c4a882] text-xs tracking-widest uppercase border-b border-[#c4a882] pb-0.5 group-hover:text-[#f0ebe3] group-hover:border-[#f0ebe3] transition-colors">Shop Collection</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
