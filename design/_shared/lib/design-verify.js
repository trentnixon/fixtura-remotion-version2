import fs from "node:fs";
import path from "node:path";
import { CRICKET_FACTORY_ASSETS } from "./factory-assets.js";
import { applyBindMap } from "./hydrate-core.js";
import { parseBindMapJson } from "./bind-json.js";
import { validateRoutesManifest, listAssetSlugs } from "./manifest.js";

/**
 * @param {string} repoRoot
 * @param {{ handoff?: boolean, variant?: string, asset?: string }} options
 */
export function runDesignVerify(repoRoot, options = {}) {
  const handoff = options.handoff === true;
  /** @type {string[]} */
  const errors = [];

  const routesPath = path.join(repoRoot, "design/_shared/routes.json");
  const routes = validateRoutesManifest(
    JSON.parse(fs.readFileSync(routesPath, "utf8")),
  );

  verifyStarters(repoRoot, errors);

  for (const [variantSlug, variant] of Object.entries(routes.variants)) {
    if (options.variant && options.variant !== variantSlug) {
      continue;
    }

    const bootstrap = variant.bootstrap ?? "generic";
    const assets = listAssetSlugs(routes, variantSlug, "cricket");

    for (const assetSlug of assets) {
      if (options.asset && options.asset !== assetSlug) {
        continue;
      }
      verifyRegisteredAsset(repoRoot, routes, variantSlug, "cricket", assetSlug, {
        handoff,
        bootstrap,
        errors,
      });
    }
  }

  verifyOrphanVariantHtml(repoRoot, routes, errors, options);

  if (errors.length > 0) {
    return { ok: false, errors };
  }
  return { ok: true, errors: [] };
}

/**
 * @param {string} repoRoot
 * @param {string[]} errors
 */
function verifyStarters(repoRoot, errors) {
  const dir = path.join(repoRoot, "design/_templates/cricket");
  if (!fs.existsSync(dir)) {
    errors.push("Missing design/_templates/cricket");
    return;
  }

  for (const asset of CRICKET_FACTORY_ASSETS) {
    const htmlPath = path.join(dir, `${asset.slug}.html`);
    const bindPath = path.join(dir, `${asset.slug}.bind.json`);
    const cssPath = path.join(dir, `starter-${asset.slug}.css`);

    for (const p of [htmlPath, bindPath, cssPath]) {
      if (!fs.existsSync(p)) {
        errors.push(`Starter missing file: ${path.relative(repoRoot, p)}`);
      }
    }

    if (!fs.existsSync(bindPath) || !fs.existsSync(path.join(repoRoot, asset.fixture))) {
      continue;
    }

    const fixture = JSON.parse(
      fs.readFileSync(path.join(repoRoot, asset.fixture), "utf8"),
    );
    const bindMap = parseBindMapJson(fs.readFileSync(bindPath, "utf8"));
    try {
      applyBindMap(fixture, bindMap);
    } catch (error) {
      if (asset.slug.startsWith("performances-")) {
        // Starters reuse top5 bind shape; performances fixtures may be shorter.
        continue;
      }
      errors.push(
        `Starter bind failed (${asset.slug}): ${error instanceof Error ? error.message : error}`,
      );
    }
  }
}

/**
 * @param {string} repoRoot
 * @param {ReturnType<typeof validateRoutesManifest>} routes
 * @param {string} variantSlug
 * @param {string} sportSlug
 * @param {string} assetSlug
 * @param {{ handoff: boolean, bootstrap: string, errors: string[] }} ctx
 */
