// Single source of truth for the site's own address.
//
// This used to be hardcoded separately in layout.tsx, sitemap.ts, robots.ts
// and StructuredData.tsx, which is how all four ended up pointing at a domain
// that never existed. Import it; don't retype it.
export const siteUrl = "https://hasbiyallahu.xyz";
