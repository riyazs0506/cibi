/* =============================================================================
 * OPEN GRAPH IMAGE GENERATOR
 * =============================================================================
 *
 *  Renders the 1200x630 social preview card to public/images/og-cibi-solar.png.
 *
 *  Run with:  node scripts/generate-og-image.mjs
 *  (wired into `npm run build` via the prebuild script)
 *
 *  Why a script rather than app/opengraph-image.tsx: Next's file convention
 *  exports the image to `out/opengraph-image` with no file extension, so a
 *  static host serves it as application/octet-stream and several crawlers
 *  refuse it. Writing a real .png into public/ gives it the correct
 *  Content-Type everywhere, and makes it available in development too.
 * ========================================================================== */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
/* Resolved through Next's own package folder: the bare "next/og" specifier
   has no ESM export map entry, so Node cannot resolve it outside a bundler. */
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { ImageResponse } = require("next/og");

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "public", "images");
mkdirSync(outDir, { recursive: true });

/* Kept in step with data/site.ts. Plain strings so this script has no
   dependency on the TypeScript build. */
const BRAND = "Cibi Solar";
const EYEBROW = "POWER YOU CAN TRUST";
const HEADLINE = "Clean Power for Every Day.";
const SUB = "Solar panels, inverters, batteries, water heaters and street lights.";

const card = {
  type: "div",
  props: {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: "linear-gradient(135deg, #102a43 0%, #1c3d5a 100%)",
      padding: "72px 80px",
      fontFamily: "sans-serif",
      position: "relative",
    },
    children: [
      /* Soft accent bloom - the site's single visual flourish. */
      {
        type: "div",
        props: {
          style: {
            position: "absolute",
            top: -200,
            right: -160,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: "rgba(91, 157, 255, 0.16)",
            display: "flex",
          },
        },
      },

      /* Brand lockup */
      {
        type: "div",
        props: {
          style: { display: "flex", alignItems: "center", gap: 22 },
          children: [
            {
              type: "div",
              props: {
                style: {
                  width: 76,
                  height: 76,
                  borderRadius: 24,
                  background: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                children: [
                  {
                    type: "div",
                    props: {
                      /* The sun from the brand mark, reduced to its simplest
                         form - satori has no SVG path support here. */
                      style: {
                        width: 34,
                        height: 34,
                        borderRadius: 9999,
                        background: "#5b9dff",
                        display: "flex",
                      },
                    },
                  },
                ],
              },
            },
            {
              type: "div",
              props: {
                style: {
                  fontSize: 40,
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  display: "flex",
                },
                children: BRAND,
              },
            },
          ],
        },
      },

      /* Message */
      {
        type: "div",
        props: {
          style: { display: "flex", flexDirection: "column", gap: 22 },
          children: [
            {
              type: "div",
              props: {
                style: {
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#5b9dff",
                  letterSpacing: "0.16em",
                  display: "flex",
                },
                children: EYEBROW,
              },
            },
            {
              type: "div",
              props: {
                style: {
                  fontSize: 78,
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  maxWidth: 940,
                  display: "flex",
                },
                children: HEADLINE,
              },
            },
            {
              type: "div",
              props: {
                style: {
                  fontSize: 30,
                  color: "rgba(255,255,255,0.72)",
                  maxWidth: 880,
                  display: "flex",
                },
                children: SUB,
              },
            },
          ],
        },
      },
    ],
  },
};

const response = new ImageResponse(card, { width: 1200, height: 630 });
const buffer = Buffer.from(await response.arrayBuffer());

const target = join(outDir, "og-cibi-solar.png");
writeFileSync(target, buffer);

console.log(
  `Generated og-cibi-solar.png (${(buffer.length / 1024).toFixed(1)} KB)`,
);
