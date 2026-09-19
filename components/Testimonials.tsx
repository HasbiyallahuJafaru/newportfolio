"use client";

import { testimonials } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Testimonials() {
  // An oversized lead quote plus two hairline columns, so this section does
  // not repeat the three-column shape Services already used.
  const [lead, ...rest] = testimonials.items;

  return (
    <section
      id="clients"
      className="scroll-mt-24 border-t border-line bg-ink py-24 md:py-32"
    >
      <div className="mx-auto max-w-content px-6 md:px-10">
        <h2 className="display text-[clamp(2rem,6vw,4.5rem)] text-paper">
          {testimonials.label}
        </h2>

        <Reveal delay={0.05} className="mt-14">
          <figure className="max-w-3xl border-l-2 border-signal pl-7 md:pl-10">
            <blockquote className="text-xl font-light leading-relaxed text-paper md:text-[1.75rem] md:leading-[1.5]">
              {lead.quote}
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-3 text-sm">
              <span className="font-medium text-paper">{lead.author}</span>
              <span aria-hidden className="h-px w-6 bg-line-hi" />
              <span className="font-light text-muted">{lead.org}</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-16 grid border-t border-line md:grid-cols-2">
          {rest.map((item) => (
            <Reveal key={item.org} delay={0.05}>
              <figure className="flex h-full flex-col border-b border-line py-10 md:border-b-0 md:border-l md:border-line-hi md:px-10 md:first:border-l-0 md:first:pl-0">
                <blockquote className="flex-1 text-[15px] font-light leading-relaxed text-muted">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 flex flex-wrap items-center gap-3 text-[13px]">
                  <span className="font-medium text-paper">{item.author}</span>
                  <span aria-hidden className="h-px w-5 bg-line-hi" />
                  <span className="font-light text-faint">{item.org}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
