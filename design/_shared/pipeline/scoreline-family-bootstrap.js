import { applyScorelineTheme } from "../scoreline-theme.js";
import {
  applyScorelineBackdrop,
  applyScorelineMode,
  readScorelineBackdrop,
  readScorelineMode,
} from "../scoreline-mode.js";
import { mountScorelineModeControls } from "../scoreline-mode-controls.js";
import {
  applyNightSessionBackdrop,
  applyNightSessionMode,
  readNightSessionBackdrop,
  readNightSessionMode,
} from "../night-session-mode.js";
import { mountNightSessionModeControls } from "../night-session-mode-controls.js";
import { runCricketAssetLayoutPhase } from "./asset-layout-phase.js";
import { syncScoreWatermark } from "../layout/cricket/watermark.js";

/**
 * Shared Scoreline / Night Session chrome after hydrate + population.
 *
 * @param {HTMLElement} canvas
 * @param {Document} doc
 * @param {string} variantSlug
 * @param {{
 *   resultsLayout?: boolean;
 *   watermark?: boolean;
 *   afterHydrate?: (args: { canvas: HTMLElement; document: Document }) => void | Promise<void>;
 * }} options
 */
export async function finalizeScorelineFamilyAsset(
  canvas,
  doc,
  variantSlug,
  options = {},
) {
  const { resultsLayout = false, watermark = false, afterHydrate } = options;
  const isNightSession = variantSlug === "night-session";

  const primary = doc.querySelector('[data-hydrate="palette-primary"]');
  const secondary = doc.querySelector('[data-hydrate="palette-secondary"]');

  applyScorelineTheme(canvas, {
    primary: primary?.textContent?.trim(),
    secondary: secondary?.textContent?.trim(),
  });

  const wrap = canvas.closest(".design-canvas-wrap");
  if (wrap instanceof HTMLElement) {
    wrap.style.setProperty(
      "--preview-club-primary",
      getComputedStyle(canvas).getPropertyValue("--club-primary").trim() ||
        (isNightSession ? "#ff0000" : "#004de2"),
    );
    wrap.style.setProperty(
      "--preview-club-secondary",
      getComputedStyle(canvas).getPropertyValue("--club-secondary").trim() ||
        (isNightSession ? "#004de2" : "#ff0000"),
    );
  }

  const accent =
    getComputedStyle(canvas).getPropertyValue("--club-primary").trim() ||
    undefined;

  if (isNightSession) {
    applyNightSessionMode(canvas, readNightSessionMode(), { accent });
    applyNightSessionBackdrop(doc, readNightSessionBackdrop());
    mountNightSessionModeControls(canvas);
  } else {
    applyScorelineMode(canvas, readScorelineMode(), { accent });
    applyScorelineBackdrop(doc, readScorelineBackdrop());
    mountScorelineModeControls(canvas);
  }

  runCricketAssetLayoutPhase(doc, {
    resultsLayout,
    nightSessionDensity: isNightSession,
  });

  if (typeof afterHydrate === "function") {
    await afterHydrate({ canvas, document: doc });
  }

  runCricketAssetLayoutPhase(doc, {
    resultsLayout,
    nightSessionDensity: isNightSession,
  });

  if (watermark) {
    canvas.dataset.scoreWatermark = "enabled";
  } else {
    delete canvas.dataset.scoreWatermark;
  }
  syncScoreWatermark(canvas);
}
