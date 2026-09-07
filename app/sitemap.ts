import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { absoluteUrl } from "@/lib/seo";

/**
 * Generated into out/sitemap.xml at build time.
 *
 * Built from the same data the pages are, so a new product or category appears
 * in the sitemap automatically and the two can never drift apart.
 * Legal pages are intentionally excluded - they carry no search value.
 */
/* Required under `output: export` - generated once at build time. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),

    ...categories.map((category) => ({
      url: absoluteUrl(`/products/${category.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    ...products.map((product) => ({
      url: absoluteUrl(`/products/${product.category}/${product.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
