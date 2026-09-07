import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/** Generated into out/robots.txt at build time. */
/* Required under `output: export` - generated once at build time. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${absoluteUrl("/").replace(/\/$/, "")}/sitemap.xml`,
    host: absoluteUrl("/").replace(/\/$/, ""),
  };
}
