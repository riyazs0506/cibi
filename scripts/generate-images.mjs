/* =============================================================================
 * IMAGE GENERATOR
 * =============================================================================
 *
 *  Draws every product, category and scene illustration in public/images from
 *  one parametric template, so the whole set shares a single light source,
 *  palette and perspective.
 *
 *  Run with:  node scripts/generate-images.mjs
 *
 *  These are vector stand-ins for real photography. To swap in photographs
 *  later, replace the file at the same path (see IMAGES.md for the dimensions
 *  and aspect ratio each slot expects) - no component needs to change.
 * ========================================================================== */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "..", "public", "images");
mkdirSync(outDir, { recursive: true });

/* -------------------------------------------------------------------------- */
/* Palette - mirrors the tokens in app/globals.css                            */
/* -------------------------------------------------------------------------- */

const C = {
  canvas: "#fcfcf9",
  surface: "#ffffff",
  navy: "#122d3b",
  navySoft: "#234553",
  navyDeep: "#0a1e30",
  navyTop: "#27547a",
  slate: "#53636a",
  muted: "#66767c",
  line: "#dfe5e3",
  accent: "#f4cf4c",
  accentDeep: "#756016",
  accentPale: "#8dbcff",
  mint: "#65c9a5",
  tintBlue: "#f7f3e4",
};

const WIDTH = 640;
const HEIGHT = 420;

const FONT =
  "system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif";

const round = (n) => Math.round(n * 10) / 10;

/* -------------------------------------------------------------------------- */
/* Shared scaffolding                                                          */
/* -------------------------------------------------------------------------- */

function defs(accent = C.accent) {
  return `
  <defs>
    <linearGradient id="glassFace" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0%" stop-color="#2d5f8a"/>
      <stop offset="55%" stop-color="${C.navySoft}"/>
      <stop offset="100%" stop-color="${C.navy}"/>
    </linearGradient>
    <linearGradient id="caseFront" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${C.navySoft}"/>
      <stop offset="100%" stop-color="${C.navy}"/>
    </linearGradient>
    <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e9f1f8"/>
      <stop offset="100%" stop-color="#c3d3e2"/>
    </linearGradient>
    <radialGradient id="glow">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.16"/>
      <stop offset="70%" stop-color="${accent}" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>`;
}

/** Warm white ground with one very soft bloom. */
function backdrop() {
  return `
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${C.canvas}"/>
  <circle cx="${WIDTH / 2}" cy="${HEIGHT * 0.5}" r="248" fill="url(#glow)"/>`;
}

function groundShadow(cx, cy, rx, ry = 15) {
  return `<ellipse cx="${round(cx)}" cy="${round(cy)}" rx="${round(rx)}" ry="${ry}" fill="${C.navy}" opacity="0.08"/>`;
}

/** Small sun motif, used sparingly in the corner of generation products. */
function sun(cx, cy, r, accent = C.accent) {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI / 4) * i;
    const x1 = cx + Math.cos(a) * (r + 7);
    const y1 = cy + Math.sin(a) * (r + 7);
    const x2 = cx + Math.cos(a) * (r + 15);
    const y2 = cy + Math.sin(a) * (r + 15);
    return `<line x1="${round(x1)}" y1="${round(y1)}" x2="${round(x2)}" y2="${round(y2)}" stroke="${accent}" stroke-width="3" stroke-linecap="round" opacity="0.5"/>`;
  }).join("");

  return `${rays}<circle cx="${cx}" cy="${cy}" r="${r}" fill="${accent}" opacity="0.85"/>`;
}

