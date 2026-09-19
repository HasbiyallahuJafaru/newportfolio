"use client";

import { pricing, whatsappUrl } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ArrowRightIcon } from "./icons";

export function Pricing() {
  return (
    <section
      id="pricing"
      className="scroll-mt-24 border-t border-line bg-deep py-24 md:py-32"
    >
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-5">
            <h2 className="display text-[clamp(1.6rem,4.2vw,3.2rem)] text-paper">
              {pricing.headline.join(" ")}
            </h2>
            <p className="mt-7 max-w-md text-base font-light leading-relaxed text-muted">
              {pricing.intro}
            </p>
          </Reveal>

          {/* Price and scope share one bordered panel. The number is set in
              the display face so it carries the same weight as a headline. */}
          <Reveal delay={0.1} className="md:col-span-7">
            <div className="border border-line-hi bg-surface">
              <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line p-8 md:p-10">
                <div>
                  <span className="text-[10px] font-light uppercase tracking-[0.18em] text-faint">
                    {pricing.currencyNote}
                  </span>
                  <span className="display mt-3 block text-6xl text-paper md:text-7xl">
                    {pricing.startingAt}
                  </span>
                  <span className="mt-3 block text-[15px] font-light text-muted">
                    {pricing.forText}
                  </span>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-signal-deep px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-paper transition-colors duration-300 hover:bg-signal active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-hi focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                >
                  Start a project
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>

              <ul className="grid gap-x-10 gap-y-4 p-8 sm:grid-cols-2 md:p-10">
                {pricing.includes.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] font-light leading-relaxed text-paper/90"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.55em] h-0.5 w-3 shrink-0 bg-signal"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-5 text-[13px] font-light text-faint">
              {pricing.footnote}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
