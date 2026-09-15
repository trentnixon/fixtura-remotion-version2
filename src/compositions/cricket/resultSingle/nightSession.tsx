import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../core/context/ThemeContext";
import NoResultData from "./modules/NoResultData/no-data";
import ResultSingleDisplayNightSession from "./controller/ResultSingleDisplay/display-NightSession";
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

export const ResultSingleNightSession: React.FC = () => {
  const { data: dataset, metadata } = useVideoDataContext();
  const resultData = dataset?.data;
  const timings = dataset?.timings;
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;
  const compositionHeight = getCompositionSectionHeight(heights);

  if (!hasValidResults(resultData)) {
    return <NoResultData />;
  }

  const frameOptions = metadata?.frames || [300];
  const displayDurationPerMatch = calculateDisplayDurationPerMatch(
    timings,
    frameOptions,
  );

  const matchResults = castToMatchResults(resultData);

  const sequences = matchResults.map((match) => ({
    content: (
      <div className="h-full w-full" style={{ height: compositionHeight }}>
        <ResultSingleDisplayNightSession match={match} />
      </div>
    ),
    durationInFrames: displayDurationPerMatch,
  }));

  return (
    <div className="w-full" style={{ height: compositionHeight }}>
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

export const nightSession: React.FC = () => {
  return <ResultSingleNightSession />;
};

export default nightSession;
