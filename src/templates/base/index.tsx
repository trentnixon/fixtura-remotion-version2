import React from "react";

// Import contexts
import { GlobalProvider } from "../../core/context/GlobalContext";
import { VideoDataProvider } from "../../core/context/VideoDataContext";
import { ThemeProvider } from "../../core/context/ThemeContext";
import { StyleProvider } from "../../core/context/StyleContext";
import { LayoutProvider } from "../../core/context/LayoutContext";
import { FontProvider } from "../../core/context/FontContext";
import { FixturaDataset } from "../../core/types/data";

// Import base template components
import { BaseAudioTrack } from "./components/BaseAudioTrack";
import { BaseBackground } from "./components/BaseBackground";
import { BaseTemplateLayout } from "./BaseTemplateLayout";
import { AnimationProvider } from "../../core/context/AnimationContext";
import { UIConfig } from "../types/settingsConfig";
import { AnimationConfig } from "../types/AnimationConfig ";

interface BaseTemplateProps {
  data: FixturaDataset;
  settings: UIConfig;
  introComponent?: React.FC;
  outroComponent?: React.FC<{ doesAccountHaveSponsors: boolean }>;
  backgroundComponent?: React.FC;
  customAudioComponent?: React.FC;
  mainComponentLayout?: React.FC;
  animations: AnimationConfig;
}

/**
 * BaseTemplate component
 * Provides the context providers and layout structure for all templates
 */
export const BaseTemplate: React.FC<BaseTemplateProps> = ({
  data,
  settings,
  introComponent,
  outroComponent,
  animations,
  backgroundComponent = BaseBackground,
  customAudioComponent = BaseAudioTrack,
  mainComponentLayout,
}) => {
  return (
    <GlobalProvider settings={settings} data={data}>
      <VideoDataProvider>
        <ThemeProvider>
          <StyleProvider>
            <FontProvider>
              <LayoutProvider>
                <AnimationProvider animations={animations}>
                  <BaseTemplateLayout
                    introComponent={introComponent}
                    outroComponent={outroComponent}
                    backgroundComponent={backgroundComponent}
                    customAudioComponent={customAudioComponent}
                    mainComponentLayout={mainComponentLayout}
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
