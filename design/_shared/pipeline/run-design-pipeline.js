import { hydratePage } from "../hydrate.js";
import { resolveAssetEntry, validateRoutesManifest } from "../lib/manifest.js";
import { runPopulationModule } from "../populate/cricket/registry.js";
import { resolveCanvasSelector } from "./variant-profiles.js";

const ROUTES_URL = "/design/_shared/routes.json";

/**
 * @param {{ variantSlug: string; sportSlug: string; assetSlug: string }} context
 * @param {string} label
 */
function showHydrationError(context, label) {
  const banner = document.querySelector("[data-hydrate-error]");
  const msg = `${context.variantSlug}/${context.sportSlug}/${context.assetSlug}: ${label}`;
  if (banner) {
    banner.textContent = `Hydration error: ${msg}`;
    banner.hidden = false;
  }
}

/**
 * Hydrate → optional manifest population → resolve canvas.
 *
 * @param {{ variantSlug: string; sportSlug: string; assetSlug: string }} context
 * @param {{
 *   skipHydrate?: boolean;
 *   canvasSelector?: string;
 *   populationMode?: "manifest" | "skip";
 *   afterPopulation?: (args: {
 *     canvas: HTMLElement;
 *     fixture: unknown;
 *     manifest: ReturnType<typeof validateRoutesManifest>;
 *     context: typeof context;
 *     document: Document;
 *   }) => void | Promise<void>;
 * }} [options]
 */
export async function runDesignPipeline(context, options = {}) {
  const {
    skipHydrate = false,
    canvasSelector = resolveCanvasSelector(context.variantSlug),
    populationMode = "manifest",
    afterPopulation,
  } = options;

  if (!skipHydrate) {
    const hydrated = await hydratePage(context);
    if (!hydrated) {
      return {
        ok: false,
        canvas: null,
        fixture: null,
        manifest: null,
      };
    }
  }

  const canvas = document.querySelector(canvasSelector);
  if (!(canvas instanceof HTMLElement)) {
    showHydrationError(context, `Missing ${canvasSelector} root`);
    return {
      ok: false,
      canvas: null,
      fixture: null,
      manifest: null,
    };
  }

  let manifest = null;
  let fixture = null;

  if (populationMode === "manifest") {
    const routesResponse = await fetch(ROUTES_URL);
    if (!routesResponse.ok) {
      return { ok: false, canvas, fixture: null, manifest: null };
    }

    manifest = validateRoutesManifest(await routesResponse.json());
    const entry = resolveAssetEntry(
      manifest,
      context.variantSlug,
      context.sportSlug,
      context.assetSlug,
    );
    const fixtureResponse = await fetch(`/${entry.fixture}`);
    if (!fixtureResponse.ok) {
      return { ok: false, canvas, fixture: null, manifest };
    }

    fixture = await fixtureResponse.json();
    const asset =
      manifest.variants[context.variantSlug]?.sports[context.sportSlug]
        ?.assets[context.assetSlug];

    await runPopulationModule({
      populationId: asset?.population ?? null,
      populationOverride: asset?.populationOverride ?? null,
      canvas,
      fixture,
      context,
    });

    if (typeof afterPopulation === "function") {
      await afterPopulation({
        canvas,
        fixture,
        manifest,
        context,
        document,
      });
    }
  }

  return { ok: true, canvas, fixture, manifest };
}
