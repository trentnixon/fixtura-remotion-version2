import React from "react";
import { Series, AbsoluteFill } from "remotion";

// Import contexts
import { GlobalProvider } from "../../core/context/GlobalContext";
import {
  useVideoDataContext,
  VideoDataProvider,
} from "../../core/context/VideoDataContext";
import { StyleProvider } from "../../core/context/StyleContext";
import {
  LayoutProvider,
  useLayoutContext,
} from "../../core/context/LayoutContext";

// Import routing
import { routeToComposition } from "../../core/utils/routing";

// Import base template components
import { BaseAudioTrack } from "./components/BaseAudioTrack";
import { BaseBackground } from "./components/BaseBackground";

interface BaseTemplateProps {
  DATA: any;
  settings: any;
  introComponent?: React.FC;
  outroComponent?: React.FC<{ doesAccountHaveSponsors: boolean }>;
  backgroundComponent?: React.FC;
  customAudioComponent?: React.FC;
}

export const BaseTemplate: React.FC<BaseTemplateProps> = ({
  DATA,
  settings,
  introComponent: IntroComponent,
  outroComponent: OutroComponent,
  backgroundComponent: BackgroundComponent = BaseBackground,
  customAudioComponent: CustomAudioComponent = BaseAudioTrack,
}) => {
  return (
    <GlobalProvider settings={settings} DATA={DATA}>
      <VideoDataProvider>
        <StyleProvider>
          <LayoutProvider>
            <BaseTemplateLayout
              introComponent={IntroComponent}
              outroComponent={OutroComponent}
              backgroundComponent={BackgroundComponent}
              customAudioComponent={CustomAudioComponent}
            />
          </LayoutProvider>
        </StyleProvider>
      </VideoDataProvider>
    </GlobalProvider>
  );
};

interface BaseTemplateLayoutProps {
  introComponent?: React.FC;
  outroComponent?: React.FC<{ doesAccountHaveSponsors: boolean }>;
  backgroundComponent: React.FC;
  customAudioComponent: React.FC;
}

const BaseTemplateLayout: React.FC<BaseTemplateLayoutProps> = ({
  introComponent: IntroComponent,
  outroComponent: OutroComponent,
  backgroundComponent: BackgroundComponent,
  customAudioComponent: CustomAudioComponent,
}) => {
  // Access context data
  const { DATA } = useVideoDataContext();
  const { doesAccountHaveSponsors } = useLayoutContext();
  const { TIMINGS } = DATA;

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ zIndex: 1000 }}>
        <Series>
          {/* Intro Sequence */}
          <Series.Sequence durationInFrames={TIMINGS.FPS_INTRO}>
            {IntroComponent && <IntroComponent />}
          </Series.Sequence>

          {/* Main Content - Use routing to determine which composition to render */}
          <Series.Sequence durationInFrames={TIMINGS.FPS_MAIN}>
            {routeToComposition(DATA)}
          </Series.Sequence>

          {/* Outro Sequence */}
          <Series.Sequence
            durationInFrames={doesAccountHaveSponsors ? TIMINGS.FPS_OUTRO : 30}
          >
            {OutroComponent && (
              <OutroComponent
                doesAccountHaveSponsors={doesAccountHaveSponsors}
              />
            )}
          </Series.Sequence>
        </Series>
      </AbsoluteFill>

      {/* Background */}
      <BackgroundComponent />

      {/* Audio */}
      <CustomAudioComponent />
    </AbsoluteFill>
  );
};
