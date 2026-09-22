/* =============================================================================
 * FAVICON / APP ICON GENERATOR
 * =============================================================================
 *
 *  Renders the brand mark into every icon a browser or phone will ask for:
 *
 *    public/icon.svg              modern browsers, crisp at any size
 *    public/favicon.ico           16 + 32 + 48, for older browsers and tabs
 *    public/apple-touch-icon.png  180x180, iOS home screen
 *    public/icon-192.png          Android / manifest
 *    public/icon-512.png          Android / manifest, splash
 *    public/site.webmanifest      ties the PNGs together
 *
 *  Run with:  node scripts/generate-icons.mjs
 *  (wired into `npm run build` via the prebuild script)
 *
 *  Same reasoning as generate-og-image.mjs: Next's file-based metadata
 *  conventions emit extension-less routes under `output: "export"`, which
 *  static hosts serve with the wrong Content-Type. Real files in public/ with
 *  real extensions are served correctly everywhere, and exist in dev too.
 *
 *  The rounded mark is used where the platform shows the icon as-is; a
 *  full-bleed square is used for Apple and maskable icons, because iOS and
 *  Android apply their own mask and would clip a pre-rounded corner twice.
 * ========================================================================== */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { ImageResponse } = require("next/og");

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "public");
mkdirSync(outDir, { recursive: true });

/* Brand colours, kept in step with app/globals.css. */
const NAVY = "#122d3b";
const ACCENT = "#f4cf4c";

/**
 * The mark: a solar module in perspective with the sun resting above it,
 * inside a rounded navy tile. Matches components/layout/Logo.tsx.
 * `radius` of 0 gives the full-bleed variant for masked platforms.
 */
const markSvg = (radius) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="${radius}" fill="${ACCENT}"/>
  <circle cx="256" cy="172" r="59" fill="${NAVY}"/>
  <path d="M114 382 L156 271h200l42 111z" fill="none" stroke="${NAVY}" stroke-width="27" stroke-linejoin="round"/>
  <path d="M138 326h236M256 271v111" stroke="${NAVY}" stroke-width="22" stroke-linecap="round"/>
</svg>`;

const dataUri = (svg) =>
  `data:image/svg+xml;base64,${Buffer.from(svg, "utf8").toString("base64")}`;

/** Renders the mark to a PNG buffer at `size` square. */
async function png(size, radius) {
  const element = {
    type: "div",
    props: {
      style: { display: "flex", width: "100%", height: "100%" },
      children: {
        type: "img",
        props: { src: dataUri(markSvg(radius)), width: size, height: size },
      },
    },
  };

  const response = new ImageResponse(element, { width: size, height: size });
  return Buffer.from(await response.arrayBuffer());
}

/**
 * Packs PNGs into an .ico. The format allows a PNG payload per entry, which
 * every browser that still asks for favicon.ico supports, and it keeps this
 * dependency-free.
 */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + images.length * 16;
  const entries = [];
  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width  (0 means 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette size
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const manifest = {
  name: "Cibi Solar",
  short_name: "Cibi Solar",
  description:
    "Solar panels, inverters, batteries, water heaters and street lights, with honest guidance and dependable support.",
  start_url: "/",
  display: "standalone",
  background_color: "#fcfcf9",
  theme_color: "#122d3b",
  icons: [
    { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" },
  ],
};

const write = (name, data) => {
  writeFileSync(join(outDir, name), data);
  const kb = (data.length / 1024).toFixed(1);
  console.log(`  ${name.padEnd(24)} ${kb.padStart(6)} KB`);
};

console.log("Generating icons -> public/");

/* Rounded mark for the SVG favicon; browsers draw it on their own background. */
write("icon.svg", Buffer.from(markSvg(75), "utf8"));

/* Favicon sizes. 48 covers Windows tiles and high-DPI tabs. */
const icoSizes = [16, 32, 48];
const icoImages = [];
for (const size of icoSizes) {
  icoImages.push({ size, data: await png(size, 75) });
}
write("favicon.ico", buildIco(icoImages));

/* Full-bleed square: iOS and Android round these themselves. */
write("apple-touch-icon.png", await png(180, 0));
write("icon-192.png", await png(192, 0));
write("icon-512.png", await png(512, 0));

write("site.webmanifest", Buffer.from(JSON.stringify(manifest, null, 2) + "\n", "utf8"));

console.log("Done.");
