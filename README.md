# LANG BAR BERLIN — "One Night, One Scroll"
### Award-Caliber Single-Page Concept Website & Pitch Experience

> **Confidential Pitch Asset**: This is an unofficial, pitch-ready concept website designed to win the digital re-platforming engagement for **Lang Bar Berlin**, situated on the 1st floor of the **Waldorf Astoria Berlin** (Hardenbergstraße 28, 10623 Berlin).

---

## 1. Executive Concept & Creative Direction

### The Big Idea: *"One Night, One Scroll"*
Rather than a traditional hospitality brochure, the website transforms the browsing experience into a singular cinematic evening at Lang Bar Berlin. As the visitor scrolls down the page, time advances chronologically:

| Time | Narrative Chapter | Section | Atmospheric Lighting Tone |
| :--- | :--- | :--- | :--- |
| **19:00** | **Arrival** | Hero Stage | Warm Candlelight Amber (`#0a0806`, glow `#c9a45c`) |
| **20:00** | **The Room** | Heritage & Salon Atmosphere | Gilded Twilight Salon (`#0d0a07`) |
| **21:00** | **The Pour** | Curated Cocktails & House Signatures | Deep Velvet Burgundy (`#1a080f`, glow `#b42a44`) |
| **22:00** | **The Atmosphere** | Visual Chronicles Horizontal Pinned Gallery | Deep Charcoal & Reflections (`#100c0e`) |
| **23:00** | **The Night Turns** | Resident DJ Nights & Live Brass | Club Noir & Gold Flash (`#050403`, glow `#e8cf9a`) |
| **00:00** | **Your Night** | Private Celebrations & Exclusive Hire | Warm Midnight Velvet (`#120a0e`) |
| **01:00** | **Last Call** | Venue Details, Location & Directions | Soft Last-Call Amber (`#0b0806`) |

### Atmospheric Color Shifts
The background and glow color temperatures are tweened continuously via GSAP `ScrollTrigger` and CSS variables (`--bg-tone`, `--glow-color`), shifting dynamically as each chapter comes into view.

---

## 2. Design System & Typography

- **Display Serif**: `Cormorant Garamond` (Light & Regular with custom Italic emphasis for emotive keywords). Fluid typography scales with `clamp()`.
- **Interface & Body Sans**: `Jost` (Modern geometric sans-serif with tracked uppercase badges: `0.2em` to `0.3em`).
- **Color Palette**:
  - **Ink (Base)**: `#0a0806`
  - **Charcoal**: `#15110e`
  - **Velvet**: `#4a1220`
  - **Brass (Hairlines & Accents)**: `#c9a45c`
  - **Champagne (Highlights & Primary CTAs)**: `#e8cf9a`
  - **Ivory (Typography)**: `#f3ead8`
  - **Smoke (Sublines)**: `rgba(243, 234, 216, 0.62)`
- **Architectural Ornaments**: 1px gold hairlines, Art Deco corner brackets (`┌ ┐ └ ┘`), arch frames with `border-t-full`, and organic procedural film grain.
- **Button Micro-Interactions**:
  - *Primary Button*: Champagne liquid sweep (`.btn-liquid`) filling up on hover, equipped with magnetic pointer pull.
  - *Secondary Button*: Hairline brass outline with kinetic vertical text-roll (`.btn-roll`).

---

## 3. Motion Choreography & Performance

