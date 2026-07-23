import React, { CSSProperties } from "react";
import {
  ClassicPanelTextureConfig,
  ClassicPanelTextureVariant,
  getClassicPanelTextureStyles,
} from "./panelTexture";

export interface ClassicPanelTextureOverlayProps {
  enabled?: boolean;
  variant?: ClassicPanelTextureVariant;
  opacity?: number;
  blendMode?: CSSProperties["mixBlendMode"];
  className?: string;
  style?: CSSProperties;
}

/**
 * Fibre/paper surface overlay for Classic content planes.
 * Parent must be `position: relative` with `isolation: isolate` recommended.
 *
 * Only defined props are forwarded — omitting props keeps texture defaults
 * (passing `enabled={undefined}` must not disable the overlay).
 */
export const ClassicPanelTextureOverlay: React.FC<
  ClassicPanelTextureOverlayProps
> = ({ enabled, variant, opacity, blendMode, className = "", style }) => {
  const overrides: Partial<ClassicPanelTextureConfig> = {};
  if (enabled !== undefined) overrides.enabled = enabled;
  if (variant !== undefined) overrides.variant = variant;
  if (opacity !== undefined) overrides.opacity = opacity;
  if (blendMode !== undefined) overrides.blendMode = blendMode;

  const textureStyles = getClassicPanelTextureStyles(overrides);
  if (!textureStyles) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[1] ${className}`}
      aria-hidden
      style={{
        ...textureStyles,
        ...style,
      }}
    />
  );
};
