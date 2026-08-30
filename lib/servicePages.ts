// ─────────────────────────────────────────────────────────────
// Standalone service pages. One page per search intent, because a
// single-page site can only realistically compete for one cluster of
// terms and these three sit in front of open SERPs (see the 30 Aug 2026
// landscape review).
//
// PRICES BELOW NEED YOUR SIGN-OFF. They are deliberately market-split:
// competitors ranking on the US booking-system SERP quote $15,000-$30,000
// and Canadian Telegram work is quoted at $1,200-$5,000, so the site's
// old flat "from $500" was anchoring far under the international market
// while reading as normal in Nigeria. Change any of these freely — they
// are referenced only from here.
// ─────────────────────────────────────────────────────────────

export type ServicePage = {
  slug: string;
  /** <title> — keep under ~60 chars so Google doesn't truncate it */
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: { lineOne: string; lineTwo: string };
  intro: string;
  priceFrom: string;
  priceNote: string;
  /** What's actually built. Technical specificity is what ranks here. */
  capabilities: { title: string; body: string }[];
  proof: {
    project: string;
    image: string;
    imageAlt: string;
    body: string;
    href: string | null;
  };
  /** Named so a visitor recognises their own situation in one of them. */
  useCases: string[];
  faq: { q: string; a: string }[];
  /** schema.org Service.serviceType */
  serviceType: string;
  areaServed: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "telegram-bot-development",
    metaTitle: "Telegram Bot Development for Business",
    metaDescription:
      "Custom Telegram bots that show your catalogue, take the order and collect payment inside the chat. Stripe or Paystack, receipts sent automatically. Built and deployed for you.",
    eyebrow: "Telegram Bot Development",
    h1: { lineOne: "Bots that take the order", lineTwo: "and collect the payment." },
    intro:
      "Most Telegram bots answer questions. The useful ones close sales. I build bots that show your catalogue, take an order, collect the money and send the receipt without you touching your phone, then keep running while you sleep.",
    priceFrom: "$1,200",
    priceNote: "Most bots land between $1,200 and $5,000 depending on how much they have to do.",
    capabilities: [
      {
        title: "Catalogue and ordering",
        body: "Products, variants, stock and pricing inside the chat. Customers browse, choose and confirm without leaving Telegram or being sent to a website.",
      },
      {
        title: "Payments and receipts",
        body: "Stripe for international customers, Paystack for Nigerian ones. The bot confirms the payment against the provider's webhook, not the customer's word for it, then issues the receipt itself.",
      },
      {
        title: "Built on webhooks, not polling",
        body: "Bots run on the Telegram Bot API over webhooks, so they respond immediately and cost nothing while idle. Inline queries, keyboards and deep links where they earn their place.",
      },
      {
        title: "An admin side that works",
        body: "Orders, customers and revenue in one place, with alerts when something needs you. A bot nobody can administer is a bot you will abandon in a month.",
      },
      {
        title: "Deployed and monitored",
        body: "Hosting, environment secrets, error alerting and restarts set up for you. Handed over running, not as a folder of code you have to figure out.",
      },
      {
        title: "Yours to keep",
        body: "Clean, commented source in your own repository. No per-message platform fee, no lock-in to a bot builder that raises its prices next year.",
      },
    ],
    proof: {
      project: "Sales Bot",
      image: "/images/work-salesbot.jpg",
      imageAlt:
        "Telegram sales bot with Paystack payment integration built by Hasbiyallahu Jafaru — customers browse a catalogue, order and pay inside the chat",
      body: "A Telegram sales bot for a retailer who was losing evenings to confirming bank transfers by hand. Customers browse the catalogue, order and pay with Paystack inside the chat, and the bot verifies each payment and issues the receipt on its own. The seller stopped confirming transfers manually the day it went live.",
      href: null,
    },
    useCases: [
      "Selling a catalogue without building a full online shop",
      "Taking bookings or appointments in chat",
      "Collecting payment for a service before the work starts",
      "Subscription or paid-community access control",
      "Order status and delivery updates that customers ask for themselves",
      "Internal tools: approvals, alerts and reports to your team",
    ],
    faq: [
      {
        q: "How long does a Telegram bot take to build?",
        a: "A straightforward ordering bot takes two to three weeks. Anything with custom logic, several payment routes or an admin dashboard runs to six weeks. You get a firm timeline with the quote, not after work starts.",
      },
      {
        q: "Can the bot take payments from outside Nigeria?",
        a: "Yes. Stripe handles international cards and Paystack handles Nigerian ones. A bot can run both and pick whichever fits the customer, so you are not turning away either side.",
      },
      {
        q: "Do I need my own server?",
        a: "No. Hosting, deployment and monitoring are set up as part of the build. Running costs are usually a few dollars a month, and they are yours rather than a platform fee paid to me.",
      },
      {
        q: "What happens if the bot breaks?",
        a: "Errors alert me before your customers notice. Every build includes a period of support after handover, and the source is yours, so you are never stuck with only one person who can touch it.",
      },
    ],
    serviceType: "Telegram Bot Development",
    areaServed: ["Nigeria", "United States", "Canada", "Worldwide"],
  },

  {
    slug: "booking-system-development",
    metaTitle: "Custom Booking System Development",
    metaDescription:
      "Custom booking and scheduling systems built to fit how your business actually works. Real-time availability, online payment and automatic reminders, without the agency price tag.",
    eyebrow: "Booking System Development",
    h1: { lineOne: "Booking systems that fill", lineTwo: "the calendar for you." },
    intro:
      "Off-the-shelf schedulers break the moment your business does something slightly unusual. Custom ones from an agency start around fifteen thousand dollars. I build the same thing, properly, for a fraction of that, because it is one developer who has already shipped it rather than a team billing through a project manager.",
    priceFrom: "$3,500",
    priceNote:
      "Agencies ranking for this work quote $15,000 to $30,000 for a basic build. Most of mine land between $3,500 and $9,000.",
    capabilities: [
      {
        title: "Real availability, not a form",
        body: "Live capacity that accounts for staff, resources, buffers, opening hours and the days you are closed. Double-bookings are prevented at the database, not with a warning message.",
      },
      {
        title: "Customers serve themselves",
        body: "Reserve, pay, reschedule and cancel without calling you. Every reschedule they handle themselves is a phone call you never take.",
      },
      {
        title: "Payment on booking",
        body: "Stripe or Paystack, taking full payment or a deposit at the point of reservation, with refunds and cancellation rules applied automatically to your policy.",
      },
      {
        title: "Reminders that cut no-shows",
        body: "Automatic email and WhatsApp reminders on your schedule. No-shows are the most expensive part of a booking business and the easiest to reduce.",
      },
      {
        title: "An operator's dashboard",
        body: "Today at a glance, upcoming load, manual overrides for the phone booking that will always happen, and exports for your accountant.",
      },
      {
        title: "Built to be handed over",
        body: "Next.js and Postgres, deployed on infrastructure you own, source in your repository. If you replace me later, any competent developer can pick it up.",
      },
    ],
    proof: {
      project: "InBookings Online",
      image: "/images/work-inbookings.jpg",
      imageAlt:
        "InBookings Online booking platform built by Hasbiyallahu Jafaru — customers reserve and pay online while the operator watches capacity fill",
      body: "A full booking platform where customers reserve and pay for themselves. The operator watches capacity fill through a dashboard instead of answering the phone, and the reservations that used to be taken by hand now arrive already paid for.",
      href: "https://inbookingsonline.com",
    },
    useCases: [
      "Hotels, guesthouses and short-let apartments",
      "Clinics, salons and studios booking by appointment",
      "Tours, classes and events with limited seats",
      "Equipment, vehicle and venue hire",
      "Consultants selling time in blocks",
      "Anything currently run out of a WhatsApp thread and a notebook",
    ],
    faq: [
      {
        q: "Why not just use Calendly or Square?",
        a: "If they fit, use them, and I will tell you so. They stop working once you need resource-level availability, unusual pricing rules, deposits with your own cancellation policy, or the booking flow to sit inside your own brand and domain. That is when a custom build pays for itself.",
      },
      {
        q: "How is this so much cheaper than an agency?",
        a: "No project manager, no account manager, no sales team taking a cut, and I have built this before rather than discovering it on your budget. You deal directly with the person writing the code.",
      },
      {
        q: "How long does it take?",
        a: "Six to ten weeks for a system with payments, reminders and an operator dashboard. You see working software from the second week, not a slide deck.",
      },
      {
        q: "Do you work with businesses outside Nigeria?",
        a: "Yes, most booking work is for clients in the United States and Canada. Timezones, currencies and card processing are handled as normal parts of the build, and I keep hours that overlap the North American working day.",
      },
    ],
    serviceType: "Booking System Development",
    areaServed: ["United States", "Canada", "United Kingdom", "Nigeria", "Worldwide"],
  },

  {
    slug: "web-design-kaduna",
    metaTitle: "Web Design in Kaduna",
    metaDescription:
      "Website design in Kaduna for businesses that want to be found on Google. Built by a Kaduna-based developer with hotel, hospitality and non-profit work behind him. Projects from $500.",
    eyebrow: "Web Design · Kaduna",
    h1: { lineOne: "Websites for Kaduna", lineTwo: "businesses that sell." },
    intro:
      "Most web design in Kaduna is a template, a logo dropped in, and an invoice. What you want is a site a stranger can land on from Google, understand in one screen and contact you from. I am based here, I have built for businesses on this side of the country, and you can go and look at them.",
    priceFrom: "$500",
    priceNote: "Most Kaduna business sites land between $500 and $1,500.",
    capabilities: [
      {
        title: "Found on Google from day one",
        body: "Proper titles, descriptions, structured data, a sitemap and a Google Business Profile set up alongside the site. Being findable is the point of having one.",
      },
      {
        title: "Fast on a Nigerian phone",
        body: "Compressed images, no bloated page builder, and pages that load on a patchy connection. Most of your visitors are on mobile data, and a slow site loses them before it renders.",
      },
      {
        title: "Written to convert, not to fill space",
        body: "What you do, who it is for and what to do next, said in the first screen. Copy is part of the build, not something you are left to write yourself.",
      },
      {
        title: "Payments and bookings where they help",
        body: "Paystack for local customers, Stripe if you sell abroad, and self-service booking if your business runs on appointments.",
      },
      {
        title: "You can update it",
        body: "A simple content setup so you change prices, photos and text yourself. No calling a developer to fix a typo.",
      },
      {
        title: "Hosting sorted",
        body: "Domain, hosting, SSL and email set up and explained. Handed over live and working, with the accounts in your name.",
      },
    ],
    proof: {
      project: "Bliss Urban Hotels",
      image: "/images/work-blissurbanhotels.jpg",
      imageAlt:
        "Bliss Urban Hotels & Suites Kaduna — hotel website with rooms, rates and booking designed by Hasbiyallahu Jafaru",
      body: "A hotel site for a business address in Kaduna. Rooms, rates and what each one includes are laid out up front, alongside the restaurant, laundry and car hire, so a guest reserves without ringing the front desk to ask. Built for a Kaduna business, running for a Kaduna business.",
      href: "https://blissurbanhotels.com",
    },
    useCases: [
      "Hotels, guesthouses and event centres",
      "Clinics, schools and professional practices",
      "Shops and traders moving online",
      "Non-profits and foundations that need donors to trust them",
      "Contractors and services quoting for work",
      "Anyone currently sending customers to an Instagram page",
    ],
    faq: [
      {
        q: "Are you actually based in Kaduna?",
        a: "Yes. I am in Kaduna and I meet clients here. Bliss Urban Hotels is a Kaduna business and the site is live, so you can look at real work rather than a portfolio of stock templates.",
      },
      {
        q: "What does a website cost in Kaduna?",
        a: "Most business sites here land between $500 and $1,500 depending on how many pages and whether you need payments or bookings. You get a fixed quote before anything starts, not an hourly rate that drifts.",
      },
      {
        q: "How long will it take?",
        a: "Two to four weeks for a standard business site, assuming you can get me your content and photos. Sites wait on content far more often than they wait on code.",
      },
      {
        q: "Will it show up on Google?",
        a: "The site is built to be indexed properly and I set up your Google Business Profile with it, which is what actually puts a Kaduna business on the map results. Ranking takes weeks rather than days, and anyone promising page one immediately is selling you something.",
      },
    ],
    serviceType: "Web Design",
    areaServed: ["Kaduna", "Zaria", "Abuja", "Nigeria"],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((p) => p.slug === slug);
}
