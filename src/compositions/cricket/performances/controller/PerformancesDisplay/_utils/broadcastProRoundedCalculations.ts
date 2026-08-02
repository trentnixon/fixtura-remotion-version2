/** Matches Top 5 grid cards (#2–#5) when asset height allows. */
export const BROADCAST_PRO_ROUNDED_PERFORMANCE_GRID_CARD_HEIGHT_PX = 215;

export const BROADCAST_PRO_ROUNDED_PERFORMANCE_GRID_COLUMNS = 2;
export const BROADCAST_PRO_ROUNDED_PERFORMANCE_GRID_GAP_PX = 8;

export interface BroadcastProRoundedPerformanceGridLayout {
  cardHeight: number;
  rows: number;
  gridHeight: number;
}

/**
 * Sizes the 2-column performance grid to fit the theme asset height
 * (main content section below the template header).
 */
export const calculateBroadcastProRoundedPerformanceGridLayout = (
  mainHeight: number,
  itemsPerScreen: number,
): BroadcastProRoundedPerformanceGridLayout => {
  if (itemsPerScreen <= 0 || mainHeight <= 0) {
    return {
      cardHeight: BROADCAST_PRO_ROUNDED_PERFORMANCE_GRID_CARD_HEIGHT_PX,
      rows: 0,
      gridHeight: 0,
    };
  }

  const rows = Math.ceil(
    itemsPerScreen / BROADCAST_PRO_ROUNDED_PERFORMANCE_GRID_COLUMNS,
  );
  const gapTotal =
    BROADCAST_PRO_ROUNDED_PERFORMANCE_GRID_GAP_PX * Math.max(0, rows - 1);
  const evenSplit = Math.floor((mainHeight - gapTotal) / rows);
  const cardHeight = Math.min(
    evenSplit,
    BROADCAST_PRO_ROUNDED_PERFORMANCE_GRID_CARD_HEIGHT_PX,
  );
  const gridHeight = rows * cardHeight + gapTotal;

  return { cardHeight, rows, gridHeight };
};
