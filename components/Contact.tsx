"use client";

import { contact, profile, whatsappUrl } from "@/lib/content";
import { Reveal } from "./Reveal";
import { WhatsAppIcon, MailIcon, PhoneIcon, ArrowIcon, PinIcon } from "./icons";

// Each route shows the address it actually reaches. An icon tile alone makes
// the visitor click to find out where it goes.
const routes = [
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: profile.phoneDisplay,
    href: whatsappUrl,
    external: true,
    primary: true,
  },
  {
    icon: MailIcon,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
    primary: false,
  },
  {
    icon: PhoneIcon,
    label: "Phone",
    value: profile.phoneDisplay,
    href: `tel:+${profile.whatsapp}`,
    external: false,
    primary: false,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-line bg-ink px-6 py-24 md:px-10 md:py-36"
    >
      <div className="mx-auto grid max-w-content gap-14 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-6">
          <h2 className="display text-[clamp(1.9rem,5.2vw,4rem)] text-paper">
            {contact.headline.join(" ")}
          </h2>
          <p className="mt-8 max-w-md text-base font-light leading-relaxed text-muted md:text-lg">
            {contact.body}
          </p>
          <p className="mt-6 text-[13px] font-light text-faint">
            {contact.reply}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-6 md:pl-12">
          <ul className="border-t border-line-hi">
            {routes.map(({ icon: Icon, label, value, href, external, primary }) => (
              <li key={label} className="border-b border-line">
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-5 py-6 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-hi"
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      primary
                        ? "bg-signal-deep text-paper group-hover:bg-signal"
                        : "border border-line-hi text-signal-hi group-hover:border-signal"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-light uppercase tracking-[0.18em] text-faint">
                      {label}
                    </span>
                    <span className="mt-1 block truncate text-[15px] font-medium text-paper md:text-base">
                      {value}
                    </span>
                  </span>
                  <ArrowIcon className="h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:text-signal group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </li>
            ))}
            <li className="flex items-center gap-5 border-b border-line py-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-faint">
                <PinIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[10px] font-light uppercase tracking-[0.18em] text-faint">
                  Based in
                </span>
                <span className="mt-1 block text-[15px] font-medium text-muted md:text-base">
                  Kaduna, Nigeria
                </span>
              </span>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
