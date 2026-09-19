"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, profile, whatsappUrl } from "@/lib/content";
import { servicePages } from "@/lib/servicePages";

export function Footer() {
  const year = new Date().getFullYear();

  // Same rule as the Nav: section anchors are homepage-only.
  const isHome = usePathname() === "/";
  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <footer className="border-t border-line bg-deep">
      <div className="mx-auto flex max-w-content flex-col gap-10 px-6 py-14 md:px-10">
        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:text-left">
          {/* Brand */}
          <div className="max-w-xs">
            <Link
              href={isHome ? "#top" : "/"}
              className="flex items-center justify-center gap-2.5 text-paper md:justify-start"
            >
              <span className="inline-block h-2.5 w-2.5 bg-signal" />
              <span className="display display-sm text-base">
                {profile.name}
              </span>
            </Link>
            <p className="mt-4 text-sm font-light leading-relaxed text-faint">
              Website designer and developer in Kaduna, Nigeria. Clean code,
              purposeful design, real results.
            </p>
          </div>

          {/* Nav + contact — hidden on mobile */}
          <div className="hidden flex-col items-center gap-8 text-center sm:flex sm:flex-row sm:items-start sm:gap-16 sm:text-left">
            {/* Services — the pages that have to rank, linked sitewide */}
            <nav className="hidden flex-col gap-3 sm:flex">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-signal-hi">
                Services
              </span>
              {servicePages.map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className="text-sm font-light text-muted transition-colors hover:text-paper"
                >
                  {page.linkLabel}
                </Link>
              ))}
            </nav>

            {/* Navigate — hidden on mobile */}
            <nav className="hidden flex-col gap-3 sm:flex">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-signal-hi">
                Navigate
              </span>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={sectionHref(item.href)}
                  className="text-sm font-light text-muted transition-colors hover:text-paper"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="hidden flex-col items-center gap-3 sm:flex sm:items-start">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-signal-hi">
                Connect
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="text-sm font-light text-muted transition-colors hover:text-paper"
              >
                {profile.email}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-light text-muted transition-colors hover:text-paper"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 border-t border-line pt-6 text-center text-xs font-light text-faint sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <span>
            © {year} {profile.name}. All rights reserved.
          </span>
          <a
            href={`mailto:${profile.email}`}
            className="transition-colors hover:text-paper"
          >
            {profile.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
