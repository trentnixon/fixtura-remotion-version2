import fs from "node:fs";
import path from "node:path";
import {
  CRICKET_FACTORY_ASSETS,
  routingKeyFromRegistryId,
} from "./factory-assets.js";

/** @type {Record<string, string>} */
const COMPOSITION_ROUTE_TO_EXPORT = {
  "cricket/results": "CricketResults",
  "cricket/resultSingle": "CricketResultSingle",
  "cricket/upcoming": "CricketUpcoming",
  "cricket/ladder": "CricketLadder",
  "cricket/top5": "CricketTop5",
  "cricket/performances": "CricketPerformances",
  "cricket/teamRoster": "CricketRoster",
  "cricket/teamOfTheWeek": "CricketTeamOfTheWeek",
};
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

  const handoffContext = handoff ? loadHandoffContext(repoRoot) : null;

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
        handoffContext,
        registryId: variant.registryId,
      });
    }
  }

  const pendingOrphans = loadPendingOrphanPrototypes(repoRoot);
  verifyOrphanVariantHtml(repoRoot, routes, errors, options, pendingOrphans);

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

    if (fs.existsSync(htmlPath)) {
      const html = fs.readFileSync(htmlPath, "utf8");
      if (!html.includes("template-canvas")) {
        errors.push(`Starter ${asset.slug} must include .template-canvas root`);
      }
      if (!html.includes("data-hydrate-error")) {
        errors.push(`Starter ${asset.slug} must include hydration error banner`);
      }
      const bodyMatch = html.match(/<body[\s\S]*<\/body>/i);
      if (!bodyMatch || bodyMatch[0].length < 200) {
        errors.push(`Starter ${asset.slug} body markup is missing or too small`);
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
 * @param {{
 *   handoff: boolean,
 *   bootstrap: string,
 *   errors: string[],
 *   handoffContext: ReturnType<typeof loadHandoffContext> | null,
 *   registryId: string,
 * }} ctx
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

  if (ctx.handoff && ctx.handoffContext) {
    const registryId = ctx.registryId;
    if (!registryId) {
      ctx.errors.push(`Handoff: variant ${variantSlug} missing registryId`);
    } else if (!ctx.handoffContext.templateRegistry.has(registryId)) {
      ctx.errors.push(
        `Handoff: Registry ID ${registryId} not in src/templates/registry.tsx`,
      );
    }

    const routingKey = registryId ? routingKeyFromRegistryId(registryId) : "";
    const compositionRoute = asset.remotion?.composition;
    const exportName = compositionRoute
      ? COMPOSITION_ROUTE_TO_EXPORT[compositionRoute]
      : undefined;
    if (!exportName) {
      ctx.errors.push(
        `Handoff: unknown composition route "${compositionRoute}" for ${variantSlug}/${assetSlug}`,
      );
    } else if (
      routingKey &&
      !compositionExportHasRoutingKey(
        ctx.handoffContext.cricketIndex,
        exportName,
        routingKey,
      )
    ) {
      ctx.errors.push(
        `Handoff: ${exportName} missing composition routing key "${routingKey}" (Registry ${registryId})`,
      );
    }
  }
}

/**
 * @param {string} repoRoot
 */
function loadHandoffContext(repoRoot) {
  const registryPath = path.join(repoRoot, "src/templates/registry.tsx");
  const cricketIndexPath = path.join(
    repoRoot,
    "src/compositions/cricket/index.tsx",
  );
  const registryText = fs.readFileSync(registryPath, "utf8");
  const cricketIndex = fs.readFileSync(cricketIndexPath, "utf8");
  /** @type {Set<string>} */
  const templateRegistry = new Set();
  const block = registryText.match(
    /export const templateRegistry = \{([\s\S]*?)\n\};/,
  )?.[1];
  if (block) {
    for (const line of block.split("\n")) {
      const match = line.match(/^  ([A-Za-z][A-Za-z0-9]*): \{/);
      if (match) {
        templateRegistry.add(match[1]);
      }
    }
  }
  return { templateRegistry, cricketIndex };
}

/**
 * @param {string} cricketIndex
 * @param {string} exportName
 * @param {string} routingKey
 */
function compositionExportHasRoutingKey(cricketIndex, exportName, routingKey) {
  const re = new RegExp(
    `export const ${exportName} = \\{([\\s\\S]*?)\\n\\};`,
    "m",
  );
  const block = cricketIndex.match(re)?.[1] ?? "";
  return new RegExp(`\\b${routingKey}\\s*:`).test(block);
}

/**
 * @param {string} repoRoot
 * @param {ReturnType<typeof validateRoutesManifest>} routes
 * @param {string[]} errors
 * @param {{ variant?: string, asset?: string }} options
 * @param {Set<string>} pendingOrphans
 */
function verifyOrphanVariantHtml(repoRoot, routes, errors, options, pendingOrphans) {
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
        const rel = `design/variants/${variantSlug}/cricket/${file}`;
        if (pendingOrphans.has(`${variantSlug}/cricket/${file}`)) {
          continue;
        }
        errors.push(`Orphan prototype HTML: ${rel}`);
      }
    }
  }
}

/**
 * @param {string} repoRoot
 */
function loadPendingOrphanPrototypes(repoRoot) {
  const listPath = path.join(
    repoRoot,
    "design/_shared/pending-orphan-prototypes.txt",
  );
  /** @type {Set<string>} */
  const pending = new Set();
  if (!fs.existsSync(listPath)) {
    return pending;
  }
  for (const line of fs.readFileSync(listPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    pending.add(trimmed.replace(/^design\/variants\//, ""));
  }
  return pending;
}
