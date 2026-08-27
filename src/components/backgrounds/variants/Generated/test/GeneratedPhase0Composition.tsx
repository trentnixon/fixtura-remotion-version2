import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { GlobalProvider } from "../../../../../core/context/GlobalContext";
import { VideoDataProvider } from "../../../../../core/context/VideoDataContext";
import { ThemeProvider } from "../../../../../core/context/ThemeContext";
import { StyleProvider } from "../../../../../core/context/StyleContext";
import { SelectTemplateBackground } from "../../..";
import { basicTheme } from "../../../../../templates/variants/basic/theme";
import { createGeneratedPhase0Dataset } from "./createGeneratedPhase0Dataset";
import {
  getRowTemplateVariation,
  sharedFixture,
  type GeneratedPhase0RowId,
} from "./phase0Fixtures";

export type { GeneratedPhase0RowId };

export type GeneratedPhase0Props = {
  rowId?: GeneratedPhase0RowId;
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
 * Rendered via `src/GeneratedPhase0Entry.tsx` or DevelopmentRoot Studio browsing.
 * Does not change ProductionRoot or SelectTemplateBackground routing.
 */
export const GeneratedPhase0Composition: React.FC<GeneratedPhase0Props> = ({
  rowId = "G-geo",
}) => {
  const appearanceTheme = sharedFixture.palette.appearanceTheme;
  const dataset = createGeneratedPhase0Dataset({
    palette: sharedFixture.palette.id,
    mode: sharedFixture.palette.mode,
    ...getRowTemplateVariation(rowId),
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
