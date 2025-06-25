import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { MatchResult } from "./types";
import NoResultsData from "./modules/NoResultsData/no-data";
import ResultsDisplayBasic from "./controller/ResultsDisplay/display-Basic";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { useAnimationContext } from "../../../core/context/AnimationContext";

export const ResultsList: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: resultsData, videoMeta, timings } = data;
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  // If no data is available, show a placeholder
  if (!resultsData || !Array.isArray(resultsData) || resultsData.length === 0) {
    return <NoResultsData />;
  }

  // Set to 2 results per screen as requested
  const resultsPerScreen = 2;

  // Get frame duration from timings or use default
  const frameOptions = videoMeta?.video?.metadata?.frames || [300];
  const displayDurationPerScreen =
    timings?.FPS_SCORECARD || frameOptions[0] || 300;

  // Calculate how many screens we need based on results per screen
  const totalScreens = Math.ceil(resultsData.length / resultsPerScreen);

  // Cast the data to the correct type
  const matchResults = resultsData as unknown as MatchResult[];

  // Create sequence data for each screen
  const sequences = Array.from({ length: totalScreens }, (_, index) => ({
    content: (
      <ResultsDisplayBasic
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

// Export as Basic for compatibility with original template
export const Basic: React.FC = () => {
  return <ResultsList />;
};

export default Basic;
