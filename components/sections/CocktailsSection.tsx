"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { COCKTAILS, Cocktail } from "@/data/cocktails";
import { AnimatePresence, motion } from "motion/react";

export function CocktailsSection() {
  const [activeCocktail, setActiveCocktail] = useState<Cocktail | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Floating cursor image preview with lerp & velocity tilt
  useEffect(() => {
    const previewEl = previewRef.current;
    if (!previewEl) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let lastX = 0;
    let tilt = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const deltaX = e.clientX - lastX;
      lastX = e.clientX;
      // Tilt calculated from cursor horizontal velocity
      tilt = Math.max(-14, Math.min(14, deltaX * 0.45));
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const lerp = (start: number, end: number, f: number) => start + (end - start) * f;

    const loop = () => {
      currentX = lerp(currentX, mouseX, 0.12);
      currentY = lerp(currentY, mouseY, 0.12);
      tilt = lerp(tilt, 0, 0.08);

      if (previewEl) {
        previewEl.style.transform = `translate3d(${currentX + 28}px, ${currentY - 160}px, 0) rotate(${tilt}deg)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="cocktails"
      ref={sectionRef}
      className="relative min-h-screen py-28 md:py-40 bg-[#1a080f] text-[#f3ead8] overflow-hidden transition-colors duration-700"
    >
      {/* Velvet Burgundy ambient background glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#c43355]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 relative z-10">
        {/* Milestone Sub-heading */}
        <div className="flex items-center justify-between mb-16 border-b border-[#c9a45c]/20 pb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#c9a45c] tracking-widest uppercase">
              21:00 · The Pour
            </span>
            <span className="w-12 h-[1px] bg-[#c9a45c]/40" />
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#e8cf9a]/70">
              Curated Cocktails & House Signatures
            </span>
          </div>

          <span className="font-sans text-[10px] uppercase tracking-widest text-[#f3ead8]/40 hidden sm:inline">
            Hover to preview · Click for tasting notes
          </span>
        </div>

        <div className="mb-12 max-w-2xl">
          <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#f3ead8] leading-[1.05]">
            Crafted with crystal clarity and <span className="italic font-normal text-[#e8cf9a]">deliberate</span> restraint.
          </h2>
          <p className="mt-4 font-sans text-xs sm:text-sm uppercase tracking-[0.2em] text-[#f3ead8]/60">
            Hand-carved block ice · Heritage botanicals · Vintage glassware
          </p>
        </div>

        {/* ================= DESKTOP EDITORIAL SERIF LIST ================= */}
        <div className="hidden md:block space-y-2">
          {COCKTAILS.map((cocktail, index) => {
            const isHovered = activeCocktail?.id === cocktail.id;
            const isAnyHovered = activeCocktail !== null;
            const isExpanded = expandedId === cocktail.id;

            return (
              <div
                key={cocktail.id}
                onMouseEnter={() => setActiveCocktail(cocktail)}
                onMouseLeave={() => setActiveCocktail(null)}
                className={`relative border-b border-[#c9a45c]/15 py-7 transition-all duration-300 ${
                  isAnyHovered && !isHovered ? "opacity-30 blur-[0.4px]" : "opacity-100"
                }`}
              >
                {/* Active Hover Glow Underline */}
                <div
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-[#e8cf9a] via-[#c9a45c] to-transparent transition-all duration-500 ease-out ${
                    isHovered ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />

                <div
                  onClick={() => toggleExpand(cocktail.id)}
                  data-cursor="explore"
                  className="group flex items-baseline justify-between cursor-pointer select-none"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono text-xs text-[#c9a45c] tracking-widest flex items-center gap-2.5">
                      <span
                        className={`w-1.5 h-1.5 rotate-45 border border-[#c9a45c] transition-all duration-300 ${
                          isHovered ? "bg-[#e8cf9a] scale-125 shadow-[0_0_8px_#e8cf9a]" : "bg-transparent opacity-30"
                        }`}
                      />
                      0{index + 1}
                    </span>
                    <h3 className="font-serif text-4xl lg:text-6xl font-light text-[#f3ead8] group-hover:text-[#e8cf9a] group-hover:translate-x-3 transition-all duration-300">
                      {cocktail.name}
                    </h3>
                    <span className="font-sans text-[10px] uppercase tracking-[0.24em] px-2.5 py-0.5 rounded-full border border-[#c9a45c]/30 text-[#e8cf9a]/80 ml-2">
                      {cocktail.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="font-sans text-xs uppercase tracking-widest text-[#f3ead8]/50 group-hover:text-[#f3ead8] hidden lg:inline">
                      {cocktail.subtitle}
                    </span>
                    <span className="w-8 h-8 rounded-full border border-[#c9a45c]/30 flex items-center justify-center text-[#e8cf9a] group-hover:border-[#e8cf9a] transition-colors">
                      <span className={`text-base font-light transition-transform duration-300 ${isExpanded ? "rotate-45" : ""}`}>
                        +
                      </span>
                    </span>
                  </div>
                </div>

                {/* Collapsible Expanded Tasting Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 pb-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#f3ead8]/80 font-sans border-t border-[#c9a45c]/10 mt-6">
                        <div>
                          <span className="block text-[10px] uppercase tracking-[0.2em] text-[#c9a45c] mb-1">
                            Glassware & Garnish
                          </span>
                          <p>{cocktail.glassware}</p>
                          <p className="text-[#f3ead8]/60 mt-0.5">{cocktail.garnish}</p>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase tracking-[0.2em] text-[#c9a45c] mb-1">
                            Mixology Notes // PLACEHOLDER
                          </span>
                          <p className="leading-relaxed">{cocktail.notes}</p>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase tracking-[0.2em] text-[#c9a45c] mb-1.5">
                            Flavor Profile
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {cocktail.flavorProfile.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 bg-[#c9a45c]/10 border border-[#c9a45c]/25 rounded text-[10px] uppercase tracking-wider text-[#e8cf9a]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ================= MOBILE SWIPEABLE SNAP CARDS ================= */}
        <div className="md:hidden">
          <div
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 -mx-6 px-6 no-scrollbar"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {COCKTAILS.map((cocktail, i) => (
              <div
                key={cocktail.id}
                className="snap-center shrink-0 w-[84vw] max-w-[320px] bg-[#12070c] border border-[#c9a45c]/30 rounded-lg p-5 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative w-full h-56 rounded overflow-hidden mb-4 border border-[#c9a45c]/20">
                    <Image
                      src={cocktail.image}
                      alt={cocktail.alt}
                      fill
                      sizes="320px"
                      className="object-cover object-center filter contrast-[1.08]"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#0a0806]/80 backdrop-blur-xs rounded text-[9px] uppercase tracking-widest text-[#e8cf9a] border border-[#c9a45c]/30">
                      {cocktail.category}
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-serif text-2xl font-light text-[#f3ead8]">
                      {cocktail.name}
                    </h3>
                    <span className="font-mono text-xs text-[#c9a45c]">0{i + 1}</span>
                  </div>
                  <p className="font-sans text-[11px] text-[#e8cf9a]/80 mb-3">{cocktail.subtitle}</p>
                  <p className="font-sans text-xs text-[#f3ead8]/70 leading-relaxed line-clamp-3">
                    {cocktail.notes}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#c9a45c]/15 flex items-center justify-between text-[10px] text-[#c9a45c]">
                  <span>{cocktail.glassware}</span>
                  <span className="text-[#f3ead8]/40 uppercase tracking-widest text-[9px]">
                    Swipe for next →
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Swipe Indicator Dots */}
          <div className="flex items-center justify-center gap-2 mt-2">
            {COCKTAILS.map((c, i) => (
              <span
                key={c.id}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === 0 ? "bg-[#c9a45c] w-4" : "bg-[#c9a45c]/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ================= FLOATING DESKTOP CURSOR PREVIEW ================= */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9990] hidden md:block will-change-transform"
      >
        <AnimatePresence>
          {activeCocktail && (
            <motion.div
              key={activeCocktail.id}
              initial={{ opacity: 0, scale: 0.85, clipPath: "inset(10% round 8px)" }}
              animate={{ opacity: 1, scale: 1, clipPath: "inset(0% round 8px)" }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-64 h-80 relative rounded-lg overflow-hidden border border-[#c9a45c]/60 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-[#0a0806]"
            >
              <Image
                src={activeCocktail.image}
                alt={activeCocktail.alt}
                fill
                sizes="256px"
                className="object-cover object-center filter contrast-[1.1] saturate-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="font-serif text-sm text-[#f3ead8] block">
                  {activeCocktail.name}
                </span>
                <span className="font-sans text-[9px] uppercase tracking-widest text-[#c9a45c]">
                  {activeCocktail.glassware}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
