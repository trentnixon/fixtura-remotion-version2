import React from "react";
import { AbsoluteFill, Solid, useCurrentFrame, useVideoConfig } from "remotion";
import { glow } from "@remotion/effects/glow";
import { linearGradient } from "@remotion/effects/linear-gradient";
import { vignette } from "@remotion/effects/vignette";
import { useThemeContext } from "../../../../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../../../../core/context/VideoDataContext";
import { ReactivePathOverlay } from "./ReactivePathOverlay";
import {
  buildReactivePathVariantSeed,
  resolveReactivePathVariantKey,
} from "./resolveVariantIndex";
import {
  getReactivePathLoopProgress,
  REACTIVE_PATH_GLOW,
  REACTIVE_PATH_GRADIENT,
  REACTIVE_PATH_VARIANTS,
  REACTIVE_PATH_VIGNETTE,
} from "./variants";

export const ReactivePathBackground: React.FC = () => {
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

  const variantKey = resolveReactivePathVariantKey(
    buildReactivePathVariantSeed({
      compositionId: video.metadata.compositionId,
      primary: video.appearance.theme.primary,
      secondary: video.appearance.theme.secondary,
    }),
  );
  const variant = REACTIVE_PATH_VARIANTS[variantKey];
  const loopProgress = getReactivePathLoopProgress(frame, fps);

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
            start: [...REACTIVE_PATH_GRADIENT.start],
            end: [...REACTIVE_PATH_GRADIENT.end],
            startColor: palette.main,
            endColor: palette.accent,
          }),
          glow({
            radius: variant.glowRadius,
            intensity: variant.glowIntensity,
            threshold: REACTIVE_PATH_GLOW.threshold,
            color: palette.accent,
          }),
          vignette({
            amount: REACTIVE_PATH_VIGNETTE.amount,
            radius: REACTIVE_PATH_VIGNETTE.radius,
            feather: REACTIVE_PATH_VIGNETTE.feather,
            color: palette.main,
          }),
        ]}
      />

      <AbsoluteFill style={{ overflow: "hidden" }}>
        <ReactivePathOverlay
          variant={variantKey}
          palette={palette}
          width={width}
          height={height}
          loopProgress={loopProgress}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
