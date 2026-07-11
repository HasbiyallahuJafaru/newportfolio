import { profile, services, testimonials } from "@/lib/content";

const siteUrl = "https://hasbiyallahu.dev"; // ponytail: hardcoded — update when you buy a domain

export function StructuredData() {
  // ── Person ──
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.shortName,
    jobTitle: profile.role,
    email: profile.email,
    telephone: profile.phoneDisplay,
    url: siteUrl,
    sameAs: [
      `https://wa.me/${profile.whatsapp}`,
    ],
    // ponytail: no socials listed yet — add LinkedIn/GitHub/Twitter when they exist
    knowsAbout: [
      "Web Design",
      "Web Development",
      "Telegram Bots",
      "Paystack Integration",
      "Full-Stack Development",
      "UI/UX Design",
      "E-Commerce",
      "Automation",
    ],
  };

  // ── WebSite ──
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.name} — ${profile.role}`,
    description:
      "Bespoke websites, web applications, and Telegram automation. Clean code. Purposeful design. Real results.",
    url: siteUrl,
    inLanguage: "en",
  };

  // ── ProfessionalService — parent for all services ──
  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#service`,
    name: `${profile.name} — ${profile.role}`,
    description:
      "Web design, web application development, and Telegram bot development services.",
    url: siteUrl,
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    provider: { "@type": "Person", name: profile.name },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.items.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.body,
        },
      })),
    },
  };

  // ── BreadcrumbList (single-page sections as breadcrumb) ──
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/#about` },
      { "@type": "ListItem", position: 3, name: "Services", item: `${siteUrl}/#services` },
      { "@type": "ListItem", position: 4, name: "Work", item: `${siteUrl}/#work` },
      { "@type": "ListItem", position: 5, name: "Pricing", item: `${siteUrl}/#pricing` },
      { "@type": "ListItem", position: 6, name: "Contact", item: `${siteUrl}/#contact` },
    ],
  };

  // ── Review (testimonials) — only if there are testimonials ──
  const reviewSchema =
    testimonials.items.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: profile.name,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5",
            reviewCount: String(testimonials.items.length),
            bestRating: "5",
          },
          review: testimonials.items.map((t) => ({
            "@type": "Review",
            reviewBody: t.quote,
            author: { "@type": "Person", name: t.author },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
          })),
        }
      : null;

  const schemas: Record<string, unknown>[] = [person, website, professionalService, breadcrumb];
  if (reviewSchema) schemas.push(reviewSchema);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          schemas.length === 1
            ? schemas[0] // single schema — no wrapping array
            : { "@context": "https://schema.org", "@graph": schemas },
        ),
      }}
    />
  );
}
