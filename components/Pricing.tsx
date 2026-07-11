"use client";

import { pricing, whatsappUrl } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-4 w-4 shrink-0 text-bronze-lite"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 overflow-hidden border-t border-line bg-void py-24 md:py-36"
    >
      {/* accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-bronze/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <div className="flex justify-center">
              <SectionLabel>{pricing.label}</SectionLabel>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-4xl font-medium leading-[1.05] tracking-tightest sm:text-5xl md:text-6xl">
              <span className="text-cream">{pricing.headline[0]} </span>
              <span className="text-gradient">{pricing.headline[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-muted md:text-[17px]">
              {pricing.intro}
            </p>
          </Reveal>
        </div>

        {/* Price card */}
        <Reveal delay={0.12} className="mx-auto mt-14 max-w-3xl">
          <div className="rounded-[1.8rem] bg-gradient-to-br from-bronze/60 via-line to-bronze/20 p-px shadow-2xl shadow-black/40">
            <div className="grid gap-10 rounded-[1.75rem] bg-raised/90 p-8 backdrop-blur md:grid-cols-2 md:p-12">
              {/* Price */}
              <div className="flex flex-col justify-center border-b border-line pb-8 md:border-b-0 md:border-r md:pb-0 md:pr-10">
                <span className="text-[11px] font-light uppercase tracking-[0.18em] text-bronze-lite">
                  {pricing.currencyNote}
                </span>
                <span className="mt-3 text-6xl font-semibold tracking-tightest text-gradient md:text-7xl">
                  {pricing.startingAt}
                </span>
                <span className="mt-3 text-[15px] font-light text-muted">
                  {pricing.forText}
                </span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-bronze px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.06em] text-cream transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-lite"
                >
                  {pricing.cta}
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
              </div>

              {/* Includes */}
              <ul className="flex flex-col justify-center gap-3.5">
                {pricing.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[15px] font-light text-cream/90"
                  >
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-5 text-center text-[13px] font-light text-faint">
            {pricing.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
