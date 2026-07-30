import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../core/context/ThemeContext";
import NoResultData from "./modules/NoResultData/no-data";
import ResultSingleDisplayBroadcastPro from "./controller/ResultSingleDisplay/display-BroadcastPro";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import { getCompositionSectionHeight } from "../../../core/utils/layoutHeights";
import {
  calculateDisplayDurationPerMatch,
  castToMatchResults,
  hasValidResults,
} from "./_utils/calculations";

export const ResultSingleBroadcastPro: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: resultData, videoMeta, timings } = data;
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;
  const compositionHeight = getCompositionSectionHeight(heights);

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
    content: (
      <div
        className="h-full w-full"
        style={{ height: `${compositionHeight}px` }}
      >
        <ResultSingleDisplayBroadcastPro match={match} />
      </div>
    ),
    durationInFrames: displayDurationPerMatch,
  }));

  return (
    <div className="w-full" style={{ height: `${compositionHeight}px` }}>
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
  );
};

export const BroadcastPro: React.FC = () => {
  return <ResultSingleBroadcastPro />;
};

export const broadcastpro: React.FC = () => {
  return <ResultSingleBroadcastPro />;
};

export default broadcastpro;
