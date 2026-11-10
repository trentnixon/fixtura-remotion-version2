/** Matches TwoColumnClassic main header width (`ClassicMain.tsx`). */
export const TWO_COLUMN_LITE_HEADER_WIDTH_PERCENT = 18;

/** Horizontal inset on the main pane content (`mx-2` + `p-4`). */
export const TWO_COLUMN_LITE_CONTENT_INSET_PX = 8 + 16;

export const getTwoColumnLiteContentWidthPx = (
  compositionWidth: number,
  headerWidthPercent = TWO_COLUMN_LITE_HEADER_WIDTH_PERCENT,
): number => {
  const mainPaneWidth = compositionWidth * (1 - headerWidthPercent / 100);
  return Math.max(0, mainPaneWidth - TWO_COLUMN_LITE_CONTENT_INSET_PX * 2);
};
