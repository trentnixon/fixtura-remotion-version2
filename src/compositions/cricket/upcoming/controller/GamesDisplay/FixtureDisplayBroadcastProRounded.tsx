import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import GamesListBroadcastProRounded from "../GamesList/games-list-broadcastProRounded";
import { SponsorFooter } from "../../../sponsorFooter";
import { AssignSponsors } from "../../../_types/composition-types";
import { GamesDisplayProps } from "./_types/GamesDisplayProps";
import {
  calculateDisplayedGames,
  mergeAssignSponsors,
} from "./_utils/calculations";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

export const FixtureDisplayBroadcastProRounded: React.FC<GamesDisplayProps> = ({
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
  const mergedAssignSponsors = mergeAssignSponsors(displayedGames);

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
          className="mx-4 flex w-full flex-shrink-0 flex-col md:mx-6"
          backgroundColor="none"
          animation={panelAnimation.containerIn}
          exitAnimation={panelAnimation.containerOut}
        >
          <GamesListBroadcastProRounded games={displayedGames} />
        </AnimatedContainer>
      </div>
      <div className="flex-shrink-0" style={{ height: `${heights.footer}px` }}>
        <SponsorFooter
          assignSponsors={mergedAssignSponsors as unknown as AssignSponsors}
        />
      </div>
    </div>
  );
};

export default FixtureDisplayBroadcastProRounded;
