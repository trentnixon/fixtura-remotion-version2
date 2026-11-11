import { applyVariantFonts } from "./fonts.js";
import { runDesignPipeline } from "./pipeline/run-design-pipeline.js";
import { watchScorelineCrests } from "./scoreline-layout.js";

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
  const pipeline = await runDesignPipeline(context, {
    canvasSelector: ".template-canvas",
    populationMode: "manifest",
  });

  if (!pipeline.ok || !pipeline.canvas) {
    return { ok: false, canvas: null };
  }

  const primary = document.querySelector('[data-hydrate="palette-primary"]');
  const secondary = document.querySelector(
    '[data-hydrate="palette-secondary"]',
  );

  applyTemplatePalette(pipeline.canvas, {
    primary: primary?.textContent ?? undefined,
    secondary: secondary?.textContent ?? undefined,
  });

  await applyVariantFonts(context.variantSlug);
  watchScorelineCrests(document);

  return { ok: true, canvas: pipeline.canvas };
}
