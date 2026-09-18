import React, { useMemo } from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { NightSessionSponsorFooter } from "../../../../../templates/variants/nightSession/components/NightSessionSponsorFooter";
import { NightSessionAnimatedShell } from "../../../utils/nightSession/NightSessionAnimatedShell";
import { csClass } from "../../../utils/scoreline/componentStyles";
import MatchRowNightSession from "../MatchRow/row-NightSession";
import { useNightSessionEnterTiming } from "../../../utils/nightSession/useNightSessionEnterTiming";
import { NightSessionEnterTimingProvider } from "../../../utils/nightSession/NightSessionEnterTimingContext";
import { ResultsDisplayProps } from "./_types/ResultsDisplayProps";
import {
  calculateDisplayedResults,
  buildResultsFooterSponsors,
} from "./_utils/calculations";
import { getMainContentSectionHeight } from "../../../../../core/utils/layoutHeights";
import { NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES } from "../../../utils/nightSession/nightSessionAnimationTiming";

const ResultsDisplayNightSession: React.FC<ResultsDisplayProps> = ({
  results,
  resultsPerScreen,
  screenIndex,
}) => {
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;

  const { displayedResults } = calculateDisplayedResults(
    results,
    resultsPerScreen,
    screenIndex,
  );
  const mainContentHeight = getMainContentSectionHeight(heights);
  const footerSponsors = buildResultsFooterSponsors(displayedResults);
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
      className={csClass(componentStyles, "nightSessionDisplayColumn")}
      style={{ height: `${mainContentHeight + heights.footer}px` }}
    >
      <NightSessionAnimatedShell
        className={csClass(componentStyles, "nightSessionAnimatedShell")}
        animateShell={false}
      >
        <main
          className={`results-ledger flex min-h-0 flex-1 flex-col overflow-hidden ${csClass(componentStyles, "nightSessionResultsLedger")}`}
          style={{
            height: `${mainContentHeight}px`,
            maxHeight: `${mainContentHeight}px`,
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

      <NightSessionSponsorFooter
        sponsors={footerSponsors}
        sponsorStripKey="nightSessionResultsSponsorStrip"
      />
    </div>
  );
};

export default ResultsDisplayNightSession;
