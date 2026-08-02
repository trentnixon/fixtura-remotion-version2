import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../core/context/ThemeContext";
import NoResultData from "./modules/NoResultData/no-data";
import ResultSingleDisplayBroadcastProRounded from "./controller/ResultSingleDisplay/display-BroadcastProRounded";
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

export const ResultSingleBroadcastProRounded: React.FC = () => {
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
        <ResultSingleDisplayBroadcastProRounded match={match} />
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

export const BroadcastProRounded: React.FC = () => {
  return <ResultSingleBroadcastProRounded />;
};

export const broadcastprorounded: React.FC = () => {
  return <ResultSingleBroadcastProRounded />;
};

export default broadcastprorounded;
