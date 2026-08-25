import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import GamesListBroadcastPro from "../GamesList/games-list-broadcastPro";
import { SponsorFooter } from "../../../sponsorFooter";
import { GamesDisplayProps } from "./_types/GamesDisplayProps";
import {
  calculateDisplayedGames,
  buildUpcomingFooterSponsors,
} from "./_utils/calculations";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

export const FixtureDisplayBroadcastPro: React.FC<GamesDisplayProps> = ({
  games,
  gamesPerScreen,
  screenIndex,
}) => {
  const { animations } = useAnimationContext();
  const panelAnimation = animations.container.main.itemContainerOuter;
  const { layout } = useThemeContext();
  const { heights } = layout;

  const displayedGames = calculateDisplayedGames(
    games,
    gamesPerScreen,
    screenIndex,
  );

  const mainContentHeight = getMainContentSectionHeight(heights);
  const footerSponsors = buildUpcomingFooterSponsors(displayedGames);

  return (
    <div className="flex h-full w-full flex-col">
      <div
        className="flex min-h-0 flex-col justify-center overflow-hidden"
        style={{
          height: `${mainContentHeight}px`,
          maxHeight: `${mainContentHeight}px`,
        }}
      >
        <AnimatedContainer
          type="full"
          className="mx-6 flex w-auto flex-shrink-0 flex-col rounded-none md:mx-8"
          backgroundColor="none"
          animation={panelAnimation.containerIn}
          exitAnimation={panelAnimation.containerOut}
        >
          <GamesListBroadcastPro games={displayedGames} />
        </AnimatedContainer>
      </div>
      <div className="flex-shrink-0" style={{ height: `${heights.footer}px` }}>
        <SponsorFooter sponsors={footerSponsors} />
      </div>
    </div>
  );
};

export default FixtureDisplayBroadcastPro;
