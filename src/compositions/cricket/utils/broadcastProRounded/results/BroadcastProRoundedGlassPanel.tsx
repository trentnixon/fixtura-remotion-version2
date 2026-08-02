import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import {
  cellBlur,
  getBroadcastProRoundedGlassSurface,
  resolveBroadcastProRoundedGlass,
} from "../glass";
import type {
  BroadcastProRoundedGlassStyle,
  BroadcastProRoundedGlassSurfaceRole,
} from "../glass";

export interface BroadcastProRoundedGlassPanelProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  glass?: BroadcastProRoundedGlassStyle;
  /** Semantic surface tier; defaults to primary panel glass. */
  surface?: Exclude<BroadcastProRoundedGlassSurfaceRole, "logoWell">;
}

export const BroadcastProRoundedGlassPanel: React.FC<BroadcastProRoundedGlassPanelProps> = ({
  children,
  className = "",
  style,
  glass: glassOverride,
  surface = "panel",
}) => {
  const {
    selectedPalette,
    layout,
    broadcastProRoundedGlassOpacity,
    broadcastProRoundedTransparentLayers,
  } = useThemeContext();

  const glass =
    glassOverride ??
    resolveBroadcastProRoundedGlass({
      surfaceBase: selectedPalette.container.background,
      broadcastProRoundedGlassOpacity,
      broadcastProRoundedTransparentLayers,
    });

  return (
    <div
      className={`overflow-hidden ${layout.borderRadius.container} ${className}`.trim()}
      style={{
        background: getBroadcastProRoundedGlassSurface(glass, surface),
        border: glass.border,
        ...cellBlur,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
