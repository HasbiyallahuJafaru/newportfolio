"use client";

import Image from "next/image";
import { about, profile, whatsappUrl } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ArrowIcon } from "./icons";

export function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-content scroll-mt-24 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="grid gap-12 border-t border-line-hi pt-12 md:grid-cols-12 md:gap-12 md:pt-14">
        {/* Portrait. The source is 398x512, so it is held at a size where it
            stays sharp rather than blown up to fill a column. */}
        <Reveal className="md:col-span-4">
          <figure className="w-full max-w-[320px]">
            <div className="relative aspect-[3/4] overflow-hidden bg-surface">
              <Image
                src="/Hasbiyallahu.png"
                alt={`${profile.name}, ${profile.role} in Nigeria`}
                fill
                sizes="(max-width: 768px) 320px, 320px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 flex items-baseline gap-3 border-t border-line pt-4">
              <span className="text-[13px] font-medium text-paper">
                {profile.name}
              </span>
              <span className="text-[10px] font-light uppercase tracking-[0.16em] text-faint">
                {profile.role}
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {/* Copy */}
        <Reveal delay={0.1} className="flex flex-col md:col-span-8">
          <h2 className="script text-[clamp(2.2rem,5.8vw,4.4rem)] text-paper">
            {about.headline.join(" ")}
          </h2>

          <div className="mt-8 flex max-w-2xl flex-col gap-5">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-base font-light leading-relaxed text-muted md:text-[17px]"
              >
                {p}
              </p>
            ))}
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex w-fit items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-paper transition-colors duration-300 hover:text-signal-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-hi"
          >
            Start a project
            <ArrowIcon className="h-4 w-4 text-signal transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </Reveal>
      </div>

      {/* Record. Three numbers on one rule, not three boxes. */}
      <Reveal delay={0.15}>
        <dl className="mt-16 grid grid-cols-3 border-t border-line-hi md:mt-20">
          {about.stats.map((stat) => (
            <div
              key={stat.label}
              className="py-8 pr-4 md:border-l md:border-line-hi md:py-10 md:pl-8 md:first:border-l-0 md:first:pl-0"
            >
              <dd className="display text-3xl text-signal md:text-5xl">
                {stat.value}
              </dd>
              <dt className="mt-2 text-[10px] font-light uppercase tracking-[0.18em] text-faint md:text-[11px]">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
