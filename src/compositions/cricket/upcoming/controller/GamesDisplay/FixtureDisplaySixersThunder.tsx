import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { GamesListSixersThunder } from "../GamesList/games-list-sixersThunder";
import { SponsorFooter } from "../../../sponsorFooter";
import { GamesDisplayProps } from "./_types/GamesDisplayProps";
import {
  calculateDisplayedGames,
  calculateGameCardHeight,
  buildUpcomingFooterSponsors,
} from "./_utils/calculations";

export const GamesDisplaySixersThunder: React.FC<GamesDisplayProps> = ({
  games,
  gamesPerScreen,
  screenIndex,
  heights = { asset: 1080 },
}) => {
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  const displayedGames = calculateDisplayedGames(
    games,
    gamesPerScreen,
    screenIndex,
  );

  const gameCardHeight = calculateGameCardHeight(heights.asset, gamesPerScreen);
  const footerSponsors = buildUpcomingFooterSponsors(displayedGames);

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
          <GamesListSixersThunder
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

export default GamesDisplaySixersThunder;
