"use client";

import { useEffect, useState } from "react";
import { contact, profile, whatsappUrl } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Magnetic } from "./motion";
import { SignalField } from "./SignalField";
import { WhatsAppIcon, MailIcon, PhoneIcon, ArrowIcon, CopyIcon, CheckIcon } from "./icons";

// Clients are in Nigeria and in North America, so "when will he see this" is
// a real question. The local time answers it. Rendered after mount only, so
// the server and client never disagree about the minute.
function useKadunaTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Lagos",
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(profile.email).then(() => setCopied(true), () => {});
      }}
      className="relative z-10 flex h-9 shrink-0 items-center gap-2 rounded-full border border-line-hi px-3.5 text-[11px] font-medium uppercase tracking-[0.12em] text-muted transition-colors duration-300 hover:border-signal hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-hi"
      aria-label={copied ? "Email address copied" : "Copy email address"}
    >
      {copied ? <CheckIcon className="h-3.5 w-3.5 text-signal-hi" /> : <CopyIcon className="h-3.5 w-3.5" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

const routes = [
  { icon: WhatsAppIcon, label: "WhatsApp", value: profile.phoneDisplay, href: whatsappUrl, external: true },
  { icon: MailIcon, label: "Email", value: profile.email, href: `mailto:${profile.email}`, external: false, copy: true },
  { icon: PhoneIcon, label: "Phone", value: profile.phoneDisplay, href: `tel:+${profile.whatsapp}`, external: false },
];

export function Contact() {
  const time = useKadunaTime();

  return (
    <section
      id="contact"
      data-field-zone
      className="relative scroll-mt-24 overflow-hidden border-t border-line bg-ink"
    >
      <SignalField intensity={0.7} cell={11} />
      {/* Keep the centre clear for the type; the field lives at the edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_58%_at_50%_42%,#0b0b0c_30%,rgba(11,11,12,0.82)_58%,rgba(11,11,12,0.35)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="relative mx-auto max-w-content px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-40">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="script max-w-4xl text-[clamp(2.6rem,7.4vw,6rem)] text-paper">
            {contact.headline.join(" ")}
          </h2>
          <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-muted md:text-lg">
            {contact.body}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 flex flex-col items-center md:mt-16">
          <Magnetic strength={0.35}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-44 w-44 flex-col items-center justify-center gap-3 overflow-hidden rounded-full bg-signal-deep text-paper shadow-[0_30px_90px_-20px_rgba(228,50,63,0.7)] transition-transform duration-500 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-4 focus-visible:ring-offset-ink md:h-52 md:w-52"
            >
              <span
                aria-hidden
                className="absolute inset-0 scale-0 rounded-full bg-paper transition-transform duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100"
              />
              <span
                aria-hidden
                className="absolute inset-2 rounded-full border border-paper/20 transition-colors duration-500 group-hover:border-ink/10"
              />
              <ArrowIcon className="relative h-6 w-6 transition-[transform,color] duration-500 group-hover:rotate-45 group-hover:text-signal-deep" />
              <span className="relative text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors duration-500 group-hover:text-ink">
                Start a project
              </span>
            </a>
          </Magnetic>

          <p className="mt-10 text-center text-[13px] font-light text-faint">
            {time ? (
              <>
                It&rsquo;s <span className="tabular-nums text-paper">{time}</span> in Kaduna.{" "}
              </>
            ) : null}
            {contact.reply}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="mt-20 grid border-t border-line-hi md:mt-24 md:grid-cols-3">
            {routes.map(({ icon: Icon, label, value, href, external, copy }) => (
              <li
                key={label}
                className="group relative flex items-center gap-4 border-b border-line py-7 md:border-b-0 md:border-l md:border-line-hi md:px-8 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-hi text-signal-hi transition-colors duration-300 group-hover:border-signal group-hover:bg-signal-deep group-hover:text-paper">
                  <Icon className="h-5 w-5" />
                </span>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="min-w-0 flex-1 after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-signal-hi"
                >
                  <span className="block text-xs font-light text-faint">{label}</span>
                  <span className="mt-1 block truncate text-[15px] font-medium text-paper">{value}</span>
                </a>
                {copy ? (
                  <CopyEmail />
                ) : (
                  <ArrowIcon className="h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal" />
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
