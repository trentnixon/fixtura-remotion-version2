import type { CSSProperties } from "react";
import tinycolor from "tinycolor2";
import type { ContainerAnimationConfig } from "../../../../components/containers/animations/animationTypes";

/** Default rail thickness in pixels (each of primary + secondary). */
export const SPLIT_EDGE_RAIL_PRIMARY_PX = 5;
export const SPLIT_EDGE_RAIL_SECONDARY_PX = 5;

/** Gap between paired rails. */
export const SPLIT_EDGE_RAIL_GAP_PX = 3;

/** Stepped terminal inset — outer rail ends short of the inner rail. */
export const SPLIT_EDGE_TERMINAL_STEP_PX = 24;

/** Default span — rails do not stretch to full parent width/height. */
export const SPLIT_EDGE_LENGTH_HORIZONTAL_PX = 320;
export const SPLIT_EDGE_LENGTH_VERTICAL_PX = 72;

/** Inset from container edge so rails sit outside text/logo safe areas. */
export const SPLIT_EDGE_OFFSET_PX = 0;

/** Leading padding so split-edge rails sit outside panel content. */
export const getSplitEdgeInsetPx = (paddingExtra = 4): number =>
  SPLIT_EDGE_RAIL_PRIMARY_PX +
  SPLIT_EDGE_RAIL_SECONDARY_PX +
  SPLIT_EDGE_RAIL_GAP_PX +
  paddingExtra;

/** Minimum readability between paired rails (decorative, not text). */
export const SPLIT_EDGE_MIN_RAIL_CONTRAST = 1.35;

export const SPLIT_EDGE_ANIMATION_DURATION = 14;
export const SPLIT_EDGE_ANIMATION_STAGGER = 5;

const SPLIT_EDGE_ANIMATION_EASING = {
  type: "inOut" as const,
  base: "ease" as const,
};

export type SplitColourEdgeOrientation = "vertical" | "horizontal" | "corner";

export type SplitColourEdgePlacement =
  | "leading"
  | "trailing"
  | "top"
  | "bottom"
  | "topLeading";

export interface SplitColourEdgeTokens {
  primaryThicknessPx: number;
  secondaryThicknessPx: number;
  railGapPx: number;
  terminalStepPx: number;
  offsetPx: number;
  /** Horizontal rail span in px (width). */
  horizontalLengthPx: number;
  /** Vertical rail span in px (height). */
  verticalLengthPx: number;
}

export const DEFAULT_SPLIT_EDGE_TOKENS: SplitColourEdgeTokens = {
  primaryThicknessPx: SPLIT_EDGE_RAIL_PRIMARY_PX,
  secondaryThicknessPx: SPLIT_EDGE_RAIL_SECONDARY_PX,
  railGapPx: SPLIT_EDGE_RAIL_GAP_PX,
  terminalStepPx: SPLIT_EDGE_TERMINAL_STEP_PX,
  offsetPx: SPLIT_EDGE_OFFSET_PX,
  horizontalLengthPx: SPLIT_EDGE_LENGTH_HORIZONTAL_PX,
  verticalLengthPx: SPLIT_EDGE_LENGTH_VERTICAL_PX,
};

export interface SplitEdgeColours {
  primary: string;
  secondary: string;
}

/**
 * Ensures primary and secondary rails remain visually distinct when club
 * colours are too similar.
 */
export const resolveSplitEdgeColours = (
  primary: string,
  secondary: string,
  minContrast = SPLIT_EDGE_MIN_RAIL_CONTRAST,
): SplitEdgeColours => {
  const readability = tinycolor.readability(primary, secondary);
  if (readability >= minContrast) {
    return { primary, secondary };
  }

  const primaryTiny = tinycolor(primary);
  let adjusted = tinycolor(secondary);

  for (let i = 0; i < 40 && tinycolor.readability(primary, adjusted) < minContrast; i++) {
    adjusted = primaryTiny.isDark()
      ? adjusted.lighten(4)
      : adjusted.darken(4);
  }

  if (tinycolor.readability(primary, adjusted) < minContrast) {
    adjusted = primaryTiny.isDark()
      ? tinycolor("#ffffff")
      : tinycolor("#111111");
  }

  return { primary, secondary: adjusted.toString() };
};

export const getSplitEdgeRailAnimations = (
  orientation: "vertical" | "horizontal",
): {
  primary: ContainerAnimationConfig;
  secondary: ContainerAnimationConfig;
} => {
  const base = {
    duration: SPLIT_EDGE_ANIMATION_DURATION,
    easing: SPLIT_EDGE_ANIMATION_EASING,
  };

  if (orientation === "horizontal") {
    return {
      primary: { ...base, type: "revealLeft" },
      secondary: { ...base, type: "revealRight" },
    };
  }

  return {
    primary: { ...base, type: "revealTop" },
    secondary: { ...base, type: "revealBottom" },
  };
};

