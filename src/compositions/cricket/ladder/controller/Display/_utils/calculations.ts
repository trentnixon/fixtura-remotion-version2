/**
 * Calculate row dimensions for ladder display
 * @param totalHeight - Total available height for the ladder
 * @param teamCount - Number of teams in the ladder
 * @returns Object containing headerHeight and rowHeight
 */
export const calculateRowDimensions = (
  totalHeight: number,
  teamCount: number,
): { headerHeight: number; rowHeight: number } => {
  const headerHeight = 70;
  const VERTICAL_GAP = 4;
  const PADDING = 20;
  const HEADER_MARGIN = 10;

  const ladderHeight = totalHeight - headerHeight;
  const totalVerticalGaps = (teamCount - 1) * VERTICAL_GAP;
  const availableHeight = ladderHeight - PADDING * 2 - HEADER_MARGIN;
  const rowHeight = (availableHeight - totalVerticalGaps) / teamCount;

  return {
    headerHeight,
    rowHeight,
  };
};
