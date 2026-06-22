"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { easeOut } from "@/lib/motion";

export default function Newsletter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: easeOut }}
        className="max-w-2xl mx-auto text-center"
      >
        <p className="text-[#a89880] text-xs tracking-[0.3em] uppercase mb-3">Stay in the loop</p>
        <h2 className="font-display text-4xl sm:text-5xl text-[#f0ebe3] tracking-wider mb-4">
          JOIN THE CHOSEN FEW
        </h2>
        <p className="text-[#a89880] text-sm leading-relaxed mb-8">
          New subscribers get 10% off their first purchase. No spam, just drops.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="text-[#c4a882] text-sm tracking-widest uppercase"
          >
            You are in. Check your inbox.
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-[#1a1714] border border-[#2e2820] text-[#f0ebe3] placeholder-[#a89880] text-sm px-5 py-3.5 focus:outline-none focus:border-[#c4a882] transition-colors"
            />
            <button
              type="submit"
              className="press bg-[#c4a882] hover:bg-[#d4bc9a] text-[#0f0d0b] font-display text-sm tracking-widest px-8 py-3.5 whitespace-nowrap"
            >
              SUBSCRIBE
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
