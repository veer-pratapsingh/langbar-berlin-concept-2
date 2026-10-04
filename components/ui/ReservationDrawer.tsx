"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "./Button";

interface ReservationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationDrawer({ isOpen, onClose }: ReservationDrawerProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "2 Guests",
    time: "20:00",
    seating: "Lounge Salon",
    notes: "",
  });

  const drawerRef = useRef<HTMLDivElement>(null);

  // Esc key closes drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99990] flex justify-end" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#0a0806]/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Slide-over panel */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#0e0b09] border-l border-[#c9a45c]/25 h-full overflow-y-auto p-8 sm:p-12 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-between"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#c9a45c]/20">
                <div>
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#c9a45c]">
                    Table Reservation
                  </span>
                  <h2 id="drawer-title" className="font-serif text-3xl text-[#f3ead8] font-light mt-1">
                    An Evening at Lang Bar
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-[#e8cf9a]/70 hover:text-[#e8cf9a] focus:outline-none"
                  aria-label="Close reservation panel"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Status Note */}
              <div className="my-6 p-3 bg-[#c9a45c]/10 border border-[#c9a45c]/20 rounded text-[11px] font-sans text-[#e8cf9a]/90 leading-relaxed">
                <span className="font-medium text-[#c9a45c]">Concept Preview:</span> This is a prototype front-end
                interaction. Real reservations connect seamlessly to SevenRooms, OpenTable or custom PMS APIs.
              </div>

              {submitted ? (
                /* Animated Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full border border-[#c9a45c] flex items-center justify-center mb-6 shadow-[0_0_24px_rgba(201,164,92,0.3)]">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e8cf9a" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl text-[#f3ead8]">Reservation Requested</h3>
                  <p className="font-sans text-sm text-[#f3ead8]/70 mt-3 max-w-xs leading-relaxed">
                    Thank you, {formData.name || "Esteemed Guest"}. Your inquiry for {formData.guests} on {formData.date || "your selected evening"} at {formData.time} has been recorded in the prototype state.
                  </p>
                  <div className="mt-8">
                    <Button variant="secondary" onClick={() => setSubmitted(false)}>
                      Make Another Enquiry
                    </Button>
                  </div>
                </motion.div>
              ) : (
                /* Reservation Form */
                <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#c9a45c] mb-1.5">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-[#15110e] border border-[#c9a45c]/25 rounded px-3 py-2.5 text-xs text-[#f3ead8] focus:border-[#e8cf9a] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#c9a45c] mb-1.5">
                        Time
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-[#15110e] border border-[#c9a45c]/25 rounded px-3 py-2.5 text-xs text-[#f3ead8] focus:border-[#e8cf9a] focus:outline-none"
                      >
                        <option value="18:00">18:00 (Aperitif)</option>
                        <option value="19:30">19:30 (Dinner Twilight)</option>
                        <option value="21:00">21:00 (Prime Lounge)</option>
                        <option value="22:30">22:30 (DJ Sessions)</option>
                        <option value="00:00">00:00 (Midnight Digestif)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#c9a45c] mb-1.5">
                        Party Size
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full bg-[#15110e] border border-[#c9a45c]/25 rounded px-3 py-2.5 text-xs text-[#f3ead8] focus:border-[#e8cf9a] focus:outline-none"
                      >
                        <option value="1 Guest">1 Guest</option>
                        <option value="2 Guests">2 Guests</option>
                        <option value="3-4 Guests">3 – 4 Guests</option>
                        <option value="5-8 Guests">5 – 8 Guests</option>
                        <option value="Large Party">9+ Guests (Private Area)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#c9a45c] mb-1.5">
                        Area Preference
                      </label>
                      <select
                        value={formData.seating}
                        onChange={(e) => setFormData({ ...formData, seating: e.target.value })}
                        className="w-full bg-[#15110e] border border-[#c9a45c]/25 rounded px-3 py-2.5 text-xs text-[#f3ead8] focus:border-[#e8cf9a] focus:outline-none"
                      >
                        <option value="Lounge Salon">Velvet Lounge Salon</option>
                        <option value="Bar Counter">Marble Bar Counter</option>
                        <option value="Window Alcove">Window Alcove (City View)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#c9a45c] mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maximilian von Weber"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#15110e] border border-[#c9a45c]/25 rounded px-3 py-2.5 text-xs text-[#f3ead8] placeholder-[#f3ead8]/30 focus:border-[#e8cf9a] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#c9a45c] mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="guest@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#15110e] border border-[#c9a45c]/25 rounded px-3 py-2.5 text-xs text-[#f3ead8] placeholder-[#f3ead8]/30 focus:border-[#e8cf9a] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#c9a45c] mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+49 ..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#15110e] border border-[#c9a45c]/25 rounded px-3 py-2.5 text-xs text-[#f3ead8] placeholder-[#f3ead8]/30 focus:border-[#e8cf9a] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#c9a45c] mb-1.5">
                      Special Requests / Occasion
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Anniversary, dietary preferences, or beverage requests..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[#15110e] border border-[#c9a45c]/25 rounded px-3 py-2 text-xs text-[#f3ead8] placeholder-[#f3ead8]/30 focus:border-[#e8cf9a] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" className="w-full">
                      Confirm Reservation Request
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="pt-8 border-t border-[#c9a45c]/15 text-center">
              <p className="font-sans text-[10px] tracking-wider text-[#f3ead8]/40 uppercase">
                Dress code: Smart Casual / Elegant · Waldorf Astoria Berlin
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
