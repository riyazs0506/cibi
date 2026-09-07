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
  canvas: "#f8fafc",
  surface: "#ffffff",
  navy: "#102a43",
  navySoft: "#1c3d5a",
  navyDeep: "#0a1e30",
  navyTop: "#27547a",
  slate: "#486581",
  muted: "#829ab1",
  line: "#e6eef5",
  accent: "#5b9dff",
  accentDeep: "#3d82ea",
  mint: "#65c9a5",
  tintBlue: "#eef5ff",
};

const WIDTH = 640;
const HEIGHT = 420;

const FONT =
  "system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif";

/** Form factors, roughly to scale against one another. */
/* Sized so each battery fills its frame, and so the four sit on a shared
   ground line at roughly true relative scale to one another. */
const shapes = {
  standard: { frontW: 350, frontH: 230, depthX: 104, depthY: 60, baseY: 372 },
  compact: { frontW: 230, frontH: 200, depthX: 76, depthY: 44, baseY: 372 },
  wide: { frontW: 420, frontH: 238, depthX: 112, depthY: 64, baseY: 372 },
  tall: { frontW: 250, frontH: 282, depthX: 84, depthY: 48, baseY: 372 },
};

/* -------------------------------------------------------------------------- */
/* Geometry helpers                                                           */
/* -------------------------------------------------------------------------- */

function geometry(shape) {
  const { frontW, frontH, depthX, depthY, baseY } = shape;
  const fx = WIDTH / 2 - frontW / 2 - depthX / 2;
  const fy = baseY - frontH;

  return {
    fx,
    fy,
    frontW,
    frontH,
    depthX,
    depthY,
    /** Maps (u across width, v across depth) onto the top face. */
    top: (u, v) => [fx + u * frontW + v * depthX, fy - v * depthY],
  };
}

const round = (n) => Math.round(n * 10) / 10;

/** Squat cylinder used for terminal posts. */
function terminal(px, py, { rx = 13, ry = 6.5, height = 17, fill, top }) {
  return `
    <ellipse cx="${round(px)}" cy="${round(py)}" rx="${rx + 4}" ry="${ry + 2}" fill="${C.navyDeep}" opacity="0.55"/>
    <rect x="${round(px - rx)}" y="${round(py - height)}" width="${rx * 2}" height="${height}" fill="${fill}"/>
    <ellipse cx="${round(px)}" cy="${round(py)}" rx="${rx}" ry="${ry}" fill="${fill}"/>
    <ellipse cx="${round(px)}" cy="${round(py - height)}" rx="${rx}" ry="${ry}" fill="${top}"/>`;
}

/* -------------------------------------------------------------------------- */
/* The battery drawing                                                        */
/* -------------------------------------------------------------------------- */

