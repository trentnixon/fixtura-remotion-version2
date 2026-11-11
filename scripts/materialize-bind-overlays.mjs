/**
 * Materialize bind overlays from legacy per-variant copies.
 * Removes hydration copies that are identical to design/_templates/cricket.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseBindMapJson } from "../design/_shared/lib/bind-json.js";
import {
  computeBindOverlay,
  mergeBindMaps,
} from "../design/_shared/lib/merge-bind-map.js";
import { validateRoutesManifest } from "../design/_shared/lib/manifest.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const templatesDir = path.join(root, "design/_templates/cricket");
const hydrationRoot = path.join(root, "design/_shared/hydration");
const overlayRoot = path.join(root, "design/_shared/hydration/overlays");

const routes = validateRoutesManifest(
  JSON.parse(
    fs.readFileSync(path.join(root, "design/_shared/routes.json"), "utf8"),
  ),
);

let removed = 0;
let overlays = 0;

for (const variantSlug of Object.keys(routes.variants)) {
  const sports = routes.variants[variantSlug]?.sports ?? {};
  for (const sportSlug of Object.keys(sports)) {
    const assets = sports[sportSlug]?.assets ?? {};
    for (const assetSlug of Object.keys(assets)) {
      const legacyPath = path.join(
        hydrationRoot,
        variantSlug,
        sportSlug,
        `${assetSlug}.bind.json`,
      );
      if (!fs.existsSync(legacyPath)) {
        continue;
      }

      const canonicalPath = path.join(templatesDir, `${assetSlug}.bind.json`);
      if (!fs.existsSync(canonicalPath)) {
        console.warn(`Skip ${variantSlug}/${assetSlug}: no canonical bind`);
        continue;
      }

      const base = parseBindMapJson(fs.readFileSync(canonicalPath, "utf8"));
      const legacy = parseBindMapJson(fs.readFileSync(legacyPath, "utf8"));
      let overlay = computeBindOverlay(base, legacy);
      let merged = mergeBindMaps(base, overlay);

      if (JSON.stringify(merged) !== JSON.stringify(legacy)) {
        overlay = { __bindMode: "replace", ...legacy };
        merged = mergeBindMaps(base, overlay);
      }

      if (JSON.stringify(merged) !== JSON.stringify(legacy)) {
        throw new Error(
          `Merge mismatch for ${variantSlug}/${sportSlug}/${assetSlug}`,
        );
      }

      const overlayKeys = Object.keys(overlay).filter(
        (key) => key !== "__bindMode",
      );
      if (overlayKeys.length === 0) {
        fs.unlinkSync(legacyPath);
        removed += 1;
        continue;
      }

      const overlayDir = path.join(overlayRoot, variantSlug, sportSlug);
      fs.mkdirSync(overlayDir, { recursive: true });
      const overlayPath = path.join(overlayDir, `${assetSlug}.bind.json`);
      fs.writeFileSync(
        overlayPath,
        `${JSON.stringify(overlay, null, 2)}\n`,
        "utf8",
      );
      overlays += 1;
      fs.unlinkSync(legacyPath);
      removed += 1;
    }
  }
}

console.log(
  `materialize-bind-overlays: ${overlays} overlay(s) written, ${removed} legacy file(s) removed`,
);
