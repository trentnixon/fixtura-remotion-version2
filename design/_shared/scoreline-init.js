import { runDesignPipeline } from "./pipeline/run-design-pipeline.js";
import { finalizeScorelineFamilyAsset } from "./pipeline/scoreline-family-bootstrap.js";

/**
 * Shared Scoreline bootstrap: hydrate → theme → mode → layout phase.
 */
export async function initScorelineAsset(context, options = {}) {
  const {
    resultsLayout = false,
    watermark = false,
    skipHydrate = false,
    afterHydrate,
  } = options;

  const pipeline = await runDesignPipeline(context, {
    skipHydrate,
    canvasSelector: ".scoreline-canvas",
    populationMode: "skip",
  });

  if (!pipeline.ok || !pipeline.canvas) {
    return { canvas: null };
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

  return { canvas: pipeline.canvas };
}
