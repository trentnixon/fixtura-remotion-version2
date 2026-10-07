import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import GamesListBasic from "../GamesList/games-list-basic";
import { GamesDisplayProps } from "./_types/GamesDisplayProps";
import {
  calculateDisplayedGames,
  calculateGameCardHeight,
  buildUpcomingFooterSponsors,
} from "./_utils/calculations";

export const GamesDisplayBasic: React.FC<GamesDisplayProps> = ({
  games,
  gamesPerScreen,
  screenIndex,
}) => {
  const { animations } = useAnimationContext();
  const { layout } = useThemeContext();
  const { heights } = layout;
  const ContainerAnimations = animations.container;

  // Calculate which games to show on this screen
  const displayedGames = calculateDisplayedGames(
    games,
    gamesPerScreen,
    screenIndex,
  );

  // Calculate game card heights
  const gameCardHeight = calculateGameCardHeight(heights.asset, gamesPerScreen);

  const footerSponsors = buildUpcomingFooterSponsors(displayedGames);
  return (
    <div className="flex h-full w-full flex-col p-0">
      <AnimatedContainer
        type="full"
        className="mx-8 flex min-h-0 flex-1 flex-col overflow-hidden"
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="min-h-0 flex-1 overflow-hidden">
          <GamesListBasic
            games={displayedGames}
            gameRowHeight={gameCardHeight}
          />
        </div>
      </AnimatedContainer>
      <div
        className="w-full shrink-0 overflow-hidden"
        style={{
          height: `${heights.footer}px`,
          maxHeight: `${heights.footer}px`,
        }}
      >
        <SponsorFooter sponsors={footerSponsors} />
      </div>
    </div>
  );
};

export default GamesDisplayBasic;
