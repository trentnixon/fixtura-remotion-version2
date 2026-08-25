import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import {
  cellBlur,
  getBroadcastProGlassSurface,
  resolveBroadcastProGlass,
} from "../glass";
import type {
  BroadcastProGlassStyle,
  BroadcastProGlassSurfaceRole,
  BroadcastProSurfaceConnection,
} from "../glass";

export interface BroadcastProGlassPanelProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glass?: BroadcastProGlassStyle;
  /** Semantic surface tier; defaults to primary panel glass. */
  surface?: Exclude<BroadcastProGlassSurfaceRole, "logoWell">;
  connection?: BroadcastProSurfaceConnection;
}

export const BroadcastProGlassPanel: React.FC<BroadcastProGlassPanelProps> = ({
  children,
  className = "",
  style,
  glass: glassOverride,
  surface = "panel",
  connection = "standalone",
}) => {
  const {
    selectedPalette,
    broadcastProGlassOpacity,
    broadcastProTransparentLayers,
  } = useThemeContext();

  const glass =
    glassOverride ??
    resolveBroadcastProGlass({
      surfaceBase: selectedPalette.container.background,
      broadcastProGlassOpacity,
      broadcastProTransparentLayers,
    });

  return (
    <div
      className={`rounded-none ${className}`.trim()}
      style={{
        background: getBroadcastProGlassSurface(glass, surface),
        border: connection === "standalone" ? glass.border : undefined,
        ...cellBlur,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
