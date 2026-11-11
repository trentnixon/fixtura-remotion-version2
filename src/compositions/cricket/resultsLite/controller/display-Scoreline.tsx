import React from "react";
import { AnimatedContainer } from "../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { CricketSponsorFooter } from "../../../sponsorFooter/CricketSponsorFooter";
import { csClass } from "../../utils/scoreline/componentStyles";
import { buildResultsFooterSponsors } from "../../results/controller/ResultsDisplay/_utils/calculations";
import { LiteGradeHeaderScoreline } from "../layout/LiteGradeHeader-Scoreline";
import { LiteMatchCardScoreline } from "../layout/LiteMatchCard-Scoreline";
import { ResultsLiteSequence } from "./upstreamResultsLiteData";

export { RESULTS_LITE_PER_SCREEN as RESULTS_LITE_SCORELINE_PER_SCREEN } from "./display-Basic";

/** Mirrors Scoreline Results ledger — team bands, result line; no crease separators, stats, or context. */
const ResultsLiteDisplayScoreline: React.FC<{
  sequence: ResultsLiteSequence;
}> = ({ sequence }) => {
  const { layout, componentStyles } = useThemeContext();
  const { animations } = useAnimationContext();
  const panelAnimation = animations.container.main.itemContainerOuter;
  const { heights } = layout;
  const assetHeight = heights.asset;
  const showGrade =
    sequence.showGradeHeader && sequence.gradeName.trim().length > 0;
  const footerSponsors = buildResultsFooterSponsors(sequence.fixtures);

  return (
    <div
      className={csClass(componentStyles, "scorelineDisplayColumn")}
      style={{ height: `${assetHeight + heights.footer}px` }}
    >
      <AnimatedContainer
        type="full"
        className={csClass(componentStyles, "scorelineAnimatedShell")}
        backgroundColor="none"
        animation={panelAnimation.containerIn}
        exitAnimation={panelAnimation.containerOut}
      >
        <main
          className={`results-ledger results-lite-scoreline-ledger ${csClass(componentStyles, "scorelineResultsLedger")}`}
          style={{
            height: `${assetHeight}px`,
            maxHeight: `${assetHeight}px`,
          }}
        >
          {showGrade ? (
            <LiteGradeHeaderScoreline gradeName={sequence.gradeName} />
          ) : null}
          {sequence.fixtures.map((match, fixtureIndex) => (
            <LiteMatchCardScoreline
              key={match.gameID}
              match={match}
              index={fixtureIndex}
            />
          ))}
        </main>
      </AnimatedContainer>

      <CricketSponsorFooter
        sponsors={footerSponsors}
        sponsorStripKey="scorelineResultsSponsorStrip"
      />
    </div>
  );
};

export default ResultsLiteDisplayScoreline;
