/**
 * Ensures publish `files` paths exist and critical Tailwind-scan paths are present.
 * Does not invoke `npm pack` (avoids prepack recursion when used from npm scripts).
 */

import { readFileSync, existsSync } from "node:fs";
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
  "dist/preview.css",
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
    needles: [".scoreline-canvas", "fixtura-scoreline-styles"],
  },
  {
    path: "src/package/generated/scorelineBundledCss.ts",
    label: "scorelineBundledCss.ts",
    needles: ["SCORELINE_BUNDLED_CSS", ".scoreline-canvas"],
  },
];

for (const check of scorelineChecks) {
  const abs = join(root, check.path);
  if (!existsSync(abs)) {
    console.error(`verify-pack: Scoreline bundle check missing file: ${check.path}`);
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

if (failed) {
  process.exit(1);
}

console.log("verify-pack: OK (files list + critical paths + Scoreline CSS bundle)");
