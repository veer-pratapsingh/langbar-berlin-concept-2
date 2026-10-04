"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SITE_CONFIG } from "@/data/site";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  const letters = ["L", "A", "N", "G", " ", "B", "A", "R"];

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // Gentle, dependable reveal of the giant letters when footer enters view
      gsap.fromTo(
        ".footer-letter",
        { y: 25, opacity: 0.35 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 95%",
            once: true,
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { label: "Story", href: "#story" },
    { label: "Cocktails", href: "#cocktails" },
    { label: "Gallery", href: "#gallery" },
    { label: "DJ Nights", href: "#dj-nights" },
    { label: "Private Events", href: "#private-events" },
    { label: "Visit", href: "#visit" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#060403] text-[#f3ead8] pt-20 sm:pt-28 pb-16 sm:pb-24 border-t border-[#c9a45c]/25 select-none"
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 relative z-10">
        {/* Top Footer Row: Navigation Links, Social & Back to Top */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-16 border-b border-[#c9a45c]/15">
          {/* Nav links */}
          <nav className="flex flex-wrap gap-6 sm:gap-8" aria-label="Footer navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="font-sans text-xs uppercase tracking-[0.22em] text-[#f3ead8]/70 hover:text-[#e8cf9a] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-6">
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-[#e8cf9a] hover:text-[#f3ead8] transition-colors"
            >
              <span>Instagram {SITE_CONFIG.instagramHandle}</span>
              <span aria-hidden="true">↗</span>
            </a>

            <button
              onClick={() => scrollTo(0)}
              className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-[#f3ead8]/60 hover:text-[#e8cf9a] focus:outline-none transition-colors"
              aria-label="Back to top of the page"
            >
              <span>Top</span>
              <span className="w-6 h-6 rounded-full border border-[#c9a45c]/30 flex items-center justify-center text-[10px] group-hover:border-[#e8cf9a] group-hover:-translate-y-0.5 transition-all">
                ↑
              </span>
            </button>
          </div>
        </div>

        {/* GIANT LETTER-BY-LETTER STAGGERED WORDMARK */}
        <div ref={wordmarkRef} className="py-14 sm:py-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#c9a45c]/40" />
            <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#c9a45c]">
              Waldorf Astoria Berlin · 1st Floor
            </span>
            <span className="w-8 h-[1px] bg-[#c9a45c]/40" />
          </div>

          <div className="font-serif text-[13vw] sm:text-[14vw] md:text-[15vw] font-light leading-none tracking-tight text-[#f3ead8] flex justify-center items-center select-none py-2">
            {letters.map((char, idx) => (
              <span
                key={idx}
                className={`footer-letter inline-block ${
                  char === " " ? "w-[3vw]" : ""
                } hover:text-[#e8cf9a] hover:scale-105 transition-transform duration-300`}
              >
                {char}
              </span>
            ))}
          </div>

          <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#e8cf9a]/70 mt-6">
            2026 Concept Design by Inderpreet Singh &amp; Veer Pratap Singh
          </p>
        </div>

        {/* Pitch Protection & Legal Disclaimers */}
        <div className="pt-10 border-t border-[#c9a45c]/15 text-center text-[11px] sm:text-xs font-sans text-[#f3ead8]/60 max-w-4xl mx-auto space-y-3.5">
          <p className="leading-relaxed">
            This website is a conceptual design mockup created exclusively for presentation and pitching purposes. It is not an official website, nor is it intended for commercial use, public distribution, or profit.
          </p>
          <p className="leading-relaxed text-[#f3ead8]/50 text-[10.5px] sm:text-[11px]">
            All brand assets, text, and imagery related to Langbar Berlin, including photographs sourced from their official Instagram account remain the exclusive intellectual property of Langbar Berlin and their respective creators. These materials have been incorporated strictly for illustrative purposes to demonstrate a potential design concept.
          </p>
          <p className="leading-relaxed text-[#f3ead8]/50 text-[10.5px] sm:text-[11px]">
            No copyright infringement is intended. If you are the owner of these materials and require their removal from this private mockup, please contact the creator immediately.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-[10px] uppercase tracking-widest text-[#e8cf9a]/80">
            <span>Conceptual Mockup for Presentation Purposes Only</span>
            <span>·</span>
            <span>2026 Concept design by Inderpreet Singh &amp; Veer Pratap Singh.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
