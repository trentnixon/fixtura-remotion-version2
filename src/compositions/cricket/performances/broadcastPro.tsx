import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import NoPlayersData from "./modules/NoPlayersData/no-data";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import { transformPerformanceData } from "./utils/dataTransformer";
import { SponsorFooter } from "../sponsorFooter/index";
import { AssignSponsors } from "../_types/composition-types";
import { useThemeContext } from "../../../core/context/ThemeContext";
import PerformancesDisplayBroadcastPro from "./controller/PerformancesDisplay/display-BroadcastPro";
import {
  calculateDisplayDurationPerScreen,
  hasValidPerformances,
  calculateTotalScreens,
  mergeAssignSponsors,
} from "./_utils/calculations";

/** 2×3 grid per screen (6 cards) — fits available asset height. */
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

  const contentHeight = heights.asset;

  return (
    <div
      className="flex w-full flex-col"
      style={{ height: `${heights.asset + heights.footer}px` }}
    >
      <div
        style={{
          height: `${contentHeight}px`,
          overflow: "hidden",
          position: "relative",
        }}
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
      <div style={{ height: `${heights.footer}px` }}>
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
