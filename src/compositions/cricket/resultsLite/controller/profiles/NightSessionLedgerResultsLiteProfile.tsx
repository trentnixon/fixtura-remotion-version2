import React, { useMemo } from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { CricketSponsorFooter } from "../../../sponsorFooter/CricketSponsorFooter";
import { NightSessionAnimatedShell } from "../../../utils/nightSession/NightSessionAnimatedShell";
import { useNightSessionEnterTiming } from "../../../utils/nightSession/useNightSessionEnterTiming";
import { NightSessionEnterTimingProvider } from "../../../utils/nightSession/NightSessionEnterTimingContext";
import { NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES } from "../../../utils/nightSession/nightSessionAnimationTiming";
import { buildResultsFooterSponsors } from "../../../results/controller/ResultsDisplay/_utils/calculations";
import {
  csClass,
  planResultsLedgerLayout,
  resolveResultsLedgerThemeKeys,
} from "../../../utils/overlayFamily";
import { getResultsLiteGradeState } from "./resultsLiteGrade";
import type { ResultsLiteProfileProps } from "./resultsLiteProfileTypes";

export const NightSessionLedgerResultsLiteProfile: React.FC<
  ResultsLiteProfileProps
> = ({ sequence, config }) => {
  const { layout, componentStyles } = useThemeContext();
  const themeKeys = resolveResultsLedgerThemeKeys("nightSession");
  const layoutPlan = planResultsLedgerLayout(layout.heights);
  const { gradeName, showGrade } = getResultsLiteGradeState(sequence, config);
  const { MatchCard, GradeHeader } = config.components;
  const footerSponsors = buildResultsFooterSponsors(sequence.fixtures);

  const resultsEnterTimingOptions = useMemo(
    () => ({ rowStaggerFrames: NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES }),
    [],
  );
  const enterTiming = useNightSessionEnterTiming(
    sequence.fixtures.length,
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
          {showGrade && GradeHeader ? (
            <GradeHeader gradeName={gradeName} />
          ) : null}
          <NightSessionEnterTimingProvider value={enterTiming}>
            {sequence.fixtures.map((match, fixtureIndex) => (
              <MatchCard
                key={match.gameID}
                match={match}
                index={fixtureIndex}
              />
            ))}
          </NightSessionEnterTimingProvider>
        </main>
      </NightSessionAnimatedShell>
      <CricketSponsorFooter
        sponsors={footerSponsors}
        sponsorStripKey={
          config.sponsorStripKey ?? themeKeys.sponsorStrip
        }
      />
    </div>
  );
};
