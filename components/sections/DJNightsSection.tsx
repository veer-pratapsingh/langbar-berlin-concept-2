"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { getUpcomingDJNights } from "@/data/site";
import { IMAGES } from "@/data/images";
import { MarqueeBand } from "./MarqueeBand";
import { Button } from "@/components/ui/Button";

interface DJNightsSectionProps {
  onReserveClick: () => void;
}

export function DJNightsSection({ onReserveClick }: DJNightsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineFillRef = useRef<HTMLDivElement>(null);
  const upcomingEvents = getUpcomingDJNights(6);

  useEffect(() => {
    const section = sectionRef.current;
    const headlineFill = headlineFillRef.current;
    if (!section || !headlineFill) return;

    const ctx = gsap.context(() => {
      // Outlined type fills with gold as the user scrolls through the section
      gsap.fromTo(
        headlineFill,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            end: "center center",
            scrub: 0.8,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="dj-nights"
      ref={sectionRef}
      className="relative min-h-screen py-28 md:py-40 bg-[#050403] text-[#f3ead8] overflow-hidden"
    >
      {/* Slow Neon Pulse Background Light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#c9a45c]/8 rounded-full blur-[160px] pointer-events-none animate-pulse" />

      {/* Counter-Direction Reverse Marquee */}
      <div className="mb-16">
        <MarqueeBand reverse={true} />
      </div>

      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 relative z-10">
        {/* Milestone Sub-heading & Equalizer */}
        <div className="flex items-center justify-between border-b border-[#c9a45c]/20 pb-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#c9a45c] tracking-widest uppercase">
              23:00 · The Night Turns
            </span>
            <span className="w-12 h-[1px] bg-[#c9a45c]/40" />
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#e8cf9a]/70">
              Weekend Resident Sessions
            </span>
          </div>

          {/* Equalizer Audio Visualizer Bars */}
          <div className="flex items-end gap-1 h-5" aria-hidden="true">
            <span className="w-1 bg-[#c9a45c] rounded-xs animate-[bounce_1.1s_infinite_ease-in-out_0.1s] h-3" />
            <span className="w-1 bg-[#e8cf9a] rounded-xs animate-[bounce_0.8s_infinite_ease-in-out_0.3s] h-5" />
            <span className="w-1 bg-[#c9a45c] rounded-xs animate-[bounce_1.4s_infinite_ease-in-out_0.5s] h-4" />
            <span className="w-1 bg-[#e8cf9a] rounded-xs animate-[bounce_0.9s_infinite_ease-in-out_0.2s] h-2" />
            <span className="w-1 bg-[#c9a45c] rounded-xs animate-[bounce_1.2s_infinite_ease-in-out_0.4s] h-5" />
          </div>
        </div>

        {/* GIANT OUTLINED TYPE THAT FILLS WITH SOLID GOLD ON SCROLL */}
        <div className="relative my-8 select-none overflow-hidden">
          {/* Base Outlined Layer */}
          <div
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] 2xl:text-9xl font-light tracking-tight text-transparent leading-[0.9] opacity-40"
            style={{
              WebkitTextStroke: "1px #c9a45c",
            }}
          >
            FRIDAY &amp; SATURDAY
          </div>

          {/* Filled Layer (Clipped and revealed on scroll) */}
          <div
            ref={headlineFillRef}
            aria-hidden="true"
            className="absolute inset-0 font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] 2xl:text-9xl font-light tracking-tight text-[#e8cf9a] leading-[0.9] pointer-events-none drop-shadow-[0_0_35px_rgba(201,164,92,0.45)]"
          >
            FRIDAY &amp; SATURDAY
          </div>
        </div>

        <p className="mt-6 font-sans text-xs sm:text-sm uppercase tracking-[0.22em] text-[#f3ead8]/70 max-w-xl leading-relaxed">
          When the evening deepens, vinyl grooves, deep house and live brass awaken the room. Every weekend from 21:30.
        </p>

        {/* Grid: Authentic DJ visuals + Dynamic Dates Schedule */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT: Asymmetric Club Visuals (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative w-full h-80 sm:h-96 rounded-lg overflow-hidden border border-[#c9a45c]/30 shadow-2xl group">
              <Image
                src={IMAGES.djSax.file}
                alt={IMAGES.djSax.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-[center_25%] filter contrast-[1.15] brightness-[0.9] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050403] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#c9a45c] block">
                    Live Elements
                  </span>
                  <span className="font-serif text-lg text-[#f3ead8]">
                    Saxophone &amp; Live Brass
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#c9a45c]/20 border border-[#c9a45c]/40 text-[9px] font-sans uppercase tracking-widest text-[#e8cf9a]">
                  Fridays &amp; Saturdays
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-44 rounded-md overflow-hidden border border-[#c9a45c]/20">
                <Image
                  src={IMAGES.djCrowd.file}
                  alt={IMAGES.djCrowd.alt}
                  fill
                  sizes="240px"
                  className="object-cover object-center filter contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-[#050403]/40" />
              </div>
              <div className="relative h-44 rounded-md overflow-hidden border border-[#c9a45c]/20">
                <Image
                  src={IMAGES.djRedCrowd.file}
                  alt={IMAGES.djRedCrowd.alt}
                  fill
                  sizes="240px"
                  className="object-cover object-center filter contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-[#050403]/40" />
              </div>
            </div>
          </div>

          {/* RIGHT: Dynamic Upcoming Dates (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0a0807]/80 border border-[#c9a45c]/25 rounded-lg p-6 sm:p-10 backdrop-blur-md">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#c9a45c]/15">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#f3ead8]">
                  Upcoming Weekend Sessions
                </h3>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#e8cf9a]/70 block mt-1">
                  Computed live from current calendar date
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#c9a45c] uppercase">
                21:30 — LATE
              </span>
            </div>

            {/* List of 6 calculated weekend dates */}
            <div className="divide-y divide-[#c9a45c]/10">
              {upcomingEvents.map((evt, idx) => (
                <div
                  key={evt.fullDate + idx}
                  className="py-4.5 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-[#c9a45c]/5 px-3 rounded transition-colors"
                >
                  <div className="flex items-center gap-5">
                    {/* Calendar Badge */}
                    <div className="w-14 text-center border-r border-[#c9a45c]/20 pr-4">
                      <span className="font-mono text-base font-semibold text-[#e8cf9a] block">
                        {evt.date}
                      </span>
                      <span className="font-sans text-[9px] uppercase tracking-wider text-[#f3ead8]/50 block">
                        {evt.dayName}
                      </span>
                    </div>

                    {/* Artist & Genre */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-lg sm:text-xl text-[#f3ead8] group-hover:text-[#e8cf9a] transition-colors">
                          {evt.artist}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c9a45c]/60" />
                        <span className="font-sans text-[10px] uppercase tracking-wider text-[#c9a45c]">
                          TBA
                        </span>
                      </div>
                      <span className="font-sans text-xs text-[#f3ead8]/50 block mt-0.5">
                        {evt.genre} · {evt.timeSlot}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    onClick={onReserveClick}
                    className="py-2 px-4 text-[10px] self-start sm:self-center"
                    cursorLabel="Book"
                  >
                    Reserve Table
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-[#c9a45c]/15 text-center">
              <span className="font-sans text-[10px] uppercase tracking-wider text-[#f3ead8]/40">
                For DJ line-up updates, follow{" "}
                <a
                  href="https://www.instagram.com/langbar_berlin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e8cf9a] underline hover:text-[#f3ead8]"
                >
                  @langbar_berlin
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
