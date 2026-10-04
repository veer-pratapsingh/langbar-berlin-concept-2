/**
 * prepare-images.mjs
 * Copies the curated Instagram photos from /Langbar_Berlin_Images into /public/images
 * with semantic file names, normalises them to JPEG, caps the long edge (the 3072x4096
 * originals are far bigger than any frame on the page) and builds the Open Graph image.
 *
 * Run:  npm run images
 * Only needed when you swap photos. The output is committed, so Vercel never runs this.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "Langbar_Berlin_Images");
const OUT = path.join(ROOT, "public", "images");
const MAX_EDGE = 2000;

/** [output name, source sub-folder, source file] */
const MAP = [
  ["hero-bar-arrival", "Venue & Interiors", "621553251_17973600708003892_1604983929502966058_n.jpg"],
  ["story-lounge-chair", "Venue & Interiors", "670490292_18178078882390114_2068044598807540361_n.jpg"],
  ["story-decanters", "Venue & Interiors", "721601516_18184875223388858_8203952275383465205_n.jpg"],
  ["cocktail-negroni", "Cocktails & Drinks", "488925209_18139728079388858_5121961483776906771_n.jpg"],
  ["cocktail-old-fashioned", "Cocktails & Drinks", "497623471_684339364227605_121884864885852791_n.jpg"],
  ["cocktail-martini", "Cocktails & Drinks", "632373036_18172314832388858_7859538685179372656_n.webp"],
  ["cocktail-champagne", "Cocktails & Drinks", "473649609_18132113890388858_2064593699236615536_n.jpg"],
  ["cocktail-tiergarten", "Cocktails & Drinks", "518234640_18148836406388858_6707394645932681307_n.webp"],
  ["cocktail-charlottenburg-gold", "Cocktails & Drinks", "623221827_17954826182920163_5012138749310485085_n.jpg"],
  ["gallery-golden-ceiling-crowd", "Events & Guests", "519508741_18149254393388858_7443249210126225227_n.webp"],
  ["gallery-bartender-pour", "Bartending & Service", "651658417_17941762416139822_6445337814384049046_n.jpg"],
  ["gallery-silhouette-coupe", "Cocktails & Drinks", "503310525_1400426204439256_4392284101798635033_n.jpg"],
  ["gallery-bar-blossoms", "Venue & Interiors", "625008660_18092874277813934_8514652141234620421_n.jpg"],
  ["gallery-carved-ice", "Bartending & Service", "628537204_18452660491101964_2463938893369772293_n.jpg"],
  ["gallery-toast-sparkle", "Events & Guests", "624161455_18073377524618792_8784945123693775201_n.jpg"],
  ["gallery-amber-coupe", "Cocktails & Drinks", "583486801_2786548575010192_4237413620546937598_n.jpg"],
  ["gallery-candlelit-booth", "Venue & Interiors", "669737854_18068720012312338_5215735946634999635_n.jpg"],
  ["gallery-jigger-pour", "Bartending & Service", "625183694_18076747985367364_7589127393331378543_n.jpg"],
  ["gallery-lime-coupe", "Cocktails & Drinks", "473658377_18132112573388858_8491810585534314545_n.jpg"],
  ["gallery-bar-crowd", "Events & Guests", "730266465_18186700336388858_1483766283619081706_n.jpg"],
  ["dj-crowd-bar", "Events & Guests", "474983667_18132985699388858_3455225231888717694_n.jpg"],
  ["dj-saxophone", "Events & Guests", "830985445_18126932209893232_1806345254515388474_n.jpg"],
  ["dj-crowd-red", "Events & Guests", "731650935_18186700324388858_5212094971809821387_n.jpg"],
  ["events-celebration-bar", "Weddings & Private Events", "797840921_18633234520060997_3875919854454945080_n.jpg"],
  ["events-reception", "Events & Guests", "733975000_18186700327388858_586945383704194273_n.jpg"],
  ["visit-lounge", "Venue & Interiors", "652752576_17992223438933303_2432669262170644140_n.jpg"],
];

fs.mkdirSync(OUT, { recursive: true });

for (const [name, dir, file] of MAP) {
  const src = path.join(SRC, dir, file);
  if (!fs.existsSync(src)) {
    console.error(`missing: ${src}`);
    process.exitCode = 1;
    continue;
  }
  const dest = path.join(OUT, `${name}.jpg`);
  const info = await sharp(src)
    .rotate()
    .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true, progressive: true })
    .toFile(dest);
  console.log(`${name}.jpg  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
}

// Open Graph / Twitter card: graded crop of the hero photo.
const hero = path.join(OUT, "hero-bar-arrival.jpg");
const shade = Buffer.from(
  `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="v" cx="50%" cy="45%" r="75%">
        <stop offset="35%" stop-color="#0a0806" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="#0a0806" stop-opacity="0.92"/>
      </radialGradient>
      <linearGradient id="b" x1="0" y1="0" x2="0" y2="1">
        <stop offset="50%" stop-color="#0a0806" stop-opacity="0"/>
        <stop offset="100%" stop-color="#0a0806" stop-opacity="0.85"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="#2a1408" opacity="0.28"/>
    <rect width="1200" height="630" fill="url(#v)"/>
    <rect width="1200" height="630" fill="url(#b)"/>
    <line x1="420" y1="452" x2="780" y2="452" stroke="#c9a45c" stroke-width="1"/>
    <text x="600" y="420" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="74" letter-spacing="22" fill="#f3ead8">LANG BAR</text>
    <text x="600" y="492" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="17" letter-spacing="7" fill="#e8cf9a">WHERE BERLIN COMES ALIVE AFTER DARK</text>
  </svg>`,
);
for (const target of ["opengraph-image.jpg", "twitter-image.jpg"]) {
  await sharp(hero)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .modulate({ brightness: 0.8, saturation: 0.9 })
    .composite([{ input: shade }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(ROOT, "app", target));
}
console.log("og images written");
