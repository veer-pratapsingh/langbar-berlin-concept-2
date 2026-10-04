"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Immediately register ScrollTrigger in browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function registerGSAP() {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
  return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger };
