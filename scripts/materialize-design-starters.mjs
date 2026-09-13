/**
 * Builds design/_templates/cricket from Scoreline prototypes (mechanics + anatomy).
 * Run after changing Scoreline reference pages or when bootstrapping the factory.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CRICKET_FACTORY_ASSETS } from "../design/_shared/lib/factory-assets.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const templatesDir = path.join(root, "design/_templates/cricket");
const scorelineDir = path.join(root, "design/variants/scoreline/cricket");
const scorelineHydration = path.join(
  root,
  "design/_shared/hydration/scoreline/cricket",
);
const scorelineCssDir = path.join(root, "design/_shared");

const SCORELINE_CSS_BY_ASSET = {
  results: "scoreline-results.css",
  "result-single": "scoreline-result-single.css",
  upcoming: "scoreline-upcoming.css",
  ladder: "scoreline-ladder.css",
  "top5-batting": "scoreline-top5.css",
  "top5-bowling": "scoreline-top5.css",
  "performances-batting": "scoreline-top5.css",
  "performances-bowling": "scoreline-top5.css",
  "team-roster": "scoreline-team-roster.css",
  "team-of-the-week": "scoreline-team-of-the-week.css",
};

const SOURCE_HTML = {
  "performances-batting": "top5-batting.html",
  "performances-bowling": "top5-bowling.html",
};

const STANDARD_BOOT_SCRIPT = `      import { renderVariantNav } from "/design/_shared/nav.js";
      import { renderTabBar } from "/design/_shared/tab-bar.js";
      import { initDesignPage } from "/design/_shared/init-template.js";

      const context = {
        variantSlug: "__VARIANT_SLUG__",
        sportSlug: "cricket",
        assetSlug: "__ASSET_SLUG__",
      };

      renderVariantNav(context.variantSlug);
      renderTabBar(context);
      await initDesignPage(context);`;

function transformHtml(html, assetSlug) {
  let out = html;
  out = out.replace(/\bscoreline-canvas\b/g, "template-canvas");
  out = out.replace(
    /<link rel="stylesheet" href="\/design\/_shared\/scoreline-polish\.css" \/>[\s\S]*?<link rel="stylesheet" href="\/design\/_shared\/scoreline-preview\.css" \/>/,
    `    <link rel="stylesheet" href="/design/_templates/cricket/starter-shared.css" />
    <link rel="stylesheet" href="/design/_templates/cricket/starter-${assetSlug}.css" />`,
  );
  out = out.replace(
    /<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\s*/g,
    "",
  );
  out = out.replace(
    /<script type="module">\s*import \{ applyVariantFonts \}[\s\S]*?<\/script>\s*/g,
    "",
  );
  out = out.replace(
    /<script type="module">\s*import \{ renderVariantNav \}[\s\S]*?scoreline-init\.js[\s\S]*?<\/script>\s*(?=<\/body>)/,
    `<script type="module">\n${STANDARD_BOOT_SCRIPT.replace("__VARIANT_SLUG__", "starter-preview").replace("__ASSET_SLUG__", assetSlug)}\n    </script>\n    `,
  );
  out = out.replace(
    /<!--[\s\S]*?Handoff:[\s\S]*?-->\n/,
    `<!-- Design starter: cricket / ${assetSlug} (copy via scaffold) -->\n`,
  );
  return out;
}

function transformCss(css) {
  return css.replace(/\.scoreline-canvas/g, ".template-canvas");
}

fs.mkdirSync(templatesDir, { recursive: true });

const polish = fs.readFileSync(
  path.join(scorelineCssDir, "scoreline-polish.css"),
  "utf8",
);
fs.writeFileSync(
  path.join(templatesDir, "starter-shared.css"),
  transformCss(polish),
);

for (const asset of CRICKET_FACTORY_ASSETS) {
  const sourceName = SOURCE_HTML[asset.slug] ?? `${asset.slug}.html`;
  const sourcePath = path.join(scorelineDir, sourceName);
  if (!fs.existsSync(sourcePath)) {
    console.error(`Missing scoreline source for ${asset.slug}: ${sourcePath}`);
    process.exit(1);
  }

  const html = transformHtml(fs.readFileSync(sourcePath, "utf8"), asset.slug);
  fs.writeFileSync(path.join(templatesDir, `${asset.slug}.html`), html);

  const bindSlug = asset.slug.startsWith("performances-")
    ? asset.slug.replace("performances-", "top5-")
    : asset.slug;
  const bindPath = path.join(scorelineHydration, `${bindSlug}.bind.json`);
  if (!fs.existsSync(bindPath)) {
    console.error(`Missing bind map for ${asset.slug}`);
    process.exit(1);
  }
  fs.copyFileSync(bindPath, path.join(templatesDir, `${asset.slug}.bind.json`));

  const cssFile = SCORELINE_CSS_BY_ASSET[asset.slug];
  const css = fs.readFileSync(path.join(scorelineCssDir, cssFile), "utf8");
  fs.writeFileSync(
    path.join(templatesDir, `starter-${asset.slug}.css`),
    transformCss(css),
  );
}

console.log(`Materialized ${CRICKET_FACTORY_ASSETS.length} cricket starters.`);
