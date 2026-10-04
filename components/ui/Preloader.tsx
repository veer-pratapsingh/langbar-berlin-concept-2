"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Check if ?preloader=off is present in URL
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("preloader") === "off") {
      const timer = setTimeout(() => {
        setIsActive(false);
        onComplete();
      }, 0);
      return () => clearTimeout(timer);
    }

    // Pre-decode hero image so it's instantly crisp when curtains open
    const heroImg = new Image();
    heroImg.src = "/images/hero-bar-arrival.jpg";
    if ("decode" in heroImg) {
      heroImg.decode().catch(() => {});
    }

    const containerEl = containerRef.current;
    if (!containerEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsActive(false);
          onComplete();
        },
      });

      // 1. Initial states
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "center center" });
      gsap.set(textRef.current, { opacity: 0, letterSpacing: "0.55em", y: 15 });
      gsap.set(sublineRef.current, { opacity: 0, y: 10 });

      // 2. Gold line draws across
      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 0.65,
        ease: "power3.inOut",
      });

      // 3. "LANG BAR" fades up with tightening letter-spacing
      tl.to(
        textRef.current,
        {
          opacity: 1,
          letterSpacing: "0.22em",
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Subline reveals softly
      tl.to(
        sublineRef.current,
        {
          opacity: 0.8,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // 4. Brief pause for elegance (total time stays under 2.2s)
      tl.to({}, { duration: 0.25 });

      // 5. Fade out text & line
      tl.to(
        [textRef.current, sublineRef.current, lineRef.current],
        {
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        }
      );

      // 6. Vertical curtain split wipe revealing the hero
      tl.to(
        curtainTopRef.current,
        {
          yPercent: -100,
          duration: 0.75,
          ease: "power4.inOut",
        },
        "-=0.1"
      );
      tl.to(
        curtainBottomRef.current,
        {
          yPercent: 100,
          duration: 0.75,
          ease: "power4.inOut",
        },
        "<"
      );
    }, containerEl);

    return () => ctx.revert();
  }, [onComplete]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] pointer-events-auto select-none overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Loading Lang Bar Berlin experience"
    >
      {/* Top Curtain */}
      <div
        ref={curtainTopRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0a0806] border-b border-[#c9a45c]/20"
      />
      {/* Bottom Curtain */}
      <div
        ref={curtainBottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0a0806] border-t border-[#c9a45c]/20"
      />

      {/* Center Content Stage */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6">
        {/* Monogram or Stepped Art Deco Icon */}
        <div className="mb-6 opacity-80">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="0.5" y="0.5" width="31" height="31" stroke="#c9a45c" strokeWidth="0.75" />
            <path d="M4 4L8 8M28 4L24 8M4 28L8 24M28 28L24 24" stroke="#c9a45c" strokeWidth="0.5" />
            <circle cx="16" cy="16" r="3" fill="#e8cf9a" />
          </svg>
        </div>

        {/* Brand Wordmark */}
        <h1
          ref={textRef}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.22em] text-[#f3ead8]"
        >
          Lang Bar
        </h1>

        {/* Gold Hairline Divider */}
        <div
          ref={lineRef}
          className="w-48 sm:w-64 h-[1px] bg-gradient-to-r from-transparent via-[#c9a45c] to-transparent my-4"
        />

        {/* Subtitle */}
        <p
          ref={sublineRef}
          className="font-sans text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#e8cf9a]/75"
        >
          Waldorf Astoria Berlin
        </p>
      </div>
    </div>
  );
}
