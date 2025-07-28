import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { MatchResult } from "./types";
import NoResultData from "./modules/NoResultData/no-data";

import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import SixersSingleResult from "./controller/ResultSingleDisplay/display-sixers";

export const ResultSingleSixers: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: resultData, videoMeta, timings } = data;
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  // If no data is available, show a placeholder
  if (!resultData || !Array.isArray(resultData) || resultData.length === 0) {
    return <NoResultData />;
  }

  // Get frame duration from timings or use default
  const frameOptions = videoMeta?.video?.metadata?.frames || [300];
  const displayDurationPerMatch =
    timings?.FPS_SCORECARD || frameOptions[0] || 300;

  // Cast the data to the correct type
  const matchResults = resultData as MatchResult[];

  // Create sequence data for each match result
  const sequences = matchResults.map((match) => ({
    content: <SixersSingleResult match={match} />,
    durationInFrames: displayDurationPerMatch,
  }));

  return (
    <TransitionSeriesWrapper
      sequences={sequences}
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
export const Sixers: React.FC = () => {
  return <ResultSingleSixers />;
};

export default Sixers;
