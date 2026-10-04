export interface CuratedImage {
  id: string;
  file: string;
  title: string;
  section: "hero" | "story" | "cocktails" | "gallery" | "dj" | "events" | "visit";
  orientation: "landscape" | "portrait" | "square";
  focalPoint: string;
  mood: string;
  alt: string;
  treatment?: "arch" | "cinematic" | "ken-burns" | "preview" | "polaroid";
}

/**
 * Art Direction Note:
 * Every image is drawn directly from the authentic Lang Bar Instagram archive.
 * - Hero (19:00 Arrival): 'hero-bar-arrival' — The definitive grand establishing shot showing the iconic curved brass-trimmed bar counter, tufted velvet seating, and geometric ceiling under warm golden ambient glow.
 * - Story (20:00 The Room): 'story-lounge-chair' & 'story-decanters' — Architectural luxury textures, vintage decanters and intimate lounge vignettes framed in art-deco arches.
 * - Cocktails (21:00 The Pour): 6 signature and classic drinks with pristine close-ups matching actual glassware and garnishes (Negroni, Old Fashioned, Olive Martini, Champagne Coupe, Green Herb Tiergarten, and Foamed Charlottenburg Gold).
 * - Gallery (22:00 The Atmosphere): High-contrast nocturnal textures — ice carving, chandelier toasts, back-bar pours, coupe silhouettes, and candlelit booths.
 * - DJ Nights (23:00 The Night Turns): Deep velvet and club-black tones with live brass (saxophone) and crowd energy.
 * - Private Events (00:00 Your Night): Elegant social gatherings and bespoke celebrations overlooking Berlin.
 * - Visit (01:00 Last Call): Velvet booths winding down, intimate nightcap ambience.
 */
export interface CuratedImagesMap {
  hero: CuratedImage;
  storyPrimary: CuratedImage;
  storySecondary: CuratedImage;
  cocktailNegroni: CuratedImage;
  cocktailOldFashioned: CuratedImage;
  cocktailMartini: CuratedImage;
  cocktailChampagne: CuratedImage;
  cocktailTiergarten: CuratedImage;
  cocktailCharlottenburgGold: CuratedImage;
  djCrowd: CuratedImage;
  djSax: CuratedImage;
  djRedCrowd: CuratedImage;
  eventsCelebration: CuratedImage;
  eventsReception: CuratedImage;
  visitLounge: CuratedImage;
}

