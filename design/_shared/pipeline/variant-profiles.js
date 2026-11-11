/**
 * Design-site canvas roots per variant slug (explore verify / handoff).
 *
 * @param {string} variantSlug
 */
export function resolveCanvasSelector(variantSlug) {
  if (variantSlug === "night-session") {
    return ".night-session-canvas";
  }
  if (variantSlug === "scoreline") {
    return ".scoreline-canvas";
  }
  return ".template-canvas";
}
