import React from "react";

// Import contexts
import { GlobalProvider } from "../../core/context/GlobalContext";
import { VideoDataProvider } from "../../core/context/VideoDataContext";
import { ThemeProvider } from "../../core/context/ThemeContext";
import { StyleProvider } from "../../core/context/StyleContext";
import { LayoutProvider } from "../../core/context/LayoutContext";
import { FontProvider } from "../../core/context/FontContext";

// Import base template components
import { BaseAudioTrack } from "./components/BaseAudioTrack";
import { BaseBackground } from "./components/BaseBackground";
import { BaseTemplateLayout } from "./BaseTemplateLayout";

interface BaseTemplateProps {
  data: any;
  settings: any;
  introComponent?: React.FC;
  outroComponent?: React.FC<{ doesAccountHaveSponsors: boolean }>;
  backgroundComponent?: React.FC;
  customAudioComponent?: React.FC;
  mainComponentLayout?: React.FC;
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
                <BaseTemplateLayout
                  introComponent={introComponent}
                  outroComponent={outroComponent}
                  backgroundComponent={backgroundComponent}
                  customAudioComponent={customAudioComponent}
                  mainComponentLayout={mainComponentLayout}
                />
              </LayoutProvider>
            </FontProvider>
          </StyleProvider>
        </ThemeProvider>
      </VideoDataProvider>
    </GlobalProvider>
  );
};
