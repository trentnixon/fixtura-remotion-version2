import React, { useMemo } from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { CricketSponsorFooter } from "../../../sponsorFooter/CricketSponsorFooter";
import { NightSessionAnimatedShell } from "../../../utils/nightSession/NightSessionAnimatedShell";
import { csClass } from "../../../utils/overlayFamily";
import GamesListNightSession from "../GamesList/games-list-NightSession";
import { useNightSessionEnterTiming } from "../../../utils/nightSession/useNightSessionEnterTiming";
import { NightSessionEnterTimingProvider } from "../../../utils/nightSession/NightSessionEnterTimingContext";
import { groupGamesByGradeDate } from "../../../utils/nightSession/upcoming/groupGamesByGradeDate";
import { countNightSessionUpcomingEnterItems } from "../../../utils/nightSession/upcoming/countNightSessionUpcomingEnterItems";
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
  const gradeGroups = useMemo(
    () => groupGamesByGradeDate(displayedGames),
    [displayedGames],
  );
  const upcomingEnterTimingOptions = useMemo(
    () => ({ rowStaggerFrames: NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES }),
    [],
  );
  const enterItemCount = useMemo(
    () => countNightSessionUpcomingEnterItems(gradeGroups),
    [gradeGroups],
  );
  const enterTiming = useNightSessionEnterTiming(
    enterItemCount,
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
      <CricketSponsorFooter
        sponsors={footerSponsors}
        sponsorStripKey="nightSessionUpcomingSponsorStrip"
      />
    </div>
  );
};

export default FixtureDisplayNightSession;
