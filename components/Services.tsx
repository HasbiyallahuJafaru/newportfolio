"use client";

import Link from "next/link";
import { services } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SplitText, SpotlightCard } from "./motion";
import { ArrowIcon } from "./icons";

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden border-y border-line bg-sunk py-24 md:py-36"
    >
      {/* subtle warm accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-bronze/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-medium leading-tight tracking-tight text-cream sm:text-4xl md:text-5xl">
            <SplitText text={services.intro} stagger={0.028} />
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-3">
          {services.items.map((item) => (
            <RevealItem key={item.no} className="h-full">
              <SpotlightCard className="h-full rounded-2xl" tilt={0}>
                <article className="relative flex h-full flex-col rounded-2xl border border-line bg-raised/40 p-8 transition-colors duration-500 group-hover/spot:border-bronze/50">
                  <span className="font-mono text-xs tracking-widest text-bronze">
                    {item.no}
                  </span>

                  <h3 className="mt-6 text-xl font-medium tracking-tight text-cream md:text-2xl">
                    {item.title}
                  </h3>

                  <p className="mt-4 flex-1 text-[15px] font-light leading-relaxed text-muted">
                    {item.body}
                  </p>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line px-3 py-1 text-[11px] font-light uppercase tracking-[0.08em] text-muted transition-colors duration-300 group-hover/spot:border-bronze/40 group-hover/spot:text-bronze-lite"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={item.href}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-bronze-lite transition-colors duration-300 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
                  >
                    {item.cta}
                    <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/spot:translate-x-1" />
                  </Link>
                </article>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
