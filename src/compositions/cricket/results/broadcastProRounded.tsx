import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import NoResultsData from "./modules/NoResultsData/no-data";
import ResultsDisplayBroadcastProRounded from "./controller/ResultsDisplay/display-BroadcastProRounded";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import {
  DEFAULT_RESULTS_PER_SCREEN,
  calculateDisplayDurationPerScreen,
  calculateTotalScreens,
  castToMatchResults,
  hasValidResults,
} from "./_utils/calculations";

export const ResultsListBroadcastProRounded: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: resultsData, videoMeta, timings } = data;
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  if (!hasValidResults(resultsData)) {
    return <NoResultsData />;
  }

  const resultsPerScreen = DEFAULT_RESULTS_PER_SCREEN;
  const frameOptions = videoMeta?.video?.metadata?.frames || [300];
  const displayDurationPerScreen = calculateDisplayDurationPerScreen(
    timings,
    frameOptions,
  );

  const totalScreens = calculateTotalScreens(
    resultsData.length,
    resultsPerScreen,
  );

  const matchResults = castToMatchResults(resultsData);

  const sequences = Array.from({ length: totalScreens }, (_, index) => ({
    content: (
      <ResultsDisplayBroadcastProRounded
        results={matchResults}
        resultsPerScreen={resultsPerScreen}
        screenIndex={index}
      />
    ),
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

export const BroadcastProRounded: React.FC = () => {
  return <ResultsListBroadcastProRounded />;
};

export const broadcastprorounded: React.FC = () => {
  return <ResultsListBroadcastProRounded />;
};

export default broadcastprorounded;
