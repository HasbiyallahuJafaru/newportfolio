"use client";

import Link from "next/link";
import { pricing, whatsappUrl } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { ArrowRightIcon, CheckIcon } from "./icons";
import { Magnetic, SpotlightCard } from "./motion";
import { SignalField } from "./SignalField";

// The price is the subject, so it gets the stage: one card, the number set
// as large as the page allows, standing on the live signal field. What the
// price buys sits beside it as a short checklist.
export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 overflow-hidden border-t border-line bg-deep py-24 md:py-36"
    >
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-12 lg:gap-16">
          {/* Price card. Second on a phone, after the headline that explains it. */}
          <Reveal className="order-2 md:order-1 md:col-span-7">
            <SpotlightCard tilt={4} radius={420} className="ring-1 ring-line-hi">
              <div
                data-field-zone
                className="relative flex min-h-[460px] flex-col justify-between overflow-hidden bg-ink p-8 md:min-h-[560px] md:p-12"
              >
                <SignalField intensity={1.15} cell={10} />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_95%_at_0%_100%,#0b0b0c_38%,rgba(11,11,12,0.72)_62%,rgba(11,11,12,0.15)_100%)]"
                />

                <p className="relative max-w-[16rem] text-sm font-light leading-relaxed text-paper/80">
                  {pricing.forText}
                </p>

                <div className="relative">
                  <p className="text-sm font-light text-paper/80">Starting from, in USD</p>
                  <p className="mt-2 flex items-start gap-3">
                    <span className="display text-[clamp(5.5rem,13vw,10.5rem)] leading-[0.9] text-paper">
                      {pricing.startingAt}
                    </span>
                  </p>

                  <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                    <Magnetic strength={0.25}>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-paper py-4 pl-7 pr-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink transition-transform duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-hi focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                      >
                        <span
                          aria-hidden
                          className="absolute inset-0 -translate-x-full bg-signal transition-transform duration-500 ease-out group-hover:translate-x-0"
                        />
                        <span className="relative transition-colors duration-500 group-hover:text-paper">
                          {pricing.cta}
                        </span>
                        <ArrowRightIcon className="relative h-4 w-4 transition-[transform,color] duration-500 group-hover:translate-x-0.5 group-hover:text-paper" />
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </SpotlightCard>
            <p className="mt-5 text-[13px] font-light text-faint">
              {pricing.footnote}{" "}
              <Link href="/website-design-price-nigeria" className="text-muted underline decoration-line-hi underline-offset-4 transition-colors hover:text-paper">
                See the full price guide for Nigeria
              </Link>
            </p>
          </Reveal>

          {/* Headline and what's included. */}
          <div className="order-1 md:order-2 md:col-span-5">
            <Reveal>
              <h2 className="script text-[clamp(2.4rem,5.6vw,4.4rem)] text-paper">
                {pricing.headline.join(" ")}
              </h2>
              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-muted">
                {pricing.intro}
              </p>
            </Reveal>

            <RevealGroup className="mt-10 flex flex-col gap-5" stagger={0.08}>
              {pricing.includes.map((item) => (
                <RevealItem key={item} y={14}>
                  <p className="flex items-start gap-4 text-[15px] font-light leading-relaxed text-paper/90">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal-deep/30 text-signal-hi ring-1 ring-signal/40">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
