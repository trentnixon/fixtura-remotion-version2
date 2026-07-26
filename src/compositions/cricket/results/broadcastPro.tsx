import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import NoResultsData from "./modules/NoResultsData/no-data";
import ResultsDisplayBroadcastPro from "./controller/ResultsDisplay/display-BroadcastPro";
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

export const ResultsListBroadcastPro: React.FC = () => {
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
      <ResultsDisplayBroadcastPro
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

export const BroadcastPro: React.FC = () => {
  return <ResultsListBroadcastPro />;
};

export const broadcastpro: React.FC = () => {
  return <ResultsListBroadcastPro />;
};

export default broadcastpro;
