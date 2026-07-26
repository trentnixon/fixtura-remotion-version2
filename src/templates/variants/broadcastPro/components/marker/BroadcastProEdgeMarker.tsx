import React from "react";
import type { CSSProperties } from "react";
import {
  resolveBroadcastProEdgeMarkerStyle,
  type BroadcastProEdgeMarkerTier,
  type BroadcastProEdgeMarkerVariant,
} from "../../../../../templates/types/broadcast-pro/marker-notch";

export interface BroadcastProEdgeMarkerProps {
  tier?: BroadcastProEdgeMarkerTier;
  variant?: BroadcastProEdgeMarkerVariant;
  accentColor: string;
  mutedColor: string;
  secondaryColor?: string;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}

/** Left-edge accent bar wrapper — ladder rank, verdict, score badge, fixture header. */
export const BroadcastProEdgeMarker: React.FC<BroadcastProEdgeMarkerProps> = ({
  tier = "standard",
  variant = "primary",
  accentColor,
  mutedColor,
  secondaryColor,
  className = "",
  style,
  children,
}) => (
  <div
    className={className.trim() || undefined}
    style={{
      ...resolveBroadcastProEdgeMarkerStyle(tier, variant, {
        accentColor,
        mutedColor,
        secondaryColor,
      }),
      ...style,
    }}
  >
    {children}
  </div>
);
