/** Portrait render frame height (see `ProductionRoot.tsx`). */
export const VIDEO_FRAME_HEIGHT = 1350;

export interface ThemeLayoutHeights {
  asset: number;
  header: number;
  footer: number;
}

/**
 * Theme layout identity for the main sequence:
 *
 *   header + asset + footer = VIDEO_FRAME_HEIGHT (1350)
 *
 * - `header` — template shell (OneColumn / variant main header)
 * - `asset` — main content drawable area (composition grid/list/cards)
 * - `footer` — sponsor strip, usually rendered inside the composition below asset
 *
 * Example (Broadcast Pro theme): 310 + 910 + 130 = 1350
 */
export const getMainContentSectionHeight = (
  heights: Pick<ThemeLayoutHeights, "asset">,
): number => {
  return Math.max(1, heights.asset);
};

/**
 * Composition block below the template header when the sponsor/footer strip
 * is a sibling under the main content (performances, ladder, upcoming, etc.).
 *
 *   asset + footer
 */
export const getCompositionSectionHeight = (
  heights: Pick<ThemeLayoutHeights, "asset" | "footer">,
): number => {
  return Math.max(1, heights.asset + heights.footer);
};

/**
 * Main content height when the theme footer strip is rendered as a sibling
 * below the drawable area (e.g. roster sheet above sponsor logos).
 */
export const getMainContentHeightReservingFooter = (
  heights: Pick<ThemeLayoutHeights, "asset" | "footer">,
): number => {
  return Math.max(1, heights.asset - heights.footer);
};

/**
 * Returns true when theme heights sum to the portrait frame height.
 */
export const themeHeightsFitVideoFrame = (
  heights: ThemeLayoutHeights,
  frameHeight: number = VIDEO_FRAME_HEIGHT,
): boolean => {
  return heights.header + heights.asset + heights.footer === frameHeight;
};
