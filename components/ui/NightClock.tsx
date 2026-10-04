"use client";

import React, { useEffect, useState } from "react";
import { SITE_CONFIG } from "@/data/site";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";

export function NightClock() {
  const { scrollTo } = useSmoothScroll();
  const milestones = SITE_CONFIG.nightClockMilestones;
  const [activeIndex, setActiveIndex] = useState(0);

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 160);
      const scrollPos = window.scrollY + window.innerHeight * 0.38;
      for (let i = milestones.length - 1; i >= 0; i--) {
        const item = milestones[i];
        if (!item) continue;
        const el = document.getElementById(item.sectionId);
        if (el && el.offsetTop <= scrollPos) {
          setActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [milestones]);

  const activeMilestone = milestones[activeIndex] || milestones[0];

  return (
    <>
      {/* DESKTOP REFINED ARCHITECTURAL NIGHT CLOCK (Right Edge — screens >= 1280px) */}
      <aside
        aria-label="Night storytelling timeline"
        className="hidden xl:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center pointer-events-auto select-none"
      >
        {/* Subtle Category Tag */}
        <div className="flex flex-col items-center mb-3 opacity-60 hover:opacity-100 transition-opacity">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a45c] animate-pulse mb-1" />
          <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#e8cf9a] [writing-mode:vertical-rl] rotate-180">
            Timeline
          </span>
        </div>

        {/* Vertical Rail with Milestones */}
        <div className="relative py-2 flex flex-col items-center gap-3">
          {/* Subtle vertical background hairline */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#c9a45c]/20" />

          {milestones.map((ms, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={ms.time}
                onClick={() => scrollTo(`#${ms.sectionId}`)}
                className="group relative flex items-center justify-center w-7 h-7 focus:outline-none"
                title={`Jump to ${ms.time} — ${ms.label}`}
                aria-current={isActive ? "step" : undefined}
              >
                {/* Floating Tooltip Label (Floats out to the left on hover or when active) */}
                <div
                  className={`absolute right-9 px-2.5 py-1 rounded bg-[#0a0806]/95 border border-[#c9a45c]/40 shadow-xl whitespace-nowrap pointer-events-none transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}
                >
                  <span className="font-mono text-[10px] text-[#c9a45c] font-semibold">
                    {ms.time}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#c9a45c]/50" />
                  <span className="font-sans text-[10px] uppercase tracking-wider text-[#f3ead8]">
                    {ms.label}
                  </span>
                </div>

                {/* Milestone Node */}
                <div
                  className={`relative z-10 transition-all duration-300 flex items-center justify-center rounded-full ${
                    isActive
                      ? "w-4 h-4 bg-[#0a0806] border border-[#c9a45c] shadow-[0_0_10px_#c9a45c]"
                      : "w-2 h-2 bg-[#f3ead8]/30 group-hover:bg-[#c9a45c] group-hover:scale-125"
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e8cf9a] animate-pulse" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Storytelling disclaimer vertical marker */}
        <span className="text-[6.5px] font-sans tracking-[0.2em] uppercase text-[#e8cf9a]/55 mt-4 [writing-mode:vertical-rl] rotate-180">
          Conceptual Mockup for Presentation Purposes Only
        </span>
      </aside>

      {/* MOBILE & TABLET COMPACT PILL (Top Right Floating Badge — fades in after hero) */}
      <div
        className={`xl:hidden fixed top-20 right-4 z-40 bg-[#0a0806]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#c9a45c]/35 shadow-xl flex items-center gap-2 transition-all duration-500 ${
          hasScrolled ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        role="complementary"
        aria-label="Story timeline"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#c9a45c] animate-pulse" />
        <span className="font-mono text-xs text-[#c9a45c] font-medium tracking-wider">
          {activeMilestone?.time ?? "19:00"}
        </span>
        <span className="text-[#c9a45c]/40 font-light text-xs">·</span>
        <span className="font-sans text-[10px] uppercase tracking-wider text-[#f3ead8]/85">
          {activeMilestone?.label ?? "Arrival"}
        </span>
      </div>
    </>
  );
}
