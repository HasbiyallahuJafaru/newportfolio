"use client";

import { testimonials } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Testimonials() {
  return (
    <section
      id="clients"
      className="relative scroll-mt-24 overflow-hidden border-y border-light-line bg-paper py-24 text-ink md:py-36"
    >
      {/* soft warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze/[0.07] blur-[140px]"
      />
      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <Reveal>
          <SectionLabel tone="light">{testimonials.label}</SectionLabel>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <RevealItem key={i}>
              <figure className="flex h-full flex-col rounded-2xl border border-light-line bg-paper-raised p-8 shadow-md shadow-black/[0.06]">
                <span
                  aria-hidden
                  className="font-serif text-5xl leading-none text-bronze/60"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-4 flex-1 text-[15px] font-light leading-relaxed text-ink/90">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-light-line pt-5">
                  <p className="text-sm font-medium text-ink">{t.author}</p>
                  <p className="mt-0.5 text-[13px] font-light text-ink-muted">
                    {t.org}
                  </p>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
