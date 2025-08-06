import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";

import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { GamesDisplayClassic } from "./controller/GamesDisplay/FixtureDisplayClassic";
import NoGamesData from "./modules/NoGamesData/no-data";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import { GameData } from "./types";

export const UpcomingGamesWithTransitions: React.FC = () => {
  const { data, contentLayout, metadata } = useVideoDataContext();
  const { data: CompositionData, timings } = data;

  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  // Extract metadata from video data
  const fixturesLayout = contentLayout.divideFixturesBy || {};

  // Get games per screen from contentLayout - important fix
  // We need to specifically use the "UpComingFixtures" property
  let gamesPerScreen = fixturesLayout.CricketUpcoming; // Default fallback

  if (fixturesLayout && typeof fixturesLayout.CricketUpcoming === "number") {
    gamesPerScreen = fixturesLayout.CricketUpcoming;
  }

  // Get frame duration from metadata if available
  const frameOptions = metadata.frames || [300];
  const displayDurationPerScreen =
    timings?.FPS_SCORECARD || frameOptions[0] || 300;

  // If no data is available, show a placeholder
  if (!CompositionData || CompositionData.length === 0) {
    return <NoGamesData />;
  }

  // Calculate how many screens we need based on games per screen
  const totalScreens = Math.ceil(CompositionData.length / gamesPerScreen);

  // Create sequence data for each screen
  const sequences = Array.from({ length: totalScreens }, (_, index) => ({
    content: (
      <GamesDisplayClassic
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
export const Classic: React.FC = () => {
  return <UpcomingGamesWithTransitions />;
};

export default Classic;
