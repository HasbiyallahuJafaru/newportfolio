import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Grain } from "@/components/Grain";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon, CheckIcon } from "@/components/icons";
import { profile, whatsappUrl } from "@/lib/content";
import { siteUrl } from "@/lib/site";

// A pricing guide for the price-intent searches nobody in the Kaduna/Nigeria
// SERP answers on an owned page ("website design price in nigeria", "cost of
// website design in nigeria", "how much is website design in nigeria").
// Every figure here is one the site already quotes elsewhere; nothing is
// invented to look precise. It doubles as the page other sites can link to.

const slug = "website-design-price-nigeria";
const url = `${siteUrl}/${slug}`;
const title = "Website Design Price in Nigeria (2026 Guide)";
const description =
  "What a website costs in Nigeria in 2026: real price ranges for business sites, booking systems and Telegram bots, what changes the price, and what to ask.";
const updated = "2026-11-09";

export const metadata: Metadata = {
  title: `${title} | ${profile.name}`,
  description,
  alternates: { canonical: `/${slug}` },
  openGraph: {
    title,
    description,
    url,
    type: "article",
    siteName: `${profile.name} Portfolio`,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

const tiers = [
  {
    name: "Business website",
    price: "$500 to $1,500",
    body: "A site that says what you do, shows your work and gets people to call or message. Most Kaduna and Nigerian business sites land in this range, depending on page count and whether you need payments.",
    href: "/web-design-kaduna",
    linkLabel: "Website design in Kaduna",
  },
  {
    name: "Telegram sales bot",
    price: "From $1,200",
    body: "A bot that shows your catalogue, takes the order and collects payment with Paystack or Stripe inside the chat, with receipts sent automatically.",
    href: "/telegram-bot-development",
    linkLabel: "Telegram bot development",
  },
  {
    name: "Booking system",
    price: "From $3,500",
    body: "Live availability, online payment and automatic reminders, built around how your business actually takes bookings. Hotels, clinics, event spaces and rentals.",
    href: "/booking-system-development",
    linkLabel: "Booking system development",
  },
];

const drivers = [
  { title: "Number of pages", body: "A one-page site and a twelve-page site are different jobs. Each page needs its own copy, layout and search setup." },
  { title: "Who writes the words", body: "If the copy is written for you, that is part of the work. Sites stall waiting for content far more often than they wait on code." },
  { title: "Payments", body: "Paystack or Stripe checkout, receipts and order records add build and testing time, and are worth it if you sell online." },
  { title: "Bookings and accounts", body: "Anything with logins, calendars or a dashboard is software, not a brochure, and is priced like software." },
  { title: "Integrations", body: "WhatsApp, email tools, inventory or accounting systems. Each connection is scoped and quoted on its own." },
  { title: "Content you can edit", body: "A simple editing setup so you change prices and photos yourself costs a little more up front and saves calling a developer for every typo." },
];

const running = [
  "Domain name, renewed every year, registered in your name",
  "Hosting, which can be free or low cost for a fast static site",
  "Business email on your domain, if you want it",
  "Optional maintenance or changes after launch, quoted per job",
];

const questions = [
  "Will the domain and hosting be registered in my name?",
  "Is this a custom design or a template with my logo on it?",
  "Is the price fixed, and what exactly would make it change?",
  "Who writes the text on the pages?",
  "Will it load quickly on a phone on mobile data?",
  "Will you set up my Google Business Profile and submit the site to Google?",
  "Can I update prices and photos myself after launch?",
  "Can I see live sites you have built, not just screenshots?",
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: title,
        description,
        url,
        datePublished: updated,
        dateModified: updated,
        author: { "@type": "Person", name: profile.name, url: siteUrl },
        publisher: { "@type": "Person", name: profile.name, url: siteUrl },
        image: `${siteUrl}/og.jpg`,
        about: "Website design pricing in Nigeria",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Grain />
      <Nav />

      <main id="top" className="relative z-[2]">
        <section className="relative overflow-hidden px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
          <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative mx-auto max-w-content">
            <p className="text-sm font-light text-faint">
              Updated November 2026 · by {profile.name}, website designer in Kaduna
            </p>
            <h1 className="script mt-6 max-w-4xl text-[clamp(2.4rem,7vw,5.4rem)] text-paper">
              How much does a website cost in Nigeria?
            </h1>
            <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-muted md:text-xl">
              A proper business website in Nigeria costs between $500 and $1,500. Telegram sales bots
              start at $1,200 and booking systems at $3,500. Below is what each covers, what moves the
              price up or down, and the questions to ask any designer before you pay.
            </p>
          </div>
        </section>

        <section className="border-t border-line bg-deep px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-content">
            <h2 className="text-2xl font-light tracking-tight text-paper md:text-4xl">Price ranges, by what you need</h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {tiers.map((tier, i) => (
                <Reveal key={tier.name} delay={i * 0.06}>
                  <article className="flex h-full flex-col border border-line-hi bg-surface p-8">
                    <h3 className="text-lg font-medium text-paper">{tier.name}</h3>
                    <p className="display mt-5 text-3xl text-signal-hi md:text-4xl">{tier.price}</p>
                    <p className="mt-5 flex-1 text-[15px] font-light leading-relaxed text-muted">{tier.body}</p>
                    <Link
                      href={tier.href}
                      className="group mt-8 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-paper hover:text-signal-hi"
                    >
                      {tier.linkLabel}
                      <ArrowIcon className="h-3.5 w-3.5 text-signal transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-[13px] font-light text-faint">
              Prices are in US dollars and fixed before work starts. The final quote depends on scope, features and timeline.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-content">
            <h2 className="text-2xl font-light tracking-tight text-paper md:text-4xl">What changes the price</h2>
            <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
              {drivers.map((d) => (
                <div key={d.title} className="border-t border-line-hi pt-6">
                  <h3 className="text-lg font-medium text-paper">{d.title}</h3>
                  <p className="mt-3 max-w-[52ch] text-[15px] font-light leading-relaxed text-muted">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-deep px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-content gap-14 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className="text-2xl font-light tracking-tight text-paper md:text-3xl">Costs after launch</h2>
              <p className="mt-5 max-w-md text-[15px] font-light leading-relaxed text-muted">
                The build is a one-off. A few small things renew every year, and you should know about them before you start.
              </p>
              <ul className="mt-8 flex flex-col gap-4">
                {running.map((r) => (
                  <li key={r} className="flex gap-3 text-[15px] font-light leading-relaxed text-paper/90">
                    <span aria-hidden className="mt-[0.6em] h-0.5 w-3 shrink-0 bg-signal" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-light tracking-tight text-paper md:text-3xl">Ask any designer before you pay</h2>
              <p className="mt-5 max-w-md text-[15px] font-light leading-relaxed text-muted">
                Use these whoever you hire. A good designer answers all of them without hesitating.
              </p>
              <ul className="mt-8 flex flex-col gap-4">
                {questions.map((q) => (
                  <li key={q} className="flex items-start gap-3 text-[15px] font-light leading-relaxed text-paper/90">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal-deep/30 text-signal-hi ring-1 ring-signal/40">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 text-center md:px-10 md:py-32">
          <div className="mx-auto max-w-2xl">
            <h2 className="script text-[clamp(2.2rem,5.6vw,4rem)] text-paper">Get a fixed quote for yours.</h2>
            <p className="mt-6 text-base font-light leading-relaxed text-muted md:text-lg">
              Send a short description of your business and what you want the site to do. I reply with a fixed price, usually within a few hours.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-signal-deep px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-paper transition-colors duration-300 hover:bg-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-hi focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Start a project
              <ArrowIcon className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
