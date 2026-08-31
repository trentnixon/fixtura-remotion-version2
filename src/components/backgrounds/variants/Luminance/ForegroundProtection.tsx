import React from "react";
import type { LuminanceProtectionPreset } from "./types";

const LAYER = {
  mappedImage: 0,
  protection: 1,
} as const;

export const LUMINANCE_LAYER_Z_INDEX = LAYER;

type Props = {
  preset: LuminanceProtectionPreset;
  scrimColor: string;
  opacity?: number;
};

export const ForegroundProtection: React.FC<Props> = ({
  preset,
  scrimColor,
  opacity = 0.45,
}) => {
  if (preset === "none") {
    return null;
  }

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: LAYER.protection,
  };

  if (preset === "uniform") {
    return (
      <div
        data-testid="luminance-foreground-protection"
        style={{
          ...baseStyle,
          backgroundColor: scrimColor,
          opacity,
        }}
      />
    );
  }

  if (preset === "bottom-weighted") {
    return (
      <div
        data-testid="luminance-foreground-protection"
        style={{
          ...baseStyle,
          background: `linear-gradient(to top, ${scrimColor} 0%, transparent 70%)`,
          opacity,
        }}
      />
    );
  }

  return (
    <div
      data-testid="luminance-foreground-protection"
      style={{
        ...baseStyle,
        background: `radial-gradient(circle at center, transparent 35%, ${scrimColor} 100%)`,
        opacity,
      }}
    />
  );
};
