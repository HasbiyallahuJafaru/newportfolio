"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { whatsappUrl, profile } from "@/lib/content";
import type { ServicePage as ServicePageData } from "@/lib/servicePages";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Grain } from "./Grain";
import { SectionLabel } from "./SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { ArrowIcon } from "./icons";

const ease = [0.22, 1, 0.36, 1] as const;

export function ServicePage({ page }: { page: ServicePageData }) {
  return (
    <>
      <Grain />
      <Nav />

      <main id="top" className="relative z-[2]">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pb-20 pt-32 md:px-10 md:pb-28 md:pt-44">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 top-10 h-[28rem] w-[28rem] rounded-full bg-bronze/10 blur-[140px]"
          />
          <div className="relative mx-auto max-w-content">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <SectionLabel>{page.eyebrow}</SectionLabel>
            </motion.div>

            <h1 className="mt-7 max-w-4xl text-[13vw] font-semibold leading-[0.94] tracking-tightest sm:text-6xl md:text-7xl">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.05 }}
                className="block text-cream"
              >
                {page.h1.lineOne}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.15 }}
                className="block text-gradient"
              >
                {page.h1.lineTwo}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.25 }}
              className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-muted md:text-xl"
            >
              {page.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.35 }}
              className="mt-11 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-bronze px-7 py-3.5 text-sm font-medium text-cream transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
              >
                Start a project
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p className="text-sm font-light text-faint">
                From{" "}
                <span className="font-medium text-cream">{page.priceFrom}</span>
                <span className="mx-2 text-line">·</span>
                Reply within a few hours
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── What gets built ────────────────────────────────── */}
        <section className="relative overflow-hidden border-y border-light-line bg-paper py-24 text-ink md:py-32">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-bronze/10 blur-[120px]"
          />
          <div className="relative mx-auto max-w-content px-6 md:px-10">
            <Reveal>
              <SectionLabel tone="light">What gets built</SectionLabel>
              <h2 className="mt-6 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
                Everything below is part of the build, not an upsell.
              </h2>
            </Reveal>

            <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {page.capabilities.map((c) => (
                <RevealItem key={c.title} className="h-full">
                  <article className="group flex h-full flex-col rounded-2xl border border-light-line bg-paper-raised p-7 shadow-sm shadow-black/5 transition-colors duration-500 hover:border-bronze/60">
                    <h3 className="text-lg font-medium tracking-tight text-ink">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-[15px] font-light leading-relaxed text-ink-muted">
                      {c.body}
                    </p>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── Proof ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-content px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionLabel>Proof</SectionLabel>
          </Reveal>

          <Reveal delay={0.05} className="mt-10">
            <div className="overflow-hidden rounded-3xl border border-line bg-raised/40 md:grid md:grid-cols-2">
              <div className="relative aspect-[16/11] md:aspect-auto">
                <Image
                  src={page.proof.image}
                  alt={page.proof.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent"
                />
              </div>
              <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
                <h2 className="text-2xl font-medium tracking-tight text-cream md:text-3xl">
                  {page.proof.project}
                </h2>
                <p className="text-[15px] font-light leading-relaxed text-muted">
                  {page.proof.body}
                </p>
                {page.proof.href && (
                  <a
                    href={page.proof.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 self-start text-sm font-medium text-cream"
                  >
                    Visit the live site
                    <ArrowIcon className="h-4 w-4 text-bronze transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Who it's for ───────────────────────────────────── */}
        <section className="border-y border-line bg-sunk py-24 md:py-32">
          <div className="mx-auto max-w-content px-6 md:px-10">
            <Reveal>
              <SectionLabel>Who it&rsquo;s for</SectionLabel>
              <h2 className="mt-6 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-cream sm:text-4xl">
                If one of these is you, we should talk.
              </h2>
            </Reveal>

            <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {page.useCases.map((u) => (
                <RevealItem key={u}>
                  <div className="flex h-full items-start gap-4 bg-void px-7 py-6">
                    <span
                      aria-hidden
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-bronze"
                    />
                    <p className="text-[15px] font-light leading-relaxed text-muted">
                      {u}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── Questions ──────────────────────────────────────── */}
        <section className="mx-auto max-w-content px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <SectionLabel>Questions</SectionLabel>
          </Reveal>

          <RevealGroup className="mt-12 flex flex-col gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {page.faq.map((f) => (
              <RevealItem key={f.q}>
                <div className="bg-void px-7 py-8 md:px-10">
                  <h3 className="text-lg font-medium tracking-tight text-cream md:text-xl">
                    {f.q}
                  </h3>
                  <p className="mt-4 max-w-3xl text-[15px] font-light leading-relaxed text-muted">
                    {f.a}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.05}>
            <p className="mt-10 text-sm font-light text-faint">
              {page.priceNote}
            </p>
          </Reveal>
        </section>

        {/* ── Close ──────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-t border-line bg-umber px-6 py-24 md:px-10 md:py-32">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-bronze/15 blur-[130px]"
          />
          <div className="relative mx-auto max-w-content">
            <Reveal>
              <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tightest text-cream sm:text-5xl md:text-6xl">
                Tell me what you&rsquo;re trying to build.
              </h2>
              <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-muted">
                A message with roughly what you need is enough to start. You get
                a straight answer on scope, price and timeline, including when
                the honest answer is that you don&rsquo;t need me.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-bronze px-7 py-3.5 text-sm font-medium text-cream transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
                >
                  Message on WhatsApp
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="rounded-full border border-line bg-raised/40 px-6 py-3.5 text-sm font-light text-muted transition-colors hover:border-bronze hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
                >
                  {profile.email}
                </a>
              </div>

              <p className="mt-14 text-sm font-light text-faint">
                <Link
                  href="/"
                  className="text-muted underline decoration-line underline-offset-4 transition-colors hover:text-cream hover:decoration-bronze"
                >
                  See the rest of the work
                </Link>
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
