"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";

interface SmoothScrollContextType {
  getLenis: () => Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: { offset?: number; duration?: number }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  getLenis: () => null,
  scrollTo: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register GSAP plugins
    registerGSAP();

    // Respect user's reduced-motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      ScrollTrigger.config({ limitCallbacks: true });
      return;
    }

    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      // Update global scroll progress bar
      if (progressBarRef.current) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const progress = total > 0 ? (e.scroll / total) * 100 : 0;
        progressBarRef.current.style.width = `${Math.min(100, Math.max(0, progress))}%`;
      }
    });

    // Drive Lenis from GSAP's internal ticker for synchronized 60-120fps motion
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // Lighting choreographies throughout the night via CSS variable tweening
    const sections = [
      { id: "#hero", bg: "#0a0806", glow: "rgba(201, 164, 92, 0.16)" },
      { id: "#story", bg: "#0d0a07", glow: "rgba(201, 164, 92, 0.14)" },
      { id: "#cocktails", bg: "#1a080f", glow: "rgba(180, 42, 68, 0.18)" }, // Velvet Burgundy
      { id: "#gallery", bg: "#100c0e", glow: "rgba(201, 164, 92, 0.12)" },
      { id: "#dj-nights", bg: "#050403", glow: "rgba(220, 180, 70, 0.22)" }, // Club Black & Gold
      { id: "#private-events", bg: "#120a0e", glow: "rgba(232, 207, 154, 0.14)" },
      { id: "#visit", bg: "#0b0806", glow: "rgba(201, 164, 92, 0.15)" },
    ];

    const triggers: ScrollTrigger[] = [];

    sections.forEach((sec) => {
      const el = document.querySelector(sec.id);
      if (el) {
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            gsap.to(document.body, {
              backgroundColor: sec.bg,
              "--glow-color": sec.glow,
              duration: 1.2,
              ease: "power2.out",
            });
          },
          onEnterBack: () => {
            gsap.to(document.body, {
              backgroundColor: sec.bg,
              "--glow-color": sec.glow,
              duration: 1.2,
              ease: "power2.out",
            });
          },
        });
        triggers.push(st);
      }
    });

    // Cleanup on unmount
    return () => {
      triggers.forEach((t) => t.kill());
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (target: string | HTMLElement | number, options?: { offset?: number; duration?: number }) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? -80,
        duration: options?.duration ?? 1.4,
      });
    } else {
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else {
        const el = typeof target === "string" ? document.querySelector(target) : target;
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  const getLenis = () => lenisRef.current;

  return (
    <SmoothScrollContext.Provider value={{ getLenis, scrollTo }}>
      {/* 1px Gold Scroll Progress Hairline at the top */}
      <div
        ref={progressBarRef}
        aria-hidden="true"
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#c9a45c] to-[#e8cf9a] z-[9999] pointer-events-none transition-none shadow-[0_0_8px_rgba(201,164,92,0.8)]"
        style={{ width: "0%" }}
      />
      {children}
    </SmoothScrollContext.Provider>
  );
}
