import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import NoResultData from "./modules/NoResultData/no-data";

import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import CNSWSingleResult from "./controller/ResultSingleDisplay/display-cnsw";
import {
  calculateDisplayDurationPerMatch,
  castToMatchResults,
  hasValidResults,
} from "./_utils/calculations";

export const ResultSingleCNSW: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: resultData, videoMeta, timings } = data;
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  // If no data is available, show a placeholder
  if (!hasValidResults(resultData)) {
    return <NoResultData />;
  }

  // Get frame duration from timings or use default
  const frameOptions = videoMeta?.video?.metadata?.frames || [300];
  const displayDurationPerMatch = calculateDisplayDurationPerMatch(
    timings,
    frameOptions,
  );

  // Cast the data to the correct type
  const matchResults = castToMatchResults(resultData);

  // Create sequence data for each match result
  const sequences = matchResults.map((match) => ({
    content: <CNSWSingleResult match={match} />,
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
export const CNSW: React.FC = () => {
  return <ResultSingleCNSW />;
};

export default CNSW;
