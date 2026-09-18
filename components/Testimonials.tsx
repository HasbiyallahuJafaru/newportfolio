"use client";

import { testimonials } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SplitText } from "./motion";

export function Testimonials() {
  // Rendered as an oversized lead quote plus hairline rows rather than three
  // equal cards, so this section doesn't repeat the Services grid family.
  const [lead, ...rest] = testimonials.items;

  return (
    <section
      id="clients"
      className="relative scroll-mt-24 overflow-hidden border-y border-line bg-void py-24 md:py-36"
    >
      {/* soft warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze/[0.07] blur-[140px]"
      />
      <div className="relative mx-auto max-w-content px-6 md:px-10">
        <h2 className="text-3xl font-medium tracking-tightest text-cream sm:text-4xl md:text-5xl">
          <SplitText text={testimonials.label} />
        </h2>

        <Reveal delay={0.05} className="mt-14">
          <figure className="relative max-w-3xl border-l-2 border-bronze/60 pl-7 md:pl-10">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-1 -top-9 select-none font-serif text-[6rem] leading-none text-bronze/20"
            >
              &ldquo;
            </span>
            <blockquote className="relative text-xl font-light leading-relaxed text-cream/95 md:text-2xl md:leading-[1.55]">
              {lead.quote}
            </blockquote>
            <figcaption className="mt-7 flex flex-wrap items-center gap-3 text-sm">
              <span className="font-medium text-cream">{lead.author}</span>
              <span aria-hidden className="h-px w-6 bg-line" />
              <span className="font-light text-muted">{lead.org}</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-16 grid border-t border-line md:grid-cols-2 md:divide-x md:divide-line">
          {rest.map((t, i) => (
            <Reveal
              key={t.author}
              delay={0.05 * i}
              className="border-b border-line py-8 md:px-8 md:first:pl-0 md:last:pr-0"
            >
              <blockquote className="text-[15px] font-light leading-relaxed text-muted">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 text-[13px]">
                <span className="font-medium text-cream">{t.author}</span>
                <span className="text-faint">, {t.org}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
