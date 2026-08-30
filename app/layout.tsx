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

const title = `${profile.name} — ${profile.role}`;
const description =
  "Websites, web apps and Telegram bots that get your business found on Google and take the manual work off your team. Paystack payments included. Projects from $500.";

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
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.role}`,
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
      </body>
    </html>
  );
}
