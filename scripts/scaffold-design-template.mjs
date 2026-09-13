#!/usr/bin/env node
/**
 * Scaffold a new cricket design variant from design/_templates/cricket.
 *
 * Usage:
 *   node scripts/scaffold-design-template.mjs --label "My Template" --slug my-template --registry-id MyTemplate
 *
 * Prefer `node scripts/...` (or `--registry-id`, not `--registry` — npm reserves that flag).
 * Via npm: npm run design:scaffold -- --label="My Template" --slug=my-template --registry-id=MyTemplate
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

/** @param {string[]} argv */
function parseArgs(argv) {
  /** @type {Record<string, string>} */
  const out = {};
  /** @type {string[]} */
  const positionals = [];

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) {
      positionals.push(arg);
      continue;
    }
    const eq = arg.indexOf("=");
    if (eq !== -1) {
      out[arg.slice(2, eq)] = arg.slice(eq + 1);
      continue;
    }
    const key = arg.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      out[key] = "true";
      continue;
    }
    out[key] = value;
    i += 1;
  }

  if (out.registry && !out["registry-id"]) {
    out["registry-id"] = out.registry;
  }

  if (!out.label && !out.slug && positionals.length >= 3) {
    out["registry-id"] = positionals.at(-1);
    out.slug = positionals.at(-2);
    out.label = positionals.slice(0, -2).join(" ");
  }

  const envLabel = process.env.DESIGN_SCAFFOLD_LABEL;
  const envSlug = process.env.DESIGN_SCAFFOLD_SLUG;
  const envRegistry = process.env.DESIGN_SCAFFOLD_REGISTRY_ID;
  if (!out.label && envLabel) out.label = envLabel;
  if (!out.slug && envSlug) out.slug = envSlug;
  if (!out["registry-id"] && envRegistry) out["registry-id"] = envRegistry;

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

function rmIfExists(target) {
  if (!fs.existsSync(target)) return false;
  try {
    fs.rmSync(target, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 200,
    });
    return true;
  } catch (err) {
    const code = /** @type {NodeJS.ErrnoException} */ (err).code;
    console.warn(
      `Could not remove ${path.relative(root, target)} (${code ?? "error"}); will overwrite where possible.`,
    );
    return false;
  }
}

/** @param {string} slug */
function removeScaffoldedVariant(slug) {
  rmIfExists(path.join(root, "design/variants", slug));
  rmIfExists(path.join(root, "design/_shared/hydration", slug));

  for (const asset of CRICKET_FACTORY_ASSETS) {
    rmIfExists(path.join(root, `design/_shared/${slug}-${asset.slug}.css`));
  }
  rmIfExists(path.join(root, `design/_shared/${slug}-shared.css`));

  const routesPath = path.join(root, "design/_shared/routes.json");
  const routes = JSON.parse(fs.readFileSync(routesPath, "utf8"));
  if (routes.variants[slug]) {
    delete routes.variants[slug];
    fs.writeFileSync(routesPath, `${JSON.stringify(routes, null, 2)}\n`);
  }

  const fontsPath = path.join(root, "design/_shared/fonts.json");
  const fonts = JSON.parse(fs.readFileSync(fontsPath, "utf8"));
  if (fonts.variantFonts?.[slug]) {
    delete fonts.variantFonts[slug];
    fs.writeFileSync(fontsPath, `${JSON.stringify(fonts, null, 2)}\n`);
  }

  const assetIndexPath = path.join(root, "design/.docs/asset-index.md");
  let index = fs.readFileSync(assetIndexPath, "utf8");
  const block = new RegExp(
    `\\n<!-- scaffold ${slug} -->\\n(?:\\|[^\n]*\\n)*`,
    "g",
  );
  index = index.replace(block, "\n");
  fs.writeFileSync(assetIndexPath, index);
}

const args = parseArgs(process.argv);
const label = args.label;
const slug = args.slug ? kebabSlug(args.slug) : null;
const registryId = args["registry-id"]
  ? pascalRegistry(args["registry-id"])
  : null;
const sport = args.sport ?? "cricket";
const force = args.force === "true";

if (!label || !slug || !registryId) {
  console.error(
    'Usage: node scripts/scaffold-design-template.mjs --label "Name" --slug my-template --registry-id MyTemplate [--variant-folder myTemplate] [--force]',
  );
  console.error(
    "Note: do not use --registry with npm (npm treats it as the package registry URL).",
  );
  process.exit(1);
}

if (sport !== "cricket") {
  console.error(`Unsupported sport "${sport}". Only cricket is available.`);
  process.exit(1);
}

const variantDir = path.join(root, "design/variants", slug);
const routesPath = path.join(root, "design/_shared/routes.json");
let routes = JSON.parse(fs.readFileSync(routesPath, "utf8"));
const variantExists =
  fs.existsSync(variantDir) || Boolean(routes.variants[slug]);

if (variantExists && !force) {
  console.error(`Variant already exists: design/variants/${slug}`);
  console.error("Re-run with --force to replace scaffold files for this slug.");
  process.exit(1);
}

if (variantExists && force) {
  console.warn(`Removing existing scaffold for "${slug}"…`);
  removeScaffoldedVariant(slug);
  routes = JSON.parse(fs.readFileSync(routesPath, "utf8"));
}

function upsertAssetIndexBlock(slug, registryId, variantFolder) {
  const assetIndexPath = path.join(root, "design/.docs/asset-index.md");
  let index = fs.readFileSync(assetIndexPath, "utf8");
  const block = new RegExp(
    `\\n<!-- scaffold ${slug} -->\\n(?:\\|[^\n]*\\n)*`,
    "g",
  );
  index = index.replace(block, "\n");
  const rows = CRICKET_FACTORY_ASSETS.map(
    (asset) =>
      `| \`${slug}/cricket/${asset.slug}\` | \`${registryId}\` | \`${asset.fixture}\` | \`${asset.composition}\` | \`${variantFolder}/theme/composition/${asset.themeFile}\` |`,
  );
  index = `${index.trimEnd()}\n\n<!-- scaffold ${slug} -->\n${rows.join("\n")}\n`;
  fs.writeFileSync(assetIndexPath, index);
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

  fs.writeFileSync(
    path.join(variantDir, "cricket", `${asset.slug}.html`),
    html,
  );

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

upsertAssetIndexBlock(slug, registryId, variantFolder);

console.log(
  `Scaffolded design variant "${slug}" (${registryId}) with 10 assets.`,
);
console.log(
  `Open: http://localhost:3456/design/variants/${slug}/cricket/results.html`,
);
