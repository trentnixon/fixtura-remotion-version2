/**
 * Tunable pixel math for Broadcast Pro team roster player rows (names + index numbers).
 * Set on {@link TemplateThemeConfig.broadcastProRosterListSizing} in `variants/broadcastPro/theme/tokens.ts`.
 */

export interface BroadcastProRosterListSizing {
  /** Pixels subtracted from available height before dividing by player count. */
  leftColumnHeaderReservePx: number;
  minRowPx: number;
  minNameFontPx: number;
  maxNameFontPx: number;
  minNumberFontPx: number;
  maxNumberFontPx: number;
  /** Fraction of row height used to estimate name font size. */
  nameRowHeightMultiplier: number;
  /** Fraction of row height used to estimate index number font size. */
  numberRowHeightMultiplier: number;
  /** Added after rounding the inner name estimate (before final max cap). */
  nameFontBonusPx: number;
  /**
   * Inner clamp: `min(maxNameFontPx - nameInnerClampMaxOffsetPx, rowPx * nameRowHeightMultiplier)`.
   */
  nameInnerClampMaxOffsetPx: number;
  /** Top padding / shell gaps reserved before the scrollable player list. */
  listChromeReservePx: number;
}

/** Defaults; override per template in `broadcastPro/theme/tokens.ts`. */
export const DEFAULT_BROADCAST_PRO_ROSTER_LIST_SIZING: BroadcastProRosterListSizing =
  {
    leftColumnHeaderReservePx: 36,
    minRowPx: 26,
    minNameFontPx: 12,
    maxNameFontPx: 38,
    minNumberFontPx: 11,
    maxNumberFontPx: 36,
    nameRowHeightMultiplier: 0.45,
    numberRowHeightMultiplier: 0.41,
    nameFontBonusPx: 2,
    nameInnerClampMaxOffsetPx: 2,
    listChromeReservePx: 24,
  };

const ROSTER_OUTER_MARGIN_PX = 48;
const ROSTER_CONTENT_PADDING_PX = 16;
const ROSTER_GRID_COLUMN_COUNT = 12;
const ROSTER_SIDEBAR_COLUMN_SPAN = 5;
const ROSTER_GRID_GAP_PX = 24;

/** Width produced by the roster's 12-column grid and five-column sidebar. */
export const getBroadcastProRosterSidebarWidth = (
  compositionWidth: number,
): number => {
  const gridWidth = Math.max(
    0,
    compositionWidth - ROSTER_OUTER_MARGIN_PX - ROSTER_CONTENT_PADDING_PX,
  );
  const totalGapWidth = (ROSTER_GRID_COLUMN_COUNT - 1) * ROSTER_GRID_GAP_PX;
  const columnWidth = (gridWidth - totalGapWidth) / ROSTER_GRID_COLUMN_COUNT;

  return Math.max(
    0,
    columnWidth * ROSTER_SIDEBAR_COLUMN_SPAN +
      (ROSTER_SIDEBAR_COLUMN_SPAN - 1) * ROSTER_GRID_GAP_PX,
  );
};
