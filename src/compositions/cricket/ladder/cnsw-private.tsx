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
import LadderDisplayCNSWPrivate from "./controller/Display/display-cnsw-private";
import {
  hasValidLadderData,
  castToLadderDataArray,
  calculateLadderDuration,
} from "./_utils/helpers";

// Main component with TransitionSeries
export const CricketLadderWithTransitions: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: CompositionData } = data;
  const { timings } = data;
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  // If no data is available, show a placeholder
  if (!hasValidLadderData(CompositionData)) {
    return <NoLadderData />;
  }

  // Explicitly cast CompositionData to LadderData[] for the map function
  const ladderDataArray = castToLadderDataArray(CompositionData);

  return (
    <TransitionSeriesWrapper
      sequences={ladderDataArray.map((ladder: LadderData) => ({
        content: <LadderDisplayCNSWPrivate ladder={ladder} />,
        durationInFrames: calculateLadderDuration(timings),
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
export const CNSWPrivate: React.FC = () => {
  return <CricketLadderWithTransitions />;
};

export default CNSWPrivate;
