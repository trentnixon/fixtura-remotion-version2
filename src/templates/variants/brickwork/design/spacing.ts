import type { CSSProperties } from "react";

/** Vertical gap between Brickwork row/card stacks — aligns with Tailwind `gap-1` (4px). */
export const BRICKWORK_ROW_GAP_PX = 4;

export const BRICKWORK_ROW_GAP_CLASS = "gap-1";

/** Inline gap for stacks when Tailwind class scanning misses token strings. */
export const BRICKWORK_ROW_GAP_STYLE: CSSProperties = {
  gap: BRICKWORK_ROW_GAP_PX,
};

/** Class for a full-width vertical stack of Brickwork rows/cards. */
export const BRICKWORK_ROW_STACK_CLASS = `flex flex-col w-full ${BRICKWORK_ROW_GAP_CLASS}`;

/** Class for a single-column grid of Brickwork rows (Top 5). */
export const BRICKWORK_SINGLE_COLUMN_GRID_CLASS = `grid grid-cols-1 ${BRICKWORK_ROW_GAP_CLASS}`;

/** Class for a Brickwork grid stack (e.g. Team of the Week). */
export const BRICKWORK_GRID_STACK_CLASS = `grid grid-cols-2 ${BRICKWORK_ROW_GAP_CLASS}`;

export const getBrickworkStackGapTotalPx = (itemCount: number): number =>
  Math.max(0, itemCount - 1) * BRICKWORK_ROW_GAP_PX;

/**
 * Evenly divides height among stack items after subtracting inter-row gaps.
 */
export const calculateBrickworkStackItemHeight = (
  totalHeightPx: number,
  itemCount: number,
  outerPaddingPx = 0,
): number => {
  if (itemCount <= 0) {
    return 0;
  }

  const gaps = getBrickworkStackGapTotalPx(itemCount);
  return Math.floor((totalHeightPx - outerPaddingPx - gaps) / itemCount);
};
