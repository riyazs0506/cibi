import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Fully static, frontend-only output. `next build` emits plain HTML/CSS/JS
   * into `out/` which can be served from any static host or CDN.
   */
  output: "standalone",

  /** Emits `/about/index.html` so clean URLs work on every static host. */
  trailingSlash: true,

  /** No image optimisation server exists in a static export. */
  images: { unoptimized: true },

  /* Pin the workspace root: a stray lockfile in the home directory above this
     project would otherwise be picked up and widen the file-tracing scope. */
  turbopack: { root: __dirname },

  reactStrictMode: true,
  productionBrowserSourceMaps: false,
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
