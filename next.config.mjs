/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // These live here rather than in netlify.toml so they survive the move to
  // Vercel — netlify.toml is ignored off Netlify, which would have dropped
  // every header below without any build error to warn you.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // next/font and /_next/static are already immutable by default; this
        // covers the raw files served straight out of public/.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
