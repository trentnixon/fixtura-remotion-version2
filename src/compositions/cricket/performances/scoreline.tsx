import React from "react";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../core/context/ThemeContext";
import {
  getCompositionSectionHeight,
  getMainContentSectionHeight,
} from "../../../core/utils/layoutHeights";
import { ScorelineSponsorFooter } from "../../../templates/variants/scoreline/components/ScorelineSponsorFooter";
import { csClass } from "../utils/scoreline/componentStyles";
import {
  buildPerformancesFooterSponsors,
  calculateDisplayDurationPerScreen,
  calculateTotalScreens,
  getItemsPerScreen,
  hasValidPerformances,
} from "./_utils/calculations";
import PerformancesDisplayScoreline from "./controller/PerformancesDisplay/display-Scoreline";
import NoPlayersData from "./modules/NoPlayersData/no-data";
import { transformPerformanceData } from "./utils/dataTransformer";

export const PerformancesListScoreline: React.FC = () => {
  const { data, contentLayout, metadata } = useVideoDataContext();
  const { data: performancesData, timings } = data;
  const { animations } = useAnimationContext();
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;
  const transitionConfig = animations.transition.Main;
  const fixturesLayout = contentLayout.divideFixturesBy || {};
  const itemsPerScreen = getItemsPerScreen(fixturesLayout);
  const frameOptions = metadata.frames || [300];
  const displayDurationPerScreen = calculateDisplayDurationPerScreen(
    timings,
    frameOptions,
  );

  if (!hasValidPerformances(performancesData)) {
    return <NoPlayersData />;
  }

  const compositionId = data.videoMeta?.video?.metadata?.compositionId || "";
  const transformedData = transformPerformanceData(
    performancesData as unknown[],
    compositionId,
  );
  const totalScreens = calculateTotalScreens(
    transformedData.length,
    itemsPerScreen,
  );

  if (totalScreens <= 0) {
    return <NoPlayersData />;
  }

  const finalDuration = Math.max(1, Math.floor(displayDurationPerScreen));
  const sequences = Array.from({ length: totalScreens }, (_, index) => ({
    content: (
      <PerformancesDisplayScoreline
        performances={transformedData}
        itemsPerScreen={itemsPerScreen}
        screenIndex={index}
      />
    ),
    durationInFrames: finalDuration,
  }));

  const footerSponsors = buildPerformancesFooterSponsors(
    transformedData,
    data.videoMeta?.club?.sponsors?.primary ?? [],
  );
  const mainContentHeight = getMainContentSectionHeight(heights);
  const compositionHeight = getCompositionSectionHeight(heights);

  return (
    <div
      className={csClass(componentStyles, "scorelineDisplayColumn")}
      style={{ height: `${compositionHeight}px` }}
    >
      <div
        className="relative overflow-hidden"
        style={{ height: `${mainContentHeight}px` }}
      >
        <TransitionSeriesWrapper
          sequences={sequences}
          transitionType={transitionConfig.type as TransitionType}
          direction={transitionConfig.direction as TransitionDirection}
          timing={{
            type: "linear",
            durationInFrames: transitionConfig.durationInFrames,
          }}
        />
      </div>
      <ScorelineSponsorFooter
        sponsors={footerSponsors}
        sponsorStripKey="scorelineTop5SponsorStrip"
      />
    </div>
  );
};

export const scoreline: React.FC = () => {
  return <PerformancesListScoreline />;
};

export default scoreline;
