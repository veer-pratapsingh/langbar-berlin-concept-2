"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/data/images";
import { Button } from "@/components/ui/Button";
import { AnimatePresence, motion } from "motion/react";

export function PrivateEventsSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    guests: "20 - 40 Guests",
    eventType: "Cocktail Reception",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section
      id="private-events"
      className="relative min-h-screen py-28 md:py-40 bg-[#120a0e] text-[#f3ead8] overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#c9a45c]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 relative z-10">
        {/* Milestone Sub-heading */}
        <div className="flex items-center gap-3 mb-16 border-b border-[#c9a45c]/20 pb-6">
          <span className="font-mono text-xs text-[#c9a45c] tracking-widest uppercase">
            00:00 · Your Night
          </span>
          <span className="w-12 h-[1px] bg-[#c9a45c]/40" />
          <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#e8cf9a]/70">
            Private Celebrations &amp; Exclusive Hire
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Imagery & Narrative (6 Cols) */}
          <div className="lg:col-span-6 space-y-8">
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#f3ead8] leading-[1.05]">
              An exclusive stage for <span className="italic font-normal text-[#e8cf9a]">unforgettable</span> evenings.
            </h2>

            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#f3ead8]/75 max-w-xl">
              From intimate milestone birthdays and private salon gatherings to full cocktail receptions overlooking the Charlottenburg boulevard. Our dedicated bar team conceives custom mixology menus, matched pairings and effortless hospitality.
            </p>

            {/* Asymmetric Arch Image Frame */}
            <div className="relative w-full h-[420px] sm:h-[480px] rounded-t-[140px] overflow-hidden border border-[#c9a45c]/30 shadow-2xl group">
              <Image
                src={IMAGES.eventsCelebration.file}
                alt={IMAGES.eventsCelebration.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover object-center filter contrast-[1.1] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120a0e]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-sans text-[10px] uppercase tracking-[0.26em] text-[#e8cf9a] block">
                  Private Salon Reception
                </span>
                <span className="font-serif text-xl text-[#f3ead8]">
                  Waldorf Astoria Berlin, 1st Floor
                </span>
              </div>
            </div>

            {/* Event Highlights List */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#c9a45c]/15 text-xs text-[#f3ead8]/70 font-sans">
              <div>
                <span className="text-[#c9a45c] block font-mono text-[10px] uppercase mb-0.5">
                  CAPACITY
                </span>
                <span>Up to 120 Guests Reception</span>
              </div>
              <div>
                <span className="text-[#c9a45c] block font-mono text-[10px] uppercase mb-0.5">
                  MIXOLOGY
                </span>
                <span>Tailored Signature Menu</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Refined Enquiry Form with Floating Labels & Success State (6 Cols) */}
          <div className="lg:col-span-6 bg-[#0a0807]/90 border border-[#c9a45c]/30 rounded-lg p-8 sm:p-12 shadow-2xl backdrop-blur-md">
            <div className="pb-6 mb-8 border-b border-[#c9a45c]/15">
              <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-[#c9a45c] block mb-1">
                Event Enquiry
              </span>
              <h3 className="font-serif text-3xl font-light text-[#f3ead8]">
                Request a Private Proposal
              </h3>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                /* Animated Gold Success State */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="py-16 text-center flex flex-col items-center"
                >
                  <div className="w-20 h-20 rounded-full border-2 border-[#c9a45c] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(201,164,92,0.4)]">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#e8cf9a" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h4 className="font-serif text-3xl text-[#f3ead8]">Enquiry Recorded</h4>
                  <p className="font-sans text-sm text-[#f3ead8]/75 mt-3 max-w-sm leading-relaxed">
                    Thank you, {formData.name || "Esteemed Organizer"}. Your private event request for {formData.guests} on {formData.date || "your requested date"} has been received in this concept prototype.
                  </p>
                  <div className="mt-8">
                    <Button variant="secondary" onClick={() => setIsSubmitted(false)}>
                      Submit Another Enquiry
                    </Button>
                  </div>
                </motion.div>
              ) : (
                /* Form */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.22em] text-[#c9a45c] mb-1.5 font-medium">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Helena Richter"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#15110e] border border-[#c9a45c]/25 rounded px-4 py-3 text-xs text-[#f3ead8] placeholder-[#f3ead8]/30 focus:border-[#e8cf9a] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.22em] text-[#c9a45c] mb-1.5 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="helena@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#15110e] border border-[#c9a45c]/25 rounded px-4 py-3 text-xs text-[#f3ead8] placeholder-[#f3ead8]/30 focus:border-[#e8cf9a] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.22em] text-[#c9a45c] mb-1.5 font-medium">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#15110e] border border-[#c9a45c]/25 rounded px-3 py-3 text-xs text-[#f3ead8] focus:border-[#e8cf9a] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.22em] text-[#c9a45c] mb-1.5 font-medium">
                        Guest Count
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full bg-[#15110e] border border-[#c9a45c]/25 rounded px-3 py-3 text-xs text-[#f3ead8] focus:border-[#e8cf9a] focus:outline-none"
                      >
                        <option value="10 - 20 Guests">10 – 20 Guests</option>
                        <option value="20 - 40 Guests">20 – 40 Guests</option>
                        <option value="40 - 80 Guests">40 – 80 Guests</option>
                        <option value="Full Buyout (120)">Full Salon Buyout (120)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.22em] text-[#c9a45c] mb-1.5 font-medium">
                        Event Nature
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full bg-[#15110e] border border-[#c9a45c]/25 rounded px-3 py-3 text-xs text-[#f3ead8] focus:border-[#e8cf9a] focus:outline-none"
                      >
                        <option value="Cocktail Reception">Cocktail Reception</option>
                        <option value="Milestone Birthday">Milestone Birthday</option>
                        <option value="Corporate Evening">Corporate Evening</option>
                        <option value="Wedding After-Party">Wedding Celebration</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.22em] text-[#c9a45c] mb-1.5 font-medium">
                      Event Vision &amp; Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share details on timing, music preferences, champagne selections, or dietary requests..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#15110e] border border-[#c9a45c]/25 rounded px-4 py-3 text-xs text-[#f3ead8] placeholder-[#f3ead8]/30 focus:border-[#e8cf9a] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" className="w-full py-4 text-xs">
                      Submit Event Proposal Request
                    </Button>
                  </div>

                  <p className="text-[10px] font-sans text-center text-[#f3ead8]/40 tracking-wider">
                    Front-end preview · Inquiries dispatched to the venue events team
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
