#!/usr/bin/env node
/**
 * Scaffold a new cricket design variant from design/_templates/cricket.
 *
 * Usage:
 *   node scripts/scaffold-design-template.mjs --label "My Template" --slug my-template --registry MyTemplate
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  CRICKET_FACTORY_ASSETS,
  resolveVariantFolder,
} from "../design/_shared/lib/factory-assets.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function parseArgs(argv) {
  /** @type {Record<string, string>} */
  const out = {};
  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) {
        throw new Error(`Missing value for --${key}`);
      }
      out[key] = value;
      i += 1;
    }
  }
  return out;
}

function kebabSlug(value) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    throw new Error(`Invalid slug "${value}" (use kebab-case)`);
  }
  return value;
}

function pascalRegistry(value) {
  if (!/^[A-Z][A-Za-z0-9]*$/.test(value)) {
    throw new Error(`Invalid registry ID "${value}" (use PascalCase)`);
  }
  return value;
}

const args = parseArgs(process.argv);
const label = args.label;
const slug = args.slug ? kebabSlug(args.slug) : null;
const registryId = args.registry ? pascalRegistry(args.registry) : null;
const sport = args.sport ?? "cricket";

if (!label || !slug || !registryId) {
  console.error(
    "Usage: node scripts/scaffold-design-template.mjs --label \"Name\" --slug my-template --registry MyTemplate [--variant-folder myTemplate]",
  );
  process.exit(1);
}

if (sport !== "cricket") {
  console.error(`Unsupported sport "${sport}". Only cricket is available.`);
  process.exit(1);
}

const variantDir = path.join(root, "design/variants", slug);
if (fs.existsSync(variantDir)) {
  console.error(`Variant already exists: design/variants/${slug}`);
  process.exit(1);
}

const routesPath = path.join(root, "design/_shared/routes.json");
const routes = JSON.parse(fs.readFileSync(routesPath, "utf8"));
if (routes.variants[slug]) {
  console.error(`routes.json already has variant "${slug}"`);
  process.exit(1);
}

const variantFolder = resolveVariantFolder(registryId, args["variant-folder"]);
const templatesDir = path.join(root, "design/_templates/cricket");
const sharedCss = fs.readFileSync(
  path.join(templatesDir, "starter-shared.css"),
  "utf8",
);

fs.mkdirSync(path.join(variantDir, "cricket"), { recursive: true });
fs.writeFileSync(
  path.join(root, `design/_shared/${slug}-shared.css`),
  sharedCss,
);

/** @type {Record<string, unknown>} */
const assets = {};

for (const asset of CRICKET_FACTORY_ASSETS) {
  const htmlTemplate = fs.readFileSync(
    path.join(templatesDir, `${asset.slug}.html`),
    "utf8",
  );
  const html = htmlTemplate
    .replace(/variantSlug: "starter-preview"/g, `variantSlug: "${slug}"`)
    .replace(
      `/design/_templates/cricket/starter-shared.css`,
      `/design/_shared/${slug}-shared.css`,
    )
    .replace(
      `/design/_templates/cricket/starter-${asset.slug}.css`,
      `/design/_shared/${slug}-${asset.slug}.css`,
    );

  fs.writeFileSync(path.join(variantDir, "cricket", `${asset.slug}.html`), html);

  const hydrationDir = path.join(
    root,
    `design/_shared/hydration/${slug}/cricket`,
  );
  fs.mkdirSync(hydrationDir, { recursive: true });
  fs.copyFileSync(
    path.join(templatesDir, `${asset.slug}.bind.json`),
    path.join(hydrationDir, `${asset.slug}.bind.json`),
  );

  fs.copyFileSync(
    path.join(templatesDir, `starter-${asset.slug}.css`),
    path.join(root, `design/_shared/${slug}-${asset.slug}.css`),
  );

  assets[asset.slug] = {
    label: asset.label,
    fixture: asset.fixture,
    population: asset.population,
    remotion: {
      composition: asset.composition,
      theme: `src/templates/variants/${variantFolder}/theme/composition/${asset.themeFile}`,
    },
  };
}

routes.variants[slug] = {
  label,
  registryId,
  bootstrap: "generic",
  remotionVariantFolder: variantFolder,
  sports: {
    cricket: { assets },
  },
};

fs.writeFileSync(routesPath, `${JSON.stringify(routes, null, 2)}\n`);

const fontsPath = path.join(root, "design/_shared/fonts.json");
const fonts = JSON.parse(fs.readFileSync(fontsPath, "utf8"));
fonts.variantFonts ??= {};
fonts.variantFonts[slug] = { heading: "outfit", body: "heebo" };
fs.writeFileSync(fontsPath, `${JSON.stringify(fonts, null, 2)}\n`);

const assetIndexPath = path.join(root, "design/.docs/asset-index.md");
const rows = CRICKET_FACTORY_ASSETS.map(
  (asset) =>
    `| \`${slug}/cricket/${asset.slug}\` | \`${registryId}\` | \`${asset.fixture}\` | \`${asset.composition}\` | \`${variantFolder}/theme/composition/${asset.themeFile}\` |`,
);
fs.appendFileSync(
  assetIndexPath,
  `\n<!-- scaffold ${slug} -->\n${rows.join("\n")}\n`,
);

console.log(`Scaffolded design variant "${slug}" (${registryId}) with 10 assets.`);
console.log(`Open: http://localhost:3456/design/variants/${slug}/cricket/results.html`);
