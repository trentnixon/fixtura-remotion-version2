import type { DesignPalette } from "../../../../core/utils/designPalettes/types";
import type { LuminanceLookupTable, LuminanceSegment } from "./types";
import {
  DEFAULT_BRAND_SOLID_WIDTH,
  DEFAULT_ENDPOINT_TRANSITION_WIDTH,
  DEFAULT_PROTECTED_ENDPOINT_CORE,
} from "./types";
import type { ProtectedBrandLayout } from "./resolveProtectedBrandSegments";
import { sampleLutFromSegments } from "./sampleLutFromSegments";

/**
 * Coverage ranges for protected black / white mattes (alpha, not RGB).
 * Defaults match cores + transition bands: black 0–8%, white 92–100%.
 */
export type ProtectedBrandMatteRanges = {
  blackCoreEnd: number;
  blackTransitionEnd: number;
  whiteTransitionStart: number;
  whiteCoreStart: number;
};

export const resolveProtectedBrandMatteRanges = (
  layout: ProtectedBrandLayout = {},
): ProtectedBrandMatteRanges => {
  const core = layout.coreWidth ?? DEFAULT_PROTECTED_ENDPOINT_CORE;
  const transition =
    layout.transitionWidth ?? DEFAULT_ENDPOINT_TRANSITION_WIDTH;

  // Round to avoid binary float drift (e.g. 1 - 0.02 - 0.06 → 0.9199…).
  const round = (value: number) => Math.round(value * 1e6) / 1e6;

  const ranges: ProtectedBrandMatteRanges = {
    blackCoreEnd: round(core),
    blackTransitionEnd: round(core + transition),
    whiteTransitionStart: round(1 - core - transition),
    whiteCoreStart: round(1 - core),
  };

  if (ranges.blackTransitionEnd > ranges.whiteTransitionStart) {
    throw new Error("Protected black and white matte ranges must not overlap");
  }

  return ranges;
};

/** Alpha coverage for protected black (1 = full black). */
export const getBlackProtectionAlpha = (
  luminance01: number,
  ranges: ProtectedBrandMatteRanges,
): number => {
  if (luminance01 <= ranges.blackCoreEnd) {
    return 1;
  }
  if (luminance01 >= ranges.blackTransitionEnd) {
    return 0;
  }
  const t =
    (luminance01 - ranges.blackCoreEnd) /
    (ranges.blackTransitionEnd - ranges.blackCoreEnd);
  return 1 - t;
};

/** Alpha coverage for protected white (1 = full white). */
export const getWhiteProtectionAlpha = (
  luminance01: number,
  ranges: ProtectedBrandMatteRanges,
): number => {
  if (luminance01 >= ranges.whiteCoreStart) {
    return 1;
  }
  if (luminance01 <= ranges.whiteTransitionStart) {
    return 0;
  }
  const t =
    (luminance01 - ranges.whiteTransitionStart) /
    (ranges.whiteCoreStart - ranges.whiteTransitionStart);
  return t;
};

/**
 * Brand-only segments for the matte supersample path.
 * Endpoints are club colours (not baked black/white); mattes supply protection.
 */
export const resolveProtectedBrandBrandOnlySegments = (
  palette: DesignPalette,
  layout: ProtectedBrandLayout = {},
): LuminanceSegment[] => {
  const core = layout.coreWidth ?? DEFAULT_PROTECTED_ENDPOINT_CORE;
  const transition =
    layout.transitionWidth ?? DEFAULT_ENDPOINT_TRANSITION_WIDTH;
  const brandSolid = layout.brandSolidWidth ?? DEFAULT_BRAND_SOLID_WIDTH;

  const primaryEnd = core + transition + brandSolid;
  const secondaryStart = 1 - primaryEnd;

  if (primaryEnd >= secondaryStart) {
    throw new Error(
      "Protected-brand layout leaves no room for the midtone brand gradient",
    );
  }

  const primary = palette.background.primary;
  const secondary = palette.background.secondary;

  return [
    { kind: "solid", from: 0, to: primaryEnd, color: primary },
    {
      kind: "gradient",
      from: primaryEnd,
      to: secondaryStart,
      fromColor: primary,
      toColor: secondary,
    },
    { kind: "solid", from: secondaryStart, to: 1, color: secondary },
  ];
};

export const resolveProtectedBrandBrandLut = (
  palette: DesignPalette,
  layout: ProtectedBrandLayout = {},
): LuminanceLookupTable =>
  sampleLutFromSegments(
    resolveProtectedBrandBrandOnlySegments(palette, layout),
  );
