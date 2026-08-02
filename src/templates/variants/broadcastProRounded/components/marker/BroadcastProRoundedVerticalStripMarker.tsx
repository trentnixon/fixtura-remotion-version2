import React from "react";
import tinycolor from "tinycolor2";
import type { CSSProperties } from "react";

export interface BroadcastProRoundedVerticalStripMarkerProps {
  accentColor: string;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean;
}

/** Vertical primary gradient strip — roster list edge, sidebar accents. */
export const BroadcastProRoundedVerticalStripMarker: React.FC<
  BroadcastProRoundedVerticalStripMarkerProps
> = ({
  accentColor,
  className = "",
  style,
  "aria-hidden": ariaHidden = true,
}) => (
  <div
    className={className.trim() || undefined}
    style={{
      background: `linear-gradient(180deg, ${tinycolor(accentColor).setAlpha(0.95).toRgbString()} 0%, ${tinycolor(accentColor).setAlpha(0.35).toRgbString()} 50%, ${tinycolor(accentColor).setAlpha(0.15).toRgbString()} 100%)`,
      ...style,
    }}
    aria-hidden={ariaHidden}
  />
);
