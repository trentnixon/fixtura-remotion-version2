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
} from "../glass";

export interface BroadcastProGlassPanelProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glass?: BroadcastProGlassStyle;
  /** Semantic surface tier; defaults to primary panel glass. */
  surface?: Exclude<BroadcastProGlassSurfaceRole, "logoWell">;
}

export const BroadcastProGlassPanel: React.FC<BroadcastProGlassPanelProps> = ({
  children,
  className = "",
  style,
  glass: glassOverride,
  surface = "panel",
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
        border: glass.border,
        ...cellBlur,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
