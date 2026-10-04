export interface Cocktail {
  id: string;
  name: string;
  category: "Classic" | "Signature";
  subtitle: string;
  glassware: string;
  garnish: string;
  notes: string;
  flavorProfile: string[];
  image: string;
  alt: string;
}

export const COCKTAILS: Cocktail[] = [
  {
    id: "negroni",
    name: "Classic Negroni",
    category: "Classic",
    subtitle: "Campari · Sweet Vermouth · London Dry Gin", // PLACEHOLDER
    glassware: "Heavy faceted crystal tumbler",
    garnish: "Flamed orange peel & carved crystal ice block",
    notes:
      "A harmonious tension of bitter herbs, botanical juniper and ruby-rich fortified wine, poured over a crystal-clear ice block cut by hand each afternoon.", // PLACEHOLDER
    flavorProfile: ["Bitter", "Botanical", "Citrus Zest"],
    image: "/images/cocktail-negroni.jpg",
    alt: "Ruby-red Negroni in heavy crystal tumbler with hand-carved ice block and orange twist",
  },
  {
    id: "old-fashioned",
    name: "Smoked Old Fashioned",
    category: "Classic",
    subtitle: "Rye Whiskey · Demerara · Angostura · Cherry Smoke", // PLACEHOLDER
    glassware: "Lowball crystal rocks glass",
    garnish: "Embossed artisanal ice block & expressed orange oils",
    notes:
      "Small-batch rye whiskey touched with slow-dissolved demerara sugar and barrel bitters, crowned with bespoke embossed ice reflecting the room's warm glow.", // PLACEHOLDER
    flavorProfile: ["Rich Oak", "Warm Spice", "Demerara"],
    image: "/images/cocktail-old-fashioned.jpg",
    alt: "Deep amber Old Fashioned served with embossed clear ice cube in cut crystal",
  },
  {
    id: "martini",
    name: "Lang House Martini",
    category: "Classic",
    subtitle: "Tanqueray No. TEN · Dry Vermouth · Citrus Mist", // PLACEHOLDER
    glassware: "Chilled stem coupe",
    garnish: "Single speared queen olive or lemon twist",
    notes:
      "Glacial, austere and precisely stirred. Served in a chilled art-deco coupe with botanical depth and a silky mineral finish.", // PLACEHOLDER
    flavorProfile: ["Bone Dry", "Botanical", "Silky Crisp"],
    image: "/images/cocktail-martini.jpg",
    alt: "Bone-dry gin martini in chilled vintage coupe garnished with a green olive",
  },
  {
    id: "champagne-cocktail",
    name: "Kaiser Wilhelm Royale",
    category: "Classic",
    subtitle: "Champagne · Cognac · Bitters-Soaked Sugar Cane", // PLACEHOLDER
    glassware: "Vintage champagne coupe",
    garnish: "Sparkling effervescence & golden lemon ribbon",
    notes:
      "A tribute to West Berlin's gilded boulevard. Rare champagne poured over aromatic bitters and cognac, rising in a continuous ribbon of fine beads.", // PLACEHOLDER
    flavorProfile: ["Effervescent", "Crisp Grape", "Gilded"],
    image: "/images/cocktail-champagne.jpg",
    alt: "Effervescent champagne cocktail poured with fine bubbles into a vintage coupe",
  },
  {
    id: "tiergarten-sour",
    name: "Tiergarten Garden Sour",
    category: "Signature",
    subtitle: "Botanical Spirit · Fresh Basil · Green Chartreuse · Lime", // PLACEHOLDER
    glassware: "Fluted highball glass",
    garnish: "Fresh garden basil leaf & crystal collins spear",
    notes:
      "Evoking the cool morning shade of Berlin's great park. Freshly muddled basil meets bright lime and alpine botanicals for an invigorating, emerald pour.", // PLACEHOLDER
    flavorProfile: ["Herbaceous", "Crisp Citrus", "Alpine"],
    image: "/images/cocktail-tiergarten.jpg",
    alt: "Vibrant pale green herbal cocktail topped with fresh basil leaf in etched glass",
  },
  {
    id: "charlottenburg-gold",
    name: "Charlottenburg Gold",
    category: "Signature",
    subtitle: "Aged Rum · Velvet Foam · Toasted Spices · Pineapple Crisp", // PLACEHOLDER
    glassware: "Gold-rimmed coupe",
    garnish: "Dehydrated pineapple wheel & spun golden dust",
    notes:
      "An indulgent, baroque signature. Rich aged rum enveloped in velvety toasted-spice foam, finished with a crisp dried pineapple wheel catching the candlelight.", // PLACEHOLDER
    flavorProfile: ["Tropical Silk", "Toasted Spice", "Gilded Foam"],
    image: "/images/cocktail-charlottenburg-gold.jpg",
    alt: "Gilded cocktail in coupe topped with silky velvet foam and dehydrated pineapple wheel",
  },
];
