import React from "react";

import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { LadderData } from "./types";
import NoLadderData from "./modules/NoLadderData/no-data";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import LadderDisplayCNSW from "./controller/Display/display-cnsw";

// Main component with TransitionSeries
export const CricketLadderWithTransitions: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: CompositionData } = data;
  const { timings } = data;
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  // If no data is available, show a placeholder
  if (
    !CompositionData ||
    !Array.isArray(CompositionData) ||
    CompositionData.length === 0
  ) {
    return <NoLadderData />;
  }

  // Explicitly cast CompositionData to LadderData[] for the map function
  const ladderDataArray = CompositionData as unknown as LadderData[];

  return (
    <TransitionSeriesWrapper
      sequences={ladderDataArray.map((ladder: LadderData) => ({
        content: <LadderDisplayCNSW ladder={ladder} />,
        // Use a generic timing property or fallback if FPS_LADDER doesn't exist
        durationInFrames: timings?.FPS_LADDER || 300, // Example: Use FPS_MAIN or fallback
      }))}
      transitionType={transitionConfig.type as TransitionType}
      direction={transitionConfig.direction as TransitionDirection}
      timing={{
        type: "linear",
        durationInFrames: transitionConfig.durationInFrames,
      }}
    />
  );
};

// Export as Brickwork for compatibility with original template
export const CNSW: React.FC = () => {
  return <CricketLadderWithTransitions />;
};

export default CNSW;
