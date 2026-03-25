import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import NoGamesData from "./modules/NoGamesData/no-data";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import { GameData } from "./_types/types";
import FixtureDisplayBroadcastPro from "./controller/GamesDisplay/FixtureDisplayBroadcastPro";
import {
  getGamesPerScreen,
  calculateDisplayDurationPerScreen,
  hasValidGames,
  calculateTotalScreens,
} from "./_utils/calculations";

export const CricketUpcomingWithTransitionsBroadcastPro: React.FC = () => {
  const { data, contentLayout, metadata } = useVideoDataContext();
  const { data: CompositionData, timings } = data;

  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  const fixturesLayout = contentLayout.divideFixturesBy || {};
  const gamesPerScreen = getGamesPerScreen(fixturesLayout);

  const frameOptions = metadata.frames || [300];
  const displayDurationPerScreen = calculateDisplayDurationPerScreen(
    timings,
    frameOptions,
  );

  if (!hasValidGames(CompositionData)) {
    return <NoGamesData />;
  }

  const totalScreens = calculateTotalScreens(
    CompositionData.length,
    gamesPerScreen,
  );

  const sequences = Array.from({ length: totalScreens }, (_, index) => ({
    content: (
      <FixtureDisplayBroadcastPro
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

export const BroadcastPro: React.FC = () => {
  return <CricketUpcomingWithTransitionsBroadcastPro />;
};

export default BroadcastPro;
