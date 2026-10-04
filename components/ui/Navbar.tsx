"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { Button } from "./Button";
import { ReservationDrawer } from "./ReservationDrawer";
import { AnimatePresence, motion } from "motion/react";

export function Navbar() {
  const { scrollTo } = useSmoothScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Blurred dark glass after hero
      setIsScrolled(currentScrollY > 60);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > 180) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 8) {
          setIsVisible(false);
        } else if (lastScrollY - currentScrollY > 8) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { label: "Story", href: "#story" },
    { label: "Cocktails", href: "#cocktails" },
    { label: "Gallery", href: "#gallery" },
    { label: "DJ Nights", href: "#dj-nights" },
    { label: "Private Events", href: "#private-events" },
    { label: "Visit", href: "#visit" },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-[#0a0806]/85 backdrop-blur-md border-b border-[#c9a45c]/20 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-6"
        }`}
      >
        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 flex items-center justify-between">
          {/* Brand Wordmark & Concept Tag */}
          <div className="flex items-center gap-4">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#hero");
              }}
              className="group flex items-center gap-3 sm:gap-3.5 focus:outline-none"
              aria-label="Lang Bar Berlin Home"
            >
              <Image
                src="/images/langbar-logo-128.png"
                alt="Lang Bar Berlin Official Logo"
                width={36}
                height={36}
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(201,164,92,0.35)]"
                priority
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl tracking-[0.22em] uppercase font-light text-[#f3ead8] group-hover:text-[#e8cf9a] transition-colors leading-none">
                  Lang Bar
                </span>
                <span className="font-sans text-[8px] uppercase tracking-[0.32em] text-[#c9a45c]/70 group-hover:text-[#c9a45c] transition-colors mt-1">
                  Berlin
                </span>
              </div>
            </a>

            {/* Concept Preview Tag */}
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c9a45c]/10 border border-[#c9a45c]/30 text-[9px] font-sans uppercase tracking-[0.2em] text-[#e8cf9a]">
              <span className="w-1 h-1 rounded-full bg-[#c9a45c] animate-pulse" />
              Concept Preview
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="font-sans text-[11px] uppercase tracking-[0.22em] text-[#f3ead8]/75 hover:text-[#e8cf9a] transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c9a45c] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action CTAs & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <Button
              variant="primary"
              onClick={() => setReservationOpen(true)}
              className="py-2.5 px-5 text-[11px]"
              cursorLabel="Book"
            >
              Reserve
            </Button>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#e8cf9a] hover:text-[#f3ead8] focus:outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="8" x2="20" y2="8" />
                    <line x1="4" y1="16" x2="16" y2="16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN MOBILE OVERLAY MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-[#0a0806]/95 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            {/* Top decorative art-deco hairline */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c9a45c]/30 to-transparent" />

            {/* Links list with staggered motion */}
            <nav className="flex flex-col gap-6 py-6" aria-label="Mobile Navigation">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * idx, duration: 0.4 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="font-serif text-3xl font-light text-[#f3ead8] hover:text-[#e8cf9a] flex items-center justify-between border-b border-[#c9a45c]/15 pb-4"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-[#c9a45c]/50">0{idx + 1}</span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom drawer CTA & info */}
            <div className="space-y-4 pt-4 border-t border-[#c9a45c]/20">
              <Button
                variant="primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setReservationOpen(true);
                }}
                className="w-full py-4 text-xs"
              >
                Reserve a Table
              </Button>
              <div className="flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.2em] text-[#e8cf9a]/60 pt-2">
                <span>Waldorf Astoria Berlin</span>
                <span>@langbar_berlin</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reservation Slide-Over Modal */}
      <ReservationDrawer isOpen={reservationOpen} onClose={() => setReservationOpen(false)} />
    </>
  );
}
