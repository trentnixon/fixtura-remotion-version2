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
import { AssignSponsors } from "../_types/composition-types";
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

  const mergedAssignSponsors = mergeAssignSponsors(transformedData);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
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
      <div
        className="flex-shrink-0"
        style={{ height: `${heights.footer}px` }}
      >
        <SponsorFooter
          assignSponsors={mergedAssignSponsors as unknown as AssignSponsors}
        />
      </div>
    </div>
  );
};

export const BroadcastPro: React.FC = () => {
  return <PerformancesListBroadcastPro />;
};

export default BroadcastPro;
