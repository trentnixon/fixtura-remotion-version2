/** Matches Top 5 grid cards (#2–#5) when asset height allows. */
export const BROADCAST_PRO_PERFORMANCE_GRID_CARD_HEIGHT_PX = 215;

export const BROADCAST_PRO_PERFORMANCE_GRID_COLUMNS = 2;
export const BROADCAST_PRO_PERFORMANCE_GRID_GAP_PX = 8;

export interface BroadcastProPerformanceGridLayout {
  cardHeight: number;
  rows: number;
  gridHeight: number;
}

/**
 * Sizes the 2-column performance grid to fit the main area (between header and footer).
 */
export const calculateBroadcastProPerformanceGridLayout = (
  mainHeight: number,
  itemsPerScreen: number,
): BroadcastProPerformanceGridLayout => {
  if (itemsPerScreen <= 0 || mainHeight <= 0) {
    return {
      cardHeight: BROADCAST_PRO_PERFORMANCE_GRID_CARD_HEIGHT_PX,
      rows: 0,
      gridHeight: 0,
    };
  }

  const rows = Math.ceil(
    itemsPerScreen / BROADCAST_PRO_PERFORMANCE_GRID_COLUMNS,
  );
  const gapTotal =
    BROADCAST_PRO_PERFORMANCE_GRID_GAP_PX * Math.max(0, rows - 1);
  const evenSplit = Math.floor((mainHeight - gapTotal) / rows);
  const cardHeight = Math.min(
    evenSplit,
    BROADCAST_PRO_PERFORMANCE_GRID_CARD_HEIGHT_PX,
  );
  const gridHeight = rows * cardHeight + gapTotal;

  return { cardHeight, rows, gridHeight };
};
