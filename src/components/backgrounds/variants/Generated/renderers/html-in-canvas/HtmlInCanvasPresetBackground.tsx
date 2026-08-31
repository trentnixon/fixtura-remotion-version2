import React from "react";
import { AbsoluteFill, HtmlInCanvas, useVideoConfig } from "remotion";
import { blur } from "@remotion/effects/blur";
import { chromaticAberration } from "@remotion/effects/chromatic-aberration";
import { glow } from "@remotion/effects/glow";
import { vignette } from "@remotion/effects/vignette";
import { useThemeContext } from "../../../../../../core/context/ThemeContext";
import { useVideoDataContext } from "../../../../../../core/context/VideoDataContext";
import { HTML_IN_CANVAS_GRAPHICS } from "./graphics";
import { HTML_IN_CANVAS_PRESETS } from "./presets";
import type { HtmlInCanvasPalette, HtmlInCanvasPresetId } from "./types";

type HtmlInCanvasPresetBackgroundProps = {
  presetId: HtmlInCanvasPresetId;
};

const DomStudioFallback: React.FC<{
  palette: HtmlInCanvasPalette;
  settings: (typeof HTML_IN_CANVAS_PRESETS)[HtmlInCanvasPresetId];
  Graphic: React.FC<{ palette: HtmlInCanvasPalette }>;
}> = ({ palette, settings, Graphic }) => (
  <>
    <AbsoluteFill
      style={{
        filter:
          settings.blurRadius > 0
            ? `blur(${settings.blurRadius}px) saturate(1.08)`
            : undefined,
      }}
    >
      <Graphic palette={palette} />
    </AbsoluteFill>
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 42%, transparent 0%, ${palette.main}00 42%, ${palette.main}cc 100%)`,
        pointerEvents: "none",
      }}
    />
  </>
);

export const HtmlInCanvasPresetBackground: React.FC<
  HtmlInCanvasPresetBackgroundProps
> = ({ presetId }) => {
  const { width, height } = useVideoConfig();
  const { selectedPalette } = useThemeContext();
  const { video } = useVideoDataContext();
  const settings = HTML_IN_CANVAS_PRESETS[presetId];
  const Graphic = HTML_IN_CANVAS_GRAPHICS[settings.graphicId];
  const supported = HtmlInCanvas.isSupported();

  const theme = video.appearance?.theme;
  const palette: HtmlInCanvasPalette = {
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

  const canvasEffects = [
    ...(settings.blurRadius > 0
      ? [blur({ radius: settings.blurRadius })]
      : []),
    glow({
      radius: settings.glowRadius,
      intensity: settings.glowIntensity,
      threshold: settings.glowThreshold,
      color: palette.accent,
    }),
    ...(settings.chromaticAmount > 0
      ? [chromaticAberration({ amount: settings.chromaticAmount })]
      : []),
    vignette({
      amount: settings.vignetteAmount,
      radius: 0.58,
      feather: 0.46,
      color: palette.main,
    }),
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.main,
        zIndex: -1,
      }}
    >
      {supported ? (
        <HtmlInCanvas
          width={width}
          height={height}
          effects={canvasEffects}
          style={{ width, height }}
        >
          <Graphic palette={palette} />
        </HtmlInCanvas>
      ) : (
        <DomStudioFallback
          palette={palette}
          settings={settings}
          Graphic={Graphic}
        />
      )}
    </AbsoluteFill>
  );
};
