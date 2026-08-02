import type { CSSProperties } from "react";

/** Left-edge accent bar width tier (stitch: 8px decisive, 4px fixture metadata). */
export type BroadcastProRoundedEdgeMarkerTier = "standard" | "compact";

/** Semantic colour role for edge markers. */
export type BroadcastProRoundedEdgeMarkerVariant =
  | "primary"
  | "muted"
  | "secondary";

/** Marker chip / label surfaces (qualification copy, rank badges). */
export type BroadcastProRoundedMarkerChipTier = "qualification" | "rank";

/** Horizontal zone-boundary notch between ladder finals and mid tiers. */
export type BroadcastProRoundedZoneNotchTier = "finalsCutoff";

export const BROADCAST_PRO_EDGE_MARKER_WIDTH_PX: Record<
  BroadcastProRoundedEdgeMarkerTier,
  number
> = {
  standard: 8,
  compact: 4,
};

export const BROADCAST_PRO_MARKER_CHIP_THEME_KEY: Record<
  BroadcastProRoundedMarkerChipTier,
  string
> = {
  qualification: "broadcastProRoundedMarkerChipQualification",
  rank: "broadcastProRoundedMarkerChipRank",
};

export const BROADCAST_PRO_ZONE_NOTCH_THEME_KEY: Record<
  BroadcastProRoundedZoneNotchTier,
  string
> = {
  finalsCutoff: "broadcastProRoundedMarkerZoneNotchFinals",
};

export interface BroadcastProRoundedEdgeMarkerColors {
  accentColor: string;
  mutedColor: string;
  secondaryColor?: string;
}

/** Left-border style for edge markers — use on panels, rank cells, verdict bands. */
export const resolveBroadcastProRoundedEdgeMarkerStyle = (
  tier: BroadcastProRoundedEdgeMarkerTier,
  variant: BroadcastProRoundedEdgeMarkerVariant,
  colors: BroadcastProRoundedEdgeMarkerColors,
): CSSProperties => {
  const width = BROADCAST_PRO_EDGE_MARKER_WIDTH_PX[tier];
  const color =
    variant === "primary"
      ? colors.accentColor
      : variant === "secondary" && colors.secondaryColor
        ? colors.secondaryColor
        : colors.mutedColor;

  return {
    borderLeftWidth: width,
    borderLeftStyle: "solid",
    borderLeftColor: color,
  };
};

/** Stitch qualification chip copy. */
export const formatBroadcastProRoundedQualificationLabel = (
  finalsCount: number,
): string => `Top ${finalsCount} Qualify for Finals`;