- **Preloader**: Runs in `< 2.2s`. A thin gold line draws across, "LANG BAR" letter tracking tightens, and a dual-curtain vertical wipe reveals the already decoded hero image. Adding `?preloader=off` to any URL immediately bypasses the preloader for development and testing.
- **Hero Candlelight**: Cursor movement drives a smooth lerp-based radial light mask (`--candle-x`, `--candle-y`) that illuminates the darker bar photo underneath. On touch devices, a figure-eight Lissajous drift simulates flickering ambient candlelight.
- **Gold Dust Particle Canvas**: 38 floating champagne dust particles rendered via 2D Canvas, throttled via `IntersectionObserver` to pause computation whenever the hero is offscreen.
- **Velocity Marquee**: Ticker speed and direction react dynamically to scroll velocity, calculating delta scroll over time without external heavy dependencies.
- **Story Word Illumination**: Editorial paragraph text lights up from 15% opacity to 100% white/champagne word-by-word as the user scrolls.
- **Cocktail Cursor Tilt**: Hovering any cocktail on desktop reveals a floating preview photo with lerp physics and horizontal velocity tilt (`Math.max(-14, Math.min(14, deltaX * 0.45))`).
- **Pinned Atmosphere Gallery**: Pinned horizontal track on desktop with parallax layers (`w-[115%]` image parallax) and shared lightbox with keyboard navigation (`Esc`, `←`, `→`).
- **DJ Nights Typography**: Massive outlined `FRIDAY & SATURDAY` fills with solid metallic gold on scroll scrub.
- **Reduced Motion**: Full support for `(prefers-reduced-motion: reduce)`, disabling Lenis, velocity skew, particle canvas, and cursor lerp.

---

## 4. Getting Started & Development

### Prerequisites
- Node.js 18.18+ or Node.js 20+
- npm 9+ or pnpm 8+

### Setup & Local Server
```bash
# 1. Install dependencies
npm install

# 2. Run local development server (Turbopack)
npm run dev

# 3. View the app
# Open http://localhost:3000 in your browser
# Or visit http://localhost:3000/?preloader=off to bypass preloader during testing
```

### Verification & Quality Assurance Commands
```bash
# Type-check TypeScript
npm run typecheck

# Lint with ESLint
npm run lint

# Build production bundle
npm run build

# Run all checks at once
npm run check
```

---

## 5. Image Pipeline & Asset Swapping

All photography used on this website originates from authentic images captured at Lang Bar Berlin (`Langbar_Berlin_Images/`). **Zero AI images, stock photos, or external hotlinks are used.**

### How the Image Pipeline Works
1. Place raw photos into `Langbar_Berlin_Images/`.
2. Run the automated Sharp optimization script:
   ```bash
   npm run images
   ```
3. The script in `scripts/prepare-images.mjs`:
   - Inspects image aspect ratios and resolutions.
   - Resizes and crops to curated dimensions (1200px width for cards, 1920px for heroes/events).
   - Applies subtle film tone contrast and saturation.
   - Outputs optimized web assets into `public/images/`.
   - Automatically generates the Open Graph (`app/opengraph-image.jpg`) and Twitter Card (`app/twitter-image.jpg`) social previews.

### Swapping Images or Changing Assignments
Image metadata, focal points, alt text, and section mappings are declared in `data/images.ts`:
```ts
export const IMAGES = {
  hero: {
    file: "/images/hero-bar-arrival.jpg",
    alt: "Lang Bar Berlin illuminated backlit bar counter and leather barstools",
    orientation: "landscape",
    focalPoint: "center 45%",
    mood: "Nocturnal, golden, seductive",
    section: "hero"
  },
  // ... edit entries in data/images.ts to remap assets
}
```

---

## 6. Inventory of `// PLACEHOLDER` Content

Per brand guidelines, known brand facts are preserved while unverified details are marked as neutral placeholders in code and summarized below for venue review:

