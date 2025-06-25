import React from "react";
import { Series, AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../core/context/VideoDataContext";
import { useLayoutContext } from "../../core/context/LayoutContext";
interface BaseTemplateLayoutProps {
  introComponent?: React.FC;
  outroComponent?: React.FC<{ doesAccountHaveSponsors: boolean }>;
  backgroundComponent: React.FC;
  customAudioComponent: React.FC;
  mainComponentLayout?: React.FC;
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
  mainComponentLayout: MainComponentLayout,
}) => {
  // Access context data
  const { data } = useVideoDataContext();
  const { doesAccountHaveSponsors } = useLayoutContext();
  const { timings } = data;

  // No need for a loading screen as we're using delayRender/continueRender in FontContext
  // Remotion will automatically wait for fonts to load before rendering

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ zIndex: 1000 }}>
        <Series>
          {/* Intro Sequence */}
          <Series.Sequence durationInFrames={timings.FPS_INTRO ?? 30}>
            {IntroComponent && <IntroComponent />}
          </Series.Sequence>

          {/* Main Content - Use routing to determine which composition to render
              or use the provided mainComponent if available */}
          <Series.Sequence durationInFrames={timings.FPS_MAIN ?? 30}>
            {MainComponentLayout && <MainComponentLayout />}
          </Series.Sequence>

          {/* Outro Sequence */}
          <Series.Sequence
            durationInFrames={
              doesAccountHaveSponsors ? (timings.FPS_OUTRO ?? 30) : 30
            }
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
