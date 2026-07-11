"use client";

import { contact, profile, whatsappUrl } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { WhatsAppIcon, MailIcon, PhoneIcon } from "./icons";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-line px-6 py-24 md:px-10 md:py-40"
      style={{
        background:
          "radial-gradient(120% 85% at 50% 100%, #251b12 0%, #1a1816 55%)",
      }}
    >
      {/* soft warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-bronze/15 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-content gap-16 md:grid-cols-[1.1fr_1fr] md:gap-24">
        {/* Headline */}
        <Reveal>
          <SectionLabel>{contact.label}</SectionLabel>
          <h2 className="mt-7 text-5xl font-medium leading-[1.02] tracking-tightest sm:text-6xl md:text-7xl">
            <span className="text-cream">{contact.headline[0]} </span>
            <span className="text-gradient">{contact.headline[1]} </span>
            <span className="text-faint">{contact.headline[2]}</span>
          </h2>
          <p className="mt-8 max-w-md text-base font-light leading-relaxed text-muted md:text-lg">
            {contact.body}
          </p>
        </Reveal>

        {/* Contact rail — side-by-side social buttons */}
        <Reveal delay={0.12} className="flex flex-col justify-center gap-6">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message me on WhatsApp"
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-bronze/40 bg-bronze/10 px-3 py-7 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-bronze hover:bg-bronze/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bronze text-cream transition-transform duration-300 group-hover:scale-105">
                <WhatsAppIcon className="h-6 w-6" />
              </span>
              <span className="text-[13px] font-medium text-cream">WhatsApp</span>
            </a>

            <a
              href={`mailto:${profile.email}`}
              aria-label={`Email ${profile.email}`}
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-raised/40 px-3 py-7 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-bronze hover:bg-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-void text-bronze-lite transition-colors duration-300 group-hover:border-bronze/60 group-hover:text-bronze">
                <MailIcon className="h-6 w-6" />
              </span>
              <span className="text-[13px] font-medium text-cream">Email</span>
            </a>

            <a
              href={`tel:+${profile.whatsapp}`}
              aria-label={`Call ${profile.phoneDisplay}`}
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-raised/40 px-3 py-7 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-bronze hover:bg-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-void text-bronze-lite transition-colors duration-300 group-hover:border-bronze/60 group-hover:text-bronze">
                <PhoneIcon className="h-6 w-6" />
              </span>
              <span className="text-[13px] font-medium text-cream">Phone</span>
            </a>
          </div>

          <p className="text-center text-[13px] font-light text-faint">
            {contact.reply}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
