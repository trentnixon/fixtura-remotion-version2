import { CSSProperties } from "react";

/** Horizontal inset for odd-index masonry rows (8–24px ticket range). */
export const MASONRY_INSET_PX = 16;

/**
 * Even rows flush full width; odd rows inset on both sides.
 * Index 0 (featured) stays flush.
 */
export const getMasonryInsetPx = (index: number): number =>
  index % 2 === 0 ? 0 : MASONRY_INSET_PX;

export const getMasonryRowStyle = (index: number): CSSProperties => {
  const inset = getMasonryInsetPx(index);

  if (inset === 0) {
    return { width: "100%" };
  }

  return {
    width: `calc(100% - ${inset * 2}px)`,
    marginLeft: inset,
    marginRight: inset,
  };
};
