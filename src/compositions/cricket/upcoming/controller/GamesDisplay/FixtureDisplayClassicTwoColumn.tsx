import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { SponsorFooter } from "../../../sponsorFooter";
import { GamesListClassicTwoColumn } from "../GamesList/games-list-Classic-Two-Column";
import { GamesDisplayProps } from "./_types/GamesDisplayProps";
import {
  calculateDisplayedGames,
  calculateGameCardHeight,
  buildUpcomingFooterSponsors,
} from "./_utils/calculations";

export const GamesDisplayClassicTwoColumn: React.FC<GamesDisplayProps> = ({
  games,
  gamesPerScreen,
  screenIndex,
  heights = { asset: 1080 },
}) => {
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  // Calculate which games to show on this screen
  const displayedGames = calculateDisplayedGames(
    games,
    gamesPerScreen,
    screenIndex,
  );

  // Calculate game card heights with custom spacing for two-column layout
  const gameCardHeight = calculateGameCardHeight(
    heights.asset,
    gamesPerScreen,
    {
      headerHeight: 0,
      contentPadding: 20,
      cardSpacing: 10,
    },
  );

  const footerSponsors = buildUpcomingFooterSponsors(displayedGames);
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
        <SponsorFooter sponsors={footerSponsors} />
      </div>
    </div>
  );
};

export default GamesDisplayClassicTwoColumn;
