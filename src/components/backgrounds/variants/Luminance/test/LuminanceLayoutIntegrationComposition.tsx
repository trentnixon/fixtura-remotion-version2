import React from "react";
import { AbsoluteFill } from "remotion";
import { BaseTemplateLayout } from "../../../../../templates/base/BaseTemplateLayout";
import { CONTENT_Z_INDEX } from "../../../../../templates/base/_utils/constants";
import { GlobalProvider } from "../../../../../core/context/GlobalContext";
import { VideoDataProvider } from "../../../../../core/context/VideoDataContext";
import { ThemeProvider } from "../../../../../core/context/ThemeContext";
import { LayoutProvider } from "../../../../../core/context/LayoutContext";
import { FontProvider } from "../../../../../core/context/FontContext";
import { StyleProvider } from "../../../../../core/context/StyleContext";
import { AnimationProvider } from "../../../../../core/context/AnimationContext";
import { SelectTemplateBackground } from "../../..";
import { basicTheme } from "../../../../../templates/variants/basic/theme";
import { createLuminanceTestDataset } from "./createLuminanceTestDataset";

const PlaceholderMain: React.FC = () => (
  <AbsoluteFill
    data-testid="luminance-layout-content"
    style={{
      zIndex: CONTENT_Z_INDEX,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      fontSize: 48,
      fontFamily: "sans-serif",
    }}
  >
    Content
  </AbsoluteFill>
);

const EmptyIntro: React.FC = () => null;
const EmptyOutro: React.FC = () => null;
const EmptyAudio: React.FC = () => null;

export const LuminanceLayoutIntegrationComposition: React.FC = () => {
  const data = createLuminanceTestDataset({
    useBackground: "Luminance",
    luminance: {
      name: "Test 001",
      url: null,
      asset: "_verify/test001.png",
      map: { kind: "theme", preset: "brand" },
      protection: "bottom-weighted",
      position: "center",
      size: "cover",
    },
  });

  return (
    <GlobalProvider settings={basicTheme} data={data}>
      <VideoDataProvider>
        <ThemeProvider>
          <StyleProvider>
            <FontProvider>
              <LayoutProvider>
                <AnimationProvider animations={{}}>
                  <BaseTemplateLayout
                    introComponent={EmptyIntro}
                    outroComponent={EmptyOutro}
                    backgroundComponent={SelectTemplateBackground}
                    customAudioComponent={EmptyAudio}
                    mainComponentLayout={PlaceholderMain}
                  />
                </AnimationProvider>
              </LayoutProvider>
            </FontProvider>
          </StyleProvider>
        </ThemeProvider>
      </VideoDataProvider>
    </GlobalProvider>
  );
};
