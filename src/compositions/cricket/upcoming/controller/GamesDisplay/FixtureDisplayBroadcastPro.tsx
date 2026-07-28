import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import GamesListBroadcastPro from "../GamesList/games-list-broadcastPro";
import { SponsorFooter } from "../../../sponsorFooter";
import { AssignSponsors } from "../../../_types/composition-types";
import { GamesDisplayProps } from "./_types/GamesDisplayProps";
import {
  calculateBroadcastProGameCardHeight,
  calculateDisplayedGames,
  mergeAssignSponsors,
} from "./_utils/calculations";

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

  const gameCardHeight = calculateBroadcastProGameCardHeight(
    heights.asset,
    displayedGames.length,
  );

  const mergedAssignSponsors = mergeAssignSponsors(displayedGames);

  return (
    <div className="flex h-full w-full flex-col">
      <AnimatedContainer
        type="full"
        className="mx-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-none md:mx-6"
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
      >
        <div className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden">
          <GamesListBroadcastPro
            games={displayedGames}
            gameRowHeight={gameCardHeight}
          />
        </div>
      </AnimatedContainer>
      <div className="flex-shrink-0" style={{ height: `${heights.footer}px` }}>
        <SponsorFooter
          assignSponsors={mergedAssignSponsors as unknown as AssignSponsors}
        />
      </div>
    </div>
  );
};

export default FixtureDisplayBroadcastPro;
