"use client";

import Image from "next/image";
import { work } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ArrowIcon } from "./icons";

type WorkItem = (typeof work.items)[number];

function Project({ item, priority }: { item: WorkItem; priority: boolean }) {
  const href = item.action?.href;
  const Tag: any = href ? "a" : "div";

  return (
    <Tag
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group block border-t border-line-hi pt-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-hi md:pt-10"
    >
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7 lg:col-span-8">
          <div className="relative aspect-[16/10] overflow-hidden bg-surface">
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transition-transform duration-[900ms] ease-out will-change-transform group-hover:scale-[1.03]"
            />
          </div>
        </div>

        <div className="flex flex-col md:col-span-5 lg:col-span-4">
          <span className="display text-5xl text-signal md:text-6xl">
            {item.no}
          </span>
          <h3 className="mt-5 text-2xl font-medium tracking-tight text-paper md:text-3xl">
            {item.title}
          </h3>
          <p className="mt-2 text-[11px] font-light uppercase tracking-[0.16em] text-faint">
            {item.category}
          </p>
          <p className="mt-5 text-[15px] font-light leading-relaxed text-muted">
            {item.body}
          </p>
          {item.action && (
            <span
              className={`mt-7 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] ${
                href ? "text-paper" : "text-faint"
              }`}
            >
              {item.action.label}
              {href && (
                <ArrowIcon className="h-4 w-4 text-signal transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              )}
            </span>
          )}
        </div>
      </div>
    </Tag>
  );
}

export function Work() {
  return (
    <section
      id="work"
      className="mx-auto max-w-content scroll-mt-24 px-6 py-24 md:px-10 md:py-32"
    >
      <Reveal>
        <div className="flex items-end justify-between gap-6 pb-10">
          <h2 className="script text-[clamp(2.2rem,6vw,4.6rem)] text-paper">
            {work.label}
          </h2>
          <span className="display shrink-0 pb-2 text-lg text-signal">
            {String(work.items.length).padStart(2, "0")}
          </span>
        </div>
      </Reveal>

      <div className="flex flex-col gap-20 md:gap-28">
        {work.items.map((item, i) => (
          <Reveal key={item.no} delay={0.05}>
            <Project item={item} priority={i === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
