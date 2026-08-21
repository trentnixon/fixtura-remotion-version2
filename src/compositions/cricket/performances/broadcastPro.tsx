import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import NoPlayersData from "./modules/NoPlayersData/no-data";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import { useThemeContext } from "../../../core/context/ThemeContext";
import { transformPerformanceData } from "./utils/dataTransformer";
import PerformancesDisplayBroadcastPro from "./controller/PerformancesDisplay/display-BroadcastPro";
import { SponsorFooter } from "../sponsorFooter/index";
import { buildSingleItemFooterSponsors } from "../../../core/utils/sponsors";
import {
  getCompositionSectionHeight,
  getMainContentSectionHeight,
} from "../../../core/utils/layoutHeights";
import {
  calculateDisplayDurationPerScreen,
  hasValidPerformances,
  calculateTotalScreens,
  mergeAssignSponsors,
} from "./_utils/calculations";

/** 2×3 grid — six performance cards per screen. */
const BROADCAST_PRO_ITEMS_PER_SCREEN = 6;

export const PerformancesListBroadcastPro: React.FC = () => {
  const { data, metadata } = useVideoDataContext();
  const { data: performancesData, timings } = data;
  const { animations } = useAnimationContext();
  const { layout } = useThemeContext();
  const { heights } = layout;
  const transitionConfig = animations.transition.Main;

  const itemsPerScreen = BROADCAST_PRO_ITEMS_PER_SCREEN;

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
      <PerformancesDisplayBroadcastPro
        performances={transformedData}
        itemsPerScreen={itemsPerScreen}
        screenIndex={index}
      />
    ),
    durationInFrames: finalDuration,
  }));

  const firstItem = transformedData[0];
  const footerSponsors = buildSingleItemFooterSponsors({
    assignSponsors: mergeAssignSponsors(firstItem ? [firstItem] : []),
    primaryForScreen: firstItem?.primaryForScreen,
    fallbackPrimary: data.videoMeta?.club?.sponsors?.primary ?? [],
  });

  const mainContentHeight = getMainContentSectionHeight(heights);
  const compositionHeight = getCompositionSectionHeight(heights);

  return (
    <div
      className="flex w-full flex-col"
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
      <div className="flex-shrink-0" style={{ height: `${heights.footer}px` }}>
        <SponsorFooter sponsors={footerSponsors} />
      </div>
    </div>
  );
};

export const BroadcastPro: React.FC = () => {
  return <PerformancesListBroadcastPro />;
};

export default BroadcastPro;
