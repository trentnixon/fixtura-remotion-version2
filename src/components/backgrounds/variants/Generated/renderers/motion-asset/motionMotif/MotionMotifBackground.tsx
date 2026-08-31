import React from "react";
import { AbsoluteFill, Solid, useCurrentFrame, useVideoConfig } from "remotion";
import { glow } from "@remotion/effects/glow";
import { linearGradient } from "@remotion/effects/linear-gradient";
import { vignette } from "@remotion/effects/vignette";
import { useThemeContext } from "../../../../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../../../../core/context/VideoDataContext";
import { MotionMotifOverlay } from "./MotionMotifOverlay";
import {
  buildMotionMotifVariantSeed,
  resolveMotionMotifVariantKey,
} from "./resolveVariantIndex";
import {
  getMotionMotifGlowIntensity,
  getMotionMotifLoopProgress,
  MOTION_MOTIF_GLOW,
  MOTION_MOTIF_GRADIENT,
  MOTION_MOTIF_VIGNETTE,
} from "./variants";

export const MotionMotifBackground: React.FC = () => {
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
    line:
      selectedPalette.text.onBackground.light ??
      selectedPalette.background.light ??
      theme?.white ??
      "#ffffff",
  };

  const variantKey = resolveMotionMotifVariantKey(
    buildMotionMotifVariantSeed({
      compositionId: video.metadata.compositionId,
      primary: video.appearance.theme.primary,
      secondary: video.appearance.theme.secondary,
    }),
  );
  const loopProgress = getMotionMotifLoopProgress(frame, fps);

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
          linearGradient({
            start: [...MOTION_MOTIF_GRADIENT.start],
            end: [...MOTION_MOTIF_GRADIENT.end],
            startColor: palette.main,
            endColor: palette.accent,
          }),
          glow({
            radius: MOTION_MOTIF_GLOW.radius,
            intensity: getMotionMotifGlowIntensity(loopProgress),
            threshold: MOTION_MOTIF_GLOW.threshold,
            color: palette.accent,
          }),
          vignette({
            amount: MOTION_MOTIF_VIGNETTE.amount,
            radius: MOTION_MOTIF_VIGNETTE.radius,
            feather: MOTION_MOTIF_VIGNETTE.feather,
            color: palette.main,
          }),
        ]}
      />

      <MotionMotifOverlay
        variant={variantKey}
        palette={{ accent: palette.accent, line: palette.line }}
        width={width}
        height={height}
      />
    </AbsoluteFill>
  );
};
