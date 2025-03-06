import React from "react";
import { Series, AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../core/context/VideoDataContext";
import { useLayoutContext } from "../../core/context/LayoutContext";
import { routeToComposition } from "../../core/utils/routing";

interface BaseTemplateLayoutProps {
  introComponent?: React.FC;
  outroComponent?: React.FC<{ doesAccountHaveSponsors: boolean }>;
  backgroundComponent: React.FC;
  customAudioComponent: React.FC;
  mainComponent?: React.FC;
}

/**
 * BaseTemplateLayout component
 * Handles the actual layout and sequencing of the template
 */
export const BaseTemplateLayout: React.FC<BaseTemplateLayoutProps> = ({
  introComponent: IntroComponent,
  outroComponent: OutroComponent,
  backgroundComponent: BackgroundComponent,
  customAudioComponent: CustomAudioComponent,
}) => {
  // Access context data
  const { DATA } = useVideoDataContext();
  const { doesAccountHaveSponsors } = useLayoutContext();
  const { TIMINGS } = DATA;

  // No need for a loading screen as we're using delayRender/continueRender in FontContext
  // Remotion will automatically wait for fonts to load before rendering

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ zIndex: 1000 }}>
        <Series>
          {/* Intro Sequence */}
          <Series.Sequence durationInFrames={TIMINGS.FPS_INTRO}>
            {IntroComponent && <IntroComponent />}
          </Series.Sequence>

          {/* Main Content - Use routing to determine which composition to render
              or use the provided mainComponent if available */}
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