| Category | Placeholder Identifier | Implementation Location | Pitch Note for Venue Team |
| :--- | :--- | :--- | :--- |
| **Cocktail Menu** | `// PLACEHOLDER` | `data/cocktails.ts` | 6 drinks crafted to match authentic photos (4 classics: Negroni, Smoked Old Fashioned, Lang House Martini, Kaiser Wilhelm Royale + 2 Berlin signatures: Tiergarten Garden Sour, Charlottenburg Gold). **No prices are shown.** Venue mixologists can plug in real signature recipes. |
| **Operating Hours** | `// PLACEHOLDER` | `data/site.ts` | Stated as: *"Tuesday – Saturday: From 18:00 (To be confirmed with venue team)"*. Labeled with explicit tag `"TO BE CONFIRMED"`. |
| **DJ Lineup** | `// PLACEHOLDER` | `data/site.ts` | Dynamic function computes the next 6 upcoming Friday and Saturday calendar dates from today. Every date is strictly labeled `"DJ to be announced"`. **No DJ names are invented.** |
| **Dress Code** | `// PLACEHOLDER` | `data/site.ts` | Stated as: *"Smart Casual / Evening Elegant — Athletic wear and caps politely declined"*. |
| **Private Events** | `// PLACEHOLDER` | `components/sections/PrivateEventsSection.tsx` | Front-end simulation of proposal form. Dispatches to state without backend writes. |
| **Table Booking** | `// PLACEHOLDER` | `components/ui/ReservationDrawer.tsx` | Front-end slide-over table reservation drawer. Dispatches confirmed state with animated gold checkmark. |

---

## 7. Production Backend Integration Blueprints

When moving from pitch prototype to live production, hook up the front-end forms using the following standard integrations:

### A. Table Reservations (SevenRooms / OpenTable / Resy)
Replace the front-end modal in `components/ui/ReservationDrawer.tsx` with:
- **SevenRooms Widget**:
  ```tsx
  // Embed SevenRooms official script:
  <script src="https://www.sevenrooms.com/widget/embed.js"></script>
  // Open with venue token:
  window.SevenroomsWidget.open({ venue: "langbarberlin" });
  ```
- **OpenTable Custom API / Widget**:
  Pass party size, date, and time to OpenTable booking endpoint or use the OpenTable iframe modal.

### B. Private Event Proposal Inquiries (Resend / SendGrid / Supabase)
Replace `handleSubmit` in `components/sections/PrivateEventsSection.tsx` with a Next.js Server Action:
```ts
// app/actions/enquiry.ts
"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitEventEnquiry(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const date = formData.get("date");
  const guests = formData.get("guests");
  const eventType = formData.get("eventType");
  const message = formData.get("message");

  await resend.emails.send({
    from: "Lang Bar Website <enquiries@langbarberlin.com>",
    to: ["events.berlin@waldorfastoria.com"],
    subject: `New Private Event Enquiry: ${name} (${guests} Guests)`,
    text: `Name: ${name}\nEmail: ${email}\nDate: ${date}\nGuests: ${guests}\nType: ${eventType}\nMessage: ${message}`,
  });

  return { success: true };
}
```

---

## 8. Vercel Deployment Guide

This project is built with standard Next.js 16 App Router and runs with zero external servers, zero database prerequisites, and zero required environment variables.

### Deploying via Vercel CLI
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy Preview
vercel

# 4. Deploy Production
vercel --prod
```

### Deploying via Vercel Dashboard (GitHub / GitLab / Bitbucket)
1. Push this repository to GitHub.
2. In the Vercel dashboard, click **Add New... -> Project**.
3. Import this repository.
4. Framework Preset: **Next.js**.
5. Click **Deploy**.

---

## 9. Brand Protection & Pitch Confidentiality

- **Robots Exclusion**: Configured in `app/robots.ts` with `disallow: "/"` and `User-agent: *` to prevent search engine indexing during the client presentation phase.
- **Metadata Protection**: `robots: { index: false, follow: false }` declared in `app/layout.tsx`.
- **Trademark Notice**: No official Waldorf Astoria logos or typography trademarks were extracted or hotlinked. Monogram "L" Art Deco vector favicon is custom-crafted.
- **Disclaimers**: Footer explicitly labels the site as a concept pitch piece:
  > *"Concept design & creative direction by Principal Creative Developer. Unofficial concept presentation, not affiliated with Lang Bar Berlin or Waldorf Astoria Hotels & Resorts."*

---

*Designed and engineered with passion for hospitality excellence, cinematic pacing, and digital craftsmanship.*
