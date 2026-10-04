"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { IMAGES } from "@/data/images";

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageArchRef1 = useRef<HTMLDivElement>(null);
  const imageArchRef2 = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. WORD-BY-WORD SCROLL LIGHT-UP ANIMATION
      const words = gsap.utils.toArray<HTMLElement>(".story-word");
      if (words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
              trigger: textContainerRef.current,
              start: "top 75%",
              end: "bottom 45%",
              scrub: 0.8,
            },
          }
        );
      }

      // 2. PARALLAX DRIFT FOR THE TWO OVERLAPPING ARCH FRAMES
      if (imageArchRef1.current) {
        gsap.to(imageArchRef1.current, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (imageArchRef2.current) {
        gsap.to(imageArchRef2.current, {
          y: -120, // Moves faster for layered depth
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.6,
          },
        });
      }

      // 3. ANIMATED COUNTER (0 to 2)
      if (counterRef.current) {
        const counterObj = { val: 0 };
        ScrollTrigger.create({
          trigger: counterRef.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(counterObj, {
              val: 2,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                if (counterRef.current) {
                  counterRef.current.innerText = Math.round(counterObj.val).toString();
                }
              },
            });
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Story paragraph content tokenized for word lighting
  const storySentences = [
    {
      text: "Perched on the first floor of the Waldorf Astoria Berlin, Lang Bar is an intimate salon conceived for conversation, craft, and nocturnal elegance.",
      highlightWords: ["Waldorf", "Astoria", "Berlin,", "intimate", "sanctuary", "nocturnal", "elegance."],
    },
    {
      text: "Beneath faceted geometric gilded ceilings, bespoke crystal decanters and curved velvet seating frame an evening of quiet discovery.",
      highlightWords: ["gilded", "ceilings,", "crystal", "decanters", "velvet"],
    },
    {
      text: "From the measured precision of a twilight aperitif to the late-night resonance of weekend vinyl, every hour unfolds with deliberate sophistication.",
      highlightWords: ["measured", "precision", "weekend", "deliberate", "sophistication."],
    },
  ];

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative min-h-screen py-28 md:py-40 bg-[#0d0a07] text-[#f3ead8] overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#c9a45c]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20">
        {/* Milestone Sub-heading */}
        <div className="flex items-center gap-3 mb-16">
          <span className="font-mono text-xs text-[#c9a45c] tracking-widest uppercase">
            20:00 · The Room
          </span>
          <span className="w-12 h-[1px] bg-[#c9a45c]/40" />
          <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#e8cf9a]/70">
            Heritage & Salon Atmosphere
          </span>
        </div>

        {/* Split Grid: Narrative Text + Overlapping Parallax Arch Frames */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Editorial Text & Facts (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light leading-[1.08] text-[#f3ead8] mb-10">
              A private salon where <span className="italic font-normal text-[#e8cf9a]">time</span> dissolves into golden light.
            </h2>

            {/* Word-by-Word Scroll Light-up Paragraph */}
            <div
              ref={textContainerRef}
              className="font-serif text-lg sm:text-2xl md:text-3xl font-light leading-relaxed text-[#f3ead8] max-w-2xl space-y-5"
            >
              {storySentences.map((sentence, sIdx) => (
                <p key={sIdx} className="leading-relaxed">
                  {sentence.text.split(" ").map((word, wIdx) => {
                    const isHighlight = sentence.highlightWords.includes(word);
                    return (
                      <span
                        key={wIdx}
                        className={`story-word inline-block mr-1.5 transition-colors duration-200 ${
                          isHighlight ? "text-[#e8cf9a] font-medium" : "text-[#f3ead8]"
                        }`}
                      >
                        {word}
                      </span>
                    );
                  })}
                </p>
              ))}
            </div>

            {/* Fact Row (3 Columns) */}
            <div className="mt-16 pt-10 border-t border-[#c9a45c]/20 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Fact 1: DJ Nights Counter */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span
                    ref={counterRef}
                    className="font-serif text-5xl sm:text-6xl text-[#e8cf9a] font-light"
                  >
                    0
                  </span>
                  <span className="font-sans text-xs uppercase tracking-widest text-[#c9a45c]">
                    Nights / Wk
                  </span>
                </div>
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#f3ead8]/60 mt-1">
                  Friday & Saturday live DJ sessions
                </span>
              </div>

              {/* Fact 2: Cocktails */}
              <div className="flex flex-col">
                <span className="font-serif text-3xl sm:text-4xl text-[#f3ead8] font-light pt-2">
                  Artisanal
                </span>
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#f3ead8]/60 mt-1">
                  Signature cocktails & classics
                </span>
              </div>

              {/* Fact 3: Events */}
              <div className="flex flex-col">
                <span className="font-serif text-3xl sm:text-4xl text-[#f3ead8] font-light pt-2">
                  Bespoke
                </span>
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#f3ead8]/60 mt-1">
                  Private events & celebrations
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Overlapping Art-Deco Arch Images with Parallax (5 Cols) */}
          <div className="lg:col-span-5 relative min-h-[500px] sm:min-h-[640px] flex items-center justify-center">
            {/* Primary Arch Frame (Decanters) */}
            <div
              ref={imageArchRef1}
              className="relative w-64 sm:w-80 h-[380px] sm:h-[480px] rounded-t-full overflow-hidden border border-[#c9a45c]/35 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 will-change-transform group"
            >
              <Image
                src={IMAGES.storyPrimary.file}
                alt={IMAGES.storyPrimary.alt}
                fill
                sizes="(max-width: 768px) 260px, 320px"
                className="object-cover object-[center_35%] filter contrast-[1.08] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="font-sans text-[9px] uppercase tracking-[0.24em] text-[#e8cf9a]">
                  Crystal Heritage
                </span>
              </div>
            </div>

            {/* Secondary Overlapping Arch Frame (Velvet Lounge Chair) */}
            <div
              ref={imageArchRef2}
              className="absolute -bottom-8 -right-2 sm:-right-4 lg:right-0 xl:right-2 w-48 sm:w-60 h-[280px] sm:h-[340px] rounded-t-full overflow-hidden border border-[#c9a45c]/45 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-20 will-change-transform group"
            >
              <Image
                src={IMAGES.storySecondary.file}
                alt={IMAGES.storySecondary.alt}
                fill
                sizes="(max-width: 768px) 190px, 240px"
                className="object-cover object-center filter contrast-[1.1] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="font-sans text-[9px] uppercase tracking-[0.24em] text-[#e8cf9a]">
                  The Velvet Salon
                </span>
              </div>
            </div>

            {/* Stepped Art Deco Corner Ornaments */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t border-l border-[#c9a45c]/25 pointer-events-none hidden sm:block" />
            <div className="absolute -bottom-6 -right-2 w-20 h-20 border-b border-r border-[#c9a45c]/25 pointer-events-none hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
