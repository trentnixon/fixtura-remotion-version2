import React from "react";
import { AbsoluteFill, Solid, useCurrentFrame, useVideoConfig } from "remotion";
import { lightLeak } from "@remotion/light-leaks";
import { linearGradient } from "@remotion/effects/linear-gradient";
import { vignette } from "@remotion/effects/vignette";
import { useThemeContext } from "../../../../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../../../../core/context/VideoDataContext";
import { colorToHue } from "./hexToHue";
import {
  buildLightLeakVariantSeed,
  resolveLightLeakVariantKey,
} from "./resolveVariantIndex";
import {
  getLeakProgress,
  LIGHT_LEAK_VARIANTS,
  LOOP_DURATION_IN_SECONDS,
  resolveHueShift,
} from "./variants";

export const LightLeakBackground: React.FC = () => {
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

  const variantKey = resolveLightLeakVariantKey(
    buildLightLeakVariantSeed({
      compositionId: video.metadata.compositionId,
      primary: video.appearance.theme.primary,
      secondary: video.appearance.theme.secondary,
    }),
  );
  const variant = LIGHT_LEAK_VARIANTS[variantKey];

  const loopFrames = fps * LOOP_DURATION_IN_SECONDS;
  const loopProgress = (frame % loopFrames) / loopFrames;

  const leakEffects = variant.leaks.map((layer) =>
    lightLeak({
      seed: layer.seed,
      hueShift: resolveHueShift(layer.hueRole, palette, colorToHue),
      progress: getLeakProgress(
        loopProgress,
        layer.phaseOffset,
        variant.progressCycles,
      ),
    }),
  );

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
            start: [...variant.gradientStart],
            end: [...variant.gradientEnd],
            startColor: palette.main,
            endColor: palette.accent,
          }),
          ...leakEffects,
          vignette({
            amount: variant.vignetteAmount,
            radius: variant.vignetteRadius,
            feather: 0.44,
            color: palette.main,
          }),
        ]}
      />
    </AbsoluteFill>
  );
};
