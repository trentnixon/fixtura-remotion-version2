import React from "react";
import { AbsoluteFill, Solid, useCurrentFrame, useVideoConfig } from "remotion";
import { glow } from "@remotion/effects/glow";
import { liquidContours } from "@remotion/effects/liquid-contours";
import { vignette } from "@remotion/effects/vignette";
import { useThemeContext } from "../../../../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../../../../core/context/VideoDataContext";
import {
  buildTopographicFlowVariantSeed,
  resolveTopographicFlowVariantKey,
} from "./resolveVariantIndex";
import {
  getContourPhase,
  TOPOGRAPHIC_FLOW_VARIANTS,
  TOPOGRAPHIC_FLOW_VIGNETTE,
} from "./variants";

export const TopographicFlowBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const { selectedPalette } = useThemeContext();
  const { video } = useVideoDataContext();

  const theme = video.appearance?.theme;
  const palette = {
    main:
      selectedPalette.background.main ??
      theme?.primary ??
      selectedPalette.background.userPrimary ??
      "#111111",
    accent:
      selectedPalette.background.accent ??
      theme?.secondary ??
      selectedPalette.background.userSecondary ??
      "#ffffff",
  };

  const variantKey = resolveTopographicFlowVariantKey(
    buildTopographicFlowVariantSeed({
      compositionId: video.metadata.compositionId,
      primary: video.appearance.theme.primary,
      secondary: video.appearance.theme.secondary,
    }),
  );
  const variant = TOPOGRAPHIC_FLOW_VARIANTS[variantKey];
  const phase = getContourPhase(frame, fps);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.main,
        zIndex: -1,
      }}
    >
      <Solid
        width={width}
        height={height}
        color={palette.main}
        effects={[
          liquidContours({
            firstColor: palette.accent,
            secondColor: palette.main,
            spacing: variant.spacing,
            scale: variant.scale,
            complexity: variant.complexity,
            smoothness: variant.smoothness,
            seed: variant.contourSeed,
            phase,
          }),
          glow({
            radius: variant.glowRadius,
            intensity: variant.glowIntensity,
            threshold: variant.glowThreshold,
            color: palette.accent,
          }),
          vignette({
            amount: TOPOGRAPHIC_FLOW_VIGNETTE.amount,
            radius: TOPOGRAPHIC_FLOW_VIGNETTE.radius,
            feather: TOPOGRAPHIC_FLOW_VIGNETTE.feather,
            color: palette.main,
          }),
        ]}
      />
    </AbsoluteFill>
  );
};
