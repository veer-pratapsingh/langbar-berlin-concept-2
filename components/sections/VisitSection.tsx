"use client";

import React from "react";
import Image from "next/image";
import { SITE_CONFIG } from "@/data/site";
import { IMAGES } from "@/data/images";
import { Button } from "@/components/ui/Button";

interface VisitSectionProps {
  onReserveClick: () => void;
}

export function VisitSection({ onReserveClick }: VisitSectionProps) {
  return (
    <section
      id="visit"
      className="relative min-h-screen py-28 md:py-40 bg-[#0b0806] text-[#f3ead8] overflow-hidden"
    >
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 relative z-10">
        {/* Milestone Sub-heading */}
        <div className="flex items-center gap-3 mb-16 border-b border-[#c9a45c]/20 pb-6">
          <span className="font-mono text-xs text-[#c9a45c] tracking-widest uppercase">
            01:00 · Last Call
          </span>
          <span className="w-12 h-[1px] bg-[#c9a45c]/40" />
          <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#e8cf9a]/70">
            Location &amp; Visit Details
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Visit Cards & Hours (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-serif text-4xl sm:text-6xl font-light text-[#f3ead8] leading-[1.05]">
              Arrive at dusk, linger until <span className="italic font-normal text-[#e8cf9a]">last call</span>.
            </h2>

            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#f3ead8]/75 max-w-xl">
              Located on the elevated first floor of Waldorf Astoria Berlin, overlooking the nocturnal hum of City West and the historic Kaiser Wilhelm Memorial Church.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {/* Address Card */}
              <div className="p-6 bg-[#120e0b] border border-[#c9a45c]/25 rounded-lg space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#c9a45c] block">
                  Address
                </span>
                <p className="font-serif text-xl text-[#f3ead8]">Waldorf Astoria Berlin</p>
                <p className="font-sans text-xs text-[#f3ead8]/70">1st Floor Lounge</p>
                <p className="font-sans text-xs text-[#f3ead8]/70">
                  {SITE_CONFIG.address}
                </p>
                <div className="pt-2">
                  <a
                    href={SITE_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider text-[#e8cf9a] hover:text-[#f3ead8] underline underline-offset-4"
                  >
                    <span>Open in Google Maps</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>

              {/* Hours Card // PLACEHOLDER */}
              <div className="p-6 bg-[#120e0b] border border-[#c9a45c]/25 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#c9a45c]">
                    Operating Hours
                  </span>
                  <span className="text-[9px] font-sans uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#c9a45c]/10 text-[#e8cf9a] border border-[#c9a45c]/20">
                    To be confirmed
                  </span>
                </div>
                <p className="font-serif text-xl text-[#f3ead8]">Evening Lounge</p>
                <p className="font-sans text-xs text-[#f3ead8]/70">
                  {SITE_CONFIG.hoursPlaceholder}
                </p>
                <p className="font-sans text-[11px] text-[#c9a45c]/80 pt-1 italic">
                  {"// " + SITE_CONFIG.openingHoursNotice}
                </p>
              </div>
            </div>

            {/* Dress code & Entry note */}
            <div className="p-5 bg-[#0a0806] border-l-2 border-[#c9a45c] text-xs font-sans text-[#f3ead8]/75 space-y-1">
              <span className="font-medium text-[#e8cf9a] uppercase tracking-wider block">
                Dress Code &amp; House Policy // PLACEHOLDER
              </span>
              <p>{SITE_CONFIG.dressCode}</p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="primary" onClick={onReserveClick} cursorLabel="Book">
                Reserve Table
              </Button>
              <Button
                variant="secondary"
                href={SITE_CONFIG.googleMapsUrl}
                cursorLabel="Maps"
              >
                Directions
              </Button>
            </div>
          </div>

          {/* RIGHT: Stylized Dark Art-Deco Map Card + Authentic Lounge Image (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Custom Stylized Dark Art-Deco Map Card (No heavy external script) */}
            <div className="relative w-full h-64 rounded-lg overflow-hidden border border-[#c9a45c]/35 bg-[#0a0806] p-6 flex flex-col justify-between shadow-2xl">
              {/* Art Deco Corner Brackets */}
              <span className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-[#c9a45c]/70 pointer-events-none" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-[#c9a45c]/70 pointer-events-none" />
              <span className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-[#c9a45c]/70 pointer-events-none" />
              <span className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-[#c9a45c]/70 pointer-events-none" />

              {/* Art Deco Coordinate Grid & Roads */}
              <svg
                viewBox="0 0 400 240"
                className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
                fill="none"
              >
                <defs>
                  <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" stroke="#c9a45c" strokeWidth="0.5" strokeOpacity="0.25" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mapGrid)" />
                {/* Stylized Charlottenburg Arteries */}
                <path d="M -20 180 Q 150 140 420 80" stroke="#c9a45c" strokeWidth="1.5" strokeOpacity="0.6" />
                <path d="M 80 -20 L 260 260" stroke="#c9a45c" strokeWidth="1.2" strokeOpacity="0.5" />
                <path d="M 180 -10 Q 240 120 380 250" stroke="#e8cf9a" strokeWidth="0.8" strokeOpacity="0.4" />
                {/* Kurfürstendamm label */}
                <text x="60" y="145" fill="#e8cf9a" fontSize="8" letterSpacing="2" fontFamily="sans-serif">
                  KURFÜRSTENDAMM
                </text>
                <text x="220" y="50" fill="#e8cf9a" fontSize="8" letterSpacing="2" fontFamily="sans-serif">
                  HARDENBERGSTR.
                </text>
              </svg>

              {/* Pulsing Pin at Waldorf Astoria Berlin */}
              <div className="relative z-10 flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <span className="w-5 h-5 rounded-full bg-[#c9a45c]/30 animate-ping absolute" />
                  <span className="w-3 h-3 rounded-full bg-[#e8cf9a] shadow-[0_0_12px_#c9a45c]" />
                </div>
                <div>
                  <span className="font-serif text-base text-[#f3ead8] block">
                    Lang Bar Berlin
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#c9a45c]">
                    Waldorf Astoria · 1st Floor
                  </span>
                </div>
              </div>

              {/* Bottom Street Coordinates */}
              <div className="relative z-10 flex justify-between items-end text-[9px] font-mono text-[#f3ead8]/50 uppercase tracking-widest">
                <span>52°30&apos;22.8&quot;N 13°19&apos;56.4&quot;E</span>
                <span className="text-[#e8cf9a]">Berlin Charlottenburg</span>
              </div>
            </div>

            {/* Authentic Late Night Lounge Vignette */}
            <div className="relative w-full h-72 rounded-lg overflow-hidden border border-[#c9a45c]/25 shadow-xl group">
              <Image
                src={IMAGES.visitLounge.file}
                alt={IMAGES.visitLounge.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-center filter contrast-[1.08] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0806] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-sans text-[9px] uppercase tracking-[0.24em] text-[#e8cf9a]">
                  Last Call Ambiance
                </span>
                <span className="font-serif text-lg text-[#f3ead8] block">
                  Intimate Booths &amp; Low Candlelight
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