function svg(body, { width = WIDTH, height = HEIGHT, title }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${title}">
  <title>${title}</title>${body}
</svg>
`;
}

/* -------------------------------------------------------------------------- */
/* 1. SOLAR PANEL - a module in three-quarter perspective on a tilted frame    */
/* -------------------------------------------------------------------------- */

function panelArt({ label, sub, accent = C.accent, cols = 6, rows = 4, bifacial = false }) {
  /* Face corners: a parallelogram receding to the upper right. */
  const bl = [132, 300];
  const br = [438, 300];
  const tr = [508, 158];
  const tl = [202, 158];

  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  /** Bilinear point on the module face: u across, v up. */
  const face = (u, v) => {
    const bottom = lerp(bl, br, u);
    const top = lerp(tl, tr, u);
    return lerp(bottom, top, v);
  };

  const pt = (p) => `${round(p[0])} ${round(p[1])}`;

  /* Cell grid lines, drawn in face space so they follow the perspective. */
  const grid = [
    ...Array.from({ length: cols - 1 }, (_, i) => {
      const u = (i + 1) / cols;
      return `<line x1="${round(face(u, 0)[0])}" y1="${round(face(u, 0)[1])}" x2="${round(face(u, 1)[0])}" y2="${round(face(u, 1)[1])}" stroke="${C.navyDeep}" stroke-width="1.6" opacity="0.5"/>`;
    }),
    ...Array.from({ length: rows - 1 }, (_, i) => {
      const v = (i + 1) / rows;
      return `<line x1="${round(face(0, v)[0])}" y1="${round(face(0, v)[1])}" x2="${round(face(1, v)[0])}" y2="${round(face(1, v)[1])}" stroke="${C.navyDeep}" stroke-width="1.6" opacity="0.5"/>`;
    }),
  ].join("");

  /* Support legs under the low edge and the high edge. */
  const legs = `
  <path d="M${pt(bl)} l0 30" stroke="${C.muted}" stroke-width="7" stroke-linecap="round"/>
  <path d="M${pt(br)} l0 30" stroke="${C.muted}" stroke-width="7" stroke-linecap="round"/>
  <path d="M${pt(lerp(tl, tr, 0.06))} l0 74" stroke="${C.muted}" stroke-width="6" stroke-linecap="round" opacity="0.75"/>
  <path d="M${pt(lerp(tl, tr, 0.94))} l0 74" stroke="${C.muted}" stroke-width="6" stroke-linecap="round" opacity="0.75"/>`;

  /* A glass back sheet reads as a lighter under-plane. */
  const backSheet = bifacial
    ? `<path d="M${pt([bl[0] + 10, bl[1] + 14])} L${pt([br[0] + 10, br[1] + 14])} L${pt([tr[0] + 10, tr[1] + 14])} L${pt([tl[0] + 10, tl[1] + 14])} Z" fill="${C.accentPale}" opacity="0.28"/>`
    : "";

  return `
  ${groundShadow(320, 348, 210)}
  ${sun(524, 84, 20, accent)}
  ${legs}
  ${backSheet}

  <!-- frame -->
  <path d="M${pt(bl)} L${pt(br)} L${pt(tr)} L${pt(tl)} Z" fill="url(#metal)" />
  <!-- glass -->
  <path d="M${pt(face(0.028, 0.05))} L${pt(face(0.972, 0.05))} L${pt(face(0.972, 0.95))} L${pt(face(0.028, 0.95))} Z" fill="url(#glassFace)"/>
  ${grid}
  <!-- a single soft sheen across the glass, not a shiny highlight -->
  <path d="M${pt(face(0.028, 0.95))} L${pt(face(0.42, 0.95))} L${pt(face(0.028, 0.32))} Z" fill="${C.surface}" opacity="0.07"/>

  <!-- label plate on the frame edge -->
  <rect x="236" y="316" width="168" height="44" rx="10" fill="${C.surface}" opacity="0.97"/>
  <rect x="236" y="316" width="168" height="4" rx="2" fill="${accent}"/>
  <text x="320" y="337" text-anchor="middle" font-family="${FONT}" font-size="17" font-weight="700" fill="${C.navy}">${label}</text>
  <text x="320" y="353" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="500" fill="${C.slate}">${sub}</text>`;
}

/* -------------------------------------------------------------------------- */
/* 2. INVERTER - a wall-mounted box with a display                             */
/* -------------------------------------------------------------------------- */

function inverterArt({ label, sub, accent = C.accent, threePhase = false }) {
  const x = 208;
  const y = 92;
  const w = 224;
  const h = 232;

  /* Cooling fins down each flank. */
  const fins = Array.from({ length: 7 }, (_, i) => {
    const fy = y + 26 + i * 12;
    return `<rect x="${x - 12}" y="${fy}" width="12" height="6" rx="3" fill="${C.navyDeep}" opacity="0.55"/>
            <rect x="${x + w}" y="${fy}" width="12" height="6" rx="3" fill="${C.navyDeep}" opacity="0.55"/>`;
  }).join("");

  /* DC and AC conduit stubs at the base. */
  const conduits = Array.from({ length: threePhase ? 4 : 3 }, (_, i) => {
    const cx = x + 44 + i * ((w - 88) / (threePhase ? 3 : 2));
    return `<rect x="${round(cx - 9)}" y="${y + h}" width="18" height="26" rx="6" fill="${C.muted}"/>`;
  }).join("");

  return `
  ${groundShadow(320, 358, 140)}
  ${fins}
  ${conduits}

  <!-- body -->
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="url(#caseFront)"/>
  <rect x="${x}" y="${y}" width="${w}" height="${round(h * 0.3)}" rx="18" fill="${C.surface}" opacity="0.05"/>

  <!-- display -->
  <rect x="${x + 28}" y="${y + 34}" width="${w - 56}" height="74" rx="10" fill="${C.canvas}"/>
  <rect x="${x + 28}" y="${y + 34}" width="${w - 56}" height="4" rx="2" fill="${accent}"/>
  <text x="${x + w / 2}" y="${y + 68}" text-anchor="middle" font-family="${FONT}" font-size="18" font-weight="700" fill="${C.navy}">${label}</text>
  <text x="${x + w / 2}" y="${y + 90}" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="500" fill="${C.slate}">${sub}</text>

  <!-- status lights: one live, two idle -->
  <circle cx="${x + 40}" cy="${y + 134}" r="6" fill="${C.mint}"/>
  <circle cx="${x + 60}" cy="${y + 134}" r="6" fill="${C.muted}" opacity="0.5"/>
  <circle cx="${x + 80}" cy="${y + 134}" r="6" fill="${C.muted}" opacity="0.5"/>

  <!-- a generation curve, drawn as data rather than decoration -->
  <path d="M${x + 30} ${y + 196} q 32 -6 52 -30 t 50 -34 q 26 -2 62 22"
        fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
  <path d="M${x + 30} ${y + 196} q 32 -6 52 -30 t 50 -34 q 26 -2 62 22 L${x + 194} ${y + 206} L${x + 30} ${y + 206} Z"
        fill="${accent}" opacity="0.13"/>
  <line x1="${x + 28}" y1="${y + 206}" x2="${x + w - 28}" y2="${y + 206}" stroke="${C.muted}" stroke-width="1.6" opacity="0.5"/>`;
}

/* -------------------------------------------------------------------------- */
/* 3. BATTERY - a wall cabinet (lithium) or a tall case (tubular)              */
/* -------------------------------------------------------------------------- */

function batteryArt({ label, sub, accent = C.accent, tubular = false }) {
  const w = tubular ? 196 : 260;
  const h = tubular ? 248 : 208;
  const x = 320 - w / 2;
  const y = 340 - h;

  /* Lithium cabinets show a charge bar; tubular cases show vent caps. */
  const detail = tubular
    ? Array.from({ length: 3 }, (_, i) => {
        const cx = x + w * (0.25 + i * 0.25);
        return `<ellipse cx="${round(cx)}" cy="${y - 6}" rx="20" ry="9" fill="${C.navyTop}"/>
                <ellipse cx="${round(cx)}" cy="${y - 10}" rx="20" ry="9" fill="${C.navySoft}"/>`;
      }).join("")
    : `<rect x="${x + 30}" y="${y + h - 52}" width="${w - 60}" height="18" rx="9" fill="${C.navyDeep}" opacity="0.5"/>
       <rect x="${x + 30}" y="${y + h - 52}" width="${round((w - 60) * 0.72)}" height="18" rx="9" fill="${C.mint}"/>`;

  /* Terminals: accent marks positive, neutral marks negative. */
  const terminals = tubular
    ? `<rect x="${x + 22}" y="${y - 20}" width="30" height="16" rx="5" fill="${accent}"/>
       <rect x="${x + w - 52}" y="${y - 20}" width="30" height="16" rx="5" fill="${C.muted}"/>`
    : "";

  return `
  ${groundShadow(320, 356, w * 0.62)}
  ${detail}
  ${terminals}

  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${tubular ? 12 : 20}" fill="url(#caseFront)"/>
  <rect x="${x}" y="${y}" width="${w}" height="${round(h * 0.3)}" rx="${tubular ? 12 : 20}" fill="${C.surface}" opacity="0.05"/>

  <rect x="${x + 26}" y="${y + round(h * 0.22)}" width="${w - 52}" height="66" rx="10" fill="${C.canvas}" opacity="0.97"/>
  <rect x="${x + 26}" y="${y + round(h * 0.22)}" width="${w - 52}" height="4" rx="2" fill="${accent}"/>
  <text x="320" y="${y + round(h * 0.22) + 32}" text-anchor="middle" font-family="${FONT}" font-size="17" font-weight="700" fill="${C.navy}">${label}</text>
  <text x="320" y="${y + round(h * 0.22) + 52}" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="500" fill="${C.slate}">${sub}</text>`;
}

/* -------------------------------------------------------------------------- */
/* 4. WATER HEATER - an insulated tank above a bank of collectors              */
/* -------------------------------------------------------------------------- */

function waterHeaterArt({ label, sub, accent = C.accent, flatPlate = false }) {
  const tankX = 140;
  const tankY = 104;
  const tankW = 360;
  const tankH = 76;

  /* Evacuated tubes rake down and forward; a flat plate is one glazed box. */
  const collector = flatPlate
    ? `<path d="M168 196 L500 196 L470 318 L138 318 Z" fill="url(#metal)"/>
       <path d="M180 206 L488 206 L462 308 L156 308 Z" fill="url(#glassFace)"/>
       ${Array.from({ length: 7 }, (_, i) => {
         const t = (i + 1) / 8;
         const x1 = 180 + (488 - 180) * t;
         const x2 = 156 + (462 - 156) * t;
         return `<line x1="${round(x1)}" y1="206" x2="${round(x2)}" y2="308" stroke="${C.accentPale}" stroke-width="2" opacity="0.32"/>`;
       }).join("")}`
    : Array.from({ length: 9 }, (_, i) => {
        const topX = 176 + i * 36;
        const botX = 150 + i * 38;
        return `<path d="M${topX} 186 L${round(topX + 22)} 186 L${round(botX + 24)} 320 L${botX} 320 Z" fill="${C.navySoft}"/>
                <path d="M${round(topX + 4)} 190 L${round(topX + 11)} 190 L${round(botX + 12)} 314 L${round(botX + 5)} 314 Z" fill="${C.accentPale}" opacity="0.3"/>`;
      }).join("");

  return `
  ${groundShadow(320, 340, 230, 13)}
  ${sun(548, 74, 18, accent)}
  ${collector}

  <!-- support frame -->
  <path d="M150 320 L138 350 M490 320 L502 350" stroke="${C.muted}" stroke-width="7" stroke-linecap="round"/>

  <!-- insulated tank -->
  <rect x="${tankX}" y="${tankY}" width="${tankW}" height="${tankH}" rx="${tankH / 2}" fill="url(#caseFront)"/>
  <rect x="${tankX}" y="${tankY}" width="${tankW}" height="${round(tankH * 0.4)}" rx="${tankH / 2}" fill="${C.surface}" opacity="0.06"/>
  <ellipse cx="${tankX}" cy="${tankY + tankH / 2}" rx="15" ry="${tankH / 2}" fill="${C.navyTop}"/>
  <ellipse cx="${tankX + tankW}" cy="${tankY + tankH / 2}" rx="15" ry="${tankH / 2}" fill="${C.navyDeep}"/>

  <rect x="230" y="${tankY + 14}" width="180" height="48" rx="10" fill="${C.canvas}" opacity="0.97"/>
  <rect x="230" y="${tankY + 14}" width="180" height="4" rx="2" fill="${accent}"/>
  <text x="320" y="${tankY + 37}" text-anchor="middle" font-family="${FONT}" font-size="17" font-weight="700" fill="${C.navy}">${label}</text>
  <text x="320" y="${tankY + 54}" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="500" fill="${C.slate}">${sub}</text>`;
}

/* -------------------------------------------------------------------------- */
/* 5. STREET LIGHT - pole, luminaire and panel                                 */
/* -------------------------------------------------------------------------- */

function streetLightArt({ label, sub, accent = C.accent, split = false }) {
  const poleX = 262;

  /* All-in-one carries the panel on the head; split mounts it separately. */
  const panel = split
    ? `<path d="M398 92 L520 76 L534 128 L412 144 Z" fill="url(#metal)"/>
       <path d="M406 99 L514 85 L526 123 L418 137 Z" fill="url(#glassFace)"/>
       <path d="M412 118 L522 104 M462 92 L470 130" stroke="${C.navyDeep}" stroke-width="1.6" opacity="0.5"/>
       <path d="M466 140 L466 250" stroke="${C.muted}" stroke-width="8" stroke-linecap="round"/>
       <path d="M466 250 l0 78" stroke="${C.slate}" stroke-width="9" stroke-linecap="round"/>
       <ellipse cx="466" cy="336" rx="26" ry="8" fill="${C.navy}" opacity="0.1"/>`
    : `<path d="M${poleX - 12} 108 L${poleX + 134} 92 L${poleX + 146} 142 L${poleX} 158 Z" fill="url(#metal)"/>
       <path d="M${poleX - 4} 115 L${poleX + 128} 100 L${poleX + 138} 135 L${poleX + 6} 151 Z" fill="url(#glassFace)"/>
       <path d="M${poleX + 2} 133 L${poleX + 132} 118 M${poleX + 60} 107 L${poleX + 68} 145" stroke="${C.navyDeep}" stroke-width="1.6" opacity="0.5"/>`;

  const headY = split ? 150 : 172;

  return `
  ${groundShadow(320, 350, 150)}
  ${sun(96, 84, 18, accent)}
  ${panel}

  <!-- pole -->
  <path d="M${poleX + 58} ${headY + 26} L${poleX + 58} 330" stroke="${C.slate}" stroke-width="11" stroke-linecap="round"/>
  <rect x="${poleX + 30}" y="326" width="56" height="16" rx="6" fill="${C.navy}" opacity="0.18"/>

  <!-- luminaire -->
  <path d="M${poleX + 8} ${headY} L${poleX + 108} ${headY} L${poleX + 96} ${headY + 26} L${poleX + 20} ${headY + 26} Z" fill="url(#caseFront)"/>
  <rect x="${poleX + 22}" y="${headY + 24}" width="72" height="7" rx="3.5" fill="${accent}"/>

  <!-- light cone, very soft -->
  <path d="M${poleX + 24} ${headY + 32} L${poleX + 92} ${headY + 32} L${poleX + 150} 330 L${poleX - 34} 330 Z" fill="${accent}" opacity="0.1"/>

  <!-- label plate on the pole base -->
  <rect x="230" y="248" width="180" height="48" rx="10" fill="${C.canvas}" opacity="0.97"/>
  <rect x="230" y="248" width="180" height="4" rx="2" fill="${accent}"/>
  <text x="320" y="271" text-anchor="middle" font-family="${FONT}" font-size="17" font-weight="700" fill="${C.navy}">${label}</text>
  <text x="320" y="288" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="500" fill="${C.slate}">${sub}</text>`;
}

/* -------------------------------------------------------------------------- */
/* Asset list                                                                 */
/* -------------------------------------------------------------------------- */

const renderers = {
  panel: panelArt,
  inverter: inverterArt,
  battery: batteryArt,
  heater: waterHeaterArt,
  light: streetLightArt,
};

function scene({ kind, title, ...options }) {
  const accent = options.accent ?? C.accent;
  return svg(`${defs(accent)}${backdrop()}${renderers[kind](options)}`, { title });
}

let written = 0;
const write = (file, contents) => {
  writeFileSync(join(outDir, `${file}.svg`), contents, "utf8");
  written += 1;
};

/* -- Category art ------------------------------------------------------- */
const categoryArt = [
  { file: "category-solar-panels", kind: "panel", label: "CIBI", sub: "SOLAR PANELS", title: "Solar panels" },
  { file: "category-solar-inverters", kind: "inverter", label: "CIBI", sub: "INVERTERS", title: "Solar inverters" },
  { file: "category-solar-batteries", kind: "battery", label: "CIBI", sub: "STORAGE", title: "Solar batteries" },
  { file: "category-solar-water-heaters", kind: "heater", label: "CIBI", sub: "WATER HEATERS", accent: C.mint, title: "Solar water heaters" },
  { file: "category-solar-street-lights", kind: "light", label: "CIBI", sub: "STREET LIGHTS", accent: C.mint, title: "Solar street lights" },
];

for (const art of categoryArt) write(art.file, scene(art));

/* -- Product art - filenames must match the `image` fields in data/products */
const productArt = [
  { file: "product-cibi-ray-400-solar-panel", kind: "panel", label: "RAY 400", sub: "400 W / Mono", cols: 5, rows: 4, title: "Cibi Ray 400 solar panel" },
  { file: "product-cibi-ray-550-solar-panel", kind: "panel", label: "RAY 550", sub: "550 W / Mono", cols: 6, rows: 4, title: "Cibi Ray 550 solar panel" },
  { file: "product-cibi-ray-bifacial-585-solar-panel", kind: "panel", label: "RAY BIFACIAL", sub: "585 W / Dual glass", cols: 6, rows: 4, bifacial: true, title: "Cibi Ray Bifacial 585 solar panel" },

  { file: "product-cibi-flow-3kw-ongrid-solar-inverter", kind: "inverter", label: "FLOW 3kW", sub: "On-grid / 1 phase", title: "Cibi Flow 3kW on-grid inverter" },
  { file: "product-cibi-flow-5kw-hybrid-solar-inverter", kind: "inverter", label: "FLOW 5kW", sub: "Hybrid / 1 phase", title: "Cibi Flow 5kW hybrid inverter" },
  { file: "product-cibi-flow-10kw-ongrid-solar-inverter", kind: "inverter", label: "FLOW 10kW", sub: "On-grid / 3 phase", threePhase: true, title: "Cibi Flow 10kW three-phase inverter" },

  { file: "product-cibi-store-li-5-solar-battery", kind: "battery", label: "STORE Li 5.1", sub: "5.12 kWh / LFP", title: "Cibi Store Li 5.1 solar battery" },
  { file: "product-cibi-store-li-10-solar-battery", kind: "battery", label: "STORE Li 10.2", sub: "10.24 kWh / LFP", title: "Cibi Store Li 10.2 solar battery" },
  { file: "product-cibi-store-150-tubular-solar-battery", kind: "battery", label: "STORE 150", sub: "150 Ah / Tubular", tubular: true, title: "Cibi Store 150 tubular solar battery" },

  { file: "product-cibi-warm-100-etc-solar-water-heater", kind: "heater", label: "WARM 100", sub: "100 LPD / ETC", accent: C.mint, title: "Cibi Warm 100 solar water heater" },
  { file: "product-cibi-warm-200-etc-solar-water-heater", kind: "heater", label: "WARM 200", sub: "200 LPD / ETC", accent: C.mint, title: "Cibi Warm 200 solar water heater" },
  { file: "product-cibi-warm-300-fpc-solar-water-heater", kind: "heater", label: "WARM 300", sub: "300 LPD / FPC", accent: C.mint, flatPlate: true, title: "Cibi Warm 300 flat plate solar water heater" },

  { file: "product-cibi-beam-20-solar-street-light", kind: "light", label: "BEAM 20", sub: "20 W / All-in-one", accent: C.mint, title: "Cibi Beam 20 solar street light" },
  { file: "product-cibi-beam-40-solar-street-light", kind: "light", label: "BEAM 40", sub: "40 W / All-in-one", accent: C.mint, title: "Cibi Beam 40 solar street light" },
  { file: "product-cibi-beam-60-split-solar-street-light", kind: "light", label: "BEAM 60", sub: "60 W / Split", accent: C.mint, split: true, title: "Cibi Beam 60 split solar street light" },
];

for (const art of productArt) write(art.file, scene(art));

/* -------------------------------------------------------------------------- */
/* Hero - a rooftop array under a soft sun                                     */
/* -------------------------------------------------------------------------- */

{
  const W = 720;
  const H = 560;

  /* One module, drawn large. An array of small panels reads as clutter at
     hero size; a single well-drawn module reads as a product. */
  const module = (ox, oy, s) => {
    const bl = [ox, oy];
    const br = [ox + 210 * s, oy - 30 * s];
    const tr = [ox + 260 * s, oy - 128 * s];
    const tl = [ox + 50 * s, oy - 98 * s];
    const pt = (p) => `${round(p[0])} ${round(p[1])}`;
    const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const face = (u, v) => lerp(lerp(bl, br, u), lerp(tl, tr, u), v);

    const grid = [
      ...[0.25, 0.5, 0.75].map((u) =>
        `<line x1="${round(face(u, 0)[0])}" y1="${round(face(u, 0)[1])}" x2="${round(face(u, 1)[0])}" y2="${round(face(u, 1)[1])}" stroke="${C.navyDeep}" stroke-width="1.4" opacity="0.45"/>`),
      ...[0.33, 0.66].map((v) =>
        `<line x1="${round(face(0, v)[0])}" y1="${round(face(0, v)[1])}" x2="${round(face(1, v)[0])}" y2="${round(face(1, v)[1])}" stroke="${C.navyDeep}" stroke-width="1.4" opacity="0.45"/>`),
    ].join("");

    return `
    <path d="M${pt(bl)} L${pt(br)} L${pt(tr)} L${pt(tl)} Z" fill="url(#metal)"/>
    <path d="M${pt(face(0.03, 0.06))} L${pt(face(0.97, 0.06))} L${pt(face(0.97, 0.94))} L${pt(face(0.03, 0.94))} Z" fill="url(#glassFace)"/>
    ${grid}
    <path d="M${pt(face(0.03, 0.94))} L${pt(face(0.4, 0.94))} L${pt(face(0.03, 0.34))} Z" fill="${C.surface}" opacity="0.08"/>
    <path d="M${pt(bl)} l0 ${round(26 * s)}" stroke="${C.muted}" stroke-width="${round(6 * s)}" stroke-linecap="round"/>
    <path d="M${pt(br)} l0 ${round(26 * s)}" stroke="${C.muted}" stroke-width="${round(6 * s)}" stroke-linecap="round"/>`;
  };

  const body = `
  ${defs()}
  <circle cx="520" cy="162" r="216" fill="url(#glow)"/>
  <circle cx="520" cy="162" r="104" fill="none" stroke="${C.accent}" stroke-opacity="0.16"/>
  <circle cx="520" cy="162" r="146" fill="none" stroke="${C.accent}" stroke-opacity="0.08"/>
  ${sun(520, 162, 34)}

  ${groundShadow(360, 486, 236, 17)}
  ${module(158, 452, 1.55)}`;

  writeFileSync(
    join(outDir, "hero-rooftop-solar-system.svg"),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="A rooftop solar array with panels angled toward the sun">
  <title>A rooftop solar array with panels angled toward the sun</title>${body}
</svg>
`,
    "utf8",
  );
  written += 1;
}

