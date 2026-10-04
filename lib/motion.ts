/**
 * Motion System Design Tokens
 * Reused across GSAP tweens, CSS transitions and Framer/Motion transitions.
 */

export const EASINGS = {
  // Entrances and reveals
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
  easeOutExpoStr: "cubic-bezier(0.16, 1, 0.3, 1)",
  gsapEaseOutExpo: "power4.out",

  // Wipes, curtains, clip-paths
  easeInOutQuart: [0.76, 0, 0.24, 1] as const,
  easeInOutQuartStr: "cubic-bezier(0.76, 0, 0.24, 1)",
  gsapEaseInOutQuart: "power4.inOut",

  // Smooth lerp
  smooth: [0.25, 0.1, 0.25, 1] as const,
};

export const DURATIONS = {
  micro: 0.3, // Micro interactions (buttons, badges, icons)
  standard: 0.9, // Section entrances, text reveals, cards
  hero: 1.6, // Hero reveals, preloader curtains
  marquee: 24, // Infinite marquee baseline duration in seconds
};

export const STAGGERS = {
  tight: 0.06,
  standard: 0.09,
  relaxed: 0.12,
};
