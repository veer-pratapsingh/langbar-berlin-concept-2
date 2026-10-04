"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
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
    if (typeof window !== "undefined") {
      const heroImg = new window.Image();
      heroImg.src = "/images/hero-bar-arrival.jpg";
      if ("decode" in heroImg) {
        heroImg.decode().catch(() => {});
      }
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
      gsap.set(logoRef.current, { opacity: 0, scale: 0.85, y: 15 });
      gsap.set(textRef.current, { opacity: 0, letterSpacing: "0.55em", y: 15 });
      gsap.set(sublineRef.current, { opacity: 0, y: 10 });

      // 2. Gold line draws across
      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 0.65,
        ease: "power3.inOut",
      });

      // 2.5. Official logo crest reveals
      tl.to(
        logoRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.3"
      );

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
        "-=0.4"
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

      // 5. Fade out text, logo & line
      tl.to(
        [logoRef.current, textRef.current, sublineRef.current, lineRef.current],
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
        {/* Official Brand Logo Crest */}
        <div ref={logoRef} className="mb-5 drop-shadow-[0_0_20px_rgba(201,164,92,0.45)]">
          <Image
            src="/images/langbar-logo-512.png"
            alt="Lang Bar Berlin Official Crest"
            width={72}
            height={72}
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
            priority
          />
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
