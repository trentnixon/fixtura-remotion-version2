import React from "react";
import { AbsoluteFill, Solid, useCurrentFrame, useVideoConfig } from "remotion";
import { halftoneLinearGradient } from "@remotion/effects/halftone-linear-gradient";
import { linearGradient } from "@remotion/effects/linear-gradient";
import { vignette } from "@remotion/effects/vignette";
import { wave } from "@remotion/effects/wave";
import { useThemeContext } from "../../../../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../../../../core/context/VideoDataContext";
import { BROADCAST_HALFTONE_CONFIG, getWavePhase } from "./variants";

export const BroadcastHalftoneBackground: React.FC = () => {
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
    dot:
      selectedPalette.text.onBackground.light ??
      selectedPalette.background.light ??
      theme?.white ??
      "#ffffff",
  };

  const phase = getWavePhase(frame, fps);
  const config = BROADCAST_HALFTONE_CONFIG;

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
            start: [...config.gradientStart],
            end: [...config.gradientEnd],
            startColor: palette.main,
            endColor: palette.accent,
          }),
          halftoneLinearGradient({
            firstStopDotSize: config.halftone.firstStopDotSize,
            secondStopDotSize: config.halftone.secondStopDotSize,
            firstStopPosition: [...config.halftone.firstStopPosition],
            secondStopPosition: [...config.halftone.secondStopPosition],
            gridSize: config.halftone.gridSize,
            dotColor: palette.dot,
          }),
          wave({
            phase,
            direction: config.wave.direction,
            amplitude: config.wave.amplitude,
            wavelength: config.wave.wavelength,
          }),
          vignette({
            amount: config.vignette.amount,
            radius: config.vignette.radius,
            feather: config.vignette.feather,
            color: palette.main,
          }),
        ]}
      />
    </AbsoluteFill>
  );
};
