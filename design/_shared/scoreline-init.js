import { hydratePage } from "./hydrate.js";
import { applyScorelineTheme } from "./scoreline-theme.js";
import {
  applyScorelineBackdrop,
  applyScorelineMode,
  readScorelineBackdrop,
  readScorelineMode,
} from "./scoreline-mode.js";
import { mountScorelineModeControls } from "./scoreline-mode-controls.js";
import {
  syncScorelineOrganisationCrest,
  syncScorelineLadderLayout,
  syncScorelineLeaderboardLayout,
  syncScorelineResultsLayout,
  syncScorelineRosterLayout,
  syncScorelineTotwLayout,
  syncScorelineUpcomingLayout,
  syncScoreWatermark,
  watchScorelineCrests,
} from "./scoreline-layout.js";

/**
 * Shared Scoreline bootstrap: hydrate → theme → mode → crest watch → optional layout hooks.
 */
export async function initScorelineAsset(context, options = {}) {
  const { resultsLayout = false, watermark = false, skipHydrate = false } =
    options;

  if (!skipHydrate) {
    await hydratePage(context);
  }

  const canvas = document.querySelector(".scoreline-canvas");
  if (!(canvas instanceof HTMLElement)) {
    return { canvas: null };
  }

  const primary = document.querySelector('[data-hydrate="palette-primary"]');
  const secondary = document.querySelector('[data-hydrate="palette-secondary"]');

  applyScorelineTheme(canvas, {
    primary: primary?.textContent?.trim(),
    secondary: secondary?.textContent?.trim(),
  });

  const wrap = canvas.closest(".design-canvas-wrap");
  if (wrap instanceof HTMLElement) {
    wrap.style.setProperty(
      "--preview-club-primary",
      getComputedStyle(canvas).getPropertyValue("--club-primary").trim() || "#004de2",
    );
    wrap.style.setProperty(
      "--preview-club-secondary",
      getComputedStyle(canvas).getPropertyValue("--club-secondary").trim() || "#ff0000",
    );
  }

  const accent =
    getComputedStyle(canvas).getPropertyValue("--club-primary").trim() || undefined;
  applyScorelineMode(canvas, readScorelineMode(), { accent });
  applyScorelineBackdrop(document, readScorelineBackdrop());
  mountScorelineModeControls(canvas);

  watchScorelineCrests(document);
  syncScorelineOrganisationCrest(document);
  syncScorelineUpcomingLayout(document);
  syncScorelineRosterLayout(document);
  syncScorelineLeaderboardLayout(document);
  syncScorelineLadderLayout(document);
  syncScorelineTotwLayout(document);

  if (typeof options.afterHydrate === "function") {
    await options.afterHydrate({ canvas, document });
  }

  syncScorelineRosterLayout(document);
  syncScorelineTotwLayout(document);

  if (resultsLayout) {
    syncScorelineResultsLayout(document);
  }

  if (watermark) {
    syncScoreWatermark(canvas);
  }

  return { canvas };
}
