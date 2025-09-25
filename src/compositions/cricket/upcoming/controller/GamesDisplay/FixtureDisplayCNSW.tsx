import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { GameData } from "../../types";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";

import { GamesListCNSW } from "../GamesList/games-list-cnsw";

import { SponsorFooter } from "../../../sponsorFooter";
import { AssignSponsors } from "../../../composition-types";
interface GamesDisplayProps {
  games: GameData[];
  gamesPerScreen: number;
  screenIndex: number;

  heights?: {
    asset: number;
    [key: string]: number;
  };
}

export const GamesDisplayCNSW: React.FC<GamesDisplayProps> = ({
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

  // Merge all assignSponsors objects from displayedGames into one object
  const mergedAssignSponsors = displayedGames.reduce(
    (acc, game) => ({ ...acc, ...game.assignSponsors }),
    {},
  );
  return (
    <div className="p-0 flex flex-col w-full h-full justify-center">
      <AnimatedContainer
        type="full"
        className=" flex flex-col mx-16 overflow-hidden "
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex-1 overflow-hidden">
          <GamesListCNSW
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

export default GamesDisplayCNSW;
