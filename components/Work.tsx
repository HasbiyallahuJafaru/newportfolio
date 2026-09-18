"use client";

import Image from "next/image";
import { work } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SplitText, SpotlightCard } from "./motion";
import { ArrowIcon } from "./icons";

type WorkItem = (typeof work.items)[number];

function Media({
  item,
  className = "",
  priority = false,
}: {
  item: WorkItem;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-[900ms] ease-out will-change-transform group-hover/spot:scale-[1.06]"
      />
      {/* warm duotone wash + bottom scrim for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 bg-bronze/15 mix-blend-multiply transition-opacity duration-500 group-hover/spot:opacity-0"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent"
      />
    </div>
  );
}

function Caption({ item }: { item: WorkItem }) {
  const interactive = Boolean(item.action?.href);
  return (
    <div className="flex flex-1 items-end justify-between gap-6 p-7 md:p-8">
      <div>
        {/* Category sits in the caption, not over the screenshot: labels
            floating on artwork read as clutter and fight the image. */}
        <p className="mb-2.5 text-[11px] font-light uppercase tracking-[0.14em] text-bronze-lite">
          {item.category}
        </p>
        <h3 className="text-2xl font-medium tracking-tight text-cream transition-transform duration-500 group-hover/spot:translate-x-1 md:text-3xl">
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
            <ArrowIcon className="h-4 w-4 text-bronze transition-transform duration-300 group-hover/spot:translate-x-1 group-hover/spot:-translate-y-1" />
          )}
        </span>
      )}
    </div>
  );
}

function Card({ item, featured = false }: { item: WorkItem; featured?: boolean }) {
  const href = item.action?.href;
  const interactive = Boolean(href);
  const Tag: any = interactive ? "a" : "div";

  return (
    <SpotlightCard className="h-full rounded-3xl" tilt={featured ? 0 : 4.5}>
      <Tag
        {...(interactive
          ? { href, target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className={`relative block h-full overflow-hidden rounded-3xl border border-line bg-raised/40 transition-colors duration-500 group-hover/spot:border-bronze/50 ${
          featured ? "md:grid md:grid-cols-2" : "flex flex-col"
        }`}
      >
        <Media
          item={item}
          priority={featured}
          className={featured ? "aspect-[16/11] md:aspect-auto md:h-full" : "aspect-[16/10]"}
        />
        <Caption item={item} />
      </Tag>
    </SpotlightCard>
  );
}

export function Work() {
  // Every card the same size, no half-empty rows: the wide featured card only
  // earns its place while the rest still fill whole rows of three.
  const featured = (work.items.length - 1) % 3 === 0 ? work.items[0] : null;
  const cards = featured ? work.items.slice(1) : work.items;

  return (
    <section
      id="work"
      className="mx-auto max-w-content scroll-mt-24 px-6 py-24 md:px-10 md:py-36"
    >
      <Reveal>
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl font-medium tracking-tightest text-cream sm:text-4xl md:text-5xl">
            <SplitText text={work.label} />
          </h2>
          <span className="shrink-0 pb-1 text-sm font-light text-faint">
            {String(work.items.length).padStart(2, "0")} projects
          </span>
        </div>
      </Reveal>

      {/* Featured project — horizontal on desktop */}
      {featured && (
        <Reveal delay={0.05} className="mt-12">
          <Card item={featured} featured />
        </Reveal>
      )}

      {/* Remaining projects — responsive card grid */}
      <RevealGroup
        className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${featured ? "mt-6" : "mt-12"}`}
      >
        {cards.map((item) => (
          <RevealItem key={item.no} className="h-full">
            <Card item={item} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
