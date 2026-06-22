"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";

export default function ContactClient() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [ambassadorForm, setAmbassadorForm] = useState({
    name: "",
    email: "",
    handle: "",
    followers: "",
    why: "",
  });
  const [contactSent, setContactSent] = useState(false);
  const [ambassadorSent, setAmbassadorSent] = useState(false);

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
  };

  const handleAmbassador = (e: React.FormEvent) => {
    e.preventDefault();
    setAmbassadorSent(true);
  };

  const inputClass =
    "w-full bg-[#1a1714] border border-[#2e2820] text-[#f0ebe3] placeholder-[#a89880] text-sm px-5 py-3.5 focus:outline-none focus:border-[#c4a882] transition-colors";

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="mb-12"
      >
        <p className="text-[#a89880] text-xs tracking-[0.3em] uppercase mb-2">Reach Out</p>
        <h1 className="font-display text-5xl sm:text-6xl text-[#f0ebe3] tracking-wider">CONTACT</h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
        >
          <h2 className="font-display text-2xl text-[#f0ebe3] tracking-wider mb-2">GET IN TOUCH</h2>
          <p className="text-[#a89880] text-sm mb-6 leading-relaxed">
            Questions about your order, sizing, or anything else? Hit us up.
          </p>
          <p className="text-[#c4a882] text-sm mb-6">
            <a href="mailto:chosenbrandca@gmail.com" className="hover:text-[#f0ebe3] transition-colors">
              chosenbrandca@gmail.com
            </a>
          </p>

          {contactSent ? (
            <div className="text-[#c4a882] text-sm tracking-widest uppercase py-8">
              Message sent. We will get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleContact} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="sr-only">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">Message</label>
                <textarea
                  id="contact-message"
                  placeholder="Your message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="press w-full bg-[#c4a882] hover:bg-[#d4bc9a] text-[#0f0d0b] font-display text-sm tracking-widest py-4"
              >
                SEND
              </button>
            </form>
          )}
        </motion.div>

        {/* Ambassador form */}
        <motion.div
          id="ambassador"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
        >
          <h2 className="font-display text-2xl text-[#f0ebe3] tracking-wider mb-2">BRAND AMBASSADOR</h2>
          <p className="text-[#a89880] text-sm mb-6 leading-relaxed">
            We are always looking for people who move different. If you represent the Chosen energy, apply below.
          </p>

          {ambassadorSent ? (
            <div className="text-[#c4a882] text-sm tracking-widest uppercase py-8">
              Application received. We will be in touch.
            </div>
          ) : (
            <form onSubmit={handleAmbassador} className="space-y-4">
              <div>
                <label htmlFor="amb-name" className="sr-only">Name</label>
                <input
                  id="amb-name"
                  type="text"
                  placeholder="Name"
                  required
                  value={ambassadorForm.name}
                  onChange={(e) => setAmbassadorForm({ ...ambassadorForm, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="amb-email" className="sr-only">Email</label>
                <input
                  id="amb-email"
                  type="email"
                  placeholder="Email"
                  required
                  value={ambassadorForm.email}
                  onChange={(e) => setAmbassadorForm({ ...ambassadorForm, email: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="amb-handle" className="sr-only">Instagram handle</label>
                <input
                  id="amb-handle"
                  type="text"
                  placeholder="Instagram handle"
                  value={ambassadorForm.handle}
                  onChange={(e) => setAmbassadorForm({ ...ambassadorForm, handle: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="amb-followers" className="sr-only">Follower count</label>
                <input
                  id="amb-followers"
                  type="text"
                  placeholder="Approx. follower count"
                  value={ambassadorForm.followers}
                  onChange={(e) => setAmbassadorForm({ ...ambassadorForm, followers: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="amb-why" className="sr-only">Why Chosen</label>
                <textarea
                  id="amb-why"
                  placeholder="Why do you want to represent Chosen?"
                  rows={4}
                  required
                  value={ambassadorForm.why}
                  onChange={(e) => setAmbassadorForm({ ...ambassadorForm, why: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="press w-full border border-[#c4a882] text-[#c4a882] hover:bg-[#c4a882] hover:text-[#0f0d0b] font-display text-sm tracking-widest py-4"
              >
                APPLY
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