function battery({ shape = "standard", label = "", sub = "", accent = C.accent }) {
  const g = geometry(shapes[shape]);
  const { fx, fy, frontW, frontH, depthX, depthY } = g;

  const [t1x, t1y] = g.top(0.17, 0.6);
  const [t2x, t2y] = g.top(0.83, 0.6);
  const post = {
    rx: Math.round(frontW * 0.049),
    ry: Math.round(frontW * 0.025),
    height: Math.round(frontW * 0.062),
  };

  /* Vent caps run front-to-back across the middle of the lid. */
  const vents = [0.34, 0.5, 0.66]
    .map((u) => {
      const [vx, vy] = g.top(u, 0.34);
      return `<ellipse cx="${round(vx)}" cy="${round(vy)}" rx="${round(frontW * 0.045)}" ry="${round(frontW * 0.022)}" fill="${C.navyDeep}" opacity="0.35"/>`;
    })
    .join("");

  /* Label plate, inset on the front face. */
  const plateX = fx + frontW * 0.11;
  const plateW = frontW * 0.78;
  const plateY = fy + frontH * 0.3;
  const plateH = frontH * 0.42;

  const labelSize = Math.round(frontW * 0.072);
  const subSize = Math.round(frontW * 0.049);

  return `
  <!-- ground shadow -->
  <ellipse cx="${WIDTH / 2}" cy="${round(fy + frontH + 14)}" rx="${round(frontW * 0.72)}" ry="16" fill="${C.navy}" opacity="0.08"/>

  <!-- side face -->
  <path d="M${round(fx + frontW)} ${round(fy)} L${round(fx + frontW + depthX)} ${round(fy - depthY)} L${round(fx + frontW + depthX)} ${round(fy + frontH - depthY)} L${round(fx + frontW)} ${round(fy + frontH)} Z" fill="${C.navyDeep}"/>

  <!-- top face -->
  <path d="M${round(fx)} ${round(fy)} L${round(fx + depthX)} ${round(fy - depthY)} L${round(fx + frontW + depthX)} ${round(fy - depthY)} L${round(fx + frontW)} ${round(fy)} Z" fill="${C.navyTop}"/>

  <!-- lid inset -->
  <path d="M${round(fx + frontW * 0.06 + depthX * 0.16)} ${round(fy - depthY * 0.16)} L${round(fx + depthX * 0.84 + frontW * 0.06)} ${round(fy - depthY * 0.84)} L${round(fx + frontW * 0.94 + depthX * 0.84)} ${round(fy - depthY * 0.84)} L${round(fx + frontW * 0.94 + depthX * 0.16)} ${round(fy - depthY * 0.16)} Z" fill="${C.navySoft}" opacity="0.75"/>
  ${vents}

  <!-- front face -->
  <rect x="${round(fx)}" y="${round(fy)}" width="${frontW}" height="${frontH}" rx="7" fill="url(#caseFront)"/>
  <!-- soft top highlight on the front face -->
  <rect x="${round(fx)}" y="${round(fy)}" width="${frontW}" height="${round(frontH * 0.32)}" rx="7" fill="${C.surface}" opacity="0.05"/>

  <!-- label plate -->
  <rect x="${round(plateX)}" y="${round(plateY)}" width="${round(plateW)}" height="${round(plateH)}" rx="9" fill="${C.canvas}" opacity="0.96"/>
  <rect x="${round(plateX)}" y="${round(plateY)}" width="${round(plateW)}" height="4.5" rx="2.2" fill="${accent}"/>
  <text x="${round(plateX + plateW / 2)}" y="${round(plateY + plateH * 0.47)}" text-anchor="middle" font-family="${FONT}" font-size="${labelSize}" font-weight="700" fill="${C.navy}" letter-spacing="-0.3">${label}</text>
  <text x="${round(plateX + plateW / 2)}" y="${round(plateY + plateH * 0.78)}" text-anchor="middle" font-family="${FONT}" font-size="${subSize}" font-weight="500" fill="${C.slate}" letter-spacing="0.4">${sub}</text>

  <!-- terminals: accent marks positive, neutral marks negative -->
  ${terminal(t1x, t1y, { ...post, fill: accent, top: "#8dbcff" })}
  ${terminal(t2x, t2y, { ...post, fill: C.muted, top: "#a8bccd" })}`;
}

/** Page background: warm white with one very soft blue bloom. */
function backdrop() {
  return `
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${C.canvas}"/>
  <circle cx="${WIDTH / 2}" cy="${HEIGHT * 0.52}" r="248" fill="url(#glow)"/>`;
}

function defs(accent = C.accent) {
  return `
  <defs>
    <linearGradient id="caseFront" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${C.navySoft}"/>
      <stop offset="100%" stop-color="${C.navy}"/>
    </linearGradient>
    <radialGradient id="glow">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.16"/>
      <stop offset="70%" stop-color="${accent}" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>`;
}

