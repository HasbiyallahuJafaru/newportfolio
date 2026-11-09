"use client";

import Image from "next/image";
import { useState } from "react";
import { about, profile, whatsappUrl } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import SpotlightCard from "./SpotlightCard";
import { Reveal } from "./Reveal";
import { CheckIcon, MailIcon, ShareIcon } from "./icons";
import { CountUp } from "./motion";

const skills = ["Web Design", "Web Apps", "Telegram Bots"];

// The share button uses the native share sheet where there is one (phones),
// and copies the site address everywhere else.
function ShareButton() {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const data = { title: profile.name, text: profile.role, url: siteUrl };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* share sheet dismissed */
    }
  };
  return (
    <button
      type="button"
      onClick={share}
      aria-label={copied ? "Link copied" : "Share this portfolio"}
      className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full text-paper transition-colors duration-300 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/40"
    >
      {copied ? <CheckIcon className="h-5 w-5 text-signal-hi" /> : <ShareIcon className="h-5 w-5" />}
    </button>
  );
}

function ProfileCard() {
  return (
    <SpotlightCard
      theme="dark"
      spotlightColor="#ffffff"
      intensity={0.15}
      spotlightSize={240}
      softness={0.7}
      shape="circle"
      borderGlow={0.6}
      proximity={80}
      smoothing={0.3}
      grain={0}
      ambient={false}
      flare
      className="w-full max-w-[460px]"
      style={{ padding: "2.25rem" }}
    >
      <ShareButton />

      <div className="relative h-[88px] w-[88px] overflow-hidden rounded-full bg-surface ring-1 ring-white/10">
        <Image
          src="/Hasbiyallahu.png"
          alt={`${profile.name}, ${profile.role} in Nigeria`}
          fill
          sizes="88px"
          className="object-cover object-top"
        />
      </div>

      <h3 className="mt-6 text-[1.9rem] font-medium leading-tight tracking-tight text-paper">
        {profile.name}
      </h3>
      <p className="mt-2 text-lg font-light text-muted">{profile.role}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="rounded-[8px] bg-white/[0.07] px-3 py-1.5 text-[13px] font-medium text-paper"
          >
            {skill}
          </li>
        ))}
      </ul>

      <dl className="mt-8 grid grid-cols-3 text-center">
        {about.stats.map((stat) => (
          <div key={stat.label}>
            <dd className="text-xl font-semibold text-paper">
              <CountUp value={stat.value} />
            </dd>
            <dt className="mt-1.5 text-[13px] font-light text-muted">{stat.label}</dt>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex items-center gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 flex-1 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-[15px] font-medium text-paper transition-colors duration-300 hover:bg-white/[0.14] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/40"
        >
          Start a project
        </a>
        <a
          href={`mailto:${profile.email}`}
          aria-label={`Email ${profile.email}`}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-paper transition-colors duration-300 hover:bg-white/[0.14] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/40"
        >
          <MailIcon className="h-5 w-5" />
        </a>
      </div>
    </SpotlightCard>
  );
}

export function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-content scroll-mt-24 px-6 py-24 md:px-10 md:py-36"
    >
      <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-12 lg:gap-16">
        <Reveal className="flex justify-center md:col-span-5 md:justify-start">
          <ProfileCard />
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7">
          <h2 className="script text-[clamp(2.3rem,5.4vw,4.4rem)] text-paper">
            {about.headline.join(" ")}
          </h2>
          <div className="mt-8 flex max-w-2xl flex-col gap-5">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-base font-light leading-relaxed text-muted md:text-[17px]">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
