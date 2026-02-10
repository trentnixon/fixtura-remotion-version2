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
import PerformancesDisplayCNSW from "./controller/PerformancesDisplay/display-CNSW";
import {
  getItemsPerScreen,
  calculateDisplayDurationPerScreen,
  hasValidPerformances,
  calculateTotalScreens,
  mergeAssignSponsors,
} from "./_utils/calculations";

export const PerformancesListCNSW: React.FC = () => {
  const { data, contentLayout, metadata } = useVideoDataContext();
  const { data: performancesData, timings } = data;
  const { animations } = useAnimationContext();
  const { layout } = useThemeContext();
  const { heights } = layout;
  const transitionConfig = animations.transition.Main;

  // Extract metadata from video data
  const fixturesLayout = contentLayout.divideFixturesBy || {};

  // Get items per screen from contentLayout
  const itemsPerScreen = getItemsPerScreen(fixturesLayout);

  // Get frame duration from metadata if available
  const frameOptions = metadata.frames || [300];
  const displayDurationPerScreen = calculateDisplayDurationPerScreen(
    timings,
    frameOptions,
  );

  // If no data is available, show a placeholder
  if (!hasValidPerformances(performancesData)) {
    return <NoPlayersData />;
  }

  const compositionId = data.videoMeta?.video?.metadata?.compositionId || "";

  // Transform data based on composition type
  const transformedData = transformPerformanceData(
    performancesData as unknown[],
    compositionId,
  );

  // Calculate how many screens we need based on items per screen
  const totalScreens = calculateTotalScreens(
    transformedData.length,
    itemsPerScreen,
  );

  // Ensure we have at least one screen
  if (totalScreens <= 0) {
    console.warn(
      "[PerformancesListCNSW] No screens to display, returning placeholder",
    );
    return <NoPlayersData />;
  }

  // Debug logging (remove in production)
  console.log("[PerformancesListCNSW] Debug:", {
    totalItems: transformedData.length,
    itemsPerScreen,
    totalScreens,
    compositionId,
    displayDurationPerScreen,
  });

  // Final validation - ensure duration is still valid before creating sequences
  const finalDuration = Math.max(1, Math.floor(displayDurationPerScreen));

  // Create sequence data for each screen
  const sequences = Array.from({ length: totalScreens }, (_, index) => ({
    content: (
      <PerformancesDisplayCNSW
        performances={transformedData}
        itemsPerScreen={itemsPerScreen}
        screenIndex={index}
      />
    ),
    durationInFrames: finalDuration,
  }));

  // Debug logging for sequences (remove in production)
  console.log("[PerformancesListCNSW] Sequences created:", {
    totalScreens,
    sequencesCount: sequences.length,
    sequences: sequences.map((seq, idx) => ({
      screenIndex: idx,
      durationInFrames: seq.durationInFrames,
    })),
  });

  // Merge and transform assignSponsors from all performances
  const mergedAssignSponsors = mergeAssignSponsors(transformedData);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1">
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

// Export as CNSW for compatibility with original template
export const CNSW: React.FC = () => {
  return <PerformancesListCNSW />;
};

export default CNSW;
