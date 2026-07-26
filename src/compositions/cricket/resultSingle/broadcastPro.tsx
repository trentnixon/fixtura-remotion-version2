import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import NoResultData from "./modules/NoResultData/no-data";
import ResultSingleDisplayBroadcastPro from "./controller/ResultSingleDisplay/display-BroadcastPro";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import {
  calculateDisplayDurationPerMatch,
  castToMatchResults,
  hasValidResults,
} from "./_utils/calculations";

export const ResultSingleBroadcastPro: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: resultData, videoMeta, timings } = data;
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  if (!hasValidResults(resultData)) {
    return <NoResultData />;
  }

  const frameOptions = videoMeta?.video?.metadata?.frames || [300];
  const displayDurationPerMatch = calculateDisplayDurationPerMatch(
    timings,
    frameOptions,
  );

  const matchResults = castToMatchResults(resultData);

  const sequences = matchResults.map((match) => ({
    content: <ResultSingleDisplayBroadcastPro match={match} />,
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

export const BroadcastPro: React.FC = () => {
  return <ResultSingleBroadcastPro />;
};

export const broadcastpro: React.FC = () => {
  return <ResultSingleBroadcastPro />;
};

export default broadcastpro;
