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
  lineOne: "Your #1 plug for",
  lineTwo: "Web Apps & Bots.",
  subtitle:
    "Clean code. Purposeful design. Real results — bespoke websites, web applications, and Telegram automation, delivered without compromise.",
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
  headline: ["Crafting digital", "experiences", "that endure."],
  paragraphs: [
    "I'm a developer and designer with a sharp focus on building web applications, bespoke websites, and Telegram automation tools that work flawlessly and look effortless.",
    "Every project is treated with the same discipline — clean architecture, intentional design, and delivery that meets the brief without compromise.",
  ],
  stats: [
    { value: "3+", label: "Years Active" },
    { value: "20+", label: "Projects Delivered" },
    { value: "100%", label: "Client Satisfaction" },
  ],
};

export const services = {
  label: "What I Build",
  intro: "Three focused disciplines, executed with depth and precision.",
  items: [
    {
      no: "01",
      title: "UI / UX Design",
      body: "Bespoke websites that balance beauty and function. From landing pages to full brand presences — every element considered.",
      tags: ["UI / UX", "Responsive", "Brand"],
    },
    {
      no: "02",
      title: "Web App Development",
      body: "Full-featured web apps built for scale. Booking systems, dashboards, e-commerce — engineered for real users.",
      tags: ["Full-Stack", "APIs", "Payments"],
    },
    {
      no: "03",
      title: "Telegram Bot Development",
      body: "Custom bots that automate sales, support, and workflows. Integrated with Paystack and third-party services.",
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
      body: "A full website for a non-profit — communicating mission, programs and impact with clarity and warmth. Built to build trust.",
      image: "/images/work-crediblehope.jpg",
      imageAlt: "Screenshot of the Credible Hope Foundation website",
      action: { label: "Visit Site", href: "https://crediblehopefoundation.org" },
    },
    {
      no: "02",
      title: "InBookings Online",
      category: "Web App · Bookings",
      body: "A full-featured online booking platform — streamlining scheduling, capacity, and delivering a frictionless UX for operators and users alike.",
      image: "/images/work-inbookings.jpg",
      imageAlt: "Screenshot of the InBookings Online website",
      action: { label: "Visit Site", href: "https://inbookingsonline.com" },
    },
    {
      no: "03",
      title: "Sales Bot",
      category: "Telegram Bot · E-Commerce",
      body: "An end-to-end Telegram sales bot — catalogue browsing, order management, and Paystack payment collection. Zero friction for seller and buyer.",
      image: "/images/work-salesbot.jpg",
      imageAlt:
        "A Telegram sales bot chat — product catalogue, order, and Paystack payment",
      action: { label: "Private Project", href: null },
    },
    {
      no: "04",
      title: "ZoomGuru",
      category: "AI Copilot · SaaS",
      body: "An AI-powered interview copilot — real-time coaching, mock interviews, answer scoring, and document analysis, wrapped in a clean, conversion-focused marketing site.",
      image: "/images/work-zoomguru.jpg",
      imageAlt: "Screenshot of the ZoomGuru website",
      action: { label: "Visit Site", href: "https://zoomguru.xyz" },
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
    "Transparent rates with no surprises. Websites and Telegram bots start at a flat entry price — the final quote scales with scope.",
  startingAt: "$500",
  currencyNote: "USD · starting from",
  forText: "Websites & Telegram bots",
  includes: [
    "Custom design & responsive build",
    "Paystack / payment integration",
    "Clean, maintainable code",
    "Revisions until it's right",
    "Deployment & handover",
  ],
  footnote: "Final quote depends on scope, features, and timeline.",
  cta: "Start a Project",
};

export const contact = {
  label: "Get in Touch",
  headline: ["Let's build", "something", "together."],
  body: "Have a project in mind? I'd love to hear about it. Reach out directly and let's make it real.",
  reply: "I usually reply within a few hours.",
};
