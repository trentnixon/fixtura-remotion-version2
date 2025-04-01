import React from "react";

import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { LadderData } from "./types";
import LadderDisplay from "./controller/Display/display";
import NoLadderData from "./modules/NoLadderData/no-data";

// Main component with TransitionSeries
export const CricketLadderWithTransitions: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: CompositionData } = data;
  const { timings } = data;

  const transitionConfig = {
    type: "slide",
    direction: "from-left",
    durationInFrames: 15,
  };

  // If no data is available, show a placeholder
  if (!CompositionData || CompositionData.length === 0) {
    return <NoLadderData />;
  }

  return (
    <TransitionSeriesWrapper
      sequences={CompositionData.map((ladder: LadderData) => ({
        content: <LadderDisplay ladder={ladder} />,
        durationInFrames: timings?.FPS_LADDER || 300, // Default to 300 if not specified
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

// Export as Basic for compatibility with original template
export const Basic: React.FC = () => {
  return <CricketLadderWithTransitions />;
};

export default Basic;
