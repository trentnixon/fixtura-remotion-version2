import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { GamesListSixersThunder } from "../GamesList/games-list-sixersThunder";
import { SponsorFooter } from "../../../sponsorFooter";
import { GamesDisplayProps } from "./_types/GamesDisplayProps";
import {
  calculateDisplayedGames,
  buildUpcomingFooterSponsors,
} from "./_utils/calculations";

export const GamesDisplayClassic: React.FC<GamesDisplayProps> = ({
  games,
  gamesPerScreen,
  screenIndex,
}) => {
  const { animations } = useAnimationContext();
  const { layout } = useThemeContext();
  const { heights } = layout;
  const ContainerAnimations = animations.container;

  const displayedGames = calculateDisplayedGames(
    games,
    gamesPerScreen,
    screenIndex,
  );

  const footerSponsors = buildUpcomingFooterSponsors(displayedGames);

  return (
    <div className="flex h-full flex-col">
      <AnimatedContainer
        type="full"
        className="mx-4 flex flex-1 flex-col overflow-visible py-32"
        style={{
          height: heights.asset,
        }}
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex flex-1 flex-col gap-2 overflow-hidden">
          <GamesListSixersThunder games={displayedGames} />
        </div>
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter sponsors={footerSponsors} />
      </div>
    </div>
  );
};

export default GamesDisplayClassic;
