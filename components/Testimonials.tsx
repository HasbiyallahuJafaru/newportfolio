"use client";

import { testimonials } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Testimonials() {
  // Centred, and built around one large quote rather than a row of equal
  // cards. The supporting two sit quietly underneath on a shared rule.
  const [lead, ...rest] = testimonials.items;

  return (
    <section
      id="clients"
      className="scroll-mt-24 border-t border-line bg-ink py-24 md:py-36"
    >
      <div className="mx-auto max-w-content px-6 md:px-10">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="script text-[clamp(2.2rem,6vw,4.6rem)] text-paper">
            {testimonials.label}
          </h2>
          {/* Short centred mark in place of the left border the quote used
              to hang off, which only works in a left-aligned column. */}
          <span aria-hidden className="mt-8 h-0.5 w-16 bg-signal" />
        </Reveal>

        <Reveal delay={0.05}>
          <figure className="mx-auto mt-12 max-w-3xl text-center md:mt-14">
            <blockquote className="text-xl font-light leading-relaxed text-paper md:text-[1.9rem] md:leading-[1.45]">
              {lead.quote}
            </blockquote>
            <figcaption className="mt-9 flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="font-medium text-paper">{lead.author}</span>
              <span aria-hidden className="h-px w-6 bg-line-hi" />
              <span className="font-light text-muted">{lead.org}</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mx-auto mt-20 grid max-w-4xl border-t border-line md:mt-24 md:grid-cols-2">
          {rest.map((item) => (
            <Reveal key={item.org} delay={0.05}>
              <figure className="flex h-full flex-col items-center border-b border-line py-10 text-center md:border-b-0 md:border-l md:border-line-hi md:px-10 md:first:border-l-0">
                <blockquote className="flex-1 text-[15px] font-light leading-relaxed text-muted">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[13px]">
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