function svg(body, { width = WIDTH, height = HEIGHT, title }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${title}">
  <title>${title}</title>${body}
</svg>
`;
}

/** A complete battery illustration on its backdrop. */
function batteryScene(options) {
  return svg(
    `${defs(options.accent)}${backdrop()}${battery(options)}`,
    { title: options.title },
  );
}

/* -------------------------------------------------------------------------- */
/* Asset list                                                                 */
/* -------------------------------------------------------------------------- */

const categoryArt = [
  { file: "category-car-battery", shape: "standard", label: "CIBI", sub: "CAR", title: "Car battery" },
  { file: "category-bike-battery", shape: "compact", label: "CIBI", sub: "BIKE", accent: C.mint, title: "Bike battery" },
  { file: "category-commercial-battery", shape: "wide", label: "CIBI", sub: "COMMERCIAL", title: "Commercial vehicle battery" },
  { file: "category-heavy-duty-battery", shape: "wide", label: "CIBI", sub: "HEAVY-DUTY", accent: C.mint, title: "Heavy-duty battery" },
  { file: "category-inverter-battery", shape: "tall", label: "CIBI", sub: "INVERTER", title: "Inverter battery" },
];

/** Mirrors data/products.ts - filenames must match the `image` fields there. */
const productArt = [
  ["product-cibi-drive-35-car-battery", "standard", "DRIVE 35", "35 Ah / 12 V", C.accent],
  ["product-cibi-drive-45-car-battery", "standard", "DRIVE 45", "45 Ah / 12 V", C.accent],
  ["product-cibi-drive-65-car-battery", "standard", "DRIVE 65", "65 Ah / 12 V", C.accent],
  ["product-cibi-drive-agm-60-car-battery", "standard", "DRIVE AGM 60", "60 Ah / 12 V", C.mint],
  ["product-cibi-ride-5-bike-battery", "compact", "RIDE 5", "5 Ah / 12 V", C.mint],
  ["product-cibi-ride-9-bike-battery", "compact", "RIDE 9", "9 Ah / 12 V", C.mint],
  ["product-cibi-ride-14-bike-battery", "compact", "RIDE 14", "14 Ah / 12 V", C.mint],
  ["product-cibi-haul-88-commercial-battery", "wide", "HAUL 88", "88 Ah / 12 V", C.accent],
  ["product-cibi-haul-130-commercial-battery", "wide", "HAUL 130", "130 Ah / 12 V", C.accent],
  ["product-cibi-haul-150-commercial-battery", "wide", "HAUL 150", "150 Ah / 12 V", C.accent],
  ["product-cibi-force-180-heavy-duty-battery", "wide", "FORCE 180", "180 Ah / 12 V", C.mint],
  ["product-cibi-force-200-heavy-duty-battery", "wide", "FORCE 200", "200 Ah / 12 V", C.mint],
  ["product-cibi-home-100-inverter-battery", "tall", "HOME 100", "100 Ah / 12 V", C.accent],
  ["product-cibi-home-150-inverter-battery", "tall", "HOME 150", "150 Ah / 12 V", C.accent],
  ["product-cibi-home-220-inverter-battery", "tall", "HOME 220", "220 Ah / 12 V", C.accent],
];

let written = 0;
const write = (file, contents) => {
  writeFileSync(join(outDir, `${file}.svg`), contents, "utf8");
  written += 1;
};

for (const art of categoryArt) {
  write(
    art.file,
    batteryScene({
      shape: art.shape,
      label: art.label,
      sub: art.sub,
      accent: art.accent ?? C.accent,
      title: art.title,
    }),
  );
}

for (const [file, shape, label, sub, accent] of productArt) {
  write(
    file,
    batteryScene({
      shape,
      label,
      sub,
      accent,
      title: `${label.replace(/\b\w/g, (c) => c.toUpperCase())} battery`,
    }),
  );
}

/* -------------------------------------------------------------------------- */
/* Hero - a larger battery with a softer, wider bloom                          */
/* -------------------------------------------------------------------------- */

const HERO_W = 720;
const HERO_H = 560;

{
  const heroShape = { frontW: 372, frontH: 244, depthX: 110, depthY: 63, baseY: 396 };
  const savedW = shapes.standard;
  shapes.standard = heroShape;

  const body = `
  ${defs()}
  <rect width="${HERO_W}" height="${HERO_H}" fill="none"/>
  <circle cx="${HERO_W / 2}" cy="270" r="255" fill="url(#glow)"/>
  <!-- concentric rings imply energy without any literal effect -->
  <circle cx="${HERO_W / 2}" cy="270" r="196" fill="none" stroke="${C.accent}" stroke-opacity="0.14"/>
  <circle cx="${HERO_W / 2}" cy="270" r="248" fill="none" stroke="${C.accent}" stroke-opacity="0.08"/>
  <g transform="translate(${(HERO_W - WIDTH) / 2}, 52)">
    ${battery({ shape: "standard", label: "CIBI POWER", sub: "12 V / 45 Ah", accent: C.accent })}
  </g>`;

  writeFileSync(
    join(outDir, "hero-premium-car-battery.svg"),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${HERO_W} ${HERO_H}" width="${HERO_W}" height="${HERO_H}" role="img" aria-label="Premium 12 volt car battery">
  <title>Premium 12 volt car battery</title>${body}
</svg>
`,
    "utf8",
  );
  written += 1;
  shapes.standard = savedW;
}

/* -------------------------------------------------------------------------- */
/* About - an abstract service composition rather than stock-photo mimicry     */
/* -------------------------------------------------------------------------- */

