"use client";

import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    // Only enable on desktop fine-pointer devices and when reduced motion is off
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || reducedMotion) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Inspect target element for cursor directives
      const target = e.target as HTMLElement | null;
      if (target) {
        const cursorDirective = target.closest("[data-cursor]")?.getAttribute("data-cursor");
        if (cursorDirective) {
          setCursorText(cursorDirective.toUpperCase());
          setIsHoveringInteractive(true);
        } else {
          const isButtonOrLink = !!target.closest("button, a, input, select, textarea");
          setCursorText("");
          setIsHoveringInteractive(isButtonOrLink);
        }
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth lerp loop
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const render = () => {
      currentX = lerp(currentX, mouseX, 0.2);
      currentY = lerp(currentY, mouseY, 0.2);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 will-change-transform hidden md:block"
    >
      <div
        ref={dotRef}
        className={`flex items-center justify-center rounded-full transition-all duration-300 ease-out border border-[#c9a45c]/50 ${
          cursorText
            ? "w-14 h-14 bg-[#0a0806]/85 backdrop-blur-sm scale-100 shadow-[0_0_20px_rgba(201,164,92,0.4)]"
            : isHoveringInteractive
            ? "w-8 h-8 bg-[#c9a45c]/25 backdrop-blur-xs scale-100"
            : "w-3 h-3 bg-[#e8cf9a] scale-100 shadow-[0_0_10px_#c9a45c]"
        }`}
      >
        {cursorText && (
          <span
            ref={labelRef}
            className="font-sans text-[9px] uppercase tracking-[0.2em] font-medium text-[#e8cf9a] select-none"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
