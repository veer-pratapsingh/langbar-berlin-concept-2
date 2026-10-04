import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://langbar-berlin-concept.vercel.app"),
  title: "Lang Bar Berlin · Waldorf Astoria Berlin | Unofficial Concept",
  description:
    "A sensory journey through one night at Lang Bar Berlin. Signature cocktails, timeless classics, weekend DJ sets and bespoke celebrations on the first floor of Waldorf Astoria Berlin.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Lang Bar Berlin · Where Berlin Comes Alive After Dark",
    description:
      "A sensory journey through one night at Lang Bar Berlin. Craft cocktails, weekend DJ sets and bespoke celebrations inside Waldorf Astoria Berlin.",
    url: "https://langbar-berlin-concept.vercel.app",
    siteName: "Lang Bar Berlin Concept",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lang Bar Berlin — Grand Counter and Velvet Salon",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lang Bar Berlin · Unofficial Concept",
    description: "One Night, One Scroll at Lang Bar Berlin.",
    images: ["/twitter-image.jpg"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0806",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} dark`}>
      <body className="bg-[#0a0806] text-[#f3ead8] antialiased selection:bg-[#c9a45c]/30 selection:text-[#f3ead8]">
        {/* Accessible skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-[#c9a45c] focus:text-[#0a0806] focus:font-medium focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Global atmospheric film grain & soft vignette */}
        <div className="film-grain" aria-hidden="true" />
        <div className="screen-vignette" aria-hidden="true" />

        {children}
      </body>
    </html>
  );
}
