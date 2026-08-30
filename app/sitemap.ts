import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { servicePages } from "@/lib/servicePages";

// Bumped by hand when the page content actually changes. Using new Date() here
// would restamp lastmod on every deploy, and Google discounts a lastmod that
// always says "just now".
const LAST_CONTENT_UPDATE = "2026-08-30";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(LAST_CONTENT_UPDATE);

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...servicePages.map((p) => ({
      url: `${siteUrl}/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
