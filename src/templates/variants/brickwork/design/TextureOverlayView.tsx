import React, { CSSProperties } from "react";
import {
  BrickworkAtmosphereConfig,
  BRICKWORK_DEFAULT_ATMOSPHERE,
  getTextureBackgroundImage,
  resolveBrickworkAtmosphere,
} from "./textureVocabulary";

export interface TextureOverlayProps {
  enabled?: boolean;
  variant?: BrickworkAtmosphereConfig["variant"];
  opacity?: number;
  blendMode?: CSSProperties["mixBlendMode"];
  className?: string;
  style?: CSSProperties;
}

/**
 * Atmosphere-layer material texture — full-area, non-interactive, deterministic tile.
 */
export const TextureOverlay: React.FC<TextureOverlayProps> = ({
  enabled = BRICKWORK_DEFAULT_ATMOSPHERE.enabled,
  variant = BRICKWORK_DEFAULT_ATMOSPHERE.variant,
  opacity = BRICKWORK_DEFAULT_ATMOSPHERE.opacity,
  blendMode = BRICKWORK_DEFAULT_ATMOSPHERE.blendMode,
  className = "",
  style,
}) => {
  const config = resolveBrickworkAtmosphere({
    enabled,
    variant,
    opacity,
    blendMode,
  });

  if (!config.enabled || config.variant === "none") {
    return null;
  }

  const backgroundImage = getTextureBackgroundImage(config.variant);
  if (!backgroundImage) {
    return null;
  }

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[1] ${className}`}
      aria-hidden
      style={{
        backgroundImage,
        backgroundRepeat: "repeat",
        opacity: config.opacity,
        mixBlendMode: config.blendMode,
        ...style,
      }}
    />
  );
};
