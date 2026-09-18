import React, { useMemo } from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { NightSessionSponsorFooter } from "../../../../../templates/variants/nightSession/components/NightSessionSponsorFooter";
import { NightSessionAnimatedShell } from "../../../utils/nightSession/NightSessionAnimatedShell";
import { csClass } from "../../../utils/scoreline/componentStyles";
import GamesListNightSession from "../GamesList/games-list-NightSession";
import { useNightSessionEnterTiming } from "../../../utils/nightSession/useNightSessionEnterTiming";
import { NightSessionEnterTimingProvider } from "../../../utils/nightSession/NightSessionEnterTimingContext";
import { GamesDisplayProps } from "./_types/GamesDisplayProps";
import {
  calculateDisplayedGames,
  buildUpcomingFooterSponsors,
} from "./_utils/calculations";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";
import { NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES } from "../../../utils/nightSession/nightSessionAnimationTiming";

export const FixtureDisplayNightSession: React.FC<GamesDisplayProps> = ({
  games,
  gamesPerScreen,
  screenIndex,
}) => {
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;

  const displayedGames = calculateDisplayedGames(
    games,
    gamesPerScreen,
    screenIndex,
  );

  const mainContentHeight = getMainContentSectionHeight(heights);
  const footerSponsors = buildUpcomingFooterSponsors(displayedGames);
  const upcomingEnterTimingOptions = useMemo(
    () => ({ rowStaggerFrames: NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES }),
    [],
  );
  const enterTiming = useNightSessionEnterTiming(
    displayedGames.length,
    "FPS_MAIN",
    undefined,
    upcomingEnterTimingOptions,
  );

  return (
    <div
      className={csClass(componentStyles, "nightSessionDisplayColumn")}
      style={{ height: `${mainContentHeight + heights.footer}px` }}
    >
      <NightSessionAnimatedShell
        className={csClass(componentStyles, "nightSessionAnimatedShell")}
        animateShell={false}
      >
        <main
          className={`fixtures-ledger ${csClass(componentStyles, "nightSessionUpcomingLedger")}`}
          style={{
            height: `${mainContentHeight}px`,
            maxHeight: `${mainContentHeight}px`,
          }}
        >
          <NightSessionEnterTimingProvider value={enterTiming}>
            <GamesListNightSession games={displayedGames} />
          </NightSessionEnterTimingProvider>
        </main>
      </NightSessionAnimatedShell>
      <NightSessionSponsorFooter
        sponsors={footerSponsors}
        sponsorStripKey="nightSessionUpcomingSponsorStrip"
      />
    </div>
  );
};

export default FixtureDisplayNightSession;
