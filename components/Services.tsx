"use client";

import Link from "next/link";
import { services } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { ArrowIcon } from "./icons";

// An index, not a row of cards: each service is a full-width line with the
// title set large. Hovering a line floods it with the signal colour from the
// left. The whole row is the link to that service's own page.
export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden border-y border-line bg-deep py-24 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-signal/[0.06] blur-[120px]"
      />
      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <Reveal>
          <h2 className="max-w-3xl text-2xl font-light leading-snug tracking-tight text-paper sm:text-3xl md:text-[2.6rem] md:leading-[1.2]">
            {services.intro}
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 border-t border-line-hi md:mt-20">
          {services.items.map((item) => (
            <RevealItem key={item.no}>
              <Link
                href={item.href}
                aria-label={`${item.title}: ${item.cta}`}
                className="group relative block overflow-hidden border-b border-line-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-signal-hi"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-signal-deep via-signal-deep/90 to-signal-deep/60 transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <article className="relative grid gap-x-8 gap-y-5 py-10 md:grid-cols-12 md:items-center md:py-12">
                  <span className="display text-sm text-signal transition-colors duration-500 group-hover:text-paper md:col-span-1">
                    {item.no}
                  </span>

                  <h3 className="text-[clamp(1.9rem,4.6vw,3.6rem)] font-light leading-[1.05] tracking-tight text-paper transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:col-span-5 md:group-hover:translate-x-3">
                    {item.title}
                  </h3>

                  <div className="md:col-span-5">
                    <p className="text-[15px] font-light leading-relaxed text-muted transition-colors duration-500 group-hover:text-paper/90">
                      {item.body}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                      {item.tags.map((tag) => (
                        <li
                          key={tag}
                          className="text-[10px] font-medium uppercase tracking-[0.18em] text-faint transition-colors duration-500 group-hover:text-paper/80"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span className="hidden md:col-span-1 md:flex md:justify-end">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line-hi text-paper transition-all duration-500 group-hover:rotate-45 group-hover:border-paper group-hover:bg-paper group-hover:text-signal-deep">
                      <ArrowIcon className="h-4 w-4" />
                    </span>
                  </span>
                </article>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
