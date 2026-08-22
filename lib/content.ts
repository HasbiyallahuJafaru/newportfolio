// ─────────────────────────────────────────────────────────────
// Single source of truth for all portfolio copy.
// Recovered from the original bundled site; edit here to update.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Hasbiyallahu Jafaru",
  shortName: "Jafaru",
  role: "Web Designer & Developer",
  email: "jhasbiyallahu@gmail.com",
  phoneDisplay: "+234 815 719 3900",
  whatsapp: "2348157193900",
  availability: "Available for projects · 2026",
};

export const whatsappUrl = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
  "Hi Hasbiyallahu, I'd like to discuss a project",
)}`;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Clients", href: "#clients" },
  { label: "Pricing", href: "#pricing" },
  { label: "Let's Talk", href: "#contact" },
];

export const hero = {
  eyebrow: profile.availability,
  lineOne: "Be easy to find,",
  lineTwo: "easy to buy from.",
  subtitle:
    "Websites, web apps and Telegram bots for businesses that want to show up on Google and stop losing hours to work their software should be doing.",
};

export const marquee = [
  "Web Design",
  "Web Applications",
  "Telegram Bots",
  "Paystack Integration",
  "UI / UX",
  "Full-Stack Development",
  "Automation",
  "E-Commerce",
];

export const about = {
  label: "About Me",
  headline: ["Work that pays", "for itself", "after launch."],
  paragraphs: [
    "I build the parts of a business your customers actually touch. The site they find when they search for what you sell, and the bot or booking page that takes the order and the payment while you are busy elsewhere.",
    "Every project starts with the job you need done rather than what looks good in a portfolio. You get something fast, code any developer can pick up later, and a walkthrough so you are never locked out of your own site.",
  ],
  stats: [
    { value: "3+", label: "Years Active" },
    { value: "20+", label: "Projects Delivered" },
    { value: "100%", label: "Client Satisfaction" },
  ],
};

export const services = {
  label: "What You Get",
  intro: "Three ways to get found online and take the manual work off your team.",
  items: [
    {
      no: "01",
      title: "Website Design",
      body: "A site that loads fast on a phone, says what you do within one screen, and gives a stranger a reason to contact you. Built to be found on Google from the day it goes live.",
      tags: ["UI / UX", "Responsive", "SEO"],
    },
    {
      no: "02",
      title: "Web App Development",
      body: "Bookings, dashboards and online stores. The jobs your team does by hand become a form the customer fills in, with the payment collected on the spot.",
      tags: ["Full-Stack", "APIs", "Payments"],
    },
    {
      no: "03",
      title: "Telegram Bot Development",
      body: "A bot that shows your catalogue, takes the order and collects payment through Paystack inside the chat. Receipts go out on their own, whether or not you are online.",
      tags: ["Paystack", "Automation"],
    },
  ],
};

export const work = {
  label: "Selected Work",
  items: [
    {
      no: "01",
      title: "Credible Hope Foundation",
      category: "Web Design · Non-Profit",
      body: "A donor-facing site for a non-profit. Mission, programmes and impact in plain language, so a first-time visitor understands who they are giving to.",
      image: "/images/work-crediblehope.jpg",
      imageAlt: "Credible Hope Foundation nonprofit website designed by Hasbiyallahu Jafaru — warm, mission-driven web design",
      action: { label: "Visit Site", href: "https://crediblehopefoundation.org" },
    },
    {
      no: "02",
      title: "InBookings Online",
      category: "Web App · Bookings",
      body: "An online booking platform. Customers reserve and pay for themselves, and the operator watches capacity fill without answering a single call.",
      image: "/images/work-inbookings.jpg",
      imageAlt: "InBookings Online — booking platform web app built by Hasbiyallahu Jafaru, full-stack developer",
      action: { label: "Visit Site", href: "https://inbookingsonline.com" },
    },
    {
      no: "03",
      title: "Sales Bot",
      category: "Telegram Bot · E-Commerce",
      body: "A Telegram sales bot. Customers browse the catalogue, order and pay with Paystack inside the chat, and the seller never has to confirm a transfer by hand.",
      image: "/images/work-salesbot.jpg",
      imageAlt:
        "Telegram sales bot with Paystack payment integration built by Hasbiyallahu Jafaru — e-commerce automation",
      action: { label: "Private Project", href: null },
    },
    {
      no: "04",
      title: "ZoomGuru",
      category: "AI Copilot · SaaS",
      body: "An AI interview copilot with real-time coaching, mock interviews and answer scoring, sold through a marketing site written to turn visitors into downloads.",
      image: "/images/work-zoomguru.jpg",
      imageAlt: "ZoomGuru AI interview copilot SaaS website — designed by Hasbiyallahu Jafaru, web application developer",
      action: { label: "Visit Site", href: "https://zoomguru.xyz" },
    },
    {
      no: "05",
      title: "Iklima Babangida",
      category: "Web Design · Photography",
      body: "A gallery-first portfolio for a fine art and documentary photographer. Full-bleed imagery, curated collections, and a CMS so she publishes a new series herself without calling a developer.",
      image: "/images/work-iklimababangida.jpg",
      imageAlt:
        "Iklima Babangida fine art photography portfolio website designed by Hasbiyallahu Jafaru — full-bleed gallery web design",
      action: { label: "Visit Site", href: "https://iklimababangida.com" },
    },
    {
      no: "06",
      title: "In Loving Memory",
      category: "Web App · Memorial",
      body: "A memorial page built for a grieving family. Friends submit tributes and photos from a phone, and every message is kept for the family as a permanent record.",
      image: "/images/work-arctersoo.jpg",
      imageAlt:
        "In Loving Memory — online memorial and tribute web app built by Hasbiyallahu Jafaru, web application developer",
      action: { label: "Visit Site", href: "https://arc-tersoo.netlify.app" },
    },
    {
      no: "07",
      title: "PDFGee",
      category: "Web App · Document Tools",
      body: "An offline-first PDF suite for editing, compressing, merging and signing documents. It installs as an app and runs locally, so sensitive files never leave the user's machine.",
      image: "/images/work-pdfgee.jpg",
      imageAlt:
        "PDFGee offline PDF software — document tools web app built by Hasbiyallahu Jafaru, full-stack developer",
      action: { label: "Visit Site", href: "https://pdfgee.com" },
    },
    {
      no: "08",
      title: "Bliss Urban Hotels",
      category: "Web Design · Hospitality",
      body: "A hotel site for a business address in Kaduna. Rooms, rates and what each one includes are laid out up front, alongside the restaurant, laundry and car hire, so a guest reserves without ringing the front desk to ask.",
      image: "/images/work-blissurbanhotels.jpg",
      imageAlt:
        "Bliss Urban Hotels & Suites Kaduna — hotel website with room booking designed by Hasbiyallahu Jafaru",
      action: { label: "Visit Site", href: "https://blissurbanhotels.com" },
    },
    {
      no: "09",
      title: "Hulul Media",
      category: "Web Design · Media",
      body: "An editorial site for a storytelling studio that turns research into human stories. Films, features and campaigns sit in one portfolio a funder can read through before deciding to commission the next one.",
      image: "/images/work-hululmedia.jpg",
      imageAlt:
        "Hulul Media storytelling and documentary studio website designed by Hasbiyallahu Jafaru — editorial web design",
      action: { label: "Visit Site", href: "https://hululmedia.netlify.app" },
    },
  ],
};

export const testimonials = {
  label: "What Clients Say",
  items: [
    {
      quote:
        "Hasbiyallahu delivered our website faster than expected and it looked better than we imagined. He genuinely understood what we needed and translated it perfectly.",
      author: "Foundation Director",
      org: "Credible Hope Foundation",
    },
    {
      quote:
        "The booking platform transformed our workflow completely. Clean, reliable, and our customers love how easy it is to use.",
      author: "Operations Manager",
      org: "InBookings Online",
    },
    {
      quote:
        "Our Telegram bot doubled our sales processing speed. The Paystack integration was seamless — customers pay and receive receipts without any manual effort.",
      author: "Business Owner",
      org: "E-Commerce Client",
    },
  ],
};

export const pricing = {
  label: "Pricing",
  headline: ["Simple, honest", "pricing."],
  intro:
    "One flat starting price, and a quote that only moves with scope. No hourly billing and no surprise invoice at handover.",
  startingAt: "$500",
  currencyNote: "USD · starting from",
  forText: "Websites & Telegram bots",
  includes: [
    "Custom design that holds up on every screen",
    "Paystack payments set up and tested",
    "Clean code any developer can pick up later",
    "Revisions until you are happy with it",
    "Launch, handover and a walkthrough so you can run it",
  ],
  footnote: "Final quote depends on scope, features, and timeline.",
  cta: "Start a Project",
};

export const contact = {
  label: "Get in Touch",
  headline: ["Tell me what's", "slowing you", "down."],
  body: "A site nobody finds, or orders you are still logging by hand. Send me the details and I'll tell you what it takes to fix it and what it costs.",
  reply: "I usually reply within a few hours.",
};
