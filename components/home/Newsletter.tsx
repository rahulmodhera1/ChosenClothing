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
        <p className="text-[#5b6573] text-xs tracking-[0.3em] uppercase mb-3">Stay in the loop</p>
        <h2 className="font-display text-4xl sm:text-5xl text-[#14171c] tracking-wider mb-4">
          JOIN THE CHOSEN FEW
        </h2>
        <p className="text-[#5b6573] text-sm leading-relaxed mb-8">
          New subscribers get 10% off their first purchase. No spam, just drops.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="text-[#6f7e95] text-sm tracking-widest uppercase"
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
              className="w-full sm:flex-1 bg-white border border-[#dde1e8] text-[#14171c] placeholder-[#9aa3b0] text-base sm:text-sm px-5 py-3.5 focus:outline-none focus:border-[#8a98ad] transition-colors"
            />
            <button
              type="submit"
              className="press w-full sm:w-auto bg-[#8a98ad] hover:bg-[#6f7e95] text-white font-display text-sm tracking-widest px-8 py-3.5 whitespace-nowrap"
            >
              SUBSCRIBE
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
