import type { MetadataRoute } from "next";

/* `output: "export"` requires this to be emitted as a static file at build time. */
export const dynamic = "force-static";

/*
 * One page, one entry — but a real /sitemap.xml rather than a 404, and built
 * from the same origin switch as robots.ts so it can never advertise the
 * staging host. Add a route here when a route is added to the site.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zenduit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL.replace(/\/$/, "")}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
