import type { DesignPalette } from "../../../../core/utils/designPalettes/types";
import type { LuminanceSegment } from "./types";
import {
  DEFAULT_BRAND_SOLID_WIDTH,
  DEFAULT_ENDPOINT_TRANSITION_WIDTH,
  DEFAULT_PROTECTED_ENDPOINT_CORE,
} from "./types";

export type ProtectedBrandLayout = {
  /** Pure black / pure white core width (default 0.02). */
  coreWidth?: number;
  /** Anti-alias transition into / out of brand colours (default 0.06). */
  transitionWidth?: number;
  /** Solid primary / secondary band after each transition (default 0.07). */
  brandSolidWidth?: number;
};

/**
 * Builds protected-brand segments:
 * protected endpoint cores → endpoint transition bands → brand-mapped tonal range.
 * Cores are not overlays; transitions prevent hard jumps on anti-aliased edges.
 */
export const resolveProtectedBrandSegments = (
  palette: DesignPalette,
  layout: ProtectedBrandLayout = {},
): LuminanceSegment[] => {
  const core = layout.coreWidth ?? DEFAULT_PROTECTED_ENDPOINT_CORE;
  const transition =
    layout.transitionWidth ?? DEFAULT_ENDPOINT_TRANSITION_WIDTH;
  const brandSolid = layout.brandSolidWidth ?? DEFAULT_BRAND_SOLID_WIDTH;

  const blackCoreEnd = core;
  const blackTransitionEnd = core + transition;
  const primaryEnd = core + transition + brandSolid;
  const secondaryStart = 1 - primaryEnd;
  const whiteTransitionStart = 1 - core - transition;
  const whiteCoreStart = 1 - core;

  if (primaryEnd >= secondaryStart) {
    throw new Error(
      "Protected-brand layout leaves no room for the midtone brand gradient",
    );
  }

  const primary = palette.background.primary;
  const secondary = palette.background.secondary;

  return [
    { kind: "solid", from: 0, to: blackCoreEnd, color: "#000000" },
    {
      kind: "gradient",
      from: blackCoreEnd,
      to: blackTransitionEnd,
      fromColor: "#000000",
      toColor: primary,
    },
    { kind: "solid", from: blackTransitionEnd, to: primaryEnd, color: primary },
    {
      kind: "gradient",
      from: primaryEnd,
      to: secondaryStart,
      fromColor: primary,
      toColor: secondary,
    },
    {
      kind: "solid",
      from: secondaryStart,
      to: whiteTransitionStart,
      color: secondary,
    },
    {
      kind: "gradient",
      from: whiteTransitionStart,
      to: whiteCoreStart,
      fromColor: secondary,
      toColor: "#FFFFFF",
    },
    { kind: "solid", from: whiteCoreStart, to: 1, color: "#FFFFFF" },
  ];
};

export const reverseSegments = (
  segments: readonly LuminanceSegment[],
): LuminanceSegment[] =>
  [...segments]
    .map((segment) => {
      const from = 1 - segment.to;
      const to = 1 - segment.from;
      if (segment.kind === "solid") {
        return { ...segment, from, to };
      }
      return {
        ...segment,
        from,
        to,
        fromColor: segment.toColor,
        toColor: segment.fromColor,
      };
    })
    .sort((left, right) => left.from - right.from);
