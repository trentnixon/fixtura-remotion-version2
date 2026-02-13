const LARGE_LEAGUE_THRESHOLD = 14;

/**
 * Calculate row dimensions for ladder display (dynamic to fit all teams).
 * Uses tighter spacing when teamCount exceeds LARGE_LEAGUE_THRESHOLD so all teams fit.
 * @param totalHeight - Total available height for the ladder
 * @param teamCount - Number of teams in the ladder
 * @param extraReserved - Optional extra vertical space to reserve (e.g. display margin + gap) so all rows fit
 * @returns Object containing headerHeight, rowHeight, compact (use smaller padding/font in row)
 */
export const calculateRowDimensions = (
  totalHeight: number,
  teamCount: number,
  extraReserved: number = 0,
): { headerHeight: number; rowHeight: number; compact: boolean } => {
  const isLargeLeague = teamCount > LARGE_LEAGUE_THRESHOLD;

  const headerHeight = isLargeLeague ? 52 : 70;
  const VERTICAL_GAP = isLargeLeague ? 2 : 4;
  const PADDING = isLargeLeague ? 12 : 20;
  const HEADER_MARGIN = isLargeLeague ? 6 : 10;

  const ladderHeight = totalHeight - headerHeight;
  const totalVerticalGaps = (teamCount - 1) * VERTICAL_GAP;
  const availableHeight =
    ladderHeight - PADDING * 2 - HEADER_MARGIN - extraReserved;
  const rowHeight = Math.max(0, (availableHeight - totalVerticalGaps) / teamCount);

  return {
    headerHeight,
    rowHeight,
    compact: isLargeLeague || rowHeight < 40,
  };
};
