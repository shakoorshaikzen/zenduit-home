import type { MetadataRoute } from "next";

/* `output: "export"` requires this to be emitted as a static file at build time. */
export const dynamic = "force-static";

/*
 * Robots policy, driven by the same single switch as the `robots` meta tag in
 * layout.tsx: NEXT_PUBLIC_SITE_URL set (production origin) → crawlable with a
 * sitemap; unset (a .vercel.app staging origin) → fully disallowed, so the
 * staging build cannot be crawled and ranked as a duplicate of the real site.
 *
 * `output: "export"` renders this to a static /robots.txt at build time, which
 * is what the audits found missing (it 404'd).
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export default function robots(): MetadataRoute.Robots {
  if (!SITE_URL) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL.replace(/\/$/, "")}/sitemap.xml`,
    host: SITE_URL,
  };
}