/* -------------------------------------------------------------------------- */
/* About - an installation scene rather than stock-photo mimicry               */
/* -------------------------------------------------------------------------- */

{
  const W = 640;
  const H = 480;

  const body = `
  <defs>
    <linearGradient id="panelB" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0%" stop-color="#2d5f8a"/>
      <stop offset="100%" stop-color="${C.navy}"/>
    </linearGradient>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${C.tintBlue}"/>
      <stop offset="100%" stop-color="${C.surface}"/>
    </linearGradient>
    <radialGradient id="softGlow">
      <stop offset="0%" stop-color="${C.accent}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${C.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" rx="24" fill="${C.canvas}"/>
  <rect x="40" y="44" width="560" height="272" rx="20" fill="url(#sky)" stroke="${C.line}"/>
  <circle cx="470" cy="130" r="150" fill="url(#softGlow)"/>
  ${sun(486, 118, 26)}

  <!-- house -->
  <path d="M96 300 L96 214 L226 146 L356 214 L356 300 Z" fill="${C.surface}" stroke="${C.slate}" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M84 220 L226 136 L368 220" fill="none" stroke="${C.navy}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="140" y="242" width="46" height="58" rx="4" fill="${C.tintBlue}" stroke="${C.slate}" stroke-width="2"/>
  <rect x="266" y="242" width="46" height="46" rx="4" fill="${C.tintBlue}" stroke="${C.slate}" stroke-width="2"/>

  <!-- panels on the roof plane, following its pitch -->
  <path d="M150 218 L222 176 L292 218 L220 260 Z" fill="url(#panelB)"/>
  <path d="M168 218 L226 184 M204 200 L262 234 M186 236 L244 202" stroke="${C.accentPale}" stroke-width="1.6" opacity="0.4"/>
  <path d="M240 168 L296 136 L352 168 L296 200 Z" fill="url(#panelB)" opacity="0.92"/>
  <path d="M256 168 L300 143 M278 155 L322 181" stroke="${C.accentPale}" stroke-width="1.6" opacity="0.4"/>

  <!-- inverter on the wall -->
  <rect x="392" y="214" width="78" height="96" rx="12" fill="url(#panelB)"/>
  <rect x="404" y="228" width="54" height="34" rx="6" fill="${C.canvas}"/>
  <rect x="404" y="228" width="54" height="3" rx="1.5" fill="${C.accent}"/>
  <circle cx="412" cy="280" r="4.5" fill="${C.mint}"/>
  <circle cx="426" cy="280" r="4.5" fill="${C.muted}" opacity="0.5"/>

  <!-- the line from roof to inverter: what the system actually does -->
  <path d="M296 200 q 60 40 96 46" fill="none" stroke="${C.accent}" stroke-width="2.6" stroke-dasharray="7 7" opacity="0.7"/>

  <!-- a quiet trust mark -->
  <g transform="translate(74,352)">
    <circle cx="34" cy="34" r="34" fill="${C.surface}" stroke="${C.line}"/>
    <path d="M34 16 l16 6 v14 c0 9.4-6.6 16.6-16 19.6-9.4-3-16-10.2-16-19.6V22z" fill="none" stroke="${C.mint}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="m27 34 5 5 10-11" fill="none" stroke="${C.mint}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <text x="170" y="380" font-family="${FONT}" font-size="17" font-weight="700" fill="${C.navy}">Installed properly.</text>
  <text x="170" y="404" font-family="${FONT}" font-size="14" font-weight="500" fill="${C.slate}">Surveyed, sized and commissioned.</text>
  <text x="170" y="428" font-family="${FONT}" font-size="14" font-weight="500" fill="${C.slate}">Then looked after.</text>`;

  writeFileSync(
    join(outDir, "about-solar-installation.svg"),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Solar panels being installed on a clean residential rooftop">
  <title>Solar panels being installed on a clean residential rooftop</title>
  ${body}
</svg>
`,
    "utf8",
  );
  written += 1;
}

/* -------------------------------------------------------------------------- */
/* Logo mark - referenced by Organization structured data                     */
/* -------------------------------------------------------------------------- */

writeFileSync(
  join(outDir, "cibi-solar-logo.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-label="Cibi Solar logo">
  <title>Cibi Solar logo</title>
  <rect width="512" height="512" rx="75" fill="${C.accent}"/>
  <circle cx="256" cy="172" r="59" fill="${C.navy}"/>
  <path d="M114 382 L156 271h200l42 111z" fill="none" stroke="${C.navy}" stroke-width="27" stroke-linejoin="round"/>
  <path d="M138 326h236M256 271v111" stroke="${C.navy}" stroke-width="22" stroke-linecap="round"/>
</svg>
`,
  "utf8",
);
written += 1;

console.log(`Generated ${written} SVG assets in public/images/`);
