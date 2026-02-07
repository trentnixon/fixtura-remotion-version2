import React from "react";
import { Series, AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../core/context/VideoDataContext";
import { useLayoutContext } from "../../core/context/LayoutContext";
import { BaseTemplateLayoutProps } from "./_types/BaseTemplateLayoutProps";
import { CONTENT_Z_INDEX } from "./_utils/constants";
import {
  calculateIntroDuration,
  calculateMainDuration,
  calculateOutroDuration,
} from "./_utils/calculations";

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
      <AbsoluteFill style={{ zIndex: CONTENT_Z_INDEX }}>
        <Series>
          {/* Intro Sequence */}
          <Series.Sequence durationInFrames={calculateIntroDuration(timings)}>
            {IntroComponent && <IntroComponent />}
          </Series.Sequence>

          {/* Main Content - Use routing to determine which composition to render
              or use the provided mainComponent if available */}
          <Series.Sequence durationInFrames={calculateMainDuration(timings)}>
            {MainComponentLayout && <MainComponentLayout />}
          </Series.Sequence>

          {/* Outro Sequence */}
          <Series.Sequence
            durationInFrames={calculateOutroDuration(
              timings,
              doesAccountHaveSponsors,
            )}
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
