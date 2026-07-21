import type { CSSProperties } from "react";

/**
 * Mudgeeraba official two-angle design system.
 *
 * Shallow (5%): list rows, status bars, mirrored columns, supporting panels.
 * Steep (30%): logo wells, dividers, hero score wedges.
 */

export const SHALLOW_CUT_PERCENT = 5;
export const STEEP_CUT_PERCENT = 30;

const shallowBottomRight = 100 - SHALLOW_CUT_PERCENT;
const shallowTopLeft = SHALLOW_CUT_PERCENT;
const steepBottomRight = 100 - STEEP_CUT_PERCENT;
const steepTopRight = 100 - STEEP_CUT_PERCENT;

/** List row / single-edge panel: straight left, shallow angled right */
export const SHALLOW_ROW_LEFT = `polygon(0% 0%, 100% 0%, ${shallowBottomRight}% 100%, 0% 100%)`;

/** Mirrored list row / single-edge panel: shallow angled left, straight right */
export const SHALLOW_ROW_RIGHT = `polygon(${shallowTopLeft}% 0%, 100% 0%, 100% 100%, 0% 100%)`;

/** Two-column layout: left team / home column */
export const SHALLOW_COLUMN_LEFT = SHALLOW_ROW_LEFT;

/** Two-column layout: right team / away column (mirrored) */
export const SHALLOW_COLUMN_RIGHT = SHALLOW_ROW_RIGHT;

/** Status bar with symmetric shallow cuts on both bottom corners */
export const SHALLOW_STATUS_BAR = `polygon(0% 0%, 100% 0%, ${shallowBottomRight}% 100%, ${shallowTopLeft}% 100%)`;

/** Narrow header bar with softened top inset (supporting panel variant) */
export const SHALLOW_HEADER_TOP = "polygon(2% 0%, 98% 0%, 100% 100%, 0% 100%)";

/** Thin accent strip along the shallow angled right edge of a left-aligned panel */
export const SHALLOW_EDGE_STRIP_RIGHT = `polygon(100% 0%, ${shallowBottomRight}% 100%, ${shallowBottomRight - 1}% 100%, 99% 0%)`;

/** Thin accent strip along the shallow angled left edge of a right-aligned panel */
export const SHALLOW_EDGE_STRIP_LEFT = `polygon(${shallowTopLeft}% 0%, 0% 100%, 1% 100%, ${shallowTopLeft + 1}% 0%)`;

/** Steep logo well: straight left, steep angled right (player rows, icon blocks) */
export const STEEP_LOGO_WELL_LEFT = `polygon(0% 0%, 100% 0%, ${steepBottomRight}% 100%, 0% 100%)`;

/** Steep logo well mirrored: steep angled left, straight right (TOTW club logo panel) */
export const STEEP_LOGO_WELL_RIGHT = `polygon(${STEEP_CUT_PERCENT}% 0%, 0% 100%, 100% 100%, 100% 0%)`;

/** Steep hero wedge: shallow top-right cut for score emphasis bars */
export const STEEP_HERO_TOP_LEFT = `polygon(0% 0%, ${steepTopRight}% 0%, 100% 100%, 0% 100%)`;

/** Angular divider — left chevron segment (derived from shallow cut at midline) */
export const SHALLOW_DIVIDER_LEFT = `polygon(0% 0%, 100% 0%, ${shallowBottomRight}% 50%, 100% 100%, 0% 100%)`;

/** Angular divider — right chevron segment (mirrored) */
export const SHALLOW_DIVIDER_RIGHT = `polygon(${shallowTopLeft}% 0%, 100% 0%, 100% 100%, 0% 100%, ${shallowTopLeft}% 50%)`;

/** Mirrored padding for shallow left-aligned panels (outer left gets more padding) */
export const PADDING_SHALLOW_LEFT = "pl-4 pr-10";

/** Mirrored padding for shallow right-aligned panels */
export const PADDING_SHALLOW_RIGHT = "pl-12 pr-3";

/** Compact row padding variant */
export const PADDING_SHALLOW_LEFT_COMPACT = "pl-2 pr-6";

/** Player row with logo flush to left edge */
export const PADDING_SHALLOW_ROW_LOGO_FLUSH = "pl-0 pr-10";

/** Compact player row with logo flush to left edge */
export const PADDING_SHALLOW_ROW_LOGO_FLUSH_COMPACT = "pl-0 pr-6";

export const getShallowColumnPadding = (isLeftColumn: boolean): string =>
  isLeftColumn ? PADDING_SHALLOW_LEFT : PADDING_SHALLOW_RIGHT;

export const getShallowEdgeStrip = (isLeftColumn: boolean): string =>
  isLeftColumn ? SHALLOW_EDGE_STRIP_RIGHT : SHALLOW_EDGE_STRIP_LEFT;

/** Apply clip-path with WebKit prefix for Remotion/browser consistency */
export const clipPathStyle = (clipPath: string): CSSProperties => ({
  clipPath,
  WebkitClipPath: clipPath,
});
