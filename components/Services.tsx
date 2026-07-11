"use client";

import { services } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden border-y border-light-line bg-paper py-24 text-ink md:py-36"
    >
      {/* subtle warm accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-bronze/10 blur-[120px]"
      />
      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionLabel tone="light">{services.label}</SectionLabel>
            <h2 className="mt-6 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl md:text-5xl">
              {services.intro}
            </h2>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-3">
          {services.items.map((item) => (
            <RevealItem key={item.no}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-light-line bg-paper-raised p-8 shadow-sm shadow-black/5 transition-colors duration-500 hover:border-bronze/60">
                {/* hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-bronze/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />

                <span className="font-mono text-xs tracking-widest text-bronze">
                  {item.no}
                </span>

                <h3 className="mt-6 text-xl font-medium tracking-tight text-ink md:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-4 flex-1 text-[15px] font-light leading-relaxed text-ink-muted">
                  {item.body}
                </p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-light-line px-3 py-1 text-[11px] font-light uppercase tracking-[0.08em] text-ink-muted transition-colors duration-300 group-hover:border-bronze/40 group-hover:text-bronze"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
