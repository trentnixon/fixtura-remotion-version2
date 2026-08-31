import React from "react";
import { AbsoluteFill } from "remotion";
import { GlobalProvider } from "../../../../../core/context/GlobalContext";
import { VideoDataProvider } from "../../../../../core/context/VideoDataContext";
import { ThemeProvider } from "../../../../../core/context/ThemeContext";
import { basicTheme } from "../../../../../templates/variants/basic/theme";
import { LuminanceBackground } from "../LuminanceBackground";
import {
  getLuminanceFixturePreset,
  type LuminanceFixtureId,
} from "../fixturePresets";
import type { LuminanceRenderBackend } from "../types";
import { createLuminanceTestDataset } from "./createLuminanceTestDataset";

export type LuminanceTestProps = {
  fixtureId?: LuminanceFixtureId;
  backend?: LuminanceRenderBackend;
  /** Override supersample for comparison stills (1 | 2 | 4). */
  supersampleScale?: 1 | 2 | 4;
};

/**
 * Isolated visual fixtures still go through a data OBJ:
 * `video.templateVariation.luminance` — never hardcode Img src in the background.
 */
export const LuminanceTestComposition: React.FC<LuminanceTestProps> = ({
  fixtureId = "F01",
  backend = "svg",
  supersampleScale,
}) => {
  const preset = getLuminanceFixturePreset(fixtureId);

  const dataset = createLuminanceTestDataset({
    useBackground: "Luminance",
    luminance: {
      name: preset.name ?? preset.asset,
      asset: preset.asset,
      url: preset.url ?? null,
      map: preset.map,
      protection: preset.protection,
      contrast: preset.contrast,
      brightness: preset.brightness,
      position: preset.position,
      size: preset.size,
      opacity: preset.opacity,
      supersampleScale,
    },
  });

  return (
    <GlobalProvider settings={basicTheme} data={dataset}>
      <VideoDataProvider>
        <ThemeProvider>
          <AbsoluteFill>
            <LuminanceBackground
              backendOverride={backend}
              paletteOverride={preset.paletteOverride ?? "default"}
            />
          </AbsoluteFill>
        </ThemeProvider>
      </VideoDataProvider>
    </GlobalProvider>
  );
};
