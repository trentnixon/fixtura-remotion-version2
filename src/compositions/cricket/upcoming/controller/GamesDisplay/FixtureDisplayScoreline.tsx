import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { ScorelineSponsorFooter } from "../../../../../templates/variants/scoreline/components/ScorelineSponsorFooter";
import GamesListScoreline from "../GamesList/games-list-Scoreline";
import { GamesDisplayProps } from "./_types/GamesDisplayProps";
import {
  calculateDisplayedGames,
  buildUpcomingFooterSponsors,
} from "./_utils/calculations";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

export const FixtureDisplayScoreline: React.FC<GamesDisplayProps> = ({
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
    <>
      <AnimatedContainer
        type="full"
        className="min-h-0 flex-1 overflow-hidden rounded-none"
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
      >
        <main
          className="fixtures-ledger"
          style={{
            height: `${mainContentHeight}px`,
            maxHeight: `${mainContentHeight}px`,
          }}
        >
          <GamesListScoreline
            games={displayedGames}
            availableHeight={mainContentHeight}
          />
        </main>
      </AnimatedContainer>
      <ScorelineSponsorFooter sponsors={footerSponsors} />
    </>
  );
};

export default FixtureDisplayScoreline;