{
  const W = 640;
  const H = 480;

  const body = `
  <defs>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.surface}"/>
      <stop offset="100%" stop-color="${C.tintBlue}"/>
    </linearGradient>
    <linearGradient id="deep" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${C.navySoft}"/>
      <stop offset="100%" stop-color="${C.navy}"/>
    </linearGradient>
    <radialGradient id="softGlow">
      <stop offset="0%" stop-color="${C.accent}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${C.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" rx="24" fill="${C.canvas}"/>
  <circle cx="200" cy="160" r="200" fill="url(#softGlow)"/>

  <!-- back panel: a service bay wall -->
  <rect x="56" y="70" width="418" height="300" rx="20" fill="url(#panel)" stroke="${C.line}"/>
  <line x1="56" y1="150" x2="474" y2="150" stroke="${C.line}"/>
  <circle cx="92" cy="110" r="7" fill="${C.accent}" opacity="0.5"/>
  <circle cx="116" cy="110" r="7" fill="${C.mint}" opacity="0.5"/>

  <!-- a vehicle profile, drawn as a single calm line -->
  <path d="M120 300 q14-56 62-58 h84 q34 0 58 30 l26 28 h44 q26 0 26 24 v18 q0 12-14 12 h-268 q-18 0-18-20 z"
        fill="${C.surface}" stroke="${C.slate}" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M196 246 h64 q24 0 42 22 l14 16 h-120 z" fill="${C.tintBlue}" stroke="${C.slate}" stroke-width="2"/>
  <circle cx="200" cy="354" r="26" fill="${C.surface}" stroke="${C.navy}" stroke-width="3"/>
  <circle cx="200" cy="354" r="10" fill="${C.line}"/>
  <circle cx="368" cy="354" r="26" fill="${C.surface}" stroke="${C.navy}" stroke-width="3"/>
  <circle cx="368" cy="354" r="10" fill="${C.line}"/>

  <!-- the battery being fitted, lifted forward -->
  <g transform="translate(404,214)">
    <rect x="6" y="10" width="150" height="112" rx="12" fill="${C.navy}" opacity="0.12"/>
    <rect x="0" y="0" width="150" height="112" rx="12" fill="url(#deep)"/>
    <rect x="18" y="34" width="114" height="56" rx="8" fill="${C.canvas}"/>
    <rect x="18" y="34" width="114" height="4" rx="2" fill="${C.accent}"/>
    <text x="75" y="62" text-anchor="middle" font-family="${FONT}" font-size="15" font-weight="700" fill="${C.navy}">CIBI</text>
    <text x="75" y="80" text-anchor="middle" font-family="${FONT}" font-size="11" font-weight="500" fill="${C.slate}">12 V</text>
    <rect x="26" y="-11" width="26" height="13" rx="4" fill="${C.accent}"/>
    <rect x="100" y="-11" width="26" height="13" rx="4" fill="${C.muted}"/>
  </g>

  <!-- a quiet trust mark -->
  <g transform="translate(96,300)">
    <circle cx="34" cy="34" r="34" fill="${C.surface}" stroke="${C.line}"/>
    <path d="M34 16 l16 6 v14 c0 9.4-6.6 16.6-16 19.6-9.4-3-16-10.2-16-19.6V22z" fill="none" stroke="${C.mint}" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="m27 34 5 5 10-11" fill="none" stroke="${C.mint}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;

  writeFileSync(
    join(outDir, "about-battery-fitting-service.svg"),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="A battery being fitted to a vehicle in a clean service bay">
  <title>A battery being fitted to a vehicle in a clean service bay</title>
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
  join(outDir, "cibi-power-logo.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-label="Cibi Power logo">
  <title>Cibi Power logo</title>
  <rect width="512" height="512" rx="150" fill="${C.navy}"/>
  <rect x="136" y="158" width="240" height="210" rx="48" fill="none" stroke="${C.surface}" stroke-width="26"/>
  <path d="M217 158v-28a15 15 0 0 1 15-15h48a15 15 0 0 1 15 15v28" fill="none" stroke="${C.surface}" stroke-width="26" stroke-linecap="round"/>
  <rect x="175" y="247" width="162" height="84" rx="24" fill="${C.accent}"/>
</svg>
`,
  "utf8",
);
written += 1;

console.log(`Generated ${written} SVG assets in public/images/`);
