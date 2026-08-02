import React from "react";
import type { CSSProperties } from "react";
import {
  resolveBroadcastProRoundedEdgeMarkerStyle,
  type BroadcastProRoundedEdgeMarkerTier,
  type BroadcastProRoundedEdgeMarkerVariant,
} from "../../../../../templates/types/broadcast-pro-rounded/marker-notch";

export interface BroadcastProRoundedEdgeMarkerProps {
  tier?: BroadcastProRoundedEdgeMarkerTier;
  variant?: BroadcastProRoundedEdgeMarkerVariant;
  accentColor: string;
  mutedColor: string;
  secondaryColor?: string;
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}

/** Left-edge accent bar wrapper — ladder rank, verdict, score badge, fixture header. */
export const BroadcastProRoundedEdgeMarker: React.FC<
  BroadcastProRoundedEdgeMarkerProps
> = ({
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
      ...resolveBroadcastProRoundedEdgeMarkerStyle(tier, variant, {
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
