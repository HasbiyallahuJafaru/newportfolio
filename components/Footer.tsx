"use client";

import { nav, profile, whatsappUrl } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ebony">
      <div className="mx-auto flex max-w-content flex-col gap-10 px-6 py-14 md:px-10">
        <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:text-left">
          {/* Brand */}
          <div className="max-w-xs">
            <a
              href="#top"
              className="flex items-center justify-center gap-2 text-base font-semibold tracking-tight text-cream md:justify-start"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-bronze" />
              {profile.name}
            </a>
            <p className="mt-4 text-sm font-light leading-relaxed text-faint">
              {profile.role}. Clean code, purposeful design, real results.
            </p>
          </div>

          {/* Nav + contact — hidden on mobile */}
          <div className="hidden flex-col items-center gap-8 text-center sm:flex sm:flex-row sm:items-start sm:gap-16 sm:text-left">
            {/* Navigate — hidden on mobile */}
            <nav className="hidden flex-col gap-3 sm:flex">
              <span className="text-[11px] font-light uppercase tracking-[0.16em] text-bronze-lite">
                Navigate
              </span>
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-light text-muted transition-colors hover:text-cream"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="hidden flex-col items-center gap-3 sm:flex sm:items-start">
              <span className="text-[11px] font-light uppercase tracking-[0.16em] text-bronze-lite">
                Connect
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="text-sm font-light text-muted transition-colors hover:text-cream"
              >
                {profile.email}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-light text-muted transition-colors hover:text-cream"
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
          <span>Designed &amp; built with intent.</span>
        </div>
      </div>
    </footer>
  );
}
