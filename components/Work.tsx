"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import CircularCarousel, { type CircularCarouselHandle } from "./CircularCarousel";
import { work } from "@/lib/content";
import { ArrowIcon, ArrowRightIcon } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;

type CarouselHandle = CircularCarouselHandle;

// The ring draws plain <img> tags, so route them through Next's optimiser by
// hand: a 1080px WebP/AVIF instead of the 1440px source JPEG.
const optimised = (src: string) => `/_next/image?url=${encodeURIComponent(src)}&w=1080&q=70`;

const items = work.items.map((item) => ({
  src: optimised(item.image),
  alt: item.imageAlt,
  title: item.title,
  subtitle: item.category,
}));

// The work as one object: a ring of every project, turning slowly, filling
// the screen on desktop. Whatever is at the front is described underneath,
// with the link to the live site. The index lists every project by name, so
// all ten stay readable and reachable without touching the ring.
export function Work() {
  const ring = useRef<CarouselHandle>(null);
  const section = useRef<HTMLElement>(null);
  // The ring preloads every image as it mounts, so hold it back until the
  // section is close, keeping ten screenshots off the first page load.
  const near = useInView(section, { once: true, margin: "800px 0px" });
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = work.items[active];
  const href = current.action?.href ?? null;

  const open = (index: number) => {
    const target = work.items[index].action?.href;
    if (index === active && target) window.open(target, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="work"
      ref={section}
      className="relative scroll-mt-0 overflow-hidden border-t border-line bg-ink md:h-[100svh] md:min-h-[760px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_52%,rgba(228,50,63,0.09),transparent_70%)]"
      />
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-40" />

      {/* Header */}
      <div className="relative z-10 mx-auto flex max-w-content items-end justify-between gap-6 px-6 pt-24 md:absolute md:inset-x-0 md:top-0 md:px-10 md:pt-28">
        <div>
          <h2 className="script text-[clamp(2.4rem,5.6vw,4.6rem)] text-paper">{work.label}</h2>
          <p className="mt-1 text-sm font-light text-faint">
            Drag the ring, or pick a project below.
          </p>
        </div>
        <p className="display shrink-0 pb-2 text-lg text-paper" aria-hidden>
          <span className="text-signal">{String(active + 1).padStart(2, "0")}</span>
          <span className="mx-2 text-faint">/</span>
          <span className="text-faint">{String(work.items.length).padStart(2, "0")}</span>
        </p>
      </div>

      {/* Ring */}
      <div className="relative h-[40svh] min-h-[260px] md:absolute md:inset-x-0 md:bottom-[24%] md:top-[15%] md:h-auto">
        {near && (
        <CircularCarousel
          ref={ring}
          items={items}
          preset="cylinder"
          intro="rise"
          cardWidth={600}
          aspectRatio={1.6}
          gap={44}
          tilt={-6}
          speed={8}
          parallax={0.35}
          depthFade={0.78}
          fadeColor="#0b0b0c"
          innerShade={0.35}
          cornerRadius={0}
          onChange={setActive}
          onItemClick={(_, index) => open(index)}
          style={{ color: "#f4f3f1" }}
        />
        )}
      </div>

      {/* Front project */}
      <div className="pointer-events-none relative z-10 md:absolute md:inset-x-0 md:bottom-0">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[150%] bg-gradient-to-t from-ink via-ink/90 to-transparent md:block" />
        <div className="pointer-events-auto relative mx-auto max-w-content px-6 pb-20 md:px-10 md:pb-10">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="min-h-[11rem] md:col-span-7 md:min-h-[9.5rem]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <p className="text-[11px] font-light uppercase tracking-[0.16em] text-faint">
                    {current.category}
                  </p>
                  <h3 className="mt-3 text-3xl font-light tracking-tight text-paper md:text-[2.75rem] md:leading-[1.1]">
                    {current.title}
                  </h3>
                  <p className="mt-4 max-w-[58ch] text-[15px] font-light leading-relaxed text-muted md:line-clamp-2">
                    {current.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 md:col-span-5 md:justify-end">
              <button
                type="button"
                onClick={() => ring.current?.stepBy(-1)}
                aria-label="Previous project"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line-hi text-paper transition-colors duration-300 hover:border-signal hover:bg-signal-deep active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-hi"
              >
                <ArrowRightIcon className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => ring.current?.stepBy(1)}
                aria-label="Next project"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-line-hi text-paper transition-colors duration-300 hover:border-signal hover:bg-signal-deep active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-hi"
              >
                <ArrowRightIcon className="h-4 w-4" />
              </button>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group ml-2 inline-flex h-12 items-center gap-3 rounded-full bg-paper pl-6 pr-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors duration-300 hover:bg-signal hover:text-paper active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-hi focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  Visit site
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ) : (
                <span className="ml-2 inline-flex h-12 items-center rounded-full border border-line px-6 text-[12px] font-medium uppercase tracking-[0.12em] text-faint">
                  Private project
                </span>
              )}
            </div>
          </div>

          {/* Index of every project */}
          <ol className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5 md:mt-8">
            {work.items.map((item, i) => (
              <li key={item.no}>
                <button
                  type="button"
                  onClick={() => ring.current?.focusIndex(i)}
                  aria-current={i === active ? "true" : undefined}
                  className={`group flex items-baseline gap-2 py-1 text-[12.5px] transition-colors duration-300 focus-visible:outline-none focus-visible:text-signal-hi ${
                    i === active ? "text-paper" : "text-faint hover:text-muted"
                  }`}
                >
                  <span className={`display text-[10px] ${i === active ? "text-signal" : ""}`}>{item.no}</span>
                  {item.title}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
