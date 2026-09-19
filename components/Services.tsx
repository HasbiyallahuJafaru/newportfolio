"use client";

import Link from "next/link";
import { services } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { ArrowIcon } from "./icons";

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-24 border-y border-line bg-deep py-24 md:py-32"
    >
      <div className="mx-auto max-w-content px-6 md:px-10">
        <Reveal>
          <h2 className="max-w-3xl text-2xl font-light leading-snug tracking-tight text-paper sm:text-3xl md:text-[2.5rem] md:leading-[1.25]">
            {services.intro}
          </h2>
        </Reveal>

        {/* Columns separated by the page's hairline rather than boxed into
            cards. Three cards side by side is the shape every template
            ships; three columns of a rule is a grid. */}
        <RevealGroup className="mt-16 grid border-t border-line-hi md:grid-cols-3">
          {services.items.map((item) => (
            <RevealItem key={item.no} className="h-full">
              <article className="flex h-full flex-col border-b border-line py-10 md:border-b-0 md:border-l md:border-line-hi md:px-8 md:first:border-l-0 md:first:pl-0 md:last:pr-0">
                <span className="display text-2xl text-signal">{item.no}</span>

                <h3 className="mt-6 text-xl font-medium tracking-tight text-paper md:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-4 flex-1 text-[15px] font-light leading-relaxed text-muted">
                  {item.body}
                </p>

                <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-[10px] font-light uppercase tracking-[0.18em] text-faint"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <Link
                  href={item.href}
                  className="group mt-8 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-paper transition-colors duration-300 hover:text-signal-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-hi"
                >
                  {item.cta}
                  <ArrowIcon className="h-3.5 w-3.5 text-signal transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
