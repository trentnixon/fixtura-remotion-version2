import {
  VERTICAL_GAP,
  PADDING,
  TITLE_HEIGHT,
  HEIGHT_DIVISOR,
} from "./constants";

/**
 * Calculate row dimensions based on total height and player count
 * @param totalHeight - Total available height
 * @param playerCount - Number of players
 * @returns Object containing calculated rowHeight
 */
export const calculateRowDimensions = (
  totalHeight: number,
  playerCount: number,
): { rowHeight: number } => {
  const totalVerticalGaps = (playerCount - 1) * VERTICAL_GAP;
  const availableHeight =
    totalHeight / HEIGHT_DIVISOR - PADDING * 2 - TITLE_HEIGHT;
  const rowHeight = (availableHeight - totalVerticalGaps) / playerCount;

  return {
    rowHeight,
  };
};