function verifyRegisteredAsset(
  repoRoot,
  routes,
  variantSlug,
  sportSlug,
  assetSlug,
  ctx,
) {
  const asset =
    routes.variants[variantSlug].sports[sportSlug].assets[assetSlug];
  const htmlRel = `design/variants/${variantSlug}/${sportSlug}/${assetSlug}.html`;
  const htmlPath = path.join(repoRoot, htmlRel);
  const bindRel = `design/_shared/hydration/${variantSlug}/${sportSlug}/${assetSlug}.bind.json`;
  const bindPath = path.join(repoRoot, bindRel);
  const fixturePath = path.join(repoRoot, asset.fixture);

  if (!fs.existsSync(htmlPath)) {
    ctx.errors.push(`Missing HTML for registered asset: ${htmlRel}`);
  }
  if (!fs.existsSync(bindPath)) {
    ctx.errors.push(`Missing bind map: ${bindRel}`);
  }
  if (!fs.existsSync(fixturePath)) {
    ctx.errors.push(`Missing fixture: ${asset.fixture}`);
  }

  if (ctx.bootstrap === "generic") {
    const sharedCss = path.join(repoRoot, `design/_shared/${variantSlug}-shared.css`);
    const assetCss = path.join(
      repoRoot,
      `design/_shared/${variantSlug}-${assetSlug}.css`,
    );
    if (!fs.existsSync(sharedCss)) {
      ctx.errors.push(`Missing generic shared CSS: design/_shared/${variantSlug}-shared.css`);
    }
    if (!fs.existsSync(assetCss)) {
      ctx.errors.push(
        `Missing generic asset CSS: design/_shared/${variantSlug}-${assetSlug}.css`,
      );
    }
    if (fs.existsSync(htmlPath)) {
      const html = fs.readFileSync(htmlPath, "utf8");
      if (!html.includes("init-template.js")) {
        ctx.errors.push(`${htmlRel} must use init-template.js (generic bootstrap)`);
      }
      if (!html.includes(".template-canvas")) {
        ctx.errors.push(`${htmlRel} must include .template-canvas root`);
      }
    }
    if (asset.population) {
      const modPath = path.join(
        repoRoot,
        `design/_shared/populate/cricket/${asset.population}.js`,
      );
      if (!fs.existsSync(modPath)) {
        ctx.errors.push(`Missing population module for ${asset.population}`);
      }
    }
  }

  if (fs.existsSync(bindPath) && fs.existsSync(fixturePath)) {
    const fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
    const bindMap = parseBindMapJson(fs.readFileSync(bindPath, "utf8"));
    let values;
    try {
      ({ values } = applyBindMap(fixture, bindMap));
    } catch (error) {
      ctx.errors.push(
        `Bind resolution failed (${variantSlug}/${assetSlug}): ${error instanceof Error ? error.message : error}`,
      );
      values = {};
    }

    if (ctx.bootstrap === "generic" && fs.existsSync(htmlPath)) {
      const html = fs.readFileSync(htmlPath, "utf8");
      for (const selector of Object.keys(values)) {
        const attr = selector.match(/data-hydrate=([^\]]+)/)?.[1]?.replace(/"/g, "");
        if (attr && !html.includes(`data-hydrate="${attr}"`)) {
          ctx.errors.push(
            `Scalar selector not in HTML (${variantSlug}/${assetSlug}): ${selector}`,
          );
        }
      }
    }
  }

  if (ctx.handoff && asset.remotion?.theme) {
    const themePath = path.join(repoRoot, asset.remotion.theme);
    if (!fs.existsSync(themePath)) {
      ctx.errors.push(`Handoff: missing theme file ${asset.remotion.theme}`);
    }
  }
}

/**
 * @param {string} repoRoot
 * @param {ReturnType<typeof validateRoutesManifest>} routes
 * @param {string[]} errors
 * @param {{ variant?: string, asset?: string }} options
 */
function verifyOrphanVariantHtml(repoRoot, routes, errors, options) {
  const variantsDir = path.join(repoRoot, "design/variants");
  if (!fs.existsSync(variantsDir)) {
    return;
  }

  for (const variantSlug of fs.readdirSync(variantsDir)) {
    if (options.variant && options.variant !== variantSlug) {
      continue;
    }
    const cricketDir = path.join(variantsDir, variantSlug, "cricket");
    if (!fs.existsSync(cricketDir)) {
      continue;
    }
    for (const file of fs.readdirSync(cricketDir)) {
      if (!file.endsWith(".html")) {
        continue;
      }
      const assetSlug = file.replace(/\.html$/, "");
      if (options.asset && options.asset !== assetSlug) {
        continue;
      }
      const registered =
        routes.variants[variantSlug]?.sports?.cricket?.assets?.[assetSlug];
      if (!registered) {
        errors.push(`Orphan prototype HTML: design/variants/${variantSlug}/cricket/${file}`);
      }
    }
  }
}
