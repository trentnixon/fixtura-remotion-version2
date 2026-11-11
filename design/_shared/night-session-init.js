import { applyVariantFonts } from "./fonts.js";
import { runDesignPipeline } from "./pipeline/run-design-pipeline.js";
import { finalizeScorelineFamilyAsset } from "./pipeline/scoreline-family-bootstrap.js";

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

  const pipeline = await runDesignPipeline(context, {
    skipHydrate,
    canvasSelector: ".night-session-canvas",
    populationMode: "manifest",
  });

  if (!pipeline.ok || !pipeline.canvas) {
    return { ok: false, canvas: null };
  }

  await finalizeScorelineFamilyAsset(
    pipeline.canvas,
    document,
    context.variantSlug,
    {
      resultsLayout,
      watermark,
      afterHydrate,
    },
  );

  await applyVariantFonts(context.variantSlug);

  return { ok: true, canvas: pipeline.canvas };
}
