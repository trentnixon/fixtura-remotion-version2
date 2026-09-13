import { hydratePage } from "./hydrate.js";
import { applyVariantFonts } from "./fonts.js";
import { resolveAssetEntry, validateRoutesManifest } from "./lib/manifest.js";
import { runPopulationModule } from "./populate/cricket/registry.js";

const ROUTES_URL = "/design/_shared/routes.json";

/**
 * @param {HTMLElement} canvas
 * @param {{ primary?: string, secondary?: string }} colours
 */
function applyTemplatePalette(canvas, colours) {
  const primary = colours.primary?.trim() || "#1a1a1a";
  const secondary = colours.secondary?.trim() || "#666666";
  canvas.style.setProperty("--club-primary", primary);
  canvas.style.setProperty("--club-secondary", secondary);
  canvas.style.setProperty("--template-primary", primary);
  canvas.style.setProperty("--template-secondary", secondary);
}

/**
 * Generic design-site bootstrap for factory-scaffolded variants.
 *
 * @param {{ variantSlug: string; sportSlug: string; assetSlug: string }} context
 */
export async function initDesignPage(context) {
  const hydrated = await hydratePage(context);
  if (!hydrated) {
    return { ok: false, canvas: null };
  }

  const canvas = document.querySelector(".template-canvas");
  if (!(canvas instanceof HTMLElement)) {
    const banner = document.querySelector("[data-hydrate-error]");
    const msg = `${context.variantSlug}/${context.sportSlug}/${context.assetSlug}: Missing .template-canvas root`;
    if (banner) {
      banner.textContent = `Hydration error: ${msg}`;
      banner.hidden = false;
    }
    return { ok: false, canvas: null };
  }

  const routesResponse = await fetch(ROUTES_URL);
  if (!routesResponse.ok) {
    return { ok: false, canvas };
  }

  const manifest = validateRoutesManifest(await routesResponse.json());
  const entry = resolveAssetEntry(
    manifest,
    context.variantSlug,
    context.sportSlug,
    context.assetSlug,
  );

  const fixtureResponse = await fetch(`/${entry.fixture}`);
  if (!fixtureResponse.ok) {
    return { ok: false, canvas };
  }

  const fixture = await fixtureResponse.json();
  const asset =
    manifest.variants[context.variantSlug]?.sports[context.sportSlug]?.assets[
      context.assetSlug
    ];

  const populationId = asset?.population ?? null;
  const populationOverride = asset?.populationOverride ?? null;

  await runPopulationModule({
    populationId,
    populationOverride,
    canvas,
    fixture,
    context,
  });

  const primary = document.querySelector('[data-hydrate="palette-primary"]');
  const secondary = document.querySelector(
    '[data-hydrate="palette-secondary"]',
  );

  applyTemplatePalette(canvas, {
    primary: primary?.textContent ?? undefined,
    secondary: secondary?.textContent ?? undefined,
  });

  await applyVariantFonts(context.variantSlug);

  return { ok: true, canvas };
}
