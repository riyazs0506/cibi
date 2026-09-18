import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Fully static, frontend-only output.
   * `next build` generates the complete static website in `out/`.
   */
  output: "export",

  /**
   * Generate `/about/index.html`, `/contact/index.html`, etc.
   * This allows clean URLs on static hosts.
   */
  trailingSlash: true,

  /**
   * Static export has no Next.js image optimization server.
   */
  images: {
    unoptimized: true,
  },

  /**
   * Keep Turbopack scoped to this project.
   */
  turbopack: {
    root: __dirname,
  },

  reactStrictMode: true,

  productionBrowserSourceMaps: false,
};

export default nextConfig;