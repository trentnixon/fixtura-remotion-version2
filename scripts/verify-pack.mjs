/**
 * Ensures publish `files` paths exist and critical Tailwind-scan paths are present.
 * Does not invoke `npm pack` (avoids prepack recursion when used from npm scripts).
 */

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const files = pkg.files;
if (!Array.isArray(files) || files.length === 0) {
  console.error("verify-pack: package.json `files` must be a non-empty array");
  process.exit(1);
}

let failed = false;
for (const rel of files) {
  const abs = join(root, rel);
  if (!existsSync(abs)) {
    console.error(`verify-pack: missing published path: ${rel}`);
    failed = true;
  }
}

const mustExist = [
  "src/templates/variants/basic/theme.ts",
  "src/components",
  "src/compositions",
  "src/core",
  "dist/preview.js",
  "dist/preview.mjs",
  "dist/preview.d.ts",
  "dist/preview-core.js",
  "dist/preview-core.mjs",
  "dist/preview-core.d.ts",
  "dist/preview.css",
  "dist/templates/scoreline.mjs",
  "dist/templates/night-session.mjs",
  "dist/templates/mudgeeraba.mjs",
];

for (const rel of mustExist) {
  const abs = join(root, rel);
  if (!existsSync(abs)) {
    console.error(`verify-pack: required path missing: ${rel}`);
    failed = true;
  }
}

const scorelineChecks = [
  {
    path: "dist/preview.css",
    label: "dist/preview.css",
    needles: [".scoreline-canvas", ".results-ledger"],
  },
  {
    path: "dist/preview.mjs",
    label: "dist/preview.mjs",
    needles: ["ScorelineBundledStyles", "loadPreviewTemplateComponent"],
  },
  {
    path: "src/package/generated/scorelineBundledCss.ts",
    label: "scorelineBundledCss.ts",
    needles: [
      "SCORELINE_BUNDLED_CSS",
      ".scoreline-canvas",
      ".scoreline-intro__panel",
    ],
  },
  {
    path: "dist/preview.css",
    label: "dist/preview.css (intro layout)",
    needles: [".scoreline-intro__panel"],
  },
];

for (const check of scorelineChecks) {
  const abs = join(root, check.path);
  if (!existsSync(abs)) {
    console.error(
      `verify-pack: Scoreline bundle check missing file: ${check.path}`,
    );
    failed = true;
    continue;
  }
  const content = readFileSync(abs, "utf8");
  for (const needle of check.needles) {
    if (!content.includes(needle)) {
      console.error(
        `verify-pack: ${check.label} missing Scoreline marker: ${needle}`,
      );
      failed = true;
    }
  }
}

const nightSessionChecks = [
  {
    path: "dist/preview.css",
    label: "dist/preview.css (Night Session)",
    needles: [".night-session-canvas", ".leaderboard-ledger"],
  },
  {
    path: "dist/preview.mjs",
    label: "dist/preview.mjs (Night Session)",
    needles: ["NightSessionBundledStyles"],
  },
  {
    path: "src/package/generated/nightSessionBundledCss.ts",
    label: "nightSessionBundledCss.ts",
    needles: [
      "NIGHT_SESSION_BUNDLED_CSS",
      ".night-session-canvas",
      ".leaderboard-ledger",
    ],
  },
];

const bundledStyleNeedles = [
  { label: "Scoreline bundled CSS in dist", needles: [".scoreline-canvas", "fixtura-scoreline-styles"] },
  {
    label: "Night Session bundled CSS in dist",
    needles: [".night-session-canvas", "fixtura-night-session-styles"],
  },
];

for (const group of bundledStyleNeedles) {
  const distFiles = readdirSync(join(root, "dist")).filter((name) =>
    name.endsWith(".mjs"),
  );
  const combined = distFiles
    .map((name) => readFileSync(join(root, "dist", name), "utf8"))
    .join("\n");
  for (const needle of group.needles) {
    if (!combined.includes(needle)) {
      console.error(
        `verify-pack: ${group.label} missing marker in dist/*.mjs: ${needle}`,
      );
      failed = true;
    }
  }
}

for (const check of nightSessionChecks) {
  const abs = join(root, check.path);
  if (!existsSync(abs)) {
    console.error(
      `verify-pack: Night Session bundle check missing file: ${check.path}`,
    );
    failed = true;
    continue;
  }
  const content = readFileSync(abs, "utf8");
  for (const needle of check.needles) {
    if (!content.includes(needle)) {
      console.error(
        `verify-pack: ${check.label} missing Night Session marker: ${needle}`,
      );
      failed = true;
    }
  }
}

const corePath = join(root, "dist", "preview-core.mjs");
const previewEntry = join(root, "dist", "preview.mjs");
const MAX_CORE_BYTES = 120_000;
if (existsSync(corePath)) {
  const coreSize = readFileSync(corePath, "utf8").length;
  if (coreSize > MAX_CORE_BYTES) {
    console.error(
      `verify-pack: preview-core.mjs (${coreSize} bytes) exceeds ${MAX_CORE_BYTES} byte budget`,
    );
    failed = true;
  }
  const coreContent = readFileSync(corePath, "utf8");
  if (coreContent.includes("fixtura-scoreline-styles")) {
    console.error(
      "verify-pack: preview-core.mjs must not embed Scoreline bundled CSS",
    );
    failed = true;
  }
}
if (existsSync(previewEntry)) {
  const previewContent = readFileSync(previewEntry, "utf8");
  if (!previewContent.includes("loadPreviewTemplateComponent")) {
    console.error(
      "verify-pack: preview.mjs should wire lazy template loading",
    );
    failed = true;
  }
  const relativeImports = [
    ...previewContent.matchAll(/from "\.(\/[^"]+)"/g),
  ].map((match) => match[1]);
  for (const rel of relativeImports) {
    const withoutDot = rel.replace(/^\//, "");
    const abs = join(root, "dist", withoutDot);
    if (!existsSync(abs)) {
      console.error(`verify-pack: preview.mjs imports missing chunk: ${rel}`);
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log(
  "verify-pack: OK (files list + critical paths + Scoreline + Night Session CSS bundles + preview-core split)",
);
