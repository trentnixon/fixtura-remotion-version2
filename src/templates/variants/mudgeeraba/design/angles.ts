import type { CSSProperties } from "react";

/**
 * Mudgeeraba official two-angle design system.
 *
 * Shallow (5%): list rows, status bars, mirrored columns, supporting panels.
 * Steep (30%): logo wells, dividers, hero score wedges.
 */

export const SHALLOW_CUT_PERCENT = 5;
export const STEEP_CUT_PERCENT = 30;

/**
 * Fillet radius at clip-path vertices (% of box).
 * Keeps straight diagonal edges; rounds where diagonals meet flat sides.
 * Set to 0 to disable.
 */
export const CORNER_SOFTEN_PERCENT = 2;

/** Samples per rounded corner (higher = smoother arcs on diagonals). */
export const CORNER_ARC_SEGMENTS = 2;

type Point = [number, number];

const polygon = (points: Point[]): string =>
  `polygon(${points.map(([x, y]) => `${x}% ${y}%`).join(", ")})`;

const distance = (a: Point, b: Point): number =>
  Math.hypot(b[0] - a[0], b[1] - a[1]);

const quadraticBezier = (start: Point, control: Point, end: Point, t: number): Point => {
  const u = 1 - t;
  return [
    u * u * start[0] + 2 * u * t * control[0] + t * t * end[0],
    u * u * start[1] + 2 * u * t * control[1] + t * t * end[1],
  ];
};

const roundVertex = (
  prev: Point,
  corner: Point,
  next: Point,
  radius: number,
): { start: Point; end: Point } => {
  const inLen = distance(prev, corner);
  const outLen = distance(corner, next);
  const r = Math.min(radius, inLen * 0.48, outLen * 0.48);

  const inX = (corner[0] - prev[0]) / inLen;
  const inY = (corner[1] - prev[1]) / inLen;
  const outX = (next[0] - corner[0]) / outLen;
  const outY = (next[1] - corner[1]) / outLen;

  return {
    start: [corner[0] - inX * r, corner[1] - inY * r],
    end: [corner[0] + outX * r, corner[1] + outY * r],
  };
};

/**
 * Replace each sharp vertex with a quadratic arc (fillet).
 * Diagonal edges stay straight; junctions at top/bottom/sides become curved.
 */
const softenPolygon = (
  corners: Point[],
  radius: number,
  segments = CORNER_ARC_SEGMENTS,
): string => {
  if (radius <= 0) {
    return polygon(corners);
  }

  const rounded: Point[] = [];
  const count = corners.length;

  for (let i = 0; i < count; i++) {
    const prev = corners[(i - 1 + count) % count];
    const corner = corners[i];
    const next = corners[(i + 1) % count];
    const { start, end } = roundVertex(prev, corner, next, radius);

    rounded.push(start);

    for (let s = 1; s <= segments; s++) {
      rounded.push(quadraticBezier(start, corner, end, s / segments));
    }
  }

  return polygon(rounded);
};

const r = CORNER_SOFTEN_PERCENT;
const shallowBottomRight = 100 - SHALLOW_CUT_PERCENT;
const shallowTopLeft = SHALLOW_CUT_PERCENT;
const steepBottomRight = 100 - STEEP_CUT_PERCENT;
const steepTopRight = 100 - STEEP_CUT_PERCENT;

/** List row / single-edge panel: straight left, shallow angled right */
export const SHALLOW_ROW_LEFT = softenPolygon(
  [
    [0, 0],
    [100, 0],
    [shallowBottomRight, 100],
    [0, 100],
  ],
  r,
);

/** Mirrored list row / single-edge panel: shallow angled left, straight right */
export const SHALLOW_ROW_RIGHT = softenPolygon(
  [
    [shallowTopLeft, 0],
    [100, 0],
    [100, 100],
    [0, 100],
  ],
  r,
);

/** Two-column layout: left team / home column */
export const SHALLOW_COLUMN_LEFT = SHALLOW_ROW_LEFT;

/** Two-column layout: right team / away column (mirrored) */
export const SHALLOW_COLUMN_RIGHT = SHALLOW_ROW_RIGHT;

/** Status bar with symmetric shallow cuts on both bottom corners */
export const SHALLOW_STATUS_BAR = softenPolygon(
  [
    [0, 0],
    [100, 0],
    [shallowBottomRight, 100],
    [shallowTopLeft, 100],
  ],
  r,
);

/** Narrow header bar with softened top inset (supporting panel variant) */
export const SHALLOW_HEADER_TOP = softenPolygon(
  [
    [2, 0],
    [98, 0],
    [100, 100],
    [0, 100],
  ],
  r,
);

/** Thin accent strip along the shallow angled right edge of a left-aligned panel */
export const SHALLOW_EDGE_STRIP_RIGHT = `polygon(100% 0%, ${shallowBottomRight}% 100%, ${shallowBottomRight - 1}% 100%, 99% 0%)`;

/** Thin accent strip along the shallow angled left edge of a right-aligned panel */
export const SHALLOW_EDGE_STRIP_LEFT = `polygon(${shallowTopLeft}% 0%, 0% 100%, 1% 100%, ${shallowTopLeft + 1}% 0%)`;

/** Steep logo well: straight left, steep angled right (player rows, icon blocks) */
export const STEEP_LOGO_WELL_LEFT = softenPolygon(
  [
    [0, 0],
    [100, 0],
    [steepBottomRight, 100],
    [0, 100],
  ],
  r,
);

/** Steep logo well mirrored: steep angled left, straight right (TOTW club logo panel) */
export const STEEP_LOGO_WELL_RIGHT = softenPolygon(
  [
    [STEEP_CUT_PERCENT, 0],
    [0, 100],
    [100, 100],
    [100, 0],
  ],
  r,
);

/** Steep hero wedge: shallow top-right cut for score emphasis bars */
export const STEEP_HERO_TOP_LEFT = softenPolygon(
  [
    [0, 0],
    [steepTopRight, 0],
    [100, 100],
    [0, 100],
  ],
  r,
);

/** Angular divider — left chevron segment (derived from shallow cut at midline) */
export const SHALLOW_DIVIDER_LEFT = softenPolygon(
  [
    [0, 0],
    [100, 0],
    [shallowBottomRight, 50],
    [100, 100],
    [0, 100],
  ],
  r,
);

/** Angular divider — right chevron segment (mirrored) */
export const SHALLOW_DIVIDER_RIGHT = softenPolygon(
  [
    [shallowTopLeft, 0],
    [100, 0],
    [100, 100],
    [0, 100],
    [shallowTopLeft, 50],
  ],
  r,
);

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

/** Angular edge-strip accents are always shown (diagonal cuts preserved). */
export const showAngularEdgeAccents = (): boolean => true;

/** Apply clip-path with WebKit prefix for Remotion/browser consistency */
export const clipPathStyle = (clipPath: string): CSSProperties => ({
  clipPath,
  WebkitClipPath: clipPath,
});
