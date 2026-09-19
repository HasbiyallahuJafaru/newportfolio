import Link from "next/link";
import type { Metadata } from "next";
import { profile, nav } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page Not Found | Hasbiyallahu Jafaru",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-ink px-6 text-center">
      <p className="font-mono text-[10px] font-light uppercase tracking-[0.3em] text-signal-hi">
        404
      </p>
      <h1 className="display mt-6 text-[clamp(1.75rem,5vw,3rem)] text-paper">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base font-light leading-relaxed text-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        Here are some places you might want to go instead.
      </p>

      <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <li>
          <Link
            href="/"
            className="rounded-full bg-signal-deep px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-paper transition-colors hover:bg-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-hi"
          >
            Home
          </Link>
        </li>
        {nav.map((item) => (
          <li key={item.href}>
            <Link
              href={`/${item.href}`}
              scroll={true}
              className="rounded-full border border-line-hi px-5 py-3.5 text-[13px] font-medium text-muted transition-colors hover:border-paper hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper/60"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-16 text-xs font-light text-faint">
        &copy; {new Date().getFullYear()} {profile.name}
      </p>
    </main>
  );
}
