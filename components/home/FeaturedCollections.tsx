"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { easeOut } from "@/lib/motion";

interface CollectionCard {
  handle: string;
  title: string;
  subtitle: string;
  images: string[];
  badge: string;
  badgeColor: string;
  href: string;
}

const collections: CollectionCard[] = [
  {
    handle: "brown-cargo-set",
    title: "Brown Cargo Set",
    subtitle: "The signature set. Heavy cotton. Built to last.",
    images: ["/images/collections/Cargo/2.png"],
    badge: "10% off first order",
    badgeColor: "bg-[#8a98ad] text-white",
    href: "/collections/brown-cargo-set",
  },
  {
    handle: "washed-rhinestone-tracksuit",
    title: "Washed Rhinestone Tracksuit",
    subtitle: "New look. Raw materials. Rhinestone finish.",
    images: ["/images/collections/Rhinestone/2.png"],
    badge: "New Arrivals",
    badgeColor: "bg-white text-[#14171c]",
    href: "/collections/washed-rhinestone-tracksuit",
  },
];

function CollectionMedia({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 7000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <>
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ opacity: { duration: 2.2, ease: easeOut }, scale: { duration: 9, ease: easeOut } }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default function FeaturedCollections() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: easeOut }}
        className="mb-10"
      >
        <p className="text-[#5b6573] text-xs tracking-[0.3em] uppercase mb-2">Collections</p>
        <h2 className="font-display text-4xl sm:text-5xl text-[#14171c] tracking-wider">SHOP THE LOOK</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {collections.map((col, i) => (
          <motion.div
            key={col.handle}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15, ease: easeOut }}
          >
            <Link href={col.href} className="group block relative overflow-hidden aspect-[4/5]">
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <CollectionMedia images={col.images} alt={col.title} />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className={`${col.badgeColor} text-xs font-bold tracking-widest uppercase px-3 py-1.5`}>
                  {col.badge}
                </span>
              </div>

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-white tracking-wider leading-tight">
                  {col.title.toUpperCase()}
                </h3>
                <p className="text-white/75 text-sm mt-1 leading-relaxed">{col.subtitle}</p>
                <span className="inline-block mt-4 text-white/90 text-xs tracking-widest uppercase border-b border-white/50 pb-0.5 group-hover:text-white group-hover:border-white transition-colors">
                  Shop Collection
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