/** Vertical leading/trailing pair — stepped terminals at opposite ends. */
export const getVerticalSplitEdgeStyle = (
  edge: "leading" | "trailing",
  colours: SplitEdgeColours,
  tokens: SplitColourEdgeTokens = DEFAULT_SPLIT_EDGE_TOKENS,
): { container: CSSProperties; primary: CSSProperties; secondary: CSSProperties } => {
  const {
    primaryThicknessPx,
    secondaryThicknessPx,
    railGapPx,
    terminalStepPx,
    offsetPx,
    verticalLengthPx,
  } = tokens;
  const totalWidth = primaryThicknessPx + railGapPx + secondaryThicknessPx;

  const container: CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: totalWidth,
    height: verticalLengthPx,
    display: "flex",
    flexDirection: "row",
    gap: railGapPx,
    ...(edge === "leading" ? { left: offsetPx } : { right: offsetPx }),
  };

  const primary: CSSProperties = {
    width: primaryThicknessPx,
    height: "100%",
    backgroundColor: colours.primary,
    marginTop: terminalStepPx,
    flexShrink: 0,
  };

  const secondary: CSSProperties = {
    width: secondaryThicknessPx,
    height: "100%",
    backgroundColor: colours.secondary,
    marginBottom: terminalStepPx,
    flexShrink: 0,
  };

  return {
    container,
    primary,
    secondary: edge === "leading"
      ? secondary
      : { ...secondary, marginBottom: 0, marginTop: terminalStepPx },
  };
};

/** Horizontal top/bottom pair — stepped terminals at opposite ends. */
export const getHorizontalSplitEdgeStyle = (
  edge: "top" | "bottom",
  colours: SplitEdgeColours,
  tokens: SplitColourEdgeTokens = DEFAULT_SPLIT_EDGE_TOKENS,
): { container: CSSProperties; primary: CSSProperties; secondary: CSSProperties } => {
  const {
    primaryThicknessPx,
    secondaryThicknessPx,
    railGapPx,
    terminalStepPx,
    offsetPx,
    horizontalLengthPx,
  } = tokens;
  const totalHeight = primaryThicknessPx + railGapPx + secondaryThicknessPx;

  const container: CSSProperties = {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    width: horizontalLengthPx,
    height: totalHeight,
    display: "flex",
    flexDirection: edge === "bottom" ? "column-reverse" : "column",
    gap: railGapPx,
    ...(edge === "bottom" ? { bottom: offsetPx } : { top: offsetPx }),
  };

  const primary: CSSProperties = {
    width: "100%",
    height: primaryThicknessPx,
    backgroundColor: colours.primary,
    marginLeft: terminalStepPx,
    flexShrink: 0,
  };

  const secondary: CSSProperties = {
    width: "100%",
    height: secondaryThicknessPx,
    backgroundColor: colours.secondary,
    marginRight: terminalStepPx,
    flexShrink: 0,
  };

  return { container, primary, secondary };
};

/** Corner L-shaped pair at top-leading — vertical + horizontal arms. */
export const getCornerSplitEdgeStyle = (
  corner: "topLeading" | "topTrailing" | "bottomLeading" | "bottomTrailing",
  colours: SplitEdgeColours,
  tokens: SplitColourEdgeTokens = DEFAULT_SPLIT_EDGE_TOKENS,
): {
  vertical: CSSProperties;
  horizontal: CSSProperties;
  verticalPrimary: CSSProperties;
  verticalSecondary: CSSProperties;
  horizontalPrimary: CSSProperties;
  horizontalSecondary: CSSProperties;
} => {
  const verticalEdge = corner.endsWith("Leading") ? "leading" : "trailing";
  const horizontalEdge = corner.startsWith("bottom") ? "bottom" : "top";
  const vertical = getVerticalSplitEdgeStyle(verticalEdge, colours, tokens);
  const horizontal = getHorizontalSplitEdgeStyle(horizontalEdge, colours, tokens);

  const armLength = 72;

  return {
    vertical: {
      ...vertical.container,
      height: armLength,
      bottom: "auto",
    },
    horizontal: {
      ...horizontal.container,
      width: armLength,
      right: corner.endsWith("Trailing") ? tokens.offsetPx : "auto",
      left: corner.endsWith("Leading") ? tokens.offsetPx : "auto",
    },
    verticalPrimary: vertical.primary,
    verticalSecondary: vertical.secondary,
    horizontalPrimary: horizontal.primary,
    horizontalSecondary: horizontal.secondary,
  };
};

export const clipPathStyle = (clipPath: string): CSSProperties => ({
  clipPath,
  WebkitClipPath: clipPath,
});
