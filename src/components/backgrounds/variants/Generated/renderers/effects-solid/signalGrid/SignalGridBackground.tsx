import React from "react";
import { AbsoluteFill, Solid, useCurrentFrame, useVideoConfig } from "remotion";
import { gridlines } from "@remotion/effects/gridlines";
import { linearGradient } from "@remotion/effects/linear-gradient";
import { scanlines } from "@remotion/effects/scanlines";
import { vignette } from "@remotion/effects/vignette";
import { useThemeContext } from "../../../../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../../../../core/context/VideoDataContext";
import {
  buildSignalGridVariantSeed,
  resolveSignalGridVariantKey,
} from "./resolveVariantIndex";
import {
  getGridOffsetY,
  getScanlineOffset,
  getSignalGridLoopProgress,
  SIGNAL_GRID_VARIANTS,
  SIGNAL_GRID_VIGNETTE,
} from "./variants";

export const SignalGridBackground: React.FC = () => {
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

  const variantKey = resolveSignalGridVariantKey(
    buildSignalGridVariantSeed({
      compositionId: video.metadata.compositionId,
      primary: video.appearance.theme.primary,
      secondary: video.appearance.theme.secondary,
    }),
  );
  const variant = SIGNAL_GRID_VARIANTS[variantKey];
  const loopProgress = getSignalGridLoopProgress(frame, fps);
  const gridOffsetY = getGridOffsetY(loopProgress, variant.gridSize);
  const scanlineOffset = getScanlineOffset(loopProgress);

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
            start: [0, 0],
            end: [1, 1],
            startColor: palette.main,
            endColor: palette.accent,
          }),
          gridlines({
            gridSize: variant.gridSize,
            lineWidth: variant.lineWidth,
            lineColor: palette.line,
            backgroundColor: "transparent",
            rotation: variant.rotation,
            rotationX: variant.rotationX,
            rotationY: variant.rotationY,
            perspective: variant.perspective,
            offsetX: 0,
            offsetY: gridOffsetY,
          }),
          scanlines({
            amount: variant.scanAmount,
            spacing: variant.scanSpacing,
            thickness: 1,
            offset: scanlineOffset,
          }),
          vignette({
            amount: SIGNAL_GRID_VIGNETTE.amount,
            radius: SIGNAL_GRID_VIGNETTE.radius,
            feather: SIGNAL_GRID_VIGNETTE.feather,
            color: palette.main,
          }),
        ]}
      />
    </AbsoluteFill>
  );
};
