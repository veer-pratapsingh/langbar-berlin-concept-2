"use client";

import React, { useState } from "react";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { NightClock } from "@/components/ui/NightClock";
import { Navbar } from "@/components/ui/Navbar";
import { ReservationDrawer } from "@/components/ui/ReservationDrawer";

import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { StorySection } from "@/components/sections/StorySection";
import { CocktailsSection } from "@/components/sections/CocktailsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { DJNightsSection } from "@/components/sections/DJNightsSection";
import { PrivateEventsSection } from "@/components/sections/PrivateEventsSection";
import { VisitSection } from "@/components/sections/VisitSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);

  return (
    <SmoothScrollProvider>
      {/* 0. Preloader */}
      <Preloader onComplete={() => setPreloaderFinished(true)} />

      {/* Cross-cutting UI: Cursor, Night Clock, Global Navbar */}
      <CustomCursor />
      <NightClock />
      <Navbar />

      {/* Main Experience: One Night, One Scroll */}
      <main id="main-content" className="relative w-full overflow-hidden">
        {/* 19:00 Arrival */}
        <HeroSection
          onReserveClick={() => setReservationOpen(true)}
          isReady={preloaderFinished}
        />

        {/* Transitional Velocity Marquee */}
        <MarqueeBand />

        {/* 20:00 The Room */}
        <StorySection />

        {/* 21:00 The Pour */}
        <CocktailsSection />

        {/* 22:00 The Atmosphere */}
        <GallerySection />

        {/* 23:00 The Night Turns */}
        <DJNightsSection onReserveClick={() => setReservationOpen(true)} />

        {/* 00:00 Your Night */}
        <PrivateEventsSection />

        {/* 01:00 Last Call */}
        <VisitSection onReserveClick={() => setReservationOpen(true)} />

        {/* Closing Wordmark & Credits */}
        <Footer />
      </main>

      {/* Shared Slide-Over Table Reservation Panel */}
      <ReservationDrawer
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />
    </SmoothScrollProvider>
  );
}
