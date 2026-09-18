/* =============================================================================
 * RSC PAYLOAD PATH FIX  (post-build)
 * =============================================================================
 *
 *  Run with:  node scripts/flatten-rsc-payloads.mjs
 *  (wired into `npm run build` via the postbuild script)
 *
 *  THE PROBLEM
 *  -----------
 *  Next's App Router prefetches a route's React Server Components payload when
 *  a <Link> to it scrolls into view. Under `output: "export"` (Next 16.3.4) the
 *  exporter and the client router disagree about where those payloads live:
 *
 *    written by the export   out/about/__next.about/__PAGE__.txt      <- a directory
 *    requested by the client /about/__next.about.__PAGE__.txt         <- dot-joined
 *
 *  Nested dynamic routes take the same shape, one segment deeper:
 *
 *    written    out/products/solar-panels/__next.products/$d$category/__PAGE__.txt
 *    requested  /products/solar-panels/__next.products.$d$category.__PAGE__.txt
 *
 *  Every prefetch therefore 404s. Navigation still works - the router falls
 *  back to a full document load - but a visitor lands on the home page with
 *  around seventy failed requests and a console full of errors, and every
 *  subsequent page does the same.
 *
 *  THE FIX
 *  -------
 *  Copy each payload to the flat, dot-joined path the client actually asks for,
 *  keeping the original in place. Prefetching then works as intended and
 *  navigation between pages is instant.
 *
 *  This is a workaround for an upstream mismatch, not a design choice. When a
 *  future Next release emits both paths (or agrees with itself), this script
 *  becomes a no-op and can be dropped - it reports how many files it wrote, so
 *  a count of zero is the signal that it is no longer needed.
 * ========================================================================== */

import { copyFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "out");

let copied = 0;

/** Collects every `__PAGE__.txt` under `dir`, with its path relative to `dir`. */
function collectPayloads(dir, trail = []) {
  const found = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);

    if (entry.isDirectory()) {
      found.push(...collectPayloads(full, [...trail, entry.name]));
    } else if (entry.name === "__PAGE__.txt") {
      found.push({ segments: trail, file: full });
    }
  }

  return found;
}

/** Walks the export looking for `__next.*` payload directories. */
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const full = join(dir, entry.name);

    if (entry.name.startsWith("__next.")) {
      /* Join the directory name and everything below it with dots, and write
         the result alongside the directory. */
      for (const { segments, file } of collectPayloads(full)) {
        const flatName = [entry.name, ...segments, "__PAGE__.txt"].join(".");
        copyFileSync(file, join(dir, flatName));
        copied += 1;
      }
      continue;
    }

    walk(full);
  }
}

try {
  statSync(outDir);
} catch {
  console.error("No out/ directory - run `next build` first.");
  process.exit(1);
}

walk(outDir);

console.log(
  copied === 0
    ? "RSC payload paths: nothing to fix (Next may have fixed this upstream - see the note in this script)."
    : `RSC payload paths: wrote ${copied} flat prefetch payload${copied === 1 ? "" : "s"}.`,
);
