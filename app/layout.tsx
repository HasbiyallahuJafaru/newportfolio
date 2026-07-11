import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { profile } from "@/lib/content";
import { StructuredData } from "@/components/StructuredData";

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

const siteUrl = "https://hasbiyallahu.dev";
const title = `${profile.name} — ${profile.role}`;
const description =
  "Bespoke websites, web applications, and Telegram automation. Clean code. Purposeful design. Real results.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Web Designer",
    "Web Developer",
    "Telegram Bots",
    "Paystack",
    "Full-Stack",
    "Nigeria",
    "Hasbiyallahu Jafaru",
    "UI UX Design",
    "Web Applications",
    "E-Commerce",
    "Automation",
    "Portfolio",
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
        url: "/Hasbiyallahu.png",
        width: 800,
        height: 1067,
        alt: `${profile.name} — ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/Hasbiyallahu.png"],
    creator: "@hasbiyallahu", // ponytail: placeholder — update when you create a Twitter account
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        {/* Skip link — first focusable element for keyboard users */}
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-bronze focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-cream focus:outline-none"
        >
          Skip to content
        </a>
        {children}
        <StructuredData />
      </body>
    </html>
  );
}
