import React, { type CSSProperties } from "react";
import { cellBlur } from "../../../../../compositions/cricket/utils/broadcastPro/glass";
import type { BroadcastProGlassStyle } from "../../../../../compositions/cricket/utils/broadcastPro/glass";
import { resolveBroadcastProEdgeMarkerStyle } from "../../../../types/broadcast-pro/marker-notch";

export interface BroadcastProFixtureFrameProps {
  children: React.ReactNode;
  accentColor: string;
  glass: BroadcastProGlassStyle;
  className?: string;
  style?: CSSProperties;
}

export const BroadcastProFixtureFrame: React.FC<
  BroadcastProFixtureFrameProps
> = ({ children, accentColor, glass, className = "", style }) => (
  <div
    className={`relative flex min-h-0 w-full flex-col overflow-hidden rounded-[2px] ${className}`.trim()}
    style={{
      background: glass.panel,
      border: glass.border,
      ...resolveBroadcastProEdgeMarkerStyle("compact", "primary", {
        accentColor,
        mutedColor: accentColor,
      }),
      ...cellBlur,
      ...style,
    }}
  >
    {children}
  </div>
);
