import type { CSSProperties } from "react";

/** Left-edge accent bar width tier (stitch: 8px decisive, 4px fixture metadata). */
export type BroadcastProEdgeMarkerTier = "standard" | "compact";

/** Semantic colour role for edge markers. */
export type BroadcastProEdgeMarkerVariant = "primary" | "muted" | "secondary";

/** Marker chip / label surfaces (qualification copy, rank badges). */
export type BroadcastProMarkerChipTier = "qualification" | "rank";

/** Horizontal zone-boundary notch between ladder finals and mid tiers. */
export type BroadcastProZoneNotchTier = "finalsCutoff";

export const BROADCAST_PRO_EDGE_MARKER_WIDTH_PX: Record<
  BroadcastProEdgeMarkerTier,
  number
> = {
  standard: 8,
  compact: 4,
};

export const BROADCAST_PRO_MARKER_CHIP_THEME_KEY: Record<
  BroadcastProMarkerChipTier,
  string
> = {
  qualification: "broadcastProMarkerChipQualification",
  rank: "broadcastProMarkerChipRank",
};

export const BROADCAST_PRO_ZONE_NOTCH_THEME_KEY: Record<
  BroadcastProZoneNotchTier,
  string
> = {
  finalsCutoff: "broadcastProMarkerZoneNotchFinals",
};

export interface BroadcastProEdgeMarkerColors {
  accentColor: string;
  mutedColor: string;
  secondaryColor?: string;
}

/** Left-border style for edge markers — use on panels, rank cells, verdict bands. */
export const resolveBroadcastProEdgeMarkerStyle = (
  tier: BroadcastProEdgeMarkerTier,
  variant: BroadcastProEdgeMarkerVariant,
  colors: BroadcastProEdgeMarkerColors,
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
export const formatBroadcastProQualificationLabel = (
  finalsCount: number,
): string => `Top ${finalsCount} Qualify for Finals`;
