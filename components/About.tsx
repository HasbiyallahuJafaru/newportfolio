"use client";

import Image from "next/image";
import { about, profile, whatsappUrl } from "@/lib/content";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { ArrowIcon } from "./icons";

export function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-content scroll-mt-24 px-6 py-24 md:px-10 md:py-36"
    >
      {/* accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-bronze/10 blur-[110px]"
      />

      <Reveal>
        <SectionLabel>{about.label}</SectionLabel>
      </Reveal>

      <div className="relative mt-12 grid items-center gap-12 md:grid-cols-[0.85fr_1fr] md:gap-16 lg:gap-20">
        {/* Portrait in a designed frame */}
        <Reveal delay={0.05}>
          <div className="group relative mx-auto w-full max-w-[340px] md:mx-0">
            {/* offset outlined panel for depth */}
            <div
              aria-hidden
              className="absolute right-5 top-5 h-full w-full rounded-[2rem] border border-bronze/30 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"
            />
            {/* soft bronze glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-bronze/15 blur-3xl"
            />

            {/* matted frame */}
            <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-raised p-2 shadow-2xl shadow-black/50">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.4rem] ring-1 ring-cream/10">
                <Image
                  src="/Hasbiyallahu.png"
                  alt={`${profile.name} — ${profile.role}, Web Designer & Developer in Nigeria`}
                  fill
                  sizes="(max-width: 768px) 340px, 400px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  priority={false}
                />
                {/* warm wash + bottom scrim */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-bronze/10 mix-blend-multiply"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void/85 to-transparent"
                />
              </div>

              {/* glass name badge */}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-full border border-cream/10 bg-void/70 px-4 py-2 backdrop-blur-md">
                <span className="flex flex-col leading-tight">
                  <span className="text-[13px] font-medium text-cream">
                    {profile.shortName}
                  </span>
                  <span className="text-[10px] font-light uppercase tracking-[0.12em] text-faint">
                    {profile.role}
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-[10px] font-light uppercase tracking-[0.1em] text-muted">
                    Available
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Headline + body + CTA */}
        <Reveal delay={0.15} className="flex flex-col gap-7">
          <h2 className="text-4xl font-medium leading-[1.05] tracking-tightest sm:text-5xl md:text-[3.25rem]">
            <span className="text-cream">{about.headline[0]} </span>
            <span className="text-gradient">{about.headline[1]} </span>
            <span className="text-faint">{about.headline[2]}</span>
          </h2>

          <div className="flex flex-col gap-5">
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
            className="group mt-1 inline-flex w-fit items-center gap-2 text-sm font-medium text-cream"
          >
            Start a Project
            <ArrowIcon className="h-4 w-4 text-bronze transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>

      {/* Stats */}
      <RevealGroup className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
        {about.stats.map((stat) => (
          <RevealItem key={stat.label}>
            <div className="flex h-full flex-col gap-2 bg-void px-8 py-10">
              <span className="text-5xl font-semibold tracking-tightest text-gradient md:text-6xl">
                {stat.value}
              </span>
              <span className="text-sm font-light uppercase tracking-[0.12em] text-faint">
                {stat.label}
              </span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
