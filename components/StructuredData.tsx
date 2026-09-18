import { profile, services } from "@/lib/content";
import { siteUrl } from "@/lib/site";


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
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kaduna",
      addressRegion: "Kaduna State",
      addressCountry: "NG",
    },
    sameAs: [
      `https://wa.me/${profile.whatsapp}`,
    ],
    // ponytail: no socials listed yet — add LinkedIn/GitHub/Twitter when they exist
    knowsAbout: [
      "Web Design",
      "Website Design in Kaduna",
      "Web Development",
      "Booking System Development",
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
    name: `Website Designer in Kaduna | ${profile.name}`,
    description:
      "Website designer in Kaduna building business websites, booking systems and Telegram bots with Paystack.",
    url: siteUrl,
    inLanguage: "en",
  };

  // ── ProfessionalService — parent for all services ──
  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#service`,
    name: `Website Designer in Kaduna | ${profile.name}`,
    description:
      "Website design, booking systems, web applications and Telegram bot development for businesses in Kaduna, Northern Nigeria and abroad.",
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kaduna",
      addressRegion: "Kaduna State",
      addressCountry: "NG",
    },
    areaServed: [
      { "@type": "City", name: "Kaduna" },
      { "@type": "AdministrativeArea", name: "Kaduna State" },
      { "@type": "City", name: "Zaria" },
      { "@type": "City", name: "Abuja" },
      { "@type": "Country", name: "Nigeria" },
      { "@type": "Place", name: "Worldwide" },
    ],
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

  // ── FAQPage — powers "People also ask" rich results ──
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are you a website designer based in Kaduna?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. I am a website designer and developer based in Kaduna, Nigeria, working with businesses across Kaduna State, Zaria, Abuja and the rest of Northern Nigeria, as well as clients abroad. Bliss Urban Hotels is a Kaduna business and the site is live, so you can look at real local work before hiring.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a website cost in Kaduna?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most business websites in Kaduna land between $500 and $1,500, depending on how many pages you need and whether you take payments or bookings online. Telegram bots start at $1,200 and booking systems at $3,500. You get a fixed quote before any work starts, not an hourly rate that drifts.",
        },
      },
      {
        "@type": "Question",
        name: "Do you integrate Paystack payments in websites and Telegram bots?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. I build Paystack payment integration into websites, web applications, and Telegram bots. Customers can pay and receive receipts without manual effort.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact you for a project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can reach me via WhatsApp, email, or phone. I usually reply within a few hours. Visit the contact section on my portfolio to get in touch.",
        },
      },
    ],
  };

  const schemas: Record<string, unknown>[] = [person, website, professionalService, breadcrumb, faq];

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
