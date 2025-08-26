import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { GameData } from "../../types";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";

import { SponsorFooter } from "../../../sponsorFooter";
import { AssignSponsors } from "../../../composition-types";
import { GamesListClassicTwoColumn } from "../GamesList/games-list-Classic-Two-Column";
interface GamesDisplayProps {
  games: GameData[];
  gamesPerScreen: number;
  screenIndex: number;

  heights?: {
    asset: number;
    [key: string]: number;
  };
}

export const GamesDisplayClassicTwoColumn: React.FC<GamesDisplayProps> = ({
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
  const headerHeight = 0;
  const contentPadding = 20;
  const cardSpacing = 10;
  const availableHeight = heights.asset - headerHeight - contentPadding;
  const gameCardHeight = Math.floor(
    availableHeight / gamesPerScreen - cardSpacing,
  );

  // Merge all assignSponsors objects from displayedGames into one object
  const mergedAssignSponsors = displayedGames.reduce(
    (acc, game) => ({ ...acc, ...game.assignSponsors }),
    {},
  );
  return (
    <div
      className="p-0 flex flex-col w-full h-full justify-center"
      style={{
        minHeight: `1350px`,
      }}
    >
      <AnimatedContainer
        type="full"
        className=" flex flex-col mx-2 overflow-hidden "
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex-1 overflow-hidden">
          <GamesListClassicTwoColumn
            games={displayedGames}
            gameRowHeight={gameCardHeight}
          />
        </div>
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter
          assignSponsors={mergedAssignSponsors as unknown as AssignSponsors}
        />
      </div>
    </div>
  );
};

export default GamesDisplayClassicTwoColumn;
