import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { NightSessionSponsorFooter } from "../../../../../templates/variants/nightSession/components/NightSessionSponsorFooter";
import { csClass } from "../../../utils/scoreline/componentStyles";
import GamesListNightSession from "../GamesList/games-list-NightSession";
import { GamesDisplayProps } from "./_types/GamesDisplayProps";
import {
  calculateDisplayedGames,
  buildUpcomingFooterSponsors,
} from "./_utils/calculations";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";

export const FixtureDisplayNightSession: React.FC<GamesDisplayProps> = ({
  games,
  gamesPerScreen,
  screenIndex,
}) => {
  const { animations } = useAnimationContext();
  const panelAnimation = animations.container.main.itemContainerOuter;
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;

  const displayedGames = calculateDisplayedGames(
    games,
    gamesPerScreen,
    screenIndex,
  );

  const mainContentHeight = getMainContentSectionHeight(heights);
  const footerSponsors = buildUpcomingFooterSponsors(displayedGames);

  return (
    <div
      className={csClass(componentStyles, "nightSessionDisplayColumn")}
      style={{ height: `${mainContentHeight + heights.footer}px` }}
    >
      <AnimatedContainer
        type="full"
        className={csClass(componentStyles, "nightSessionAnimatedShell")}
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
      >
        <main
          className={`fixtures-ledger ${csClass(componentStyles, "nightSessionUpcomingLedger")}`}
          style={{
            height: `${mainContentHeight}px`,
            maxHeight: `${mainContentHeight}px`,
          }}
        >
          <GamesListNightSession games={displayedGames} />
        </main>
      </AnimatedContainer>
      <NightSessionSponsorFooter
        sponsors={footerSponsors}
        sponsorStripKey="nightSessionUpcomingSponsorStrip"
      />
    </div>
  );
};

export default FixtureDisplayNightSession;
