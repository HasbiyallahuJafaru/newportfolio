import { NextResponse, type NextRequest } from "next/server";
import { siteUrl } from "@/lib/site";

// One host serves the site. www resolves to the same deployment, so without
// this every www URL is a live duplicate; each one 308s permanently to the
// apex so crawl signals land on a single canonical host.
const APEX = new URL(siteUrl).hostname;

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  if (host === `www.${APEX}`) {
    const url = request.nextUrl.clone();
    url.hostname = APEX;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  // Leave static assets alone; they are never entry points.
  matcher: ["/((?!_next/static|_next/image|images|fonts|icon|apple-icon|og.jpg|manifest.webmanifest|sitemap.xml|robots.txt).*)"],
};
