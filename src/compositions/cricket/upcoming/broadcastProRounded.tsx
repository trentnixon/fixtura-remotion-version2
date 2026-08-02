import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../core/context/ThemeContext";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import NoGamesData from "./modules/NoGamesData/no-data";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import { GameData } from "./_types/types";
import FixtureDisplayBroadcastProRounded from "./controller/GamesDisplay/FixtureDisplayBroadcastProRounded";
import { getCompositionSectionHeight } from "../../../core/utils/layoutHeights";
import {
  getGamesPerScreen,
  calculateDisplayDurationPerScreen,
  hasValidGames,
  calculateTotalScreens,
} from "./_utils/calculations";

export const CricketUpcomingWithTransitionsBroadcastProRounded: React.FC = () => {
  const { data, contentLayout, metadata } = useVideoDataContext();
  const { data: CompositionData, timings } = data;
  const { layout } = useThemeContext();
  const { heights } = layout;
  const compositionHeight = getCompositionSectionHeight(heights);

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
      <div
        className="h-full w-full"
        style={{ height: `${compositionHeight}px` }}
      >
        <FixtureDisplayBroadcastProRounded
          games={CompositionData as GameData[]}
          gamesPerScreen={gamesPerScreen}
          screenIndex={index}
        />
      </div>
    ),
    durationInFrames: displayDurationPerScreen,
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
  return <CricketUpcomingWithTransitionsBroadcastProRounded />;
};

export default BroadcastProRounded;
