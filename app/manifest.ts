import type { MetadataRoute } from "next";
import { profile } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.role}`,
    short_name: profile.shortName,
    description:
      "Bespoke websites, web applications, and Telegram automation. Clean code. Purposeful design. Real results.",
    start_url: "/",
    display: "browser",
    background_color: "#1a1816",
    theme_color: "#1a1816",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
