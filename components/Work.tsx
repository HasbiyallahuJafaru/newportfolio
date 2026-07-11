"use client";

import Image from "next/image";
import { work } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { ArrowIcon } from "./icons";

type WorkItem = (typeof work.items)[number];

function CardShell({
  item,
  children,
  className = "",
}: {
  item: WorkItem;
  children: React.ReactNode;
  className?: string;
}) {
  const href = item.action?.href;
  const interactive = Boolean(href);
  const Tag: any = interactive ? "a" : "div";
  return (
    <Tag
      {...(interactive
        ? { href, target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={`group relative block overflow-hidden rounded-3xl border border-line bg-raised/40 transition-colors duration-500 hover:border-bronze/50 ${className}`}
    >
      {children}
    </Tag>
  );
}

function Media({ item, className = "" }: { item: WorkItem; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-[900ms] ease-out will-change-transform group-hover:scale-[1.06]"
      />
      {/* warm duotone wash + bottom scrim for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 bg-bronze/15 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent"
      />
      <span className="absolute left-4 top-4 rounded-full border border-cream/15 bg-void/60 px-3 py-1 text-[11px] font-light uppercase tracking-[0.14em] text-cream backdrop-blur-md">
        {item.category}
      </span>
    </div>
  );
}

function Caption({ item }: { item: WorkItem }) {
  const interactive = Boolean(item.action?.href);
  return (
    <div className="flex flex-1 items-end justify-between gap-6 p-7 md:p-8">
      <div>
        <h3 className="text-2xl font-medium tracking-tight text-cream transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
          {item.title}
        </h3>
        <p className="mt-3 max-w-md text-[15px] font-light leading-relaxed text-muted">
          {item.body}
        </p>
      </div>
      {item.action && (
        <span
          className={`hidden shrink-0 items-center gap-2 whitespace-nowrap pb-1 text-sm font-medium sm:inline-flex ${
            interactive ? "text-cream" : "text-faint"
          }`}
        >
          {item.action.label}
          {interactive && (
            <ArrowIcon className="h-4 w-4 text-bronze transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          )}
        </span>
      )}
    </div>
  );
}

export function Work() {
  const [featured, ...rest] = work.items;

  return (
    <section
      id="work"
      className="mx-auto max-w-content scroll-mt-24 px-6 py-24 md:px-10 md:py-36"
    >
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionLabel>{work.label}</SectionLabel>
          <span className="text-sm font-light text-faint">
            {String(work.items.length).padStart(2, "0")} projects
          </span>
        </div>
      </Reveal>

      {/* Featured project — horizontal on desktop */}
      <Reveal delay={0.05} className="mt-12">
        <CardShell item={featured} className="md:grid md:grid-cols-2">
          <Media item={featured} className="aspect-[16/11] md:aspect-auto" />
          <Caption item={featured} />
        </CardShell>
      </Reveal>

      {/* Remaining projects — responsive card grid */}
      <RevealGroup className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((item) => (
          <RevealItem key={item.no} className="h-full">
            <CardShell item={item} className="flex h-full flex-col">
              <Media item={item} className="aspect-[16/10]" />
              <Caption item={item} />
            </CardShell>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
