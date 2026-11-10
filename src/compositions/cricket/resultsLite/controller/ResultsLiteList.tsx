import React from "react";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../../components/transitions";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import NoResultsData from "../../results/modules/NoResultsData/no-data";
import { calculateDisplayDurationPerScreen } from "../../results/_utils/calculations";
import { RESULTS_LITE_PER_SCREEN } from "./display-Basic";
import {
  buildResultsLiteSequences,
  hasResultsLiteGradeBlocks,
  parseResultsLiteGradeBlocks,
  ResultsLiteSequence,
} from "./upstreamResultsLiteData";

export type ResultsLiteDisplayProps = {
  sequence: ResultsLiteSequence;
};

export const ResultsLiteList: React.FC<{
  Display: React.FC<ResultsLiteDisplayProps>;
  fixturesPerScreen?: number;
}> = ({ Display, fixturesPerScreen = RESULTS_LITE_PER_SCREEN }) => {
  const { data } = useVideoDataContext();
  const { data: resultsData, timings } = data;
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  if (!hasResultsLiteGradeBlocks(resultsData)) {
    return <NoResultsData />;
  }

  const gradeBlocks = parseResultsLiteGradeBlocks(resultsData);
  const liteSequences = buildResultsLiteSequences(
    gradeBlocks,
    fixturesPerScreen,
  );

  const frameOptions = data.videoMeta?.video?.metadata?.frames || [300];
  const displayDurationPerScreen = calculateDisplayDurationPerScreen(
    timings,
    frameOptions,
  );

  const sequences = liteSequences.map((sequence) => ({
    content: <Display sequence={sequence} />,
    durationInFrames: displayDurationPerScreen,
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
