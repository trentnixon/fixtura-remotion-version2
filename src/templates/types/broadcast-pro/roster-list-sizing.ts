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
  };
