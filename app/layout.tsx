import type { Metadata, Viewport } from "next";
import { siteUrl } from "@/lib/site";
import localFont from "next/font/local";
import "./globals.css";
import { profile } from "@/lib/content";

// Self-hosted DM Sans — no build-time network dependency.
const dmSans = localFont({
  src: [
    { path: "./fonts/DMSans-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/DMSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/DMSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/DMSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/DMSans-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

// Archivo variable (wght 100-900, wdth 62-125) in a single 90KB file. The
// display face is condensed and heavy enough to work as structure rather than
// decoration; vendored for the same reason DM Sans is, so the build never
// depends on a font CDN.
const archivo = localFont({
  src: "./fonts/Archivo-Variable.woff2",
  variable: "--font-display",
  weight: "100 900",
  display: "swap",
  fallback: ["DM Sans", "system-ui", "sans-serif"],
});

// Title and description lead with the phrase people type when they are
// hiring — "website designer in Kaduna" — rather than with the name, which
// only helps people who already know it.
const title = `Website Designer in Kaduna, Nigeria | ${profile.name}`;
const description =
  "Website designer in Kaduna, Nigeria. Business websites, booking systems and Telegram bots with Paystack. See live work, get a fixed quote. From $500.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  // Google ignores this tag for ranking; kept because Bing and some local
  // directories still read it. The terms are the hiring-intent ones the page
  // is actually written for.
  keywords: [
    "website designer in Kaduna",
    "web designer in Kaduna",
    "web design company in Kaduna",
    "website developer in Kaduna",
    "hire a web designer in Nigeria",
    "website design price in Nigeria",
    "business website design Kaduna",
    "booking system development",
    "Telegram bot developer Nigeria",
    "Paystack integration developer",
    "web designer Northern Nigeria",
    "Hasbiyallahu Jafaru",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    siteName: `${profile.name} Portfolio`,
    locale: "en_NG",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${profile.name}, ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
    creator: "@hasbiyallahu", // ponytail: placeholder — update when you create a Twitter account
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${archivo.variable}`}>
      <body>
        {/* Skip link — first focusable element for keyboard users */}
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-signal-deep focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-paper focus:outline-none"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
