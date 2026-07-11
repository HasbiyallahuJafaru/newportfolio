import Link from "next/link";
import type { Metadata } from "next";
import { profile, nav } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page Not Found — Hasbiyallahu Jafaru",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-void px-6 text-center">
      <p className="font-mono text-[10px] font-light uppercase tracking-[0.3em] text-bronze-lite">
        404
      </p>
      <h1 className="mt-6 text-4xl font-semibold tracking-tightest text-cream sm:text-5xl">
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
            className="rounded-full bg-bronze px-6 py-3 text-sm font-medium text-cream transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
          >
            Home
          </Link>
        </li>
        {nav.map((item) => (
          <li key={item.href}>
            <Link
              href={`/${item.href}`}
              scroll={true}
              className="rounded-full border border-line bg-raised/40 px-5 py-3 text-sm font-light text-muted transition-colors hover:border-bronze hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze/60"
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
