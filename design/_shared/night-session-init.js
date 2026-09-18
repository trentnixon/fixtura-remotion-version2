import { hydratePage } from "./hydrate.js";
import { applyVariantFonts } from "./fonts.js";
import { resolveAssetEntry, validateRoutesManifest } from "./lib/manifest.js";
import { runPopulationModule } from "./populate/cricket/registry.js";
import { applyScorelineTheme } from "./scoreline-theme.js";
import {
  applyNightSessionBackdrop,
  applyNightSessionMode,
  readNightSessionBackdrop,
  readNightSessionMode,
} from "./night-session-mode.js";
import { mountNightSessionModeControls } from "./night-session-mode-controls.js";
import {
  syncScorelineLeaderboardLayout,
  syncNightSessionLeaderboardDensity,
  syncScorelineLadderLayout,
  syncScorelineOrganisationCrest,
  syncScorelineResultsLayout,
  syncScorelineRosterLayout,
  syncScorelineTotwLayout,
  syncScorelineUpcomingLayout,
  syncScoreWatermark,
  watchScorelineCrests,
} from "./scoreline-layout.js";

const ROUTES_URL = "/design/_shared/routes.json";

/**
 * Night Session bootstrap: hydrate → population → theme → mode/backdrop → layout.
 *
 * @param {{ variantSlug: string; sportSlug: string; assetSlug: string }} context
 * @param {{
 *   resultsLayout?: boolean;
 *   watermark?: boolean;
 *   skipHydrate?: boolean;
 *   afterHydrate?: (args: { canvas: HTMLElement; document: Document }) => void | Promise<void>;
 * }} [options]
 */
export async function initNightSessionAsset(context, options = {}) {
  const {
    resultsLayout = false,
    watermark = false,
    skipHydrate = false,
    afterHydrate,
  } = options;

  if (!skipHydrate) {
    const hydrated = await hydratePage(context);
    if (!hydrated) {
      return { ok: false, canvas: null };
    }
  }

  const canvas = document.querySelector(".night-session-canvas");
  if (!(canvas instanceof HTMLElement)) {
    const banner = document.querySelector("[data-hydrate-error]");
    const msg = `${context.variantSlug}/${context.sportSlug}/${context.assetSlug}: Missing .night-session-canvas root`;
    if (banner) {
      banner.textContent = `Hydration error: ${msg}`;
      banner.hidden = false;
    }
    return { ok: false, canvas: null };
  }

  const routesResponse = await fetch(ROUTES_URL);
  if (routesResponse.ok) {
    const manifest = validateRoutesManifest(await routesResponse.json());
    const entry = resolveAssetEntry(
      manifest,
      context.variantSlug,
      context.sportSlug,
      context.assetSlug,
    );
    const fixtureResponse = await fetch(`/${entry.fixture}`);
    if (fixtureResponse.ok) {
      const fixture = await fixtureResponse.json();
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
    }
  }

  const primary = document.querySelector('[data-hydrate="palette-primary"]');
  const secondary = document.querySelector(
    '[data-hydrate="palette-secondary"]',
  );

  applyScorelineTheme(canvas, {
    primary: primary?.textContent?.trim(),
    secondary: secondary?.textContent?.trim(),
  });

  const wrap = canvas.closest(".design-canvas-wrap");
  if (wrap instanceof HTMLElement) {
    wrap.style.setProperty(
      "--preview-club-primary",
      getComputedStyle(canvas).getPropertyValue("--club-primary").trim() ||
        "#ff0000",
    );
    wrap.style.setProperty(
      "--preview-club-secondary",
      getComputedStyle(canvas).getPropertyValue("--club-secondary").trim() ||
        "#004de2",
    );
  }

  const accent =
    getComputedStyle(canvas).getPropertyValue("--club-primary").trim() ||
    undefined;
  applyNightSessionMode(canvas, readNightSessionMode(), { accent });
  applyNightSessionBackdrop(document, readNightSessionBackdrop());
  mountNightSessionModeControls(canvas);

  watchScorelineCrests(document);
  syncScorelineOrganisationCrest(document);
  syncScorelineUpcomingLayout(document);
  syncScorelineRosterLayout(document);
  syncScorelineLeaderboardLayout(document);
  syncNightSessionLeaderboardDensity(document);
  syncScorelineLadderLayout(document);
  syncScorelineTotwLayout(document);

  if (typeof afterHydrate === "function") {
    await afterHydrate({ canvas, document });
  }

  syncScorelineRosterLayout(document);
  syncScorelineTotwLayout(document);

  if (resultsLayout) {
    syncScorelineResultsLayout(document);
  }

  if (watermark) {
    canvas.dataset.scoreWatermark = "enabled";
  } else {
    delete canvas.dataset.scoreWatermark;
  }
  syncScoreWatermark(canvas);

  await applyVariantFonts(context.variantSlug);

  return { ok: true, canvas };
}
