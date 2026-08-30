import type { Metadata } from "next";
import { profile } from "./content";
import { siteUrl } from "./site";
import type { ServicePage } from "./servicePages";

export function serviceMetadata(page: ServicePage): Metadata {
  const url = `${siteUrl}/${page.slug}`;
  const title = `${page.metaTitle} — ${profile.name}`;

  return {
    title,
    description: page.metaDescription,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title,
      description: page.metaDescription,
      url,
      type: "website",
      siteName: `${profile.name} Portfolio`,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.metaDescription,
      images: ["/og.jpg"],
    },
  };
}

/**
 * Service + BreadcrumbList for the page. Deliberately no FAQPage: since
 * Google's August 2023 change, FAQ rich results only show for government
 * and health sites, so the markup would add weight without earning anything.
 * The questions are on the page for readers, which is why they're there.
 */
export function serviceJsonLd(page: ServicePage) {
  const url = `${siteUrl}/${page.slug}`;

  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.metaTitle,
    description: page.metaDescription,
    serviceType: page.serviceType,
    url,
    provider: {
      "@type": "Person",
      name: profile.name,
      url: siteUrl,
      telephone: profile.phoneDisplay,
      email: profile.email,
    },
    areaServed: page.areaServed.map((name) => ({ "@type": "Place", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: page.metaTitle,
      itemListElement: page.capabilities.map((c) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: c.title,
          description: c.body,
        },
      })),
    },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: page.eyebrow, item: url },
    ],
  };

  return { "@context": "https://schema.org", "@graph": [service, breadcrumb] };
}
