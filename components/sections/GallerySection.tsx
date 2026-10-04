"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { GALLERY_ITEMS, CuratedImage } from "@/data/images";
import { AnimatePresence, motion } from "motion/react";

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeItem, setActiveItem] = useState<CuratedImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Pinned Horizontal Scroll on Desktop with ScrollTrigger
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Check if desktop viewport
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isDesktop || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => Math.max(0, track.scrollWidth - window.innerWidth + 120);

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
        },
      });

      // Subtle parallax on internal images
      const images = gsap.utils.toArray<HTMLElement>(".gallery-parallax-img");
      images.forEach((img) => {
        gsap.to(img, {
          xPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            containerAnimation: tween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Lightbox keyboard controls
  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => {
      const next = (prev + 1) % GALLERY_ITEMS.length;
      setActiveItem(GALLERY_ITEMS[next] ?? null);
      return next;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => {
      const next = (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
      setActiveItem(GALLERY_ITEMS[next] ?? null);
      return next;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === "Escape") setActiveItem(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, handleNext, handlePrev]);

  const openLightbox = (item: CuratedImage, index: number) => {
    setLightboxIndex(index);
    setActiveItem(item);
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative bg-[#100c0e] text-[#f3ead8] py-20 lg:py-0 overflow-hidden"
    >
      {/* Pinned Stage Container */}
      <div
        ref={pinContainerRef}
        className="lg:h-screen lg:flex lg:flex-col lg:justify-center relative overflow-hidden"
      >
        {/* Section Header */}
        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 w-full mb-8 lg:mb-12">
          <div className="flex items-center justify-between border-b border-[#c9a45c]/20 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#c9a45c] tracking-widest uppercase">
                22:00 · The Atmosphere
              </span>
              <span className="w-12 h-[1px] bg-[#c9a45c]/40" />
              <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#e8cf9a]/70">
                Visual Chronicles
              </span>
            </div>

            <span className="font-sans text-[10px] uppercase tracking-widest text-[#f3ead8]/40 hidden lg:inline">
              Scroll horizontally · Click to inspect details
            </span>
          </div>

          <div className="mt-4 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#f3ead8]">
              Where shadows and <span className="italic font-normal text-[#e8cf9a]">amber reflections</span> meet.
            </h2>
          </div>
        </div>

        {/* ================= HORIZONTAL TRACK ================= */}
        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-8 px-6 sm:px-12 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none no-scrollbar py-4 will-change-transform"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {GALLERY_ITEMS.map((item, index) => {
            const isTall = index % 3 === 0;
            const isWide = index % 3 === 1;

            return (
              <div
                key={item.id}
                onClick={() => openLightbox(item, index)}
                data-cursor="view"
                className={`snap-center shrink-0 cursor-pointer group relative overflow-hidden rounded-md border border-[#c9a45c]/30 bg-[#0a0806] transition-all duration-500 hover:border-[#e8cf9a] shadow-[0_15px_35px_rgba(0,0,0,0.7)] ${
                  isTall
                    ? "w-[280px] sm:w-[340px] lg:w-[380px] h-[440px] sm:h-[520px]"
                    : isWide
                    ? "w-[340px] sm:w-[460px] lg:w-[540px] h-[360px] sm:h-[460px]"
                    : "w-[280px] sm:w-[360px] lg:w-[420px] h-[400px] sm:h-[480px]"
                }`}
              >
                {/* Parallax Image Wrapper */}
                <div className="relative w-[115%] h-full -left-[7.5%] overflow-hidden">
                  <Image
                    src={item.file}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 340px, 540px"
                    className="gallery-parallax-img object-cover object-center filter brightness-[0.88] contrast-[1.12] group-hover:scale-105 group-hover:brightness-105 transition-all duration-700 ease-out"
                  />
                </div>

                {/* Dark gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806]/85 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Hover metadata card */}
                <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between transition-transform duration-300">
                  <div>
                    <span className="font-mono text-[10px] text-[#c9a45c] tracking-widest block mb-1">
                      NO. 0{index + 1}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#f3ead8] font-light group-hover:text-[#e8cf9a] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[11px] text-[#f3ead8]/60 mt-1 line-clamp-1">
                      {item.mood}
                    </p>
                  </div>

                  <span className="w-8 h-8 rounded-full border border-[#c9a45c]/40 flex items-center justify-center text-[#e8cf9a] opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= LIGHTBOX MODAL WITH FOCUS TRAP ================= */}
      <AnimatePresence>
        {activeItem && (
          <div
            className="fixed inset-0 z-[99995] flex items-center justify-center select-none"
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveItem(null)}
              className="fixed inset-0 bg-[#0a0806]/95 backdrop-blur-xl"
            />

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 max-w-5xl w-full max-h-[90vh] mx-4 sm:mx-8 flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#0a0806]/70 border border-[#c9a45c]/40 text-[#e8cf9a] hover:bg-[#c9a45c]/20 focus:outline-none"
                aria-label="Close Lightbox"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Prev / Next Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#0a0806]/70 border border-[#c9a45c]/40 text-[#e8cf9a] hover:bg-[#c9a45c]/20 focus:outline-none"
                aria-label="Previous Image"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#0a0806]/70 border border-[#c9a45c]/40 text-[#e8cf9a] hover:bg-[#c9a45c]/20 focus:outline-none"
                aria-label="Next Image"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* High-Res Image Display */}
              <div className="relative w-full h-[60vh] sm:h-[72vh] rounded-lg overflow-hidden border border-[#c9a45c]/40 shadow-2xl">
                <Image
                  src={activeItem.file}
                  alt={activeItem.alt}
                  fill
                  quality={85}
                  sizes="100vw"
                  className="object-contain object-center"
                />
              </div>

              {/* Lightbox Caption */}
              <div className="mt-4 text-center max-w-xl px-4">
                <span className="font-mono text-xs text-[#c9a45c] tracking-widest uppercase">
                  {lightboxIndex + 1} of {GALLERY_ITEMS.length}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#f3ead8] mt-1">
                  {activeItem.title}
                </h3>
                <p className="font-sans text-xs text-[#f3ead8]/70 mt-1">
                  {activeItem.mood} · Lang Bar Berlin
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
