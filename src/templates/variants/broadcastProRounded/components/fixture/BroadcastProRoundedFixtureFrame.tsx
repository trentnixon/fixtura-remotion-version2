import React, { type CSSProperties } from "react";
import { cellBlur } from "../../../../../compositions/cricket/utils/broadcastProRounded/glass";
import type { BroadcastProRoundedGlassStyle } from "../../../../../compositions/cricket/utils/broadcastProRounded/glass";
import { resolveBroadcastProRoundedEdgeMarkerStyle } from "../../../../types/broadcast-pro-rounded/marker-notch";
import { useThemeContext } from "../../../../../core/context/ThemeContext";

export interface BroadcastProRoundedFixtureFrameProps {
  children: React.ReactNode;
  accentColor: string;
  glass: BroadcastProRoundedGlassStyle;
  className?: string;
  style?: CSSProperties;
}

export const BroadcastProRoundedFixtureFrame: React.FC<
  BroadcastProRoundedFixtureFrameProps
> = ({ children, accentColor, glass, className = "", style }) => {
  const { layout } = useThemeContext();
  const frameRadius = layout.borderRadius.container;

  return (
    <div
      className={`relative flex min-h-0 w-full flex-col overflow-hidden ${frameRadius} ${className}`.trim()}
      style={{
        background: glass.panel,
        border: glass.border,
        ...resolveBroadcastProRoundedEdgeMarkerStyle("compact", "primary", {
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
};
