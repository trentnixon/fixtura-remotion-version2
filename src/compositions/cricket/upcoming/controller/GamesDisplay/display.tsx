import React from "react";
import GamesList from "../GamesList/games-list";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { GameData } from "../../types";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";

interface GamesDisplayProps {
  games: GameData[];
  gamesPerScreen: number;
  screenIndex: number;

  heights?: {
    asset: number;
    [key: string]: number;
  };
}

export const GamesDisplay: React.FC<GamesDisplayProps> = ({
  games,
  gamesPerScreen,
  screenIndex,
  heights = { asset: 1080 },
}) => {
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;
  // Calculate which games to show on this screen
  const startIndex = screenIndex * gamesPerScreen;
  const endIndex = Math.min(startIndex + gamesPerScreen, games.length);
  const displayedGames = games.slice(startIndex, endIndex);

  // Calculate game card heights
  const headerHeight = 100;
  const contentPadding = 40;
  const cardSpacing = 20;
  const availableHeight = heights.asset - headerHeight - contentPadding;
  const gameCardHeight = Math.floor(
    availableHeight / gamesPerScreen - cardSpacing,
  );

  return (
    <div className="p-0 flex flex-col w-full h-full justify-center">
      <AnimatedContainer
        type="full"
        className=" flex flex-col mx-8 overflow-hidden "
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex-1 overflow-hidden">
          <GamesList games={displayedGames} gameRowHeight={gameCardHeight} />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default GamesDisplay;
