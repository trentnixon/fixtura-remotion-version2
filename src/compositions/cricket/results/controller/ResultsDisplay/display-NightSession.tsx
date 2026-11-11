import React, { useMemo } from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { CricketSponsorFooter } from "../../../sponsorFooter/CricketSponsorFooter";
import { NightSessionAnimatedShell } from "../../../utils/nightSession/NightSessionAnimatedShell";
import MatchRowNightSession from "../MatchRow/row-NightSession";
import { useNightSessionEnterTiming } from "../../../utils/nightSession/useNightSessionEnterTiming";
import { NightSessionEnterTimingProvider } from "../../../utils/nightSession/NightSessionEnterTimingContext";
import { ResultsDisplayProps } from "./_types/ResultsDisplayProps";
import { NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES } from "../../../utils/nightSession/nightSessionAnimationTiming";
import { csClass, planResultsLedgerScreen } from "../../../utils/overlayFamily";

const ResultsDisplayNightSession: React.FC<ResultsDisplayProps> = ({
  results,
  resultsPerScreen,
  screenIndex,
}) => {
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;

  const plan = planResultsLedgerScreen({
    family: "nightSession",
    results,
    resultsPerScreen,
    screenIndex,
    heights,
  });
  const {
    themeKeys,
    layout: layoutPlan,
    displayedResults,
    footerSponsors,
  } = plan;

  const resultsEnterTimingOptions = useMemo(
    () => ({ rowStaggerFrames: NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES }),
    [],
  );
  const enterTiming = useNightSessionEnterTiming(
    displayedResults.length,
    "FPS_SCORECARD",
    undefined,
    resultsEnterTimingOptions,
  );

  return (
    <div
      className={csClass(componentStyles, themeKeys.displayColumn)}
      style={{ height: `${layoutPlan.columnHeight}px` }}
    >
      <NightSessionAnimatedShell
        className={csClass(componentStyles, themeKeys.animatedShell)}
        animateShell={false}
      >
        <main
          className={`results-ledger flex min-h-0 flex-1 flex-col overflow-hidden ${csClass(componentStyles, themeKeys.resultsLedger)}`}
          style={{
            height: `${layoutPlan.mainContentHeight}px`,
            maxHeight: `${layoutPlan.mainContentHeight}px`,
          }}
        >
          <NightSessionEnterTimingProvider value={enterTiming}>
            {displayedResults.map((match, index) => (
              <MatchRowNightSession
                key={match.gameID}
                match={match}
                index={index}
                rowHeight={0}
              />
            ))}
          </NightSessionEnterTimingProvider>
        </main>
      </NightSessionAnimatedShell>

      <CricketSponsorFooter
        sponsors={footerSponsors}
        sponsorStripKey={themeKeys.sponsorStrip}
      />
    </div>
  );
};

export default ResultsDisplayNightSession;
