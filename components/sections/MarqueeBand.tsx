"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface MarqueeBandProps {
  reverse?: boolean;
  className?: string;
}

export function MarqueeBand({ reverse = false, className = "" }: MarqueeBandProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const items = [
    "Signature Cocktails",
    "Timeless Classics",
    "Weekend DJ Nights",
    "Bespoke Private Events",
    "Waldorf Astoria Berlin",
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let xPos = 0;
    const baseSpeed = reverse ? -0.85 : 0.85;
    let velocityMultiplier = 1;

    let lastScrollY = window.scrollY;
    let lastTime = performance.now();

    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const currentY = window.scrollY;
      const v = (currentY - lastScrollY) / dt;

      // Boost and react to scroll velocity & direction
      velocityMultiplier = 1 + Math.min(Math.abs(v) * 2.5, 4.5) * (v < 0 ? -1 : 1);

      lastScrollY = currentY;
      lastTime = now;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    const tickerFunc = () => {
      // Smoothly interpolate back to 1
      velocityMultiplier = gsap.utils.interpolate(velocityMultiplier, 1, 0.06);
      xPos += baseSpeed * velocityMultiplier;

      const singleWidth = track.scrollWidth / 2;
      if (Math.abs(xPos) >= singleWidth) {
        xPos = 0;
      }

      track.style.transform = `translate3d(${xPos}px, 0, 0)`;
    };

    gsap.ticker.add(tickerFunc);

    return () => {
      window.removeEventListener("scroll", onScroll);
      gsap.ticker.remove(tickerFunc);
    };
  }, [reverse]);

  const renderOrnaments = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="inline-block mx-6 opacity-60">
      <circle cx="12" cy="12" r="3" fill="#c9a45c" />
      <path d="M12 2L12 6M12 18L12 22M2 12L6 12M18 12L22 12" stroke="#c9a45c" strokeWidth="1" />
      <path d="M5 5L8 8M16 16L19 19M19 5L16 8M8 16L5 19" stroke="#c9a45c" strokeWidth="0.75" />
    </svg>
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden border-y border-[#c9a45c]/20 bg-[#0a0806]/90 py-3.5 select-none z-20 ${className}`}
      aria-hidden="true"
    >
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        {[...items, ...items, ...items, ...items].map((text, i) => (
          <div key={i} className="inline-flex items-center">
            <span className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#e8cf9a]/90 font-medium">
              {text}
            </span>
            {renderOrnaments()}
          </div>
        ))}
      </div>
    </div>
  );
}
