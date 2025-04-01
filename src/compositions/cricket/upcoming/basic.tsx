import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";

import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import GamesDisplay from "./controller/GamesDisplay/display";
import NoGamesData from "./modules/NoGamesData/no-data";

export const UpcomingGamesWithTransitions: React.FC = () => {
  const { data, contentLayout } = useVideoDataContext();
  const { data: CompositionData, options, video } = data;
  const { timings } = data;

  // Extract metadata from video data
  const metadata = video?.metadata || {};
  const fixturesLayout = contentLayout.dividedFixturesBy || {};

  // Get games per screen from contentLayout - important fix
  // We need to specifically use the "UpComingFixtures" property
  let gamesPerScreen = 3; // Default fallback

  if (fixturesLayout && typeof fixturesLayout.UpComingFixtures === "number") {
    gamesPerScreen = fixturesLayout.UpComingFixtures;
  } else if (options && typeof options.gamesPerScreen === "number") {
    gamesPerScreen = options.gamesPerScreen;
  }

  // Configure transitions
  const transitionConfig = {
    type: "slide",
    direction: "from-left",
    durationInFrames: 15,
  };

  // Get frame duration from metadata if available
  const frameOptions = metadata.frames || [300];
  const displayDurationPerScreen = timings?.FPS_GAMES || frameOptions[0] || 300;

  // If no data is available, show a placeholder
  if (!CompositionData || CompositionData.length === 0) {
    return <NoGamesData />;
  }

  // Calculate how many screens we need based on games per screen
  const totalScreens = Math.ceil(CompositionData.length / gamesPerScreen);

  // Create sequence data for each screen
  const sequences = Array.from({ length: totalScreens }, (_, index) => ({
    content: (
      <GamesDisplay
        games={CompositionData}
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
