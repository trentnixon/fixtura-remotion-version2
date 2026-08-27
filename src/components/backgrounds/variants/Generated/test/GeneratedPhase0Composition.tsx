import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { GlobalProvider } from "../../../../../core/context/GlobalContext";
import { VideoDataProvider } from "../../../../../core/context/VideoDataContext";
import { ThemeProvider } from "../../../../../core/context/ThemeContext";
import { StyleProvider } from "../../../../../core/context/StyleContext";
import { SelectTemplateBackground } from "../../..";
import { basicTheme } from "../../../../../templates/variants/basic/theme";
import { createGeneratedPhase0Dataset } from "./createGeneratedPhase0Dataset";
import { sharedFixture } from "./sharedFixture";

export type GeneratedPhase0RowId =
  | "G-geo"
  | "N-geo"
  | "G-spk"
  | "N-spk"
  | "G-gfx"
  | "N-gfx"
  | "G-mismatch"
  | "P-dots"
  | "P-lines"
  | "P-grid"
  | "P-crosshatch"
  | "P-triangles"
  | "P-chevron";

export type GeneratedPhase0Props = {
  rowId?: GeneratedPhase0RowId;
};

const ROW_TEMPLATE_VARIATION: Record<
  GeneratedPhase0RowId,
  Record<string, unknown>
> = {
  "G-geo": {
    useBackground: "Graphics",
    noise: { type: "geometric" },
    gradient: sharedFixture.gradient,
  },
  "N-geo": {
    useBackground: "Noise",
    noise: { type: "geometric" },
    gradient: sharedFixture.gradient,
  },
  "G-spk": {
    useBackground: "Graphics",
    noise: { type: "spokes" },
    gradient: sharedFixture.gradient,
  },
  "N-spk": {
    useBackground: "Noise",
    noise: { type: "spokes" },
    gradient: sharedFixture.gradient,
  },
  "G-gfx": {
    useBackground: "Graphics",
    noise: { type: "graphics" },
    gradient: sharedFixture.gradient,
  },
  "N-gfx": {
    useBackground: "Noise",
    noise: { type: "graphics" },
    gradient: sharedFixture.gradient,
  },
  "G-mismatch": {
    useBackground: "Graphics",
    noise: { type: "floatingParticles" },
    gradient: sharedFixture.gradient,
  },
  "P-dots": {
    useBackground: "Pattern",
    pattern: { type: "dots", animation: "none", scale: 0.75, opacity: 0.35 },
  },
  "P-lines": {
    useBackground: "Pattern",
    pattern: { type: "lines", animation: "none", scale: 0.75, opacity: 0.35 },
  },
  "P-grid": {
    useBackground: "Pattern",
    pattern: { type: "grid", animation: "none", scale: 0.75, opacity: 0.35 },
  },
  "P-crosshatch": {
    useBackground: "Pattern",
    pattern: {
      type: "crosshatch",
      animation: "none",
      scale: 0.75,
      opacity: 0.35,
    },
  },
  "P-triangles": {
    useBackground: "Pattern",
    pattern: {
      type: "triangles",
      animation: "none",
      scale: 0.75,
      opacity: 0.35,
    },
  },
  "P-chevron": {
    useBackground: "Pattern",
    pattern: { type: "chevron", animation: "none", scale: 0.75, opacity: 0.35 },
  },
};

const ForegroundFixture: React.FC = () => {
  const { text, logo, card } = sharedFixture.foreground;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: text.x,
          top: text.y,
          color: text.color,
          fontSize: text.fontSize,
          fontFamily: text.fontFamily,
          fontWeight: text.fontWeight,
        }}
      >
        {text.content}
      </div>
      <Img
        src={staticFile(logo.assetPath)}
        style={{
          position: "absolute",
          left: logo.x,
          top: logo.y,
          width: logo.width,
          height: logo.height,
          objectFit: "contain",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: card.x,
          top: card.y,
          width: card.width,
          height: card.height,
          background: card.background,
          borderRadius: card.borderRadius,
          padding: card.padding,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            color: card.titleColor,
            fontSize: card.titleFontSize,
            fontFamily: text.fontFamily,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          {card.title}
        </div>
        <div
          style={{
            color: card.bodyColor,
            fontSize: card.bodyFontSize,
            fontFamily: text.fontFamily,
            lineHeight: 1.4,
          }}
        >
          {card.body}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * Development-only Phase 0 audit harness.
 * Registered in DevelopmentRoot and ProductionRoot so `remotion still` (NODE_ENV=production) can resolve composition IDs. Does not change SelectTemplateBackground routing.
 */
export const GeneratedPhase0Composition: React.FC<GeneratedPhase0Props> = ({
  rowId = "G-geo",
}) => {
  const appearanceTheme = sharedFixture.palette.appearanceTheme;
  const dataset = createGeneratedPhase0Dataset({
    palette: sharedFixture.palette.id,
    mode: sharedFixture.palette.mode,
    ...ROW_TEMPLATE_VARIATION[rowId],
  });

  dataset.videoMeta.theme.theme = { ...appearanceTheme };
  dataset.videoMeta.video.appearance.theme = { ...appearanceTheme };

  return (
    <GlobalProvider settings={basicTheme} data={dataset}>
      <VideoDataProvider>
        <ThemeProvider>
          <StyleProvider>
            <AbsoluteFill>
              <SelectTemplateBackground />
              <ForegroundFixture />
            </AbsoluteFill>
          </StyleProvider>
        </ThemeProvider>
      </VideoDataProvider>
    </GlobalProvider>
  );
};
