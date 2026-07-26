const clamp = (min: number, value: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export interface BroadcastProLadderRowTypography {
  rankFontPx: number;
  statFontPx: number;
  pointsFontPx: number;
  nameFontPx: number;
  /** Use BroadcastProScoreText compact tier when row is short (fallback). */
  scoreCompact: boolean;
}

/**
 * Scale ladder row copy from row height so team names and numerals stay balanced
 * on large leagues (e.g. 15 clubs ≈ 59px rows) without full text-5xl overflow.
 */
export const resolveBroadcastProLadderRowTypography = (
  rowHeightPx: number,
): BroadcastProLadderRowTypography => {
  const h = Math.max(1, rowHeightPx);

  return {
    rankFontPx: clamp(24, Math.round(h * 0.7), 48),
    statFontPx: clamp(20, Math.round(h * 0.58), 36),
    pointsFontPx: clamp(22, Math.round(h * 0.65), 48),
    nameFontPx: clamp(22, Math.round(h * 0.55), 38),
    scoreCompact: h < 64,
  };
};