export const IMAGES: CuratedImagesMap = {
  hero: {
    id: "hero-bar-arrival",
    file: "/images/hero-bar-arrival.jpg",
    title: "The Grand Counter at Dusk",
    section: "hero",
    orientation: "square",
    focalPoint: "center 45%",
    mood: "Anticipatory, opulent, candlelit twilight",
    alt: "Lang Bar interior featuring the polished mahogany and brass counter, plush curved leather barstools, and faceted art-deco ceiling",
    treatment: "ken-burns",
  },
  storyPrimary: {
    id: "story-decanters",
    file: "/images/story-decanters.jpg",
    title: "Crystal Decanters and Heritage Spirits",
    section: "story",
    orientation: "portrait",
    focalPoint: "center 40%",
    mood: "Crafted, timeless, tactile luxury",
    alt: "Faceted crystal decanters with amber spirits catching warm bar lighting",
    treatment: "arch",
  },
  storySecondary: {
    id: "story-lounge-chair",
    file: "/images/story-lounge-chair.jpg",
    title: "The Salon Corner",
    section: "story",
    orientation: "square",
    focalPoint: "center center",
    mood: "Intimate, velvet-clad conversation corner",
    alt: "Rich velvet armchair with cocktail table bathed in warm salon lamplight",
    treatment: "arch",
  },
  cocktailNegroni: {
    id: "cocktail-negroni",
    file: "/images/cocktail-negroni.jpg",
    title: "Classic Negroni",
    section: "cocktails",
    orientation: "square",
    focalPoint: "center center",
    mood: "Crimson glow, hand-carved ice, bitter citrus aroma",
    alt: "Ruby-red Negroni in heavy crystal tumbler with carved ice block and orange twist",
    treatment: "preview",
  },
  cocktailOldFashioned: {
    id: "cocktail-old-fashioned",
    file: "/images/cocktail-old-fashioned.jpg",
    title: "Smoked Old Fashioned",
    section: "cocktails",
    orientation: "portrait",
    focalPoint: "center 40%",
    mood: "Deep amber, stamped artisanal ice, rich rye warmth",
    alt: "Old Fashioned with stamped clear ice cube and aromatic bitters",
    treatment: "preview",
  },
  cocktailMartini: {
    id: "cocktail-martini",
    file: "/images/cocktail-martini.jpg",
    title: "Lang House Martini",
    section: "cocktails",
    orientation: "portrait",
    focalPoint: "center 45%",
    mood: "Crisp, icy botanical clarity, Spanish olive",
    alt: "Bone-dry gin martini in chilled vintage coupe with green olive",
    treatment: "preview",
  },
  cocktailChampagne: {
    id: "cocktail-champagne",
    file: "/images/cocktail-champagne.jpg",
    title: "Kaiser Wilhelm Royale",
    section: "cocktails",
    orientation: "portrait",
    focalPoint: "center center",
    mood: "Effervescent champagne, gold shimmer, citrus zest",
    alt: "Champagne cocktail in vintage coupe sparkling with fine bubbles",
    treatment: "preview",
  },
  cocktailTiergarten: {
    id: "cocktail-tiergarten",
    file: "/images/cocktail-tiergarten.jpg",
    title: "Tiergarten Garden Sour",
    section: "cocktails",
    orientation: "square",
    focalPoint: "center 50%",
    mood: "Verdant botanical, basil leaf, refreshing crispness",
    alt: "Vibrant pale green herbal cocktail topped with fresh basil leaf in etched glass",
    treatment: "preview",
  },
  cocktailCharlottenburgGold: {
    id: "cocktail-charlottenburg-gold",
    file: "/images/cocktail-charlottenburg-gold.jpg",
    title: "Charlottenburg Gold",
    section: "cocktails",
    orientation: "square",
    focalPoint: "center 45%",
    mood: "Frosted velvet foam, gold dust, dried pineapple crisp",
    alt: "Gilded cocktail in coupe topped with silky velvet foam and dehydrated pineapple wheel",
    treatment: "preview",
  },
  djCrowd: {
    id: "dj-crowd-bar",
    file: "/images/dj-crowd-bar.jpg",
    title: "Midnight Vibrancy",
    section: "dj",
    orientation: "square",
    focalPoint: "center 45%",
    mood: "Electric basslines, low red neon, glamorous energy",
    alt: "Crowd gathering around the illuminated bar during Friday night DJ set",
    treatment: "cinematic",
  },
  djSax: {
    id: "dj-saxophone",
    file: "/images/dj-saxophone.jpg",
    title: "Live Brass Sessions",
    section: "dj",
    orientation: "portrait",
    focalPoint: "center 30%",
    mood: "Soulful brass, midnight blue backlighting, pulsing rhythm",
    alt: "Saxophonist playing live alongside DJ under dramatic purple-blue lights",
    treatment: "cinematic",
  },
  djRedCrowd: {
    id: "dj-crowd-red",
    file: "/images/dj-crowd-red.jpg",
    title: "The Weekend Pulse",
    section: "dj",
    orientation: "landscape",
    focalPoint: "center 50%",
    mood: "Nocturnal red wash, stylish guests, Berlin weekend glamour",
    alt: "Guests enjoying cocktails under warm ambient bar lighting on Saturday night",
    treatment: "cinematic",
  },
  eventsCelebration: {
    id: "events-celebration-bar",
    file: "/images/events-celebration-bar.jpg",
    title: "Private Gala Reception",
    section: "events",
    orientation: "portrait",
    focalPoint: "center 40%",
    mood: "Bespoke elegance, intimate luxury, celebratory toast",
    alt: "Elegant private celebration gathering at the exclusive Lang Bar corner lounge",
    treatment: "arch",
  },
  eventsReception: {
    id: "events-reception.jpg",
    file: "/images/events-reception.jpg",
    title: "Exclusive Evening Gathering",
    section: "events",
    orientation: "landscape",
    focalPoint: "center 45%",
    mood: "Sophisticated corporate reception with panoramic city views",
    alt: "Guests conversing during a private soirée with warm candle fixtures",
    treatment: "arch",
  },
  visitLounge: {
    id: "visit-lounge",
    file: "/images/visit-lounge.jpg",
    title: "Last Call at Waldorf Astoria",
    section: "visit",
    orientation: "square",
    focalPoint: "center center",
    mood: "Serene after-hours sanctuary, amber table lamp glow",
    alt: "Intimate curved booth seating in Lang Bar Berlin with soft warm lamp illumination",
    treatment: "cinematic",
  },
};

