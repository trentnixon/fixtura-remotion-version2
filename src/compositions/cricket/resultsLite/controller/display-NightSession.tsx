import React, { useMemo } from "react";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { NightSessionSponsorFooter } from "../../../../templates/variants/nightSession/components/NightSessionSponsorFooter";
import { NightSessionAnimatedShell } from "../../utils/nightSession/NightSessionAnimatedShell";
import { useNightSessionEnterTiming } from "../../utils/nightSession/useNightSessionEnterTiming";
import { NightSessionEnterTimingProvider } from "../../utils/nightSession/NightSessionEnterTimingContext";
import { NIGHT_SESSION_FIXTURE_ROW_STAGGER_FRAMES } from "../../utils/nightSession/nightSessionAnimationTiming";
import { csClass } from "../../utils/overlayFamily";
import { buildResultsFooterSponsors } from "../../results/controller/ResultsDisplay/_utils/calculations";
import { LiteGradeHeaderNightSession } from "../layout/LiteGradeHeader-NightSession";
import { LiteMatchCardNightSession } from "../layout/LiteMatchCard-NightSession";
import { ResultsLiteSequence } from "./upstreamResultsLiteData";

export { RESULTS_LITE_PER_SCREEN as RESULTS_LITE_NIGHT_SESSION_PER_SCREEN } from "./display-Basic";

/** Night Session results ledger — comparison band, outcome bridge, accent dividers; no stats/context. */
const ResultsLiteDisplayNightSession: React.FC<{
  sequence: ResultsLiteSequence;
}> = ({ sequence }) => {
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;
  const assetHeight = heights.asset;
  const showGrade =
    sequence.showGradeHeader && sequence.gradeName.trim().length > 0;
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
      className={csClass(componentStyles, "nightSessionDisplayColumn")}
      style={{ height: `${assetHeight + heights.footer}px` }}
    >
      <NightSessionAnimatedShell
        className={csClass(componentStyles, "nightSessionAnimatedShell")}
        animateShell={false}
      >
        <main
          className={`results-ledger flex min-h-0 flex-1 flex-col overflow-hidden ${csClass(componentStyles, "nightSessionResultsLedger")}`}
          style={{
            height: `${assetHeight}px`,
            maxHeight: `${assetHeight}px`,
          }}
        >
          {showGrade ? (
            <LiteGradeHeaderNightSession gradeName={sequence.gradeName} />
          ) : null}
          <NightSessionEnterTimingProvider value={enterTiming}>
            {sequence.fixtures.map((match, fixtureIndex) => (
              <LiteMatchCardNightSession
                key={match.gameID}
                match={match}
                index={fixtureIndex}
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

export default ResultsLiteDisplayNightSession;
