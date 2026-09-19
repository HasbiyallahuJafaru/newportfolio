"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { nav, profile, whatsappUrl } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  // The section anchors only exist on the homepage. From a service page a bare
  // "#about" resolves against that page and silently does nothing, so off-home
  // they have to be rewritten to point back at the homepage.
  const isHome = usePathname() === "/";
  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);

  // Motion's scroll value instead of a `scroll` listener: one shared frame loop,
  // and the direction check only fires state changes that actually differ, so
  // React bails out of the re-render on every other frame.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const dy = y - last.current;
    last.current = y;
    setSolid(y > 40);
    if (Math.abs(dy) > 3) setHidden(y > 160 && dy > 0 && !open);
  });

  // Which section the reader is in. IntersectionObserver rather than a scroll
  // handler: it fires only when a section crosses the line, so there is no
  // per-frame work. The band sits just above centre, which is where the eye
  // actually is when deciding "what am I looking at".
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!isHome) return;

    const ids = nav.map((item) => item.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const seen = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) seen.set(entry.target.id, entry.isIntersecting);
        // Last match wins, so scrolling down hands over to the newer section.
        const current = ids.filter((id) => seen.get(id)).pop() ?? null;
        setActive(current);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Scrolling up with the sheet open should bring the header back.
  useEffect(() => {
    if (open) setHidden(false);
  }, [open]);

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: "-115%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: EASE }}
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        solid
          ? "border-b border-line bg-ink/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-6 md:h-20 md:px-10">
        {/* Wordmark */}
        <Link
          href={isHome ? "#top" : "/"}
          className="group flex items-center gap-2.5 text-paper"
        >
          <span className="inline-block h-2.5 w-2.5 bg-signal transition-transform duration-300 group-hover:scale-125" />
          <span className="display display-sm text-sm">
            {profile.shortName}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={sectionHref(item.href)}
                scroll={true}
                aria-current={active === item.href.slice(1) ? "true" : undefined}
                className={`group/link relative block py-1 text-[12px] font-medium uppercase tracking-[0.12em] transition-colors duration-200 hover:text-paper focus-visible:text-paper focus-visible:outline-none ${
                  active === item.href.slice(1) ? "text-paper" : "text-muted"
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-signal transition-transform duration-300 ease-out group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100 ${
                    active === item.href.slice(1) ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + burger */}
        <div className="flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/60 sm:block"
          >
            <span className="block rounded-full bg-signal-deep px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper transition-colors duration-300 group-hover:bg-signal">
              Start a project
            </span>
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`block h-px w-5 bg-paper transition-transform duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-paper transition-transform duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-t border-line bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
              }}
              className="flex flex-col gap-1 px-6 py-6"
            >
              {nav.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                >
                  <Link
                    href={sectionHref(item.href)}
                    scroll={true}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.href.slice(1) ? "true" : undefined}
                    className={`flex items-center gap-3 py-3 text-lg font-light transition-colors hover:text-paper ${
                      active === item.href.slice(1) ? "text-paper" : "text-muted"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`h-px bg-signal transition-all duration-300 ${
                        active === item.href.slice(1) ? "w-6" : "w-0"
                      }`}
                    />
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                }}
                className="pt-3"
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-block rounded-full bg-signal-deep px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-paper"
                >
                  Start a project
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
