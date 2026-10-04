"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { IMAGES } from "@/data/images";
import { Button } from "@/components/ui/Button";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";

interface HeroSectionProps {
  onReserveClick: () => void;
  isReady?: boolean;
}

export function HeroSection({ onReserveClick, isReady = true }: HeroSectionProps) {
  const { scrollTo } = useSmoothScroll();
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. CANDLELIGHT EFFECT: Smooth lerp or Lissajous touch loop
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const touchDevice = window.matchMedia("(pointer: coarse)").matches;

    let mouseX = window.innerWidth * 0.5;
    let mouseY = window.innerHeight * 0.45;
    let currentX = mouseX;
    let currentY = mouseY;
    let rafId: number;
    const startTime = performance.now();

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    if (!touchDevice) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animateCandle = (time: number) => {
      if (touchDevice) {
        // Slow organic figure-eight drift on mobile/touch screens
        const elapsed = (time - startTime) * 0.0008;
        const rect = heroEl.getBoundingClientRect();
        currentX = rect.width * (0.5 + 0.22 * Math.sin(elapsed));
        currentY = rect.height * (0.45 + 0.16 * Math.sin(elapsed * 1.5));
      } else {
        currentX = lerp(currentX, mouseX, 0.08);
        currentY = lerp(currentY, mouseY, 0.08);
      }

      heroEl.style.setProperty("--candle-x", `${currentX}px`);
      heroEl.style.setProperty("--candle-y", `${currentY}px`);

      rafId = requestAnimationFrame(animateCandle);
    };

    rafId = requestAnimationFrame(animateCandle);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // 2. FLOATING GOLD DUST PARTICLES (Canvas throttled with IntersectionObserver)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isVisible = true;
    let animId: number;

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // 38 delicate champagne dust particles
    const particles = Array.from({ length: 38 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      glow: Math.random() * 4 + 2,
    }));

    const renderDust = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 207, 154, ${p.opacity})`;
        ctx.shadowColor = "#c9a45c";
        ctx.shadowBlur = p.glow;
        ctx.fill();
      });

      animId = requestAnimationFrame(renderDust);
    };

    // Pause canvas when hero scrolls out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        isVisible = entry.isIntersecting;
        if (isVisible) {
          animId = requestAnimationFrame(renderDust);
        } else {
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);

    renderDust();

    return () => {
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  // 3. MASKED LINE-BY-LINE TYPOGRAPHY ENTRANCE
  useEffect(() => {
    if (!isReady) return;
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      // Headline lines reveal from bottom of their overflow mask
      tl.from(".hero-line-inner", {
        yPercent: 120,
        opacity: 0,
        stagger: 0.14,
        duration: 1.4,
        ease: "power4.out",
      });

      tl.from(
        sublineRef.current,
        {
          y: 25,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
        },
        "-=0.8"
      );

      tl.from(
        ctaRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 1.0,
          ease: "power3.out",
        },
        "-=0.7"
      );
    }, heroEl);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0a0806] select-none"
      style={
        {
          "--candle-x": "50%",
          "--candle-y": "45%",
        } as React.CSSProperties
      }
    >
      {/* 1. BASE BACKGROUND IMAGE (Dimmed Atmospheric State) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={IMAGES.hero.file}
          alt={IMAGES.hero.alt}
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-center filter brightness-[0.38] contrast-[1.12] scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Deep noir gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-[#0a0806]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0806]/85 via-transparent to-[#0a0806]/85" />
      </div>

      {/* 2. CANDLELIGHT ILLUMINATION LAYER (Masked brightened photo revealed by cursor radial) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none transition-opacity duration-500"
        style={{
          maskImage:
            "radial-gradient(circle 380px at var(--candle-x) var(--candle-y), black 15%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(circle 380px at var(--candle-x) var(--candle-y), black 15%, transparent 75%)",
        }}
      >
        <Image
          src={IMAGES.hero.file}
          alt=""
          fill
          sizes="100vw"
          quality={85}
          className="object-cover object-center filter brightness-[1.05] contrast-[1.18] saturate-[1.25] scale-105"
        />
      </div>

      {/* 3. WARM CANDLELIGHT RADIAL LIGHT GLOW */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle 460px at var(--candle-x) var(--candle-y), rgba(232, 207, 154, 0.28) 0%, rgba(201, 164, 92, 0.12) 42%, transparent 72%)",
        }}
      />

      {/* 4. CANVAS FLOATING GOLD DUST */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 z-[3] pointer-events-none opacity-80"
      />

      {/* 5. TOP SPACING */}
      <div className="h-20 sm:h-28 md:h-36" />

      {/* 6. CENTER EDITORIAL HEADLINE STAGE */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-20 my-auto py-6 sm:py-12">
        <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
          {/* Milestone Tag */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="font-mono text-[11px] sm:text-xs text-[#c9a45c] tracking-widest uppercase">
              19:00 · Arrival
            </span>
            <span className="w-8 h-[1px] bg-[#c9a45c]/50" />
            <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#e8cf9a]/70">
              Waldorf Astoria Berlin
            </span>
          </div>

          {/* Masked Line-by-Line Headline */}
          <h1
            ref={headlineRef}
            className="font-serif font-light text-[2.75rem] sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.5rem] tracking-tight leading-[0.96] sm:leading-[0.92] text-[#f3ead8]"
          >
            <span className="block overflow-hidden pb-1">
              <span className="hero-line-inner block">Where Berlin</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-line-inner block">
                comes <em className="italic font-serif font-normal text-[#e8cf9a]">alive</em>
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-line-inner block">after dark.</span>
            </span>
          </h1>

          {/* Subline */}
          <p
            ref={sublineRef}
            className="mt-8 font-sans text-xs sm:text-sm md:text-base uppercase tracking-[0.24em] text-[#f3ead8]/75 max-w-2xl leading-relaxed"
          >
            Signature cocktails · Classics · DJ nights · Waldorf Astoria Berlin
          </p>

          {/* Dual CTAs */}
          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-5">
            <Button
              variant="primary"
              onClick={onReserveClick}
              cursorLabel="Book"
              className="px-8 py-4 text-xs"
            >
              Reserve a Table
            </Button>
            <Button
              variant="secondary"
              href="#cocktails"
              cursorLabel="Explore"
              className="px-8 py-4 text-xs"
            >
              View Cocktails
            </Button>
          </div>
        </div>
      </div>

      {/* 7. BOTTOM FOOTER BAR (Scroll Cue & Timeline Indicator) */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-20 pb-10 flex items-end justify-between border-t border-[#c9a45c]/15 pt-6">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#c9a45c] animate-ping" />
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#e8cf9a]">
            Lounge open from dusk until last call
          </span>
        </div>

        {/* Scroll Cue */}
        <button
          onClick={() => scrollTo("#story")}
          className="group flex items-center gap-3 text-right focus:outline-none"
          aria-label="Scroll to discover the story"
        >
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#f3ead8]/50 group-hover:text-[#e8cf9a] transition-colors hidden sm:inline">
            Scroll to begin the night
          </span>
          <div className="w-6 h-10 rounded-full border border-[#c9a45c]/40 flex items-start justify-center p-1.5 group-hover:border-[#e8cf9a] transition-colors">
            <div className="w-1 h-2 rounded-full bg-[#c9a45c] animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
