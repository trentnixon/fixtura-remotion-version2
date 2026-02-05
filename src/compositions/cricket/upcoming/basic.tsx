import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import GamesDisplayBasic from "./controller/GamesDisplay/FixtureDisplayBasic";
import NoGamesData from "./modules/NoGamesData/no-data";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import { GameData } from "./types";
import {
  getGamesPerScreen,
  calculateDisplayDurationPerScreen,
  hasValidGames,
  calculateTotalScreens,
} from "./_utils/calculations";

export const UpcomingGamesWithTransitions: React.FC = () => {
  const { data, contentLayout, metadata } = useVideoDataContext();
  const { data: CompositionData, timings } = data;

  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  // Extract metadata from video data
  const fixturesLayout = contentLayout.divideFixturesBy || {};

  // Get games per screen from contentLayout
  const gamesPerScreen = getGamesPerScreen(fixturesLayout);

  // Get frame duration from metadata if available
  const frameOptions = metadata.frames || [300];
  const displayDurationPerScreen = calculateDisplayDurationPerScreen(
    timings,
    frameOptions,
  );

  // If no data is available, show a placeholder
  if (!hasValidGames(CompositionData)) {
    return <NoGamesData />;
  }

  // Calculate how many screens we need based on games per screen
  const totalScreens = calculateTotalScreens(
    CompositionData.length,
    gamesPerScreen,
  );

  // Create sequence data for each screen
  const sequences = Array.from({ length: totalScreens }, (_, index) => ({
    content: (
      <GamesDisplayBasic
        games={CompositionData as GameData[]}
        gamesPerScreen={gamesPerScreen}
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
  return <UpcomingGamesWithTransitions />;
};

export default Basic;