export const GALLERY_ITEMS: CuratedImage[] = [
  {
    id: "gallery-1",
    file: "/images/gallery-golden-ceiling-crowd.jpg",
    title: "The Gilded Ceiling & Evening Pulse",
    section: "gallery",
    orientation: "square",
    focalPoint: "center center",
    mood: "Atmospheric, warm gold reflections, bustling room",
    alt: "Lang Bar salon filled with guests under the geometric brass ceiling",
  },
  {
    id: "gallery-2",
    file: "/images/gallery-bartender-pour.jpg",
    title: "The Precision Pour",
    section: "gallery",
    orientation: "landscape",
    focalPoint: "center 35%",
    mood: "Artisanal discipline, mixology craft",
    alt: "Bartender in black shirt deftly measuring liquor with a silver jigger",
  },
  {
    id: "gallery-3",
    file: "/images/gallery-carved-ice.jpg",
    title: "Hand-Carved Crystal Ice",
    section: "gallery",
    orientation: "square",
    focalPoint: "center center",
    mood: "Crisp detail, tactile luxury",
    alt: "Black-gloved mixologist presenting custom embossed clear ice cube",
  },
  {
    id: "gallery-4",
    file: "/images/gallery-silhouette-coupe.jpg",
    title: "Shadows & Stemware",
    section: "gallery",
    orientation: "portrait",
    focalPoint: "center 45%",
    mood: "Editorial, noir, artistic silhouette",
    alt: "Artistic monochrome shadow of a cocktail coupe held against textured wall",
  },
  {
    id: "gallery-5",
    file: "/images/gallery-bar-blossoms.jpg",
    title: "Crimson Florals on Green Marble",
    section: "gallery",
    orientation: "square",
    focalPoint: "center center",
    mood: "Opulent interior composition, warm brass",
    alt: "Lush red floral arrangement accentuating the sweeping marble bar",
  },
  {
    id: "gallery-6",
    file: "/images/gallery-toast-sparkle.jpg",
    title: "A Midnight Toast",
    section: "gallery",
    orientation: "square",
    focalPoint: "center center",
    mood: "Joyful celebration, glittering stemware",
    alt: "Guests clinking delicate martini coupes under soft bar chandelier",
  },
  {
    id: "gallery-7",
    file: "/images/gallery-amber-coupe.jpg",
    title: "Amber & Almond Notes",
    section: "gallery",
    orientation: "portrait",
    focalPoint: "center 60%",
    mood: "Sensual aperitif, warm bokeh",
    alt: "Golden cocktail in stem coupe resting beside roasted almonds",
  },
  {
    id: "gallery-8",
    file: "/images/gallery-candlelit-booth.jpg",
    title: "Velvet Booth & Candlelight",
    section: "gallery",
    orientation: "square",
    focalPoint: "center 55%",
    mood: "Intimate rendezvous, deep indigo velvet",
    alt: "Midnight blue curved booth with candle flickering on wooden tabletop",
  },
  {
    id: "gallery-9",
    file: "/images/gallery-jigger-pour.jpg",
    title: "The Jigger & Shaker",
    section: "gallery",
    orientation: "square",
    focalPoint: "center 40%",
    mood: "Focus, speed, cocktail alchemy",
    alt: "Spirits cascading from jigger into mixing tin across marble counter",
  },
  {
    id: "gallery-10",
    file: "/images/gallery-bar-crowd.jpg",
    title: "Social Resonance",
    section: "gallery",
    orientation: "landscape",
    focalPoint: "center 45%",
    mood: "Berlin cosmopolitan night, warm laughter",
    alt: "Guests gathered around illuminated bar counter chatting in evening attire",
  },
];
